"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

function colorForRisk(risk) {
  if (risk > 85) return "var(--accent-red)";
  if (risk >= 70) return "var(--accent-orange)";
  return "#f5d742";
}

function radiusForRisk(risk) {
  if (risk > 85) return 16;
  if (risk >= 70) return 12;
  return 8;
}

export default function MapView({ districts, center, zoom, selectedDistrict, onSelectDistrict }) {
  const [pulseTick, setPulseTick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulseTick((value) => !value), 1400);
    return () => clearInterval(interval);
  }, []);

  const markers = useMemo(
    () =>
      districts.map((district) => ({
        ...district,
        accent: colorForRisk(district.risk),
        radius: radiusForRisk(district.risk),
      })),
    [districts],
  );

  return (
    <div className="relative h-[72vh] overflow-hidden rounded-[30px] border border-[var(--border)] bg-[rgba(10,15,13,0.88)] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((district) => {
          const isSelected = selectedDistrict === district.name;
          const radius = district.radius + (pulseTick ? 1 : 0) + (isSelected ? 3 : 0);
          return (
            <CircleMarker
              key={district.name}
              center={district.coordinates}
              radius={radius}
              pathOptions={{
                color: district.accent,
                fillColor: district.accent,
                fillOpacity: isSelected ? 0.42 : 0.28,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelectDistrict(district.name),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky>
                <div className="space-y-1 rounded-xl border border-[var(--border)] bg-[rgba(10,15,13,0.96)] px-3 py-2 text-xs text-[var(--text-primary)] shadow-[0_16px_32px_rgba(0,0,0,0.35)]">
                  <div className="font-display text-sm text-[var(--accent-green)]">{district.name}</div>
                  <div>Risk {district.risk}%</div>
                  <div>{district.fires} fires tracked</div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-[rgba(0,255,136,0.16)] bg-[rgba(19,31,23,0.78)] px-4 py-3 backdrop-blur-md">
        <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">Live scan</div>
        <div className="mt-1 text-sm text-[var(--text-primary)]">Satellite heatmap and stubble burn risk layers</div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-[rgba(30,58,40,0.85)] bg-[rgba(19,31,23,0.82)] px-4 py-3 text-xs text-[var(--text-secondary)] backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-red)] shadow-[0_0_16px_rgba(255,45,85,0.6)]" />
        <span>High risk districts pulse in red, intervention-ready zones glow orange.</span>
      </div>
    </div>
  );
}
