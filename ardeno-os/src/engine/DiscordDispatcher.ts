/**
 * Priority 16: Discord & Gmail (§8 + §9)
 * §8 Discord Dispatcher: Interactive agent approval and alerting.
 * Integrates with the /api/webhooks/discord route.
 */
export class DiscordDispatcher {
  private webhookUrl = process.env.DISCORD_WEBHOOK_URL || '';

  /**
   * Sends a structured approval request to the Agency Discord hub.
   */
  public async sendApprovalRequest(traceId: string, agentType: string, summary: string): Promise<boolean> {
    if (!this.webhookUrl) return false;

    console.log(`[Discord] Dispatching approval request for trace ${traceId}...`);

    const payload = {
      embeds: [{
        title: `🚨 Approval Required: ${agentType} Output`,
        description: summary,
        color: 0x00ff00,
        fields: [
          { name: "Trace ID", value: traceId, inline: true },
          { name: "Status", value: "Pending Human Review", inline: true }
        ],
        footer: { text: "Ardeno Sentient Agency v4.4" }
      }],
      components: [{
        type: 1,
        components: [
          { type: 2, label: "Approve ✅", style: 3, custom_id: `approve_${traceId}` },
          { type: 2, label: "Reject ❌", style: 4, custom_id: `reject_${traceId}` }
        ]
      }]
    };

    const res = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.status === 204;
  }

  /**
   * Sends a plain informational alert to the agency Discord channel.
   */
  public async sendAlert(message: string): Promise<void> {
    if (!this.webhookUrl) return;

    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
  }
}
