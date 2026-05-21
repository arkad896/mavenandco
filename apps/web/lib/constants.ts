import { 
  MousePointerClick, 
  MessageSquare, 
  Utensils, 
  ChefHat, 
  Database, 
  Repeat,
  Users,
  BarChart3,
  Film,
  Search,
  QrCode,
  Receipt,
  Globe,
  LucideIcon
} from "lucide-react";

export interface TimelineItem {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  isFree?: boolean;
  bullets: string[];
}

export const HOW_IT_WORKS: TimelineItem[] = [
  {
    step: "01",
    icon: MousePointerClick,
    title: "Guest Discovers You",
    description: "Paid social campaigns (Meta Ads), optimized local SEO, and aesthetic Instagram content put your brand in front of high-intent local guests.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Guest Reaches Out",
    description: "Meta's official native WhatsApp Business Cloud API answers reservation inquiries and table bookings instantly 24/7. Zero leads lost.",
  },
  {
    step: "03",
    icon: Utensils,
    title: "Guest Visits",
    description: "Guests scan the branded QR code placed at the table to browse, order, and track their bill directly on their phone with zero app downloads.",
  },
  {
    step: "04",
    icon: ChefHat,
    title: "Order Flows Automatically",
    description: "Table orders flow instantly into the kitchen display system (KDS) and cashier monitor without manual entry or server double-billing.",
  },
  {
    step: "05",
    icon: Database,
    title: "Stock Updates in Real Time",
    description: "Back-of-house inventory system tracks ingredient levels per order, logging recipe consumption and auto-triggering low stock alerts.",
  },
  {
    step: "06",
    icon: Users,
    title: "Guest Data is Captured",
    description: "The built-in CRM automatically logs the guest's visit history, spend, preferences, and details without your staff having to lift a finger.",
  },
  {
    step: "07",
    icon: BarChart3,
    title: "Owner Sees Everything",
    description: "Access real-time visual revenue analytics, ingredient cost logs, peak hours, and stock health right from your mobile dashboard, anywhere.",
  },
  {
    step: "08",
    icon: Repeat,
    title: "Guest Comes Back",
    description: "Smart CRM segments trigger automated WhatsApp birthday campaigns, 30-day win-back offers, and opt-in menu announcements.",
  }
];

