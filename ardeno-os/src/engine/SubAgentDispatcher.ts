import { OrchestrationGraph, GraphState } from './OrchestrationGraph';
import { KeyRotator } from './KeyRotator';
import { MemoryManager } from './MemoryManager';

/**
 * Priority 3: Hierarchical Agent Orchestration (§35)
 * Spawns and manages specialized sub-agents for parallel execution.
 */
export class SubAgentDispatcher {
  private graph = new OrchestrationGraph();
  private rotator = new KeyRotator();
  private memory = new MemoryManager();

  /**
   * Spawns a sub-agent to execute a specific task within the orchestration graph.
   */
  public async spawnSubAgent(state: GraphState, subAgentType: string, taskDescription: string): Promise<void> {
    console.log(`[SubAgentDispatcher] Spawning a ${subAgentType} sub-agent for task: ${taskDescription}`);

    // Retrieve relevant past memories before starting (§34 Memory Integration)
    const context = await this.memory.recallContext(subAgentType, taskDescription);
    const memories = context.map(m => m.content).join('\n---\n');

    // Execute the sub-agent's reasoning block using the Key Pool (§30)
    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are a specialized ${subAgentType} sub-agent in the Ardeno Sentient Agency. 
                 Use the following memories to inform your decisions:\n${memories}`,
        user: taskDescription
      }
    });

    // Update graph history and transition state
    state.history.push({
      node: subAgentType,
      task: taskDescription,
      output: response.text,
      timestamp: Date.now()
    });

    state.current_node = 'Aggregator'; // Handoff to aggregator
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
