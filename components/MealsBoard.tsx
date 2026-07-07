import { meals } from "@/lib/config";
import type { MealSignup } from "@/lib/db";
import { MealSignupForm } from "@/components/MealSignupForm";

export function MealsBoard({ signups, dbError }: { signups: MealSignup[]; dbError: boolean }) {
  const byMeal = new Map<string, MealSignup[]>();
  for (const s of signups) {
    if (!byMeal.has(s.meal_id)) byMeal.set(s.meal_id, []);
    byMeal.get(s.meal_id)!.push(s);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">🍽️ Meal sign-up</h2>
          <p className="mt-2 max-w-2xl text-pine-700">
            Sign up to host a meal — you&apos;re on the hook for planning and cooking it
            (grab a co-host or two if you like). No need to say exactly what yet.
          </p>
        </div>
      </div>

      {dbError ? (
        <p className="mt-8 rounded-xl bg-ember-50 px-4 py-3 text-ember-700">
          The meal board isn&apos;t connected to a database yet. Add a Postgres store on
          Vercel (see the README) and sign-ups will appear here.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {meals.map((meal) => {
            const hosts = byMeal.get(meal.id) ?? [];
            return (
              <div key={meal.id} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-pine-900">{meal.name}</h3>
                  <span className="text-sm text-pine-500">{meal.when}</span>
                </div>

                {hosts.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {hosts.map((h) => (
                      <li key={h.id} className="flex items-start gap-2 rounded-lg bg-pine-50 px-3 py-2">
                        <span>👩‍🍳</span>
                        <span className="flex-1">
                          <span className="font-medium text-pine-900">{h.name}</span>
                          {h.notes ? <span className="block text-sm text-pine-500">{h.notes}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-pine-500">Nobody signed up yet — host this one below.</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-display text-2xl font-bold text-pine-900">Host a meal</h3>
        <p className="mt-2 text-pine-700">Pick a meal you&apos;d like to take charge of.</p>
        <div className="mt-6">
          <MealSignupForm meals={meals} />
        </div>
      </div>
    </div>
  );
}
