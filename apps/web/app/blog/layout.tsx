import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality Insights, Blueprints & Guides | Maven & Co. Blog",
  description: "Analytical blueprints, operational breakdowns, and restaurant margin optimization strategies curated for modern restaurateurs, hoteliers, and cafe owners.",
  keywords: [
    "restaurant marketing insights",
    "Swiggy Zomato commission savings",
    "WhatsApp marketing hospitality",
    "restaurant CRM blueprint",
    "Maven hospitality strategy",
    "hospitality engineering guides"
  ],
  openGraph: {
    title: "Hospitality Insights, Blueprints & Guides | Maven & Co. Blog",
    description: "Reclaim your restaurant margins, build direct customer booking pipelines, and automate guest loops with our editorial insights.",
    type: "website",
    url: "https://itsmaven.in/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven & Co. Editorial Insights",
    description: "Operational and margin blueprints built exclusively for modern hospitality leaders.",
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
