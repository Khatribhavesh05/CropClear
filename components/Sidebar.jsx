"use client";

const items = [
  { id: "map", icon: "🗺️", label: "Map" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "alerts", icon: "📱", label: "Alerts" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[60px] flex-col items-center border-r border-[var(--border)] bg-[rgba(10,15,13,0.96)] py-4 backdrop-blur-xl lg:flex">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(0,255,136,0.18)] bg-[rgba(0,255,136,0.08)] text-[var(--accent-green)] shadow-[0_0_30px_rgba(0,255,136,0.08)]">
        <span className="text-lg">◉</span>
      </div>
      <nav className="flex flex-1 flex-col items-center gap-3">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              aria-label={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-200 ${isActive ? "border-[rgba(0,255,136,0.55)] bg-[rgba(0,255,136,0.14)] text-[var(--accent-green)] shadow-[0_0_24px_rgba(0,255,136,0.14)]" : "border-transparent bg-transparent text-[var(--text-secondary)] hover:border-[rgba(30,58,40,0.85)] hover:bg-[rgba(19,31,23,0.75)] hover:text-[var(--text-primary)]"}`}
            >
              <span className="text-lg">{item.icon}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[rgba(19,31,23,0.75)] text-[10px] font-display uppercase tracking-[0.2em] text-[var(--text-secondary)]">
        26
      </div>
    </aside>
  );
}
