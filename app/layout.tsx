import type { Metadata, Viewport } from "next";
import "./globals.css";
import { event } from "@/lib/config";
import { getSettings } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: event.title,
  description: event.tagline,
  openGraph: {
    title: event.heroTitle,
    description: `${event.dateRangeDisplay} · Davis, WV — ${event.tagline}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7f251c",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let hideCarpool = false;
  try {
    hideCarpool = (await getSettings()).hideCarpool;
  } catch {
    // settings unavailable (no DB yet) — show everything by default
  }

  return (
    <html lang="en">
      <body>
        <Nav hideCarpool={hideCarpool} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
