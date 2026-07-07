import { NextResponse } from "next/server";
import { getRsvps } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const configured = process.env.ADMIN_PASSWORD || "changeme";
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || body.password !== configured) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  try {
    const rsvps = await getRsvps();
    return NextResponse.json({ ok: true, rsvps });
  } catch {
    return NextResponse.json(
      { error: "Couldn't load RSVPs — is the database connected?" },
      { status: 500 }
    );
  }
}
