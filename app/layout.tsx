import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mikav.info";

export const metadata: Metadata = {
  title: {
    template: "%s | Mikav AI",
    default: "Mikav AI — Open Malayalam AI Copilot for Kerala",
  },
  description:
    "Mikav is an open-source AI copilot and open Malayalam language model built for Kerala's creative and cultural ecosystem. Explore open datasets, models, and APIs.",
  keywords: [
    "Mikav",
    "Malayalam AI",
    "Kerala AI",
    "open source",
    "Malayalam language model",
    "AI copilot",
    "Malayalam NLP",
    "Kerala tech",
    "open datasets",
    "മലയാളം AI",
  ],
  authors: [{ name: "Mikav AI", url: BASE_URL }],
  creator: "Mikav AI",
  publisher: "Mikav AI",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Mikav AI",
    title: "Mikav AI — Open Malayalam AI Copilot for Kerala",
    description:
      "Open-source AI copilot and Malayalam language model for Kerala's creative and cultural ecosystem. Open datasets and models for everyone.",
    images: [
      {
        url: "/icons/app/icon-dark.png",
        width: 512,
        height: 512,
        alt: "Mikav AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikav AI — Open Malayalam AI Copilot",
    description:
      "Open-source AI copilot and Malayalam language model built for Kerala's creative and cultural ecosystem.",
    images: ["/icons/app/icon-dark.png"],
  },
  icons: {
    icon: "/icons/app/favicon.png",
    apple: "/icons/app/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Apply saved font preference before paint to avoid a flash of the default font */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var f=localStorage.getItem("mikav-font");if(f)document.documentElement.setAttribute("data-font",f);}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        {/* AEO: Structured data for AI answer engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Mikav AI",
              url: BASE_URL,
              description:
                "Open-source AI copilot and open Malayalam language model built for Kerala's creative and cultural ecosystem.",
              applicationCategory: "Artificial Intelligence",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              creator: {
                "@type": "Organization",
                name: "Mikav AI",
                url: BASE_URL,
                email: "hello@mikav.info",
              },
              inLanguage: ["en", "ml"],
              keywords:
                "Malayalam AI, Kerala AI, open source, AI copilot, Malayalam language model",
              license: "https://opensource.org/licenses/MIT",
            }),
          }}
        />
        {/* AEO: Speakable structured data for voice assistants */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Mikav AI",
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", "h2", "[data-speakable]"],
              },
              url: BASE_URL,
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
