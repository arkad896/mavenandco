import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Chatbot & CRM Autopilot | Maven & Co.",
  description: "Automate guest reservations, seasonal menu updates, and host stand waitlists directly inside WhatsApp. Deeply integrated with Toast and Clover capacities.",
  keywords: [
    "WhatsApp CRM autopilot",
    "hospitality chat automation",
    "restaurant chatbot reservation",
    "automated waitlist restaurant",
    "digital menu WhatsApp",
    "Toast CRM synchronization",
    "Maven automated hospitality"
  ],
  openGraph: {
    title: "WhatsApp Chatbot & CRM Autopilot | Maven & Co.",
    description: "Automate guest reservations, seasonal menu updates, and host stand waitlists directly inside WhatsApp.",
    type: "website",
    url: "https://itsmaven.in/automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chatbot & CRM Autopilot | Maven & Co.",
    description: "Automate guest reservations, seasonal menu updates, and host stand waitlists directly inside WhatsApp.",
  }
};

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
