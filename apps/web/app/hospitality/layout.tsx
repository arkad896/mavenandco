import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hearth Hospitality OS | Maven & Co.",
  description: "A fully managed operating system for restaurants, cafes, cloud kitchens, and hotels. Consolidate delivery systems, WhatsApp CRM, POS, and inventory into one premium flat subscription.",
  keywords: [
    "hospitality operating system",
    "restaurant CRM",
    "delivery platform consolidation",
    "Toast POS integration",
    "managed hospitality tech",
    "Maven Hearth OS",
    "cloud kitchen software",
    "hotel dining systems"
  ],
  openGraph: {
    title: "Hearth Hospitality OS | Maven & Co.",
    description: "Replace fragmented tools with a single managed operating system for your hospitality business.",
    type: "website",
    url: "https://itsmaven.in/hospitality",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hearth Hospitality OS | Maven & Co.",
    description: "Replace fragmented tools with a single managed operating system for your hospitality business.",
  }
};

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
