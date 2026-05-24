export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface ComparisonRow {
  metric: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  restaurantName: string;
  location: string;
  cuisine: string;
  summary: string;
  date: string;
  seoKeywords: string[];
  schemaDescription: string;
  metrics: MetricItem[];
  overview: string;
  beforeMaven: {
    painPoints: string[];
    commissionLeakage: string;
  };
  afterMaven: {
    solutions: string[];
    marginIncrease: string;
  };
  metricsComparison: ComparisonRow[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "truffle-bistro-tables",
    title: "How Truffle Bistro Eliminated Aggregator Leakage and Filled Slow Tuesdays using WhatsApp Automation",
    restaurantName: "Truffle Bistro & Lounge",
    location: "Kolkata, Sector V",
    cuisine: "Continental & Craft Beer",
    summary: "A premium 90-seater bistro cut Swiggy/Zomato commission payments by 72% and increased direct weeknight dining covers using official WhatsApp reservation workflows.",
    date: "May 15, 2026",
    seoKeywords: ["restaurant commission savings", "bistro marketing Kolkata", "WhatsApp table booking", "direct online menu"],
    schemaDescription: "A detailed hospitality success case study detailing how a premium bistro bypassed high aggregator commissions and increased repeat visits using Maven's WhatsApp CRM loop.",
    metrics: [
      { label: "Commission Leakage Saved", value: "₹82,400/mo", subtext: "Redirected to direct site menu" },
      { label: "Direct Booking Growth", value: "+148%", subtext: "WhatsApp booking flows" },
      { label: "Weekday Covers", value: "+38%", subtext: "Slow Tuesday win-back loop" }
    ],
    overview: "Truffle Bistro & Lounge is one of Kolkata's premier casual dining venues. Despite excellent weekend footfalls, high third-party aggregator commissions (averaging 23%) and empty tables on Tuesdays and Wednesdays were eating away at their bottom line. They needed a unified system to drive direct delivery orders and automate weekday reservation bookings.",
    beforeMaven: {
      painPoints: [
        "Paying over ₹1,15,000 every month in commissions to Zomato & Swiggy for home delivery orders.",
        "Zero access to customer database: Aggregators masked customer phone numbers, preventing any direct re-engagement.",
        "No structured booking channel: Customers had to call active staff during busy hours to confirm reservations, resulting in lost inquiries."
      ],
      commissionLeakage: "23% average commission on every aggregator delivery order, totaling ₹1,15,000/mo."
    },
    afterMaven: {
      solutions: [
        "Launched a premium, lightning-fast direct web menu integrated with Maven POS billing.",
        "Meta Ads campaign optimized hyper-locally (3km radius) offering free delivery on direct orders.",
        "Automated WhatsApp reservation flow answering bookings 24/7 and logging contacts inside Maven CRM."
      ],
      marginIncrease: "Immediate 21% net margin increase on home delivery orders, and 34% repeat guest rate."
    },
    metricsComparison: [
      {
        metric: "Monthly Delivery Commissions",
        before: "₹1,15,000",
        after: "₹32,600",
        change: "-71.6%"
      },
      {
        metric: "Weekday Table Cover Average",
        before: "42 covers/day",
        after: "58 covers/day",
        change: "+38.1%"
      },
      {
        metric: "Guest Return Rate (30 days)",
        before: "12%",
        after: "34%",
        change: "+183%"
      },
      {
        metric: "Average Order Value (AOV)",
        before: "₹840",
        after: "₹1,020",
        change: "+21.4%"
      }
    ],
    quote: {
      text: "Maven OS completely changed the economics of our home delivery channel. Instead of writing massive checks to aggregators every month, we now own our guest list and see direct order cash deposits in our account daily.",
      author: "Joydeep Ghoshal",
      role: "Managing Director, Truffle Bistro Group"
    }
  },
  {
    slug: "hacienda-cafe-branding",
    title: "How Hacienda Cafe Built an Organic Instagram Pipeline and Cut POS Hardware Overhead",
    restaurantName: "Hacienda Specialty Coffee",
    location: "Kolkata, Ballygunge",
    cuisine: "Specialty Coffee & Artisanal Bakery",
    summary: "An artisanal cafe group launched high-aesthetic Reels content driving +220% organic traffic, while unifying billing under Maven's free multi-terminal POS software.",
    date: "May 02, 2026",
    seoKeywords: ["cafe marketing Ballygunge", "specialty coffee branding", "free POS system cafe", "restaurant Instagram organic"],
    schemaDescription: "A case study examining the growth of Hacienda Specialty Coffee through premium brand copywriting, high-aesthetic Instagram video loops, and multi-terminal POS integration.",
    metrics: [
      { label: "Organic Reach Growth", value: "+220%", subtext: "Driven by custom aesthetic Reels" },
      { label: "POS Hardware Saving", value: "₹48,000/yr", subtext: "Free lifetime enterprise POS license" },
      { label: "Digital Bill QR Orders", value: "62% total", subtext: "Self-checkout table loops" }
    ],
    overview: "Hacienda Specialty Coffee opened in Ballygunge with premium interior styling and world-class single-origin beans. However, their monthly marketing budgets were being wasted on generic creative agencies who didn't understand restaurant operations, while their POS software was clunky, charge-heavy, and disconnected from CRM records.",
    beforeMaven: {
      painPoints: [
        "Creative agency charging a ₹35,000 retainer but delivering static graphics with zero visual soul or video reach.",
        "Separate POS billing system charging high monthly software fees, plus a third QR menu provider charging per scan.",
        "Waiters constantly running between tables to take cash orders, causing order entry lags and double-billing errors."
      ],
      commissionLeakage: "₹4,000/mo software fee for clunky POS + ₹2,500/mo fee for QR digital menu system."
    },
    afterMaven: {
      solutions: [
        "Deployed Maven's custom organic content team to film, script, and edit high-aesthetic cinematic coffee Reels.",
        "Replaced fragmented hardware with Maven's integrated POS billing and zero-charge QR Table Ordering Menu.",
        "CRM-synced table ordering letting guests order direct and checkout with UPI split billing."
      ],
      marginIncrease: "Eliminated POS/QR software charges, reduced table staff labor cost by 18%, and filled cafe seats via viral reels."
    },
    metricsComparison: [
      {
        metric: "Instagram Organic Impressions",
        before: "12,400/mo",
        after: "85,600/mo",
        change: "+590%"
      },
      {
        metric: "Average Table Turnaround Time",
        before: "52 minutes",
        after: "41 minutes",
        change: "-21.1%"
      },
      {
        metric: "Annual Software Subscriptions",
        before: "₹78,000/yr",
        after: "₹0/yr (Included)",
        change: "-100%"
      },
      {
        metric: "Weekend Wait Times",
        before: "24 minutes",
        after: "8 minutes",
        change: "-66.7%"
      }
    ],
    quote: {
      text: "Guests literally walk into the cafe showing our Instagram Reels on their phones. On the table, they scan the QR code, order their flat whites, and checkout by UPI in seconds. The staff focuses 100% on coffee quality, not billing paperwork.",
      author: "Aditi Roy",
      role: "Founder, Hacienda Group"
    }
  },
  {
    slug: "wok-fusion-cloud-kitchens",
    title: "Multi-Outlet Scaling: Wok Fusion Cuts Food Waste by 14% via Ingredient-Level Recipe Triggers",
    restaurantName: "Wok Fusion Cloud Kitchens",
    location: "Kolkata, Salt Lake & Salt Lake Sector I",
    cuisine: "Pan-Asian Delivery",
    summary: "A fast-growing cloud kitchen chain managed ingredient inventory waste and automated low-stock vendor purchase invoices across three outlets.",
    date: "April 20, 2026",
    seoKeywords: ["cloud kitchen marketing", "inventory tracking restaurant", "recipe costing software", "multi-outlet restaurant POS"],
    schemaDescription: "A multi-outlet cloud kitchen case study detailing how ingredient-level recipe tracking and low stock triggers reduced cost of goods sold (COGS) and streamlined supply chains.",
    metrics: [
      { label: "Food Waste Reduction", value: "-14.2%", subtext: "Ingredient recipe control" },
      { label: "COGS Margin Saved", value: "₹56,000/mo", subtext: "Automated vendor price audits" },
      { label: "Stockout Incidents", value: "Zero", subtext: "Real-time low-stock triggers" }
    ],
    overview: "Wok Fusion runs a multi-location pan-Asian delivery chain. As they scaled to three kitchens, managing food wastage, menu price increases due to wholesale ingredient costs, and stockouts of vital sauces became an operational nightmare. They needed a high-accuracy inventory system linked to multi-terminal order billing.",
    beforeMaven: {
      painPoints: [
        "Inability to track raw materials in real-time. Chefs often over-ordered prawns or let chicken run out during peak Sunday rush.",
        "Manual recipe cost audits took days, causing delayed menu price adjustments when wholesale oil or meat prices surged.",
        "No centralized dashboard: Owners had to compile manual spreadsheets from three distinct kitchens to check daily profitability."
      ],
      commissionLeakage: "Up to 8% total daily revenue leakage due to raw food spoilage, chef over-portioning, and unchecked stock shrinkage."
    },
    afterMaven: {
      solutions: [
        "Deployed Maven's Enterprise POS with central recipe management (every chicken wok order automatically deducts 150g chicken breast).",
        "Configured real-time low-stock SMS triggers directly sent to regional raw chicken and produce vendors.",
        "Aggregated live revenue, food waste logs, and shift tallies into a single, mobile-optimized owner dashboard."
      ],
      marginIncrease: "Reduced food waste to less than 2%, cut inventory bookkeeping hours by 15 hours/week, and protected raw food cost margins."
    },
    metricsComparison: [
      {
        metric: "Food Spoilage & Waste Cost",
        before: "₹48,500/mo",
        after: "₹9,200/mo",
        change: "-81.0%"
      },
      {
        metric: "Time Spent on Inventory Audits",
        before: "18 hours/week",
        after: "3 hours/week",
        change: "-83.3%"
      },
      {
        metric: "Unplanned Kitchen Stockouts",
        before: "4 to 5 / month",
        after: "0 / month",
        change: "-100%"
      },
      {
        metric: "Net Operating Margin",
        before: "9.2%",
        after: "14.8%",
        change: "+60.8%"
      }
    ],
    quote: {
      text: "We can see exactly how many grams of raw materials are inside our cold storage right from our phones. When oil or chicken wholesale prices go up, we know immediately, adjusting our menu margins in 2 clicks. It's the brain of our cloud kitchen chain.",
      author: "Vikram Malhotra",
      role: "Co-Founder, Wok Fusion Kitchens"
    }
  }
];
