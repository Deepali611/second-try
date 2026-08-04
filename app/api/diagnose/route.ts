import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured in .env.local' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { complaintText } = body || {};

    if (!complaintText || typeof complaintText !== 'string' || !complaintText.trim()) {
      return NextResponse.json(
        { error: 'complaintText is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the diagnosis engine for "Second Try," a Blinkit AI growth recovery system.
Classify incoming customer complaint text about a first-time category purchase into exactly one of these four evidence-backed failure categories:
1. quality_expiry — expired, damaged, spoiled, or poor physical quality product
2. no_proof — lack of customer reviews, ratings, or proof before buying an unfamiliar item
3. support_unresolved — customer contacted support or raised a ticket that closed without resolving the issue
4. high_value_hesitation — hesitation or anxiety regarding financial risk on higher-value big-ticket purchases

Rules:
- Quote the exact string from the complaint that grounds your classification in "grounding_quote".
- If the complaint does not clearly match any of the four categories, set "category" to "none".
- Respond with strict JSON matching this exact structure:
{
  "category": "quality_expiry | no_proof | support_unresolved | high_value_hesitation | none",
  "confidence": "high | medium | low",
  "grounding_quote": "exact phrase quoted from complaint",
  "reasoning": "one concise sentence explaining the match"
}`;

    const MODEL_CHAIN = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    let lastError: Error | null = null;
    let parsedResult: any = null;
    let usedModel = '';

    for (const model of MODEL_CHAIN) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Complaint: "${complaintText.trim()}"` },
            ],
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Groq API (${model}) error ${response.status}: ${errText.slice(0, 150)}`);
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';
        const cleaned = content.replace(/```json|```/g, '').trim();
        parsedResult = JSON.parse(cleaned);
        usedModel = model;
        break; // Successfully got response
      } catch (err: any) {
        lastError = err;
        console.warn(`Attempt with ${model} failed:`, err.message);
      }
    }

    if (!parsedResult) {
      return NextResponse.json(
        {
          error: `Failed to diagnose complaint: ${lastError ? lastError.message : 'Groq API unreachable'}`,
          category: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      category: parsedResult.category,
      confidence: parsedResult.confidence,
      grounding_quote: parsedResult.grounding_quote,
      reasoning: parsedResult.reasoning,
      modelUsed: usedModel,
    });
  } catch (error: any) {
    console.error('Diagnosis API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during diagnosis' },
      { status: 500 }
    );
  }
}
