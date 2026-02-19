"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ───────────────────── Intersection Observer Hook ───────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ───────────────────────────── Icons ────────────────────────────────── */
function ContractIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function DappIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 8l3 3-3 3" />
      <line x1="13" y1="14" x2="17" y2="14" />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2h4v4M21 2l-7.5 7.5M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ──────────────────────────── Components ─────────────────────────────── */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/50 backdrop-blur-xl bg-bg-primary/70">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-accent via-accent-dim to-green-glow opacity-60 blur-[3px] group-hover:opacity-100 transition-opacity" />
            <Image
              src="/mascot.png"
              alt="Moltino"
              width={34}
              height={34}
              className="relative rounded-lg ring-1 ring-white/10"
            />
          </div>
          <span className="text-lg font-bold tracking-tight">moltino</span>
        </div>
        <a
          href="https://x.com/projectmoltino"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
        >
          <XIcon />
          Follow
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg noise-bg">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-dim/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-green-glow/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Mascot with orbital rings */}
        <div className="animate-fade-in-up flex justify-center mb-10">
          <div className="relative w-[280px] h-[280px] flex items-center justify-center">
            {/* Outer glow pulse */}
            <div className="absolute inset-0 rounded-full bg-accent/15 blur-[60px] scale-125 animate-pulse-glow" />

            {/* Orbit ring 1 — slow */}
            <div className="absolute inset-2 animate-orbit">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent-bright shadow-[0_0_12px_rgba(196,181,253,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-glow shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              </div>
            </div>
            {/* Orbit ring 1 border */}
            <div className="absolute inset-2 rounded-full border border-dashed border-accent/10" />

            {/* Orbit ring 2 — reversed, tighter */}
            <div className="absolute inset-10 animate-orbit-reverse">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-glow shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
              </div>
            </div>
            {/* Orbit ring 2 border */}
            <div className="absolute inset-10 rounded-full border border-accent-dim/10" />

            {/* Hexagonal-ish frame behind image */}
            <div className="absolute inset-[52px] rounded-[28px] bg-gradient-to-br from-accent-dim/30 via-transparent to-green-glow/20 p-[1.5px]">
              <div className="w-full h-full rounded-[27px] bg-bg-primary" />
            </div>

            {/* The mascot image */}
            <Image
              src="/mascot.png"
              alt="Moltino Agent"
              width={156}
              height={156}
              priority
              className="relative z-10 rounded-[24px] animate-float"
              style={{
                filter: "drop-shadow(0 0 24px rgba(167,139,250,0.25)) drop-shadow(0 0 60px rgba(52,211,153,0.1))",
              }}
            />

            {/* Corner accent dots */}
            <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-accent-bright/60 animate-pulse" />
            <div className="absolute bottom-8 left-5 w-1 h-1 rounded-full bg-green-glow/50 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-12 left-3 w-0.5 h-0.5 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        {/* Status badge */}
        <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-dim/30 bg-accent-dim/5 text-accent-bright text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-glow animate-pulse" />
          Building in public
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in-up delay-200 text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
          <span className="text-gradient">Moltino</span>
        </h1>

        <p className="animate-fade-in-up delay-300 text-xl sm:text-2xl text-text-secondary font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
          AI-Powered Blockchain EVM Agent
        </p>

        <p className="animate-fade-in-up delay-400 text-base text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Autonomous smart contract creation, auditing, dApp development, and Web3 marketing — all through natural conversation.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://x.com/projectmoltino"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-dim to-accent text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.5)]"
          >
            Request Early Access
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl border border-border-subtle text-text-secondary font-medium text-base hover:text-text-primary hover:border-text-muted transition-all duration-300"
          >
            See how it works
          </a>
        </div>

        {/* Terminal preview */}
        <div className="animate-fade-in-up delay-700 mt-16 max-w-lg mx-auto">
          <div className="border-glow rounded-xl bg-bg-secondary/80 backdrop-blur-sm p-5 text-left font-mono text-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-text-muted text-xs">moltino-agent</span>
            </div>
            <div className="space-y-2 text-text-secondary">
              <p>
                <span className="text-green-glow">$</span>{" "}
                <span className="text-text-primary">@projectmoltino</span>{" "}
                audit my ERC-20 token contract
              </p>
              <p className="text-accent-bright">
                → Analyzing contract bytecode...
              </p>
              <p className="text-accent-bright">
                → 3 vulnerabilities found. Generating fix...
              </p>
              <p className="text-green-glow">
                ✓ Patched contract ready. Cost: 0.002 ETH
              </p>
              <p className="text-text-muted animate-pulse">█</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-text-muted/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function WhatItDoes() {
  const ref = useReveal();

  const features = [
    {
      icon: <ContractIcon />,
      title: "Smart Contract Creation & Auditing",
      description:
        "Deploy and audit Solidity contracts with AI-driven vulnerability detection. From ERC-20 tokens to complex DeFi protocols.",
      tag: "Security",
    },
    {
      icon: <DappIcon />,
      title: "dApp Development by Conversation",
      description:
        "Describe what you need in plain English. Moltino architects, builds, and deploys full decentralized applications tailored to your vision.",
      tag: "Development",
    },
    {
      icon: <MarketingIcon />,
      title: "Web3 Product Marketing",
      description:
        "Position your onchain product to resonate with crypto-native audiences and onchain speculators. Strategy, content, and execution.",
      tag: "Growth",
    },
    {
      icon: <SocialIcon />,
      title: "Web3 Social Management",
      description:
        "Automate and optimize your project's social presence across crypto Twitter, Farcaster, and onchain social protocols.",
      tag: "Social",
    },
  ];

  return (
    <section className="relative py-32 px-6" id="features">
      <div ref={ref} className="max-w-6xl mx-auto opacity-0">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What Moltino does
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            One agent. Full-stack Web3 execution. From contract to community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group border-glow rounded-2xl bg-bg-card/50 backdrop-blur-sm p-8 hover:bg-bg-card/80 transition-all duration-500 hover:scale-[1.01]"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-accent-dim/10 border border-accent-dim/20 flex items-center justify-center text-accent group-hover:text-accent-bright group-hover:border-accent-dim/40 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {f.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-dim/10 text-accent font-medium">
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {f.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useReveal();

  const steps = [
    {
      num: "01",
      title: "Start a conversation",
      description:
        "Reach out to Moltino on Twitter (X). Tell it what you need — a smart contract, a dApp, a marketing strategy, anything Web3.",
      accent: "from-accent-dim to-accent",
    },
    {
      num: "02",
      title: "Moltino collects info & scopes your request",
      description:
        "The agent asks clarifying questions, understands your requirements, and simulates costs for the work involved.",
      accent: "from-accent to-accent-bright",
    },
    {
      num: "03",
      title: "Upfront payment via x402",
      description:
        "Pay seamlessly using the x402 payment protocol — purpose-built for onchain agent-to-human transactions. Transparent, verifiable, instant.",
      accent: "from-accent-bright to-green-glow",
    },
    {
      num: "04",
      title: "Preview, approve, or refund",
      description:
        "Moltino delivers a preview of the work. Happy? Ship it. Not satisfied? Request a full refund. Zero risk.",
      accent: "from-green-glow to-emerald-300",
    },
  ];

  return (
    <section className="relative py-32 px-6" id="how-it-works">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-dim/[0.02] to-transparent pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto opacity-0">
        <div className="text-center mb-16">
          <p className="text-green-glow text-sm font-semibold tracking-widest uppercase mb-3">
            Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            From first message to delivered product — in four steps.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-dim via-accent to-green-glow opacity-20 hidden md:block" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group">
                {/* Step number */}
                <div className="shrink-0 relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity shadow-lg`}
                  >
                    {s.num}
                  </div>
                </div>

                {/* Content */}
                <div className="border-glow rounded-xl bg-bg-card/40 backdrop-blur-sm p-6 flex-1 group-hover:bg-bg-card/60 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const ref = useReveal();

  const badges = [
    {
      name: "Openclaw",
      description: "Agent framework",
    },
    {
      name: "Base",
      description: "L2 chain registry",
    },
    {
      name: "ERC-8004",
      description: "Onchain agent identity",
    },
    {
      name: "x402",
      description: "Agent payment protocol",
    },
  ];

  return (
    <section className="relative py-32 px-6" id="tech">
      <div ref={ref} className="max-w-4xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Infrastructure
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Built with
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Registered on Base as an{" "}
            <span className="text-accent-bright font-medium">ERC-8004</span>{" "}
            agent — track its reputation onchain.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className="group border-glow rounded-xl bg-bg-card/50 px-6 py-4 hover:bg-bg-card/80 transition-all duration-300 cursor-default hover:scale-[1.03]"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-green-glow" />
                <div>
                  <span className="text-text-primary font-semibold text-sm">
                    {b.name}
                  </span>
                  <span className="text-text-muted text-xs ml-2">
                    {b.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent ID card */}
        <div className="mt-12 max-w-md mx-auto border-glow rounded-2xl bg-bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-accent-dim via-accent to-green-glow opacity-50 blur-[4px] animate-pulse-glow" />
              <Image
                src="/mascot.png"
                alt="Moltino"
                width={44}
                height={44}
                className="relative rounded-xl ring-1 ring-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-glow border-2 border-bg-card animate-pulse" />
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">
                moltino.eth
              </p>
              <p className="text-text-muted text-xs font-mono">
                ERC-8004 Registered Agent
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-green-glow text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-glow animate-pulse" />
              Active
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-text-muted text-xs mb-1">Network</p>
              <p className="text-text-primary text-sm font-medium">Base</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Standard</p>
              <p className="text-text-primary text-sm font-medium">ERC-8004</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Status</p>
              <p className="text-green-glow text-sm font-medium">Verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border-subtle/50 py-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-dim/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* CTA banner */}
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built for the{" "}
            <span className="text-gradient">agentic economy</span>
          </h3>
          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-8">
            The future of Web3 is autonomous. Moltino is the agent that gets you there.
          </p>
          <a
            href="https://x.com/projectmoltino"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-border-subtle text-text-primary font-medium hover:bg-white/10 hover:border-text-muted transition-all duration-300"
          >
            <XIcon size={18} />
            Follow @projectmoltino
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle/30">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-md bg-gradient-to-br from-accent to-green-glow opacity-40 blur-[2px]" />
              <Image
                src="/mascot.png"
                alt="Moltino"
                width={24}
                height={24}
                className="relative rounded-md ring-1 ring-white/10"
              />
            </div>
            <span className="text-text-muted text-sm">
              moltino.xyz
            </span>
          </div>

          <p className="text-text-muted text-sm">
            Shipping the agentic future, one contract at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Main Page ──────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatItDoes />
        <HowItWorks />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
