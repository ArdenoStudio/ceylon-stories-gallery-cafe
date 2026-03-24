import { KeyRotator } from './KeyRotator';

export interface RequirementProfile {
  title: string;
  industry: string;
  functional: string[];
  nonFunctional: string[];
  successKPIs: string[];
  confidenceScore: number;
}

/**
 * Priority 14: Requirements & Budget Intelligence Layer (§31)
 * §31 Requirement Analyzer: NLP extraction from client interviews.
 */
export class RequirementAnalyzer {
  private rotator = new KeyRotator();

  /**
   * Processes the raw interview transcript into a structured RequirementProfile.
   */
  public async analyze(transcript: string): Promise<RequirementProfile> {
    console.log('[Analyzer] Extracting structured requirements from transcript...');

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Requirements Architect. 
                 Extract functional, non-functional and success KPIs from the transcript.
                 Respond ONLY in JSON matching RequirementProfile schema.`,
        user: `TRANSCRIPT: ${transcript}`
      }
    });

    try {
      return JSON.parse(response.text) as RequirementProfile;
    } catch (e) {
      return { 
        title: 'Project Draft', 
        industry: 'Unknown', 
        functional: [], 
        nonFunctional: [], 
        successKPIs: [], 
        confidenceScore: 0.1 
      };
    }
  }
}
