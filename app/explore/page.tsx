import { event, activities } from "@/lib/config";

export const metadata = { title: `Explore · ${event.title}` };

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="section-title">🍂 Explore the area</h1>
      <p className="mt-2 max-w-2xl text-pine-700">
        We&apos;ll be in Tucker County during peak fall foliage. Here are some of the best
        seasonal things to do around Davis &amp; Thomas — all optional, all beautiful.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {activities.map((a) => (
          <div key={a.name} className="card flex flex-col">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{a.emoji}</span>
              <h2 className="font-display text-xl font-bold text-pine-900">{a.name}</h2>
            </div>
            <p className="mt-3 flex-1 text-pine-700">{a.blurb}</p>
            {a.url && (
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-ember-600 hover:underline"
              >
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
  );
}
