export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center rounded-xl border border-amber-ring bg-amber-faint ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className={`${compact ? "h-5 w-5" : "h-6 w-6"} text-amber`}
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
          <circle cx="31" cy="31" r="1.8" fill="currentColor" opacity="0.8" />
          <circle cx="22" cy="40" r="1.8" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {!compact && (
        <div>
          <div className="font-display text-base font-semibold tracking-[0.2em] text-amber">
            CROPCLEAR
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-muted">
            Mission Control
          </div>
        </div>
      )}
    </div>
  );
}
