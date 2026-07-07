"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [t, setT] = useState(() => diff(targetMs));

  useEffect(() => {
    const id = setInterval(() => setT(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (t.done) {
    return <p className="font-display text-2xl text-white">It&apos;s happening! 🎉</p>;
  }

  const units = [
    { label: "days", value: t.days },
    { label: "hrs", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "sec", value: t.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[64px] flex-col items-center rounded-xl bg-white/15 px-3 py-2 backdrop-blur"
        >
          <span className="font-display text-2xl font-bold text-white sm:text-3xl tabular-nums">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-wide text-pine-100">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
