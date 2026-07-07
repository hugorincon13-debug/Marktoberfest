import { NextResponse } from "next/server";
import { addRsvp, type Attending, type CarpoolRole, type NewRsvp } from "@/lib/db";

const ATTENDING: Attending[] = ["yes", "no", "maybe"];
const ROLES: CarpoolRole[] = ["driving", "need_ride", "either", "none"];

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const attending = String(body.attending ?? "") as Attending;

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!ATTENDING.includes(attending)) {
    return NextResponse.json({ error: "Please tell us if you can make it." }, { status: 400 });
  }

  const carpool_role = ROLES.includes(String(body.carpool_role) as CarpoolRole)
    ? (String(body.carpool_role) as CarpoolRole)
    : "none";

  const record: NewRsvp = {
    name,
    email,
    attending,
    party_size: Math.max(1, Math.min(20, Number(body.party_size) || 1)),
    departure_city: String(body.departure_city ?? "").trim().slice(0, 120),
    carpool_role: attending === "no" ? "none" : carpool_role,
    seats_available:
      carpool_role === "driving" ? Math.max(0, Math.min(20, Number(body.seats_available) || 0)) : 0,
    arrival_time: String(body.arrival_time ?? "").trim().slice(0, 120),
    dietary: String(body.dietary ?? "").trim().slice(0, 300),
    bringing: String(body.bringing ?? "").trim().slice(0, 300),
    notes: String(body.notes ?? "").trim().slice(0, 1000),
  };

  try {
    const saved = await addRsvp(record);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Failed to save RSVP:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your RSVP. Please try again." },
      { status: 500 }
    );
  }
}
