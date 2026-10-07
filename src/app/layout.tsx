import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const title = "Moltino, your own onchain assistant on Telegram";
const description =
  "Paste a contract address and Moltino tells you who deployed the token, who paid for the deploy and whether the liquidity is locked. It also watches your wallets and messages you when something moves. Built on Claude.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://moltino.xyz"),
  openGraph: { title, description, url: "https://moltino.xyz", siteName: "Moltino", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
