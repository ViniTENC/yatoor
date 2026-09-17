# Phase 5: Mejorar pipeline de recopilación de datos - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-17
**Phase:** 5-Mejorar pipeline de recopilación de datos
**Areas discussed:** Fuente de la historia de relleno, Rigor de esa historia de relleno, Guardado de la descripción del recorrido, Cuello de botella del pipeline de 9 pasos

---

## Fuente de la "historia de relleno"

| Option | Description | Selected |
|--------|-------------|----------|
| Campo pre-cargado por barrio/zona | Nueva entrada al pipeline: contexto de zona escrito/investigado una vez por ciudad, guardado en BD, consultado al armar el tour | ✓ (con matiz) |
| El modelo investiga en el momento | Research libre/conocimiento general sobre la marcha, sin campo nuevo | |
| Híbrido: capa base + libertad narrativa | Contexto mínimo (2-3 datos duros por barrio) + libertad de narrar sin fuente por frase | |

**User's choice:** "La idea sería tener la mayor cantidad de data para que el modelo no gaste en tokens buscando en internet, pero obviamente tendrá q gastar un poco para conectar todo."
**Notes:** Prioriza pre-carga máxima sobre research en vivo; el gasto de tokens aceptable es solo para conectar/narrar, no para buscar hechos.

**Follow-up — Granularidad:**

| Option | Description | Selected |
|--------|-------------|----------|
| Por barrio/zona | Una entrada por barrio, usada para cualquier tramo que lo cruce | ✓ |
| Por tramo específico entre POIs | Una entrada por cada par consecutivo de POIs en un recorrido dado | |
| Ambas capas | Barrio como base + notas de tramo solo para conexiones más usadas | |

**User's choice:** Por barrio/zona.

---

## Rigor de esa historia de relleno

| Option | Description | Selected |
|--------|-------------|----------|
| Mismo estándar que un POI | Cada dato con fuente real citada, auditable igual que un POI | |
| Estándar más relajado | Conocimiento general/enciclopédico sin fuente puntual citada — es "color", no dato duro | ✓ |

**User's choice:** Estándar más relajado.

---

## Guardado de la descripción del recorrido

| Option | Description | Selected |
|--------|-------------|----------|
| Se guarda el texto exacto narrado | Persiste POIs+orden+texto narrado completo; se reusa si se repite el recorrido | ✓ |
| Solo se guarda la selección (POIs+orden) | Sin persistir texto; se regenera la narración cada vez | |
| Híbrido: cachea pero permite regenerar | Cache por defecto + opción explícita de regenerar | |

**User's choice:** Se guarda el texto exacto narrado.

**Follow-up — Alcance del cache:**

| Option | Description | Selected |
|--------|-------------|----------|
| Por secuencia de POIs | Reusable entre cualquier usuario que pida el mismo recorrido exacto | ✓ |
| Por usuario/sesión | Personalizado, no se reusa entre usuarios distintos | |

**User's choice:** Por secuencia de POIs.

---

## Cuello de botella del pipeline de 9 pasos

| Option | Description | Selected |
|--------|-------------|----------|
| Paso 1 — scraping semi-manual | Poca variedad/densidad inicial de tours existentes | ✓ (parcial) |
| Paso 2 — verificar cada punto a mano | Volumen alto, consumo de tiempo humano | ✓ (parcial, con matiz) |
| Pasos 8-9 — auditoría/arbitraje con 1 solo modelo | Hoy no separados de verdad | ✓ (idea a validar) |
| Ninguno en particular — poca densidad general | Falta de volumen, no un paso lento puntual | |

**User's choice:** "Un poco de todo — no se junta tanta información en un principio con el scrapping, es clave tener variedad y densidad. La verificación da más errores cuando empieza a armar relaciones entre estos POIs que no son, ahí hay que verificar. La auditoría no la ejecuté todavía, es más una idea — ¿te parece que funciona?"

**Claude's assessment (asked directly by user):** El patrón de error reportado (relaciones falsas del grafo, no POIs sueltos) es justo lo que un auditor ciego ataca bien — el sesgo de confirmación ocurre porque la misma sesión que arma la relación también la revisa. Recomendación: auditoría enfocada en aristas `poi_entidad`, no en contenido de POI completo (evita 2-3x costo sin atacar el problema real reportado).

**Follow-up — Alcance de la auditoría:**

| Option | Description | Selected |
|--------|-------------|----------|
| Foco en relaciones del grafo | Auditor revisa solo si cada vínculo poi_entidad es real | ✓ |
| Auditoría amplia (POIs + relaciones) | Revisa todo el contenido y las relaciones | |

**User's choice:** Foco en relaciones del grafo.

**Follow-up — Blinding del auditor:**

| Option | Description | Selected |
|--------|-------------|----------|
| Sesión nueva de Claude Code, sin historial | Subagente/sesión fresca recibe solo POI+entidad+relación final | ✓ |
| Otro modelo/API distinto | Aislamiento vía proveedor externo distinto | |

**User's choice:** Sesión nueva de Claude Code, sin historial.

**Follow-up — Fuentes nuevas para paso 1:**

| Option | Description | Selected |
|--------|-------------|----------|
| Wikipedia/Wikivoyage por barrio | Listas de lugares con más densidad que sitios de tours | ✓ (prioridad 1) |
| Datasets oficiales tipo GCBA | Open-data equivalente por ciudad | |
| Reddit/foros locales | "Lo que un turista no encuentra en guías" | ✓ (prioridad 2) |
| Google Maps reviews/lugares populares | Señal de densidad de reseñas por zona | ✓ (prioridad 3) |

**User's choice:** 1, 3, 4 en ese orden (Wikipedia/Wikivoyage → Reddit/foros → Google Maps reviews). Datasets oficiales (opción 2) no seleccionado.

---

## Claude's Discretion

Ninguna — todas las decisiones fueron resueltas explícitamente por el usuario.

## Deferred Ideas

- Contexto por tramo específico entre pares de POIs — descartado por costo, reconsiderar si el enfoque por barrio no alcanza.
- Datasets oficiales open-data por ciudad (tipo GCBA) — no priorizado, candidato futuro.
- Personalización de narración por usuario/sesión — descartada a favor de reuso por secuencia de POIs.
