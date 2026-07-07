import { NextResponse } from "next/server";
import { saveSettings, type Settings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const configured = process.env.ADMIN_PASSWORD || "changeme";
  let body: { password?: string; hideCarpool?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || body.password !== configured) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const next: Settings = { hideCarpool: !!body.hideCarpool };

  try {
    const saved = await saveSettings(next);
    return NextResponse.json({ ok: true, settings: saved });
  } catch {
    return NextResponse.json(
      { error: "Couldn't save settings — is the database connected?" },
      { status: 500 }
    );
  }
}
