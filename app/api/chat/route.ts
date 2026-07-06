import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SARVAM_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Request must include a non-empty 'messages' array." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sarvam-30b",
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Sarvam API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to reach Sarvam AI.",
      },
      { status: 500 }
    );
  }
}
