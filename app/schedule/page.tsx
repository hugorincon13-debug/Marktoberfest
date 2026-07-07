import { event, schedule, packingList } from "@/lib/config";

export const metadata = { title: `Schedule · ${event.title}` };

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="section-title">Weekend schedule</h1>
      <p className="mt-2 text-pine-700">
        A loose plan — nothing&apos;s mandatory except cake. {event.arrivalDisplay} arrival,
        {" "}{event.departureDisplay} departure.
      </p>

      <div className="mt-10 space-y-10">
        {schedule.map((day) => (
          <div key={day.day}>
            <h2 className="font-display text-2xl font-bold text-pine-900">{day.day}</h2>
            <ol className="mt-4 border-l-2 border-pine-200 pl-5">
              {day.items.map((item, i) => (
                <li key={i} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-ember-500 ring-4 ring-pine-50" />
                  <p className="text-sm font-semibold text-ember-600">{item.time}</p>
                  <p className="font-medium text-pine-900">{item.title}</p>
                  {item.note && <p className="text-sm text-pine-600">{item.note}</p>}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div id="packing" className="mt-14 scroll-mt-20">
        <h2 className="section-title">🎒 Packing list</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {packingList.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-lg bg-white p-3 text-pine-800 shadow-sm">
              <span className="text-pine-400">☐</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
