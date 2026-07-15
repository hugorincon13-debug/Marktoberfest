import { event, activities } from "@/lib/config";
import { getMealSignups, type MealSignup } from "@/lib/db";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import { MealsBoard } from "@/components/MealsBoard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let signups: MealSignup[] = [];
  let dbError = false;

  try {
    signups = await getMealSignups();
  } catch {
    dbError = true;
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-10 text-center sm:pb-20 sm:pt-14">
          {/* Event badge — white background melts into the cream page via multiply */}
          <h1 className="sr-only">{event.heroTitle}</h1>
          <img
            src="/logo.jpg"
            alt={`${event.heroTitle} — West Virginia, ${event.dateRangeDisplay}`}
            className="w-[min(82vw,420px)] mix-blend-multiply"
          />

          <p className="mt-6 font-display text-2xl font-bold text-pine-900 sm:text-3xl">
            {event.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-pine-800">
            <span>📅 {event.dateRangeDisplay}</span>
            <span>📍 Davis, WV</span>
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm uppercase tracking-wide text-gold-600">Countdown</p>
            <Countdown target={event.startDate} />
          </div>

          <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <a href="#rsvp" className="btn-primary w-full sm:w-auto">RSVP now</a>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="scroll-mt-16 bg-cream-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="section-title">Essentials</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-xl font-bold text-pine-900">📅 When</h3>
              <p className="mt-2 text-pine-700">{event.dateRangeDisplay}</p>
              <p className="mt-1 text-sm text-pine-600">Arrive {event.arrivalDisplay}</p>
              <p className="text-sm text-pine-600">Leave {event.departureDisplay}</p>
              <a href="/api/calendar" className="mt-3 inline-block text-sm font-semibold text-ember-600 hover:underline">
                Add to calendar →
              </a>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold text-pine-900">📍 Where</h3>
              <p className="mt-2 text-pine-700">{event.publicLocation}</p>
              <p className="mt-1 text-sm text-pine-500">
                Exact address shared when you RSVP.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <h2 className="section-title">RSVP</h2>
          <p className="mt-2 text-pine-700">
            Let us know if you can make it.
          </p>
          <div className="mt-8">
            <RsvpForm />
          </div>
        </div>
      </section>

      {/* Meals */}
      <section id="meals" className="scroll-mt-16 bg-cream-50">
        <div className="px-4 py-16">
          <MealsBoard signups={signups} dbError={dbError} />
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="section-title">🍁 Explore the area</h2>
          <p className="mt-2 max-w-2xl text-pine-700">
            We&apos;ll be in Tucker County during peak fall foliage. Some of the best
            seasonal things to do around Davis &amp; Thomas — all optional, all beautiful.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {activities.map((a) => (
              <div key={a.name} className="card flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{a.emoji}</span>
                  <h3 className="font-display text-xl font-bold text-pine-900">{a.name}</h3>
                </div>
                <p className="mt-3 flex-1 text-pine-700">{a.blurb}</p>
                {a.url && (
                  <a href={a.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-ember-600 hover:underline">
                    Learn more →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ember-500 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Are you in?</h2>
          <a href="#rsvp" className="btn mt-6 w-full bg-white text-ember-600 hover:bg-ember-50 sm:w-auto">RSVP now</a>
        </div>
      </section>
    </div>
  );
}
