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

const governmentStats = [
  { label: "High Risk Farms", value: 1247, icon: "🔴", accent: "var(--accent-red)", sparkline: [6, 10, 14, 12, 18, 17, 23] },
  { label: "Alerts Sent Today", value: 843, icon: "📱", accent: "var(--accent-green)", sparkline: [24, 28, 35, 32, 41, 44, 50] },
  { label: "Farmers Confirmed", value: 312, icon: "✅", accent: "var(--accent-green)", sparkline: [12, 18, 22, 24, 28, 30, 33] },
  { label: "Fires Prevented (est.)", value: 89, icon: "🔥", accent: "var(--accent-orange)", sparkline: [3, 4, 5, 8, 10, 12, 14] },
];

const districtStats = [
  { label: "High Risk Farms", value: 247, icon: "🔴", accent: "var(--accent-red)", sparkline: [3, 5, 6, 8, 9, 10, 12] },
  { label: "Alerts Sent Today", value: 164, icon: "📱", accent: "var(--accent-green)", sparkline: [7, 10, 12, 13, 15, 18, 20] },
  { label: "Farmers Confirmed", value: 71, icon: "✅", accent: "var(--accent-green)", sparkline: [4, 5, 6, 7, 8, 9, 10] },
  { label: "Fires Prevented (est.)", value: 22, icon: "🔥", accent: "var(--accent-orange)", sparkline: [1, 1, 2, 2, 3, 3, 4] },
];

const alertFeed = [
  "Bathinda — Jaswant Kaur flagged HIGH RISK — Alert sent 2 min ago",
  "Ludhiana — Gurpreet Singh confirmed Happy Seeder booking",
  "Sangrur — Harjit Singh — 94% burn probability detected",
  "Satellite scan complete — 1,247 fields assessed",
  "Karnal — Rajvinder Kaur confirmed — Fire prevented",
];

