import { describe, it, expect } from 'vitest';
import { runAudit, ToolInput } from './audit-engine';

describe('Audit Engine Logic', () => {
  it('should recommend downgrade for Cursor Teams with < 3 seats', () => {
    const tools: ToolInput[] = [
      { toolId: 'cursor', plan: 'teams', monthlySpend: 80, seats: 2 }
    ];
    const results = runAudit(tools, 2, 'coding');
    expect(results[0].recommendedPlan).toBe('pro');
    expect(results[0].savings).toBe(40); // 80 - (20 * 2)
  });

  it('should recommend downgrade for GitHub Copilot Enterprise for small teams', () => {
    const tools: ToolInput[] = [
      { toolId: 'copilot', plan: 'enterprise', monthlySpend: 195, seats: 5 }
    ];
    const results = runAudit(tools, 5, 'coding');
    expect(results[0].recommendedPlan).toBe('business');
    expect(results[0].savings).toBe(100); // 195 - (19 * 5) = 100
  });

  it('should suggest switching from general chat to Cursor for coding use case', () => {
    const tools: ToolInput[] = [
      { toolId: 'chatgpt', plan: 'plus', monthlySpend: 100, seats: 2 }
    ];
    const results = runAudit(tools, 2, 'coding');
    // Market avg rule triggers alternative recommendation
    expect(results[0].recommendedPlan).toBe('Cursor Pro');
    expect(results[0].savings).toBe(60); // 100 - (20 * 2)
  });

  it('should identify optimal stacks correctly', () => {
    const tools: ToolInput[] = [
      { toolId: 'cursor', plan: 'pro', monthlySpend: 20, seats: 1 }
    ];
    const results = runAudit(tools, 1, 'coding');
    expect(results[0].savings).toBe(0);
    expect(results[0].reason).toContain('optimal');
  });

  it('should handle large team sizes correctly', () => {
    const tools: ToolInput[] = [
      { toolId: 'cursor', plan: 'teams', monthlySpend: 400, seats: 10 }
    ];
    const results = runAudit(tools, 10, 'coding');
    // 10 seats on teams is valid, no downgrade to pro recommended as seats > 3
    expect(results[0].recommendedPlan).toBe('teams');
    expect(results[0].savings).toBe(0);
  });
});
