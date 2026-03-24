import { LLMKeyPool, APIKey, KeyProvider } from './LLMKeyPool';

export interface RouteRequest {
  taskType: 'reasoning' | 'speed' | 'embedding' | 'creative' | 'critic' | 'vision';
  payload: any;
  priority?: 'high' | 'normal' | 'background';
}

export class KeyRotator {
  private keyPool = LLMKeyPool.getInstance();

  /**
   * Routes the LLM request to the ideal provider based on task type.
   * If the primary provider's keys are exhausted, triggers instant cascade.
   */
  public async execute(req: RouteRequest): Promise<any> {
    const primaryProvider = this.determinePrimaryProvider(req.taskType);
    return this.attemptExecution(primaryProvider, req, 0);
  }

  private determinePrimaryProvider(taskType: RouteRequest['taskType']): KeyProvider {
    switch (taskType) {
      case 'reasoning': return 'gemini';
      case 'speed': return 'groq';
      case 'embedding': return 'gemini'; // Free embedding endpoint on Gemini
      case 'creative': return 'mistral';
      case 'critic': return 'deepseek';
      case 'vision': return 'gemini'; // Route Vision to Gemini Flash nodes
      default: return 'groq';
    }
  }

  /**
   * Core execution loop with Round-Robin Rotation and 429 Instant Fallback
   */
  private async attemptExecution(provider: KeyProvider, req: RouteRequest, retryCount: number): Promise<any> {
    const keys = this.keyPool.getKeysByProvider(provider).filter(k => k.status === 'active');

    if (keys.length === 0) {
      console.warn(`[KeyRotator] ⚠️ Pool exhausted for ${provider}. Cascading to fallback.`);
      return this.cascadeToFailover(req);
    }

    // Select the key with the lowest usage or just pick first available (Round Robin)
    const selectedKey = keys[0]; 

    try {
      // Execute dummy call representation
      const res = await this.mockNetworkCall(selectedKey, req);
      return res;
    } catch (error: any) {
      if (error.status === 429) {
        // Rate limit hit — instant rotate
        console.log(`[KeyRotator] 429 limit hit on ${selectedKey.provider} / ${selectedKey.projectId}. Rotating...`);
        // Cooldown for 1 minute (usually enough for RPM resets)
        this.keyPool.updateKeyStatus(selectedKey.keyString, 'cooldown', 60000);
        return this.attemptExecution(provider, req, retryCount + 1);
      } else {
        // Unknown error, flag key and retry
        this.keyPool.updateKeyStatus(selectedKey.keyString, 'error');
        return this.attemptExecution(provider, req, retryCount + 1);
      }
    }
  }

  /**
   * Ultimate failover: Risk 1 Mitigation (§45 Resilience Layer)
   * When primary pools die, instantly pivot to OpenRouter free-tier,
   * then HuggingFace if OpenRouter drops.
   */
  private async cascadeToFailover(req: RouteRequest): Promise<any> {
    console.warn(`[KeyRotator] 🚨 Executing OpenRouter Failover Protocol for task: ${req.taskType}`);
    
    const openRouterKeys = this.keyPool.getKeysByProvider('openrouter');
    if (openRouterKeys.length > 0 && openRouterKeys[0].status === 'failover_standby') {
      try {
        return await this.mockNetworkCall(openRouterKeys[0], req);
      } catch (e) {
         console.error(`[KeyRotator] 🚨 OpenRouter failover exhausted. Cascading to HuggingFace.`);
         // HF cascade logic here...
      }
    }

    throw new Error('All LLM Key Pools and Failovers Exhausted.');
  }

  // MOCK: Replace with actual Fetch API call
  private async mockNetworkCall(key: APIKey, req: RouteRequest): Promise<any> {
    // Simulating a network request that occasionally 429s for testing
    if (Math.random() < 0.1) throw { status: 429 }; 
    return { success: true, text: "AI Response", sourceKey: key.projectId };
  }
}
