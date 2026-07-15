import { event } from "@/lib/config";

// Serves a .ics file so guests can add the weekend to their calendar
// (opens directly in Apple Calendar on iPhone, works everywhere else too).

function icsDate(iso: string) {
  // "2026-10-16T16:00:00" -> "20261016T160000" (floating local time)
  return iso.replace(/[-:]/g, "");
}

export async function GET() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Marktoberfest//Birthday Cabin Weekend//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:marktoberfest-40@marktoberfest.vercel.app",
    `DTSTAMP:${icsDate(new Date().toISOString().slice(0, 19))}Z`,
    `DTSTART:${icsDate(event.startDate)}`,
    `DTEND:${icsDate(event.endDate)}`,
    `SUMMARY:${event.heroTitle}`,
    `LOCATION:${event.publicLocation}`,
    `DESCRIPTION:${event.subtitle} — exact address shared when you RSVP.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="marktoberfest.ics"',
    },
  });
}
