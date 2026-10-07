import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

const BOT_URL = "https://t.me/moltino_bot";
const CONTACT = "hello@moltino.xyz";
const EARLY_ACCESS = `mailto:${CONTACT}?subject=${encodeURIComponent("Moltino early access")}`;

function Avatar({ size }: { size: number }) {
  return <Image src="/mascot.png" alt="" width={size} height={size} className="avatar" style={{ width: size, height: size }} />;
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3a1 1 0 00-1.36-1.1L2.66 10.2a1 1 0 00.06 1.88l4.4 1.4 1.7 5.4a1 1 0 001.66.38l2.5-2.4 4.5 3.3a1 1 0 001.57-.6l2.9-15.26zM9.6 13.9l7.8-6.1-6.2 7.1-.3 3.1-1.3-4.1z" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

/* ───────────────────────────── Header ───────────────────────────── */
function Header() {
  return (
    <header className="top">
      <div className="wrap nav">
        <a href="#" className="brand"><Avatar size={36} />moltino</a>
        <nav className="nav-links" aria-label="Main">
          <a href="#what-it-does">What it does</a>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
          <a href={EARLY_ACCESS} className="btn btn-ink btn-sm">Get early access</a>
        </nav>
      </div>
    </header>
  );
}

/* ───────────────────────────── Hero ─────────────────────────────── */
function Msg({ d, className, children }: { d: number; className: string; children: ReactNode }) {
  return <div className={`msg ${className}`} style={{ "--d": `${d}s` } as CSSProperties}>{children}</div>;
}

function Phone() {
  return (
    <div className="phone-col">
      <span className="example-tag">Example conversation</span>
      <div className="phone" role="img" aria-label="Example Telegram conversation: you ask Moltino about a token, it replies with a risk read, agrees to watch the deployer, and later alerts you that the deployer moved 40% of supply.">
        <div className="screen" aria-hidden="true">
          <div className="chat-head">
            <span className="back">‹</span>
            <Avatar size={38} />
            <div>
              <div className="chat-name">Moltino</div>
              <div className="chat-sub">bot</div>
            </div>
          </div>
          <div className="chat">
            <Msg d={0.3} className="bubble out">
              anything I should know about $TIDE? <span className="mono">0x4f2a…b91c</span>
              <span className="time">14:02</span>
            </Msg>
            <Msg d={1.1} className="bubble in">
              checked it.
              <br />
              <span className="risk">high risk</span>
              <ul className="checks">
                <li><span className="x">✕</span>deployer funded by a wallet tied to 3 earlier rugs</li>
                <li><span className="x">✕</span>liquidity isn&apos;t locked</li>
                <li><span className="ok">✓</span>contract has no mint or blacklist</li>
              </ul>
              want me to keep an eye on it?
              <span className="time">14:02</span>
            </Msg>
            <Msg d={2.0} className="bubble out">
              yes, ping me if the dev sells
              <span className="time">14:03</span>
            </Msg>
            <Msg d={2.7} className="bubble in">
              on it. I&apos;ll message you if the deployer moves tokens or the liquidity changes.
              <span className="time">14:03</span>
            </Msg>
            <Msg d={3.5} className="day">later that day</Msg>
            <Msg d={4.1} className="bubble in">
              <strong>heads up:</strong> the $TIDE deployer just sent 40% of supply to a fresh wallet.
              <br />
              tx <span className="mono">0x9be1…07a2</span>
              <span className="time">17:48</span>
            </Msg>
          </div>
          <div className="chat-input">
            <span className="field">Message</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="h1">Your own onchain agent, on Telegram.</h1>
          <p className="lead">
            Moltino watches your wallets and the tokens you care about, checks anything before you buy, and messages you when something changes. Just text it.
          </p>
          <div className="hero-ctas">
            <a href={EARLY_ACCESS} className="btn btn-ink">Get early access</a>
            <a href={BOT_URL} className="btn btn-line" target="_blank" rel="noopener noreferrer"><TelegramIcon />@moltino_bot</a>
          </div>
          <p className="hero-note">Covers Base, Ethereum and Robinhood Chain. Early access opens soon; email us and you&apos;ll be among the first in.</p>
        </div>
        <Phone />
      </div>
    </section>
  );
}

/* ───────────────────────────── Sections ─────────────────────────── */
const ASKS = [
  "is this contract safe?",
  "who's behind this token?",
  "has this dev launched before?",
  "watch my wallet and tell me when anything moves",
  "is the liquidity locked?",
  "what's CT saying about $TIDE today?",
  "tell me when smart wallets buy something new on base",
  "what changed in my bags overnight?",
  "who's been pushing this on X?",
];

function Asks() {
  return (
    <section className="section" aria-labelledby="asks-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="asks-title">Text it like a friend who reads chains.</h2>
          <p className="muted">No dashboards and no commands to learn. Ask in plain words, the way you&apos;d ask the smartest person in your group chat.</p>
        </div>
        <div className="asks">
          {ASKS.map((a) => <span key={a} className="ask">{a}</span>)}
        </div>
      </div>
    </section>
  );
}

const AWAY = [
  {
    title: "It watches",
    body: "Add the wallets, tokens and devs you care about. Moltino keeps watching after you close Telegram.",
    says: "your watchlist: 3 wallets, 5 tokens, 2 devs. all quiet so far.",
  },
  {
    title: "It checks",
    body: "Send any contract address on Base, Ethereum or Robinhood Chain and get a risk read with the evidence: who deployed it, who paid for it, liquidity, holders and socials.",
    says: "6 wallets sniped the first block and still hold 22% of supply.",
  },
  {
    title: "It briefs you",
    body: "A short morning note on your bags and the accounts you follow, so you can catch up without scrolling CT for an hour.",
    says: "gm. 2 of your tokens moved more than 20% overnight and one dev wallet sold. want details?",
  },
];

function Away() {
  return (
    <section className="section" id="what-it-does" aria-labelledby="away-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="away-title">It keeps working while you&apos;re away.</h2>
        </div>
        <div className="away">
          {AWAY.map((f) => (
            <div key={f.title} className="away-item">
              <h3 className="h3">{f.title}</h3>
              <p className="muted">{f.body}</p>
              <div className="from-moltino">
                <Avatar size={28} />
                <div className="bubble in">{f.says}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROMISES = [
  { title: "It only reads.", body: "Moltino looks at public chain data and the wallets you add. It can't move your funds." },
  { title: "It never asks for your keys.", body: "No seed phrase, no private key, ever. Anyone asking for one in Moltino's name is a scammer." },
  { title: "It doesn't trade for you.", body: "It tells you what it found and shows the evidence. The decision stays yours." },
  { title: "You decide what it remembers.", body: "Add or remove wallets whenever you like, and ask it to forget your watchlist at any time." },
];

function Privacy() {
  return (
    <section className="section band" id="privacy" aria-labelledby="privacy-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="privacy-title">Your agent works for you, and only you.</h2>
        </div>
        <div className="promises">
          {PROMISES.map((p) => (
            <div key={p.title} className="promise">
              <Check />
              <div>
                <strong>{p.title}</strong>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "You send a message", body: "A contract address, a wallet, or a plain question." },
  { title: "An analyst agent researches it", body: "Onchain reads: deployer, funders, liquidity, holders, early buyers." },
  { title: "A socials agent checks the people", body: "Who runs it, who is pushing it, and whether those accounts are real." },
  { title: "A risk agent stress-tests the read", body: "It looks for what the others missed before anything reaches you." },
];

function BuiltOnClaude() {
  return (
    <section className="section" aria-labelledby="claude-title">
      <div className="wrap claude-grid">
        <div className="claude-copy">
          <h2 className="h2" id="claude-title">Built on Claude.</h2>
          <p>
            Behind the chat, a small desk of Claude agents works every request. They run on Claude Code, share a written playbook of onchain checks, and review their own misses every week, so each read is a little sharper than the last.
          </p>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="num">{i + 1}</span>
              <div><strong>{s.title}</strong><span className="muted">{s.body}</span></div>
            </li>
          ))}
          <li className="step last">
            <span className="num" aria-hidden="true"><TelegramIcon /></span>
            <div><strong>Moltino replies</strong><span className="muted">A short read with the evidence attached, right in your chat.</span></div>
          </li>
        </ol>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "Does Moltino trade for me?", a: "No. It reads chains and tells you what it found. It can't sign transactions or move funds." },
  { q: "Which chains does it cover?", a: "Base, Ethereum and Robinhood Chain." },
  { q: "Is this financial advice?", a: "No. Moltino gives you research and risk reads with the evidence attached. What you do with them is your call." },
  { q: "When can I use it?", a: `Early access opens soon. Email ${CONTACT} and you'll be among the first in.` },
  { q: "Who's behind Moltino?", a: "Moltino is built by Gio, a builder in the Base ecosystem, on top of Claude by Anthropic." },
];

function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="faq-title">Questions</h2>
        </div>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="wrap" aria-labelledby="closer-title">
      <div className="closer">
        <Avatar size={96} />
        <h2 className="h2" id="closer-title">Get your own Moltino.</h2>
        <a href={EARLY_ACCESS} className="btn btn-ink">Get early access</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-row">
          <a href="#" className="brand"><Avatar size={30} />moltino</a>
          <div className="foot-links">
            <a href={BOT_URL} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </div>
          <p className="fine">© 2026 Moltino. Research, not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Asks />
        <Away />
        <Privacy />
        <BuiltOnClaude />
        <Faq />
        <Closer />
      </main>
      <Footer />
    </>
  );
}
