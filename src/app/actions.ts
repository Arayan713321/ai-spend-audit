'use server';

import Anthropic from '@anthropic-ai/sdk';

export async function generateAuditSummary(auditData: any) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return {
      summary: "Based on our analysis, your AI stack has several optimization opportunities. Moving to annual billing or consolidating fragmented 'Pro' seats into a single 'Team' plan could yield immediate results. We recommend reviewing your seat utilization on Cursor and Copilot to avoid redundant spend.",
      isFallback: true
    };
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const prompt = `You are an expert AI infrastructure economist. Analyze this audit result and provide a 100-word personalized summary.
    Audit Data: ${JSON.stringify(auditData)}
    
    Focus on:
    1. Where the biggest leakage is.
    2. One specific tool they should switch or downgrade.
    3. The total annual savings potential.
    
    Keep the tone professional, direct, and entrepreneurial.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    // Handle the content properly based on Anthropic SDK response structure
    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    return { summary: content, isFallback: false };
  } catch (error) {
    console.error('AI Summary Error:', error);
    return {
      summary: "We analyzed your stack and found that your current tool mix is mostly optimal, though there are minor optimizations available in your seat allocation. A direct consultation with Credex could surface deeper discounts on enterprise-grade tools.",
      isFallback: true
    };
  }
}

export async function captureLead(email: string, auditData: any) {
  // Stored in Supabase or similar
  console.log('Capturing lead:', email, auditData);
  
  // Here you would use Resend to send the email
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    // resend.emails.send(...)
  }

  return { success: true };
}
