import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mikav.info";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/console/chat/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/llm.txt", "/skill.md"],
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/llm.txt", "/skill.md"],
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: ["/llm.txt", "/skill.md"],
        disallow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
