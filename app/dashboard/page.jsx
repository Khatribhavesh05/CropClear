"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import BrandMark from "@/components/BrandMark";
import Charts from "@/components/Charts";
import FarmerCard from "@/components/FarmerCard";
import RoleToggle from "@/components/RoleToggle";
import Sidebar from "@/components/Sidebar";
import StatsBar from "@/components/StatsBar";
import WhatsAppPanel from "@/components/WhatsAppPanel";

import districtsData from "@/data/districts.json";
import farmersData from "@/data/farmers.json";
import firesData from "@/data/fires2023.json";
import aqiData from "@/data/aqi.json";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

// ─── Static data ─────────────────────────────────────────────────────

const governmentStats = [
  { label: "High Risk Farms", value: 8742, accent: "#EF4444", sparkline: [30, 42, 55, 64, 72, 80, 87] },
  { label: "Alerts Dispatched", value: 6519, accent: "#F59E0B", sparkline: [18, 28, 40, 50, 58, 65, 74] },
  { label: "Farmers Confirmed", value: 4203, accent: "#10B981", sparkline: [8, 18, 30, 44, 55, 64, 73] },
  { label: "Fires Prevented", value: 4107, accent: "#3B82F6", sparkline: [6, 16, 28, 42, 53, 62, 71] },
];

const districtStats = [
  { label: "High Risk Farms", value: 847, accent: "#EF4444", sparkline: [20, 30, 42, 52, 60, 68, 78] },
  { label: "Alerts Dispatched", value: 634, accent: "#F59E0B", sparkline: [14, 22, 34, 44, 52, 60, 70] },
  { label: "Farmers Confirmed", value: 412, accent: "#10B981", sparkline: [8, 16, 26, 38, 48, 57, 66] },
  { label: "Fires Prevented", value: 389, accent: "#3B82F6", sparkline: [5, 13, 22, 34, 44, 53, 63] },
];

const alertFeed = [
  "Bathinda · Jaswant Kaur flagged CRITICAL RISK · Alert dispatched 2 min ago",
  "Ludhiana · Gurpreet Singh confirmed Happy Seeder booking · Fire prevented",
  "Sangrur · Harjit Singh · 94% burn probability detected by satellite",
  "Satellite scan complete · 1,247 fields assessed across 15 districts",
  "Karnal · Rajvinder Kaur confirmed booking · Seeder dispatched tomorrow 7AM",
];

const settingsBlocks = [
  { title: "Satellite cadence", value: "15 min refresh", detail: "Synthetic aperture radar + Sentinel-2 ingest and district risk scoring" },
  { title: "Alert language", value: "Punjabi + English", detail: "WhatsApp and SMS templates localised for farmer comprehension" },
  { title: "Seeder pool", value: "112 units online", detail: "Geofenced Happy Seeder availability — nearest unit dispatched on confirm" },
];

