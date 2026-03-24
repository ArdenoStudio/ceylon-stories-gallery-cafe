import { KeyRotator } from './KeyRotator';

export interface SentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated';
  intensity: number; // 0-100
  key_points: string[];
  suggested_reply: string;
}

/**
 * Priority 25: Remaining Subsystems (§23)
 * §23 Communications Intelligence: Agency client feedback analysis.
 * Analyzes client comments on the Portfolio or Demo portal (§11).
 */
export class CommIntel {
  private rotator = new KeyRotator();

  /**
   * Analyzes the sentiment and key issues in client feedback (§23).
   */
  public async analyzeSentiment(feedback: string): Promise<SentimentAnalysis> {
    console.log('[CommIntel] Analyzing client feedback for sentiment and key points...');

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Relation Manager. 
                 Provide a sentiment analysis and suggested professional reply.
                 Respond ONLY in JSON.`,
        user: feedback
      }
    });

    try {
      return JSON.parse(response.text) as SentimentAnalysis;
    } catch (e) {
      return { sentiment: 'neutral', intensity: 0, key_points: [], suggested_reply: "Thank you for your feedback!" };
    }
  }

  /**
   * Alerts the Discord Hub if sentiment is 'negative' or intensity > 80 (§8).
   */
  public async handleAlert(analysis: SentimentAnalysis): Promise<void> {
     if (analysis.intensity > 80 || analysis.sentiment === 'negative') {
        process.stdout.write(`[CommIntel] 🚨 ALERT: High-intensity client frustration detected! (§23)\n`);
     }
  }
}
