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
        brutalist: {
          black: "#000000",
          white: "#FFFFFF",
          beige: "#F5F5DC",
          yellow: "#FBF407",
          border: "#333333",
          green: "#00FF66",
          blue: "#0066FF",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
};
export default config;
