"use client";

export default function RoleToggle({ value, onChange }) {
  const isGovernment = value === "government";

  return (
    <div className="inline-flex rounded-xl border border-line bg-surface p-1">
      <button
        type="button"
        onClick={() => onChange("government")}
        className={`cursor-pointer rounded-lg px-3.5 py-2 font-sans text-xs font-medium transition-all duration-200 ${
          isGovernment
            ? "bg-amber text-void shadow-sm"
            : "text-ink-secondary hover:text-ink-primary"
        }`}
      >
        Government
      </button>
      <button
        type="button"
        onClick={() => onChange("district")}
        className={`cursor-pointer rounded-lg px-3.5 py-2 font-sans text-xs font-medium transition-all duration-200 ${
          !isGovernment
            ? "bg-amber text-void shadow-sm"
            : "text-ink-secondary hover:text-ink-primary"
        }`}
      >
        District Officer
      </button>
    </div>
  );
}
