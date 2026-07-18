"use client";

import { useState } from "react";

interface Meal {
  id: string;
  name: string;
}

export function MealSignupForm({
  meals,
  defaultMealId,
  onSignedUp,
}: {
  meals: Meal[];
  defaultMealId?: string;
  onSignedUp?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      meal_id: form.get("meal_id"),
      notes: form.get("notes"),
    };

    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
      onSignedUp?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card text-center">
        <div className="text-4xl">🍽️</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-pine-900">Thanks for hosting!</h2>
        <p className="mt-2 text-pine-700">You&apos;ve been added to the meal above.</p>
        <button onClick={() => setDone(false)} className="btn-secondary mt-6">
          Sign up for another meal
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="m-name">Your name *</label>
          <input id="m-name" name="name" required className="input" placeholder="Jamie Rivera" />
        </div>
        <div>
          <label className="label" htmlFor="m-meal">Which meal? *</label>
          <select id="m-meal" name="meal_id" required defaultValue={defaultMealId ?? ""} className="input">
            <option value="" disabled>Pick a meal…</option>
            {meals.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="m-notes">Notes (optional)</label>
        <input id="m-notes" name="notes" className="input" placeholder="What you're thinking of making, co-hosts, etc." />
      </div>

      {error && <p className="rounded-lg bg-ember-50 px-3 py-2 text-sm text-ember-700">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Signing up…" : "Sign up to host"}
      </button>
    </form>
  );
}
