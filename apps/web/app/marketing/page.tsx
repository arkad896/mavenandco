'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, TrendingUp, Target, Users, Megaphone } from 'lucide-react';
import Logo from '../components/Logo';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Maven Paid Social Engine",
  "description": "Enterprise paid social automation and 1km precision micro-radius ad engine synced directly to POS Clover and Toast transaction history.",
  "brand": {
    "@type": "Brand",
    "name": "Maven & Co."
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "20999",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://itsmaven.in/marketing"
  }
};

export default function MarketingFocusPage() {
  const [selectedType, setSelectedType] = useState<'dining' | 'cafe' | 'lounge'>('dining');

  const creativeThemes = {
    dining: {
      title: "The Ephemeral Table",
      desc: "Weekly Tasting Menu experience by Chef Laurent. Limited to 12 covers per evening.",
      badge: "Fine Dining",
      imageText: "✨ LAURENT'S FINE BISTRO ✨",
      tagline: "Reservations open for June tasting cycle. 86% booked.",
      spend: "$120/day",
      roas: "7.8x",
    },
    cafe: {
      title: "Artisanal Brew & Brunch",
      desc: "Fresh croissants baked on the hour, paired with our house-roasted single origin espresso.",
      badge: "Cafe & Bakery",
      imageText: "☕ BRUNCH & BREW ☕",
      tagline: "Claim a complimentary signature brew with your first pastry.",
      spend: "$45/day",
      roas: "5.4x",
    },
    lounge: {
      title: "Midnight Alchemy",
      desc: "Handcrafted botanical mixology and live vinyl jazz sets in our hidden parlor.",
      badge: "Lounge & Bar",
      imageText: "🍸 THE MIXOLOGY LAB 🍸",
      tagline: "VIP Parlor table bookings now active. Skip-the-line priority.",
      spend: "$150/day",
      roas: "9.2x",
    }
  };

  const activeCreative = creativeThemes[selectedType];

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#12352A] rounded-full filter blur-[120px] opacity-30 pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full filter blur-[100px] opacity-20 pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="border-b border-[#FDFCF0]/10 backdrop-blur-md sticky top-0 z-50 bg-[#081a15]/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono">Back to Platform</span>
          </Link>
          <div className="flex items-center gap-2">
            <Logo variant="monogram" size="sm" />
            <span className="font-serif italic text-lg tracking-wider font-bold leading-none">MAVEN</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] font-mono leading-none">OS</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12352A] border border-[#C9A84C]/20 text-[#C9A84C] text-[11px] font-mono tracking-wider uppercase">
            <Megaphone className="h-3 w-3" />
            Meta Ads & Paid Social Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight">
            Stop Guessing. <br />
            <span className="italic text-[#C9A84C]">Saturate Your Radius.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#FDFCF0]/60 font-mono leading-relaxed">
            The only paid social automation built explicitly for premium venues. Maven syncs directly with your live seat occupancy and reservation catalog to dynamically spin up high-converting ad units.
          </p>
        </motion.div>
      </section>

      {/* Interactive Bento Showcase */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ad Targeting Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-2 border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-serif">1km Precision Micro-Radius Targeting</h2>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              Standard ad platforms target broad zip codes, burning your marketing budget on consumers out of driving distance. Maven targets active dinner crowds in a hyper-focused 1-3km radius around your coordinate pin, dynamically dialing up bid limits during off-peak hours to secure lunch covers or filling late-night bar seats.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FDFCF0]/5 font-mono text-center">
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">WASTED IMPRESSIONS</div>
              <div className="text-lg font-bold text-red-400">-94%</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">AVERAGE ROAS</div>
              <div className="text-lg font-bold text-[#C9A84C]">6.8x</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">CONVERSION RISE</div>
              <div className="text-lg font-bold text-emerald-400">+42%</div>
            </div>
          </div>
        </motion.div>

        {/* Lookalike Audience Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-serif">POS Lookalikes</h2>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              Instantly sync your POS guest history (Toast, Clover, SevenRooms) into hashed Meta Custom Audiences. Maven finds matching profiles who spend equivalent check averages nearby.
            </p>
          </div>
          <div className="p-3 bg-[#12352A]/30 border border-[#FDFCF0]/5 rounded-xl font-mono text-[10px] text-emerald-400 flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3" /> Real-time Hashed Sync Enabled
          </div>
        </motion.div>
      </section>

      {/* Interactive Creator Preview */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="border border-[#FDFCF0]/10 rounded-3xl bg-[#091a15] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Settings Console */}
          <div className="p-8 md:p-12 space-y-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#FDFCF0]/10">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">Dynamic Creative Builder</span>
              <h2 className="text-3xl font-serif">Instant Creative Playbooks</h2>
              <p className="text-xs font-mono text-[#FDFCF0]/60 leading-relaxed">
                Click a venue style below to see how Maven’s AI adapts the local visual layout, dynamic CTA messaging, and targets local patrons according to peak food-traffic windows.
              </p>
            </div>

            {/* Selection Toggles */}
            <div className="flex gap-2 font-mono text-xs">
              {(['dining', 'cafe', 'lounge'] as const).map((type) => (
                <button
                  key={type}
                  id={`btn-toggle-creative-${type}`}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-center transition-all duration-300 capitalize ${
                    selectedType === type
                      ? 'bg-[#C9A84C] text-[#081a15] border-[#C9A84C] font-semibold shadow-lg shadow-[#C9A84C]/10'
                      : 'border-[#FDFCF0]/10 hover:border-[#C9A84C]/50 hover:bg-[#12352A]/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-2 gap-4 bg-[#12352A]/20 border border-[#FDFCF0]/5 p-4 rounded-2xl font-mono text-xs">
              <div>
                <div className="text-[#FDFCF0]/40 text-[10px]">CAMPAIGN BUDGET</div>
                <div className="text-sm font-semibold mt-1">{activeCreative.spend}</div>
              </div>
              <div>
                <div className="text-[#FDFCF0]/40 text-[10px]">SIMULATED ROAS</div>
                <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w.5 w-3.5" />
                  {activeCreative.roas}
                </div>
              </div>
            </div>
          </div>

          {/* Social Mockup Preview */}
          <div className="p-8 md:p-12 bg-[#0c241e]/50 flex items-center justify-center">
            <div className="w-full max-w-[280px] bg-[#091a15] border border-[#FDFCF0]/10 rounded-2xl overflow-hidden shadow-2xl font-sans text-xs">
              {/* Instagram App Header */}
              <div className="px-3.5 py-3 border-b border-[#FDFCF0]/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center font-serif text-[10px] text-[#C9A84C]">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-[11px] leading-none">maven_os_bot</div>
                    <div className="text-[9px] text-[#FDFCF0]/40">Sponsored</div>
                  </div>
                </div>
                <span className="font-bold tracking-tight text-[#FDFCF0]/60">...</span>
              </div>

              {/* Ad Image Mockup */}
              <div className="aspect-square bg-gradient-to-br from-[#12352A] to-[#081a15] p-6 flex flex-col justify-between border-b border-[#FDFCF0]/5 relative">
                <div className="text-[10px] font-mono tracking-widest text-[#C9A84C]">{activeCreative.badge}</div>
                <div className="text-center font-serif italic text-lg text-[#FDFCF0] tracking-wide my-auto px-2">
                  {activeCreative.imageText}
                </div>
                <div className="text-right text-[8px] font-mono text-[#FDFCF0]/40">MAVEN CREATIVE GENERATOR</div>
              </div>

              {/* Interaction Row */}
              <div className="p-3.5 space-y-2.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span id="cta-mock-learn-more" className="font-bold text-[#C9A84C] hover:underline cursor-pointer">Learn More</span>
                  <span className="text-[#FDFCF0]/40 font-mono">1.2k likes</span>
                </div>
                <div className="space-y-1 leading-normal">
                  <p className="text-[10px] text-[#FDFCF0]/80">
                    <span className="font-bold mr-1.5">maven_os_bot</span>
                    {activeCreative.desc}
                  </p>
                  <p className="text-[9px] text-[#C9A84C] font-mono">
                    {activeCreative.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="border-t border-[#FDFCF0]/10 py-12 text-center text-xs font-mono text-[#FDFCF0]/40">
        <p>&copy; {new Date().getFullYear()} Maven Hospitality OS. Architectural Focus Node 2.1.</p>
      </footer>
    </div>
  );
}
