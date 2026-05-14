"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "#0D1B2E",
  border: "1px solid #1A3050",
  borderRadius: 12,
  padding: "10px 14px",
  color: "#EFF6FF",
  fontSize: 13,
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
};

function Panel({ title, subtitle, children }) {
  return (
    <section className="rounded-xl border border-line bg-card p-5">
      <div className="mb-1 font-sans text-sm font-semibold text-ink-primary">{title}</div>
      <div className="mb-5 font-sans text-xs text-ink-secondary">{subtitle}</div>
      {children}
    </section>
  );
}

function BarLabel({ viewBox, value }) {
  if (!viewBox) return null;
  const { x, y, width } = viewBox;
  return (
    <text x={x + width / 2} y={y - 4} textAnchor="middle" fontSize={10} fill="#3D5775">
      {(value / 1000).toFixed(0)}k
    </text>
  );
}

function CustomLegend() {
  return (
    <div className="mt-3 flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-danger" />
        <span className="font-sans text-xs text-ink-secondary">Without CropClear</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-emerald" />
        <span className="font-sans text-xs text-ink-secondary">With CropClear</span>
      </div>
    </div>
  );
}

export default function Charts({ firesData, aqiData }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {/* Fire history bar chart */}
      <Panel
        title="Crop Fires by Season — Punjab & Haryana"
        subtitle="Historical burn events vs. CropClear 2026 intervention projection"
      >
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={firesData} barSize={32} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(26,48,80,0.6)" strokeDasharray="3 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#3D5775", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "rgba(26,48,80,0.6)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#3D5775", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                width={36}
              />
              <Tooltip
                cursor={{ fill: "rgba(26,48,80,0.3)", radius: 6 }}
                contentStyle={TOOLTIP_STYLE}
                formatter={(value) => [`${value.toLocaleString()} fires`, "Count"]}
              />
              <Bar dataKey="fires" radius={[6, 6, 0, 0]}>
                {firesData.map((entry) => {
                  const isCropClear = entry.label?.includes("CropClear") || entry.label?.includes("with");
                  const isProjected = entry.label?.includes("projected") || entry.label?.includes("without");
                  const color = isCropClear
                    ? "#10B981"
                    : isProjected
                    ? "#EF4444"
                    : "#1E3A5F";
                  return <Cell key={entry.label} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-line-strong" />
            <span className="font-sans text-xs text-ink-muted">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-danger" />
            <span className="font-sans text-xs text-ink-muted">Projected (no action)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald" />
            <span className="font-sans text-xs text-ink-muted">With CropClear</span>
          </div>
        </div>
      </Panel>

      {/* Delhi AQI line chart */}
      <Panel
        title="Delhi AQI — October to November"
        subtitle="Air quality trace: intervention vs. baseline (PM2.5 equivalents)"
      >
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aqiData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(26,48,80,0.6)" strokeDasharray="3 4" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#3D5775", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "rgba(26,48,80,0.6)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#3D5775", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={36}
                domain={[150, 550]}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(value, name) => [
                  `AQI ${value}`,
                  name === "withoutIntervention" ? "Without CropClear" : "With CropClear",
                ]}
              />
              <Line
                type="monotone"
                dataKey="withoutIntervention"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "#EF4444", fill: "#0D1B2E", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#EF4444" }}
                name="withoutIntervention"
              />
              <Line
                type="monotone"
                dataKey="withCropClear"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "#10B981", fill: "#0D1B2E", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#10B981" }}
                name="withCropClear"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* WHO line annotation */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="block h-0.5 w-6 bg-danger" />
              <span className="font-sans text-xs text-ink-muted">Baseline (no action)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-0.5 w-6 bg-emerald" />
              <span className="font-sans text-xs text-ink-muted">With CropClear</span>
            </div>
          </div>
          <div className="rounded-md border border-danger-ring bg-danger-faint px-2.5 py-1">
            <span className="font-mono text-[10px] text-danger-light">WHO safe: AQI 25</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
