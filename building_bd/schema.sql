-- ============================================================
-- Yatoor · Schema de POIs con cache semántico (pgvector)
-- Corre esto en el SQL editor de Supabase antes de ingestar.
-- ============================================================

create extension if not exists vector;

create table if not exists cities (
  slug text primary key,           -- 'buenos-aires', 'rio-de-janeiro', 'madrid'
  display_name text not null,
  country text not null,
  voice_register text not null,    -- 'voseo rioplatense', 'tú/você', etc.
  geofence_radius_m int not null default 50,
  created_at timestamptz not null default now()
);

create table if not exists pois (
  id text primary key,                       -- slug único, ej. 'obelisco'
  city_slug text not null references cities(slug),
  barrio text,
  lat double precision not null,
  lng double precision not null,
  place_id text,                             -- Google Places place_id (nullable: no todos lo van a tener)
  categoria text[] not null default '{}',    -- ['historia','arquitectura']
  que_contar text not null,                  -- el texto en voz Yatoor, lo que narra el audio
  dato_gancho text,                          -- frase corta para la notificación
  fuente text,                               -- URL de donde salió el dato
  fuente_verificada boolean not null default false,
  ultima_verificacion date,
  origen text not null default 'seed',       -- 'seed' (cargado a mano) | 'live_search' (lo generó el modelo en runtime)
  embedding vector(1536),                    -- text-embedding-3-small; ajustar dimensión si cambia el modelo
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Búsqueda por proximidad geográfica (para el match dentro del radio de geofencing)
create index if not exists pois_lat_lng_idx on pois (lat, lng);

-- Búsqueda semántica (para el fallback: "¿ya tengo algo parecido a esto?")
create index if not exists pois_embedding_idx on pois
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create index if not exists pois_city_idx on pois (city_slug);

-- ============================================================
-- Función de matching: dado un lat/lng, devuelve los POIs
-- dentro del radio de geofencing de esa ciudad, ordenados por distancia.
-- Aproximación planar simple (suficiente a escala de una cuadra;
-- si se necesita precisión mayor, migrar a PostGIS + geography).
-- ============================================================
create or replace function match_poi_by_location(
  p_city_slug text,
  p_lat double precision,
  p_lng double precision
)
returns setof pois
language sql
stable
as $$
  select p.*
  from pois p
  join cities c on c.slug = p.city_slug
  where p.city_slug = p_city_slug
    and (
      -- distancia aproximada en metros (fórmula equirectangular, válida a escala local)
      6371000 * sqrt(
        power(radians(p.lat - p_lat), 2) +
        power(radians(p.lng - p_lng) * cos(radians(p_lat)), 2)
      )
    ) <= c.geofence_radius_m
  order by
    power(p.lat - p_lat, 2) + power(p.lng - p_lng, 2)
  limit 5;
$$;

-- ============================================================
-- Función de matching semántico: para el caso "no hay nada exactamente
-- en este lat/lng, pero ¿ya investigamos algo muy similar antes?"
-- (ej. dos entradas distintas al mismo edificio, texto pegado por error, etc.)
-- Similarity threshold sugerido: 0.85 (ajustar con datos reales).
-- ============================================================
create or replace function match_poi_by_similarity(
  p_city_slug text,
  p_query_embedding vector(1536),
  p_threshold float default 0.85,
  p_limit int default 3
)
returns table (id text, que_contar text, similarity float)
language sql
stable
as $$
  select
    p.id,
    p.que_contar,
    1 - (p.embedding <=> p_query_embedding) as similarity
  from pois p
  where p.city_slug = p_city_slug
    and p.embedding is not null
    and 1 - (p.embedding <=> p_query_embedding) > p_threshold
  order by p.embedding <=> p_query_embedding
  limit p_limit;
$$;
