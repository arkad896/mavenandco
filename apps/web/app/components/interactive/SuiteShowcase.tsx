'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Receipt,
  GraduationCap,
  Scissors,
  CheckCircle2,
  Clock,
  Sparkle,
  LucideIcon
} from 'lucide-react';
import Logo from '../Logo';

interface FeatureItem {
  title: string;
  desc: string;
}

interface SuiteTab {
  id: 'hospitality' | 'salon' | 'school';
  name: string;
  tagline: string;
  status: 'active' | 'upcoming';
  accent: string;
  icon: LucideIcon;
  description: string;
  features: FeatureItem[];
}

export default function SuiteShowcase() {
  const [activeTab, setActiveTab] = useState<'hospitality' | 'salon' | 'school'>('hospitality');
  
  // Waitlist form states
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tabs: SuiteTab[] = [
    {
      id: 'hospitality',
      name: 'Hearth OS',
      tagline: 'DIRECT ORDERS • ZERO COMMISSIONS • METRIC DASHBOARDS',
      status: 'active',
      accent: '#C9A84C', // Gold
      icon: Layers,
      description: 'The flagship operating suite powering premium fine dining rooms, boutique cafes, local bakeries, and luxury resorts. Consolidates local geofenced ads, social media creation, organic SEO, verified WhatsApp API automation, guest CRM tracking, table QR digital menu loops, and real-time FOH/BOH recipe billing POS. We replace five fragmented vendor invoices under one single rate.',
      features: [
        { title: 'Commission-free Table QR', desc: 'Frictionless table ordering with upselling prompts directly to kitchen screens.' },
        { title: 'Meta Ads & Social Autopilot', desc: 'Geofenced Instagram reels and high-conversion client acquisition filters.' },
        { title: 'Official WhatsApp API Sync', desc: 'Verified business account reservation reminders and booking confirmations.' },
        { title: 'Recipe Costing POS Billing', desc: 'Atomic inventory decrement metrics computed per transaction check.' }
      ]
    },
    {
      id: 'salon',
      name: 'Salon OS',
      tagline: 'COMING SOON • CALENDAR AUTOPILOT • CLIENT HISTORY',
      status: 'upcoming',
      accent: '#E8C97A', // Rose gold shade
      icon: Scissors,
      description: 'Designed specifically for high-end spas, premium hair salons, wellness centers, and beauty studios. Under development to automate the entire client booking workflow. From geofenced ads to native client history retention, stylist calendar allocations, and automated WhatsApp/SMS visit reminder pipelines to eliminate empty schedules.',
      features: [
        { title: 'Stylist Scheduler Autopilot', desc: 'Visual booking boards that allocate stylist slots dynamically based on service duration.' },
        { title: 'Automatic Client Profile Ledger', desc: 'Deep preference profiles logging previous colors, styles, cuts, and average ticket spending.' },
        { title: 'No-Show Recovery Prompts', desc: 'WhatsApp API reminder loops that trigger automatic waitlist shifts if a booking cancels.' },
        { title: 'Voucher Membership Loyalty', desc: 'Prepaid service cards, automated anniversary treatment alerts, and lapses warnings.' }
      ]
    },
    {
      id: 'school',
      name: 'School OS',
      tagline: 'COMING SOON • PARENT-TEACHER PIPELINE • FEE LEDGERS',
      status: 'upcoming',
      accent: '#8FAF95', // Soft sage/greenish blue
      icon: GraduationCap,
      description: 'The ultimate operating system for primary schools, premium academies, training centers, and local institutions. Designed to connect administrators, educators, and parents into a unified, secure portal. Automates new student enrollment inquiries, digitizes monthly fee invoice allocations, and provides verified parent communication streams.',
      features: [
        { title: 'Parent Portal App Hub', desc: 'Single-access console for daily student schedules, grades, attendance tracking, and reports.' },
        { title: 'WhatsApp Alert Pipelines', desc: 'Instant school closure alerts, activity permissions, and teacher messages pushed direct to parents.' },
        { title: 'Digital Fee Ledger System', desc: 'Automated invoice generation, secure payment checkouts, and late reminders.' },
        { title: 'Admissions Intake Desk', desc: 'Track prospect student leads, application reviews, and parent interview schedules in real time.' }
      ]
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !businessName || !phone) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset after brief delay
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setBusinessName('');
        setPhone('');
      }, 5000);
    }, 1200);
  };

  const scrollToHospitality = () => {
    const el = document.getElementById('roi-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(143,175,149,0.02)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            The Maven Suite Blueprint
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-maven-cream mt-2 font-medium">
            One Core Brand. Diverse Operating Suites.
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-2xl">
            We build specialized, highly-integrated operational software tailored for specific physical-service sectors. Select an industry suite below to explore features.
          </p>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap bg-maven-green-dark/80 p-2 rounded-2xl border border-maven-cream/5 gap-2 mb-8">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSubmitted(false);
              }}
              className={`flex-1 min-w-[150px] py-4 px-5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-500 flex items-center justify-center gap-2.5 relative overflow-hidden ${
                isActive
                  ? 'bg-maven-green text-maven-cream border border-maven-gold/30 shadow-lg'
                  : 'text-maven-muted hover:text-maven-cream hover:bg-maven-green-light/10 border border-transparent'
              }`}
            >
              <TabIcon className="w-4 h-4" style={{ color: isActive ? tab.accent : undefined }} />
              <span>{tab.name}</span>
              
              {/* Status Badge */}
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-mono shrink-0 ${
                tab.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-maven-gold/10 text-maven-gold/80 border border-maven-gold/20'
              }`}>
                {tab.status}
              </span>

              {isActive && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-maven-gold to-transparent" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents Pane */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Description & Features */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: currentTab.accent }}>
                {currentTab.tagline}
              </span>
              <h4 className="text-2xl font-serif text-maven-cream font-medium">
                {currentTab.name} Platform
              </h4>
              <p className="text-xs sm:text-sm text-maven-muted leading-relaxed text-justify font-body">
                {currentTab.description}
              </p>
            </div>

            {/* Features Sub-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-maven-cream/5">
              {currentTab.features.map((f, idx) => (
                <div key={idx} className="bg-maven-green-dark/40 border border-maven-cream/5 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: currentTab.accent }} />
                    <span className="text-xs font-serif font-bold text-maven-cream">{f.title}</span>
                  </div>
                  <p className="text-[10px] text-maven-muted font-mono leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interaction Action Block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {currentTab.status === 'active' ? (
              /* ACTIVE HUB ACTION */
              <div className="bg-maven-green-dark/60 border border-maven-gold/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-center justify-center items-center h-full relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-xl pointer-events-none" />
                <Logo variant="monogram" size="md" className="animate-pulse" />
                
                <div className="space-y-2">
                  <h5 className="text-lg font-serif text-maven-cream font-semibold">Hearth OS is fully live.</h5>
                  <p className="text-xs text-maven-muted leading-relaxed max-w-xs">
                    Powering real fine dining rooms, boutique hotels, cafes, and ghost kitchens right now. Enter the dedicated OS portal to view simulator consoles, ROI savings audits, and POS blueprints.
                  </p>
                </div>

                <Link
                  href="/hospitality"
                  className="w-full py-4 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark flex items-center justify-center gap-2 group"
                >
                  <span>Enter Hearth OS Portal</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              /* UPCOMING WAITLIST INTAKE */
              <div className="bg-maven-green-dark/60 border border-maven-gold/15 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="waitlist-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleWaitlistSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2 text-center pb-2 border-b border-maven-cream/5">
                        <div className="inline-flex items-center gap-1.5 text-maven-gold text-[10px] font-mono uppercase font-bold">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Join Early Access Waitlist</span>
                        </div>
                        <h5 className="text-sm font-serif text-maven-cream">
                          Apply for {currentTab.name} Beta
                        </h5>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono tracking-widest uppercase text-maven-muted">Contact Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#081a15]/80 border border-maven-gold/20 focus:border-maven-gold/60 text-maven-cream placeholder-maven-muted/50 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono tracking-widest uppercase text-maven-muted">Business / Institution Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Prestige Salon / Heritage Academy"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full bg-[#081a15]/80 border border-maven-gold/20 focus:border-maven-gold/60 text-maven-cream placeholder-maven-muted/50 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono tracking-widest uppercase text-maven-muted">WhatsApp / Contact Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 99999-99999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#081a15]/80 border border-maven-gold/20 focus:border-maven-gold/60 text-maven-cream placeholder-maven-muted/50 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {submitting ? (
                          <div className="h-4 w-4 border-2 border-maven-green-dark/30 border-t-maven-green-dark rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Request Early Access Beta</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    /* SUCCESS SCREEN */
                    <motion.div
                      key="waitlist-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="text-center p-6 space-y-4 flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-lg font-serif text-maven-cream font-bold">Waitlist Requested!</h5>
                        <p className="text-xs text-maven-muted leading-relaxed max-w-xs">
                          Thank you, <strong>{name}</strong>! We have logged <strong>{businessName}</strong> under the <strong>{currentTab.name}</strong> early access pipeline. Our onboarding specialists will reach out via WhatsApp at <strong>{phone}</strong> shortly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
