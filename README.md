# 🍁 Marktoberfest — Birthday Cabin Weekend

A ready-to-deploy, **single-page** website for a birthday cabin weekend, built with
**Next.js** and designed to run on **Vercel**. Guests scroll through each section
(RSVP, meals, explore).

## Features

- **One-page layout** with a fall-foliage hero, live countdown, and anchor nav that
  scrolls to each section.
- **RSVP** — Yes / Maybe / No, party size, dietary needs, arrival time, and
  travel/ride details. Everything is saved to a database; hosts see travel details
  in the dashboard to coordinate rides.
- **Meal sign-up** — guests sign up to host (plan & cook) a meal.
- **Explore** — seasonal fall activities around Davis & Thomas, WV.
- **Host dashboard** (`/admin`) — password-protected view of every response with contact
  details, headcount, and one-click **CSV export**.

## Customize your event

Everything about the event lives in one file: **`lib/config.ts`**.
Edit the guest of honor, dates, address, meals, and area activities there.
No other files need changing.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no database configured, RSVPs are saved to a local
file at `.data/rsvps.json` so you can test everything immediately.

## Deploy to Vercel

1. Push this repo to GitHub (already on branch `claude/birthday-cabin-website-rr3zei`).
2. In [Vercel](https://vercel.com), click **New Project** and import the repo.
3. **Add a database** (this is what makes RSVPs persist):
   - In your project go to the **Storage** tab → **Create Database** → **Postgres**.
   - Vercel automatically adds the `POSTGRES_URL` environment variable. The table is
     created on the first RSVP — nothing else to set up.
4. **Set the host password**: Project **Settings → Environment Variables** →
   add `ADMIN_PASSWORD` with a value only the hosts know (this protects `/admin`).
5. **Redeploy**. Done 🎉

> ⚠️ The `.data/rsvps.json` fallback only works locally. On Vercel's serverless
> filesystem it won't persist, so add the Postgres store before sharing the link.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `POSTGRES_URL` | Vercel Postgres connection (added automatically when you create the store). Leave blank locally for the JSON fallback. |
| `ADMIN_PASSWORD` | Password for the `/admin` host dashboard. Defaults to `changeme` — **change it**. |

See `.env.example` for a template.

## Project structure

```
app/
  page.tsx            The whole single-page site (all sections)
  admin/              Password-protected host dashboard
  api/rsvp/           POST endpoint that saves an RSVP
  api/meals/          POST endpoint that saves a meal sign-up
  api/admin/rsvps/    POST endpoint (password) returning all RSVPs
components/           Section + UI components (Nav, Countdown, boards, forms, dashboard)
lib/config.ts         ⭐ All event details — edit this
lib/db.ts             Storage layer (Postgres + local JSON fallback)
```
