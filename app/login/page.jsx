"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function CropClearLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(0,255,136,0.22)] bg-[rgba(0,255,136,0.08)] shadow-[0_0_40px_rgba(0,255,136,0.08)]">
        <svg viewBox="0 0 64 64" className="h-9 w-9 text-[var(--accent-green)]" fill="none" aria-hidden="true">
          <path d="M14 38C21 24 31 16 47 13C40 29 32 40 18 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 14L52 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="8" r="2.5" fill="currentColor" />
          <circle cx="41" cy="24" r="1.8" fill="currentColor" opacity="0.9" />
          <circle cx="31" cy="32" r="1.8" fill="currentColor" opacity="0.8" />
          <circle cx="22" cy="40" r="1.8" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
      <div>
        <div className="font-display text-2xl tracking-[0.24em] text-[var(--accent-green)]">CROPCLEAR</div>
        <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)]">Punjab & Haryana</div>
      </div>
    </div>
  );
}

function StatChip({ label }) {
  return (
    <div className="rounded-2xl border border-[rgba(0,255,136,0.14)] bg-[rgba(19,31,23,0.74)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="font-display text-lg text-[var(--accent-green)]">{label}</div>
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

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,255,136,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,107,53,0.14),transparent_24%),linear-gradient(180deg,#08100d_0%,#0a0f0d_100%)] text-[var(--text-primary)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.12fr_0.88fr]">
        <section className="relative flex items-center overflow-hidden px-6 py-10 lg:px-14">
          <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-[rgba(0,255,136,0.12)] blur-3xl" />
          <div className="absolute bottom-[-15%] right-[8%] h-80 w-80 rounded-full bg-[rgba(255,45,85,0.12)] blur-3xl" />
          <div className="relative z-10 max-w-2xl space-y-10">
            <CropClearLogo />
            <div className="space-y-5">
              <h1 className="max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)] md:text-7xl">
                Predict the fire before the match is lit.
              </h1>
              <p className="max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
                AI-powered stubble burn prevention for Punjab & Haryana
              </p>
            </div>
            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              <StatChip label="35,000+ fires/season" />
              <StatChip label="AQI 450+" />
              <StatChip label="₹30,000Cr damage" />
            </div>
            <div className="grid max-w-2xl gap-4 rounded-[32px] border border-[rgba(30,58,40,0.9)] bg-[rgba(19,31,23,0.58)] p-5 backdrop-blur-sm lg:grid-cols-2">
              <div className="rounded-3xl border border-[rgba(0,255,136,0.16)] bg-[rgba(0,255,136,0.06)] p-5">
                <div className="font-display text-3xl text-[var(--accent-green)]">LIVE</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">Satellite ingest, district risk scoring, and field interventions are active.</div>
              </div>
              <div className="rounded-3xl border border-[rgba(255,107,53,0.16)] bg-[rgba(255,107,53,0.06)] p-5 float-slow">
                <div className="font-display text-3xl text-[var(--accent-orange)]">2026</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">Hackathon-ready response room for government and district officers.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 lg:px-14">
          <div className="w-full max-w-[520px] rounded-[32px] border border-[rgba(30,58,40,0.9)] bg-[rgba(19,31,23,0.92)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
            <div className="mb-6 space-y-2">
              <div className="font-display text-2xl tracking-[0.18em] text-[var(--accent-green)]">CONTROL ACCESS</div>
              <p className="text-sm text-[var(--text-secondary)]">Use the demo credentials to enter the mission console.</p>
            </div>

            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm text-[var(--text-secondary)]">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-green)]"
                  placeholder="demo@cropclear.in"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-[var(--text-secondary)]">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-green)]"
                  placeholder="CropClear2026"
                />
              </label>

              <div className="space-y-2">
                <span className="text-sm text-[var(--text-secondary)]">Choose view</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("government")}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${role === "government" ? "border-[rgba(0,255,136,0.6)] bg-[rgba(0,255,136,0.12)]" : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[rgba(0,255,136,0.35)]"}`}
                  >
                    <div className="text-2xl">🏛️</div>
                    <div className="mt-2 font-display text-sm uppercase tracking-[0.2em]">Government Official</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("district")}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${role === "district" ? "border-[rgba(0,255,136,0.6)] bg-[rgba(0,255,136,0.12)]" : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[rgba(0,255,136,0.35)]"}`}
                  >
                    <div className="text-2xl">🌾</div>
                    <div className="mt-2 font-display text-sm uppercase tracking-[0.2em]">District Officer</div>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="w-full rounded-2xl bg-[var(--accent-green)] px-5 py-4 font-display text-base uppercase tracking-[0.2em] text-[#04120a] transition hover:translate-y-[-1px] hover:shadow-[0_16px_35px_rgba(0,255,136,0.2)]"
              >
                Enter Dashboard
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(30,58,40,0.85)] bg-[rgba(10,15,13,0.7)] p-4 text-xs leading-6 text-[var(--text-secondary)]">
              Demo access only. No external authentication, all state is stored locally for the hackathon presentation.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
