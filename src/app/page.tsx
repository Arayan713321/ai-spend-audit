import AuditForm from '@/components/AuditForm';
import { ShieldCheck, TrendingDown, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5 fill-black" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Lumina AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Pricing Data</a>
          <a href="#" className="hover:text-white transition-colors">Credex Credits</a>
        </div>
        <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-white/5 transition-all">
          Book Consultation
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
          <ShieldCheck className="w-3 h-3" /> 2026 AI Spend Audit
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          Stop Overpaying <br /> for Your AI Stack.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Most startups are leaking $500–$2,000 every month on misaligned AI tiers. 
          Get a professional-grade audit in 60 seconds. Free.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-20 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-primary" /> Average Savings: 22%
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Live Pricing: May 2026
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> No Login Required
          </div>
        </div>
      </section>

      {/* Audit Form Section */}
      <section id="audit" className="pb-32">
        <AuditForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-sm">
            © 2026 Lumina AI. Powered by <a href="https://credex.rocks" className="text-white hover:underline">Credex</a>.
          </div>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Hacker News</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
