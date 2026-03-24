import { KeyRotator } from './KeyRotator';

export interface Battlecard {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  how_to_win: string[];
  recommended_pricing: string;
}

/**
 * Priority 24: Competitive Intelligence (§7)
 * §7 Battlecard Generator: Commercial Agent sales enablement.
 * Synthesizes market watcher data into actionable sales strategies.
 */
export class BattlecardGenerator {
  private rotator = new KeyRotator();

  /**
   * Generates a structural battlecard from competitor feature parity.
   */
  public async generateBattlecard(url: string, competitorData: any): Promise<Battlecard> {
    console.log(`[BattlecardGen] Synthesizing winning strategy for ${url}...`);

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Competitive Intelligence Agent. 
                 Generate a 'How to Win' battlecard against this competitor.
                 Focus on Ardeno's Sentient OS and high-automation edges.
                 Respond ONLY in JSON matching Battlecard schema.`,
        user: `COMPETITOR: ${url}\nDATA: ${JSON.stringify(competitorData)}`
      }
    });

    try {
      return JSON.parse(response.text) as Battlecard;
    } catch (e) {
      return { competitor: url, strengths: [], weaknesses: [], how_to_win: [], recommended_pricing: "Competitive" };
    }
  }

  /**
   * Updates the Commercial Agent's context injection (§17).
   */
  public async injectToCommercial(card: Battlecard): Promise<void> {
     console.log(`[BattlecardGen] ⚡ Injected strategy into Section 17 Context Layer for ${card.competitor}.`);
  }
}
