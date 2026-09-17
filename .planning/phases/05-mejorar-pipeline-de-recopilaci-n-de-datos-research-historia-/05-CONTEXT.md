# Phase 5: Mejorar pipeline de recopilación de datos (research + historia de relleno entre POIs + guardado de descripción del recorrido) - Context

**Gathered:** 2026-09-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Mejorar el pipeline de armado de ciudad (documentado en `nueva-ciudad.md` §10) en tres frentes concretos que el usuario identificó como débiles: (1) el paso 1 (scraping inicial) no junta suficiente variedad/densidad de POIs, (2) el paso 2/6 (verificación) tiene más errores cuando se arman relaciones POI↔entidad falsas que cuando se verifica un POI suelto, y (3) no existe hoy ningún mecanismo para narrar/rellenar los tramos sin POI puntual entre dos paradas de un recorrido, ni para persistir esa narración. Esta fase NO implementa el pipeline completo de una ciudad nueva (eso es Fase 4) — mejora las herramientas/mecanismos que ese pipeline y el resto del producto van a usar.

</domain>

<decisions>
## Implementation Decisions

### Contexto de zona/barrio (relleno narrativo entre POIs)
- **D-01:** Se crea una nueva capa de datos — contexto pre-cargado por barrio/zona (no por ciudad completa, no por tramo específico entre 2 POIs) — con historia general, carácter del lugar, hitos. Se puebla una vez por ciudad durante el pipeline de onboarding.
- **D-02:** Objetivo explícito: minimizar que el modelo tenga que buscar en internet en el momento de armar un recorrido. El modelo consulta este contexto pre-cargado y solo gasta tokens en *conectar/narrar* el tramo, no en investigar hechos.
- **D-03:** Estándar de fuente para este contexto de zona es **relajado** — no requiere fuente citable puntual como un POI (paso 2 del pipeline). Es "color"/contexto ambiental, no un dato duro que alguien pueda chequear parado en el lugar. Diferencia explícita con el estándar de POI: un POI SÍ necesita fuente real (nueva-ciudad.md §2); el contexto de zona no.
- **D-04 (descartado, anotar por qué):** Contexto por tramo específico entre pares de POIs fue descartado — crece con cada recorrido nuevo (no solo con cada ciudad), demasiado costoso de research vs. el enfoque por barrio.

### Guardado de la narración del recorrido
- **D-05:** Se persiste el texto exacto narrado por el modelo cuando arma un recorrido (no solo la selección de POIs+orden). Evita regenerar desde cero cada vez que alguien pide el mismo recorrido — ahorra tokens y da consistencia.
- **D-06:** La clave de esa narración persistida es la **secuencia exacta de POIs** (no por usuario/sesión). Si dos usuarios distintos piden el mismo recorrido (mismos POIs, mismo orden), leen el mismo texto ya narrado. Prioriza ahorro de tokens sobre personalización por usuario.
- Implicación de esquema (a resolver en research/planning): hace falta una tabla nueva tipo `recorridos_narrados` (o similar) con clave = hash/secuencia de `poi_id`s ordenados, y el texto narrado completo (incluyendo los tramos de contexto de zona insertados).

### Auditoría del grafo de entidades (pasos 8-9 del pipeline)
- **D-07:** La auditoría independiente (paso 8) y el arbitraje (paso 9), hoy solo una idea sin ejecutar, se implementan con **foco en las aristas del grafo `poi_entidad`** (¿es real este vínculo POI↔entidad, o está forzado?) — NO en el contenido narrativo de cada POI individual. Motivo: el usuario reportó que los errores se concentran en relaciones falsas, no en POIs sueltos.
- **D-08:** El arbitraje (modelo 3) solo interviene sobre los vínculos que el auditor (modelo 2) flageó como dudosos — no revisa todo el grafo de nuevo.
- **D-09:** "Ciego" en la práctica = una sesión nueva de Claude Code (o subagente sin contexto heredado) que recibe SOLO el POI + la entidad + la relación final propuesta — nunca el chat/research donde se armó esa relación. No se requiere infraestructura nueva (otro proveedor de LLM) para esto; se resuelve con aislamiento de sesión/subagente.

### Fuentes nuevas para el paso 1 (scraping/densidad inicial)
- **D-10:** Se agregan fuentes nuevas al scraping de paso 1, en este orden de prioridad:
  1. Wikipedia/Wikivoyage por barrio — listas de lugares de interés con más densidad que sitios de tours turísticos, cubre "lo local" que Civitatis no menciona.
  2. Reddit/foros locales (r/{ciudad}, foros de expats) — fuente de "lo que un turista no encuentra en guías" (misterios, curiosidades, lugares no turísticos).
  3. Google Maps reviews / densidad de reseñas por zona — señal de qué es relevante aunque no esté en ningún tour armado.
