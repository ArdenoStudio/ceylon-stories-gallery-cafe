import { MemoryManager } from './MemoryManager';

/**
 * Priority 25: Remaining Subsystems (§13)
 * §13 Knowledge Base: RAG for company standard operating procedures (SOPs).
 * Provides "Expert Support" to agents when they encounter novel tasks.
 */
export class KnowledgeBase {
  private memory = new MemoryManager();

  /**
   * Retrieves the specific SOP for a novel task.
   */
  public async getSOP(taskKey: string): Promise<string> {
    console.log(`[KB] Searching for Standard Operating Procedure for: ${taskKey}...`);

    // In production, we filter by memory_type = 'sop'
    const results = await this.memory.recallContext('sop', taskKey);
    
    if (results.length === 0) {
       console.warn(`[KB] No SOP found for ${taskKey}. Falling back to default Ardeno OS logic.`);
       return "Follow standard agency workflow.";
    }

    return results[0].content;
  }

  /**
   * Archives a new SOP after human calibration.
   */
  public async storeSOP(title: string, content: string): Promise<void> {
     console.log(`[KB] Storing new SOP: ${title}...`);
     await this.memory.storeMemory('sop', `SOP: ${title}\nContent: ${content}`);
  }
}
