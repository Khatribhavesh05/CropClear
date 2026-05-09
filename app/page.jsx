"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TOTAL_FRAMES = 80;

function frameUrl(n) {
  return `/frames/frame_${String(n).padStart(4, "0")}.jpg`;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Logo ──────────────────────────────────────────────────────────────────
function CropClearLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
        <svg
          viewBox="0 0 64 64"
          className="h-5 w-5 text-white"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 38C21 24 31 16 47 13C40 29 32 40 18 49"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M46 14L52 8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="52" cy="8" r="2.5" fill="currentColor" />
          <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="0.65" />
          <circle cx="23" cy="40" r="1.5" fill="currentColor" opacity="0.45" />
        </svg>
      </div>
      <span className="font-display text-sm tracking-[0.26em] text-white">
        CROPCLEAR
      </span>
    </div>
  );
}

// ─── Section 1 — Hero ──────────────────────────────────────────────────────
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col">
      {/* Logo — top left */}
      <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
        <CropClearLogo />
      </div>

      {/* Hero text — centered */}
      <div className="flex flex-1 items-center justify-center px-6 pb-24 pt-32">
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1100ms ease-out, transform 1100ms ease-out",
          }}
          className="text-center"
        >
          <div className="relative inline-block">
            {/* Soft dark halo — only behind text */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/55 blur-[100px]"
              style={{ width: "145%", height: "170%" }}
            />

            <div className="relative space-y-4">
              <p
                className="font-display text-sm tracking-[0.42em] text-white/55 sm:text-base"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.95)" }}
              >
                EVERY OCTOBER,
              </p>

              <h1
                className="font-display leading-[1.04] text-white"
                style={{
                  fontSize: "clamp(2.75rem, 8.5vw, 6.5rem)",
                  textShadow:
                    "0 0 80px rgba(0,0,0,0.65), 0 4px 32px rgba(0,0,0,0.9)",
                }}
              >
                35,000 fires
                <br />
                <span style={{ color: "#ff5533" }}>destroy</span>
                <br />
                Punjab&rsquo;s air.
              </h1>

              <p
                className="mt-6 font-body text-lg text-white/50 sm:text-xl"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.98)" }}
              >
                This is not history. This happens every year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35">
        <span className="font-display text-[9px] tracking-[0.48em]">
          SCROLL
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  );
}

// ─── Section 2 — Stats ─────────────────────────────────────────────────────
const STATS = [
  { icon: "🔴", stat: "35,000+", label: "fires per season in Punjab alone" },
  { icon: "☠️", stat: "AQI 450+", label: "18× above WHO safe limit" },
  { icon: "💰", stat: "₹30,000 Cr", label: "annual economic damage" },
];

function StatsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <div ref={ref} className="w-full max-w-4xl">
        <p
          className="mb-8 text-center font-display text-[9px] tracking-[0.48em] text-white/40"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          THE SCALE OF DESTRUCTION
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/[0.67] p-6 backdrop-blur-md"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 700ms ease-out, transform 700ms ease-out",
                transitionDelay: inView ? `${i * 130}ms` : "0ms",
              }}
            >
              <div
                className="mb-3 text-3xl"
                role="img"
                aria-label={s.label}
              >
                {s.icon}
              </div>
              <div className="font-display text-2xl text-white sm:text-[1.75rem]">
                {s.stat}
              </div>
              <div className="mt-1.5 font-body text-sm leading-snug text-white/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — How it works ──────────────────────────────────────────────
const STEPS = [
  {
    icon: "🛰️",
    title: "Satellite detects harvest complete",
    body: "Sentinel-2 imagery processed daily flags every stubble field across Punjab and Haryana.",
  },
  {
    icon: "📱",
    title: "Farmer gets WhatsApp alert in Punjabi — 5 days before",
    body: "Personalised message in their language, on their phone — before the fire window opens.",
  },
  {
    icon: "✅",
    title: "Happy Seeder booked automatically. Fire prevented.",
    body: "Machinery dispatched at scale. The stubble is cleared before the match is ever lit.",
  },
];

