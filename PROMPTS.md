# PROMPTS.md

## Personalized Audit Summary Prompt

### The Prompt
Used in `src/app/actions.ts` to generate the personalized strategy summary.

```text
You are an expert AI infrastructure economist. Analyze this audit result and provide a 100-word personalized summary.
Audit Data: {{auditData}}

Focus on:
1. Where the biggest leakage is.
2. One specific tool they should switch or downgrade.
3. The total annual savings potential.

Keep the tone professional, direct, and entrepreneurial.
```

### Why I wrote it this way
- **Role Prompting**: Assigning the role of "AI infrastructure economist" ensures the tone is focused on financial optimization rather than just technical features.
- **Constraints**: Limiting it to ~100 words makes it readable in a "hero" context on the results page.
- **Specific Targets**: By explicitly asking for "leakage," "specific tool," and "annual savings," I force the model to provide actionable advice rather than vague platitudes.
- **Context Injection**: Passing the full audit JSON allows the model to see not just the numbers, but the reasoning provided by the deterministic engine, which it can then synthesize into a more human-sounding strategy.

### What I tried that didn't work
1. **Initially asking for a "detailed report"**: The model tended to hallucinate pricing data that wasn't in the input. I restricted the prompt to only summarize the *provided* results.
2. **Asking for multiple tool recommendations**: It became too wordy and lost impact. Limiting to "one specific tool" makes the advice more punchy and memorable.
3. **Omitting the tone instructions**: The default Claude response was a bit too "helpful assistant" and not "strategic advisor." Adding "entrepreneurial" helped align with the Credex brand voice.
