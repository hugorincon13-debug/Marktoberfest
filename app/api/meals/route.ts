import { NextResponse } from "next/server";
import { addMealSignup, getMealSignups, type NewMealSignup } from "@/lib/db";
import { meals } from "@/lib/config";

const mealIds = new Set(meals.map((m) => m.id));

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const signups = await getMealSignups();
    return NextResponse.json({ ok: true, count: signups.length, signups });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const meal_id = String(body.meal_id ?? "");

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!mealIds.has(meal_id)) {
    return NextResponse.json({ error: "Please pick a meal." }, { status: 400 });
  }

  const record: NewMealSignup = {
    meal_id,
    name: name.slice(0, 120),
    notes: String(body.notes ?? "").trim().slice(0, 300),
  };

  try {
    const saved = await addMealSignup(record);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Failed to save meal signup:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your sign-up. Please try again." },
      { status: 500 }
    );
  }
}