function HowItWorksSection() {
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.08);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl space-y-10">
        {/* Title */}
        <div
          ref={titleRef}
          className="text-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 700ms ease-out, transform 700ms ease-out",
          }}
        >
          <p className="mb-4 font-display text-[9px] tracking-[0.48em] text-[#00ff88]/65">
            HOW IT WORKS
          </p>
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.1,
              textShadow: "0 4px 50px rgba(0,0,0,0.85)",
            }}
          >
            CropClear intervenes
            <br />
            <span style={{ color: "#00ff88" }}>before the match is lit.</span>
          </h2>
        </div>

        {/* Step cards */}
        <div ref={cardsRef} className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/65 p-6 backdrop-blur-md"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 700ms ease-out, transform 700ms ease-out",
                transitionDelay: cardsVisible ? `${i * 110}ms` : "0ms",
              }}
            >
              {/* Step number */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/8">
                  <span className="font-display text-xs text-[#00ff88]/70">
                    0{i + 1}
                  </span>
                </div>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              {/* Icon */}
              <div className="mb-4 text-2xl" aria-hidden="true">
                {step.icon}
              </div>

              <div className="mb-2 font-display text-[0.9rem] leading-snug text-white">
                {step.title}
              </div>
              <p className="font-body text-sm leading-relaxed text-white/50">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — Impact ────────────────────────────────────────────────────
function ImpactSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <div ref={ref} className="w-full max-w-4xl">
        <p
          className="mb-8 text-center font-display text-[9px] tracking-[0.48em] text-white/40"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          THE DIFFERENCE
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Without CropClear */}
          <div
            className="rounded-2xl border border-red-500/25 bg-red-950/40 p-7 backdrop-blur-md"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: inView ? "80ms" : "0ms",
            }}
          >
            <div className="mb-6 font-display text-[10px] tracking-[0.32em] text-red-400/75">
              WITHOUT CROPCLEAR
            </div>
            <ul className="space-y-5">
              {[
                { n: "35,000", u: "fires burning unchecked" },
                { n: "AQI 480", u: "Delhi chokes every winter" },
                { n: "₹30,000 Cr", u: "damage, year after year" },
              ].map((item, i) => (
                <li key={i}>
                  <div className="font-display text-2xl text-red-300">
                    {item.n}
                  </div>
                  <div className="mt-0.5 font-body text-sm text-red-300/55">
                    {item.u}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* With CropClear */}
          <div
            className="rounded-2xl border border-[#00ff88]/22 bg-[#00ff88]/[0.06] p-7 backdrop-blur-md"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: inView ? "220ms" : "0ms",
            }}
          >
            <div className="mb-6 font-display text-[10px] tracking-[0.32em] text-[#00ff88]/75">
              WITH CROPCLEAR
            </div>
            <ul className="space-y-5">
              {[
                { n: "10,500", u: "fires prevented this season" },
                { n: "−60 pts", u: "AQI improvement, measurable" },
                { n: "21,000 t", u: "CO₂ saved from the atmosphere" },
              ].map((item, i) => (
                <li key={i}>
                  <div className="font-display text-2xl text-[#00ff88]">
                    {item.n}
                  </div>
                  <div className="mt-0.5 font-body text-sm text-[#00ff88]/50">
                    {item.u}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — CTA ───────────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className="text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 1000ms ease-out, transform 1000ms ease-out",
        }}
      >
        <div className="relative inline-block">
          {/* Soft dark halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/55 blur-[110px]"
            style={{ width: "170%", height: "220%" }}
          />

          <div className="relative space-y-5">
            <p className="font-display text-[9px] tracking-[0.5em] text-[#00ff88]/60">
              THE CLOCK IS TICKING
            </p>

            <h2
              className="font-display text-white"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
                lineHeight: 1.08,
                textShadow: "0 0 80px rgba(0,0,0,0.7)",
              }}
            >
              The fire starts in 5 days.
            </h2>

            <p
              className="font-body text-xl text-white/60"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.95)" }}
            >
              CropClear is already watching.
            </p>

            <div className="pt-5">
              <Link
                href="/login"
                className="group inline-block rounded-2xl border-2 px-10 py-5 font-display text-sm tracking-[0.3em] text-[#00ff88] outline-none transition-all duration-300 hover:bg-[#00ff88]/10 hover:shadow-[0_0_48px_rgba(0,255,136,0.28)] focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  backgroundColor: "#0a0f0d",
                  borderColor: "#00ff88",
                }}
              >
                ENTER MISSION CONTROL
              </Link>
            </div>

            <p className="pt-1 font-body text-[11px] tracking-[0.22em] text-white/22">
              DEMO ACCESS · HACKATHON 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const bgRef = useRef(null);
  const preloadedRef = useRef([]);

  // Preload all 80 frames on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameUrl(i);
      preloadedRef.current.push(img);
    }
  }, []);

  // Scroll → frame (direct DOM mutation, no re-renders)
  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const n = Math.max(
        1,
        Math.min(TOTAL_FRAMES, Math.round(1 + pct * (TOTAL_FRAMES - 1)))
      );
      if (bgRef.current) {
        bgRef.current.style.backgroundImage = `url(${frameUrl(n)})`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Fixed scroll-driven background frame */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${frameUrl(1)})`,
          backgroundColor: "#0a0f0d",
        }}
      />

      {/* Scrollable content layers above frames */}
      <main className="relative z-10 overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <ImpactSection />
        <CTASection />
      </main>
    </>
  );
}
