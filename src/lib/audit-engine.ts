export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

export interface ToolInput {
  toolId: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditRecommendation {
  toolId: string;
  currentSpend: number;
  recommendedPlan: string;
  recommendedSpend: number;
  savings: number;
  reason: string;
}

export const PRICING = {
  cursor: {
    hobby: 0,
    pro: 20,
    'pro-plus': 60,
    ultra: 200,
    teams: 40,
  },
  copilot: {
    free: 0,
    pro: 10,
    'pro-plus': 39,
    business: 19,
    enterprise: 39,
  },
  claude: {
    free: 0,
    pro: 20,
    'team-standard': 25,
    'team-premium': 125,
    enterprise: 20,
  },
  chatgpt: {
    free: 0,
    go: 5,
    plus: 20,
    pro: 128,
  },
  windsurf: {
    free: 0,
    pro: 20,
    max: 200,
  }
};

export function runAudit(tools: ToolInput[], teamSize: number, useCase: UseCase): AuditRecommendation[] {
  return tools.map(tool => {
    let recommendedPlan = tool.plan;
    let recommendedSpend = tool.monthlySpend;
    let reason = "Your current plan is optimal for your usage.";

    if (tool.toolId === 'cursor') {
      if (tool.plan === 'teams' && tool.seats < 3) {
        recommendedPlan = 'pro';
        recommendedSpend = 20 * tool.seats;
        reason = `Switching ${tool.seats} users to Individual Pro saves $${tool.monthlySpend - recommendedSpend} without losing core features.`;
      } else if (tool.plan === 'pro-plus' && useCase !== 'coding') {
        recommendedPlan = 'pro';
        recommendedSpend = 20 * tool.seats;
        reason = "Pro+ is optimized for heavy coding; your use case fits well within the standard Pro tier.";
      }
    }

    if (tool.toolId === 'copilot') {
      if (tool.plan === 'enterprise' && tool.seats < 10) {
        recommendedPlan = 'business';
        recommendedSpend = 19 * tool.seats;
        reason = "Business tier provides the same core features as Enterprise for smaller teams at half the cost.";
      }
    }

    if (tool.toolId === 'claude') {
      if (tool.plan === 'team-premium' && tool.seats < 5) {
        recommendedPlan = 'team-standard';
        recommendedSpend = 25 * tool.seats;
        reason = "Standard Team plan offers high performance for small teams without the Enterprise premium.";
      }
    }

    // Generic rule: If they are paying significantly above market average for their seats
    const marketAvg = 20; // Avg Pro price
    if (tool.monthlySpend / tool.seats > marketAvg * 2 && recommendedSpend === tool.monthlySpend) {
        // Look for alternative tool
        if (useCase === 'coding' && (tool.toolId === 'chatgpt' || tool.toolId === 'claude')) {
            recommendedPlan = 'Cursor Pro';
            recommendedSpend = 20 * tool.seats;
            reason = "Cursor is more cost-effective and specialized for coding workflows than general chat subscriptions.";
        }
    }

    return {
      toolId: tool.toolId,
      currentSpend: tool.monthlySpend,
      recommendedPlan,
      recommendedSpend,
      savings: Math.max(0, tool.monthlySpend - recommendedSpend),
      reason,
    };
  });
}
