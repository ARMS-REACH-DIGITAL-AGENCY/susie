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
        cream:  "#faf7f4",
        stone:  "#f0ebe4",
        purple: {
          DEFAULT: "#6b4fa0",
          light:   "#8b6fc0",
          dark:    "#4a3570",
        },
        gold:   "#b8975a",
        warm:   "#8b6f52",
        muted:  "#6b5744",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-jost)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
