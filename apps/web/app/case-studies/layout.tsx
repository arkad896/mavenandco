import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality Success Stories & Operational Case Studies | Maven & Co.",
  description: "Real metrics, verified margins, and precise tactical breakdowns of food brands that unified their marketing, POS, and CRM under the Maven OS.",
  keywords: [
    "restaurant case studies",
    "hospitality business success",
    "direct table booking results",
    "restaurant software ROI",
    "Maven success stories",
    "Kolkata dining telemetry"
  ],
  openGraph: {
    title: "Hospitality Success Stories & Operational Case Studies | Maven & Co.",
    description: "See exactly how premium bistros, cloud kitchens, and cafes cut commission leakage and scaled repeat covers with Maven OS.",
    type: "website",
    url: "https://itsmaven.in/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven & Co. Success Stories",
    description: "Audited operational results and margins from active hospitality brands.",
  }
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
