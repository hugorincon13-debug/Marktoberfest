import type { Metadata } from "next";
import "./globals.css";
import { event } from "@/lib/config";
import { getSettings } from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: event.title,
  description: event.tagline,
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
