/**
 * Priority 17: Autonomous Demo Pipeline (§10)
 * §10 Vercel Deployer: Programmatic Vercel deployment SDK.
 * Creates projects, triggers deployments, and returns preview URLs.
 */
export class VercelDeployer {
  private vercelToken = process.env.VERCEL_TOKEN || '';
  private teamId = process.env.VERCEL_TEAM_ID || '';

  /**
   * Triggers a new deployment for a generated client demo.
   */
  public async createProjectAndDeploy(projectName: string, files: any[]): Promise<{ previewUrl: string, projectId: string }> {
    console.log(`[VercelDeployer] Triggering Vercel API for deployment of ${projectName}...`);

    if (!this.vercelToken) throw new Error('Vercel API Token missing.');

    const headers = {
      'Authorization': `Bearer ${this.vercelToken}`,
      'Content-Type': 'application/json'
    };

    // 1. Create the project via Vercel REST API (or get if exists)
    let projectId = '';
    try {
      const projRes = await fetch(`https://api.vercel.com/v9/projects${this.teamId ? `?teamId=${this.teamId}` : ''}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: projectName,
          framework: 'nextjs'
        })
      });

      const projData = await projRes.json();
      if (projRes.status === 409) {
        // Project already exists, get the ID
        const existingRes = await fetch(`https://api.vercel.com/v9/projects/${projectName}${this.teamId ? `?teamId=${this.teamId}` : ''}`, { headers });
        const existingData = await existingRes.json();
        projectId = existingData.id;
      } else if (!projRes.ok) {
        throw new Error(projData.error?.message || 'Failed to create Vercel project');
      } else {
        projectId = projData.id;
      }

      // 2. Upload and deploy the source files via Deployment API
      const deployRes = await fetch(`https://api.vercel.com/v13/deployments${this.teamId ? `?teamId=${this.teamId}` : ''}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: projectName,
          files: files, // Array of { file: string, data: string }
          projectSettings: {
            framework: 'nextjs'
          }
        })
      });

      if (!deployRes.ok) {
        const deployError = await deployRes.json();
        throw new Error(deployError.error?.message || 'Failed to trigger Vercel deployment');
      }

      const deployData = await deployRes.json();

      return {
        previewUrl: `https://${deployData.url}`,
        projectId: projectId
      };

    } catch (error: any) {
      console.error(`[VercelDeployer] 🚨 Deployment failed:`, error.message);
      throw error;
    }
  }

  /**
   * Deletes a stale or cancelled demo project from Vercel.
   */
  public async teardownDemo(projectId: string): Promise<boolean> {
     console.log(`[VercelDeployer] Tearing down demo project ${projectId}...`);
     if (!this.vercelToken) return false;

     const res = await fetch(`https://api.vercel.com/v9/projects/${projectId}${this.teamId ? `?teamId=${this.teamId}` : ''}`, {
       method: 'DELETE',
       headers: { 'Authorization': `Bearer ${this.vercelToken}` }
     });

     return res.ok;
  }
}
