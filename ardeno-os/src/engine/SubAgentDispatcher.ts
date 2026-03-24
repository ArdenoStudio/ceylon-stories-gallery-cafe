import { OrchestrationGraph, GraphState } from './OrchestrationGraph';
import { KeyRotator } from './KeyRotator';
import { MemoryManager } from './MemoryManager';
import { CriticAgent } from './CriticAgent';
import { ObservabilityTracer } from './ObservabilityTracer';
import { PromptManager } from './PromptManager';

/**
 * Priority 3: Hierarchical Agent Orchestration (§35)
 * Spawns and manages specialized sub-agents for parallel execution.
 */
export class SubAgentDispatcher {
  private graph = new OrchestrationGraph();
  private rotator = new KeyRotator();
  private memory = new MemoryManager();
  private critic = new CriticAgent();
  private tracer = new ObservabilityTracer();
  private prompt = new PromptManager();

  /**
   * Spawns a sub-agent with automated Critic feedback loop (§36)
   * And versioned prompt injection (§17).
   */
  public async spawnSubAgent(state: GraphState, subAgentType: string, taskDescription: string, retryCount = 0): Promise<void> {
    const startTime = Date.now();
    console.log(`[SubAgentDispatcher] Spawning a ${subAgentType} sub-agent (Retry: ${retryCount})`);

    // 1. Fetch relevant memories (§34)
    const context = await this.memory.recallContext(subAgentType, taskDescription);
    const memories = context.map(m => m.content).join('\n---\n');

    // 2. Fetch versioned system instructions (§17)
    const systemInstruction = await this.prompt.getActivePrompt(subAgentType);

    // 3. Execute reasoning node
    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `${systemInstruction}\n\nRELEVANT_MEMORIES:\n${memories}`,
        user: taskDescription
      }
    });

    // --- Priority 4: Critic Feedback Loop ---
    const evalResult = await this.critic.evaluate(subAgentType, taskDescription, response.text);

    if (!evalResult.passed && retryCount < 2) {
      console.warn(`[SubAgentDispatcher] ⚠️ ${subAgentType} failed evaluation (Score: ${evalResult.score}). Retrying with suggestions...`);
      return this.spawnSubAgent(state, subAgentType, `${taskDescription}\n\nCRITIC FEEDBACK: ${evalResult.critique}\nSUGGESTIONS: ${evalResult.suggestions.join(', ')}`, retryCount + 1);
    }

    if (!evalResult.passed) {
       console.error(`[SubAgentDispatcher] 🚨 ${subAgentType} reached max retries. Escalating to human queue.`);
       state.status = 'failed';
    }

    state.history.push({
      node: subAgentType,
      task: taskDescription,
      output: response.text,
      score: evalResult.score,
      timestamp: Date.now()
    });

    state.current_node = 'Aggregator';
    await this.graph.nextStep(state);
  }

  /**
   * Executes multiple agents in parallel for high-efficiency workflows.
   */
  public async executeParallel(state: GraphState, tasks: { type: string, description: string }[]): Promise<void> {
     console.log(`[SubAgentDispatcher] Executing ${tasks.length} sub-agents in parallel...`);
     
     // In serverless, we await all promises then checkpoint once at the end
     await Promise.all(tasks.map(t => this.spawnSubAgent(state, t.type, t.description)));
  }
}
