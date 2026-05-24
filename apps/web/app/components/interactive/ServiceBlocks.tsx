'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Share2, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  QrCode, 
  CreditCard, 
  Globe, 
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ServiceBlockDetail {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: any;
  bullets: string[];
  metrics: string;
  specDetails: { label: string; value: string }[];
}

interface ServiceBlocksProps {
  onPrefillInquiry: (note: string) => void;
}

export default function ServiceBlocks({ onPrefillInquiry }: ServiceBlocksProps) {
  const [activeBlock, setActiveBlock] = useState<number>(1);

  const blocks: ServiceBlockDetail[] = [
    {
      id: 1,
      title: "Paid Social Advertising",
      shortDesc: "Hyper-targeted campaigns converting local radius footfall.",
      fullDesc: "Precision-engineered Facebook and Instagram ad campaigns. We don't boost generic posts; we construct localized funnels targeting high-intent demographics within a physical radius of your location. We handle absolute creative production, copywriting, audience profiling, daily budget optimization, and raw transparency reporting.",
      icon: Zap,
      metrics: "Average 4.2x ROI on geofenced ad budgets",
      bullets: [
        "Geofenced physical radius target profiling",
        "A/B creative testing & custom copywriting",
        "Dynamic budget & bid optimizations",
        "Interactive dashboard performance metrics"
      ],
      specDetails: [
        { label: "Targeting Resolution", value: "Within 1-5 km physical radius" },
        { label: "Asset Cycles", value: "Bi-weekly creative refreshes" },
        { label: "Attribution Setup", value: "Pixel & CAPI deep-linked" }
      ]
    },
    {
      id: 2,
      title: "Organic Social Content",
      shortDesc: "Brand identity narratives cross-posted automatically.",
      fullDesc: "Premium content production capturing your brand authority. We write high-conversion Instagram Reels scripts, manage grid planning, compile story sequences, and write engaging captions. Every update is automatically cross-posted to Google Maps and Apple Maps, maintaining absolute discoverability.",
      icon: Share2,
      metrics: "100% automated multi-channel synchronization",
      bullets: [
        "Custom Reels scripting & production guidance",
        "Cross-platform grid & story sequence layouts",
        "Auto-syndication to Google & Apple Maps",
        "Complete aesthetic brand-matching style guide"
      ],
      specDetails: [
        { label: "Posting Frequency", value: "3-4 custom reels & posts per week" },
        { label: "Cross-syndication", value: "Google Maps & Apple Maps Auto-sync" },
        { label: "Creative Approval", value: "Interactive preview link prior to go-live" }
      ]
    },
    {
      id: 3,
      title: "Local SEO",
      shortDesc: "Dominating local intent searches at the top of maps.",
      fullDesc: "Positions your business at the absolute peak of local search listings. We execute directory citations across hundreds of local registers, inject custom JSON-LD schema structured data directly onto your site, manage reviews, and automate feedback request campaigns following client checkouts.",
      icon: TrendingUp,
      metrics: "#1 position rankings for high-intent searches",
      bullets: [
        "Structured Schema.org structured data injections",
        "Directory citation building across 200+ local sites",
        "Automated post-checkout review generation",
        "Google Business Profile optimization audits"
      ],
      specDetails: [
        { label: "Review Automation", value: "Triggered via post-checkout WhatsApp hook" },
        { label: "Directory Footprint", value: "Sync active across 200+ directories" },
        { label: "Schema Integration", value: "Custom JSON-LD LocalBusiness injection" }
      ]
    },
    {
      id: 4,
      title: "WhatsApp Cloud API",
      shortDesc: "Meta cloud gateways automating reservation & intake loops.",
      fullDesc: "Full Meta API integrations to handle client communications on autopilot. We secure an official green-tick verified WhatsApp business profile for your brand and configure automated booking confirmations, transaction receipts, appointment reminders, and lapsed customer win-back flows.",
      icon: MessageSquare,
      metrics: "98% open-rate automated customer communications",
      bullets: [
        "Verified green-tick business profile provisioning",
        "Automated booking confirmations & receipts",
        "Transaction-triggered follow-up campaigns",
        "Custom interactive natural language text menus"
      ],
      specDetails: [
        { label: "Integration Gateway", value: "Meta Official Cloud API node" },
        { label: "Verification Status", value: "Green-tick application managed" },
        { label: "Message Latency", value: "Instant (under 1.2s delivery)" }
      ]
    },
    {
      id: 5,
      title: "Customer CRM & Loyalty",
      shortDesc: "Database tracking visit history and auto win-backs.",
      fullDesc: "Deep database profiling that logs every customer touchpoint—visit histories, ticket sizes, product preferences, and milestone dates. The system automatically triggers highly personalized WhatsApp offers, birthday gifts, and automated win-back voucher campaigns if a customer hasn't returned in 30 days.",
      icon: Users,
      metrics: "Up to 24% customer reactivation rates",
      bullets: [
        "Detailed spending & preference behavior profiles",
        "Automated milestone sequences (birthdays, anniversaries)",
        "30-day automated customer win-back alerts",
        "Dynamic tier-based custom discount rewards"
      ],
      specDetails: [
        { label: "Data Ownership", value: "100% Client owned, GDPR compliant" },
        { label: "Automation Trigger", value: "Dynamic lapse detection (30/45 days)" },
        { label: "Milestone Engine", value: "Automatic timezone-adjusted scheduling" }
      ]
    },
    {
      id: 6,
      title: "QR-Based Interaction",
      shortDesc: "Branded scan nodes powering table orders or bookings.",
      fullDesc: "Branded QR code triggers placed physically inside your locations. Customers scan to access custom digital menus, booking schedules, admission forms, or catalogues. Fully linked to your backend databases, removing physical friction and capturing emails smoothly.",
      icon: QrCode,
      metrics: "Over 85% paperless digital customer interaction",
      bullets: [
        "Custom branded vector QR code designs",
        "High-speed digital menus & service catalogues",
        "Direct backend relational database mapping",
        "Interactive digital intake & inquiry forms"
      ],
      specDetails: [
        { label: "Scan Response Time", value: "Sub-500ms global edge delivery" },
        { label: "Menu Operations", value: "Live instant database update support" },
        { label: "Lead Capture Hook", value: "Email/WhatsApp sync before selection" }
      ]
    },
    {
      id: 7,
      title: "Billing & POS Operations",
      shortDesc: "Complete transactional logs, cashiers sync, and reporting.",
      fullDesc: "A reliable point-of-sale and transaction management suite built to handle operations. It includes high-fidelity billing registries, staff role configurations, cashier reconciliations, and instant reporting. Integrates directly with kitchen screens or invoice registries depending on your vertical.",
      icon: CreditCard,
      metrics: "Zero commissions, ₹0 transaction splits",
      bullets: [
        "Cashier reconciliation & shift control reporting",
        "Multi-role user permission hierarchies",
        "Real-time kitchen display (KDS) synchronizations",
        "Custom invoice & service billing modules"
      ],
      specDetails: [
        { label: "Hardware Support", value: "Standard thermal printers & registers" },
        { label: "Commission Fee", value: "0% Flat (no transaction splits)" },
        { label: "Offline Mode", value: "Active data sync on network restore" }
      ]
    },
    {
      id: 8,
      title: "Managed Edge Website",
      shortDesc: "Custom high-performance global web hosting.",
      fullDesc: "Fully managed, premium website development and deployment. We host your site on global edge CDN networks for instantaneous loading speeds. Our team handles complete maintenance, SSL certificates, dynamic optimization, and prompt content updates.",
      icon: Globe,
      metrics: "100/100 Google PageSpeed performance score",
      bullets: [
        "Global Edge CDN server deployment",
        "Automatic SSL certificates & domain setups",
        "Complete technical maintenance & SEO audits",
        "Unlimited custom content copy updates"
      ],
      specDetails: [
        { label: "Hosting Infrastructure", value: "Cloudflare Edge CDN nodes" },
        { label: "Maintenance Support", value: "Managed, zero operational cost" },
        { label: "Performance Tuning", value: "Automated dynamic asset compressions" }
      ]
    }
  ];

  const active = blocks.find(b => b.id === activeBlock) || blocks[0];
  const ActiveIcon = active.icon;

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3 block">Custom Operations Stack</span>
        <h3 className="text-3xl sm:text-5xl font-serif text-maven-cream font-medium leading-tight">
          The 8 Service Blocks in Plain Language
        </h3>
        <p className="text-xs sm:text-sm text-maven-muted mt-2">
          Maven replaces every fragmented digital vendor and standalone software with one managed service, one flat subscription, and one single partner.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: 8 Blocks Selector Buttons */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold px-2 text-left mb-1">Core Modules</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {blocks.map(block => {
              const BlockIcon = block.icon;
              const isSelected = block.id === activeBlock;
              
              return (
                <button
                  key={block.id}
                  onClick={() => {
                    setActiveBlock(block.id);
                  }}
                  className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 focus:outline-none ${
                    isSelected 
                      ? 'bg-maven-green-dark border-maven-gold/60 shadow-md text-maven-cream' 
                      : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-maven-gold text-maven-green-dark border-maven-gold' : 'bg-maven-green-dark text-maven-gold border-maven-gold/20'
                  }`}>
                    <BlockIcon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-xs font-semibold font-mono tracking-tight leading-none">{block.title}</span>
                    <span className="block text-[8px] font-mono text-maven-gold uppercase mt-1 leading-none">Block 0{block.id}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Block Deep Dive Display */}
        <div className="lg:col-span-7 bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-inner">
          <div className="absolute top-4 right-6 bg-maven-gold/10 border border-maven-gold/20 text-maven-gold text-[9px] font-mono tracking-widest uppercase font-bold py-1 px-3.5 rounded-full">
            Block 0{active.id}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 flex-1 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Header Icon + Titles */}
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-maven-gold/10 border border-maven-gold/30 flex items-center justify-center text-maven-gold shrink-0">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold text-maven-cream leading-tight">{active.title}</h4>
                    <span className="text-[10px] font-mono text-maven-gold uppercase tracking-wider block mt-0.5">{active.shortDesc}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-maven-cream/80 leading-relaxed font-body">
                  {active.fullDesc}
                </p>

                {/* Bullets Specifications */}
                <div className="border-t border-maven-cream/10 pt-4 space-y-2">
                  <span className="text-[9px] font-mono text-maven-gold tracking-widest uppercase block">Module Scope Details:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-maven-cream/90 font-mono">
                    {active.bullets.map((b, i) => (
                      <div key={i} className="flex gap-2 items-center leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-maven-gold shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Specs Panel */}
              <div className="mt-8 bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-maven-cream/15 pb-2">
                  <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold">Standard Performance SLA</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">
                    {active.metrics}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-mono">
                  {active.specDetails.map((spec, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="block text-[8px] text-maven-muted uppercase leading-none">{spec.label}</span>
                      <span className="block font-bold text-maven-cream mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          <div className="border-t border-maven-cream/5 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-maven-muted font-mono">
              Fully configured & maintained under one flat rate.
            </span>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {(active.id === 4 || active.id === 7) && (
                <Link
                  href="/hospitality"
                  className="border border-maven-gold/30 hover:border-maven-gold text-maven-gold bg-maven-gold/5 hover:bg-maven-gold hover:text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-1.5 shadow-sm"
                >
                  Explore Hearth OS Showcase
                  <Sparkles className="w-3 h-3 animate-pulse text-maven-gold" />
                </Link>
              )}
              <button
                onClick={() => onPrefillInquiry(`Requesting deep dive regarding Service Block ${active.id}: ${active.title}.`)}
                className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all focus:outline-none flex items-center gap-1 group"
              >
                Request Block Demo
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
