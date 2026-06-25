import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        // Crisp cool off-white canvas, faintly tinted toward the brand teal.
        // Warmth is carried by imagery + serif type, not a sand-colored bg.
        canvas: "#F5F7F6", // cool off-white page background
        surface: "#FFFFFF", // cards / elevated surfaces
        stone: {
          50: "#EDF1F0", // alternating section background
          100: "#E2E8E6", // chips / hover fills
          200: "#CFD8D5", // hairline borders / rings
          300: "#AFBCB8", // muted dividers
        },
        // Cool charcoal ink (near-black with a whisper of green-teal)
        ink: {
          DEFAULT: "#141C1A",
          soft: "#36423E",
          muted: "#586460",
        },
        // Deep teal — the brand accent
        teal: {
          50: "#E6F2F0",
          100: "#C4E0DB",
          200: "#8FC4BC",
          300: "#57A79C",
          400: "#2C8A7D",
          500: "#0F766E", // primary accent
          600: "#0C6058",
          700: "#0A4D47",
          800: "#073A35",
          900: "#052824",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Serif display wants near-zero tracking, not the tight grotesque setting.
        "tight-display": "-0.01em",
        "wide-label": "0.16em",
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        // Defined, layered shadows (not wide soft "ghost" blur paired with a border).
        soft: "0 1px 2px rgba(20,28,26,0.05), 0 4px 12px rgba(20,28,26,0.05)",
        lift: "0 2px 6px rgba(20,28,26,0.06), 0 14px 30px rgba(20,28,26,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "70%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "draw-arc": {
          "0%": { strokeDashoffset: "var(--arc-len)" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.6s ease-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
