/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#03070F",
        base: "#070E1C",
        surface: "#0A1525",
        card: "#0D1B2E",
        elevated: "#122236",
        amber: {
          DEFAULT: "#F59E0B",
          bright: "#FCD34D",
          dim: "#D97706",
          faint: "rgba(245,158,11,0.08)",
          ring: "rgba(245,158,11,0.2)",
        },
        emerald: {
          DEFAULT: "#10B981",
          bright: "#34D399",
          dim: "#059669",
          faint: "rgba(16,185,129,0.08)",
          ring: "rgba(16,185,129,0.2)",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dim: "#DC2626",
          faint: "rgba(239,68,68,0.08)",
          ring: "rgba(239,68,68,0.2)",
        },
        caution: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          faint: "rgba(249,115,22,0.08)",
          ring: "rgba(249,115,22,0.2)",
        },
        sky: {
          DEFAULT: "#3B82F6",
          bright: "#60A5FA",
          dim: "#1D4ED8",
          faint: "rgba(59,130,246,0.08)",
        },
        ink: {
          primary: "#EFF6FF",
          secondary: "#7BA0C4",
          muted: "#3D5775",
          faint: "#1A3050",
        },
        line: {
          subtle: "#0F1E33",
          DEFAULT: "#1A3050",
          strong: "#1E3A5F",
        },
      },
      boxShadow: {
        ops: "0 0 0 1px rgba(26,48,80,0.9), 0 20px 50px rgba(0,0,0,0.45)",
        "amber-glow": "0 0 0 1px rgba(245,158,11,0.25), 0 0 24px rgba(245,158,11,0.08)",
        card: "0 2px 12px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.02) inset",
        ambient: "0 40px 80px rgba(0,0,0,0.6)",
        whatsapp: "0 8px 40px rgba(0,0,0,0.5), -1px 0 0 rgba(26,48,80,0.9)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        panelSlide: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pingRing: {
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        chatTyping: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        ticker: "ticker 32s linear infinite",
        panelSlide: "panelSlide 220ms ease-out",
        popIn: "popIn 220ms ease-out",
        fadeUp: "fadeUp 400ms ease-out",
        pingRing: "pingRing 1.6s cubic-bezier(0,0,0.2,1) infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
