function WhatsAppSendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function FarmerCard({ farmer, onWhatsApp, onSelect, selected = false }) {
  const riskClass =
    farmer.riskScore > 85
      ? "risk-high"
      : farmer.riskScore >= 70
      ? "risk-medium"
      : "risk-low";

  const statusClass =
    farmer.status === "Confirmed"
      ? "status-confirmed"
      : farmer.status === "Alert Sent"
      ? "status-alert"
      : "status-pending";

  const statusLabel =
    farmer.status === "Confirmed"
      ? "Confirmed"
      : farmer.status === "Alert Sent"
      ? "Alert Sent"
      : "Pending";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(farmer)}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.(farmer)}
      className={`group w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all duration-150 ${
        selected
          ? "border-amber-ring bg-amber-faint"
          : "border-line bg-card hover:border-line-strong"
      }`}
    >
      {/* Name + risk */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-sans text-sm font-semibold text-ink-primary">
            {farmer.name}
          </div>
          <div className="mt-0.5 truncate font-sans text-xs text-ink-muted">
            {farmer.village}, {farmer.district}
          </div>
        </div>
        <span className={`flex-shrink-0 rounded-md border px-2 py-0.5 font-mono text-xs font-medium ${riskClass}`}>
          {farmer.riskScore}%
        </span>
      </div>

      {/* Status + harvest */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`rounded-md border px-2 py-0.5 font-sans text-[10px] font-medium ${statusClass}`}>
            {statusLabel}
          </span>
          <span className="font-mono text-[10px] text-ink-muted">
            {farmer.fieldHarvested}
          </span>
        </div>

        {farmer.status !== "Confirmed" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWhatsApp?.(farmer);
            }}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-ring bg-emerald-faint px-2.5 py-1.5 text-emerald-bright transition-all duration-150 hover:bg-emerald/20"
          >
            <WhatsAppSendIcon />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em]">
              Send
            </span>
          </button>
        )}

        {farmer.status === "Confirmed" && (
          <div className="flex items-center gap-1 text-emerald">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
            <span className="font-sans text-[10px] font-semibold text-emerald">Seeder booked</span>
          </div>
        )}
      </div>
    </div>
  );
}
