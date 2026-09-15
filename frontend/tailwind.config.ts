import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        moonGold: "rgb(var(--moon-gold) / <alpha-value>)",
        moonGreen: "rgb(var(--moon-green) / <alpha-value>)",
        moonInk: "rgb(var(--moon-ink) / <alpha-value>)",
        moonSoft: "rgb(var(--moon-soft) / <alpha-value>)",
        moonMuted: "rgb(var(--moon-muted) / <alpha-value>)",
        moonCard: "rgb(var(--moon-card) / <alpha-value>)",
        moonBg: "rgb(var(--moon-bg) / <alpha-value>)",
        moonBorder: "rgb(var(--moon-border) / <alpha-value>)"
      },
      boxShadow: {
        glass: "0 18px 36px rgba(2, 6, 12, 0.6)",
        glow: "0 18px 36px rgba(18, 160, 122, 0.35)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 18% 20%, rgb(var(--moon-green) / 0.35), transparent 45%), radial-gradient(circle at 85% 10%, rgb(var(--moon-gold) / 0.2), transparent 40%), linear-gradient(180deg, rgb(var(--moon-bg) / 1) 0%, rgb(var(--moon-bg-alt) / 1) 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
