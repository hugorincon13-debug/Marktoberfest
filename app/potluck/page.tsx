import { event, meals, potluckCategories } from "@/lib/config";
import { getPotluckItems, type PotluckItem } from "@/lib/db";
import { PotluckForm } from "@/components/PotluckForm";

export const metadata = { title: `Potluck · ${event.title}` };
export const dynamic = "force-dynamic";

const categoryEmoji: Record<string, string> = {
  Main: "🍲",
  Side: "🥔",
  Salad: "🥗",
  Bread: "🍞",
  Dessert: "🍰",
  Snack: "🍿",
  Drinks: "🥤",
  Other: "🍴",
};

export default async function PotluckPage() {
  let items: PotluckItem[] = [];
  let dbError = false;
  try {
    items = await getPotluckItems();
  } catch {
    dbError = true;
  }

  const byMeal = new Map<string, PotluckItem[]>();
  for (const it of items) {
    if (!byMeal.has(it.meal_id)) byMeal.set(it.meal_id, []);
    byMeal.get(it.meal_id)!.push(it);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">🍽️ Potluck sign-up</h1>
          <p className="mt-2 max-w-2xl text-pine-700">
            Claim a dish so we spread the cooking around (and don&apos;t end up with six bags
            of chips). Grey items are ideas of what&apos;s still needed — bring anything you like.
          </p>
        </div>
        <a href="#signup" className="btn-primary">Sign up to bring something</a>
      </div>

      {dbError && (
        <p className="mt-8 rounded-xl bg-ember-50 px-4 py-3 text-ember-700">
          The potluck board isn&apos;t connected to a database yet. Add a Postgres store on
          Vercel (see the README) and sign-ups will appear here.
        </p>
      )}

      {!dbError && (
        <div className="mt-8 space-y-6">
          {meals.map((meal) => {
            const claimed = byMeal.get(meal.id) ?? [];
            const claimedLabels = claimed.map((c) => c.dish.toLowerCase());
            const openSlots = meal.slots.filter(
              (s) => !claimedLabels.some((c) => c.includes(s.toLowerCase().split(" / ")[0])),
            );
            return (
              <div key={meal.id} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-pine-900">{meal.name}</h2>
                  <span className="text-sm text-pine-500">{meal.when}</span>
                </div>

                {claimed.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {claimed.map((it) => (
                      <li key={it.id} className="flex items-start gap-2 rounded-lg bg-pine-50 px-3 py-2">
                        <span>{categoryEmoji[it.category] ?? "🍴"}</span>
                        <span className="flex-1">
                          <span className="font-medium text-pine-900">{it.dish}</span>
                          <span className="text-pine-600"> — {it.name}</span>
                          {it.serves ? <span className="text-pine-500"> · serves ~{it.serves}</span> : null}
                          {it.notes ? <span className="block text-sm text-pine-500">{it.notes}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-pine-500">Nothing claimed yet — be the first!</p>
                )}

                {openSlots.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {openSlots.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-dashed border-pine-300 px-3 py-1 text-xs text-pine-500"
                      >
                        still needed: {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div id="signup" className="mt-12 scroll-mt-20">
        <h2 className="section-title">Bring a dish</h2>
        <p className="mt-2 text-pine-700">Add what you&apos;re planning to bring.</p>
        <div className="mt-6">
          <PotluckForm meals={meals} categories={potluckCategories} />
        </div>
      </div>
    </div>
  );
}