function formatClock(date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

// ─── Intervention Queue ───────────────────────────────────────────────
function InterventionQueue({ farmers, onWhatsApp, selectedFarmer }) {
  const [filter, setFilter] = useState("pending");

  const pending = useMemo(
    () =>
      farmers
        .filter((f) => f.status !== "Confirmed")
        .sort((a, b) => b.riskScore - a.riskScore),
    [farmers]
  );

  const confirmed = useMemo(
    () => farmers.filter((f) => f.status === "Confirmed"),
    [farmers]
  );

  const shown = filter === "pending" ? pending : filter === "confirmed" ? confirmed : farmers.sort((a, b) => b.riskScore - a.riskScore);

  const interventionRate = farmers.length
    ? Math.round((confirmed.length / farmers.length) * 100)
    : 0;

  return (
    <div className="flex w-[360px] flex-shrink-0 flex-col border-l border-line">
      {/* Queue header */}
      <div className="border-b border-line px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-muted">
              Intervention Queue
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-amber">
                {pending.length}
              </span>
              <span className="font-sans text-xs text-ink-secondary">awaiting action</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              Success Rate
            </div>
            <div className="mt-1 font-display text-xl font-bold text-emerald">
              {interventionRate}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full rounded-full bg-emerald transition-all duration-1000"
              style={{ width: `${interventionRate}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-ink-muted">
            <span>{confirmed.length} confirmed</span>
            <span>{farmers.length} total</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-3 flex gap-1">
          {[
            { id: "pending", label: `Pending (${pending.length})` },
            { id: "confirmed", label: `Done (${confirmed.length})` },
            { id: "all", label: "All" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`cursor-pointer rounded-lg px-2.5 py-1.5 font-sans text-xs font-medium transition-colors duration-150 ${
                filter === tab.id
                  ? "bg-amber text-void"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Farmer list */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3 scrollbar-none">
        {shown.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div>
              <div className="font-display text-2xl font-bold text-emerald">All clear</div>
              <div className="mt-1 font-sans text-xs text-ink-muted">
                No pending interventions
              </div>
            </div>
          </div>
        ) : (
          shown.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              selected={selectedFarmer?.id === farmer.id}
              onSelect={farmer.status !== "Confirmed" ? onWhatsApp : () => {}}
              onWhatsApp={onWhatsApp}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────
export default function DashboardPage() {
  const [role, setRole] = useState("government");
  const [activeTab, setActiveTab] = useState("map");
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [farmers, setFarmers] = useState(farmersData);

  useEffect(() => {
    const storedRole = window.localStorage.getItem("cropclear-role");
    if (storedRole === "government" || storedRole === "district") {
      setRole(storedRole);
      if (storedRole === "district") setSelectedDistrict("Ludhiana");
    }
    const timer = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cropclear-role", role);
    if (role === "district") {
      setSelectedDistrict("Ludhiana");
    } else if (selectedDistrict === "Ludhiana") {
      setSelectedDistrict(null);
    }
  }, [role]);

  const visibleDistricts = useMemo(() => {
    if (role === "district") return districtsData.filter((d) => d.name === "Ludhiana");
    return districtsData;
  }, [role]);

  const visibleFarmers = useMemo(() => {
    if (role === "district") return farmers.filter((f) => f.district === "Ludhiana");
    if (selectedDistrict) return farmers.filter((f) => f.district === selectedDistrict);
    return farmers;
  }, [farmers, role, selectedDistrict]);

  const activeStats = role === "district" ? districtStats : governmentStats;
  const mapCenter = role === "district" ? [30.9, 75.8] : [30.5, 75.8];
  const mapZoom = role === "district" ? 10 : 7;

  const handleConfirm = (farmerId) => {
    setFarmers((curr) =>
      curr.map((f) => (f.id === farmerId ? { ...f, status: "Confirmed" } : f))
    );
    setSelectedFarmer((curr) =>
      curr?.id === farmerId ? { ...curr, status: "Confirmed" } : curr
    );
  };

  const handleSelectDistrict = (name) => {
    if (role === "district" && name !== "Ludhiana") return;
    setSelectedDistrict(name);
    setSelectedFarmer(null);
    setWhatsappOpen(false);
  };

  const handleOpenWhatsApp = (farmer) => {
    setSelectedFarmer(farmer);
    setWhatsappOpen(true);
  };

  const visibleFireChartData = firesData.map((entry) => ({
    label: entry.label || String(entry.year),
    fires: entry.fires,
  }));

  const title =
    role === "district"
      ? "Ludhiana District — Officer View"
      : "Punjab & Haryana · Burn Risk Monitor";

  return (
    <main className="min-h-screen bg-base">
      {/* ─── Sidebar ──────────────────────────────────────────────── */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* ─── Header ───────────────────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-xl lg:left-[72px]">
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 lg:px-6">
          {/* Left — branding */}
          <div className="flex items-center gap-4">
            <BrandMark />
            <div className="hidden border-l border-line pl-4 sm:block">
              <div className="font-sans text-sm font-semibold text-ink-primary">{title}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                Season 2026 · 15 Districts · Sentinel-2
              </div>
            </div>
          </div>

          {/* Center — season status */}
          <div className="hidden items-center gap-2 rounded-xl border border-danger-ring bg-danger-faint px-3.5 py-2 xl:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pingRing rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-danger-light">
              Burn Season Active · Oct 15 – Nov 30
            </span>
          </div>

          {/* Right — controls */}
          <div className="flex items-center gap-3">
            <RoleToggle value={role} onChange={setRole} />

            {/* Alert count */}
            <div className="hidden items-center gap-2 rounded-xl border border-caution-ring bg-caution-faint px-3 py-2 sm:flex">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-caution">
                <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z" clipRule="evenodd" />
              </svg>
              <span className="font-mono text-[10px] font-medium text-caution">
                {(activeStats[0].value - activeStats[1].value).toLocaleString()} uncontacted
              </span>
            </div>

            {/* Clock */}
            <div className="hidden rounded-xl border border-line bg-card px-3.5 py-2 sm:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-muted">IST</div>
              <div className="font-mono text-sm font-medium text-ink-primary">{clock}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Map Tab ──────────────────────────────────────────────── */}
      {activeTab === "map" && (
        <div
          className="flex lg:pl-[72px]"
          style={{ height: "100vh", paddingTop: "61px", paddingBottom: "44px" }}
        >
          {/* Left — Stats + Map */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Stats bar */}
            <div className="border-b border-line bg-surface/80 px-4 py-3 backdrop-blur-sm lg:px-5">
              <StatsBar stats={activeStats} resetKey={role} />
            </div>

            {/* Map */}
            <div className="min-h-0 flex-1 p-4">
              <MapView
                districts={visibleDistricts}
                center={mapCenter}
                zoom={mapZoom}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={handleSelectDistrict}
              />
            </div>
          </div>

          {/* Right — Intervention Queue */}
          <InterventionQueue
            farmers={visibleFarmers}
            onWhatsApp={handleOpenWhatsApp}
            selectedFarmer={selectedFarmer}
          />
        </div>
      )}

      {/* ─── Analytics Tab ────────────────────────────────────────── */}
      {activeTab === "analytics" && (
        <div className="space-y-5 px-5 pb-20 pt-[calc(61px+1.25rem)] lg:pl-[calc(72px+1.25rem)] lg:pr-5">
          <StatsBar stats={activeStats} resetKey={role} />
          <Charts firesData={visibleFireChartData} aqiData={aqiData} />
          <div className="grid gap-4 xl:grid-cols-3">
            {settingsBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-xl border border-line bg-card p-5 transition-colors duration-150 hover:border-line-strong"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
                  {block.title}
                </div>
                <div className="mt-2 font-display text-2xl font-bold text-amber">
                  {block.value}
                </div>
                <div className="mt-1.5 font-sans text-sm leading-relaxed text-ink-secondary">
                  {block.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Alerts Tab ───────────────────────────────────────────── */}
      {activeTab === "alerts" && (
        <div className="space-y-5 px-5 pb-20 pt-[calc(61px+1.25rem)] lg:pl-[calc(72px+1.25rem)] lg:pr-5">
          <StatsBar stats={activeStats} resetKey={role} />
          <div className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
            {/* Live stream */}
            <section className="rounded-xl border border-line bg-card">
              <div className="border-b border-line px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pingRing rounded-full bg-danger opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
                  </span>
                  <div className="font-sans text-sm font-semibold text-ink-primary">
                    Live Alert Stream
                  </div>
                </div>
                <div className="mt-0.5 font-sans text-xs text-ink-secondary">
                  Real-time notifications from the field prediction model
                </div>
              </div>
              <div className="space-y-2 p-4">
                {alertFeed.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                  >
                    <span className="font-mono text-xs font-medium text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm text-ink-primary">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* District snapshot */}
            <section className="rounded-xl border border-line bg-card">
              <div className="border-b border-line px-5 py-4">
                <div className="font-sans text-sm font-semibold text-ink-primary">
                  District Risk Snapshot
                </div>
                <div className="mt-0.5 font-sans text-xs text-ink-secondary">
                  Click to filter intervention queue
                </div>
              </div>
              <div className="space-y-1.5 p-3">
                {[...districtsData].sort((a, b) => b.risk - a.risk).slice(0, 8).map((d) => {
                  const colorClass =
                    d.risk > 85
                      ? "text-danger-light"
                      : d.risk >= 70
                      ? "text-caution-light"
                      : "text-amber-bright";
                  return (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => {
                        handleSelectDistrict(d.name);
                        setActiveTab("map");
                      }}
                      className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors duration-150 hover:border-line-strong hover:bg-card"
                    >
                      <div>
                        <div className="font-sans text-xs font-medium text-ink-primary">
                          {d.name}
                        </div>
                        <div className="font-mono text-[10px] text-ink-muted">{d.state}</div>
                      </div>
                      <div className={`font-display text-base font-bold ${colorClass}`}>
                        {d.risk}%
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ─── Settings Tab ─────────────────────────────────────────── */}
      {activeTab === "settings" && (
        <div className="space-y-5 px-5 pb-20 pt-[calc(61px+1.25rem)] lg:pl-[calc(72px+1.25rem)] lg:pr-5">
          <StatsBar stats={activeStats} resetKey={role} />
          <div className="grid gap-5 xl:grid-cols-2">
            {/* Operational config */}
            <section className="rounded-xl border border-line bg-card">
              <div className="border-b border-line px-5 py-4">
                <div className="font-sans text-sm font-semibold text-ink-primary">
                  Operational Configuration
                </div>
                <div className="mt-0.5 font-sans text-xs text-ink-secondary">
                  Mission system parameters and ingest cadence
                </div>
              </div>
              <div className="space-y-3 p-4">
                {settingsBlocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-xl border border-line bg-surface px-4 py-3.5"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                      {block.title}
                    </div>
                    <div className="mt-1.5 font-display text-xl font-bold text-amber">
                      {block.value}
                    </div>
                    <div className="mt-1 font-sans text-xs text-ink-secondary">
                      {block.detail}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Role access */}
            <section className="rounded-xl border border-line bg-card">
              <div className="border-b border-line px-5 py-4">
                <div className="font-sans text-sm font-semibold text-ink-primary">
                  Role & Access Control
                </div>
                <div className="mt-0.5 font-sans text-xs text-ink-secondary">
                  Switch the operator view without backend authentication
                </div>
              </div>
              <div className="p-4">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <RoleToggle value={role} onChange={setRole} />
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-secondary">
                    <span className="font-medium text-ink-primary">Government view</span> shows all 15 districts across Punjab and Haryana with full satellite coverage and aggregate metrics.
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-secondary">
                    <span className="font-medium text-ink-primary">District Officer view</span> is scoped to Ludhiana district — focused intervention with field-level farmer detail.
                  </p>
                  <div className="mt-4 rounded-xl border border-amber-ring bg-amber-faint px-3.5 py-2.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">
                      Current role
                    </div>
                    <div className="mt-1 font-display text-xl font-bold text-amber">
                      {role === "government" ? "Government Official" : "District Officer — Ludhiana"}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ─── Bottom Ticker ────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-surface/95 backdrop-blur-xl lg:left-[72px]">
        <div className="overflow-hidden py-2.5">
          <div className="ticker-track flex w-[200%] gap-6 whitespace-nowrap px-6">
            {[...alertFeed, ...alertFeed].map((item, i) => (
              <span
                key={`${i}-${item.slice(0, 10)}`}
                className="inline-flex items-center gap-2.5 rounded-lg border border-line bg-card px-3.5 py-1.5"
              >
                <span
                  className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                    i % 3 === 0 ? "bg-danger" : i % 3 === 1 ? "bg-emerald" : "bg-amber"
                  }`}
                />
                <span className="font-sans text-xs text-ink-secondary">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── WhatsApp Panel ───────────────────────────────────────── */}
      <WhatsAppPanel
        farmer={selectedFarmer}
        open={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
