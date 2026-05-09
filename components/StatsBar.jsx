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
      setValue(Math.round(target * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, resetKey]);

  return value;
}

function Sparkline({ data, accent }) {
  const chartData = useMemo(() => data.map((value, index) => ({ index, value })), [data]);

  return (
    <div className="h-11 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="value" stroke={accent} strokeWidth={2.2} dot={false} animationDuration={800} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ stat, resetKey }) {
  const value = useCountUp(stat.value, 1500, resetKey);

  return (
    <div className="mission-card rounded-[24px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-4 transition duration-200 hover:translate-y-[-2px] xl:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="text-base">{stat.icon}</span>
            <span>{stat.label}</span>
          </div>
          <div className="mt-2 font-display text-3xl tracking-[-0.04em]" style={{ color: stat.accent }}>
            {value.toLocaleString()}
          </div>
        </div>
        <div className="rounded-full border border-[rgba(255,255,255,0.05)] px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
          Live
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-[rgba(30,58,40,0.4)] bg-[rgba(10,15,13,0.55)] px-2 py-1">
        <Sparkline data={stat.sparkline} accent={stat.accent} />
      </div>
    </div>
  );
}

export default function StatsBar({ stats, resetKey }) {
  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} resetKey={resetKey} />
      ))}
    </section>
  );
}
