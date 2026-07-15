"use client";

import { useEffect, useState } from "react";

function daysUntil(target: number) {
  const ms = Math.max(0, target - Date.now());
  return { days: Math.floor(ms / 86400000), done: ms === 0 };
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [t, setT] = useState(() => daysUntil(targetMs));

  useEffect(() => {
    const id = setInterval(() => setT(daysUntil(targetMs)), 60000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (t.done) {
    return <p className="font-display text-3xl font-bold text-pine-900">It&apos;s happening! 🎉</p>;
  }

  if (t.days === 0) {
    return <p className="font-display text-4xl font-bold text-pine-900">Today! 🎉</p>;
  }

  return (
    <p className="flex flex-col items-center text-center font-display font-bold leading-tight text-pine-900">
      <span className="text-6xl tabular-nums sm:text-7xl">{t.days}</span>
      <span className="text-3xl sm:text-4xl">{t.days === 1 ? "day" : "days"}</span>
    </p>
  );
}
