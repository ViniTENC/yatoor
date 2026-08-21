# YaToor

Skeleton del stack: Next.js + TypeScript + Tailwind + Supabase + Anthropic API.

## Setup

1. `npm install`
2. Copiar `.env.example` a `.env.local` y completar las keys (Supabase + Anthropic).
3. `npm run dev`

## Estructura

- `app/` — páginas y rutas (App Router).
- `app/api/guide/route.ts` — endpoint de ejemplo que llama a la IA.
- `lib/supabase.ts` — cliente de Supabase (DB, auth, storage).
- `lib/ai.ts` — cliente de Anthropic, uso server-side únicamente.

## Próximos pasos sugeridos

- Definir modelo de datos en Supabase (usuarios, tours, itinerarios).
- Auth con Supabase (email/Google).
- Prompt del "guía IA" con contexto de la ciudad/lugar.
- Deploy en Vercel + variables de entorno de producción.
