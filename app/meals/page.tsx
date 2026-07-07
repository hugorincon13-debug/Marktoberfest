import { event, meals } from "@/lib/config";
import { getMealSignups, type MealSignup } from "@/lib/db";
import { MealSignupForm } from "@/components/MealSignupForm";

export const metadata = { title: `Meals · ${event.title}` };
export const dynamic = "force-dynamic";

export default async function MealsPage() {
  let signups: MealSignup[] = [];
  let dbError = false;
  try {
    signups = await getMealSignups();
  } catch {
    dbError = true;
  }

  const byMeal = new Map<string, MealSignup[]>();
  for (const s of signups) {
    if (!byMeal.has(s.meal_id)) byMeal.set(s.meal_id, []);
    byMeal.get(s.meal_id)!.push(s);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">🍽️ Meal sign-up</h1>
          <p className="mt-2 max-w-2xl text-pine-700">
            Sign up to host a meal — you&apos;re on the hook for planning and cooking it
            (grab a co-host or two if you like). No need to say exactly what yet.
          </p>
        </div>
        <a href="#signup" className="btn-primary">Sign up to host</a>
      </div>

      {dbError && (
        <p className="mt-8 rounded-xl bg-ember-50 px-4 py-3 text-ember-700">
          The meal board isn&apos;t connected to a database yet. Add a Postgres store on
          Vercel (see the README) and sign-ups will appear here.
        </p>
      )}

      {!dbError && (
        <div className="mt-8 space-y-4">
          {meals.map((meal) => {
            const hosts = byMeal.get(meal.id) ?? [];
            return (
              <div key={meal.id} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-pine-900">{meal.name}</h2>
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
                  <p className="mt-3 text-sm text-pine-500">
                    Nobody signed up yet — <a href="#signup" className="font-semibold text-ember-600 hover:underline">host this one?</a>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div id="signup" className="mt-12 scroll-mt-20">
        <h2 className="section-title">Host a meal</h2>
        <p className="mt-2 text-pine-700">Pick a meal you&apos;d like to take charge of.</p>
        <div className="mt-6">
          <MealSignupForm meals={meals} />
        </div>
      </div>
    </div>
  );
}
