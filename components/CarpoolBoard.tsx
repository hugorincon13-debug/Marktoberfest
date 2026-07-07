import type { Rsvp } from "@/lib/db";

function cityKey(city: string) {
  return city.trim().toLowerCase();
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card text-center">
      <p className="font-display text-3xl font-bold text-pine-900">{value}</p>
      <p className="text-sm text-pine-600">{label}</p>
    </div>
  );
}

export function CarpoolBoard({ rsvps, dbError }: { rsvps: Rsvp[]; dbError: boolean }) {
  const going = rsvps.filter((r) => r.attending === "yes" || r.attending === "maybe");
  const drivers = going.filter((r) => r.carpool_role === "driving" || r.carpool_role === "either");
  const riders = going.filter((r) => r.carpool_role === "need_ride" || r.carpool_role === "either");

  const byCity = new Map<string, { label: string; drivers: Rsvp[]; riders: Rsvp[] }>();
  for (const r of going) {
    if (!r.departure_city) continue;
    const key = cityKey(r.departure_city);
    if (!byCity.has(key)) byCity.set(key, { label: r.departure_city, drivers: [], riders: [] });
    const bucket = byCity.get(key)!;
    if (r.carpool_role === "driving" || r.carpool_role === "either") bucket.drivers.push(r);
    if (r.carpool_role === "need_ride" || r.carpool_role === "either") bucket.riders.push(r);
  }
  const cities = [...byCity.values()].sort((a, b) => a.label.localeCompare(b.label));
  const totalSeats = drivers.reduce((sum, d) => sum + (d.seats_available || 0), 0);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">🚗 Carpool board</h2>
          <p className="mt-2 max-w-2xl text-pine-700">
            Find people driving from your area, or offer a ride. Grouped by where
            everyone&apos;s coming from.
          </p>
        </div>
        <a href="#rsvp" className="btn-primary">Add / update my ride</a>
      </div>

      {dbError ? (
        <p className="mt-8 rounded-xl bg-ember-50 px-4 py-3 text-ember-700">
          The carpool board isn&apos;t connected to a database yet. Add a Postgres store on
          Vercel (see the README) and responses will appear here.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Coming" value={going.length} />
            <Stat label="Drivers" value={drivers.length} />
            <Stat label="Need a ride" value={riders.length} />
            <Stat label="Open seats" value={totalSeats} />
          </div>

          {cities.length === 0 ? (
            <p className="mt-10 rounded-xl border border-dashed border-pine-200 bg-white px-4 py-8 text-center text-pine-600">
              No travel details yet. Be the first — <a href="#rsvp" className="font-semibold text-ember-600 hover:underline">RSVP and add where you&apos;re coming from</a>.
            </p>
          ) : (
            <div className="mt-10 space-y-6">
              <h3 className="font-display text-2xl font-bold text-pine-900">Who&apos;s coming from where</h3>
              {cities.map((c) => (
                <div key={c.label} className="card">
                  <h4 className="font-display text-xl font-bold text-pine-900">📍 {c.label}</h4>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-pine-500">Drivers</p>
                      {c.drivers.length ? (
                        <ul className="mt-2 space-y-1 text-pine-800">
                          {c.drivers.map((d) => (
                            <li key={d.id}>
                              🚙 {d.name}
                              {d.seats_available ? (
                                <span className="text-pine-600"> · {d.seats_available} seat{d.seats_available === 1 ? "" : "s"}</span>
                              ) : null}
                              {d.arrival_time ? <span className="text-pine-500"> · {d.arrival_time}</span> : null}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-pine-500">None yet</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-pine-500">Looking for a ride</p>
                      {c.riders.length ? (
                        <ul className="mt-2 space-y-1 text-pine-800">
                          {c.riders.map((r) => (
                            <li key={r.id}>
                              🙋 {r.name}
                              {r.party_size > 1 ? <span className="text-pine-600"> · party of {r.party_size}</span> : null}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-pine-500">None yet</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-sm text-pine-500">
            To swap numbers and coordinate pickup, reach out in the group chat.
          </p>
        </>
      )}
    </div>
  );
}
