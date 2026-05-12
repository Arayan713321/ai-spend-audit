# METRICS.md

## North Star Metric
**Total Potential Savings Surfaced (TPSS)**: The aggregate dollar amount of monthly savings identified for all users.
- **Why**: This directly measures the value delivered by the tool. If TPSS is high, the tool is effective as a lead magnet and value provider.

## Input Metrics
1. **Audit Completion Rate**: % of users who land on the page → input tools → view results.
   - *Target*: > 40%. Measures form friction and value prop clarity.
2. **Share Rate**: % of completed audits that generate a unique public URL.
   - *Target*: > 10%. Measures the "viral loop" and results page "wow" factor.
3. **Lead Conversion (LCR)**: % of high-savings audits (>$500) that result in a Credex consultation booking.
   - *Target*: > 5%. Measures the tool's effectiveness as a lead-gen asset.

## Instrumentation
1. **Vercel Web Analytics**: For high-level traffic and conversion funnels.
2. **PostHog**: For event-level tracking (which tools are most commonly audited, where users drop off in the form).
3. **Custom Supabase Logs**: To track total savings surfaced without storing PII.

## Pivot Decision Trigger
If the **Lead Conversion Rate (LCR)** stays below 1% for 500+ audits showing >$500 savings, we should pivot the CTA from "Book Consultation" to "Get Discounted Credits Directly" (self-serve) or iterate on the audit reasoning to make the pain of overspending more visceral.
