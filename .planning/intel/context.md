# Context (DOC intel)

All 8 documents in this ingest batch classified as type `DOC`. Notes below are keyed by topic, each with source attribution.

---

## Topic: Yatoor product concept & city-content model

source: /Users/vicentetenconi/Documents/yatoor/building_bd/caba.md
source: /Users/vicentetenconi/Documents/yatoor/building_bd/madrid.md
source: /Users/vicentetenconi/Documents/yatoor/building_bd/rio-de-janeiro.md

Each city has a `<ciudad>.md` file acting as the primary source for the Yatoor model: before calling Google Places or doing a live search, Yatoor consults this file first. Only on no match (by name or geofence proximity) does it fall back to external search, and the new result gets appended to a "Pendientes de scrapear" section to avoid re-paying that lookup.

Common per-city header fields: Ciudad, Registro de voz (tone — e.g. Buenos Aires uses voseo rioplatense, informalidad leve; ties to `CLAUDE_2.md` Voz section, external to this batch), Radio de geofencing (Buenos Aires: 50 m), Última actualización, Cobertura de barrios (with an explicit "Pendientes" list of barrios not yet covered), Categorías cubiertas, Formato de coordenadas (WGS84 lat/lng).

Per-POI format (`caba.md` "Formato por punto"): id (slug), barrio, lat/lng (validated against Google Places), place_id (Google Places, for pgvector/Supabase), categoría (historia | arquitectura | gastronomía | arte | anécdota | política), "qué contar" (2-4 lines, Yatoor voice: present tense, second person, one hook fact), "dato de gancho" (short curiosity-triggering phrase for notifications), fuente, última verificación.

## Topic: Buenos Aires (CABA) POI dataset

source: /Users/vicentetenconi/Documents/yatoor/building_bd/caba.md

362-line curated dataset of Buenos Aires POIs (Obelisco, Caminito, Plaza de Mayo, and more) following the format above. Barrios covered: Monserrat/Centro Histórico, San Telmo, Puerto Madero, Palermo, La Boca, Retiro, Recoleta, San Nicolás, Belgrano, Almagro, Chacarita, Mataderos. Pending barrios: Villa Crespo, Colegiales, Núñez, Caballito. Categories: historia, arquitectura, arte, anécdota, gastronomía, costumbre (feria semanal), naturaleza/parques, misterio. Cross-referenced by `entidades-caba.md`, `madrid.md`, `rio-de-janeiro.md`, and `nueva-ciudad.md`.

## Topic: Madrid POI dataset

source: /Users/vicentetenconi/Documents/yatoor/building_bd/madrid.md

182-line dataset covering Madrid POIs (Puerta del Sol, Plaza Mayor, Palacio Real, Mercado de San Miguel, and more), same per-point format as CABA/Rio. Cross-refs: caba.md, rio-de-janeiro.md, CLAUDE_2.md (voice guide, external).

## Topic: Río de Janeiro POI dataset

source: /Users/vicentetenconi/Documents/yatoor/building_bd/rio-de-janeiro.md

196-line dataset covering Rio POIs (Cristo Redentor, Pão de Açúcar, Escadaria Selarón, Arcos da Lapa, and more), same format. Cross-refs: caba.md, CLAUDE_2.md.

## Topic: Entities graph (personas/eventos/instituciones linked to POIs)

source: /Users/vicentetenconi/Documents/yatoor/building_bd/entidades-caba.md
source: /Users/vicentetenconi/Documents/yatoor/building_bd/entidades-madrid.md
source: /Users/vicentetenconi/Documents/yatoor/building_bd/entidades-rio-de-janeiro.md

A parallel per-city catalog of historical/cultural entities (people, events, institutions) connected to POIs, written in Yatoor voice, forming a relationship graph that lets the app surface cross-referenced content without writing new geolocated copy for every fact.

- `entidades-caba.md` (240 lines) — CABA entities graph, refs `caba.md`.
- `entidades-madrid.md` (283 lines) — Madrid entities graph, notable figures include Alfonso XIII, Felipe III, la Inquisición española; linked to Plaza Mayor, Gran Vía. Refs `madrid.md`, `CLAUDE_2.md`.
- `entidades-rio-de-janeiro.md` (164 lines) — Rio entities graph, linked to Cristo Redentor, Escadaria Selarón, Garota de Ipanema, Palácio do Catete, Floresta da Tijuca, Cais do Valongo. Refs `rio-de-janeiro.md` and `entidades-madrid.md`.

This is a distinct data layer from the plain POI datasets above — POI files hold geofenced narration; entity files hold the graph of who/what connects across POIs and cities.

## Topic: Supabase — estado de la base (ESTADO_BD.md, snapshot al 16/09/2026)

source: /Users/vicentetenconi/Documents/yatoor/building_bd/ESTADO_BD.md

Project: `yatoor-demo-caba` (org Yatoor, plan Free, región São Paulo). Project ref `zhiigqsslttzkfrfhocc`, URL `https://zhiigqsslttzkfrfhocc.supabase.co`.

