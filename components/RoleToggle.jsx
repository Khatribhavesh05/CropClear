"use client";

export default function RoleToggle({ value, onChange }) {
  const isGovernment = value === "government";

  return (
    <div className="inline-flex rounded-full border border-[var(--border)] bg-[rgba(19,31,23,0.9)] p-1 shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
      <button
        type="button"
        onClick={() => onChange("government")}
        className={`rounded-full px-4 py-2 text-sm transition duration-200 ${isGovernment ? "bg-[var(--accent-green)] text-[#03130a]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
      >
        Government View
      </button>
      <button
        type="button"
        onClick={() => onChange("district")}
        className={`rounded-full px-4 py-2 text-sm transition duration-200 ${!isGovernment ? "bg-[var(--accent-green)] text-[#03130a]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
      >
        District Officer View
      </button>
    </div>
  );
}
