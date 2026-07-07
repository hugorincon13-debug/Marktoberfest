"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Meal {
  id: string;
  name: string;
}

export function PotluckForm({
  meals,
  categories,
  defaultMealId,
}: {
  meals: Meal[];
  categories: readonly string[];
  defaultMealId?: string;
}) {
  const router = useRouter();
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
      category: form.get("category"),
      dish: form.get("dish"),
      serves: form.get("serves"),
      notes: form.get("notes"),
    };

    try {
      const res = await fetch("/api/potluck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
      // Refresh the server-rendered board so the new dish shows up.
      router.refresh();
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
        <h2 className="mt-3 font-display text-2xl font-bold text-pine-900">Thanks — you&apos;re on the list!</h2>
        <p className="mt-2 text-pine-700">Your dish has been added to the board above.</p>
        <button onClick={() => setDone(false)} className="btn-secondary mt-6">
          Add another dish
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="p-name">Your name *</label>
          <input id="p-name" name="name" required className="input" placeholder="Jamie Rivera" />
        </div>
        <div>
          <label className="label" htmlFor="p-meal">Which meal? *</label>
          <select id="p-meal" name="meal_id" required defaultValue={defaultMealId ?? ""} className="input">
            <option value="" disabled>Pick a meal…</option>
            {meals.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="p-dish">What are you bringing? *</label>
          <input id="p-dish" name="dish" required className="input" placeholder="Veggie chili" />
        </div>
        <div>
          <label className="label" htmlFor="p-category">Category</label>
          <select id="p-category" name="category" defaultValue="Main" className="input">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="p-serves">Roughly how many does it serve?</label>
          <input id="p-serves" name="serves" type="number" min={0} max={100} className="input max-w-[140px]" placeholder="8" />
        </div>
        <div>
          <label className="label" htmlFor="p-notes">Notes</label>
          <input id="p-notes" name="notes" className="input" placeholder="Vegan, needs oven space…" />
        </div>
      </div>

      {error && <p className="rounded-lg bg-ember-50 px-3 py-2 text-sm text-ember-700">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Adding…" : "Add my dish"}
      </button>
    </form>
  );
}
