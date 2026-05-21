import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maven: {
          green: "#12352A",
          "green-light": "#1C4A38",
          "green-dark": "#0A2119",
          gold: "#C9A84C",
          "gold-light": "#E8C97A",
          cream: "#FDFCF0",
          muted: "#8FAF95",
        }
      },
      fontFamily: {
        display: ['var(--font-cormorant)'],
        body: ['var(--font-dm-sans)'],
      },
    },
  },
  plugins: [],
};
export default config;
