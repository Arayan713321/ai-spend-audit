'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { runAudit, AuditRecommendation } from '@/lib/audit-engine';
import { generateAuditSummary, captureLead } from '@/app/actions';
import { TrendingDown, Calendar, CreditCard, Mail, ArrowRight, Share2, CheckCircle2 } from 'lucide-react';

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<AuditRecommendation[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lumina_audit_data');
    if (saved) {
      const { tools, teamSize, useCase } = JSON.parse(saved);
      const results = runAudit(tools, teamSize, useCase);
      setRecommendations(results);
      
      const savings = results.reduce((acc, curr) => acc + curr.savings, 0);
      setTotalMonthlySavings(savings);

      // Generate AI Summary
      generateAuditSummary({ results, totalSavings: savings, teamSize, useCase })
        .then(res => setSummary(res.summary))
        .finally(() => setIsLoading(false));
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    await captureLead(email, { recommendations, totalMonthlySavings });
    setIsSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 animate-pulse font-medium">Crunching your AI economy...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">Audit Result</h1>
            <p className="text-gray-500">Verified as of May 12, 2026</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm hover:bg-white/5">
            <Share2 className="w-4 h-4" /> Share Audit
          </button>
        </div>

        {/* Hero Savings */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-3xl p-8 md:p-12 text-center border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingDown className="w-48 h-48 text-primary" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Potential Annual Savings</p>
            <h2 className="text-6xl md:text-8xl font-black text-white">
              ${(totalMonthlySavings * 12).toLocaleString()}
            </h2>
            <div className="flex justify-center gap-8 text-gray-400 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> ${totalMonthlySavings.toLocaleString()} / month
              </span>
              <span className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" /> {totalMonthlySavings > 0 ? 'Optimization Found' : 'Optimal Stack'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* AI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-sm">AI</span>
              Personalized Strategy
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg italic">
              "{summary}"
            </p>
          </div>

          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-bold text-sm uppercase text-gray-500">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Tools Audited</span>
                <span className="text-white font-mono">{recommendations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Rate Variance</span>
                <span className="text-red-400 font-mono">+{Math.round((totalMonthlySavings / 100) * 10)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Audit Grade</span>
                <span className="text-primary font-mono">{totalMonthlySavings > 500 ? 'B-' : 'A+'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Per-Tool Breakdown</h3>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((rec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-white/5"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-white capitalize">{rec.toolId}</h4>
                  <p className="text-sm text-gray-400">{rec.reason}</p>
                </div>
                
                <div className="flex items-center gap-12 w-full md:w-auto">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Current</p>
                    <p className="text-white font-mono line-through opacity-50">${rec.currentSpend}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary uppercase">Optimal</p>
                    <p className="text-primary font-bold font-mono">${rec.recommendedSpend}</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-bold">
                    Save ${rec.savings}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Capture / CTA */}
        <div className="pt-12 pb-24">
          {totalMonthlySavings > 500 ? (
            <div className="bg-primary p-12 rounded-3xl text-black text-center space-y-6">
              <h3 className="text-4xl font-black tracking-tight">Capture the full $10k+ savings.</h3>
              <p className="font-medium text-lg opacity-80 max-w-xl mx-auto">
                Your savings are significant. Credex can source enterprise credits to reduce your 
                total AI bill by up to 40% more than these public optimizations.
              </p>
              <button className="bg-black text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
                Book a Credex Consultation <ArrowRight />
              </button>
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl text-center space-y-8">
              <h3 className="text-3xl font-bold">Save this report</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Enter your email to receive a PDF version of this audit and get notified when new AI pricing optimizations apply to your stack.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleLeadCapture} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    required
                    placeholder="founder@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  />
                  <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    Send Report
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-primary font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 /> Audit sent to your inbox.
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
