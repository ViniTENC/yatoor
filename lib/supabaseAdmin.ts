import { createClient } from "@supabase/supabase-js";

// Usa la service_role key: bypassea RLS, así que esto SOLO se importa desde
// API routes / server actions, nunca desde un componente de cliente.
// Conseguí la key en Supabase dashboard -> Settings -> API -> service_role secret.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
