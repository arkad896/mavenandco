'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XCircle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ComparisonDimension {
  dimension: string;
  oldStack: string;
  oldSeverity: 'high' | 'medium';
  mavenStack: string;
  mavenSeverity: 'perfect';
}

interface SolutionComparisonProps {
  onPrefillInquiry: (note: string) => void;
}

export default function SolutionComparison({ onPrefillInquiry }: SolutionComparisonProps) {
  const [hoveredCard, setHoveredCard] = useState<'old' | 'maven' | null>(null);

  const dimensions: ComparisonDimension[] = [
    {
      dimension: 'Setup & Integration',
      oldStack: 'High friction: 5 duplicate logins, fragmented databases, laggy table QR menus.',
      oldSeverity: 'high',
      mavenStack: 'Zero friction: Single unified dashboard database & 15-day complete onboarding setup.',
      mavenSeverity: 'perfect'
    },
    {
      dimension: 'Aggregator Margin Leaks',
      oldStack: 'High: Leaking 20%+ commission margins on aggregators (Zomato/Swiggy order loops).',
      oldSeverity: 'high',
      mavenStack: 'Perfect: 0% aggregator commission loops. Direct loyalty guest ordering saves margins.',
      mavenSeverity: 'perfect'
    },
    {
      dimension: 'Support & Accountability',
      oldStack: 'No coordination: POS team blames web hosting; hosting host blames agency copywriters.',
      oldSeverity: 'high',
      mavenStack: 'Instant concierge: Single point of contact. 24/7 dedicated Technical WhatsApp support.',
      mavenSeverity: 'perfect'
    },
    {
      dimension: 'Monthly Cost Structure',
      oldStack: 'Fragmented bills: Agency fees (₹25k) + POS (₹4k) + WhatsApp suites (₹5k) + Hosts (₹2k).',
      oldSeverity: 'medium',
      mavenStack: 'Flat single fee: One transparent subscription (₹29,999/mo) and free integrated POS.',
      mavenSeverity: 'perfect'
    }
  ];

  const handleComparisonPrefill = () => {
    onPrefillInquiry(`Solution comparison inquiry: Ready to switch from the broken fragmented stack to the unified Maven OS. Please schedule a database migration call.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Comparison Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            UNIFIED VALUE ARCHITECTURE
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Fragmented Software Stacks vs. Maven Operating System
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Contrast the daily friction, fragmented billing models, and server coordination issues of standard agencies with our direct, unified restaurant framework.
          </p>
        </div>
      </div>

      {/* Side-by-Side Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
        {/* Left Side: The Broken Way */}
        <motion.div
          onMouseEnter={() => setHoveredCard('old')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`lg:col-span-6 bg-maven-green-dark/40 border rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-500 shadow-xl ${
            hoveredCard === 'old' ? 'border-red-500/25 ring-1 ring-red-500/10 scale-[1.01]' : 'border-maven-cream/5'
          }`}
        >
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-maven-cream/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center text-red-400">
                  <XCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-maven-cream font-sans">Traditional Agency & SaaS Way</span>
              </div>
              <span className="text-[9px] font-mono tracking-wider bg-red-500/10 text-red-400 border border-red-500/25 py-0.5 px-2 rounded">
                FRAGMENTED
              </span>
            </div>
            <p className="text-xs text-maven-muted font-body leading-relaxed mt-4">
              Relying on a social media agency to run ads, paying Petpooja/POSist for billing hardware, subscribing to third-party WhatsApp tools, and losing 20% commission on delivery hubs.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase font-bold block">Friction Point Details:</span>
            <div className="space-y-3 font-mono text-[10px] text-maven-muted">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Duplicate databases with zero inventory coordinate mapping.</span>
              </div>
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>No support accountability—crashes lead to finger-pointing.</span>
              </div>
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Paying ₹55,000+ monthly in scattered bills plus aggregator commissions.</span>
              </div>
            </div>
          </div>

          <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase font-bold">Estimated Monthly Friction</span>
            </div>
            <span className="text-base font-mono text-red-400 font-bold uppercase">Severe</span>
          </div>
        </motion.div>

        {/* Right Side: The Maven Way */}
        <motion.div
          onMouseEnter={() => setHoveredCard('maven')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`lg:col-span-6 bg-gradient-to-br from-maven-green-light/20 to-maven-green-dark/40 border-2 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-500 shadow-2xl relative overflow-hidden ${
            hoveredCard === 'maven' || hoveredCard === null 
              ? 'border-maven-gold ring-2 ring-maven-gold/20 scale-[1.01]' 
              : 'border-maven-gold/20'
          }`}
        >
          <div className="absolute top-0 right-0 bg-maven-gold text-maven-green-dark text-[9px] font-mono tracking-widest uppercase font-bold py-1 px-3 rounded-bl-lg">
            RECOMMENDED
          </div>

          <div>
            <div className="flex justify-between items-center pb-4 border-b border-maven-cream/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-maven-gold/25 flex items-center justify-center text-maven-gold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-maven-cream font-sans">The Maven Hospitality OS</span>
              </div>
              <span className="text-[9px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 py-0.5 px-2 rounded">
                INTEGRATED
              </span>
            </div>
            <p className="text-xs text-maven-muted font-body leading-relaxed mt-4">
              Everything under one roof. Your social ads, verified WhatsApp CRM broadcasts, frictionless table QR menu ordering, POS terminals, and inventory run as a single coordinated system.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold block">OS System Advantages:</span>
            <div className="space-y-3 font-mono text-[10px] text-maven-muted">
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-maven-gold flex-shrink-0 mt-0.5" />
                <span>Single database: inventory deductions map instantly to direct table orders.</span>
              </div>
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-maven-gold flex-shrink-0 mt-0.5" />
                <span>Flawless accountability—one dedicated technical concierge available 24/7.</span>
              </div>
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-maven-gold flex-shrink-0 mt-0.5" />
                <span>One transparent flat fee of ₹29,999/mo, with complete POS terminals included free.</span>
              </div>
            </div>
          </div>

          <div className="bg-maven-gold/10 p-4 rounded-xl border border-maven-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-maven-gold animate-bounce" />
              <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold">OPERATIONAL MARGIN INCREASE</span>
            </div>
            <span className="text-base font-mono text-maven-gold font-bold uppercase">Optimal</span>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Comparison Matrix Grid */}
      <div className="bg-maven-green-dark/40 border border-maven-cream/5 rounded-2xl overflow-hidden mb-8 text-xs sm:text-xs">
        {/* Table header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-maven-cream/5 bg-maven-green-dark/60 font-mono text-[10px] tracking-wider text-maven-gold uppercase font-bold">
          <div className="md:col-span-3">Comparison Metric</div>
          <div className="md:col-span-4 text-red-400/90">Traditional software Stack</div>
          <div className="md:col-span-5 text-maven-gold-light">Maven Hospitality OS</div>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-maven-cream/5">
          {dimensions.map((dim, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
              <div className="md:col-span-3 font-semibold text-maven-cream">{dim.dimension}</div>
              <div className="md:col-span-4 text-maven-muted font-body leading-relaxed">{dim.oldStack}</div>
              <div className="md:col-span-5 text-maven-muted font-body leading-relaxed border-t md:border-t-0 border-maven-cream/5 pt-2 md:pt-0">
                {dim.mavenStack}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Switch CTA */}
      <div className="bg-maven-gold/10 border border-maven-gold/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-maven-gold">Ready to switch from legacy software?</span>
            <span className="text-[10px] text-maven-muted">Connect with our systems architects to safely sync menu recipe records, database terminals, and campaign ad accounts.</span>
          </div>
        </div>
        <button
          onClick={handleComparisonPrefill}
          className="flex items-center gap-1.5 px-5 py-3 bg-maven-gold text-maven-green-dark hover:bg-maven-cream font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
        >
          <span>Request System Switch Sync</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
