"use client";

import { useEffect, useState } from "react";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-elevated px-4 py-3 shadow-card">
      <span className="chat-dot h-2 w-2 rounded-full bg-ink-muted" />
      <span className="chat-dot h-2 w-2 rounded-full bg-ink-muted [animation-delay:160ms]" />
      <span className="chat-dot h-2 w-2 rounded-full bg-ink-muted [animation-delay:320ms]" />
    </div>
  );
}

function DeliveryTick({ double = false }) {
  return (
    <span className={`ml-1 inline-flex ${double ? "text-sky-bright" : "text-ink-muted"}`}>
      <svg viewBox="0 0 16 10" fill="currentColor" className="h-3 w-4">
        {double ? (
          <>
            <path d="M1 5 L5 9 L14 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 5 L9 9 L18 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <path d="M3 5 L7 9 L16 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}

const BOOKING_ID = "CC-2026-08471";

export default function WhatsAppPanel({ farmer, open, onClose, onConfirm }) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!open || !farmer) {
      setPhase("idle");
      return undefined;
    }

    if (farmer.status === "Confirmed") {
      setPhase("confirmed");
      return undefined;
    }

    setPhase("typing");
    const t1 = window.setTimeout(() => setPhase("reply"), 2200);
    const t2 = window.setTimeout(() => {
      setPhase("confirmed");
      onConfirm?.(farmer.id);
    }, 3400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open, farmer, onConfirm]);

  if (!open || !farmer) return null;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 hidden w-[390px] flex-col shadow-whatsapp lg:flex panel-in"
      style={{
        background: "#070E1C",
        borderLeft: "1px solid #1A3050",
      }}
    >
      {/* ─── WhatsApp-style header ──────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={{ background: "#0A3D2D" }}
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald/20 text-emerald-bright">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22Z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-sans text-sm font-semibold text-white truncate">{farmer.name}</div>
          <div className="font-sans text-xs text-white/55">{farmer.phone}</div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close WhatsApp panel"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>

      {/* ─── Farmer context strip ───────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-3 text-xs">
          <div>
            <span className="text-ink-muted">District: </span>
            <span className="font-sans font-medium text-ink-secondary">{farmer.district}</span>
          </div>
          <div className="h-3.5 w-px bg-line" />
          <div>
            <span className="text-ink-muted">Harvested: </span>
            <span className="font-sans font-medium text-ink-secondary">{farmer.fieldHarvested}</span>
          </div>
        </div>
        <div className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium ${
          farmer.riskScore > 85 ? "risk-high" : farmer.riskScore >= 70 ? "risk-medium" : "risk-low"
        }`}>
          {farmer.riskScore}% risk
        </div>
      </div>

      {/* ─── WhatsApp chat background ───────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 scrollbar-none"
        style={{
          background: "linear-gradient(180deg, #040C18 0%, #060E1A 100%)",
          backgroundImage: `radial-gradient(rgba(26,48,80,0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="space-y-3">
          {/* System label */}
          <div className="flex justify-center">
            <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10px] text-ink-muted">
              CropClear Automated Intervention · {timeStr} IST
            </span>
          </div>

          {/* CropClear outbound message */}
          <div className="flex justify-start">
            <div className="max-w-[82%] space-y-1">
              <div
                className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed shadow-card"
                style={{ background: "#122236", color: "#EFF6FF" }}
              >
                <div className="font-sans text-sm leading-relaxed">
                  ਪਾਜੀ <span className="font-semibold text-amber-bright">{farmer.name}</span> ਜੀ,
                  ਤੁਹਾਡਾ ਖੇਤ <span className="text-amber-bright">{farmer.fieldHarvested}</span> ਵੱਢਿਆ ਗਿਆ ਸੀ।
                </div>
                <div className="mt-2 font-sans text-sm leading-relaxed">
                  ਨੇੜੇ <span className="font-semibold text-emerald-bright">ਮੁਫ਼ਤ Happy Seeder</span> ਉਪਲਬਧ ਹੈ।
                  ਕੀ ਤੁਸੀਂ ਕੱਲ੍ਹ ਸਵੇਰੇ ਬੁੱਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?
                </div>
                <div
                  className="mt-2.5 rounded-lg border border-line p-2.5 font-sans text-xs text-ink-secondary"
                  style={{ background: "rgba(7,14,28,0.5)" }}
                >
                  <span className="font-medium text-ink-primary">English: </span>
                  Your field was harvested {farmer.fieldHarvested}. A free Happy Seeder is available nearby.
                  Book for tomorrow morning?
                </div>
                <div className="mt-2 flex items-center justify-end gap-1">
                  <span className="font-mono text-[10px] text-ink-muted">{timeStr}</span>
                  <DeliveryTick double={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          {phase === "typing" && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          {/* Farmer reply */}
          {(phase === "reply" || phase === "confirmed") && (
            <div className="flex justify-end">
              <div className="max-w-[55%] space-y-1">
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-3 shadow-card"
                  style={{ background: "#1A4D3A" }}
                >
                  <div className="font-sans text-base font-bold text-white">
                    HAAN ✅
                  </div>
                  <div className="mt-0.5 font-sans text-xs text-white/60">
                    (Yes, please book!)
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-1">
                    <span className="font-mono text-[10px] text-white/40">{timeStr}</span>
                    <DeliveryTick double />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking confirmation */}
          {phase === "confirmed" && (
            <div className="flex justify-start">
              <div className="max-w-[85%] space-y-1">
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 shadow-card"
                  style={{ background: "#122236" }}
                >
                  <div className="font-sans text-sm leading-relaxed text-ink-primary">
                    ਸ਼ਾਬਾਸ਼! <span className="font-semibold text-emerald-bright">Happy Seeder</span> ਕੱਲ੍ਹ ਸਵੇਰੇ <span className="font-semibold text-amber-bright">8:00 ਵਜੇ</span> ਬੁੱਕ ਹੋ ਗਿਆ।
                  </div>
                  <div className="mt-2 font-sans text-sm text-ink-primary">
                    📍 ਲੋਕੇਸ਼ਨ ਪਿੰਨ ਭੇਜਿਆ ਗਿਆ ਹੈ।
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-1">
                    <span className="font-mono text-[10px] text-ink-muted">{timeStr}</span>
                    <DeliveryTick double />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success state */}
          {phase === "confirmed" && (
            <div
              className="mt-2 rounded-xl border border-emerald-ring p-4 pop-in"
              style={{ background: "rgba(16,185,129,0.08)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald/20">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-emerald-bright">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-sans text-sm font-bold text-emerald-bright">
                    Fire Prevented
                  </div>
                  <div className="font-sans text-xs text-emerald/70">
                    Happy Seeder confirmed · {farmer.village}, {farmer.district}
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-emerald/20 bg-emerald/5 p-2.5">
                  <div className="font-mono text-ink-muted">Booking ID</div>
                  <div className="mt-0.5 font-mono font-medium text-emerald-bright">{BOOKING_ID}</div>
                </div>
                <div className="rounded-lg border border-emerald/20 bg-emerald/5 p-2.5">
                  <div className="font-mono text-ink-muted">Scheduled</div>
                  <div className="mt-0.5 font-mono font-medium text-emerald-bright">Tomorrow 8:00 AM</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <div className="border-t border-line px-4 py-3">
        <div className="rounded-xl border border-line bg-surface px-3.5 py-2.5">
          <div className="font-sans text-xs leading-relaxed text-ink-muted">
            <span className="font-medium text-ink-secondary">Automated intervention. </span>
            WhatsApp template delivery and SMS fallback are simulated locally. Punjabi messages are dispatched at scale via the CropClear messaging bridge.
          </div>
        </div>
      </div>
    </div>
  );
}
