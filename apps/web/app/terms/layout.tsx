import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Maven & Co.",
  description: "Read our subscription terms, commission-free operational models, and legal service compacts.",
  openGraph: {
    title: "Terms of Service | Maven & Co.",
    description: "Read our subscription terms, commission-free operational models, and legal service compacts.",
    url: "https://itsmaven.in/terms",
  }
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
