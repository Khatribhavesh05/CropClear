export default function FarmerCard({ farmer, onWhatsApp, onSelect, selected = false }) {
  const badgeColor =
    farmer.riskScore > 85 ? "bg-[rgba(255,45,85,0.16)] text-[var(--accent-red)] border-[rgba(255,45,85,0.35)]" : farmer.riskScore >= 70 ? "bg-[rgba(255,107,53,0.16)] text-[var(--accent-orange)] border-[rgba(255,107,53,0.35)]" : "bg-[rgba(0,255,136,0.12)] text-[var(--accent-green)] border-[rgba(0,255,136,0.28)]";

  const statusColor =
    farmer.status === "Confirmed"
      ? "bg-[rgba(0,255,136,0.12)] text-[var(--accent-green)] border-[rgba(0,255,136,0.3)]"
      : farmer.status === "Alert Sent"
        ? "bg-[rgba(255,107,53,0.14)] text-[var(--accent-orange)] border-[rgba(255,107,53,0.3)]"
        : "bg-[rgba(255,255,255,0.07)] text-[var(--text-secondary)] border-[rgba(255,255,255,0.08)]";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(farmer)}
      className={`mission-card group w-full rounded-[22px] border p-4 text-left transition duration-200 hover:translate-y-[-2px] ${selected ? "border-[rgba(0,255,136,0.55)] bg-[rgba(0,255,136,0.06)]" : "border-[var(--border)] bg-[rgba(19,31,23,0.92)]"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg text-[var(--text-primary)]">{farmer.name}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">{farmer.village}, {farmer.district}</div>
        </div>
        <div className={`rounded-full border px-2.5 py-1 text-[11px] font-display uppercase tracking-[0.18em] ${badgeColor}`}>
          {farmer.riskScore}%
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className={`rounded-full border px-2.5 py-1 ${statusColor}`}>{farmer.status === "Confirmed" ? "Confirmed ✅" : farmer.status === "Alert Sent" ? "Alert Sent" : "Pending ⏳"}</span>
        <span className="rounded-full border border-[rgba(30,58,40,0.85)] bg-[rgba(10,15,13,0.65)] px-2.5 py-1 text-[var(--text-secondary)]">Field harvested: {farmer.fieldHarvested}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs text-[var(--text-secondary)]">
          <div className="font-display text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Phone</div>
          <div className="mt-1 text-[var(--text-primary)]">{farmer.phone}</div>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onWhatsApp?.(farmer);
          }}
          className="rounded-full border border-[rgba(0,255,136,0.4)] bg-[rgba(0,255,136,0.12)] px-3 py-2 text-xs font-display uppercase tracking-[0.18em] text-[var(--accent-green)] transition hover:bg-[rgba(0,255,136,0.18)]"
        >
          WhatsApp
        </button>
      </div>
    </button>
  );
}
