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
        // Warm neutral canvas
        canvas: "#F6F4EF", // warm off-white background
        surface: "#FFFFFF", // cards / elevated surfaces
        stone: {
          50: "#F6F4EF",
          100: "#EDE9E1",
          200: "#DED8CC",
          300: "#C8BFAE",
        },
        // Charcoal ink (warm-leaning near-black)
        ink: {
          DEFAULT: "#1A1B19",
          soft: "#3A3C38",
          muted: "#6B6D67",
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
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tight-display": "-0.02em",
        "wide-label": "0.22em",
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26,27,25,0.04), 0 8px 24px rgba(26,27,25,0.06)",
        lift: "0 2px 4px rgba(26,27,25,0.06), 0 18px 40px rgba(26,27,25,0.10)",
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
