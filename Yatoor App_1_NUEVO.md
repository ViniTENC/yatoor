# YATOOR — diseño de la app (Mapa · Yatoor · Perfil)

Archivos: `Yatoor App.dc.html` (diseño vivo, interactivo) · `Yatoor App-print.dc.html` (copia
paginada para PDF, 9 páginas) · `Yatoor App v1 oscuro.dc.html` (primera versión, fondo negro —
descartada).

---

## Cambio de color: el lima sale, entra la nube

El lima eléctrico `#B9F227` se retira. **Su función pasa al tornasolado nube** (inspirado en el
logo de Apple TV): rosa → violeta → celeste → menta → durazno, con textura de nube
(`feTurbulence` en `soft-light`).

La regla del sistema SEÑAL no cambia, sólo cambia el color que la cumple:

> el acento aparece **sólo cuando Yatoor está hablando o algo pasa en vivo**.

Dónde aparece: punto de la geocerca, cursor de la transcripción, franja superior de la tarjeta de
ruta, ruta activa en el mapa, logros ya ganados, anillo del botón central cuando Yatoor está en
foco. Dónde **no**: fondos, el logo, material impreso o estático.

| token | valor |
|---|---|
| nube · rosa | `#FFB3D3` |
| nube · violeta | `#D9C2FF` |
| nube · celeste | `#AFD1FF` |
| nube · menta | `#9FEBD3` |
| nube · durazno | `#FFDFAE` |

Degradé en vivo: `linear-gradient(100deg,#FFB3D3,#D9C2FF,#AFD1FF,#9FEBD3,#FFDFAE,#FFB3D3)` con
`background-size:300% 100%`.

### Movimiento

La nube **late y deriva**: el latido (`2.4s`) marca el pulso, la deriva del degradé marca que el
relato está corriendo (franja `9s`, punto `7s`, cursor de narración `5s`). Al pausar el audio se
congela, no desaparece. En reposo el símbolo queda todo tinta y quieto — así el movimiento sigue
significando "está hablando".

---

## Resto del sistema (sin cambios respecto de SEÑAL)

- Papel `#F5F2EA`; superficies y mapa `#EDE9DE` / `#E2DCCD`; tinta `#14161A`; gris `#8A8578` /
  `#6E7278`; línea `#DEDACF` / `#C9C4B5`.
- Display **Archivo** 800, `font-stretch:110%`, tracking `-.03em`. Interfaz y texto **DM Sans**.
  Datos con `font-variant-numeric: tabular-nums`. **Cero mono.**
- Botones y chips pill (`100px`); tarjetas `12–16px`.
- Rótulos en versalita óptica: DM Sans 500, `10px`, `letter-spacing:.12em`, mayúsculas.

---

## Flujo: armar → caminar → cerrar → volver

Tres tabs, Yatoor al centro y elevado porque es la propuesta de valor. Sin callejones sin salida:
de cada pantalla se sale hacia la siguiente acción, no hacia atrás.

### 1 · Yatoor — armás el recorrido hablando

- Chat abierto, campo de texto libre. Los chips debajo del input ("Más corto", "Menos caminata",
  "Sumar café") son **sugerencias que rellenan el campo**, no opciones fijas.
- El tour se devuelve como **tarjeta interactiva**, nunca como texto largo: título, 4 KPIs
  (paradas · duración · km · minutos de relato), las primeras paradas y dos acciones —
  **Ver en el mapa** (primaria, tinta) y **Ajustar**.
- Al ajustar aparece una `v2` con el delta explícito (`−1,1 km`), no una tarjeta nueva sin memoria.
- "Ver en el mapa" exporta la ruta y avisa: *"Ya está en el mapa. Caminá — cuando llegues, arranco."*
- La conversación está ancorada abajo, así el CTA nunca queda fuera de pantalla.

### 2 · Mapa — dos estados

**a) Exploración libre (default).** Chips de filtro, puntos de interés como el símbolo (anillo +
punto) en tinta, el punto cercano activo en nube. Bottom sheet colapsable: colapsado muestra
"12 señales cerca" + carrusel; expandido muestra la parada con foto, el relato y
*"Al llegar, arranca solo · 2:40"*. Acciones: **Llevame acá** / **Sumar al recorrido**.

**b) Recorrido activo.** La ruta dibujada (lo caminado en tinta, lo que falta en nube), banner de
navegación secuencial, geocerca latiendo, progreso de 7 paradas. El panel de abajo es el relato en
curso: rótulo *"Yatoor está contando"*, timecode `1:12 / 2:40`, transcripción viva con el cursor
nube y **Pausar** + **Siguiente parada**. Controles de ruta disponibles: pausar, recalcular,
modificar.

**Audio automático:** al entrar en la geocerca arranca solo. **No hay Play** — el control natural
es Pausar.

**Acceso rápido a Yatoor:** el botón flotante sobre el mapa (tinta, símbolo en negativo) abre el
chat para preguntar o ajustar el recorrido sin salir del mapa.

### 3 · Fin de recorrido

Cierra el ciclo y alimenta lo social: mapa de lo caminado con la ruta completa (`7 de 7 paradas`),
cuatro datos (`4,2 km` · `3h05` · `18 min de relato` · `+120 puntos`), el **logro nuevo** con la
barra hacia el nivel siguiente, las fotos que sacó el usuario, y **Compartir como recorrido** como
acción principal (+ Guardar / Otro cerca).

### 4 · Perfil

- **Recorridos:** historial con los completos y los inconclusos retomables (`3 de 5 · seguir`).
- **Logros:** grilla de 6; los ganados llevan la nube, los pendientes línea punteada. Racha
  semanal. Nivel con barra tornasolada.
- **Social (más adelante):** recorridos de amigos, copiables en un toque, y **recorridos de autor**
  curados por gente del barrio o figuras conocidas, marcados "Pronto".

---

## Pendientes

- Onboarding antes del chat (una sola pantalla, que sea directamente el chat).
- Conectar el bot a un modelo real para que cite las palabras del usuario.
- Tarjeta para compartir en historias (formato vertical, derivada del fin de recorrido).
- Calificar paradas al terminar.
- Modo audio manos libres (pantalla apagada) y pack offline del recorrido.
- Actualizar `Yatoor Prototipo.dc.html` (no está en este proyecto): sacar el Play, sumar el acento
  nube.
