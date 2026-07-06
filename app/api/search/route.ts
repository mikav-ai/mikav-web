import { NextResponse } from "next/server";

interface SerpApiOrganicResult {
  title?: string;
  link?: string;
  snippet?: string;
  source?: string;
}

interface SerpApiResponse {
  organic_results?: SerpApiOrganicResult[];
  error?: string;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SERPAPI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const query: string = body?.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Request must include a non-empty 'query' string." },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      engine: "google",
      q: query,
      api_key: apiKey,
      num: "5",
    });

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `SerpApi error: ${errorText}` },
        { status: response.status }
      );
    }

    const data: SerpApiResponse = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    const results: SearchResult[] = (data.organic_results ?? [])
      .slice(0, 5)
      .map((r) => ({
        title: r.title ?? "",
        link: r.link ?? "",
        snippet: r.snippet ?? "",
        source: r.source,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to reach SerpApi.",
      },
      { status: 500 }
    );
  }
}
