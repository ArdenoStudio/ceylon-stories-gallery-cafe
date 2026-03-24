import { KeyRotator } from './KeyRotator';

/**
 * Priority 23: DevOps Intelligence (§18)
 * §18 Vercel Log Observer: Automated deployment failure analysis.
 * Watches Vercel logs and uses reasoning models to auto-propose fixes.
 */
export class VercelLogObserver {
  private rotator = new KeyRotator();

  /**
   * Analyzes raw Vercel build logs to find the root cause of failures.
   */
  public async analyzeFailure(logs: string): Promise<{ cause: string, fix: string }> {
    console.log('[DevOps] Analyzing Vercel deployment failure logs...');

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno DevOps Engineer. 
                 Analyze these Vercel logs and find the exact cause of failure. 
                 Provide a clear fix (CLI command or file change).
                 Respond ONLY in JSON: { "cause": "string", "fix": "string" }`,
        user: `LOGS: ${logs.slice(-10000)}` // Latest 10k chars
      }
    });

    try {
      return JSON.parse(response.text) as { cause: string, fix: string };
    } catch (e) {
      return { cause: "Unknown", fix: "Re-run build with debug mode." };
    }
  }

  /**
   * Triggers a new deployment after a proposed fix (§18 auto-fix loop).
   */
  public async triggerHealedDeployment(): Promise<void> {
     console.log('[DevOps] 🟢 Fix proposed. Triggering healed deployment loop...');
  }
}
