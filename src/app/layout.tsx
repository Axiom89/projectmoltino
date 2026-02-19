import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moltino — Your Onchain EVM Agent",
  description:
    "DM it what you need. Moltino writes contracts, ships dApps, runs your socials, and handles Web3 marketing.",
  openGraph: {
    title: "Moltino — Your Onchain EVM Agent",
    description:
      "DM it what you need. Moltino writes contracts, ships dApps, runs your socials, and handles Web3 marketing.",
    url: "https://moltino.xyz",
    siteName: "Moltino",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moltino — Your Onchain EVM Agent",
    description:
      "DM it what you need. Moltino writes contracts, ships dApps, runs your socials, and handles Web3 marketing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
