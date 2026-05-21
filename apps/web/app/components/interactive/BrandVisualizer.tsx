'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  Utensils, 
  Wine, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';

interface NicheData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  adCopy: string;
  adHeadline: string;
  adImage: string;
  paletteName: string;
  paletteColors: string[];
  recommendations: string[];
  roiMetric: string;
  roiSub: string;
}

interface BrandVisualizerProps {
  onPrefillInquiry: (note: string) => void;
}

export default function BrandVisualizer({ onPrefillInquiry }: BrandVisualizerProps) {
  const [activeNiche, setActiveNiche] = useState<string>('cafe');

  const niches: NicheData[] = [
    {
      id: 'cafe',
      name: 'Specialty Cafe & Bakery',
      icon: Coffee,
      tagline: 'Warm, community-centric neighborhood brand',
      description: 'Your guest experience starts with aesthetic morning bakes and craft roasts. Maven scales your local footfalls and automates repeat visitors in the background.',
      adCopy: '✨ Sunday morning plans sorted. Bite into our signature flaky pistachio croissants, rolled fresh daily at 4 AM, paired with direct Single Origin coffee. Tap below to see our dynamic seasonal menu and secure a table today! 🥐☕',
      adHeadline: 'Crisp Croissants & Craft Roasts',
      adImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
      paletteName: 'Warm Espresso & Cream',
      paletteColors: ['#C9A84C', '#E8C97A', '#FDFCF0', '#4A3525'],
      recommendations: [
        'WhatsApp Broadcasts (Special bakery batches)',
        'Frictionless QR Table-Side Ordering',
        'Direct Instagram Menu & Automated Checkouts'
      ],
      roiMetric: '+42%',
      roiSub: 'Increase in Sunday morning repeat rate'
    },
    {
      id: 'dining',
      name: 'Luxury Fine Dining',
      icon: Utensils,
      tagline: 'Minimalist editorial, high-ticket visual experience',
      description: 'Ultra-premium experiences demand flawless technology that sits quietly in the background. Maven handles direct seat locks, chef reservation cards, and VIP customer segment tracking.',
      adCopy: '🌹 A curated journey through regional micro-flavors. Indulge in our exquisite Chef Tasting Menu tonight, featuring wild truffles, fresh burrata, and hand-rolled pasta. Seats are extremely limited. Direct booking sync only below. 👇',
      adHeadline: 'Experience the Autumn Tasting Journey',
      adImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop',
      paletteName: 'Minimalist Gold & Obsidian',
      paletteColors: ['#C9A84C', '#FDFCF0', '#12352A', '#0A2119'],
      recommendations: [
        'Verified CRM VIP Reservation Sync',
        'Pre-secured Chef Deposit Table Cards',
        'Direct SMS Priority Booking Channel'
      ],
      roiMetric: '₹1.8L',
      roiSub: 'Aggregator commission leaks blocked monthly'
    },
    {
      id: 'lounge',
      name: 'Cocktail Lounge & Bar',
      icon: Wine,
      tagline: 'Dark, vibrant energetic nightlife branding',
      description: 'Vibrant lounges thrive on momentum, guest lists, and automated re-engagement. Maven blasts dynamic evening triggers and handles table split-billing without software lag.',
      adCopy: '🥂 Curated beats. Hand-crafted mixology. Experience the signature nightlife vibe at Siena Lounge this weekend. Tapping below automatically registers your group to our priority guest list and secures a complimentary cocktail batch. 🎧🍸',
      adHeadline: 'Weekend Beats & High Mixology',
      adImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop',
      paletteName: 'Midnight Jade & Amber Gold',
      paletteColors: ['#E8C97A', '#1C4A38', '#0A2119', '#8FAF95'],
      recommendations: [
        'Instant WhatsApp Group Guest List Entry',
        'Table Split-Bill POS Sync & Fast Receipts',
        'Dynamic DJ Event Night Broadcast Blasts'
      ],
      roiMetric: '+28%',
      roiSub: 'Increase in weekend table occupancy margins'
    },
    {
      id: 'kitchen',
      name: 'High-Volume Cloud Kitchen',
      icon: Layers,
      tagline: 'High efficiency, strict data-driven scalability',
      description: 'Direct margins and rapid kitchen tickets are what drive cloud kitchen networks. Maven bypasses standard 20% aggregator commissions and connects multi-brand tickets to a single POS monitor.',
      adCopy: '🚀 Direct from our kitchen hub to your doorstep in under 24 minutes. Order direct and enjoy gourmet truffle pasta, loaded burger grids, and hand-tossed sourdough pizza at 0% aggregator markups. Free delivery unlocked below! 🛵🍕',
      adHeadline: 'Fresh Gourmet Delivery in 24 Mins',
      adImage: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?q=80&w=600&auto=format&fit=crop',
      paletteName: 'Forest Tech-Green & Muted Sage',
      paletteColors: ['#8FAF95', '#1C4A38', '#12352A', '#FDFCF0'],
      recommendations: [
        'Integrated Multi-Brand KDS Order Monitors',
        'Direct 0% Commission Web-Store Setup',
        'Automated Text Delivery Dispatch & Alerts'
      ],
      roiMetric: '2.4x',
      roiSub: 'Higher customer lifetime value via direct loyalty'
    }
  ];

  const currentNiche = niches.find(n => n.id === activeNiche) || niches[0];

  const handleApplyNiche = () => {
    onPrefillInquiry(`Brand visualizer niche: ${currentNiche.name}. Please contact me to set up custom branding, Meta ads copywriting, and dynamic landing page thematic palettes.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Niche Theme visualizer
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Brand Visualizer & Operating Dashboard
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Choose your hospitality segment to preview how Maven customizes ad campaigns, visual presets, copywriting voices, and backend recommendation stacks.
          </p>
        </div>
      </div>

      {/* Tab Segment Controls */}
      <div className="flex flex-wrap gap-2 mb-8 bg-maven-green-dark/40 p-1.5 rounded-2xl border border-maven-cream/5 max-w-max">
        {niches.map((n) => {
          const Icon = n.icon;
          const isActive = activeNiche === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActiveNiche(n.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
                isActive 
                  ? 'bg-maven-gold text-maven-green-dark font-bold shadow-md' 
                  : 'text-maven-muted hover:text-maven-cream hover:bg-maven-green-light/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{n.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Simulated Meta Ad Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[380px] bg-[#0c100e] border border-maven-cream/10 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">
            {/* Meta Header */}
            <div className="p-4 flex items-center gap-3 border-b border-maven-cream/5 bg-maven-green-dark/50">
              <div className="w-9 h-9 rounded-full bg-maven-gold/15 flex items-center justify-center border border-maven-gold/20 text-maven-gold font-mono text-xs font-bold">
                M
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-maven-cream">Siena Bistro & Co.</span>
                  <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-white text-[7px]">✓</span>
                </div>
                <span className="text-[8px] text-maven-muted mt-1 font-mono uppercase tracking-wider">Sponsored (Meta Ad Network)</span>
              </div>
            </div>

            {/* Ad Body Text with AnimatePresence */}
            <div className="p-4 flex-1 text-xs text-maven-cream/90 leading-relaxed font-sans min-h-[100px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeNiche}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentNiche.adCopy}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Ad Graphic Creative */}
            <div className="relative h-[200px] overflow-hidden bg-maven-green-dark border-y border-maven-cream/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNiche}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-cover bg-center grayscale contrast-[1.08] sepia-[4%]"
                  style={{ backgroundImage: `url('${currentNiche.adImage}')` }}
                />
              </AnimatePresence>
            </div>

            {/* Ad Call to Action bar */}
            <div className="p-4 bg-maven-green-dark/50 flex justify-between items-center border-t border-maven-cream/5 text-xs">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider">SIENABISTRO.MAVEN.NET</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeNiche}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-bold text-maven-cream mt-0.5"
                  >
                    {currentNiche.adHeadline}
                  </motion.span>
                </AnimatePresence>
              </div>
              <button 
                onClick={handleApplyNiche}
                className="bg-maven-gold text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations & Niche Details */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-8">
          
          {/* Niche Tagline & Description */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNiche}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold block">{currentNiche.tagline}</span>
                <h4 className="text-xl font-serif text-maven-cream font-medium">{currentNiche.name} System</h4>
                <p className="text-xs text-maven-muted leading-relaxed">{currentNiche.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Color Thematic Palette indicator */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold block">Brand Palette Presets:</span>
            <div className="flex items-center gap-4 bg-maven-green-dark/30 p-3 rounded-xl border border-maven-cream/5">
              <div className="flex gap-1.5">
                {currentNiche.paletteColors.map((color, idx) => (
                  <div 
                    key={idx} 
                    className="w-5 h-5 rounded-full border border-maven-cream/10" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={activeNiche}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-mono text-maven-muted uppercase"
                >
                  {currentNiche.paletteName}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Recommendation list */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold block">Tailored System Deployment:</span>
            <ul className="space-y-2 text-xs text-maven-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNiche}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {currentNiche.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-maven-gold mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </motion.div>
              </AnimatePresence>
            </ul>
          </div>

          {/* Business ROI block */}
          <div className="bg-maven-gold/10 border border-maven-gold/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold">Estimated Conversion Lift</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeNiche}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-maven-muted"
                  >
                    {currentNiche.roiSub}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeNiche}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl sm:text-3xl font-mono text-maven-cream font-bold"
              >
                {currentNiche.roiMetric}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Call to Action */}
          <div className="pt-2">
            <button
              onClick={handleApplyNiche}
              className="w-full flex items-center justify-center gap-2 py-3 bg-maven-gold text-maven-green-dark hover:bg-maven-cream font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300"
            >
              <span>Request {currentNiche.name} OS Layout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
