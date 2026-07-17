"use client";

import { useEffect, useRef, useState } from "react";

interface Msg {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function Chat({ initialMessages, dbError }: { initialMessages: Msg[]; dbError: boolean }) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  // Remember the name locally so returning chatters don't retype it.
  useEffect(() => {
    const saved = localStorage.getItem("mtf_chat_name");
    if (saved) setName(saved);
  }, []);

  async function refresh() {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.messages)) setMessages(data.messages);
    } catch {
      /* ignore transient network errors */
    }
  }

  // Poll for new messages so it feels live.
  useEffect(() => {
    if (dbError) return;
    const id = setInterval(refresh, 12000);
    return () => clearInterval(id);
  }, [dbError]);

  // Keep the thread scrolled to the newest message (unless the user scrolled up).
  useEffect(() => {
    const el = listRef.current;
    if (el && atBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function onScroll() {
    const el = listRef.current;
    if (!el) return;
    atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || sending) return;
    setSending(true);
    setError("");
    localStorage.setItem("mtf_chat_name", name.trim());
    atBottomRef.current = true;
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't send.");
      setText("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send.");
    } finally {
      setSending(false);
    }
  }

  const myName = name.trim().toLowerCase();

  return (
    <div className="overflow-hidden rounded-2xl border border-pine-100 bg-white shadow-sm">
      {/* thread */}
      <div
        ref={listRef}
        onScroll={onScroll}
        className="flex h-80 flex-col gap-3 overflow-y-auto bg-cream-100 p-4 sm:h-96"
      >
        {dbError ? (
          <p className="m-auto max-w-sm text-center text-sm text-pine-500">
            Chat isn&apos;t connected to a database yet. Once a Postgres store is added on
            Vercel, messages will show up here.
          </p>
        ) : messages.length === 0 ? (
          <p className="m-auto text-center text-sm text-pine-500">
            No messages yet — say hi! 👋
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.name.trim().toLowerCase() === myName && myName !== "";
            return (
              <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    mine
                      ? "rounded-br-sm bg-ember-500 text-white"
                      : "rounded-bl-sm bg-white text-pine-900 shadow-sm"
                  }`}
                >
                  {!mine && (
                    <p className="text-xs font-semibold text-pine-600">{m.name}</p>
                  )}
                  <p className="whitespace-pre-line break-words">{m.message}</p>
                </div>
                <p className="mt-1 px-1 text-[11px] text-pine-400">
                  {mine ? "You" : ""} {timeAgo(m.created_at)}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* composer */}
      <form onSubmit={send} className="border-t border-pine-100 bg-white p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <input
            aria-label="Your name"
            className="input sm:w-40"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
          />
          <input
            aria-label="Message"
            className="input flex-1"
            placeholder="Write a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={600}
          />
          <button
            type="submit"
            disabled={sending || !name.trim() || !text.trim()}
            className="btn-primary sm:w-auto disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-ember-700">{error}</p>}
      </form>
    </div>
  );
}
