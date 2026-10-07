"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

/* ───────────────────── Intersection Observer Hook ───────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("animate-fade-in-up"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ──────────────────── Starfield Canvas ──────────────────────────────── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = Math.max(document.body.scrollHeight, window.innerHeight * 4);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    interface Star {
      x: number; y: number; r: number;
      baseOpacity: number; twinkleSpeed: number; twinkleOffset: number;
      color: string;
    }

    const stars: Star[] = [];
    const count = Math.floor((w * h) / 2500);

    for (let i = 0; i < count; i++) {
      const isBright = Math.random() > 0.9;
      const rng = Math.random();
      let color = "#ffffff";
      if (rng > 0.82) color = "#38bdf8";       // electric blue
      else if (rng > 0.74) color = "#fbbf24";   // gold
      else if (rng > 0.68) color = "#a78bfa";   // purple
      else if (rng > 0.64) color = "#0ea5e9";   // deeper blue

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: isBright ? Math.random() * 2.2 + 1 : Math.random() * 1.2 + 0.2,
        baseOpacity: isBright ? Math.random() * 0.7 + 0.3 : Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color,
      });
    }

    let frameId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      for (const s of stars) {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const opacity = s.baseOpacity + twinkle * 0.25;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.02, Math.min(1, opacity));
        ctx.fill();

        if (s.r > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0, opacity * 0.1);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const cleanup = init();
    const handleResize = () => { if (cleanup) cleanup(); init(); };
    window.addEventListener("resize", handleResize);
    return () => { if (cleanup) cleanup(); window.removeEventListener("resize", handleResize); };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ──────────────────── Nebula Background ─────────────────────────────── */
function NebulaBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Electric blue nebula — top center */}
      <div
        className="absolute -top-[10%] left-[20%] w-[800px] h-[600px] rounded-full animate-aurora-1"
        style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.02) 40%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Gold nebula — right */}
      <div
        className="absolute top-[15%] -right-[5%] w-[500px] h-[500px] rounded-full animate-aurora-2"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, rgba(251,191,36,0.015) 40%, transparent 70%)", filter: "blur(100px)" }}
      />
      {/* Deep purple — left side */}
      <div
        className="absolute top-[35%] -left-[8%] w-[600px] h-[500px] rounded-full animate-aurora-3"
        style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)", filter: "blur(90px)" }}
      />
      {/* Blue-gold mix — mid page */}
      <div
        className="absolute top-[55%] right-[15%] w-[700px] h-[500px] rounded-full animate-aurora-1"
        style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, rgba(245,158,11,0.03) 50%, transparent 70%)", filter: "blur(110px)", animationDelay: "12s" }}
      />
      {/* Purple haze — bottom */}
      <div
        className="absolute top-[75%] left-[10%] w-[500px] h-[400px] rounded-full animate-aurora-2"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 60%)", filter: "blur(90px)", animationDelay: "8s" }}
      />
      {/* Gold dust — bottom right */}
      <div
        className="absolute top-[85%] right-[5%] w-[400px] h-[300px] rounded-full animate-aurora-3"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.05) 0%, transparent 60%)", filter: "blur(80px)", animationDelay: "15s" }}
      />
    </div>
  );
}

/* ──────────────────── Section Divider ───────────────────────────────── */
function Divider() {
  return <div className="section-divider mx-auto max-w-4xl" />;
}

/* ───────────────────────────── Links ────────────────────────────────── */
const BOT_URL = "https://t.me/moltino_bot";
const CONTACT = "hello@moltino.xyz";

