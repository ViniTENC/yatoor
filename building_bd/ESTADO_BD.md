# Estado BD Yatoor — al 16/09/2026

## Supabase
- Proyecto: `yatoor-demo-caba` (org Yatoor, plan Free, región São Paulo)
- Project ref: `zhiigqsslttzkfrfhocc`
- URL: https://zhiigqsslttzkfrfhocc.supabase.co

### Tablas
- `pois` (529 filas): nombre, lat, lng, barrio, comuna, descripcion, duracion_min, fuente_dato_duro, fuente_id_gcba
- `entidades` (467 filas): personas/eventos historicos, nombre + descripcion (muchas sin descripcion todavia, solo el nombre extraido del dataset)
- `categorias`: historia, cultura, futbol, comida, musica, arte, arquitectura
- `poi_categorias`: peso 0-10 por poi+categoria (HEURISTICO, no auditado — ver "Pendiente")
- `poi_entidad`: vinculo poi <-> entidad
- `staging_monumentos_gcba` (2233 filas): dump crudo del dataset GCBA "Monumentos" (CSV)
- `monumentos_relevantes` (553 filas): filtro de staging, solo bustos/estatuas/monumentos con nombre propio (sin placas ni mastiles genericos)

### Funciones
- `get_tour_candidates(barrios_in text[], categoria_in text, minutos_max int)` — prefiltra POIs por zona+tema, ordenado por peso
- `duracion_tour_min(poi_ids uuid[])` — suma tiempo en paradas + caminata estimada (Haversine, 75 m/min) entre un orden de paradas dado
- `distancia_metros`, `minutos_caminata` — helpers geograficos

### RLS
Lectura publica activada en las 5 tablas (pois, entidades, categorias, poi_categorias, poi_entidad). Se puede consultar con la key `anon` sin ser admin.

## Scripts (este directorio)
- `pedir_tour.py` — pipeline completo: pedido en lenguaje natural -> Gemini extrae barrios/categoria/minutos -> prefiltra con `get_tour_candidates` -> Gemini arma el tour ordenado con foco en que conecta cada parada con la siguiente -> valida contra `duracion_tour_min`
  - Requiere `GEMINI_API_KEY` como variable de entorno
  - Uso: `python3 pedir_tour.py "quiero un tour de cultura por San Telmo de 3 horas que termine en Puerto Madero"`
- `probar_tour_gemini.py` — version anterior, mas simple, con un cluster de 5 POIs hardcodeado (dejar de usar, `pedir_tour.py` la reemplaza)

## Pendiente / lo que sigue
1. **Pesos de categoria son heuristicos** (7 en historia por default, 6 en arte si es "grupo escultorico"). No reflejan importancia real todavia — falta el pipeline de audit (dos modelos + arbitro) para afinarlos.
2. **`entidades` mayormente sin `descripcion`** — se cargaron los nombres extraidos de `DENOMINACION_SIMBOLIZA` del CSV, pero el dato duro real (quien fue, que hizo) todavia no esta escrito para la mayoria. Sin esto el LLM no tiene de donde sacar `marco_narrativo`.
3. **Sin ruteo real** (Mapbox/OSRM) — la distancia entre paradas es aproximacion en linea recta (Haversine), no ruta caminando por calle.
4. **El GeoJSON de edificios APH (areas de proteccion historica) no se uso** — se descarto a favor del dataset de Monumentos porque venia con la entidad ya incorporada.
5. **Nada de esto esta pusheado a GitHub todavia** — el schema vive solo en Supabase (13 migraciones aplicadas, no exportadas a `.sql`), y estos dos scripts estaban sueltos en el chat.
