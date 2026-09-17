# Yatoor

## What This Is

Yatoor is a city-tour content and data platform: for each city, a curated, sourced dataset of POIs (points of interest) written in a consistent narrative voice, plus a graph of historical/cultural entities (people, events, institutions) linked to those POIs. This content backs a tour-generation pipeline (Supabase + Gemini) that assembles walking tours on demand from a natural-language request. The immediate job (this milestone) is building out and auditing that per-city content so coverage and quality are provably real, not building new end-user app surface.

## Core Value

Every POI shipped for a city has a real, re-checkable source, is geofence-validated against real coordinates, and (where applicable) is linked into the entities graph — so tours generated from this data are trustworthy and differentiated from generic "qué ver en [ciudad]" listicles.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — this milestone is the first formal roadmap for the content pipeline)

### Active

- [ ] City POI datasets exist in the standard `<ciudad>.md` format for CABA, Madrid, Rio de Janeiro (already drafted) and are auditable against source
- [ ] Entities graph exists per city, linked to POIs, in the standard format
- [ ] New-city onboarding follows the documented 9-step pipeline (`nueva-ciudad.md` §10) end to end, at least once, for a 4th city
- [ ] POI and entity data ingest cleanly into Supabase (`ingest_pois.py` + schema) with RLS-safe public read
- [ ] Category weights (`poi_categorias`) move from heuristic defaults to an audited state (two-model + arbiter pipeline, per ESTADO_BD.md open item)
- [ ] `entidades` rows gain `descripcion`/`marco_narrativo` content where currently only a bare name exists (per ESTADO_BD.md open item)
- [ ] Tour-generation script (`pedir_tour.py`) runs against real, audited data for at least one non-CABA city

### Out of Scope

- Real street-routing (Mapbox/OSRM) to replace Haversine walking-time estimate — explicitly deferred per ESTADO_BD.md; straight-line approximation is accepted for beta
- Full neighborhood/barrio coverage per city — beta bar is 15-20 well-chosen POIs across the 2-3 highest-density zones (per `nueva-ciudad.md` §6), not exhaustive coverage
- New end-user app UI/UX — this milestone is data/content pipeline only, not the consumer-facing product surface
- Automating the steps flagged "pendiente de automatizar" in `nueva-ciudad.md` §9 — explicitly non-blocking for beta per source doc
- GitHub-tracked schema migrations as a hard gate — nice-to-have (currently schema lives only in Supabase, 13 applied migrations not exported), not required to ship city content

## Context

- Three cities already have draft content: `building_bd/caba.md` (362 lines, most complete — 12 barrios covered, 4 pending), `building_bd/madrid.md` (182 lines), `building_bd/rio-de-janeiro.md` (196 lines). Parallel entity-graph files exist per city (`entidades-caba.md`, `entidades-madrid.md`, `entidades-rio-de-janeiro.md`).
- Per-POI format is fixed across all city files: id (slug), barrio, lat/lng (validated vs. Google Places), place_id, categoría (historia | arquitectura | gastronomía | arte | anécdota | política), "qué contar" (2-4 lines, present tense, second person), "dato de gancho," fuente, última verificación.
- Yatoor's live lookup order: consult the city's `.md` file first; only on no match (name or geofence proximity) fall back to external search, appending the new result to that file's "Pendientes de scrapear" section to avoid re-paying the lookup.
- Supabase backend (`yatoor-demo-caba`, org Yatoor, São Paulo region, Free plan) already holds real data: 529 `pois`, 467 `entidades`, plus `categorias`, `poi_categorias`, `poi_entidad`, and a GCBA "Monumentos" staging/filtered pair (2233 / 553 rows). Public read (anon key) enabled on the 5 core tables.
- Tour pipeline exists and runs today: `pedir_tour.py` (natural-language request → Gemini extracts barrios/categoría/minutos → `get_tour_candidates` prefilter → Gemini orders the tour → validated against `duracion_tour_min`). Requires `GEMINI_API_KEY`. `probar_tour_gemini.py` is an earlier hardcoded-cluster version, superseded.
- The full new-city runbook (`nueva-ciudad.md`, 417 lines) documents a 9-step pipeline (§10, "v2"): the process this project should follow for city #4 onward. Captured as process/context here since no ADR/SPEC governs it — see below.
- **Open dependency, not yet verified**: `nueva-ciudad.md` and `madrid.md`/`rio-de-janeiro.md` cross-reference `CLAUDE_2.md` (voice/tone guide) and `CRITICAL_COPYRIGHT_COMPLIANCE`, neither of which was part of this ingest batch. If they exist elsewhere in the repo they likely contain a locked copyright/voice constraint — flagged for follow-up, not treated as binding here.
- Developer-facing success metric for this milestone: coverage and quality of POIs per city — i.e., POIs with a real source, linked entities, and a passed audit, counted per city.

