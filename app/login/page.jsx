"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function GovernmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  );
}

function OfficerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function SatelliteStatusDot({ district, risk }) {
  const color = risk > 85 ? "#EF4444" : risk >= 70 ? "#F97316" : "#F59E0B";
  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-sans text-xs text-ink-secondary">{district}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-ink-muted">{risk}%</span>
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("government");
  const [email, setEmail] = useState("demo@cropclear.in");
  const [password, setPassword] = useState("CropClear2026");

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cropclear-role", role);
    }
    router.push("/dashboard");
  };

  const districtPreview = [
    { district: "Ludhiana, PB", risk: 91 },
    { district: "Bathinda, PB", risk: 94 },
    { district: "Amritsar, PB", risk: 87 },
    { district: "Karnal, HR", risk: 76 },
    { district: "Kurukshetra, HR", risk: 82 },
  ];

  return (
    <main className="min-h-screen bg-void text-ink-primary">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.1fr_0.9fr]">

        {/* ─── Left Panel ─────────────────────────────────────────────── */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-surface px-8 py-10 lg:px-14 lg:py-12">
          {/* Background grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(26,48,80,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26,48,80,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          {/* Amber glow top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-amber opacity-[0.04] blur-3xl"
          />
          {/* Blue glow bottom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-12%] right-[5%] h-80 w-80 rounded-full bg-sky opacity-[0.06] blur-3xl"
          />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-ring bg-amber-faint">
                <svg viewBox="0 0 64 64" className="h-6 w-6 text-amber" fill="none" aria-hidden="true">
                  <path d="M14 38C21 24 31 16 47 13C40 29 32 40 18 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M46 14L52 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="52" cy="8" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="font-display text-lg font-semibold tracking-[0.2em] text-amber">CROPCLEAR</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted">Burn Prevention System</div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted">
                Punjab &amp; Haryana · Season 2026
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] text-ink-primary md:text-6xl lg:text-7xl">
                Predict the fire.
                <br />
                <span className="text-amber">Before it starts.</span>
              </h1>
              <p className="max-w-lg font-sans text-base leading-relaxed text-ink-secondary md:text-lg">
                Satellite-powered field monitoring and direct WhatsApp farmer interventions —
                giving government the tools to stop crop fires at scale.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "35,000+", label: "fires per season", color: "text-danger-light" },
                { value: "AQI 450+", label: "18× WHO limit", color: "text-caution-light" },
                { value: "15", label: "districts monitored", color: "text-amber-bright" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-line bg-card p-4">
                  <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="mt-1 font-sans text-xs text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* District risk preview */}
          <div className="relative z-10 mt-8">
            <div className="rounded-2xl border border-line bg-card/80 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-muted">Live District Risk</div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pingRing rounded-full bg-danger opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-danger-light">Burn Season Active</span>
                </div>
              </div>
              <div className="divide-y divide-line-subtle">
                {districtPreview.map((d) => (
                  <SatelliteStatusDot key={d.district} {...d} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Right Panel — Login Form ──────────────────────────────── */}
        <section className="flex items-center justify-center bg-base px-6 py-10 lg:px-12">
          <div className="w-full max-w-[480px]">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted">
                Authorized Access Only
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink-primary">
                Mission Control
              </h2>
              <p className="mt-1.5 font-sans text-sm text-ink-secondary">
                Use the demo credentials to enter the operations console.
              </p>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border border-line bg-card p-6 shadow-ops">
              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-sans text-sm text-ink-primary outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-amber focus:ring-1 focus:ring-amber"
                    placeholder="demo@cropclear.in"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-sans text-sm text-ink-primary outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-amber focus:ring-1 focus:ring-amber"
                    placeholder="CropClear2026"
                  />
                </div>

                {/* Role selection */}
                <div className="space-y-1.5">
                  <div className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Access Level
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("government")}
                      className={`group flex cursor-pointer flex-col gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
                        role === "government"
                          ? "border-amber bg-amber-faint"
                          : "border-line bg-surface hover:border-line-strong"
                      }`}
                    >
                      <div className={`transition-colors duration-150 ${role === "government" ? "text-amber" : "text-ink-secondary group-hover:text-ink-primary"}`}>
                        <GovernmentIcon />
                      </div>
                      <div>
                        <div className={`font-sans text-sm font-semibold transition-colors duration-150 ${role === "government" ? "text-amber" : "text-ink-primary"}`}>
                          Government
                        </div>
                        <div className="mt-0.5 font-sans text-xs text-ink-muted">
                          All 15 districts
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole("district")}
                      className={`group flex cursor-pointer flex-col gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
                        role === "district"
                          ? "border-amber bg-amber-faint"
                          : "border-line bg-surface hover:border-line-strong"
                      }`}
                    >
                      <div className={`transition-colors duration-150 ${role === "district" ? "text-amber" : "text-ink-secondary group-hover:text-ink-primary"}`}>
                        <OfficerIcon />
                      </div>
                      <div>
                        <div className={`font-sans text-sm font-semibold transition-colors duration-150 ${role === "district" ? "text-amber" : "text-ink-primary"}`}>
                          District Officer
                        </div>
                        <div className="mt-0.5 font-sans text-xs text-ink-muted">
                          Ludhiana district
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-void outline-none transition-all duration-200 hover:bg-amber-bright hover:shadow-amber-glow focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Enter Mission Control
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Demo notice */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-muted">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
              <p className="font-sans text-xs leading-relaxed text-ink-muted">
                Demo access only. All data is simulated. No external authentication or backend. State is stored locally for the hackathon presentation.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
