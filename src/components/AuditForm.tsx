'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Zap, ArrowRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolInput, UseCase, runAudit, AuditRecommendation } from '@/lib/audit-engine';

const TOOL_OPTIONS = [
  { id: 'cursor', name: 'Cursor', plans: ['Hobby', 'Pro', 'Pro-Plus', 'Ultra', 'Teams'] },
  { id: 'copilot', name: 'GitHub Copilot', plans: ['Individual', 'Business', 'Enterprise'] },
  { id: 'claude', name: 'Claude (Anthropic)', plans: ['Free', 'Pro', 'Team-Standard', 'Team-Premium', 'Enterprise'] },
  { id: 'chatgpt', name: 'ChatGPT', plans: ['Free', 'Plus', 'Team', 'Enterprise'] },
  { id: 'windsurf', name: 'Windsurf', plans: ['Free', 'Pro', 'Max'] },
];

const USE_CASES: UseCase[] = ['coding', 'writing', 'data', 'research', 'mixed'];

export default function AuditForm() {
  const [tools, setTools] = useState<ToolInput[]>([]);
  const [teamSize, setTeamSize] = useState<number>(1);
  const [useCase, setUseCase] = useState<UseCase>('mixed');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('lumina_audit_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTools(parsed.tools || []);
        setTeamSize(parsed.teamSize || 1);
        setUseCase(parsed.useCase || 'mixed');
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('lumina_audit_data', JSON.stringify({ tools, teamSize, useCase }));
    }
  }, [tools, teamSize, useCase, isClient]);

  const addTool = () => {
    setTools([...tools, { toolId: 'cursor', plan: 'pro', monthlySpend: 20, seats: 1 }]);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const updateTool = (index: number, updates: Partial<ToolInput>) => {
    const newTools = [...tools];
    newTools[index] = { ...newTools[index], ...updates };
    setTools(newTools);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd navigate to /results
    window.location.href = '/results';
  };

  if (!isClient) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Team Size</label>
            <input 
              type="number" 
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
              className="w-full bg-muted border border-border rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              min="1"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400">Primary Use Case</label>
            <select 
              value={useCase}
              onChange={(e) => setUseCase(e.target.value as UseCase)}
              className="w-full bg-muted border border-border rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            >
              {USE_CASES.map(uc => (
                <option key={uc} value={uc}>{uc.charAt(0).toUpperCase() + uc.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="text-primary w-6 h-6" />
              Your AI Stack
            </h2>
            <button 
              onClick={addTool}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold rounded-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" /> Add Tool
            </button>
          </div>

          <AnimatePresence>
            {tools.map((tool, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-6 rounded-2xl relative group"
              >
                <button 
                  onClick={() => removeTool(index)}
                  className="absolute -top-2 -right-2 bg-red-500/20 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Tool</label>
                    <select 
                      value={tool.toolId}
                      onChange={(e) => updateTool(index, { toolId: e.target.value })}
                      className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    >
                      {TOOL_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Plan</label>
                    <input 
                      type="text" 
                      value={tool.plan}
                      onChange={(e) => updateTool(index, { plan: e.target.value })}
                      placeholder="e.g. Pro, Business"
                      className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Seats</label>
                    <input 
                      type="number" 
                      value={tool.seats}
                      onChange={(e) => updateTool(index, { seats: parseInt(e.target.value) || 1 })}
                      className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Monthly Spend ($)</label>
                    <input 
                      type="number" 
                      value={tool.monthlySpend}
                      onChange={(e) => updateTool(index, { monthlySpend: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-background border border-border rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {tools.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl text-gray-500">
              No tools added yet. Start by adding what you pay for today.
            </div>
          )}
        </div>

        {tools.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center pt-8"
          >
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-lg rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all group"
            >
              Run AI Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
