
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Eye,
  Flag,
  Heart,
  Lock,
  MailOpen,
  Menu,
  MessageSquareText,
  PenLine,
  ShieldCheck,
  X,
} from 'lucide-react'

import { IconBtn, T, Wordmark, useDraw } from '../components/r7'
import { useMobile } from '../components/prelude'
import { illustration } from '../lib/art'

const KOFI_TIP_URL = 'https://ko-fi.com/zodiacdatn'

/*
 * HERO ART
 * Preserves the original animated connection
 * between two illustrated dating profiles.
 */
function HeroArt({ mobile }) {
  const ref = useRef(null)
  const rm = useReducedMotion()

  useDraw(ref, {
    duration: 1100,
    delay: 450,
    ease: 'inOutQuad',
  })

  const W = mobile ? 343 : 600
  const H = mobile ? 390 : 560

  const a = mobile ? [96, 168] : [170, 290]
  const b = mobile ? [248, 150] : [430, 262]

  return (
    <div
      className="hero-art"
      ref={ref}
      style={{
        width: W,
        height: H,
        maxWidth: '100%',
      }}
    >
      <motion.img
        className="ha-card a"
        src={illustration('demo-aarav', 'portrait')}
        alt="Illustrated Zodiac DatN member"
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...T.slow,
          delay: 0.05,
        }}
      />

      <motion.img
        className="ha-card b"
        src={illustration('demo-meera', 'portrait')}
        alt="Illustrated potential cosmic match"
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...T.slow,
          delay: 0.15,
        }}
      />

      <svg
        className="ha-line"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        <path
          data-draw
          d={`M${a[0]} ${a[1]} C ${a[0] + 60} ${a[1] - 90}, ${b[0] - 60} ${b[1] - 90}, ${b[0]} ${b[1]}`}
          className="ha-path"
        />

        <motion.circle
          cx={a[0]}
          cy={a[1]}
          r="6"
          className="ha-dot"
          initial={rm ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ...T.base,
            delay: 0.3,
          }}
        />

        <motion.circle
          cx={b[0]}
          cy={b[1]}
          r="6"
          className="ha-dot"
          initial={rm ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ...T.base,
            delay: 0.38,
          }}
        />
      </svg>

      <motion.p
        className="ha-msg"
        initial={rm ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...T.slow,
          delay: 1.45,
        }}
      >
        <span className="agent-tag">
          <PenLine
            size={13}
            strokeWidth={1.9}
            aria-hidden="true"
          />
          Written by Meera's Cosmic Wingmate
        </span>

        <span className="bubble">
          What's your zodiac sign? I'm a Leo ♌ ✨
        </span>
      </motion.p>
    </div>
  )
}

/*
 * SCROLL REVEAL
 * Original motion behavior preserved.
 */
function Reveal({
  children,
  i = 0,
  className = '',
  as = 'div',
}) {
  const rm = useReducedMotion()
  const M = motion[as]

  return (
    <M
      className={className}
      initial={
        rm
          ? { opacity: 0 }
          : { opacity: 0, y: 14 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        ...T.slow,
        delay: i * 0.06,
      }}
    >
      {children}
    </M>
  )
}

/*
 * HOW COSMIC MATCHING WORKS
 */
const STEPS = [
  [
    MessageSquareText,
    'Discover Your Cosmic Match',
    'Explore singles through photos, prompts, shared interests and zodiac-inspired connections. Like what catches your eye.',
  ],
  [
    PenLine,
    'Let Your Cosmic Wingmates Break the Ice',
    'When you both like each other, your AI wingmates can start the conversation in your own texting styles. Read along and take over anytime.',
  ],
  [
    MailOpen,
    'Discover Your Cosmic Chemistry',
    'Your wingmate shares a private letter explaining what clicked, using real conversation details. You decide what happens next.',
  ],
]

/*
 * SAFETY AND PRIVACY
 */
const TRUST = [
  [
    ShieldCheck,
    'Every Photo Is Checked',
    'Each new photo gets an automatic safety check before anyone sees it: no contact details, QR codes or explicit content.',
  ],
  [
    Eye,
    'You See Every Word',
    'Every message a Cosmic Wingmate writes is labelled for both of you. Read along and take over at any moment.',
  ],
  [
    Lock,
    'Your Cosmic Identity Stays Yours',
    'Mark anything Public, Only if asked, or Private. Your Cosmic Wingmate never shares information marked Private.',
  ],
  [
    Flag,
    'Fakes Get Caught Early',
    'Your Cosmic Wingmate checks profiles before starting conversations and stops talking when something looks suspicious.',
  ],
]

/*
 * OPTIONAL KO-FI SUPPORT SECTION
 */
