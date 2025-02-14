import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "mint-green": "#197686",
        "dark-mint-green": "#0E464F",
      },
      fontFamily: {
        jeju: ["JejuMyeongjo", "sans-serif"],
        roboto: ["Roboto"],
        roadrage: ["Road rage"],
        alatsi: ["Alatsi"],
      },
    },
  },
  plugins: [],
} satisfies Config;
