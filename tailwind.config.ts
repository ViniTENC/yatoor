import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        papel: "#F5F2EA",
        superficie: "#EDE9DE",
        "superficie-oscura": "#E2DCCD",
        tinta: "#14161A",
        "gris-medio": "#6E7278",
        "gris-calido": "#8A8578",
        linea: "#DEDACF",
        "linea-marcada": "#C9C4B5",
        lima: "#B9F227",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