function TipSection({ mobile }) {
  return (
    <section
      id="support"
      aria-labelledby="support-heading"
      style={{
        padding: mobile ? '64px 20px' : '90px 32px',
        textAlign: 'center',
      }}
    >
      <Reveal>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: mobile ? '36px 20px' : '52px 40px',
            border: '1px solid rgba(171, 138, 255, 0.24)',
            borderRadius: 24,
            background:
              'linear-gradient(145deg, rgba(150, 100, 255, 0.09), rgba(255, 100, 160, 0.035))',
          }}
        >
          <Heart
            size={36}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{
              color: '#C5A5FF',
              marginBottom: 18,
            }}
          />

          <h2
            className="h2"
            id="support-heading"
            style={{ marginBottom: 16 }}
          >
            Find Love. Tip Later.
          </h2>

          <p
            className="lead"
            style={{
              maxWidth: 560,
              margin: '0 auto 24px',
            }}
          >
            We believe finding a meaningful connection
            shouldn't require an expensive subscription.
            Explore your cosmic chemistry for free.
            If Zodiac DatN helps you find someone special,
            you can celebrate your connection with an
            optional tip.
          </p>

          <p
            className="small"
            style={{
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Suggested tips: $11 · $33 · $55
          </p>

          <a
            className={`btn primary lg ${mobile ? 'block' : ''}`}
            href={KOFI_TIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: mobile ? 'flex' : 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <Heart size={18} aria-hidden="true" />
            Leave a Tip
            <ArrowRight size={18} aria-hidden="true" />
          </a>

          <p
            className="small"
            style={{
              marginTop: 18,
              opacity: 0.7,
            }}
          >
            Tipping is always optional.
            No payment is required to support your
            journey toward a meaningful connection.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

/*
 * MAIN LANDING PAGE
 */
export default function Landing() {
  const mobile = useMobile()
  const [menu, setMenu] = useState(false)

  return (
    <div
      className={`scr landing landing-page ${mobile ? 'm' : 'd'}`}
    >
      {/* HEADER */}
      <header className="l-nav">
        <Wordmark />

        {!mobile && (
          <nav className="l-links">
            <a href="#how">
              How Cosmic Matching Works
            </a>

            <a href="#trust">
              Safety and Privacy
            </a>
          </nav>
        )}

        {mobile ? (
          <IconBtn
            icon={menu ? X : Menu}
            label={menu ? 'Close menu' : 'Menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          />
        ) : (
          <div className="l-right">
            <Link
              className="link plain"
              to="/login"
            >
              Log in
            </Link>

            <Link
              className="btn primary"
              to="/signup"
            >
              Find My Cosmic Match
            </Link>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {mobile && menu && (
        <nav className="l-menu card">
          <a
            href="#how"
            onClick={() => setMenu(false)}
          >
            How Cosmic Matching Works
          </a>

          <a
            href="#trust"
            onClick={() => setMenu(false)}
          >
            Safety and Privacy
          </a>

          <Link to="/login">
            Log in
          </Link>

          <a
            href="#support"
            onClick={() => setMenu(false)}
          >
            Support Us ❤️
          </a>
        </nav>
      )}

      {/* HERO */}
      <section className="l-hero">
        <div className="l-copy">
          <h1 className="l-h">
            Your Next Love Story Is Written in the Stars.
          </h1>

          <p className="lead">
            Discover meaningful connections through
            shared interests, personality and
            zodiac-inspired chemistry. When the
            attraction is mutual, your AI Cosmic
            Wingmates can break the ice in your own
            words. Read every message and take over
            whenever you're ready.
          </p>

          <div className="l-ctas">
            <Link
              className={`btn primary lg ${mobile ? 'block' : ''}`}
              to="/signup"
            >
              Find My Cosmic Match
            </Link>

            {!mobile && (
              <a
                className="btn ghost lg"
                href="#how"
              >
                See How It Works

                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            )}
          </div>

          <p className="small">
            {mobile ? (
              <>
                Already here?{' '}
                <Link
                  className="link"
                  to="/login"
                >
                  Log in
                </Link>
              </>
            ) : (
              'Written in the Stars. Confirmed by Chemistry.'
            )}
          </p>
        </div>

        <HeroArt mobile={mobile} />
      </section>

      {/* HOW IT WORKS */}
      <section
        className="l-steps"
        id="how"
        aria-labelledby="how-h"
      >
        <h2
          className="h2"
          id="how-h"
        >
          How Cosmic Matching Works
        </h2>

        <ol>
          {STEPS.map(([I, t, d], i) => (
            <Reveal
              as="li"
              key={t}
              i={i}
            >
              <span className="st-n">
                {i + 1}
              </span>

              <I
                size={22}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <h3 className="h3">
                {t}
              </h3>

              <p>{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* SAFETY AND PRIVACY */}
      <section
        className="l-trust"
        id="trust"
      >
        <h2 className="h2">
          Cosmic Connections, Built on Trust
        </h2>

        <ul>
          {TRUST.map(([I, t, d], i) => (
            <Reveal
              as="li"
              key={t}
              i={i}
            >
              <I
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <div>
                <h3 className="h3">
                  {t}
                </h3>

                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* NEW: FIND LOVE. TIP LATER. */}
      <TipSection mobile={mobile} />

      {/* FINAL CALL TO ACTION */}
      <section className="l-cta">
        <Reveal>
          <h2 className="h2">
            Your Cosmic Journey Starts Here.
          </h2>

          <p className="lead">
            Create your profile, explore potential
            connections and teach your Cosmic Wingmate
            what matters to you. Your next meaningful
            connection could be one conversation away.
          </p>

          <Link
            className="btn primary lg"
            to="/signup"
          >
            Find My Cosmic Match
          </Link>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="l-foot">
        <Wordmark />

        <span className="small">
          Written in the Stars. Confirmed by Chemistry.
        </span>

        <a
          className="link"
          href={KOFI_TIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
          }}
        >
          <Heart size={14} aria-hidden="true" />
          Support Us
        </a>
      </footer>
    </div>
  )
}
