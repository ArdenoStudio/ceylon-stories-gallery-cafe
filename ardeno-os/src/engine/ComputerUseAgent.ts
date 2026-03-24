import { KeyRotator } from './KeyRotator';
import { supabaseAdmin } from '../lib/supabase/client';

export interface Action {
  type: 'click' | 'type' | 'scroll' | 'wait';
  selector?: string;
  text?: string;
  x?: number;
  y?: number;
}

/**
 * Priority 9: Computer-Use Browser Agents (§43)
 * §43 Vision-Based Browsing: Playwright + Gemini Vision api.
 */
export class ComputerUseAgent {
  private rotator = new KeyRotator();

  /**
   * Perceives the current page state using Gemini Vision (§30 Key Pool).
   */
  public async perceive(screenshotUrl: string, domSummary: string): Promise<Action[]> {
    console.log(`[ComputerUse] Analyzing vision at ${screenshotUrl}...`);

    const response = await this.rotator.execute({
      taskType: 'vision', // Route to Gemini-Flash (Free Vision tier)
      payload: {
        system: `You are the Ardeno Browser Driver. 
                 Analyze the screenshot and DOM summary to find the next action.
                 Target: Find the 'Sign In' button and click it.`,
        user: `SCREENSHOT_URL: ${screenshotUrl}\nDOM_SUMMARY: ${domSummary}\n\nRespond ONLY in JSON action list: [{ "type": "click", "x": 120, "y": 450 }]`
      }
    });

    try {
      return JSON.parse(response.text) as Action[];
    } catch (e) {
      console.error('[ComputerUse] Vision parse failure. Falling back to idle.');
      return [{ type: 'wait' }];
    }
  }

  /**
   * Logs a session event to Supabase (§43 Observation).
   */
  public async logEvent(traceId: string, url: string, status: string, screenshotUrl?: string): Promise<void> {
    await supabaseAdmin
      .from('browser_sessions')
      .insert({
        trace_id: traceId,
        target_url: url,
        session_status: status,
        screenshot_url: screenshotUrl
      });
  }
}
