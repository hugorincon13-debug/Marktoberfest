import Link from "next/link";
import { event } from "@/lib/config";
import { Countdown } from "@/components/Countdown";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pine-950 via-pine-800 to-pine-700 text-white">
        {/* warm autumn dusk glow */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 75% 0%, rgba(224,165,44,0.35) 0, rgba(200,90,28,0.15) 35%, transparent 65%)",
          }}
        />
        {/* layered Appalachian ridges */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-56"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="#375b33" fillOpacity="0.55" d="M0 220 L240 150 L480 210 L720 130 L960 200 L1200 140 L1440 190 L1440 320 L0 320 Z" />
          <path fill="#2c482a" fillOpacity="0.8" d="M0 260 L200 200 L420 250 L640 190 L900 250 L1150 200 L1440 240 L1440 320 L0 320 Z" />
          <path fill="#1e301d" d="M0 300 L180 260 L400 295 L680 250 L920 300 L1180 260 L1440 290 L1440 320 L0 320 Z" />
        </svg>

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
            🍂 You&apos;re invited
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            {event.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream-100">{event.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-cream-100">
            <span>📅 {event.dateRangeDisplay}</span>
            <span>📍 Davis, WV</span>
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm uppercase tracking-wide text-gold-200">Countdown</p>
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
            <p className="mt-2 text-pine-700">{event.address}</p>
            <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Get directions →
            </a>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">🍂 Explore</h3>
            <p className="mt-2 text-sm text-pine-600">
              Peak foliage in Tucker County — Blackwater Falls, Dolly Sods, and the towns of Davis &amp; Thomas.
            </p>
            <Link href="/explore" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Seasonal things to do →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-pine-900">🍽️ Meals</h3>
            <p className="mt-2 text-sm text-pine-600">
              We&apos;re splitting the cooking. Sign up to host one of the weekend&apos;s meals.
            </p>
            <Link href="/meals" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
              Sign up to host a meal →
            </Link>
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
