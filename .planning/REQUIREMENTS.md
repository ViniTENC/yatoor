# Requirements: Yatoor

**Defined:** 2026-09-17
**Core Value:** Every POI shipped for a city has a real, re-checkable source, is geofence-validated, and (where applicable) linked into the entities graph — so generated tours are trustworthy.

## v1 Requirements

Requirements for this milestone (content/data pipeline, not new app UI). Each maps to roadmap phases.

### AUDIT — Existing city data quality

- [ ] **AUDIT-01**: Every CABA POI in `caba.md` has a real, re-checkable `fuente` and a coordinate validated against Google Places
- [ ] **AUDIT-02**: Every Madrid POI in `madrid.md` has a real, re-checkable `fuente` and a validated coordinate
- [ ] **AUDIT-03**: Every Rio de Janeiro POI in `rio-de-janeiro.md` has a real, re-checkable `fuente` and a validated coordinate
- [ ] **AUDIT-04**: Each of the three cities has at least one "costumbre/feria semanal" entry and one "misterio/curiosidad" entry (per `nueva-ciudad.md` §1 differentiation rule)

### ENTITY — Entities graph completeness

- [ ] **ENTITY-01**: `entidades-caba.md` entries are linked to at least one POI in `caba.md` (graph integrity, no orphan entities)
- [ ] **ENTITY-02**: `entidades-madrid.md` entries are linked to at least one POI in `madrid.md`
- [ ] **ENTITY-03**: `entidades-rio-de-janeiro.md` entries are linked to at least one POI in `rio-de-janeiro.md`
- [ ] **ENTITY-04**: Supabase `entidades` rows that currently have only a bare name gain a `descripcion`/`marco_narrativo` sufficient for tour narration (per ESTADO_BD.md open item #2)

### CITY4 — Onboard a fourth city end-to-end

- [ ] **CITY4-01**: A fourth city is selected and a `<ciudad>.md` file is produced following steps 1-4 of the `nueva-ciudad.md` §10 pipeline (choose POIs, investigate, validate coordinates, format)
- [ ] **CITY4-02**: The fourth city's `.md` file meets the beta bar: 15-20 POIs across the 2-3 highest free-tour-density zones (per §6)
- [ ] **CITY4-03**: An `entidades-<ciudad>.md` file is produced for the fourth city, linked to its POIs
- [ ] **CITY4-04**: The fourth city's registro de voz is explicitly adapted (tone documented, distinct from the other three cities) per §5
- [ ] **CITY4-05**: The fourth city gets a `cities` row and its POIs are ingested into Supabase via `ingest_pois.py` (§7)

### CATWEIGHT — Category weight audit

- [ ] **CATWEIGHT-01**: `poi_categorias` weights move from heuristic defaults to a documented audit pass (two-model + arbiter, per ESTADO_BD.md open item #1) for at least CABA
- [ ] **CATWEIGHT-02**: The audit method used is written down so it can be repeated for Madrid, Rio, and the fourth city

### TOUR — Tour generation validated on real, audited data

- [ ] **TOUR-01**: `pedir_tour.py` produces a valid tour end-to-end for CABA using audited data (post AUDIT phase)
- [ ] **TOUR-02**: `pedir_tour.py` produces a valid tour end-to-end for at least one non-CABA city

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Routing

- **ROUTE-01**: Replace Haversine straight-line walking-time estimate with real street routing (Mapbox/OSRM)

### Coverage

- **COVERAGE-01**: Full barrio coverage for CABA (Villa Crespo, Colegiales, Núñez, Caballito currently pending)
- **COVERAGE-02**: Onboard a 5th+ city

### Automation

- **AUTO-01**: Automate the steps flagged "pendiente de automatizar" in `nueva-ciudad.md` §9

### Compliance

- **COMPLIANCE-01**: Formally verify and, if needed, satisfy `CRITICAL_COPYRIGHT_COMPLIANCE` and `CLAUDE_2.md` constraints once those files are located/ingested

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real street routing (Mapbox/OSRM) | Explicitly deferred in ESTADO_BD.md; Haversine approximation accepted for beta |
| Full neighborhood/barrio coverage per city | Beta bar is 15-20 POIs across top zones, not exhaustive coverage (`nueva-ciudad.md` §6) |
| New end-user app UI/UX | This milestone is data/content pipeline only |
| GitHub-exported SQL migrations as a hard gate | Nice-to-have; not required to ship city content this milestone |
| Automating "pendiente de automatizar" items (§9) | Explicitly non-blocking for beta per source doc |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUDIT-01 | Phase 1 | Pending |
| AUDIT-02 | Phase 1 | Pending |
| AUDIT-03 | Phase 1 | Pending |
| AUDIT-04 | Phase 1 | Pending |
| ENTITY-01 | Phase 2 | Pending |
| ENTITY-02 | Phase 2 | Pending |
| ENTITY-03 | Phase 2 | Pending |
| ENTITY-04 | Phase 2 | Pending |
| CATWEIGHT-01 | Phase 3 | Pending |
| CATWEIGHT-02 | Phase 3 | Pending |
| TOUR-01 | Phase 3 | Pending |
| CITY4-01 | Phase 4 | Pending |
| CITY4-02 | Phase 4 | Pending |
| CITY4-03 | Phase 4 | Pending |
| CITY4-04 | Phase 4 | Pending |
| CITY4-05 | Phase 4 | Pending |
| TOUR-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0

---
*Requirements defined: 2026-09-17*
*Last updated: 2026-09-17 after initial roadmap creation*