const settingsBlocks = [
  { title: "Satellite cadence", value: "15 min refresh", detail: "Synthetic scan ingest and district scoring" },
  { title: "Alert templates", value: "Punjabi + English", detail: "WhatsApp and SMS intervention prompts" },
  { title: "Seeder availability", value: "112 units online", detail: "Nearby equipment pool for rapid booking" },
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
      if (storedRole === "district") {
        setSelectedDistrict("Ludhiana");
      }
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
    if (role === "district") {
      return districtsData.filter((district) => district.name === "Ludhiana");
    }
    return districtsData;
  }, [role]);

  const visibleFarmers = useMemo(() => {
    if (role === "district") {
      return farmers.filter((farmer) => farmer.district === "Ludhiana");
    }
    if (selectedDistrict) {
      return farmers.filter((farmer) => farmer.district === selectedDistrict);
    }
    return farmers;
  }, [farmers, role, selectedDistrict]);

  const activeStats = role === "district" ? districtStats : governmentStats;
  const mapCenter = role === "district" ? [30.9, 75.8] : [30.9, 75.8];
  const mapZoom = role === "district" ? 10 : 7;
  const title = role === "district" ? "Ludhiana District — Officer View" : "Punjab & Haryana Burn Risk Monitor — Season 2026";
  const panelDistrict = role === "district" ? "Ludhiana" : selectedDistrict;
  const panelDistrictData = panelDistrict ? districtsData.find((district) => district.name === panelDistrict) : null;

  const handleConfirm = (farmerId) => {
    setFarmers((current) => current.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: "Confirmed" } : farmer)));
    setSelectedFarmer((current) => (current && current.id === farmerId ? { ...current, status: "Confirmed" } : current));
  };

  const handleSelectDistrict = (districtName) => {
    if (role === "district" && districtName !== "Ludhiana") return;
    setSelectedDistrict(districtName);
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

  const analyticsView = (
    <div className="space-y-5">
      <Charts firesData={visibleFireChartData} aqiData={aqiData} />
      <div className="grid gap-4 xl:grid-cols-3">
        {settingsBlocks.map((block) => (
          <div key={block.title} className="mission-card rounded-[24px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5 transition duration-200 hover:translate-y-[-2px]">
            <div className="text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">{block.title}</div>
            <div className="mt-3 font-display text-2xl text-[var(--accent-green)]">{block.value}</div>
            <div className="mt-2 text-sm text-[var(--text-secondary)]">{block.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const alertsView = (
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="mission-card rounded-[28px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5">
        <div className="font-display text-xl text-[var(--text-primary)]">Live Alert Stream</div>
        <div className="mt-1 text-sm text-[var(--text-secondary)]">Operational notifications generated by the local prediction model</div>
        <div className="mt-5 space-y-3">
          {alertFeed.map((item, index) => (
            <div key={item} className="rounded-2xl border border-[rgba(30,58,40,0.8)] bg-[rgba(10,15,13,0.68)] px-4 py-3 text-sm text-[var(--text-primary)]">
              <span className="mr-3 rounded-full border border-[rgba(0,255,136,0.2)] px-2 py-1 text-[10px] font-display uppercase tracking-[0.2em] text-[var(--text-secondary)]">0{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="mission-card rounded-[28px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5">
          <div className="font-display text-xl text-[var(--text-primary)]">District Snapshot</div>
          <div className="mt-4 space-y-3">
            {districtsData.slice(0, 6).map((district) => (
              <button
                key={district.name}
                type="button"
                onClick={() => handleSelectDistrict(district.name)}
                className="flex w-full items-center justify-between rounded-2xl border border-[rgba(30,58,40,0.8)] bg-[rgba(10,15,13,0.7)] px-4 py-3 text-left transition hover:border-[rgba(0,255,136,0.35)]"
              >
                <div>
                  <div className="font-display text-sm text-[var(--text-primary)]">{district.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{district.state}</div>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-display uppercase tracking-[0.2em] ${district.risk > 85 ? "border-[rgba(255,45,85,0.3)] bg-[rgba(255,45,85,0.12)] text-[var(--accent-red)]" : district.risk >= 70 ? "border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.12)] text-[var(--accent-orange)]" : "border-[rgba(0,255,136,0.22)] bg-[rgba(0,255,136,0.12)] text-[var(--accent-green)]"}`}>
                  {district.risk}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const settingsView = (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="mission-card rounded-[28px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5">
        <div className="font-display text-xl text-[var(--text-primary)]">Operational Settings</div>
        <div className="mt-1 text-sm text-[var(--text-secondary)]">Demo system configuration and mission posture</div>
        <div className="mt-5 space-y-3">
          {settingsBlocks.map((block) => (
            <div key={block.title} className="rounded-2xl border border-[rgba(30,58,40,0.8)] bg-[rgba(10,15,13,0.68)] px-4 py-4">
              <div className="font-display text-sm text-[var(--accent-green)]">{block.title}</div>
              <div className="mt-1 text-lg text-[var(--text-primary)]">{block.value}</div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">{block.detail}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mission-card rounded-[28px] border border-[var(--border)] bg-[rgba(19,31,23,0.92)] p-5">
        <div className="font-display text-xl text-[var(--text-primary)]">Role and Access</div>
        <div className="mt-1 text-sm text-[var(--text-secondary)]">Switch the operator view without any backend authentication</div>
        <div className="mt-5 rounded-[28px] border border-[rgba(0,255,136,0.16)] bg-[rgba(0,255,136,0.05)] p-5">
          <RoleToggle value={role} onChange={setRole} />
          <div className="mt-4 text-sm text-[var(--text-secondary)]">Current view is saved in localStorage as a demo-only session state.</div>
        </div>
      </section>
    </div>
  );

  const mapView = (
    <div className={`relative ${panelDistrict ? "xl:pr-[390px]" : ""}`}>
      <MapView districts={visibleDistricts} center={mapCenter} zoom={mapZoom} selectedDistrict={panelDistrict} onSelectDistrict={handleSelectDistrict} />
      <aside className={`panel-in fixed right-4 top-[136px] z-30 hidden w-[350px] rounded-[28px] border border-[var(--border)] bg-[rgba(10,15,13,0.96)] p-4 shadow-[-20px_0_60px_rgba(0,0,0,0.38)] backdrop-blur-xl xl:block ${panelDistrict ? "translate-x-0" : "translate-x-[360px]"}`}>
        {panelDistrictData ? (
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-2xl text-[var(--text-primary)]">{panelDistrictData.name}</div>
                <div className="text-sm text-[var(--text-secondary)]">{panelDistrictData.state} district risk cell</div>
              </div>
              <div className={`rounded-full border px-3 py-1 text-xs font-display uppercase tracking-[0.2em] ${panelDistrictData.risk > 85 ? "border-[rgba(255,45,85,0.3)] bg-[rgba(255,45,85,0.12)] text-[var(--accent-red)]" : panelDistrictData.risk >= 70 ? "border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.12)] text-[var(--accent-orange)]" : "border-[rgba(0,255,136,0.22)] bg-[rgba(0,255,136,0.12)] text-[var(--accent-green)]"}`}>
                {panelDistrictData.risk}% risk
              </div>
            </div>
            <div className="mt-4 rounded-[24px] border border-[rgba(30,58,40,0.85)] bg-[rgba(19,31,23,0.9)] p-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center justify-between text-[var(--text-primary)]">
                <span>Tracked fires</span>
                <span className="font-display text-2xl text-[var(--accent-orange)]">{panelDistrictData.fires}</span>
              </div>
              <div className="mt-2">District officer view is focused on {panelDistrictData.name} only. Clicking a farmer action opens the WhatsApp intervention thread.</div>
            </div>
            <div className="mt-4 max-h-[calc(100vh-360px)] space-y-3 overflow-y-auto pr-1 scrollbar-none">
              {visibleFarmers.map((farmer) => (
                <FarmerCard
                  key={farmer.id}
                  farmer={farmer}
                  selected={selectedFarmer?.id === farmer.id}
                  onSelect={setSelectedFarmer}
                  onWhatsApp={handleOpenWhatsApp}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-[var(--text-secondary)]">Select a district on the map to open the intervention panel.</div>
        )}
      </aside>
    </div>
  );

  return (
    <main className="min-h-screen pb-[92px] lg:pl-[60px]">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <div className="sticky top-0 z-30 border-b border-[var(--border)] bg-[rgba(10,15,13,0.9)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-7">
          <div className="flex items-center gap-4">
            <BrandMark />
            <div>
              <div className="font-display text-base tracking-[0.2em] text-[var(--accent-green)]">{title}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">AI-powered stubble burn prevention for Punjab & Haryana</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <RoleToggle value={role} onChange={setRole} />
            <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(19,31,23,0.88)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[var(--accent-green)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[var(--accent-green)]">LIVE</span>
            </div>
            <div className="rounded-full border border-[var(--border)] bg-[rgba(19,31,23,0.88)] px-4 py-2 text-sm text-[var(--text-primary)]">
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">IST</span>
              <div className="font-display text-base text-[var(--text-primary)]">{clock}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5 lg:px-7">
        <StatsBar stats={activeStats} resetKey={role} />

        {activeTab === "map" ? mapView : null}
        {activeTab === "analytics" ? analyticsView : null}
        {activeTab === "alerts" ? alertsView : null}
        {activeTab === "settings" ? settingsView : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[rgba(10,15,13,0.95)] backdrop-blur-xl lg:left-[60px]">
        <div className="overflow-hidden py-3">
          <div className="ticker-track flex w-[200%] gap-8 whitespace-nowrap px-6 text-sm text-[var(--text-primary)]">
            {[...alertFeed, ...alertFeed].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,58,40,0.8)] bg-[rgba(19,31,23,0.88)] px-4 py-2">
                <span className={index % 2 === 0 ? "text-[var(--accent-red)]" : "text-[var(--accent-green)]"}>{index % 2 === 0 ? "🔴" : "✅"}</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppPanel
        farmer={selectedFarmer}
        open={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
