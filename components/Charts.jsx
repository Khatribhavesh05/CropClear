"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Panel({ title, subtitle, children }) {
  return (
    <section className="mission-card rounded-[28px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
      <div className="mb-5">
        <div className="font-display text-xl tracking-[0.08em] text-[var(--text-primary)]">{title}</div>
        <div className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</div>
      </div>
      {children}
    </section>
  );
}

export default function Charts({ firesData, aqiData }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Panel title="Fires by Year Punjab+Haryana" subtitle="Historical burn events and CropClear projection">
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={firesData}>
              <CartesianGrid stroke="rgba(30,58,40,0.45)" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill: "#6b9e7a", fontSize: 11 }} axisLine={{ stroke: "rgba(30,58,40,0.6)" }} tickLine={false} />
              <YAxis tick={{ fill: "#6b9e7a", fontSize: 11 }} axisLine={{ stroke: "rgba(30,58,40,0.6)" }} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(0,255,136,0.06)" }}
                contentStyle={{
                  background: "rgba(10,15,13,0.98)",
                  border: "1px solid rgba(30,58,40,0.9)",
                  borderRadius: 16,
                  color: "#e8f5e9",
                }}
              />
              <Bar dataKey="fires" radius={[14, 14, 0, 0]}>
                {firesData.map((entry) => (
                  <Cell key={entry.label} fill={entry.label.includes("with CropClear") ? "#00ff88" : entry.label.includes("projected") ? "#ff6b35" : "#2d4d3a"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Delhi AQI Oct-Nov" subtitle="Air quality trace with and without intervention">
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aqiData}>
              <CartesianGrid stroke="rgba(30,58,40,0.45)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#6b9e7a", fontSize: 11 }} axisLine={{ stroke: "rgba(30,58,40,0.6)" }} tickLine={false} />
              <YAxis tick={{ fill: "#6b9e7a", fontSize: 11 }} axisLine={{ stroke: "rgba(30,58,40,0.6)" }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,15,13,0.98)",
                  border: "1px solid rgba(30,58,40,0.9)",
                  borderRadius: 16,
                  color: "#e8f5e9",
                }}
              />
              <Line type="monotone" dataKey="withoutIntervention" stroke="#ff2d55" strokeWidth={3} dot={{ r: 4, stroke: "#ff2d55", fill: "#ff2d55" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="withCropClear" stroke="#00ff88" strokeWidth={3} dot={{ r: 4, stroke: "#00ff88", fill: "#00ff88" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
