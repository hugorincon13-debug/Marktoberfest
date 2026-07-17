import { NextResponse } from "next/server";
import { addMessage, getMessages, type NewMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json({ ok: true, messages });
  } catch {
    return NextResponse.json({ ok: false, messages: [] });
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
  const message = String(body.message ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Please write a message." }, { status: 400 });
  }

  const record: NewMessage = {
    name: name.slice(0, 80),
    message: message.slice(0, 600),
  };

  try {
    const saved = await addMessage(record);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Failed to save message:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }
}
