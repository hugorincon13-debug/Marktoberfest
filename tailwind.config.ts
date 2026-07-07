import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#f2f7f4",
          100: "#dceae2",
          200: "#bad6c8",
          300: "#8ebaa5",
          400: "#5e957e",
          500: "#3f7761",
          600: "#2f5f4d",
          700: "#274c3f",
          800: "#213d34",
          900: "#1c332c",
          950: "#0e1c18",
        },
        ember: {
          50: "#fdf5ef",
          100: "#fae7d8",
          200: "#f3ccaf",
          300: "#eba97d",
          400: "#e17e49",
          500: "#d95f27",
          600: "#ca491d",
          700: "#a8371a",
          800: "#862d1c",
          900: "#6d281a",
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
