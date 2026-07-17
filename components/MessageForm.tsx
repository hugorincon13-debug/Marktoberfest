"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MessageForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), message: data.get("message") }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setDone(true);
      router.refresh();
      setTimeout(() => setDone(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div>
        <label className="label" htmlFor="msg-name">Your name</label>
        <input id="msg-name" name="name" required className="input" placeholder="Jamie Rivera" />
      </div>
      <div>
        <label className="label" htmlFor="msg-body">Your message</label>
        <textarea id="msg-body" name="message" required rows={3} className="input" placeholder="Happy 40th, Mark! Can't wait…" />
      </div>
      {error && <p className="rounded-lg bg-ember-50 px-3 py-2 text-sm text-ember-700">{error}</p>}
      {done && <p className="rounded-lg bg-pine-50 px-3 py-2 text-sm text-pine-700">Posted — thanks! 🍁</p>}
      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Posting…" : "Post message"}
      </button>
    </form>
  );
}
