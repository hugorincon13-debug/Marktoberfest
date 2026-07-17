"use client";

import { useState } from "react";

interface Rsvp {
  id: string;
  name: string;
  email: string;
  attending: string;
  party_size: number;
  party_names: string;
  departure_city: string;
  carpool_role: string;
  seats_available: number;
  arrival_time: string;
  dietary: string;
  notes: string;
  deleted: boolean;
  created_at: string;
}

interface Message {
  id: string;
  name: string;
  message: string;
  deleted: boolean;
  created_at: string;
}

const roleLabel: Record<string, string> = {
  driving: "🚙 Driving",
  need_ride: "🙋 Needs ride",
  either: "🤝 Flexible",
  none: "—",
};

const attendingLabel: Record<string, string> = {
  yes: "✅ Yes",
  maybe: "🤔 Maybe",
  no: "❌ No",
};

function toCsv(rows: Rsvp[]) {
  const headers = [
    "name", "email", "attending", "party_size", "party_names", "departure_city",
    "carpool_role", "seats_available", "arrival_time", "dietary", "notes", "created_at",
  ];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => escape((r as unknown as Record<string, unknown>)[h])).join(","));
  }
  return lines.join("\n");
}

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [rsvps, setRsvps] = useState<Rsvp[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed.");
      setRsvps(data.rsvps);
      setMessages(data.messages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setLoading(false);
    }
  }

  async function moderate(type: "rsvp" | "message", id: string, action: "delete" | "restore") {
    const deleted = action === "delete";
    // optimistic
    if (type === "rsvp") {
      setRsvps((prev) => prev && prev.map((r) => (r.id === id ? { ...r, deleted } : r)));
    } else {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, deleted } : m)));
    }
    try {
      const res = await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, type, id, action }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // revert on failure
      if (type === "rsvp") {
        setRsvps((prev) => prev && prev.map((r) => (r.id === id ? { ...r, deleted: !deleted } : r)));
      } else {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, deleted: !deleted } : m)));
      }
      setError("Couldn't update — please try again.");
    }
  }

  function downloadCsv() {
    if (!rsvps) return;
    const active = rsvps.filter((r) => !r.deleted);
    const blob = new Blob([toCsv(active)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cabin-weekend-rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!rsvps) {
    return (
      <form onSubmit={load} className="card max-w-sm space-y-4">
        <div>
          <label className="label" htmlFor="pw">Host password</label>
          <input
            id="pw"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-ember-700">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Checking…" : "View responses"}
        </button>
      </form>
    );
  }

  const activeRsvps = rsvps.filter((r) => !r.deleted);
  const deletedRsvps = rsvps.filter((r) => r.deleted);
  const activeMessages = messages.filter((m) => !m.deleted);
  const deletedMessages = messages.filter((m) => m.deleted);
  const yes = activeRsvps.filter((r) => r.attending === "yes");
  const headcount = yes.reduce((s, r) => s + (r.party_size || 1), 0);

  return (
    <div className="space-y-10">
      {error && <p className="rounded-lg bg-ember-50 px-3 py-2 text-sm text-ember-700">{error}</p>}

      {/* RSVPs */}
      <section>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Responses" value={activeRsvps.length} />
            <Stat label="Yes" value={yes.length} />
            <Stat label="Total headcount" value={headcount} />
          </div>
          <button onClick={downloadCsv} className="btn-secondary ml-auto">⬇ Export CSV</button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-pine-100 bg-white shadow-sm">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-pine-100 text-pine-800">
              <tr>
                {["Name", "Email", "Going", "Party", "Guests", "From", "Carpool", "Seats", "Arrival", "Dietary", "Notes", ""].map((h, i) => (
                  <th key={i} className="px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeRsvps.length === 0 ? (
                <tr><td colSpan={12} className="px-3 py-6 text-center text-pine-500">No responses yet.</td></tr>
              ) : activeRsvps.map((r) => (
                <tr key={r.id} className="border-t border-pine-50 align-top">
                  <td className="px-3 py-2 font-medium text-pine-900">{r.name}</td>
                  <td className="px-3 py-2 text-pine-700">
                    <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a>
                  </td>
                  <td className="px-3 py-2">{attendingLabel[r.attending] ?? r.attending}</td>
                  <td className="px-3 py-2">{r.party_size}</td>
                  <td className="px-3 py-2 text-pine-700">{r.party_names || "—"}</td>
                  <td className="px-3 py-2 text-pine-700">{r.departure_city || "—"}</td>
                  <td className="px-3 py-2">{roleLabel[r.carpool_role] ?? r.carpool_role}</td>
                  <td className="px-3 py-2">{r.seats_available || "—"}</td>
                  <td className="px-3 py-2 text-pine-700">{r.arrival_time || "—"}</td>
                  <td className="px-3 py-2 text-pine-700">{r.dietary || "—"}</td>
                  <td className="px-3 py-2 text-pine-700">{r.notes || "—"}</td>
                  <td className="px-3 py-2">
                    <button onClick={() => moderate("rsvp", r.id, "delete")} className="text-sm font-medium text-ember-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {deletedRsvps.length > 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-pine-200 bg-pine-50 p-4">
            <p className="text-sm font-semibold text-pine-700">Recently deleted RSVPs</p>
            <ul className="mt-2 space-y-1">
              {deletedRsvps.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 text-sm text-pine-600">
                  <span className="truncate line-through">{r.name} · {r.email}</span>
                  <button onClick={() => moderate("rsvp", r.id, "restore")} className="shrink-0 font-semibold text-pine-800 hover:underline">
                    Undo
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Chat messages */}
      <section>
        <h2 className="font-display text-2xl font-bold text-pine-900">
          Chat messages <span className="text-base font-normal text-pine-500">({activeMessages.length})</span>
        </h2>
        <div className="mt-4 space-y-2">
          {activeMessages.length === 0 ? (
            <p className="text-sm text-pine-500">No messages yet.</p>
          ) : activeMessages.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-3 rounded-xl border border-pine-100 bg-white p-3 shadow-sm">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-pine-900">{m.name}</p>
                <p className="whitespace-pre-line break-words text-pine-700">{m.message}</p>
              </div>
              <button onClick={() => moderate("message", m.id, "delete")} className="shrink-0 text-sm font-medium text-ember-600 hover:underline">
                Delete
              </button>
            </div>
          ))}
        </div>

        {deletedMessages.length > 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-pine-200 bg-pine-50 p-4">
            <p className="text-sm font-semibold text-pine-700">Recently deleted messages</p>
            <ul className="mt-2 space-y-1">
              {deletedMessages.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 text-sm text-pine-600">
                  <span className="truncate line-through">{m.name}: {m.message}</span>
                  <button onClick={() => moderate("message", m.id, "restore")} className="shrink-0 font-semibold text-pine-800 hover:underline">
                    Undo
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-pine-100 px-4 py-2 text-center">
      <p className="font-display text-2xl font-bold text-pine-900">{value}</p>
      <p className="text-xs text-pine-600">{label}</p>
    </div>
  );
}