export const MAVEN_SERVICES: ServiceItem[] = [
  {
    id: "meta-ads",
    title: "Meta Ads (Paid Social)",
    tagline: "Drive footfall, bookings & direct online inquiries without commissions.",
    description: "Hyper-local paid campaigns on Facebook and Instagram built specifically for restaurants, hotels, cafes, and cloud kitchens.",
    icon: MousePointerClick,
    bullets: [
      "Meta Business Manager & Ads Account architecture setup",
      "Full-funnel campaign strategies (Awareness, Footfall, direct conversions)",
      "Radius & geographic audience targeting (hyper-local targeting)",
      "Visual ad creative designs (Static posts, carousels, reels-style video)",
      "A/B split testing of copywriting hooks and calls-to-action",
      "Weekly performance optimization and transparent monthly reports"
    ]
  },
  {
    id: "content-creation",
    title: "Organic Content Creation",
    tagline: "Your entire social media calendar, handled in your exact brand voice.",
    description: "Professional, premium organic social presence that builds deep trust with potential guests before they even step through your doors.",
    icon: Film,
    bullets: [
      "Custom monthly content calendars planned in advance",
      "Instagram Reels creation (Scripts, conceptual direction, edits)",
      "Premium aesthetic feed layout and multi-slide carousels",
      "Sophisticated caption copywriting capturing your brand's unique ethos",
      "High-engagement Instagram story sequences and custom highlights",
      "Coordinated cross-posting to Google Business Profiles"
    ]
  },
  {
    id: "seo",
    title: "Local SEO Optimization",
    tagline: "Show up on top of Google maps when people search for what you offer.",
    description: "Rank #1 organic search locally for your cuisine, city, and location — capturing the highest-intent organic traffic.",
    icon: Search,
    bullets: [
      "Google Business Profile (GBP) complete setup and daily optimization",
      "Local map citations, directory entries, and NAP consistency audits",
      "On-page website SEO (Meta titles, descriptions, optimized schemas)",
      "Targeted local keyword research tailored to cuisine, locations, and search intent",
      "Systematic 5-star review generation and reputation monitoring campaigns",
      "Monthly search ranking reports and crawl error resolution"
    ]
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Cloud Automation",
    tagline: "Meta's official native Cloud API answering your guests 24/7.",
    description: "An official, automated hospitality communication loop. Instant responses, booking configurations, and broadcast newsletters.",
    icon: MessageSquare,
    bullets: [
      "Official WhatsApp Business Cloud API registration (no third-party extensions)",
      "Instant reservation confirmations and table inquiry recovery flows",
      "Abandoned booking rescue alerts (automatic follow-ups on incomplete inquiries)",
      "Opt-in list broadcast campaigns (festivals, offers, new menu launches)",
      "Post-visit customer satisfaction feedback loops via automated messages",
      "Compliance-friendly, legitimate opt-in guest contact database architecture"
    ]
  },
  {
    id: "crm",
    title: "Customer CRM & Loyalty",
    tagline: "Turn first-time diners into high-value lifelong regulars.",
    description: "Segment, understand, and automatically re-engage guests based on exact order behavior, visit history, and preferences.",
    icon: Users,
    bullets: [
      "Tailored CRM dashboard built specifically for hospitality operations",
      "Advanced customer segmentation (First-timers, VIPs, lapsed guests, regulars)",
      "Detailed guest preference profiles, average check, and visit history logs",
      "Automated anniversary, birthday, and special occasion campaigns",
      "Lapsed guest win-backs ('You haven't visited in 30 days' dynamic vouchers)",
      "Integrated WhatsApp messaging templates matching segmentation categories"
    ]
  },
  {
    id: "qr-ordering",
    title: "QR Digital Table Menus",
    tagline: "Frictionless table-side digital menus with direct ordering.",
    description: "Fast, premium web-menu interfaces that allow guests to order and request split checks without downloading bulky apps.",
    icon: QrCode,
    bullets: [
      "Instant table-scan QR codes matching your interior branding",
      "Rich visual digital menus with high-res photos and allergen tags",
      "Direct-to-kitchen digital ordering flows from guest smart devices",
      "Real-time menu updating (instantly toggle out-of-stock items or adjust pricing)",
      "Smart dynamic upsell prompts built into the checkout stream",
      "Table-side waiter call, bill requests, and live order tracking"
    ]
  },
  {
    id: "pos-system",
    title: "Enterprise POS & Inventory",
    tagline: "Front-of-house billing and back-of-house inventory in one hub.",
    description: "Complete Billing, Ingredient inventory control, and Order Status system. Worth ₹5,000/mo — included fully free in your package.",
    icon: Receipt,
    isFree: true,
    bullets: [
      "Interactive Table & Order Billing management with multi-pay splits",
      "Ingredient-level Recipe Tracking (automatic ingredient deductions per order)",
      "Live Low-Stock Alerts and automated vendor purchase invoice logging",
      "Kitchen Display System (KDS) order tracking (Received → Prep → Ready → Served)",
      "Granular shift reports, cashier drawer tallies, and peak-hour revenue graphs",
      "Role-based staff logins (Cashier, Waiter, Manager, Owner)"
    ]
  },
  {
    id: "managed-website",
    title: "Managed Custom Web Portal",
    tagline: "A premium custom website built, hosted, and fully managed by Maven.",
    description: "Your digital storefront. Fully custom designed, lightning fast, optimized for search engines, and completely managed by our team.",
    icon: Globe,
    bullets: [
      "Custom premium UI layout, mobile-first design, and rich graphics",
      "High-speed, SEO-optimized, static site architecture",
      "Fully managed web hosting, SSL certificate encryption, and custom domains",
      "Real-time content updates (menus, locations, seasonal event posts)",
      "Direct integration with reservation systems and the table QR flow",
      "Ongoing analytics, speed checks, and technical optimizations"
    ]
  }
];