### The 9-step city pipeline (`nueva-ciudad.md` §10, documented process — not a locked spec)

1. Choose POIs by cross-referencing free-tour operator stops (3+ operators) and 9 non-optional density categories (hitos clásicos, museos/centros culturales, parques/naturaleza urbana, sucesos históricos puntuales, misterios/curiosidades, costumbres/quién vive ahí, eventos de un solo día, playas si aplica, edificios con historia particular).
2. Investigate each POI against a real, re-checkable source (Wikipedia, official tourism sites, recognized media); flag contradictory legend/mystery versions.
3. Validate coordinates against Google Places, no exceptions.
4. Write the entry in the fixed `<ciudad>.md` format.
5. Adapt registro de voz per city (tone travels, content doesn't).
6. Confirm the beta coverage bar (15-20 POIs, 2-3 highest-density zones) before calling a city "deployable."
7. Ingest to Supabase via `ingest_pois.py` (+ corresponding `cities` row).
8. Run the post-deploy loop (ongoing coverage/quality maintenance).
9. Leave non-blocking automation items as backlog (§9 of source doc).

## Constraints

- **Data sourcing**: Every POI/entity claim must trace to a real, re-checkable reference — no content invented from memory. (from `nueva-ciudad.md` §2)
- **Coordinate accuracy**: Every POI's lat/lng must be validated against Google Places before it's considered loaded. (from `nueva-ciudad.md` §3, `caba.md` format)
- **Format consistency**: All city files and entity files must follow the exact structures already established in `caba.md` / `entidades-caba.md` — deviation breaks the "consult local file first" lookup flow.
- **Beta scope, not full coverage**: A city only needs 15-20 well-chosen POIs across 2-3 zones to be "deployable" — treat full-barrio coverage as ongoing, not a v1 gate. (from `nueva-ciudad.md` §6)
- **Backend**: Supabase project `yatoor-demo-caba` (São Paulo, Free plan) is the current data store; RLS public-read is already configured on core tables — new work should extend this schema, not replace it, unless a migration is explicitly decided.
- **Unresolved dependency**: possible copyright-compliance and voice-guide constraints referenced by `CRITICAL_COPYRIGHT_COMPLIANCE` / `CLAUDE_2.md` are outside this ingest batch — treat as open follow-up, do not assume they're satisfied or absent.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat `nueva-ciudad.md` §10 nine-step pipeline as the working process for new cities | It's the only documented, agent-followable runbook in the batch; no ADR/SPEC exists to override it | — Pending |
| Straight-line Haversine walking-time stands in for real routing | Explicit open item in ESTADO_BD.md; routing integration deferred, not blocking beta | — Pending |
| Beta coverage bar is 15-20 POIs / 2-3 zones per city, not full-barrio coverage | Matches `nueva-ciudad.md` §6 explicitly | — Pending |

---
*Last updated: 2026-09-17 after initial roadmap creation*
