import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Maven & Co.",
  description: "Read our privacy integrity protocols, data ingestion frameworks, and DPDP compliance statements.",
  openGraph: {
    title: "Privacy Policy | Maven & Co.",
    description: "Read our privacy integrity protocols, data ingestion frameworks, and DPDP compliance statements.",
    url: "https://itsmaven.in/privacy",
  }
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
