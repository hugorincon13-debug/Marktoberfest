import { event } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-pine-100 bg-pine-900 text-pine-100">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <p className="font-display text-lg text-white">{event.title}</p>
        <p className="mt-1 text-pine-300">{event.dateRangeDisplay} · Davis, WV</p>
        <p className="mt-6 text-xs text-pine-400">
          Made with 🍂 for a very special birthday.
        </p>
      </div>
    </footer>
  );
}