- **D-11 (no priorizado, no descartado):** Datasets oficiales tipo GCBA open-data (equivalente por ciudad a `data.buenosaires.gob.ar`) no fue seleccionado en esta ronda. Anotar como candidato futuro si las 3 fuentes priorizadas no alcanzan densidad suficiente.

### Claude's Discretion
Ninguna — todas las decisiones de esta fase fueron explícitamente resueltas por el usuario en la discusión.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Pipeline actual (proceso a mejorar)
- `building_bd/nueva-ciudad.md` §10 — pipeline formal de 9 pasos (v2), sección que define paso 1 (scraping), paso 2 (verificación), pasos 5-7 (grafo de entidades), pasos 8-9 (auditoría/arbitraje, hoy no ejecutados)
- `building_bd/nueva-ciudad.md` §11 — verificación de precisión, por qué separar dato de marco (relevante para D-07/D-08)
- `building_bd/nueva-ciudad.md` §12 — grafo de entidades: formato y reglas de branching

### Estado actual de datos (línea base — "poca densidad" que motivó esta fase)
- `building_bd/ESTADO_BD.md` — snapshot de estado de la BD (conteos por ciudad)
- `building_bd/caba.md`, `building_bd/madrid.md`, `building_bd/rio-de-janeiro.md` — los 3 datasets de ciudad existentes, punto de comparación de densidad
- `building_bd/entidades-caba.md`, `building_bd/entidades-madrid.md`, `building_bd/entidades-rio-de-janeiro.md` — grafos de entidades existentes, donde se reportaron los errores de relación

### Esquema de datos
- `building_bd/schema.sql` — esquema actual (pois, entidades, poi_entidad, poi_categorias, categorias); la nueva tabla de contexto de zona y la de recorridos narrados (D-01, D-05) se agregan sobre este esquema
- Proyecto Supabase: `yatoor-demo-caba` (zhiigqsslttzkfrfhocc) — donde vive el esquema real hoy

### Proyecto GSD
- `.planning/PROJECT.md`, `.planning/ROADMAP.md` — Fase 5 en contexto de las otras 4 fases (auditoría de datasets existentes, grafo de entidades, pesos de categoría, onboarding de 4ta ciudad)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `building_bd/ingest_pois.py` — script de ingesta existente a Supabase; probablemente necesita extenderse para poblar la tabla de contexto de zona
- Tabla `poi_categorias` (con pesos 0-10 recién recategorizados a mano) — patrón de "capa de metadata pre-cargada consultada en tiempo de tour" ya existe, el contexto de zona sigue el mismo patrón

### Established Patterns
- El pipeline de 9 pasos ya asume research humano/manual en varios pasos (paso 1, paso 2) — esta fase no lo automatiza del todo, mejora fuentes y agrega capas de datos, no reemplaza el research

### Integration Points
- El contexto de zona (D-01) y la narración persistida (D-05) son consumidos en tiempo de armado de recorrido — fuera del alcance de esta fase está DÓNDE en el producto (app Next.js / Yatoor chat) se invoca eso; esta fase entrega los datos y el mecanismo de guardado, no la UI de consumo

</code_context>

<specifics>
## Specific Ideas

- El usuario fue explícito: "la idea sería tener la mayor cantidad de data para que el modelo no gaste en tokens buscando en internet, pero obviamente tendrá que gastar un poco para conectar todo" — este es el principio rector de D-01/D-02, priorizar pre-carga sobre research en vivo.
- Auditoría (pasos 8-9) fue presentada por el usuario como "una idea, no ejecutada todavía" — validada en esta discusión como viable, con el scope acotado a relaciones de grafo (D-07).

</specifics>

<deferred>
## Deferred Ideas

- Contexto por tramo específico entre pares de POIs (en vez de por barrio) — descartado por costo en esta ronda (D-04), reconsiderar solo si el contexto por barrio resulta insuficiente para recorridos con tramos muy largos o atípicos.
- Datasets oficiales open-data por ciudad (equivalente a GCBA) como fuente de paso 1 — no priorizado (D-11), candidato para una futura iteración si las 3 fuentes elegidas no alcanzan.
- Personalización de la narración persistida por usuario/sesión — descartada a favor de reuso por secuencia de POIs (D-06); si en el futuro se quiere tono/idioma personalizado, es un cambio de esquema a revisar aparte.

### Reviewed Todos (not folded)
None — discussion stayed within phase scope.

</deferred>

---

*Phase: 5-Mejorar pipeline de recopilación de datos*
*Context gathered: 2026-09-17*
