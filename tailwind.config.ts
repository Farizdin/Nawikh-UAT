import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          500: "#0891b2",
          600: "#0e7490",
          700: "#155e75",
          900: "#164e63"
        },
        friendly: {
          mint: "#dcfce7",
          peach: "#ffedd5",
          lavender: "#ede9fe",
          sky: "#dbeafe",
          cream: "#fff7ed"
        }
      },
      boxShadow: {
        soft: "0 12px 30px rgba(14, 116, 144, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
