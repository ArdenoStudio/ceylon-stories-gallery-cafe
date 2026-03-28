import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:    "var(--accent)",
        secondary:  "var(--white-80)",
        accent:     "var(--accent)",
        glass:      "var(--glass)",
        "glass-border": "var(--glass-border)",
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
        },
        status: {
          green:  "var(--status-green)",
          yellow: "var(--status-yellow)",
          red:    "var(--status-red)",
        },
      },
      borderRadius: {
        "apple-sm": "10px",
        "apple":    "14px",
        "apple-lg": "20px",
        "apple-xl": "28px",
      },
      boxShadow: {
        "apple-sm": "0 2px 8px rgba(0,0,0,0.40), 0 1px 2px rgba(0,0,0,0.20)",
        "apple":    "0 4px 16px rgba(0,0,0,0.50), 0 1px 4px rgba(0,0,0,0.30)",
        "apple-lg": "0 8px 32px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.40)",
        "accent":   "0 4px 20px rgba(255,77,48,0.30)",
        "accent-lg":"0 8px 32px rgba(255,77,48,0.40)",
      },
      backdropBlur: {
        apple: "40px",
      },
      animation: {
        "fade-up":      "fade-up 0.5s ease forwards",
        "scale-in":     "scale-in 0.3s ease forwards",
        "float":        "float 6s ease-in-out infinite",
        "glow-pulse":   "glow-pulse 3s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)", filter: "blur(4px)" },
          to:   { opacity: "1", transform: "translateY(0)",    filter: "blur(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-4px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,77,48,0.20)" },
          "50%":      { boxShadow: "0 0 20px 4px rgba(255,77,48,0.20)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(0.85)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
