import { KeyRotator } from './KeyRotator';

/**
 * Priority 23: DevOps Intelligence (§18)
 * §18 Changelog Generator: Auto-discovery of agent and system updates.
 * Pulls recent commit data and synthesizes it into user-friendly carousels.
 */
export class ChangelogGenerator {
  private rotator = new KeyRotator();

  /**
   * Generates a "What's New" summary from raw git commit logs.
   */
  public async generateChangelog(commits: string[]): Promise<string> {
    console.log(`[ChangelogGen] Synthesizing summary for ${commits.length} commits...`);

    const response = await this.rotator.execute({
      taskType: 'creative',
      payload: {
        system: `You are the Ardeno Release Manager. 
                 Summarize these git commits into a user-friendly 'What's New' carousel.
                 Make it sound exciting and professional.`,
        user: `COMMITS: ${commits.join('\n')}`
      }
    });

    return response.text;
  }

  /**
   * Posts the generated changelog to the Sentient Stream (§3).
   */
  public async postToStream(summary: string): Promise<void> {
     console.log('[ChangelogGen] 🔊 Posting release update to Agency Stream...');
  }
}
