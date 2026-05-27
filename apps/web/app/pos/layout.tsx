import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS Infrastructure Integration | Maven & Co.",
  description: "Aggregates Toast webhooks, Clover REST, and Square GraphQL events into a unified, secure, local database layer with offline capabilities and zero lag.",
  keywords: [
    "POS integration",
    "Toast webhook integration",
    "Clover API sync",
    "Square GraphQL restaurant",
    "offline POS storage",
    "restaurant hardware database",
    "dual-write database restaurant"
  ],
  openGraph: {
    title: "POS Infrastructure Integration | Maven & Co.",
    description: "Connect Toast, Clover, and Square terminals into a single high-performance dual-write database layer.",
    type: "website",
    url: "https://itsmaven.in/pos",
  },
  twitter: {
    card: "summary_large_image",
    title: "POS Infrastructure Integration | Maven & Co.",
    description: "Connect Toast, Clover, and Square terminals into a single high-performance dual-write database layer.",
  }
};

export default function PosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
