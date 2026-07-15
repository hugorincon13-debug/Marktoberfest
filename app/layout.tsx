import type { Metadata, Viewport } from "next";
import "./globals.css";
import { event } from "@/lib/config";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: event.title,
  description: `${event.subtitle} · ${event.dateRangeDisplay}`,
  openGraph: {
    title: event.heroTitle,
    description: `${event.dateRangeDisplay} · ${event.publicLocation}`,
    type: "website",
    images: ["/logo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e301d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
