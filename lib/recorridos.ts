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

export type FiltroMapa = "historia" | "comida" | "arte" | "miradores";

export interface Poi {
  name: string;
  lng: number;
  lat: number;
  categoria: Categoria;
  info?: string;
  // --- campos usados por la pantalla de mapa (mockup yatoor-front_27.html) ---
  filtro?: FiltroMapa;
  distanciaM?: number; // distancia aprox. a pie desde donde estás
  relatoMin?: number; // minutos de relato en audio
  placeId?: string | null; // Google Places, para PoiPhoto
  sponsored?: boolean;
  benefitText?: string; // ej. "15% con la app"
  friendNote?: { name: string; avatar: string; text: string };
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
        filtro: "historia",
        distanciaM: 180,
        relatoMin: 3,
      },
      {
        name: "Feria de San Telmo",
        lng: -58.3717,
        lat: -34.6202,
        categoria: "gastronomia",
        info: "Puestos de antigüedades y comida al paso, domingos todo el día.",
        filtro: "comida",
        distanciaM: 650,
        relatoMin: 4,
      },
      {
        name: "Mural de San Telmo",
        lng: -58.3701,
        lat: -34.6229,
        categoria: "moderno",
        info: "Arte urbano pintado en 2019, casi nadie sabe que está ahí.",
        filtro: "arte",
        distanciaM: 900,
        relatoMin: 2,
        friendNote: {
          name: "Vicente",
          avatar: "V",
          text: "Pasé por acá el mes pasado, el mural cambia según la luz del día.",
        },
      },
      {
        name: "Café Society",
        lng: -58.3706,
        lat: -34.622,
        categoria: "gastronomia",
        info: "Café de especialidad en una esquina restaurada de San Telmo.",
        filtro: "comida",
        distanciaM: 300,
        relatoMin: 1,
        sponsored: true,
        benefitText: "15% con la app en tu consumición",
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

// ============================================================
// Datos mock de perfil: amigos, medallero (pasaporte + logros) y beneficios.
// Pantalla /perfil (mockup yatoor-front_27.html).
// ============================================================

export interface Friend {
  key: string;
  name: string;
  avatar: string;
  since: string; // "Amigos desde marzo 2025"
  tags: string[];
  recorridoTitulo: string;
  recorridoThumb: string;
  recorridosRecientes: { titulo: string; meta: string }[];
  pasaporte: { ciudad: string; meta: string; visited: boolean }[];
  logros: { nombre: string; earned: boolean }[];
}

export const amigosPerfil: Friend[] = [
  {
    key: "vicente",
    name: "Vicente",
    avatar: "V",
    since: "Amigos desde marzo 2025",
    tags: ["Explorador Oro", "12 recorridos"],
    recorridoTitulo: "Palermo café por café",
    recorridoThumb:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dorrego_Square_(4728829963).jpg?width=300",
    recorridosRecientes: [
      { titulo: "Palermo café por café", meta: "Completo · 3,4 km · 1h50" },
      { titulo: "San Telmo a fondo", meta: "Completo · 2,3 km · 1h05" },
    ],
    pasaporte: [
      { ciudad: "Buenos Aires", meta: "9 recorridos", visited: true },
      { ciudad: "Montevideo", meta: "1 recorrido", visited: true },
    ],
    logros: [
      { nombre: "Primeros pasos", earned: true },
      { nombre: "5 recorridos", earned: true },
      { nombre: "Noctámbulo", earned: false },
    ],
  },
  {
    key: "manuel",
    name: "Manuel",
    avatar: "M",
    since: "Amigos desde julio 2025",
    tags: ["Explorador Plata"],
    recorridoTitulo: "La Boca, colores y fútbol",
    recorridoThumb:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dorrego_Square_(4728829963).jpg?width=300",
    recorridosRecientes: [
      { titulo: "La Boca, colores y fútbol", meta: "Completo · 2,9 km · 1h30" },
    ],
    pasaporte: [{ ciudad: "Buenos Aires", meta: "4 recorridos", visited: true }],
    logros: [
      { nombre: "Primeros pasos", earned: true },
      { nombre: "5 recorridos", earned: false },
    ],
  },
  {
    key: "ulises",
    name: "Ulises",
    avatar: "U",
    since: "Amigos desde enero 2026",
    tags: ["Explorador Bronce"],
    recorridoTitulo: "Recoleta al amanecer",
    recorridoThumb:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Buenos_Aires_-_Recoleta_-_El_Ateneo_ex_Grand_Splendid_2.JPG?width=300",
    recorridosRecientes: [
      { titulo: "Recoleta al amanecer", meta: "Completo · 3,1 km · 2h10" },
    ],
    pasaporte: [{ ciudad: "Buenos Aires", meta: "2 recorridos", visited: true }],
    logros: [{ nombre: "Primeros pasos", earned: true }],
  },
];

export const pasaporteCiudades = [
  {
    ciudad: "Buenos Aires",
    meta: "6 recorridos",
    visited: true,
    foto:
      "https://commons.wikimedia.org/wiki/Special:FilePath/El_obelisco_-_Buenos_Aires_-_Argentina.jpg?width=500",
  },
  {
    ciudad: "Córdoba",
    meta: "1 recorrido",
    visited: true,
    foto:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Nueva_C%C3%B3rdoba_2012-02-03.jpg?width=500",
  },
  {
    ciudad: "Río de Janeiro",
    meta: "2 recorridos",
    visited: true,
    foto: "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_of_Rio_de_Janeiro.jpg?width=500",
  },
  { ciudad: "Montevideo", meta: "Próximamente", visited: false, foto: "" },
];

export const logros = [
  { nombre: "Primeros pasos", earned: true },
  { nombre: "5 recorridos", earned: true },
  { nombre: "10 km caminados", earned: true },
  { nombre: "Noctámbulo", earned: false },
  { nombre: "Barrio por barrio", earned: false },
  { nombre: "Guía de amigos", earned: false },
];

export interface Beneficio {
  partner: string;
  partnerCorto: string;
  desc: string;
  req: string;
  locked: boolean;
}

export const beneficios: Beneficio[] = [
  { partner: "Café Society", partnerCorto: "CS", desc: "15% en tu consumición", req: "A 300 m de tu última parada", locked: false },
  { partner: "Almacén Uriarte", partnerCorto: "AU", desc: "Postre invitado con el menú", req: "Terminá el recorrido de San Telmo", locked: false },
  { partner: "Librería del Sur", partnerCorto: "LS", desc: "10% en libros de historia porteña", req: "Explorador Oro", locked: true },
];

export const perfilMock = {
  nombre: "Felipe",
  ubicacion: "Buenos Aires · miembro desde 2026",
  nivel: 4,
  nivelNombre: "Caminante",
  xp: 640,
  xpTotal: 1000,
  racha: [
    { dia: "L", done: true },
    { dia: "M", done: true },
    { dia: "M", done: true },
    { dia: "J", done: false },
    { dia: "V", done: false },
    { dia: "S", done: true },
    { dia: "D", done: false },
  ],
  tierName: "Explorador Plata",
  tierNext: "A 2 recorridos de Explorador Oro",
};
