import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface SerpApiOrganicResult {
  title?: string;
  link?: string;
  snippet?: string;
}

async function searchWeb(query: string): Promise<string | null> {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({
      engine: "google",
      q: query,
      api_key: apiKey,
      num: "5",
    });

    const response = await fetch(
      `https://serpapi.com/search.json?${params.toString()}`
    );
    if (!response.ok) return null;

    const data = await response.json();
    const results: SerpApiOrganicResult[] = data?.organic_results ?? [];

    if (results.length === 0) return null;

    return results
      .slice(0, 5)
      .map(
        (r, i) =>
          `[${i + 1}] ${r.title ?? ""}\n${r.snippet ?? ""}\nSource: ${r.link ?? ""}`
      )
      .join("\n\n");
  } catch {
    return null;
  }
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
    const webSearch: boolean = body?.webSearch === true;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Request must include a non-empty 'messages' array." },
        { status: 400 }
      );
    }

    let finalMessages = messages;

    if (webSearch) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.role === "user");

      if (lastUserMessage) {
        const searchContext = await searchWeb(lastUserMessage.content);

        if (searchContext) {
          finalMessages = [
            {
              role: "system",
              content: `You have access to the following live web search results. Use them to give an accurate, up-to-date answer, and cite sources by URL when relevant.\n\n${searchContext}`,
            },
            ...messages,
          ];
        }
      }
    }

    const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sarvam-30b",
        messages: finalMessages,
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
