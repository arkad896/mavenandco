'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  GraduationCap, 
  Activity, 
  Sparkles, 
  Home, 
  Dumbbell, 
  BookOpen, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface VerticalMappingDetail {
  id: string;
  name: string;
  focus: string;
  icon: any;
  tagline: string;
  description: string;
  mapping: {
    title: string;
    details: string;
  }[];
}

interface VerticalMapperProps {
  onPrefillInquiry: (note: string) => void;
}

export default function VerticalMapper({ onPrefillInquiry }: VerticalMapperProps) {
  const [activeVertical, setActiveVertical] = useState<string>('restaurants');

  const verticals: VerticalMappingDetail[] = [
    {
      id: 'restaurants',
      name: 'Restaurants, Cafes & Hotels',
      focus: 'Commission Elimination & Booking Sync',
      icon: Building2,
      tagline: 'Absorb aggregator commission leakage and automate guest seating.',
      description: 'Our primary vertical designed to maximize margins. By bypassing third-party aggregator commissions and deploying direct reservations, venues retain 100% of their organic revenue.',
      mapping: [
        { title: "Paid Ads", details: "Local radius targeting driving walk-ins and direct booking landing pages." },
        { title: "WhatsApp API", details: "Automated table reservations, waitlists sync, and immediate digital menu receipts." },
        { title: "CRM Database", details: "Lapse triggers (30 days since last visit) issuing custom truffle-dish vouchers." },
        { title: "QR Dine-In", details: "Tableside scanning and menu booking, bypassing commissions on food portals." },
        { title: "POS & Billing", details: "Recipe-level inventory decrementing raw ingredients dynamically on checkout." }
      ]
    },
    {
      id: 'schools',
      name: 'Schools & Colleges',
      focus: 'Admission Pipelines & Parent Notifications',
      icon: GraduationCap,
      tagline: 'Target prospective parents and automate school communications.',
      description: 'Simplifies parent intake funnels and reduces administrative friction. Replaces chaotic manual parent circulars and admission callbacks with structured automation.',
      mapping: [
        { title: "Admission Ads", details: "Geofenced Meta campaigns targeting parents in residential sectors during intake season." },
        { title: "Organic Content", details: "Student highlights, grid showcases of achievements, campus event highlights." },
        { title: "Local SEO", details: "Rankings for intent queries like 'best CBSE school near me' or 'top colleges in Salt Lake'." },
        { title: "WhatsApp API", details: "Automated admission enquiry replies, tuition fee reminders, parent-teacher scheduling." },
        { title: "QR Prospectus", details: "Scan nodes at open days mapping to digital prospectus downloads and attendance." }
      ]
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Clinics & Hospitals',
      focus: 'Patient Intakes & Report Dispatches',
      icon: Activity,
      tagline: 'Automate medical bookings and distribute records instantly.',
      description: 'Constructs highly secure and frictionless healthcare pathways. Enables automated pre-appointment instructions and report dispatch directly on patient devices.',
      mapping: [
        { title: "Targeted Ads", details: "Specialty-focused geofenced campaigns targeting local patients (cardiology, ortho, skin)." },
        { title: "WhatsApp API", details: "Appointment confirmations, report delivery notifications, dosage reminders." },
        { title: "Customer CRM", details: "Patient check histories, prescription refill schedules, check-up anniversary alerts." },
        { title: "QR Registries", details: "Waiting area scanning routing patients to instant digital intake forms." },
        { title: "Managed Site", details: "Fast-loading portal detailing physician lists, specialist bios, and direct calendars." }
      ]
    },
    {
      id: 'salons',
      name: 'Salons, Spas & Wellness',
      focus: 'Client Rebookings & Stylist Calendars',
      icon: Sparkles,
      tagline: 'Retain clients on schedules and automate stylist reminders.',
      description: 'Optimizes calendar occupancy rates. Automatically triggers custom appointment reminders and post-visit rebooking alerts depending on the stylist used.',
      mapping: [
        { title: "Promo Ads", details: "Hyper-local campaigns displaying seasonal hair, skin packages, and aesthetic transformations." },
        { title: "Local SEO", details: "Ranking top for 'best salon near me' or high-margin service searches." },
        { title: "WhatsApp API", details: "Rebooking prompts dispatched 3-4 weeks post-visit, styling tips, birthday gifts." },
        { title: "CRM Loyalty", details: "Stylist preferences tracking, treatment history cards, and lapsed customer win-backs." },
        { title: "QR Menus", details: "Branded QR code triggers at stylist mirrors showing complete digital pricing menus." }
      ]
    },
    {
      id: 'realestate',
      name: 'Real Estate Developers',
      focus: 'Lead Nurture Loops & Floor Plan Access',
      icon: Home,
      tagline: 'Capture buyer profiles and automate walkthrough dispatches.',
      description: 'Nurtures prospective buyers safely through weeks of property decisions. Provides instant vector floor plans and pricing options on-site without salesperson pressure.',
      mapping: [
        { title: "Demographic Ads", details: "Geofenced income-qualified campaigns targeting high-intent homebuyers." },
        { title: "WhatsApp API", details: "Instant WhatsApp catalog replies, walkthrough reservation slots, document collections." },
        { title: "Lead CRM", details: "Complete buyer tracking journey from first inquiry, site visit scheduling, to bookings." },
        { title: "QR Hoardings", details: "On-site vector scanning triggers delivering pricing guides and virtual tours." },
        { title: "Managed Site", details: "Dedicated high-performance landing pages featuring interactive EMI calculators." }
      ]
    },
    {
      id: 'gyms',
      name: 'Gyms & Fitness Studios',
      focus: 'Membership Renewals & Trial Classes',
      icon: Dumbbell,
      tagline: 'Convert local residents and celebrate attendance milestones.',
      description: 'Combats member churn automatically. Tracks attendance logs and triggers motivational win-backs if a gym member has stopped visiting for two weeks.',
      mapping: [
        { title: "Radius Ads", details: "Locally targeted membership campaigns and seasonal fitness challenge enrollment." },
        { title: "Local SEO", details: "Dominating local map packs for 'crossfit gym near me' or 'best yoga studio South Kolkata'." },
        { title: "WhatsApp API", details: "Trial class confirmations, renewal notifications, fitness streak milestones." },
        { title: "CRM Loyalty", details: "Attendance log triggers, membership expiration trackers, and dietary preference cards." },
        { title: "QR Check-in", details: "Class check-in scans, trainer bio lookups, and instant personal training bookings." }
      ]
    },
    {
      id: 'coaching',
      name: 'Coaching & Tutoring Centres',
      focus: 'Enquiry Intake & Study Materials Dispatch',
      icon: BookOpen,
      tagline: 'Automate student enquiries and deliver study notes.',
      description: 'Coordinates admission intakes during seasonal enrollment cycles, keeping parents synchronized with exam announcements and class schedules.',
      mapping: [
        { title: "Targeted Ads", details: "Parent-targeted campaigns during exam seasons, showcasing student success rankings." },
        { title: "Local SEO", details: "Ranking top for terms like 'best JEE coaching in Kolkata' or 'NEET training salt lake'." },
        { title: "WhatsApp API", details: "Intake inquiry replies, demo class booking slots, exam schedules, tuition receipts." },
        { title: "CRM Databases", details: "Parent contact directories, batch allocation logs, and student check records." },
        { title: "QR prospectus", details: "Scan codes at entrance lobbies leading to syllabi guides and mock test downloads." }
      ]
    }
  ];

  const active = verticals.find(v => v.id === activeVertical) || verticals[0];
  const ActiveIcon = active.icon;

  return (
    <div className="bg-maven-green-light/10 border border-maven-cream/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3 block">Universal Adaptability</span>
        <h3 className="text-3xl sm:text-5xl font-serif text-maven-cream font-medium leading-tight">
          How Maven Fits Your Business
        </h3>
        <p className="text-xs sm:text-sm text-maven-muted mt-2">
          Maven is not a generic template. The same 8 Core Service Blocks adapt to construct custom tech infrastructure mapped to your industry vertical.
        </p>
      </div>

      {/* Vertical Selector & Map Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left selector */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold px-2 text-left mb-1">Target Verticals</span>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-thin">
            {verticals.map(vert => {
              const VertIcon = vert.icon;
              const isSelected = vert.id === activeVertical;
              
              return (
                <button
                  key={vert.id}
                  onClick={() => {
                    setActiveVertical(vert.id);
                  }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 focus:outline-none shrink-0 ${
                    isSelected 
                      ? 'bg-maven-green-dark border-maven-gold/60 shadow-md text-maven-cream' 
                      : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
                  }`}
                >
                  <VertIcon className={`w-4.5 h-4.5 ${isSelected ? 'text-maven-gold' : 'text-maven-muted/50'}`} />
                  <span className="text-xs font-mono font-semibold tracking-tight whitespace-nowrap">{vert.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Mapping Display */}
        <div className="lg:col-span-8 bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-inner">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Active Header */}
                <div className="flex items-center justify-between border-b border-maven-cream/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-maven-gold/15 border border-maven-gold/30 flex items-center justify-center text-maven-gold">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-maven-cream">{active.name}</h4>
                      <span className="block text-[8px] font-mono text-maven-gold uppercase tracking-widest">{active.focus}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-maven-gold uppercase tracking-widest block font-bold">The Strategic Solution:</span>
                  <p className="text-xs sm:text-sm text-maven-muted leading-relaxed font-body">
                    {active.tagline} {active.description}
                  </p>
                </div>

                {/* Core block mappings */}
                <div className="space-y-2 mt-4">
                  <span className="text-[9px] font-mono text-maven-gold uppercase tracking-widest block font-bold">Service Block Mapping:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[10px]">
                    {active.mapping.map((map, i) => (
                      <div key={i} className="bg-maven-green-light/10 border border-maven-cream/5 p-3 rounded-xl space-y-1 hover:border-maven-gold/20 transition-all duration-300">
                        <span className="block text-maven-gold font-bold uppercase text-[9px]">{map.title}</span>
                        <span className="block text-maven-cream/90 leading-normal">{map.details}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-maven-cream/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[9px] font-mono text-maven-muted">
                  Absorbed under the single, flat-fee managed subscription package.
                </span>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {active.id === 'restaurants' && (
                    <Link
                      href="/hospitality"
                      className="border border-maven-gold/30 hover:border-maven-gold text-maven-gold bg-maven-gold/5 hover:bg-maven-gold hover:text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 focus:outline-none flex items-center gap-1.5 shadow-sm"
                    >
                      Explore Hearth OS Flagship
                      <Sparkles className="w-3 h-3 animate-pulse text-maven-gold" />
                    </Link>
                  )}
                  <button
                    onClick={() => onPrefillInquiry(`Enquire mapping specifications for ${active.name} vertical.`)}
                    className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all focus:outline-none flex items-center gap-1.5"
                  >
                    Configure System Mappings
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
