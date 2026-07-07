import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm parchment base for the fall palette
        cream: {
          50: "#fdfbf6",
          100: "#f8f1e4",
          200: "#efe2c9",
        },
        pine: {
          50: "#f5f7f3",
          100: "#e2ebdf",
          200: "#c4d6bf",
          300: "#97b78f",
          400: "#699160",
          500: "#497442",
          600: "#375b33",
          700: "#2c482a",
          800: "#243a23",
          900: "#1e301d",
          950: "#0f1a0f",
        },
        // Burnt-orange / maple accent
        ember: {
          50: "#fdf4ec",
          100: "#fae2cc",
          200: "#f2c092",
          300: "#e89a5b",
          400: "#dd7733",
          500: "#c85a1c",
          600: "#ad4518",
          700: "#8a3417",
          800: "#702c19",
          900: "#5c2617",
        },
        // Golden amber for autumn highlights
        gold: {
          50: "#fdf8ec",
          100: "#f8ecc9",
          200: "#f0d78d",
          300: "#e8bd52",
          400: "#e0a52c",
          500: "#c98418",
          600: "#a86214",
          700: "#864916",
          800: "#6f3b18",
          900: "#5e3117",
        },
        // Deep maple red for accents
        maple: {
          400: "#c1502e",
          500: "#a83a24",
          600: "#8a2d1f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
