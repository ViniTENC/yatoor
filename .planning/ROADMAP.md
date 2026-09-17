# Roadmap: Yatoor

## Overview

Yatoor already has draft POI content for three cities (CABA, Madrid, Rio de Janeiro), a parallel entities graph per city, and a working Supabase-backed tour-generation pipeline. None of this has been formally audited against the "real source + validated coordinate + linked entity" bar the product depends on. This milestone closes that gap in four phases: first audit and fix the three existing city datasets, then verify and complete the entities graph that hangs off them, then bring the category-weighting and tour-generation pipeline up to an audited state, and finally prove the whole documented 9-step process by onboarding a genuinely new, fourth city end-to-end. Each phase produces evidence (not just a checklist) that coverage and quality per city — the developer-facing success metric — actually improved.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Audit Existing City Datasets** - Every POI in caba.md, madrid.md, rio-de-janeiro.md has a real source and a validated coordinate
- [ ] **Phase 2: Verify & Complete Entities Graph** - Every entity links to a real POI and has enough narrative content to be usable
- [ ] **Phase 3: Audit Category Weights & Validate Tour Generation** - Category weights are audited, not heuristic, and pedir_tour.py produces valid tours on that audited data
- [ ] **Phase 4: Onboard a Fourth City End-to-End** - The documented 9-step pipeline is proven on a new city, from POI selection to Supabase ingestion

## Phase Details

### Phase 1: Audit Existing City Datasets
**Goal**: Every POI already drafted for CABA, Madrid, and Rio de Janeiro is backed by a real, re-checkable source and a Google-Places-validated coordinate, and each city has at least one costumbre/feria and one misterio/curiosidad entry.
**Depends on**: Nothing (first phase)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03, AUDIT-04
**Success Criteria** (what must be TRUE):
  1. For each POI in caba.md, madrid.md, and rio-de-janeiro.md, the `fuente` field points to a real, checkable reference (Wikipedia, official tourism site, or recognized media) — no "from memory" entries remain
  2. For each POI in the three files, lat/lng has been checked against Google Places and any mismatch is corrected
  3. Each of the three cities has at least one entry tagged as a weekly custom/market (costumbre/feria) and one tagged as a mystery/curiosity (misterio/curiosidad)
  4. A short audit note per city records what was checked, what was fixed, and what (if anything) couldn't be verified
**Plans**: TBD

### Phase 2: Verify & Complete Entities Graph
**Goal**: The entities graph (personas/eventos/instituciones) for CABA, Madrid, and Rio is fully linked to real POIs and has enough descriptive content to support tour narration, so the app can surface cross-referenced facts without fresh geolocated copy.
**Depends on**: Phase 1
**Requirements**: ENTITY-01, ENTITY-02, ENTITY-03, ENTITY-04
**Success Criteria** (what must be TRUE):
  1. Every entity in entidades-caba.md, entidades-madrid.md, and entidades-rio-de-janeiro.md links to at least one POI that exists in the corresponding audited city file
  2. No orphan entities remain (an entity with no POI link is either linked or removed/flagged)
  3. Supabase `entidades` rows that previously had only a name now carry a `descripcion`/`marco_narrativo` sufficient to generate narration for at least the CABA subset
**Plans**: TBD

### Phase 3: Audit Category Weights & Validate Tour Generation
**Goal**: Category weighting for POIs reflects an actual audit rather than heuristic defaults, and the tour-generation pipeline is proven to produce valid tours against that audited data for more than one city.
**Depends on**: Phase 2
**Requirements**: CATWEIGHT-01, CATWEIGHT-02, TOUR-01, TOUR-02
**Success Criteria** (what must be TRUE):
  1. `poi_categorias` weights for CABA have gone through a documented two-model + arbiter audit pass and are no longer the original heuristic defaults
  2. The audit method is written down clearly enough to repeat for Madrid, Rio, and future cities without re-deriving it
  3. Running `pedir_tour.py` for a CABA request produces a coherent, duration-validated tour using the audited data
  4. Running `pedir_tour.py` for a request in at least one other audited city (Madrid or Rio) also produces a valid tour
**Plans**: TBD

### Phase 4: Onboard a Fourth City End-to-End
**Goal**: The documented 9-step new-city pipeline (`nueva-ciudad.md` §10) is proven end-to-end on a genuinely new city — from POI selection through Supabase ingestion — establishing a repeatable process rather than three one-off datasets.
**Depends on**: Phase 3
**Requirements**: CITY4-01, CITY4-02, CITY4-03, CITY4-04, CITY4-05
**Success Criteria** (what must be TRUE):
  1. A fourth city has a `<ciudad>.md` file with 15-20 well-chosen POIs across its 2-3 highest free-tour-density zones, each sourced and coordinate-validated
  2. The fourth city has at least one costumbre/feria and one misterio/curiosidad entry, matching the Phase 1 bar
  3. The fourth city has its own `entidades-<ciudad>.md` file, linked to its POIs, matching the Phase 2 bar
  4. The fourth city's registro de voz is explicitly documented and distinct from the other three cities' tone notes
  5. The fourth city has a row in Supabase `cities` and its POIs are ingested via `ingest_pois.py`, queryable with the anon key like the other cities
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Audit Existing City Datasets | 0/TBD | Not started | - |
| 2. Verify & Complete Entities Graph | 0/TBD | Not started | - |
| 3. Audit Category Weights & Validate Tour Generation | 0/TBD | Not started | - |
| 4. Onboard a Fourth City End-to-End | 0/TBD | Not started | - |

### Phase 5: Mejorar pipeline de recopilación de datos (research + historia de relleno entre POIs + guardado de descripción del recorrido)

**Goal:** [To be planned]
**Requirements**: TBD
**Depends on:** Phase 4
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd-plan-phase 5 to break down)

---
*Roadmap created: 2026-09-17*
*Last updated: 2026-09-17*
