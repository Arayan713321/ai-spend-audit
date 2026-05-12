# REFLECTION.md

## 1. The Hardest Bug
The hardest bug I encountered was ensuring the **deterministic audit engine** properly handled state persistence across page reloads without causing hydration mismatches in Next.js 15. 
- **Hypothesis**: I initially used `useEffect` to load data from `localStorage`, but the initial server render used default empty state, causing a visual "flicker" and occasional React hydration errors when the client state kicked in.
- **Trial**: I tried using a higher-order component to delay rendering, but it felt sluggish. 
- **Solution**: I implemented a "IsClient" state check and ensured all interactive elements remained hidden or in a skeleton state until the client-side mounting was complete. This preserved the SEO benefits of the static landing page while allowing the complex form state to remain stable.

## 2. Reversed Decision
Mid-week, I reversed the decision to use **AI for the math portion of the audit**. 
- **Reasoning**: Initially, I thought an LLM could handle the complex logic of "if team size > 5 and tool is Cursor, suggest X." 
- **The Pivot**: I realized that for financial tools, hallucinations are fatal. A user seeing a "wrong" calculation loses trust immediately. 
- **Result**: I moved all "savings logic" into a deterministic TypeScript engine (runAudit) and reserved the LLM (Anthropic) solely for the **qualitative strategy summary**. This "Logic + LLM" hybrid approach is far more robust and defensible.

## 3. Week 2 Plans
If I had another week, I would build:
- **PDF Export**: Using `jspdf` or a server-side rendering service to allow users to download a professional white-paper audit they can present to their finance department.
- **Benchmark Mode**: Integrating a real-time database of "Average AI Spend per Dev" to show users exactly where they sit on the bell curve compared to other startups of their size.
- **Embedded Widget**: A React snippet that other founder-facing blogs could drop in to provide "Quick Audits" on their own sites.

## 4. AI Usage Disclosure
I used **Cursor (Claude 3.5 Sonnet)** extensively for boilerplate generation, UI styling via Tailwind, and drafting initial markdown structures.
- **What I didn't trust it with**: The core audit logic and the financial modeling in `ECONOMICS.md`. These required human-level synthesis of specific vendor pricing nuances and Credex's business model.
- **Where AI was wrong**: It initially suggested a pricing tier for GitHub Copilot that was deprecated in 2024. I caught this because I cross-referenced all AI-suggested numbers with my manual research in `PRICING_DATA.md`.

## 5. Self-Rating
- **Discipline (9/10)**: Followed the 7-day development structure strictly, ensuring commits were meaningful and documentation was built alongside code.
- **Code Quality (8/10)**: Used TypeScript and clean component patterns, though some UI components could be further abstracted into a design system.
- **Design Sense (9/10)**: Focused on a "premium dark-mode" aesthetic that feels like a high-end financial tool, not a coding exercise.
- **Problem Solving (8/10)**: Successfully navigated the tradeoff between AI flexibility and deterministic accuracy in the audit engine.
- **Entrepreneurial Thinking (10/10)**: Focused heavily on the viral sharing loop and the unit economics for Credex, treating it as a product, not a task.
