'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Image, 
  Rocket, 
  Terminal, 
  CheckCircle, 
  Compass, 
  ArrowRight
} from 'lucide-react';

interface Milestone {
  day: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  stamp: string;
  progressPercent: number;
  deliverables: string[];
  description: string;
}

interface OnboardingTimelineProps {
  onPrefillInquiry: (note: string) => void;
}

export default function OnboardingTimeline({ onPrefillInquiry }: OnboardingTimelineProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const milestones: Milestone[] = [
    {
      day: 1,
      title: 'Intake & Audit Session',
      subtitle: 'Mapping your menu, metrics, and technical accounts',
      icon: ClipboardList,
      stamp: 'STRATEGY SET',
      progressPercent: 20,
      deliverables: [
        'Brand intake audit (identifying high-margin specials)',
        'Meta Business Manager & Google Maps account handshake',
        'Petpooja/POSist recipe & billing database scan',
        'Competitor radius & demographic targeting outline'
      ],
      description: 'Before writing any code or ad copies, we map your restaurant profile. We sync your existing POS accounts and outline high-margin specials to prioritize in your upcoming marketing.'
    },
    {
      day: 3,
      title: 'Assets & Copywriting',
      subtitle: 'Crafting premium aesthetic creatives & bot templates',
      icon: Image,
      stamp: 'CREATIVES ACTIVE',
      progressPercent: 40,
      deliverables: [
        '3 variant high-converting copywriting sets per ad campaign',
        'Custom high-end photo overlays and reels-style designs',
        'Verified WhatsApp reservation cards & menu templates setup',
        'Custom web-ordering landing page design layout draft'
      ],
      description: 'Our design and copy team builds your assets. We write ad copies matching your custom brand voice and design interactive reservation brochures for the Meta WhatsApp API.'
    },
    {
      day: 7,
      title: 'The Campaign Launch',
      subtitle: 'Going live on paid social networks & search engines',
      icon: Rocket,
      stamp: 'CAMPAIGNS LIVE',
      progressPercent: 60,
      deliverables: [
        'Meta Paid Social campaigns (awareness + direct conversions) active',
        'Retargeting custom audience loops activated',
        'Verified Google Maps & Local search keyword bids set',
        'WhatsApp chat flow bot active and synced to advertising clicks'
      ],
      description: 'We go live. Your ads are running on Facebook & Instagram targeting radius-specific foodies, while our verified WhatsApp bot stands ready to capture every click.'
    },
    {
      day: 12,
      title: 'POS Integration & KDS Sync',
      subtitle: 'Unifying front-of-house marketing with back-of-house software',
      icon: Terminal,
      stamp: 'HARDWARE READY',
      progressPercent: 80,
      deliverables: [
        'Gourmet menu items mapped to automated ingredient counts',
        'Kitchen Display (KDS) order monitors configured',
        'Frictionless QR Table-Side web menu ordering set active',
        'POS system terminal synced with local billing accounts'
      ],
      description: 'We sync the operational layer. We connect your menu recipes to ingredient-level stocks and deploy our unified POS system and Kitchen Display KDS monitors in your venue.'
    },
    {
      day: 15,
      title: 'Go-Live & Loop Activation',
      subtitle: 'Complete guest ecosystem operational and syncing',
      icon: CheckCircle,
      stamp: 'SYSTEM OPERATIONAL',
      progressPercent: 100,
      deliverables: [
        'Live owner analytics portal and revenue chart spikes live',
        'VIP customer segment logs capturing check history',
        'Automated repeat-visit loops (birthdays, win-backs) active',
        'Full operational staff table-side app training completed'
      ],
      description: 'The complete hospitality operating system is active. Your staff is trained, your ads are driving tables, your KDS handles orders, and CRM segment loops trigger to ensure repeat visits.'
    }
  ];

  const activeMilestone = milestones.find(m => m.day === selectedDay) || milestones[0];

  const handleTimelinePrefill = () => {
    onPrefillInquiry(`Timeline inquiry: Interested in the Maven 15-Day Rollout. Specifically focusing on Day ${activeMilestone.day} deliverables (${activeMilestone.title}). Please contact me to plan deployment.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Timeline Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            15-DAY ROLLOUT TIMELINE
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            From Onboarding to Fully Operational
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Click each milestone below to explore what happens from Day 1 to Day 15 as we deploy your custom marketing, automated WhatsApp bots, and free enterprise POS.
          </p>
        </div>
      </div>

      {/* Milestones Navigation Grid (Horizontal on Desktop, Vertical on Mobile) */}
      <div className="relative mb-12">
        {/* Dynamic Horizontal Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-maven-cream/10 -translate-y-1/2 hidden md:block" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-maven-gold -translate-y-1/2 transition-all duration-700 hidden md:block" 
          style={{ width: `${activeMilestone.progressPercent}%` }}
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
          {milestones.map((m) => {
            const isSelected = selectedDay === m.day;
            const isPast = selectedDay > m.day;

            return (
              <button
                key={m.day}
                onClick={() => setSelectedDay(m.day)}
                className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center focus:outline-none group"
              >
                {/* Node bubble */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md ${
                    isSelected 
                      ? 'bg-maven-gold border-maven-gold text-maven-green-dark scale-110 ring-4 ring-maven-gold/20 font-bold'
                      : isPast
                        ? 'bg-maven-green border-maven-gold text-maven-gold font-bold'
                        : 'bg-maven-green-dark border-maven-cream/10 text-maven-muted hover:border-maven-gold/60 hover:text-maven-cream'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">D{m.day}</span>
                </div>

                {/* Text details for selector */}
                <div className="flex flex-col md:items-center">
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-bold transition-colors ${
                    isSelected ? 'text-maven-gold' : 'text-maven-muted group-hover:text-maven-cream'
                  }`}>
                    Day {m.day}
                  </span>
                  <span className={`text-xs mt-0.5 max-w-[130px] line-clamp-1 font-serif transition-colors ${
                    isSelected ? 'text-maven-cream font-bold' : 'text-maven-muted/80 group-hover:text-maven-cream'
                  }`}>
                    {m.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestone Details Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-maven-green-dark/40 border border-maven-cream/5 p-6 sm:p-8 rounded-2xl relative items-stretch"
        >
          {/* Outcome stamp decoration overlay */}
          <div className="absolute top-4 right-4 bg-maven-gold/5 border border-maven-gold/20 text-maven-gold font-mono text-[9px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full select-none">
            {activeMilestone.stamp}
          </div>

          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-maven-gold/10 border border-maven-gold/20 flex items-center justify-center text-maven-gold shadow-inner">
                  <activeMilestone.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">MILESTONE DAY {activeMilestone.day}</span>
                  <h4 className="text-xl font-serif text-maven-cream font-semibold mt-0.5">{activeMilestone.title}</h4>
                </div>
              </div>
              <p className="text-xs text-maven-muted leading-relaxed font-body pt-1">
                {activeMilestone.description}
              </p>
            </div>

            {/* Checklist Box */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold block">Day {activeMilestone.day} Deliverables Checklist:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeMilestone.deliverables.map((del, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-maven-muted leading-snug">
                    <div className="w-4 h-4 rounded-full bg-maven-gold/10 border border-maven-gold/20 flex items-center justify-center text-maven-gold mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graphical Summary panel */}
          <div className="lg:col-span-5 bg-maven-green-light/20 border border-maven-gold/10 rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-6 text-xs">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold">SYSTEM READINESS METRIC</span>
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-maven-cream">Setup Status score</span>
                <span className="font-mono text-maven-gold">{activeMilestone.progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-maven-green-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-maven-gold transition-all duration-1000" 
                  style={{ width: `${activeMilestone.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-maven-muted">
              <div className="flex justify-between border-b border-maven-cream/5 pb-1">
                <span>Phase Timeline:</span>
                <span className="text-maven-cream font-bold">15 Days Complete</span>
              </div>
              <div className="flex justify-between border-b border-maven-cream/5 pb-1">
                <span>Agency Migrated:</span>
                <span className="text-maven-gold font-bold">Unified OS</span>
              </div>
              <div className="flex justify-between">
                <span>Deployment Risk:</span>
                <span className="text-emerald-400 font-bold uppercase">Zero Downtime</span>
              </div>
            </div>

            <button
              onClick={handleTimelinePrefill}
              className="w-full flex items-center justify-center gap-1.5 py-3 bg-maven-gold text-maven-green-dark hover:bg-maven-cream font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              <span>Intake Day {activeMilestone.day} Deliverables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
