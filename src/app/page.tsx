import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

const BOT_URL = "https://t.me/moltino_bot";
const CONTACT = "hello@moltino.xyz";
const BUILDER_URL = "https://x.com/tyrealgg";
const FAIR_URL = "https://fairfund.vc";
const FAIR_X = "https://x.com/fair_vc";
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

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg className="ok" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg>
  ) : (
    <svg className="x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
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
              anything I should know about $TIDE? <span className="mono">0x4f2a...b91c</span>
              <span className="time">14:02</span>
            </Msg>
            <Msg d={1.1} className="bubble in">
              checked it.
              <br />
              <span className="risk">high risk</span>
              <ul className="checks">
                <li><Mark ok={false} />deployer funded by a wallet tied to 3 earlier rugs</li>
                <li><Mark ok={false} />liquidity isn&apos;t locked</li>
                <li><Mark ok />contract has no mint or blacklist</li>
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
              tx <span className="mono">0x9be1...07a2</span>
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
          <h1 className="h1">Your own onchain assistant, on Telegram.</h1>
          <p className="lead">
            Paste a contract address and it tells you who deployed the token, who paid for the deploy and whether the liquidity is locked. Add your wallets and it messages you when something moves.
          </p>
          <div className="hero-ctas">
            <a href={EARLY_ACCESS} className="btn btn-ink">Get early access</a>
            <a href={BOT_URL} className="btn btn-line" target="_blank" rel="noopener noreferrer"><TelegramIcon />@moltino_bot</a>
          </div>
          <p className="hero-note">Works on Base, Ethereum and Robinhood Chain.</p>
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
          <h2 className="h2" id="asks-title">Ask in plain words.</h2>
          <p className="muted">Moltino works out which checks to run.</p>
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
    art: "/illustrations/watch.svg",
    title: "Watches your wallets",
    body: "Add wallets, tokens or a dev's address. Moltino keeps watching them after you close Telegram.",
    says: "your watchlist: 3 wallets, 5 tokens, 2 devs. all quiet so far.",
  },
  {
    art: "/illustrations/check.svg",
    title: "Checks any token",
    body: "Send a contract address on Base, Ethereum or Robinhood Chain. The read covers who deployed it, who paid for it, the liquidity, the holders and the socials, with the evidence attached.",
    says: "6 wallets sniped the first block and still hold 22% of supply.",
  },
  {
    art: "/illustrations/brief.svg",
    title: "Morning brief",
    body: "A short note each morning on your bags and the accounts you follow.",
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
              <Image src={f.art} alt="" width={400} height={300} className="spot" />
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
  { title: "Read-only", body: "It looks at public chain data and the wallets you add. It has no way to move funds or sign a transaction." },
  { title: "Your keys stay with you", body: "Moltino never asks for a seed phrase or private key. Anyone who does in its name is a scammer." },
  { title: "You make the calls", body: "It reports what it found and shows the evidence. Buying, selling or doing nothing is up to you." },
  { title: "Forget on request", body: "Remove a wallet whenever you like, or ask it to forget your whole watchlist." },
];

function Privacy() {
  return (
    <section className="section band" id="privacy" aria-labelledby="privacy-title">
      <div className="wrap privacy-grid">
        <div className="privacy-side">
          <h2 className="h2" id="privacy-title">Privacy and safety</h2>
          <Image src="/illustrations/vault.svg" alt="" width={400} height={360} className="vault" />
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
  { title: "You send a message", body: "A contract address, a wallet or a question." },
  { title: "The analyst agent researches it", body: "Deployer, funders, liquidity, holders and early buyers." },
  { title: "The socials agent checks the people", body: "Who runs the project, who is pushing it, and whether those accounts are real." },
  { title: "The risk agent stress-tests the read", body: "It looks for anything the first two missed." },
];

function BuiltOnClaude() {
  return (
    <section className="section" aria-labelledby="claude-title">
      <div className="wrap claude-grid">
        <div className="claude-copy">
          <h2 className="h2" id="claude-title">Built on Claude.</h2>
          <p>
            Each request goes to a small desk of Claude agents running on Claude Code. They share a written playbook of onchain checks, go over their own misses every week and update the playbook.
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
            <div><strong>Moltino replies</strong><span className="muted">A short read in your chat, evidence attached.</span></div>
          </li>
        </ol>
      </div>
    </section>
  );
}

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "What does a read include?",
    a: "Who deployed the token, which wallet paid for the deploy, and what those wallets launched before. Whether the liquidity is locked or burned, and who holds the LP tokens. How concentrated the holders are, how many wallets sniped the first blocks and whether they still hold. Contract flags such as a mint function, a blacklist or a sell tax. Then the people: the team's X and Telegram, and the accounts pushing the token.",
  },
  {
    q: "What counts as evidence?",
    a: "Transaction hashes, wallet addresses and explorer links. Every flag in a read points at the transaction or wallet behind it, so you can check it yourself.",
  },
  {
    q: "How does Moltino decide something is a rug?",
    a: "It needs evidence of extraction or abandonment: the deployer pulling liquidity, insiders selling supply they got for free, or a team that stops shipping and goes quiet. A price drop on its own doesn't count. When Moltino calls a rug, the read shows the transactions that prove it.",
  },
  {
    q: "What happens when a check can't be resolved?",
    a: "The read says so. If a funding trail runs into a bridge or an exchange, or a liquidity lock can't be verified onchain, Moltino marks that check as unresolved and tells you what's missing.",
  },
  {
    q: "Does Moltino trade for me?",
    a: "No. It reads public chain data and the wallets you add, and that's all it can do. It can't sign a transaction, approve a token or move funds, and it will never ask for a seed phrase or private key.",
  },
  {
    q: "Which chains does it cover?",
    a: "Base, Ethereum and Robinhood Chain. Wallet traces, liquidity checks and contract flags work the same way on all three.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Moltino tells you what the chain shows about a token and the people behind it, with the evidence attached. It won't tell you to buy or sell. What you do with a read is your call.",
  },
  {
    q: "When can I use it?",
    a: <>Early access opens soon. Email <a href={EARLY_ACCESS}>{CONTACT}</a> and we&apos;ll add you to the list. You&apos;ll get access through <a href={BOT_URL} target="_blank" rel="noopener noreferrer">@moltino_bot</a> on Telegram.</>,
  },
  {
    q: "Who's behind Moltino?",
    a: <>Moltino is built by <a href={BUILDER_URL} target="_blank" rel="noopener noreferrer">@tyrealgg</a>, an experienced web3 trader. It runs on Claude by Anthropic, and <a href={FAIR_URL} target="_blank" rel="noopener noreferrer">FAIR</a>, an autonomous venture fund, is an official partner.</>,
  },
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

function Partner() {
  return (
    <section className="wrap" aria-labelledby="partner-title">
      <div className="partner">
        <p className="partner-label" id="partner-title">Official partner</p>
        <div className="partner-body">
          <a href={FAIR_URL} target="_blank" rel="noopener noreferrer" className="partner-name">FAIR</a>
          <p className="muted">An autonomous venture fund.</p>
        </div>
        <div className="partner-links">
          <a href={FAIR_URL} target="_blank" rel="noopener noreferrer">fairfund.vc</a>
          <a href={FAIR_X} target="_blank" rel="noopener noreferrer">@fair_vc</a>
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
            <a href={BUILDER_URL} target="_blank" rel="noopener noreferrer">Built by @tyrealgg</a>
          </div>
          <p className="fine">© 2026 Moltino. Not financial advice.</p>
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
        <Partner />
        <Faq />
        <Closer />
      </main>
      <Footer />
    </>
  );
}
