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
  title: "Maven & Co. | The Complete Hospitality Operating System",
  description: "Maven is the all-in-one hospitality operating system — Meta Ads, WhatsApp automation, enterprise POS, inventory tracking, and premium branding under one flat monthly subscription. Built for restaurants, cafes, hotels, cloud kitchens, and resorts.",
  keywords: [
    "hospitality marketing agency",
    "restaurant marketing India",
    "hospitality operating system",
    "Meta ads for restaurants",
    "WhatsApp automation hospitality",
    "free POS system",
    "restaurant POS India",
    "cloud kitchen marketing",
    "hotel digital marketing",
    "cafe branding agency",
    "Maven hospitality OS",
    "Kolkata marketing agency"
  ],
  authors: [{ name: "Maven & Co." }],
  openGraph: {
    title: "Maven & Co. | The Complete Hospitality Operating System",
    description: "Marketing + Automation + Technology — all under one flat monthly subscription. Built for restaurants, cafes, hotels, cloud kitchens, and resorts.",
    type: "website",
    locale: "en_IN",
    siteName: "Maven Hospitality OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven & Co. | Hospitality OS",
    description: "The entire operating system for your hospitality brand. Meta Ads, WhatsApp automation, enterprise POS, and more — one subscription.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { TRPCProvider } from "./components/TRPCProvider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maven Hospitality OS",
  "description": "All-in-one hospitality operating system providing Meta Ads management, WhatsApp automation, enterprise POS, inventory tracking, and premium branding.",
  "operatingSystem": "All",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "29999",
    "priceCurrency": "INR",
    "priceValidUntil": "2027-12-31",
  },
  "provider": {
    "@type": "Organization",
    "name": "Maven & Co.",
    "url": "https://mavenandco.in",
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

