import Link from "next/link";
import { event, faqs, packingList } from "@/lib/config";
import { Countdown } from "@/components/Countdown";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-800 text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #5e957e 0, transparent 45%), radial-gradient(circle at 80% 0%, #274c3f 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
            🎂 You&apos;re invited
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            {event.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pine-100">{event.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-pine-100">
            <span>📅 {event.dateRangeDisplay}</span>
            <span>📍 {event.cabinName}</span>
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm uppercase tracking-wide text-pine-200">Countdown</p>
            <Countdown target={event.startDate} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/rsvp" className="btn-primary">
              RSVP now
            </Link>
            <Link href="/carpool" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
              Find a carpool
            </Link>
          </div>
          <p className="mt-3 text-sm text-pine-200">
            Please RSVP by {event.rsvpDeadlineDisplay}.
          </p>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="section-title">The essentials</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">📅 When</h3>
            <p className="mt-2 text-pine-700">{event.dateRangeDisplay}</p>
            <p className="mt-1 text-sm text-pine-600">Arrive {event.arrivalDisplay}</p>
            <p className="text-sm text-pine-600">Leave {event.departureDisplay}</p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">📍 Where</h3>
            <p className="mt-2 text-pine-700">{event.cabinName}</p>
            <p className="mt-1 text-sm text-pine-600">{event.address}</p>
            <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Get directions →
            </a>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">💸 Cost</h3>
            <p className="mt-2 text-2xl font-bold text-pine-800">{event.costPerPerson}<span className="text-base font-normal text-pine-600"> / person</span></p>
            <p className="mt-1 text-sm text-pine-600">{event.costNote}</p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">📶 Wi-Fi</h3>
            <p className="mt-2 text-pine-700">Network: <span className="font-mono">{event.wifiNetwork}</span></p>
            <p className="text-pine-700">Password: <span className="font-mono">{event.wifiPassword}</span></p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">🎒 What to bring</h3>
            <ul className="mt-2 space-y-1 text-sm text-pine-700">
              {packingList.slice(0, 5).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Link href="/schedule#packing" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Full packing list →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">🍽️ Potluck</h3>
            <p className="mt-2 text-sm text-pine-600">
              We&apos;re splitting the cooking. Claim a dish so every meal is covered.
            </p>
            <Link href="/potluck" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Sign up to bring food →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">🎶 Vibes</h3>
            {event.spotifyPlaylistUrl ? (
              <a href={event.spotifyPlaylistUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-ember-600 hover:underline">
                Add songs to the shared playlist →
              </a>
            ) : (
              <p className="mt-2 text-sm text-pine-600">Playlist coming soon.</p>
            )}
            {event.photoAlbumUrl && (
              <a href={event.photoAlbumUrl} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-semibold text-ember-600 hover:underline">
                Shared photo album →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      {event.mapEmbedUrl && (
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="overflow-hidden rounded-2xl border border-pine-100 shadow-sm">
            <iframe
              src={event.mapEmbedUrl}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cabin location"
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="section-title">Good to know</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-pine-100 bg-pine-50 p-4">
                <summary className="cursor-pointer font-semibold text-pine-900 marker:content-['']">
                  {f.q}
                </summary>
                <p className="mt-2 text-pine-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ember-500 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Are you in?</h2>
          <p className="mt-3 text-ember-50">
            Let us know so we can plan food, beds, and carpools.
          </p>
          <Link href="/rsvp" className="btn mt-6 bg-white text-ember-600 hover:bg-ember-50">
            RSVP now
          </Link>
        </div>
      </section>
    </div>
  );
}
