import type { Metadata, Viewport } from "next";
import "./globals.css";
import { event } from "@/lib/config";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: event.title,
  description: event.tagline,
  openGraph: {
    title: event.heroTitle,
    description: `${event.dateRangeDisplay} · Davis, WV — ${event.tagline}`,
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
        <Footer />
      </body>
    </html>
  );
}
