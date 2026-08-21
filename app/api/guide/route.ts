import { NextRequest, NextResponse } from "next/server";
import { askTourGuide } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Falta el prompt" }, { status: 400 });
  }
  const result = await askTourGuide(prompt);
  return NextResponse.json(result);
}
