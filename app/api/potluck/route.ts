import { NextResponse } from "next/server";
import { addPotluckItem, type NewPotluckItem } from "@/lib/db";
import { meals, potluckCategories } from "@/lib/config";

const mealIds = new Set(meals.map((m) => m.id));
const categories = new Set<string>(potluckCategories as readonly string[]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const dish = String(body.dish ?? "").trim();
  const meal_id = String(body.meal_id ?? "");

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!dish) {
    return NextResponse.json({ error: "Please say what you're bringing." }, { status: 400 });
  }
  if (!mealIds.has(meal_id)) {
    return NextResponse.json({ error: "Please pick a meal." }, { status: 400 });
  }

  const category = categories.has(String(body.category)) ? String(body.category) : "Other";

  const record: NewPotluckItem = {
    meal_id,
    name: name.slice(0, 120),
    dish: dish.slice(0, 200),
    category,
    serves: Math.max(0, Math.min(100, Number(body.serves) || 0)),
    notes: String(body.notes ?? "").trim().slice(0, 300),
  };

  try {
    const saved = await addPotluckItem(record);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Failed to save potluck item:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your dish. Please try again." },
      { status: 500 }
    );
  }
}
