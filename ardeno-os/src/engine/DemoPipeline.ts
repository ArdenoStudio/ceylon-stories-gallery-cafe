import { qstash } from '../lib/upstash/qstash';
import { RequirementProfile } from './RequirementAnalyzer';
import { VercelDeployer } from './VercelDeployer';
import { supabaseAdmin } from '../lib/supabase/client';

export interface DemoSession {
  id: string;
  requirement_id: string;
  status: 'scoping' | 'developing' | 'deploying' | 'completed';
}

/**
 * Priority 17: Autonomous Demo Pipeline (§10)
 * §10 Demo Orchestrator: Requirements Extraction to Vercel Deployment.
 * Uses QStash to manage long-running multi-phase agent jobs.
 */
export class DemoPipeline {

  /**
   * Dispatches the next phase of a live demo build to the Vercel queue.
   */
  public async transitionPhase(sessionId: string, nextPhase: string, profile: RequirementProfile): Promise<void> {
    console.log(`[DemoPipeline] Transitioning ${sessionId} to phase: ${nextPhase}...`);

    await qstash.publishJSON({
      url: `${process.env.VERCEL_URL}/api/agents/queue`,
      body: { 
        trace_id: sessionId, 
        phase: nextPhase, 
        profile: profile 
      }
    });

    console.log(`[DemoPipeline] ⚡ QStash message dispatched for ${nextPhase}.`);
  }

  /**
   * Finalizes the demo by triggering the Vercel Deployer.
   */
  public async triggerDeployment(sessionId: string, files: any[]): Promise<void> {
     console.log(`[DemoPipeline] Entering Phase-Final: Deployment for trace ${sessionId}...`);
     
     try {
       const deployer = new VercelDeployer();
       const deployResult = await deployer.createProjectAndDeploy(`ardeno-demo-${Date.now()}`, files);
       
       console.log(`[DemoPipeline] ✅ Demo deployed successfully: ${deployResult.previewUrl}`);

       // Update Supabase trace
       await supabaseAdmin.from('agent_traces').update({
         metadata: { deployed_url: deployResult.previewUrl, project_id: deployResult.projectId },
         status: 'completed'
       }).eq('id', sessionId);

     } catch (error: any) {
        console.error(`[DemoPipeline] 🚨 Deployment failed for trace ${sessionId}:`, error.message);
        throw error;
     }
  }
}
