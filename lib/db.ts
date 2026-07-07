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
  departure_city: string;
  carpool_role: CarpoolRole;
  seats_available: number;
  arrival_time: string;
  dietary: string;
  bringing: string;
  notes: string;
  created_at: string;
}

export type NewRsvp = Omit<Rsvp, "id" | "created_at">;

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
          departure_city TEXT NOT NULL DEFAULT '',
          carpool_role TEXT NOT NULL DEFAULT 'none',
          seats_available INTEGER NOT NULL DEFAULT 0,
          arrival_time TEXT NOT NULL DEFAULT '',
          dietary TEXT NOT NULL DEFAULT '',
          bringing TEXT NOT NULL DEFAULT '',
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
const dataFile = path.join(dataDir, "rsvps.json");

async function readFile(): Promise<Rsvp[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as Rsvp[];
  } catch {
    return [];
  }
}

async function writeFile(rows: Rsvp[]): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(rows, null, 2), "utf8");
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
        id, name, email, attending, party_size, departure_city,
        carpool_role, seats_available, arrival_time, dietary, bringing, notes
      ) VALUES (
        ${record.id}, ${record.name}, ${record.email}, ${record.attending},
        ${record.party_size}, ${record.departure_city}, ${record.carpool_role},
        ${record.seats_available}, ${record.arrival_time}, ${record.dietary},
        ${record.bringing}, ${record.notes}
      );
    `;
    return record;
  }

  const rows = await readFile();
  rows.push(record);
  await writeFile(rows);
  return record;
}

export async function getRsvps(): Promise<Rsvp[]> {
  if (usePostgres) {
    await ensureSchema();
    const sql = await getSql();
    const { rows } = await sql<Rsvp>`SELECT * FROM rsvps ORDER BY created_at ASC;`;
    return rows;
  }
  const rows = await readFile();
  return rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
}
