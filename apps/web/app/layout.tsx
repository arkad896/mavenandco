import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Maven & Co. | Premier Digital Product & Systems Engineering Studio",
  description: "Maven & Co. designs and engineers custom software suites, type-safe fullstack architectures, and high-performance automation ecosystems for ambitious modern enterprises.",
  keywords: [
    "digital product studio",
    "custom software development",
    "systems engineering team",
    "type-safe fullstack systems",
    "WhatsApp automation enterprise",
    "custom CRM platforms",
    "custom operating systems",
    "branding and creative agency",
    "Maven studio",
    "Kolkata software agency"
  ],
  authors: [{ name: "Maven & Co." }],
  openGraph: {
    title: "Maven & Co. | Premier Digital Product & Systems Engineering Studio",
    description: "Custom software suites, type-safe fullstack architectures, and high-performance automation ecosystems under a dedicated team model.",
    type: "website",
    locale: "en_IN",
    siteName: "Maven & Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven & Co. | Digital Product Studio",
    description: "Custom software, type-safe systems, and enterprise automations engineered by a dedicated multi-disciplinary team.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { TRPCProvider } from "./components/TRPCProvider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Maven & Co.",
  "description": "Premier digital product and systems engineering studio designing and developing custom software, fullstack architectures, and automation ecosystems.",
  "url": "https://itsmaven.in",
  "provider": {
    "@type": "Organization",
    "name": "Maven & Co.",
    "url": "https://itsmaven.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} bg-[#12352A] text-[#FDFCF0]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-body antialiased bg-[#12352A] text-[#FDFCF0]">
        <div className="grain" aria-hidden="true" />
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}

