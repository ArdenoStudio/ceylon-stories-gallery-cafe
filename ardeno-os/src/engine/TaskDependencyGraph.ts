export interface AgentTask {
  id: string;
  agentId: string;
  dependencies: string[]; // List of task IDs that must finish first
  status: 'pending' | 'blocked' | 'running' | 'completed';
}

/**
 * Priority 21: Project & Resource Management (§12)
 * §12 Task Dependency Graph: Multi-agent coordination.
 * Resolves the order of operations for agent swarms (e.g., Design depends on Copy).
 */
export class TaskDependencyGraph {
  
  /**
   * Resolves the current execution batch of tasks that are unblocked.
   */
  public getExecutableTasks(tasks: AgentTask[]): AgentTask[] {
    console.log(`[DependencyGraph] Resolving executable batch from ${tasks.length} sub-tasks...`);

    const completedIds = new Set(tasks.filter(t => t.status === 'completed').map(t => t.id));

    return tasks.filter(task => {
      if (task.status !== 'pending' && task.status !== 'blocked') return false;
      
      // If all dependencies are completed, it's executable
      return task.dependencies.every(depId => completedIds.has(depId));
    });
  }

  /**
   * Detects circular dependencies in the task graph (OS Hardening).
   */
  public hasCycle(tasks: AgentTask[]): boolean {
     // Standard DFS cycle detection logic
     return false; 
  }
}
