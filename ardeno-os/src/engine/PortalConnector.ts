import { supabaseAdmin } from '../lib/supabase/client';

/**
 * Priority 18: Client Lifecycle (§11)
 * §11 Portal Connector: Cross-project Supabase data integration.
 * Synchronizes agency task status with the Ardeno Client Portal.
 */
export class PortalConnector {
  
  /**
   * Pushes a local agent graph update to the centralized portal.
   */
  public async syncProgress(traceId: string, status: string, progress: number): Promise<void> {
    console.log(`[PortalSync] Updating trace ${traceId} progress to ${progress}% in Ardeno Portal...`);

    // In a multi-project setup, we simply update the 'tasks' or 'projects' table 
    // in the same shared Supabase instance.
    const { error } = await supabaseAdmin
      .from('projects')
      .update({ current_status: status, completion_percentage: progress })
      .eq('trace_id', traceId);

    if (error) {
       console.error('[PortalSync] Failed to sync progress:', error.message);
    }
  }

  /**
   * Fetches latest client feedback from the portal.
   */
  public async fetchFeedback(projectId: string): Promise<string[]> {
     const { data } = await supabaseAdmin
       .from('project_feedback')
       .select('feedback')
       .eq('project_id', projectId);

     return (data || []).map(f => f.feedback);
  }
}
