"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Attending = "yes" | "no" | "maybe";
type CarpoolRole = "driving" | "need_ride" | "either" | "none";

export function RsvpForm() {
  const router = useRouter();
  const [attending, setAttending] = useState<Attending | "">("");
  const [carpoolRole, setCarpoolRole] = useState<CarpoolRole>("none");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Attending | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      attending: form.get("attending"),
      party_size: form.get("party_size"),
      departure_city: form.get("departure_city"),
      carpool_role: form.get("carpool_role"),
      seats_available: form.get("seats_available"),
      arrival_time: form.get("arrival_time"),
      dietary: form.get("dietary"),
      bringing: form.get("bringing"),
      notes: form.get("notes"),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(payload.attending as Attending);
      // refresh the server-rendered carpool board so this RSVP shows up
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
        <div className="text-4xl">{done === "no" ? "💚" : "🎉"}</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-pine-900">
          {done === "no" ? "Thanks for letting us know" : "You're on the list!"}
        </h2>
        <p className="mt-2 text-pine-700">
          {done === "no"
            ? "We'll miss you — thanks for the heads up."
            : "We've got your RSVP. Want to host one of the weekend's meals?"}
        </p>
        {done !== "no" && (
          <a href="#meals" className="btn-primary mt-6">
            Sign up to host a meal →
          </a>
        )}
      </div>
    );
  }

  const showTravel = attending === "yes" || attending === "maybe";

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Your name *</label>
          <input id="name" name="name" required className="input" placeholder="Jamie Rivera" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className="input" placeholder="jamie@example.com" />
        </div>
      </div>

      <div>
        <span className="label">Can you make it? *</span>
        <div className="grid grid-cols-3 gap-2">
          {([
            { v: "yes", label: "I'm in! 🎉" },
            { v: "maybe", label: "Maybe 🤔" },
            { v: "no", label: "Can't 😢" },
          ] as { v: Attending; label: string }[]).map((opt) => (
            <label
              key={opt.v}
              className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm font-medium transition-colors ${
                attending === opt.v
                  ? "border-pine-500 bg-pine-100 text-pine-900"
                  : "border-pine-200 bg-white text-pine-700 hover:bg-pine-50"
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={opt.v}
                className="sr-only"
                required
                onChange={() => setAttending(opt.v)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {showTravel && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="party_size">How many in your party? *</label>
              <input
                id="party_size"
                name="party_size"
                type="number"
                min={1}
                max={20}
                defaultValue={1}
                className="input"
              />
              <p className="mt-1 text-xs text-pine-500">Including yourself and any plus-ones.</p>
            </div>
            <div>
              <label className="label" htmlFor="arrival_time">When are you arriving?</label>
              <input id="arrival_time" name="arrival_time" className="input" placeholder="Fri around 6pm" />
            </div>
          </div>

          <fieldset className="rounded-xl border border-pine-100 bg-pine-50 p-4">
            <legend className="px-1 text-sm font-semibold text-pine-800">🚗 Carpool</legend>

            <div className="mt-2">
              <label className="label" htmlFor="departure_city">Where are you driving from?</label>
              <input
                id="departure_city"
                name="departure_city"
                className="input"
                placeholder="e.g. Los Angeles, CA"
              />
              <p className="mt-1 text-xs text-pine-500">
                So people nearby can carpool with you.
              </p>
            </div>

            <div className="mt-4">
              <span className="label">Carpool preference</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {([
                  { v: "driving", label: "🚙 I'm driving — can take passengers" },
                  { v: "need_ride", label: "🙋 I need a ride" },
                  { v: "either", label: "🤝 Flexible / could do either" },
                  { v: "none", label: "🚫 Not carpooling" },
                ] as { v: CarpoolRole; label: string }[]).map((opt) => (
                  <label
                    key={opt.v}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                      carpoolRole === opt.v
                        ? "border-pine-500 bg-white text-pine-900"
                        : "border-pine-200 bg-white/60 text-pine-700 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="carpool_role"
                      value={opt.v}
                      className="sr-only"
                      defaultChecked={opt.v === "none"}
                      onChange={() => setCarpoolRole(opt.v)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {carpoolRole === "driving" && (
              <div className="mt-4">
                <label className="label" htmlFor="seats_available">Open seats you can offer</label>
                <input
                  id="seats_available"
                  name="seats_available"
                  type="number"
                  min={0}
                  max={20}
                  defaultValue={2}
                  className="input max-w-[120px]"
                />
              </div>
            )}
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="dietary">Dietary needs</label>
              <input id="dietary" name="dietary" className="input" placeholder="Veggie, allergies…" />
            </div>
            <div>
              <label className="label" htmlFor="bringing">Bringing anything to share?</label>
              <input id="bringing" name="bringing" className="input" placeholder="A case of IPA, board games…" />
            </div>
          </div>
        </>
      )}

      <div>
        <label className="label" htmlFor="notes">Anything else?</label>
        <textarea id="notes" name="notes" rows={3} className="input" placeholder="Notes for the hosts…" />
      </div>

      {error && (
        <p className="rounded-lg bg-ember-50 px-3 py-2 text-sm text-ember-700">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