Tables:
- `pois` (529 filas): nombre, lat, lng, barrio, comuna, descripcion, duracion_min, fuente_dato_duro, fuente_id_gcba
- `entidades` (467 filas): personas/eventos históricos; muchas sin descripción todavía (solo nombre extraído del dataset fuente)
- `categorias`: historia, cultura, futbol, comida, musica, arte, arquitectura
- `poi_categorias`: peso 0-10 por poi+categoria (heurístico, no auditado)
- `poi_entidad`: vínculo poi <-> entidad
- `staging_monumentos_gcba` (2233 filas): dump crudo del dataset GCBA "Monumentos" (CSV)
- `monumentos_relevantes` (553 filas): filtro de staging — solo bustos/estatuas/monumentos con nombre propio

Functions: `get_tour_candidates(barrios_in text[], categoria_in text, minutos_max int)`, `duracion_tour_min(poi_ids uuid[])` (Haversine 75 m/min walking estimate), `distancia_metros`, `minutos_caminata`.

RLS: public read enabled on the 5 core tables (pois, entidades, categorias, poi_categorias, poi_entidad); queryable with the `anon` key without admin.

Scripts (in `building_bd/`):
- `pedir_tour.py` — end-to-end pipeline: natural-language request → Gemini extracts barrios/categoria/minutos → prefilter via `get_tour_candidates` → Gemini builds ordered tour focusing on connecting each stop to the next → validated against `duracion_tour_min`. Requires `GEMINI_API_KEY` env var.
- `probar_tour_gemini.py` — earlier, simpler version with a hardcoded 5-POI cluster; superseded by `pedir_tour.py`.

Pendiente / open items (per ESTADO_BD.md, as of 16/09/2026):
1. Category weights (`poi_categorias`) are heuristic defaults, not yet validated by the planned two-model + arbiter audit pipeline.
2. Most `entidades` rows lack `descripcion` — only the name extracted from `DENOMINACION_SIMBOLIZA` in the source CSV; without it the LLM has no material for `marco_narrativo`.
3. No real routing (Mapbox/OSRM) yet — inter-stop distance is straight-line Haversine approximation, not street-walking route.
4. The APH (áreas de protección histórica) buildings GeoJSON was not used — dropped in favor of the Monumentos dataset because it already had entities attached.
5. Nothing pushed to GitHub yet — schema lives only in Supabase (13 migraciones aplicadas, not exported to `.sql`); the two scripts were loose files from chat.

## Topic: Runbook — cómo sumar una ciudad nueva (nueva-ciudad.md)

source: /Users/vicentetenconi/Documents/yatoor/building_bd/nueva-ciudad.md

417-line operational runbook, written to be followed by a person or an LLM agent interchangeably, describing the full pipeline to add a new city to Yatoor from zero to POIs running in production.

Key points captured:
- **What counts as "a city"**: a `<ciudad>.md` file with the same structure as `caba.md`/`rio-de-janeiro.md`/`madrid.md` — real POIs in Yatoor voice, coordinates validated against Google Places — plus a corresponding row in `cities` and rows in `pois` once `ingest_pois.py` runs. A beta doesn't need full coverage: 15-20 well-chosen POIs across the 2-3 zones with the most free-tour density suffice for a pilot; full coverage is an ongoing process (doc §6).
- **§1 — Choosing POIs**: cross-reference two sources rather than picking from memory: (A) what free-tour operators already stop at (web search `free tour [ciudad] recorrido gratis paradas [zona]`, keep candidates repeated across 3+ operators), and (B) density categories that make walking feel continuously narrated rather than only hitting the 10 famous landmarks — nine non-optional categories to actively search: hitos clásicos, museos/centros culturales (free-entry ones weighted higher), parques/naturaleza urbana, sucesos históricos puntuales (street/plaza-specific, not general national history), misterios/curiosidades, costumbres/quién vive ahí, cosas que pasan un solo día (ferias/mercados semanales — high value for "hoy es el único día que..." hooks), playas (if applicable), edificios con historia particular. Every new city should have at least one "costumbre/feria semanal" entry and one "misterio/curiosidad" entry — these differentiate Yatoor from generic "qué ver en [ciudad]" guides. Group candidates by zone/barrio to ensure geographic, not just thematic, coverage.
- **§2 — Investigating each POI**: every entry must be sourced from real references (Wikipedia, official city tourism sites, recognized media), prioritizing `.gob`/official tourism sites for re-checkability; contradictory legend/mystery versions get special handling (doc continues past line 80, not fully read in this pass — see source file for full §2 method and subsequent §3-§9 steps on formatting, validation, ingestion via `ingest_pois.py`, and QA).
- Cross-refs: `caba.md`, `rio-de-janeiro.md`, `madrid.md`, and a `CRITICAL_COPYRIGHT_COMPLIANCE` reference (external to this batch, not classified) — implies there is a copyright-compliance constraint governing how sourced content may be rephrased into Yatoor voice; this could not be verified against a SPEC/ADR in this batch and should be tracked as an open dependency if `CRITICAL_COPYRIGHT_COMPLIANCE` exists elsewhere in the repo.
