import { KeyRotator } from './KeyRotator';

export interface InterviewPhase {
  question: string;
  field: string;
}

/**
 * Priority 14: Requirements & Budget Intelligence (§31)
 * §31 Multi-Turn Client Interviewer: High-confidence requirement extraction.
 */
export class MultiTurnClientInterviewer {
  private rotator = new KeyRotator();

  /**
   * Generates the next best question based on the current context and confidence.
   */
  public async getNextQuestion(conversationHistory: any[]): Promise<{ question: string; confidence: number }> {
    console.log('[Interviewer] Analyzing history to generate next probe...');

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Requirements Architect. 
                 Your goal is to extract technical and business requirements with 95% confidence.
                 Provide the next probing question to clarify the client's vision.
                 Respond ONLY in JSON: { "question": "string", "confidence": number }`,
        user: `HISTORY: ${JSON.stringify(conversationHistory)}`
      }
    });

    try {
      return JSON.parse(response.text) as { question: string, confidence: number };
    } catch (e) {
      return { question: "Can you tell me more about your target audience?", confidence: 0.5 };
    }
  }

  /**
   * Summarizes the interview into a finalized RequirementProfile.
   */
  public async finalizeProfile(history: any[]): Promise<any> {
     console.log('[Interviewer] Finalizing Requirement Profile...');
     // NLP extraction logic here...
     return { title: 'Project X', complexity: 'high', features: ['Auth', 'Dashboard'] };
  }
}
