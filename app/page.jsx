"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

function SatelliteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function SeedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97Z" />
    </svg>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────
function CropClearLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-ring bg-amber-faint">
        <svg viewBox="0 0 64 64" className="h-5 w-5 text-amber" fill="none" aria-hidden="true">
          <path d="M14 38C21 24 31 16 47 13C40 29 32 40 18 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 14L52 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="8" r="2.5" fill="currentColor" />
          <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="0.65" />
        </svg>
      </div>
      <div>
        <div className="font-display text-sm font-semibold tracking-[0.22em] text-amber">CROPCLEAR</div>
        <div className="text-[9px] uppercase tracking-[0.3em] text-ink-muted">Burn Prevention System</div>
      </div>
    </div>
  );
}

// ─── Section 1 — Hero ────────────────────────────────────────────────
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col">
      <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
        <CropClearLogo />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-28 pt-32">
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1000ms ease-out, transform 1000ms ease-out",
          }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/60 blur-[90px]"
              style={{ width: "140%", height: "160%" }}
            />

            <div className="relative space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-ring bg-amber-faint px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pingRing rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                  Season 2026 · Burn Prevention Active
                </span>
              </div>

              <h1
                className="font-display font-semibold leading-[1.0] text-ink-primary"
                style={{
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  textShadow: "0 0 80px rgba(0,0,0,0.7), 0 4px 32px rgba(0,0,0,0.95)",
                }}
              >
                Predict the fire.
                <br />
                <span className="text-amber">Protect the air.</span>
              </h1>

              <p
                className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/55 sm:text-xl"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.98)" }}
              >
                CropClear gives India&rsquo;s government satellite intelligence
                and WhatsApp reach to stop{" "}
                <span className="text-white/80">35,000+ crop fires</span> before
                they start.
              </p>

              <div
                className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/30"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.98)" }}
              >
                Ministry of Environment · Punjab &amp; Haryana · 15 Districts
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/30">
        <span className="font-mono text-[9px] tracking-[0.45em]">SCROLL TO LEARN MORE</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── Section 2 — Stats ───────────────────────────────────────────────
const STATS = [
  {
    stat: "35,000+",
    label: "fires per season",
    sub: "Punjab & Haryana, every October–November",
    color: "text-danger-light",
    borderColor: "border-danger-ring",
    bgColor: "bg-danger-faint",
  },
  {
    stat: "AQI 450+",
    label: "18× WHO safe limit",
    sub: "Delhi air quality collapses every winter",
    color: "text-caution-light",
    borderColor: "border-caution-ring",
    bgColor: "bg-caution-faint",
  },
  {
    stat: "₹30,000 Cr",
    label: "annual economic damage",
    sub: "Crop loss, health costs, productivity",
    color: "text-amber-bright",
    borderColor: "border-amber-ring",
    bgColor: "bg-amber-faint",
  },
];

function StatsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <div ref={ref} className="w-full max-w-4xl">
        <div
          className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.45em] text-ink-muted"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 600ms ease-out" }}
        >
          The scale of the crisis
        </div>
        <h2
          className="mb-10 text-center font-display text-3xl font-semibold text-ink-primary sm:text-4xl"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 700ms 100ms ease-out",
            textShadow: "0 4px 40px rgba(0,0,0,0.8)",
          }}
        >
          Every harvest season, Punjab burns.
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${s.borderColor} ${s.bgColor} p-6 backdrop-blur-md`}
              style={{
                background: "rgba(7,14,28,0.72)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 700ms ease-out, transform 700ms ease-out",
                transitionDelay: inView ? `${i * 120}ms` : "0ms",
              }}
            >
              <div className={`font-display text-4xl font-bold sm:text-5xl ${s.color}`}
                style={{ textShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
                {s.stat}
              </div>
              <div className="mt-2 font-sans text-sm font-medium text-ink-primary">{s.label}</div>
              <div className="mt-1 font-sans text-xs leading-relaxed text-ink-secondary">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — How it works ────────────────────────────────────────
const STEPS = [
  {
    Icon: SatelliteIcon,
    num: "01",
    title: "Satellite detects harvest",
    body: "Sentinel-2 imagery processed daily. Every stubble field across Punjab and Haryana is assessed within 24 hours of harvest.",
    accent: "text-sky",
    borderColor: "border-sky-faint",
    bgColor: "bg-sky-faint",
  },
  {
    Icon: WhatsAppIcon,
    num: "02",
    title: "WhatsApp alert in Punjabi — 5 days before",
    body: "Personalised message in the farmer's own language, on their phone. A free Happy Seeder booking offer, before the fire window opens.",
    accent: "text-emerald",
    borderColor: "border-emerald-ring",
    bgColor: "bg-emerald-faint",
  },
  {
    Icon: SeedIcon,
    num: "03",
    title: "Seeder booked. Fire prevented.",
    body: "Machinery dispatched at scale. The stubble is cleared without burning. Air stays breathable. Farmer saves money. Everyone wins.",
    accent: "text-amber",
    borderColor: "border-amber-ring",
    bgColor: "bg-amber-faint",
  },
];

function HowItWorksSection() {
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.08);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl space-y-10">
        <div
          ref={titleRef}
          className="text-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 700ms ease-out, transform 700ms ease-out",
          }}
        >
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-muted">
            The intervention chain
          </div>
          <h2
            className="font-display font-semibold text-ink-primary"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.15,
              textShadow: "0 4px 50px rgba(0,0,0,0.85)",
            }}
          >
            CropClear intervenes{" "}
            <span className="text-amber">before the match is lit.</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line-strong p-6 backdrop-blur-md"
              style={{
                background: "rgba(7,14,28,0.75)",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 700ms ease-out, transform 700ms ease-out",
                transitionDelay: cardsVisible ? `${i * 110}ms` : "0ms",
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${step.borderColor} ${step.bgColor} ${step.accent}`}>
                  <step.Icon />
                </div>
                <span className="font-mono text-sm font-medium text-ink-muted">{step.num}</span>
              </div>
              <div className="mb-2 font-sans text-base font-semibold leading-snug text-ink-primary">
                {step.title}
              </div>
              <p className="font-sans text-sm leading-relaxed text-ink-secondary">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — Impact ──────────────────────────────────────────────
function ImpactSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <div ref={ref} className="w-full max-w-4xl">
        <div
          className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.45em] text-ink-muted"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 600ms ease-out" }}
        >
          Measurable impact
        </div>
        <h2
          className="mb-10 text-center font-display text-3xl font-semibold text-ink-primary sm:text-4xl"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 700ms 100ms ease-out",
            textShadow: "0 4px 40px rgba(0,0,0,0.8)",
          }}
        >
          The numbers tell the story.
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div
            className="rounded-2xl border border-danger-ring p-7 backdrop-blur-md"
            style={{
              background: "rgba(239,68,68,0.06)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: inView ? "80ms" : "0ms",
            }}
          >
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-danger-light/70">
              Without CropClear
            </div>
            <ul className="space-y-5">
              {[
                { n: "35,000", u: "fires burning unchecked" },
                { n: "AQI 480", u: "Delhi chokes every winter" },
                { n: "₹30,000 Cr", u: "damage, year after year" },
              ].map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <div className="w-2 h-2 flex-shrink-0 rounded-full bg-danger mt-1" />
                  <div>
                    <div className="font-display text-3xl font-bold text-danger-light">{item.n}</div>
                    <div className="font-sans text-sm text-danger-light/55">{item.u}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl border border-emerald-ring p-7 backdrop-blur-md"
            style={{
              background: "rgba(16,185,129,0.06)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: inView ? "220ms" : "0ms",
            }}
          >
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-bright/70">
              With CropClear
            </div>
            <ul className="space-y-5">
              {[
                { n: "10,500", u: "fires prevented this season" },
                { n: "−60 pts", u: "AQI improvement, measurable" },
                { n: "21,000 t", u: "CO₂ saved from the atmosphere" },
              ].map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <div className="w-2 h-2 flex-shrink-0 rounded-full bg-emerald mt-1" />
                  <div>
                    <div className="font-display text-3xl font-bold text-emerald-bright">{item.n}</div>
                    <div className="font-sans text-sm text-emerald-bright/55">{item.u}</div>
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

// ─── Section 5 — CTA ─────────────────────────────────────────────────
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/60 blur-[100px]"
            style={{ width: "180%", height: "230%" }}
          />

          <div className="relative space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-ink-muted">
              Mission Control
            </div>

            <h2
              className="font-display font-semibold text-ink-primary"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: 1.08,
                textShadow: "0 0 80px rgba(0,0,0,0.7)",
              }}
            >
              The burn window{" "}
              <span className="text-danger-light">opens in 5 days.</span>
              <br />
              <span className="text-ink-secondary/80">CropClear is already watching.</span>
            </h2>

            <div className="pt-4">
              <Link
                href="/login"
                className="group inline-flex items-center gap-3 rounded-2xl bg-amber px-10 py-5 font-display text-base font-semibold uppercase tracking-[0.25em] text-void outline-none transition-all duration-300 hover:bg-amber-bright hover:shadow-amber-glow focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Access Mission Control
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
              Demo Access · Season 2026 · 15 Districts · 75 Farmers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      {/* Static background — deep navy with warm amber/red horizon glow (evokes burning fields) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse 140% 60% at 50% 100%, rgba(239,68,68,0.18) 0%, rgba(249,115,22,0.12) 25%, transparent 55%)",
            "radial-gradient(ellipse 70% 35% at 25% 92%, rgba(245,158,11,0.2) 0%, transparent 50%)",
            "radial-gradient(ellipse 60% 30% at 75% 88%, rgba(239,68,68,0.15) 0%, transparent 45%)",
            "linear-gradient(180deg, #03070F 0%, #070E1C 55%, #0B0C06 100%)",
          ].join(", "),
        }}
      />
      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, rgba(3,7,15,0.82) 0%, rgba(7,14,28,0.75) 45%, rgba(3,7,15,0.88) 100%)",
        }}
      />

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
