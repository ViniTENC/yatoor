import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { email, nombre } = await req.json();

  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("usuarios")
    .upsert({ email: email.toLowerCase().trim(), nombre: nombre?.trim() || null }, { onConflict: "email" })
    .select("id, email, nombre")
    .single();

  if (error) {
    return NextResponse.json({ error: "No se pudo registrar." }, { status: 500 });
  }

  return NextResponse.json({ usuario: data });
}
