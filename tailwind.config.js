/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-card)",
        border: "var(--border)",
        accentGreen: "var(--accent-green)",
        accentOrange: "var(--accent-orange)",
        accentRed: "var(--accent-red)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
      },
      boxShadow: {
        mission: "0 24px 70px rgba(0, 0, 0, 0.35)",
        glow: "0 0 0 1px rgba(0, 255, 136, 0.12), 0 18px 40px rgba(0, 0, 0, 0.28)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        panelIn: {
          "0%": { transform: "translateX(24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseRing: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        panelIn: "panelIn 260ms ease-out",
        popIn: "popIn 260ms ease-out",
        pulseRing: "pulseRing 2.2s ease-in-out infinite",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "monospace"],
      },
    },
  },
  plugins: [],
};
