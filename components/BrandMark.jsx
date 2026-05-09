export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center rounded-2xl border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.08)] ${compact ? "h-9 w-9" : "h-11 w-11"}`}>
        <svg viewBox="0 0 64 64" className={`${compact ? "h-6 w-6" : "h-7 w-7"} text-[var(--accent-green)]`} fill="none" aria-hidden="true">
          <path d="M14 39C22 24 32 16 48 13C40 29 31 41 18 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="52" cy="8" r="2.5" fill="currentColor" />
          <path d="M46 14L52 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 28L35 23L41 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <circle cx="22" cy="39" r="1.8" fill="currentColor" opacity="0.8" />
          <circle cx="31" cy="31" r="1.8" fill="currentColor" opacity="0.9" />
        </svg>
      </div>
      {!compact ? (
        <div>
          <div className="font-display text-xl tracking-[0.22em] text-[var(--accent-green)]">CROPCLEAR</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">Mission Control</div>
        </div>
      ) : null}
    </div>
  );
}
