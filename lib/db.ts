import { promises as fs } from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────
// Storage layer.
//
// If POSTGRES_URL is set (automatic on Vercel once you add a Postgres
// store), we persist RSVPs to Postgres. Otherwise we fall back to a
// local JSON file so the site works instantly during local dev.
//
// NOTE: the JSON fallback does NOT persist on Vercel's serverless
// filesystem — add a Postgres store before going live. See README.
// ─────────────────────────────────────────────────────────────

export type Attending = "yes" | "no" | "maybe";
export type CarpoolRole = "driving" | "need_ride" | "either" | "none";

export interface Rsvp {
  id: string;
  name: string;
  email: string;
  attending: Attending;
  party_size: number;
  party_names: string;
  departure_city: string;
  carpool_role: CarpoolRole;
  seats_available: number;
  arrival_time: string;
  dietary: string;
  notes: string;
  created_at: string;
}

export type NewRsvp = Omit<Rsvp, "id" | "created_at">;

export interface MealSignup {
  id: string;
  meal_id: string;
  name: string;
  notes: string;
  created_at: string;
}

export type NewMealSignup = Omit<MealSignup, "id" | "created_at">;

const usePostgres = !!process.env.POSTGRES_URL;

// ── Postgres backend ─────────────────────────────────────────
async function getSql() {
  const { sql } = await import("@vercel/postgres");
  return sql;
}

let schemaReady: Promise<void> | null = null;
async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = await getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS rsvps (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          attending TEXT NOT NULL,
          party_size INTEGER NOT NULL DEFAULT 1,
          party_names TEXT NOT NULL DEFAULT '',
          departure_city TEXT NOT NULL DEFAULT '',
          carpool_role TEXT NOT NULL DEFAULT 'none',
          seats_available INTEGER NOT NULL DEFAULT 0,
          arrival_time TEXT NOT NULL DEFAULT '',
          dietary TEXT NOT NULL DEFAULT '',
          notes TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS meal_signups (
          id TEXT PRIMARY KEY,
          meal_id TEXT NOT NULL,
          name TEXT NOT NULL,
          notes TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
    })();
  }
  return schemaReady;
}

// ── JSON file backend (local dev fallback) ───────────────────
const dataDir = path.join(process.cwd(), ".data");

async function readFile<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeFile<T>(file: string, rows: T[]): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(rows, null, 2), "utf8");
}

// ── Public API ───────────────────────────────────────────────
export async function addRsvp(input: NewRsvp): Promise<Rsvp> {
  const record: Rsvp = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  if (usePostgres) {
    await ensureSchema();
    const sql = await getSql();
    await sql`
      INSERT INTO rsvps (
        id, name, email, attending, party_size, party_names, departure_city,
        carpool_role, seats_available, arrival_time, dietary, notes
      ) VALUES (
        ${record.id}, ${record.name}, ${record.email}, ${record.attending},
        ${record.party_size}, ${record.party_names}, ${record.departure_city},
        ${record.carpool_role}, ${record.seats_available}, ${record.arrival_time},
        ${record.dietary}, ${record.notes}
      );
    `;
    return record;
  }

  const rows = await readFile<Rsvp>("rsvps.json");
  rows.push(record);
  await writeFile("rsvps.json", rows);
  return record;
}

export async function getRsvps(): Promise<Rsvp[]> {
  if (usePostgres) {
    await ensureSchema();
    const sql = await getSql();
    const { rows } = await sql<Rsvp>`SELECT * FROM rsvps ORDER BY created_at ASC;`;
    return rows;
  }
  const rows = await readFile<Rsvp>("rsvps.json");
  return rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export async function addMealSignup(input: NewMealSignup): Promise<MealSignup> {
  const record: MealSignup = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  if (usePostgres) {
    await ensureSchema();
    const sql = await getSql();
    await sql`
      INSERT INTO meal_signups (id, meal_id, name, notes)
      VALUES (${record.id}, ${record.meal_id}, ${record.name}, ${record.notes});
    `;
    return record;
  }

  const rows = await readFile<MealSignup>("meal_signups.json");
  rows.push(record);
  await writeFile("meal_signups.json", rows);
  return record;
}

export async function getMealSignups(): Promise<MealSignup[]> {
  if (usePostgres) {
    await ensureSchema();
    const sql = await getSql();
    const { rows } = await sql<MealSignup>`SELECT * FROM meal_signups ORDER BY created_at ASC;`;
    return rows;
  }
  const rows = await readFile<MealSignup>("meal_signups.json");
  return rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
}
