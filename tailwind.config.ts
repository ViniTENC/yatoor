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
        // tokens SEÑAL (del mockup yatoor-front_27.html) — se suman a los existentes
        // arriba en vez de reemplazarlos, para no romper pantallas que ya usan `papel`/`gris-calido`/etc.
        "sup-1": "#F4F4F2",
        "sup-2": "#EBEAE6",
        "sup-3": "#DBD9D2",
        "tinta-soft": "#3B3A36",
        "gris-1": "#96938A",
        "gris-2": "#6B6862",
        "linea-1": "#E4E2DC",
        "linea-2": "#D2CFC6",
        "linea-3": "#B3AFA3",
        acento: "#2C6E63",
        "acento-suave": "#D4E4DF",
        rosa: "#FFB3D3",
        violeta: "#D9C2FF",
        celeste: "#AFD1FF",
        menta: "#9FEBD3",
        durazno: "#FFDFAE",
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
