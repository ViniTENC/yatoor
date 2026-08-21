# YATOOR — contexto del proyecto

App móvil: **tu compañero de viaje con IA**. Sugiere rutas según los intereses del usuario y va
narrando el recorrido con geolocalización. Cuando el usuario llega a un punto, el audio arranca
**solo** (sin play) y le cuenta la historia o alguna curiosidad. Audio con transcripción viva en pantalla.
Arranca en Buenos Aires, pensada para escalar a cualquier ciudad. Proyecto "Road to millonarios".

## Idea de marca

- **Yatoor es tu compañero de viaje** — el corazón de la marca. No es una app que se consulta:
  es alguien que camina con vos, y cada uno tiene el suyo. Es el activo que viaja con el usuario
  de una ciudad a otra (clave para el horizonte de escalar).
- **SEÑAL es el sistema visual y el mecanismo** — *cómo* te acompaña: lee las señales de la ciudad
  y te las cuenta. La palabra le cae justo por tres lados: la señal de GPS (lo que lo hace andar),
  la chapa/cartel de esquina porteño (la herencia visual) y *hacer una seña* ("che, mirá esto").
- Núcleo emocional: **"No es una guía. Es tu compañero de viaje."**
- Bandera: **"Caminá. Yatoor te cuenta."** — Sensación: **"Llegás, y arranca a hablar."**
- Ojo: "compañero de viaje" como frase es genérica; la distinción la sostienen SEÑAL + la voz,
  no la frase sola.

## Decisiones tomadas

- Los archivos en `uploads/` (manual de marca celeste/verde y mockups violeta oscuro) quedaron
  descartados: se arrancó la estética de cero. No usarlos como referencia visual.
- Dirección elegida: **SEÑAL** (opción 1a en `Yatoor Estética.dc.html`).
- El onboarding **no es de opciones fijas**: es un chat abierto con el bot, campo de texto libre.
  Los chips debajo del input son sólo sugerencias que rellenan el campo.
- **Audio automático**: se reproduce solo al llegar al punto, no al apretar play. El control natural
  es Pausar, no Reproducir.
- **Nombre: Yatoor**, decidido y cerrado (no reabrir el debate del "tour").
- **Tipografía: dos fuentes, cero mono.** Archivo (títulos) + DM Sans (todo lo demás, incluidos los
  datos). El mono/"roboto" quedó descartado — se leía feo y robótico.
- **Voz universal y localizable** (ver sección Voz). Se bajó el porteñismo pesado: un dejo de
  informalidad, no un desfile de modismos.

## Sistema visual — SEÑAL

| token | valor | uso |
|---|---|---|
| papel | `#F5F2EA` | fondo principal |
| papel oscuro | `#EDE9DE` / `#E2DCCD` | superficies, mapa |
| tinta | `#14161A` | texto, botón primario, marco |
| gris | `#8A8578` / `#6E7278` | texto secundario |
| línea | `#DEDACF` / `#C9C4B5` | bordes |
| lima | `#B9F227` | **sólo cuando Yatoor está hablando o algo pasa en vivo**: punto de la geocerca, cursor de narración, CTA |

- Display: **Archivo** 800, `font-stretch` 108–112%, tracking `-.03em`.
- Texto, interfaz y etiquetas: **DM Sans** (caja normal; rótulos en versalita óptica, no mono).
- Datos (timecode, coordenadas): **DM Sans con cifras tabulares** (`font-variant-numeric: tabular-nums`).
  Alinean sin verse robóticos. **Nada de tipografía mono.**
- Botones y chips: pill (`border-radius:100px`). Tarjetas: 12–16px.
- El acento lima nunca se usa como fondo decorativo ni en degradés.

## Símbolo

- La mecánica dibujada: el punto **"estás acá"** dentro de la geocerca (anillo + punto).
- **Reposo**: todo tinta. **Hablando**: el punto se prende en lima y late — la presencia de Yatoor
  al lado tuyo. El latido se activa **cuando Yatoor habla** (audio en curso), no con un botón.
- No teñir el logo de lima (la lima es estado, no color de marca). No usar el símbolo "hablando"
  en material impreso/estático.

## Voz — Yatoor

- Habla como un compañero que conoce la ciudad, no como el cartel del museo. Relajado, cercano,
  segunda persona, presente, frases cortas. Un dato que engancha y sigue. **Nada de emojis.**
- **Cercano, no localista**: un dejo de informalidad, no un disfraz de modismos. Que lo entienda
  cualquiera.
- **Yatoor, no "nosotros"**: la marca es un personaje que acompaña. "Yatoor te cuenta", no
  "te contamos".
- **El tono viaja, el contenido no**: mismo tono en toda ciudad; el registro se adapta (voseo en
  Buenos Aires, tú en otras); las historias son hiperlocales. Es lo que abarata abrir cada ciudad nueva.
- Así sí: *"Estás sobre el adoquín original de 1890. Lo trajeron de Suecia como lastre de los barcos."*
- Así no: *"El histórico empedrado que usted pisa constituye un testimonio del rico pasado de la ciudad."*

## Archivos

- `Yatoor Estética.dc.html` — las 3 direcciones exploradas (1a Señal ✓, 1b Nocturno, 1c Diagrama).
- `Yatoor Prototipo.dc.html` — prototipo navegable en Señal: intro → chat de onboarding →
  armado de ruta → mapa narrando → recorridos. (Actualizar: el audio arranca solo, sin play.)
- `Yatoor Identidad de Marca.dc.html` — **manual de identidad completo** (idea, momento vivo,
  marca/símbolo, color, tipografía, voz, aplicaciones). Fuente de verdad de la marca.

## Pendientes

- Pantalla de fin de recorrido y perfil.
- Conectar el bot del onboarding a un modelo real para que cite las palabras del usuario.
- Actualizar el prototipo para reflejar el audio automático (sacar el play, dejar Pausar).
