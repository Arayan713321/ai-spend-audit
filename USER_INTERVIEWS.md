# USER_INTERVIEWS.md

## Interview 1: Alex, CTO at a Stealth Fintech (Series A)
- **Context**: 15 engineers, heavy users of Cursor and Anthropic API.
- **Quotes**:
  - "I know we're spending too much, but I don't have time to look at the seats every month."
  - "We have people on Claude Pro and ChatGPT Plus simultaneously. It's ridiculous."
  - "A public link I can send to my CEO to justify the switch would be huge."
- **Surprising Moment**: They were paying for GitHub Copilot for the whole team even though everyone had switched to Cursor 3 months ago. "It's just a $300 line item, so it gets buried."
- **Design Change**: Added the "Redundant Tool" logic to the audit engine to explicitly flag when both Cursor and Copilot are being paid for.

## Interview 2: Priya, Founder of a Content SaaS (Pre-seed)
- **Context**: Solofounder + 3 contractors. High OpenAI API bills.
- **Quotes**:
  - "API pricing is a black box to me. Is 4o-mini actually cheaper for what we do?"
  - "I want to know if there's a 'sweet spot' for our usage."
  - "I'd book a call if someone could just fix this for me once."
- **Surprising Moment**: She didn't know that Gemini had a free tier for developers with high limits. "I thought everything cost money from day one."
- **Design Change**: Implemented the "Free Tier Comparison" to suggest when a team should move *down* to a free or lower-cost API tier for certain use cases.

## Interview 3: David, Ops Manager at a Growth Agency
- **Context**: 40 people, mixed use cases (writing, data, research).
- **Quotes**:
  - "Our team is all over the place. Some use ChatGPT, some use Poe, some use Claude."
  - "The 'mixed' use case is hard to optimize because everyone has a favorite."
  - "I need a way to benchmark us against other agencies."
- **Surprising Moment**: He was more interested in the "per-user" benchmark than the total savings. "If I can tell the team they're spending 2x the industry average, they'll be more willing to consolidate."
- **Design Change**: Added the "Audit Grade" and "Market Rate Variance" stats to the results page to provide social/industry benchmarking context.
