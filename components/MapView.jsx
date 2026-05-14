"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

function colorForRisk(risk) {
  if (risk > 85) return "#EF4444";
  if (risk >= 70) return "#F97316";
  return "#F59E0B";
}

function radiusForRisk(risk) {
  if (risk > 85) return 16;
  if (risk >= 70) return 12;
  return 9;
}

export default function MapView({ districts, center, zoom, selectedDistrict, onSelectDistrict }) {
  const [pulseTick, setPulseTick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulseTick((v) => !v), 1500);
    return () => clearInterval(interval);
  }, []);

  const markers = useMemo(
    () =>
      districts.map((district) => ({
        ...district,
        color: colorForRisk(district.risk),
        radius: radiusForRisk(district.risk),
      })),
    [districts]
  );

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl border border-line bg-card">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((district) => {
          const isSelected = selectedDistrict === district.name;
          const radius = district.radius + (pulseTick ? 1.5 : 0) + (isSelected ? 4 : 0);
          return (
            <CircleMarker
              key={district.name}
              center={district.coordinates}
              radius={radius}
              pathOptions={{
                color: district.color,
                fillColor: district.color,
                fillOpacity: isSelected ? 0.5 : 0.3,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{ click: () => onSelectDistrict(district.name) }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky>
                <div
                  className="rounded-xl border border-line-strong bg-card px-3 py-2.5 shadow-ops"
                  style={{ minWidth: 160 }}
                >
                  <div className="font-sans text-sm font-semibold text-ink-primary">
                    {district.name}
                  </div>
                  <div className="mt-1 font-sans text-xs text-ink-secondary">
                    {district.state}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs text-ink-muted">Risk</div>
                      <div
                        className="font-display text-lg font-bold"
                        style={{ color: district.color }}
                      >
                        {district.risk}%
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-ink-muted">Fires</div>
                      <div className="font-display text-lg font-bold text-caution">
                        {district.fires}
                      </div>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Top-left overlay */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pingRing rounded-full bg-danger opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-danger-light">
            Live Satellite Scan
          </div>
          <div className="font-sans text-xs text-ink-secondary">
            Stubble burn risk · Punjab &amp; Haryana
          </div>
        </div>
      </div>

      {/* Bottom-left legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 backdrop-blur-md">
        <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted">
          Risk Level
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span className="font-sans text-xs text-ink-secondary">Critical (&gt;85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-caution shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            <span className="font-sans text-xs text-ink-secondary">High (70–85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="font-sans text-xs text-ink-secondary">Moderate (&lt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
