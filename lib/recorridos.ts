export type RecorridoStatus = "hecho" | "incompleto" | "pendiente";

export type Categoria =
  | "tradicional"
  | "moderno"
  | "futbol"
  | "gastronomia"
  | "naturaleza";

export const CATEGORIA_COLOR: Record<Categoria, string> = {
  tradicional: "#A0522D",
  moderno: "#6C5CE7",
  futbol: "#2563EB",
  gastronomia: "#E07A1F",
  naturaleza: "#2F9E44",
};

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  tradicional: "Tradicional",
  moderno: "Moderno",
  futbol: "Fútbol",
  gastronomia: "Gastronomía",
  naturaleza: "Naturaleza",
};

export interface Poi {
  name: string;
  lng: number;
  lat: number;
  categoria: Categoria;
  info?: string;
}

export interface Mensaje {
  from: "yatoor" | "vos";
  text: string;
}

export interface Punto {
  lng: number;
  lat: number;
}

export interface Recorrido {
  id: string;
  nombre: string;
  status: RecorridoStatus;
  porcentaje?: number;
  distanciaKm?: number;
  tiempoMin: number;
  center: [number, number];
  pois: Poi[];
  inicio: Punto;
  conversacion?: Mensaje[];
}

export const recorridos: Recorrido[] = [
  {
    id: "san-telmo",
    nombre: "San Telmo · Adoquines y arte urbano",
    status: "hecho",
    porcentaje: 100,
    distanciaKm: 2.3,
    tiempoMin: 38,
    center: [-58.3712, -34.6208],
    inicio: { lng: -58.3717, lat: -34.6205 },
    pois: [
      {
        name: "Bar cochería 1920",
        lng: -58.3724,
        lat: -34.6214,
        categoria: "tradicional",
        info: "Funciona en la misma esquina desde 1920. La barra de madera es original.",
      },
      {
        name: "Feria de San Telmo",
        lng: -58.3717,
        lat: -34.6202,
        categoria: "gastronomia",
        info: "Puestos de antigüedades y comida al paso, domingos todo el día.",
      },
      {
        name: "Mural de San Telmo",
        lng: -58.3701,
        lat: -34.6229,
        categoria: "moderno",
        info: "Arte urbano pintado en 2019, casi nadie sabe que está ahí.",
      },
    ],
    conversacion: [
      { from: "yatoor", text: "Hola! Con qué energías despertaste hoy?" },
      { from: "vos", text: "Con ganas de caminar sin apuro" },
      {
        from: "yatoor",
        text: "Buenísimo. Estás sobre el adoquín original de 1890. Lo trajeron de Suecia como lastre de los barcos.",
      },
      { from: "vos", text: "Qué buen dato, seguimos" },
      {
        from: "yatoor",
        text: "Dos cuadras más y llegamos al mural — casi nadie sabe que está ahí.",
      },
    ],
  },
  {
    id: "recoleta",
    nombre: "Recoleta · Cementerio y museos",
    status: "hecho",
    porcentaje: 100,
    distanciaKm: 3.1,
    tiempoMin: 52,
    center: [-58.3931, -34.5875],
    inicio: { lng: -58.3925, lat: -34.5891 },
    pois: [
      {
        name: "Cementerio de la Recoleta",
        lng: -58.3931,
        lat: -34.5875,
        categoria: "tradicional",
        info: "El mausoleo de Rufina Cambaceres tiene una historia que te va a helar la sangre.",
      },
      {
        name: "Museo Nacional de Bellas Artes",
        lng: -58.3936,
        lat: -34.5847,
        categoria: "moderno",
        info: "Entrada gratuita, colección permanente de arte argentino e internacional.",
      },
    ],
    conversacion: [
      { from: "yatoor", text: "Hoy toca algo más tranquilo, ¿arrancamos por el cementerio?" },
      { from: "vos", text: "Dale, siempre quise entender los mausoleos" },
      {
        from: "yatoor",
        text: "El de Rufina Cambaceres tiene una historia que te va a helar la sangre. Te cuento en el camino.",
      },
    ],
  },
  {
    id: "puerto-madero",
    nombre: "Puerto Madero · Costanera al atardecer",
    status: "incompleto",
    porcentaje: 60,
    tiempoMin: 24,
    center: [-58.363, -34.6118],
    inicio: { lng: -58.366, lat: -34.6135 },
    pois: [
      {
        name: "Puente de la Mujer",
        lng: -58.363,
        lat: -34.6118,
        categoria: "moderno",
        info: "Diseñado por Santiago Calatrava, inaugurado en 2001.",
      },
      {
        name: "Reserva Ecológica",
        lng: -58.3534,
        lat: -34.6089,
        categoria: "naturaleza",
        info: "350 hectáreas sobre el río, ideal para el atardecer.",
      },
    ],
    conversacion: [
      { from: "yatoor", text: "Se viene un atardecer lindo, ¿seguimos hasta la reserva?" },
      { from: "vos", text: "Sí, dale" },
    ],
  },
  {
    id: "palermo",
    nombre: "Palermo · Murales y cafés",
    status: "pendiente",
    tiempoMin: 30,
    center: [-58.4238, -34.5885],
    inicio: { lng: -58.425, lat: -34.5895 },
    pois: [
      {
        name: "Plaza Serrano",
        lng: -58.4238,
        lat: -34.5885,
        categoria: "moderno",
        info: "Punto de partida del circuito de bares y diseño de Palermo Soho.",
      },
      {
        name: "Cancha Municipal",
        lng: -58.417,
        lat: -34.581,
        categoria: "futbol",
        info: "Canchas de fútbol 5 abiertas al público todo el día.",
      },
      {
        name: "Jardín Japonés",
        lng: -58.4139,
        lat: -34.5776,
        categoria: "naturaleza",
        info: "El jardín japonés más grande fuera de Japón.",
      },
    ],
  },
];

export function getRecorrido(id: string) {
  return recorridos.find((r) => r.id === id);
}

// El recorrido que aparece activo la primera vez (sin nada guardado todavía).
export const DEFAULT_ACTIVE_ID = "puerto-madero";
