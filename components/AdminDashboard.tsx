"use client";

import { useState } from "react";

interface Rsvp {
  id: string;
  name: string;
  email: string;
  attending: string;
  party_size: number;
  departure_city: string;
  carpool_role: string;
  seats_available: number;
  arrival_time: string;
  dietary: string;
  bringing: string;
  notes: string;
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
    "name", "email", "attending", "party_size", "departure_city",
    "carpool_role", "seats_available", "arrival_time", "dietary", "bringing", "notes", "created_at",
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
  const [hideCarpool, setHideCarpool] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");
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
      setHideCarpool(!!data.settings?.hideCarpool);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleCarpool(next: boolean) {
    setHideCarpool(next); // optimistic
    setSavingSettings(true);
    setSettingsMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, hideCarpool: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      setSettingsMsg("Saved.");
    } catch (err) {
      setHideCarpool(!next); // revert
      setSettingsMsg(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSavingSettings(false);
    }
  }

  function downloadCsv() {
    if (!rsvps) return;
    const blob = new Blob([toCsv(rsvps)], { type: "text/csv" });
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

  const yes = rsvps.filter((r) => r.attending === "yes");
  const headcount = yes.reduce((s, r) => s + (r.party_size || 1), 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Stat label="Responses" value={rsvps.length} />
          <Stat label="Yes" value={yes.length} />
          <Stat label="Total headcount" value={headcount} />
        </div>
        <button onClick={downloadCsv} className="btn-secondary ml-auto">
          ⬇ Export CSV
        </button>
      </div>

      <div className="mb-6 card">
        <h2 className="font-display text-lg font-bold text-pine-900">Site settings</h2>
        <label className="mt-3 flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-ember-500"
            checked={hideCarpool}
            disabled={savingSettings}
            onChange={(e) => toggleCarpool(e.target.checked)}
          />
          <span>
            <span className="font-medium text-pine-900">Hide the carpool section</span>
            <span className="block text-sm text-pine-600">
              When on, the carpool board is removed from the public page and nav. RSVPs still
              collect travel details.
            </span>
          </span>
        </label>
        {settingsMsg && <p className="mt-2 text-sm text-pine-500">{settingsMsg}</p>}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-pine-100 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-pine-100 text-pine-800">
            <tr>
              {["Name", "Email", "Going", "Party", "From", "Carpool", "Seats", "Arrival", "Dietary", "Bringing", "Notes"].map((h) => (
                <th key={h} className="px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={r.id} className="border-t border-pine-50 align-top">
                <td className="px-3 py-2 font-medium text-pine-900">{r.name}</td>
                <td className="px-3 py-2 text-pine-700">
                  <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a>
                </td>
                <td className="px-3 py-2">{attendingLabel[r.attending] ?? r.attending}</td>
                <td className="px-3 py-2">{r.party_size}</td>
                <td className="px-3 py-2 text-pine-700">{r.departure_city || "—"}</td>
                <td className="px-3 py-2">{roleLabel[r.carpool_role] ?? r.carpool_role}</td>
                <td className="px-3 py-2">{r.seats_available || "—"}</td>
                <td className="px-3 py-2 text-pine-700">{r.arrival_time || "—"}</td>
                <td className="px-3 py-2 text-pine-700">{r.dietary || "—"}</td>
                <td className="px-3 py-2 text-pine-700">{r.bringing || "—"}</td>
                <td className="px-3 py-2 text-pine-700">{r.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
