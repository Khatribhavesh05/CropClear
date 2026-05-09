"use client";

import { useEffect, useState } from "react";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[var(--text-secondary)]">
      <span className="chat-dot h-2 w-2 rounded-full bg-[var(--accent-green)]" />
      <span className="chat-dot h-2 w-2 rounded-full bg-[var(--accent-green)] [animation-delay:120ms]" />
      <span className="chat-dot h-2 w-2 rounded-full bg-[var(--accent-green)] [animation-delay:240ms]" />
    </div>
  );
}

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
    const replyTimer = window.setTimeout(() => setPhase("reply"), 2000);
    const confirmTimer = window.setTimeout(() => {
      setPhase("confirmed");
      onConfirm?.(farmer.id);
    }, 3000);

    return () => {
      window.clearTimeout(replyTimer);
      window.clearTimeout(confirmTimer);
    };
  }, [open, farmer, onConfirm]);

  if (!open || !farmer) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 hidden w-[375px] border-l border-[var(--border)] bg-[linear-gradient(180deg,rgba(8,16,13,0.98),rgba(12,20,15,0.96))] shadow-[-28px_0_90px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <div className="font-display text-lg text-[var(--accent-green)]">WhatsApp Bridge</div>
            <div className="text-xs text-[var(--text-secondary)]">Live intervention thread</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
            Close
          </button>
        </div>

        <div className="border-b border-[var(--border)] px-5 py-4">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Farmer</div>
          <div className="mt-1 font-display text-2xl text-[var(--text-primary)]">{farmer.name}</div>
          <div className="mt-1 text-sm text-[var(--text-secondary)]">{farmer.village}, {farmer.district}</div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 scrollbar-none">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-[24px] rounded-bl-md bg-[rgba(0,255,136,0.14)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] shadow-[0_16px_35px_rgba(0,0,0,0.22)]">
              <div>ਪਾਜੀ {farmer.name} ਜੀ, ਤੁਹਾਡਾ ਖੇਤ {farmer.fieldHarvested} ਵੱਢਿਆ ਗਿਆ ਸੀ।</div>
              <div className="mt-2">ਨੇੜੇ ਮੁਫ਼ਤ Happy Seeder ਉਪਲਬਧ ਹੈ। ਕੀ ਤੁਸੀਂ ਕੱਲ੍ਹ ਸਵੇਰੇ ਬੁੱਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?</div>
              <div className="mt-2 text-xs text-[var(--text-secondary)]">English: Your field was harvested {farmer.fieldHarvested}. A free Happy Seeder is nearby. Book for tomorrow morning?</div>
            </div>
          </div>

          {phase === "typing" ? (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          ) : null}

          {phase === "reply" || phase === "confirmed" ? (
            <div className="flex justify-end">
              <div className="max-w-[68%] rounded-[24px] rounded-br-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm font-semibold text-[#08110d] shadow-[0_16px_35px_rgba(0,0,0,0.22)]">
                HAAN ✅
              </div>
            </div>
          ) : null}

          {phase === "confirmed" ? (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-[24px] rounded-bl-md bg-[rgba(0,255,136,0.14)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] shadow-[0_16px_35px_rgba(0,0,0,0.22)]">
                ਸ਼ਾਬਾਸ਼! Happy Seeder ਕੱਲ੍ਹ ਸਵੇਰੇ 8 ਵਜੇ ਬੁੱਕ ਹੋ ਗਿਆ।
                <div className="mt-2">📍 ਲੋਕੇਸ਼ਨ ਪਿੰਨ ਭੇਜਿਆ ਗਿਆ ਹੈ।</div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[var(--border)] px-5 py-4">
          <div className="rounded-[22px] border border-[rgba(0,255,136,0.18)] bg-[rgba(0,255,136,0.06)] px-4 py-3 text-xs leading-6 text-[var(--text-secondary)]">
            SMS fallback and WhatsApp template delivery are simulated locally for the hackathon demo.
          </div>
        </div>
      </div>
    </div>
  );
}
