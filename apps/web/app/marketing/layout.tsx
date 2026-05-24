import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Ads & Radius Paid Social Engine | Maven & Co.",
  description: "Target local dining and retail customers with hyper-precise 1-3km radius paid social targeting integrated directly with Toast & Clover POS. 6.8x average simulated ROAS.",
  keywords: [
    "paid social advertising",
    "Meta ads for restaurants",
    "hyperlocal radius targeting",
    "POS transaction lookalikes",
    "restaurant check size optimizer",
    "Maven marketing engine",
    "Clover CRM ads sync",
    "local footfall advertising"
  ],
  openGraph: {
    title: "Meta Ads & Radius Paid Social Engine | Maven & Co.",
    description: "Saturate your physical venue radius. Maven builds dynamic micro-radius ad campaigns synced directly to your live seat inventory and POS transaction history.",
    type: "website",
    url: "https://mavenandco.in/marketing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Ads & Radius Paid Social Engine | Maven & Co.",
    description: "Hyper-precise 1-3km radius paid social targeting integrated directly with Toast & Clover POS.",
  }
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


