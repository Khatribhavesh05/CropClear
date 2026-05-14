"use client";

import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

function useCountUp(target, duration, resetKey) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, resetKey]);
  return value;
}

function Sparkline({ data, color }) {
  const chartData = useMemo(() => data.map((value, index) => ({ index, value })), [data]);
  return (
    <div className="h-9 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ stat, resetKey }) {
  const value = useCountUp(stat.value, 1400, resetKey);

  return (
    <div className="group rounded-xl border border-line bg-card p-4 transition-colors duration-200 hover:border-line-strong">
      <div className="flex items-start justify-between gap-2">
        <div className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-ink-secondary">
          {stat.label}
        </div>
        <div className="flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stat.accent }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Live</span>
        </div>
      </div>
      <div
        className="mt-2 font-display text-3xl font-bold tracking-tight"
        style={{ color: stat.accent }}
      >
        {value.toLocaleString()}
      </div>
      <div className="mt-3">
        <Sparkline data={stat.sparkline} color={stat.accent} />
      </div>
    </div>
  );
}

export default function StatsBar({ stats, resetKey }) {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} resetKey={resetKey} />
      ))}
    </section>
  );
}
