import { NextResponse } from "next/server";
import { setRsvpDeleted, setMessageDeleted, setMealSignupDeleted } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const configured = process.env.ADMIN_PASSWORD || "changeme";
  let body: { password?: string; type?: string; id?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || body.password !== configured) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const id = String(body.id ?? "");
  const deleted = body.action === "delete";
  if (!id || (body.action !== "delete" && body.action !== "restore")) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    if (body.type === "rsvp") {
      await setRsvpDeleted(id, deleted);
    } else if (body.type === "message") {
      await setMessageDeleted(id, deleted);
    } else if (body.type === "meal") {
      await setMealSignupDeleted(id, deleted);
    } else {
      return NextResponse.json({ error: "Unknown type." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn't update. Try again." }, { status: 500 });
  }
}