/* ───────────────────────────── Icons ────────────────────────────────── */
function TraceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <path d="M8.5 5.5c4 .5 6 2.5 7.2 5" />
      <path d="M8.5 18.5c4-.5 6-2.5 7.2-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
      <path d="M16 4.5a3.5 3.5 0 010 7" />
      <path d="M18 14.8c2 .7 3.2 2.5 3.5 5.2" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="7" y1="21" x2="17" y2="21" />
      <path d="M4 7h16" />
      <path d="M4 7l-2.5 6a3 3 0 005 0z" />
      <path d="M20 7l-2.5 6a3 3 0 005 0z" />
    </svg>
  );
}

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.94 4.3a1 1 0 00-1.36-1.1L2.66 10.2a1 1 0 00.06 1.88l4.4 1.4 1.7 5.4a1 1 0 001.66.38l2.5-2.4 4.5 3.3a1 1 0 001.57-.6l2.9-15.26zM9.6 13.9l7.8-6.1-6.2 7.1-.3 3.1-1.3-4.1z" />
    </svg>
  );
}

/* ──────────────────────────── Components ─────────────────────────────── */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/50 backdrop-blur-xl bg-bg-primary/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative group w-[34px] h-[34px]">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-electric via-purple to-gold opacity-40 blur-[6px] group-hover:opacity-80 transition-opacity" />
            <Image src="/mascot.png" alt="Moltino" width={34} height={34}
              className="relative w-full h-full"
              style={{
                maskImage: "radial-gradient(circle, black 40%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 72%)",
              }}
            />
          </div>
          <span className="text-lg font-bold tracking-tight">moltino</span>
        </div>
        <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
          <TelegramIcon />
          Open in Telegram
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanline-overlay">
      {/* Hero glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-electric-dim/[0.08] blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.05] blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-purple-dim/[0.06] blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Mascot — blended into space with orbiting particles */}
        <div className="animate-fade-in-up flex justify-center mb-10">
          <div className="relative w-[240px] h-[240px] flex items-center justify-center">
            {/* White starlight emanating from behind mascot */}
            <div className="absolute inset-0 rounded-full bg-white/[0.06] blur-[80px] scale-150 animate-pulse-glow" />
            <div className="absolute inset-[10%] rounded-full bg-white/[0.1] blur-[50px] scale-110 animate-pulse-glow" style={{ animationDelay: "1s" }} />

            {/* Orbit ring 1 — particles */}
            <div className="absolute inset-0 animate-orbit">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-electric-bright shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
              </div>
            </div>

            {/* Orbit ring 2 — particles */}
            <div className="absolute inset-8 animate-orbit-reverse">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-gold-bright shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-purple shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              </div>
            </div>

            {/* Mascot — tight mask so snail stays crisp, only dark corners fade */}
            <div className="relative z-10 animate-float">
              <Image
                src="/mascot.png"
                alt="Moltino"
                width={180}
                height={180}
                priority
                style={{
                  maskImage: "radial-gradient(circle, black 55%, rgba(0,0,0,0.5) 68%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(circle, black 55%, rgba(0,0,0,0.5) 68%, transparent 80%)",
                }}
              />
            </div>

            {/* Accent particles */}
            <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-electric-bright/60 animate-pulse" />
            <div className="absolute bottom-6 left-4 w-1 h-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-10 left-2 w-0.5 h-0.5 rounded-full bg-purple/40 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        {/* Status badge */}
        <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric-dim/30 bg-electric-dim/5 text-electric-bright text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          Early access opening soon
        </div>

        <h1 className="animate-fade-in-up delay-200 text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
          <span className="text-gradient">Moltino</span>
        </h1>

        <p className="animate-fade-in-up delay-300 text-xl sm:text-2xl text-text-secondary font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
          Onchain research desk on Telegram
        </p>

        <p className="animate-fade-in-up delay-400 text-base text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Send it a token. Moltino traces the deployer and its funders, screens for rugs and farmed volume, checks the socials, and replies with a risk read and the evidence behind it.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-dim to-electric text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(14,165,233,0.5)]">
            <TelegramIcon size={18} />
            Open @moltino_bot
          </a>
          <a href="#how-it-works"
            className="px-8 py-3.5 rounded-xl border border-border-subtle text-text-secondary font-medium text-base hover:text-text-primary hover:border-text-muted transition-all duration-300 backdrop-blur-sm">
            See how it works
          </a>
        </div>

        {/* Example chat */}
        <div className="animate-fade-in-up delay-700 mt-16 max-w-lg mx-auto">
          <div className="border-glow rounded-xl bg-bg-secondary/70 backdrop-blur-md p-5 text-left font-mono text-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-gold/60" />
              <div className="w-3 h-3 rounded-full bg-electric/60" />
              <span className="ml-2 text-text-muted text-xs">@moltino_bot · example</span>
            </div>
            <div className="space-y-2 text-text-secondary">
              <p><span className="text-electric">&gt;</span> <span className="text-text-primary">check 0x4f2…b91c on base</span></p>
              <p className="text-electric-bright">→ Tracing deployer and funders...</p>
              <p className="text-electric-bright">→ Reading LP custody, holders, early buyers...</p>
              <p className="text-gold">⚠ Deployer funded by a wallet behind 3 earlier rugs</p>
              <p className="text-gold">✓ Verdict: high risk, evidence attached</p>
              <p className="text-text-muted animate-pulse">█</p>
            </div>
          </div>
        </div>
      </div>

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
    { icon: <TraceIcon />, title: "Deployer & Funder Traces", description: "Follows the money behind a launch: who deployed it, who funded the deployer, and which earlier tokens the same wallets touched.", tag: "Onchain" },
    { icon: <ShieldIcon />, title: "Rug & Farm Screens", description: "Checks liquidity custody, holder concentration, sniper and bundle activity, and wash-traded volume before you look twice.", tag: "Risk" },
    { icon: <PeopleIcon />, title: "Socials Due Diligence", description: "Reads the team's X and Telegram footprint, who is pushing the token, and whether the accounts behind it are real.", tag: "Socials" },
    { icon: <ScaleIcon />, title: "Stress-Tested Verdicts", description: "A separate risk agent challenges every read before it reaches you, so each verdict arrives with the reasons and the receipts.", tag: "Quant" },
  ];

  return (
    <section className="relative py-32 px-6" id="features">
      <div ref={ref} className="max-w-6xl mx-auto opacity-0">
        <div className="text-center mb-16">
          <p className="text-electric text-sm font-semibold tracking-widest uppercase mb-3">What it does</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Due diligence in one message</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">The checks a careful onchain researcher runs on a new token, done by agents in minutes. EVM chains, Base first.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group border-glow rounded-2xl bg-bg-card/40 backdrop-blur-sm p-8 hover:bg-bg-card/60 transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-electric-dim/10 border border-electric-dim/20 flex items-center justify-center text-electric group-hover:text-electric-bright group-hover:border-electric-dim/40 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{f.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-electric-dim/10 text-electric font-medium">{f.tag}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm">{f.description}</p>
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
    { num: "01", title: "Send a token", description: "Paste a contract address or a $ticker into the Telegram chat. No dashboard, no signup form.", accent: "from-electric-dim to-electric" },
    { num: "02", title: "The analyst agent researches it", description: "Onchain reads, holder and liquidity checks, and the launch history of every wallet involved.", accent: "from-electric to-purple" },
    { num: "03", title: "The risk agent stress-tests it", description: "A second agent looks for what the first one missed and calibrates the verdict before anything is sent.", accent: "from-purple to-gold" },
    { num: "04", title: "You get the read", description: "A short verdict with the evidence: wallets, links, and the checks that fired.", accent: "from-gold to-gold-bright" },
  ];

  return (
    <section className="relative py-32 px-6" id="how-it-works">
      <div ref={ref} className="relative max-w-4xl mx-auto opacity-0">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">DM to verdict</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">Four steps, one chat.</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric-dim via-purple to-gold opacity-20 hidden md:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group">
                <div className="shrink-0 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity shadow-lg`}>
                    {s.num}
                  </div>
                </div>
                <div className="border-glow rounded-xl bg-bg-card/30 backdrop-blur-sm p-6 flex-1 group-hover:bg-bg-card/50 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{s.description}</p>
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
    { name: "Claude Code", description: "Agent runtime" },
    { name: "Claude Opus", description: "Reasoning model" },
    { name: "Telegram", description: "Interface" },
    { name: "Base", description: "Primary chain" },
  ];
  const agents = [
    { role: "Analyst", job: "Finds and researches tokens" },
    { role: "Risk & Quant", job: "Stress-tests every read" },
    { role: "Socials", job: "Checks people and accounts" },
  ];

  return (
    <section className="relative py-32 px-6" id="tech">
      <div ref={ref} className="max-w-4xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <p className="text-purple text-sm font-semibold tracking-widest uppercase mb-3">Under the hood</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Built on Claude</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Three <span className="text-electric-bright font-medium">Claude</span> agents run the desk around the clock on Claude Code. They share skills, onchain tools and a written knowledge base that gets sharper after every weekly review.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((b, i) => (
            <div key={i} className="group border-glow rounded-xl bg-bg-card/40 backdrop-blur-sm px-6 py-4 hover:bg-bg-card/60 transition-all duration-300 cursor-default hover:scale-[1.03]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-electric to-gold" />
                <div>
                  <span className="text-text-primary font-semibold text-sm">{b.name}</span>
                  <span className="text-text-muted text-xs ml-2">{b.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desk card */}
        <div className="mt-12 max-w-md mx-auto border-glow rounded-2xl bg-bg-card/40 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-[44px] h-[44px]">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-electric-dim via-electric to-gold opacity-40 blur-[5px] animate-pulse-glow" />
              <Image src="/mascot.png" alt="Moltino" width={44} height={44}
                className="relative w-full h-full"
                style={{
                  maskImage: "radial-gradient(circle, black 36%, transparent 68%)",
                  WebkitMaskImage: "radial-gradient(circle, black 36%, transparent 68%)",
                }}
              />
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">moltino desk</p>
              <p className="text-text-muted text-xs font-mono">3 agents · Claude Code</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-gold text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Early access soon
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {agents.map((a, i) => (
              <div key={i}><p className="text-text-primary text-sm font-medium mb-1">{a.role}</p><p className="text-text-muted text-xs">{a.job}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border-subtle/50 py-16 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Due diligence, <span className="text-gradient">on demand</span>
          </h3>
          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-8">
            Early access is opening soon. Open the bot to be first in, or write to us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-border-subtle text-text-primary font-medium hover:bg-white/10 hover:border-text-muted transition-all duration-300 backdrop-blur-sm">
              <TelegramIcon size={18} />
              @moltino_bot
            </a>
            <a href={`mailto:${CONTACT}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-text-secondary font-medium hover:text-text-primary hover:border-text-muted transition-all duration-300 backdrop-blur-sm">
              {CONTACT}
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle/30">
          <div className="flex items-center gap-2.5">
            <div className="relative w-[24px] h-[24px]">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-electric to-gold opacity-35 blur-[3px]" />
              <Image src="/mascot.png" alt="Moltino" width={24} height={24}
                className="relative w-full h-full"
                style={{
                  maskImage: "radial-gradient(circle, black 34%, transparent 66%)",
                  WebkitMaskImage: "radial-gradient(circle, black 34%, transparent 66%)",
                }}
              />
            </div>
            <span className="text-text-muted text-sm">moltino.xyz · built by Gio · <a href="https://github.com/Axiom89" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a></span>
          </div>
          <p className="text-text-muted text-sm font-mono">research, not financial advice</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Main Page ──────────────────────────────── */
export default function Home() {
  return (
    <div className="relative space-grid noise-bg vignette">
      <Starfield />
      <NebulaBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Divider />
        <WhatItDoes />
        <Divider />
        <HowItWorks />
        <Divider />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
}
