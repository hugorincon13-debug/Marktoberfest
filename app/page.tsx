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
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-44 pt-10 text-center sm:pb-60 sm:pt-14">
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

        {/* Rolling Appalachian ridges in autumn color — soft curves like the hills around Davis */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full sm:h-44"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="#e0a52c" fillOpacity="0.4" d="M0 190 C 120 152, 250 148, 380 172 C 510 196, 620 142, 750 150 C 880 158, 990 192, 1120 178 C 1250 164, 1340 172, 1440 156 L1440 320 L0 320 Z" />
          <path fill="#dd7733" fillOpacity="0.55" d="M0 235 C 160 198, 320 206, 480 226 C 640 246, 790 194, 950 206 C 1110 218, 1290 238, 1440 216 L1440 320 L0 320 Z" />
          <path fill="#8a3417" fillOpacity="0.85" d="M0 268 C 180 240, 350 250, 530 264 C 710 278, 880 236, 1060 248 C 1240 260, 1350 270, 1440 258 L1440 320 L0 320 Z" />
          <path fill="#1e301d" d="M0 300 C 200 282, 400 292, 600 300 C 800 308, 1000 284, 1200 292 C 1320 297, 1400 301, 1440 299 L1440 320 L0 320 Z" />
        </svg>
      </section>

      {/* Details */}
      <section id="details" className="scroll-mt-16 bg-cream-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="section-title">The essentials</h2>
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

          <p className="mt-8 text-sm text-pine-500">
            Weather at ~3,200 ft can swing from crisp to cold — bring layers and a warm jacket
            for evenings around the fire.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ember-500 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Are you in?</h2>
          <p className="mt-3 text-ember-50">Let us know so we can plan food, beds, and carpools.</p>
          <a href="#rsvp" className="btn mt-6 w-full bg-white text-ember-600 hover:bg-ember-50 sm:w-auto">RSVP now</a>
        </div>
      </section>
    </div>
  );
}
