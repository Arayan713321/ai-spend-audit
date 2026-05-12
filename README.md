# Lumina AI Audit

Lumina AI Audit is a high-precision spend analysis tool for startups to identify and eliminate AI infrastructure overspend. Built as a lead-generation asset for Credex, it provides deterministic financial audits and AI-powered strategic recommendations.

## Live Demo
[Deployed URL Placeholder] - *Deploy your app to Vercel and paste the link here.*

## Screenshots
![Lumina AI Hero](/public/screenshot-hero.png)
*Note: Ensure you generate and save actual screenshots here.*

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Arayan713321/ai-spend-audit
cd ai-spend-audit
npm install
```

### 2. Set Environment Variables
Create a `.env.local` file:
```env
ANTHROPIC_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Run Tests
```bash
npm run test
```

## 5 Core Trade-offs
1. **Deterministic Logic vs. LLM**: Chose hardcoded rules for math to ensure 100% financial accuracy, using LLMs only for qualitative synthesis.
2. **Next.js App Router**: Prioritized SEO and server-side performance for the landing page to ensure high Lighthouse scores.
3. **Vanilla CSS + Tailwind**: Avoided heavy component libraries to keep the bundle size small and the design highly customized to the Credex brand.
4. **LocalStorage for MVP**: Opted for browser storage to allow "No Login Required" usage, capturing emails only after showing value.
5. **Hybrid Lead Capture**: Implemented both a direct "Consultation" CTA for high-value users and a low-friction "Notify Me" sign-up for optimal users.

## Project Structure
- `src/lib/audit-engine.ts`: The core deterministic logic.
- `src/app/actions.ts`: Server Actions for AI summary generation.
- `src/components/AuditForm.tsx`: Multi-step interactive state management.
- `PRICING_DATA.md`: Verified sources for all financial calculations.

---
Built for the **Credex Round 1 Internship Assignment**.
