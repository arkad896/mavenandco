'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, DollarSign, Percent, Users, Award, ChevronRight } from 'lucide-react';

interface CaseStudiesProps {
  onPrefillInquiry: (note: string) => void;
}

export default function CaseStudies({ onPrefillInquiry }: CaseStudiesProps) {
  // Case Study State
  const [activeSegment, setActiveSegment] = useState<'before' | 'after'>('after');
  
  const pilots = [
    {
      id: 'amber',
      name: 'The Amber Pavilion, Kolkata',
      cuisine: 'Fine Dining North Indian',
      before: {
        commission: '₹68,400/mo',
        directBookings: '12%',
        posCost: '₹4,500/mo',
        retention: '14%'
      },
      after: {
        commission: '₹0 (0% Commission QR)',
        directBookings: '46%',
        posCost: '₹0 (Maven Bundle)',
        retention: '42%'
      },
      stats: [
        { label: 'Booking Growth', value: '+34%', icon: TrendingUp },
        { label: 'Commissions Retained', value: '₹68,400/mo', icon: DollarSign }
      ]
    },
    {
      id: 'siena',
      name: 'Siena Bistro, Bangalore',
      cuisine: 'European Cafe & Bakery',
      before: {
        commission: '₹34,100/mo',
        directBookings: '8%',
        posCost: '₹4,000/mo',
        retention: '18%'
      },
      after: {
        commission: '₹0 (0% Commission QR)',
        directBookings: '52%',
        posCost: '₹0 (Maven Bundle)',
        retention: '64%'
      },
      stats: [
        { label: 'CRM VIP Retention', value: '92%', icon: Users },
        { label: 'WhatsApp Conversions', value: '88%', icon: Percent }
      ]
    }
  ];

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Verified Case Studies
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Real Pilot Performance Records
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Toggle metrics below to compare direct cost structures of our active pilot hospitality clients under traditional models vs. the unified Maven Operating System.
          </p>
        </div>

        {/* Before / After toggle */}
        <div className="flex border border-maven-cream/10 rounded-xl overflow-hidden bg-maven-green-dark/40 p-1 text-xs font-mono">
          <button 
            onClick={() => setActiveSegment('before')}
            className={`px-4 py-2 rounded-lg transition-all ${activeSegment === 'before' ? 'bg-red-500/10 border border-red-500/25 text-red-400 font-bold' : 'text-maven-muted'}`}
          >
            Before Maven
          </button>
          <button 
            onClick={() => setActiveSegment('after')}
            className={`px-4 py-2 rounded-lg transition-all ${activeSegment === 'after' ? 'bg-maven-gold text-maven-green-dark font-bold' : 'text-maven-muted'}`}
          >
            With Maven OS
          </button>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Siena Bistro Bento Card (Left col 7) */}
        <div className="lg:col-span-7 bg-maven-green-dark border border-maven-gold/15 p-6 rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono text-maven-gold uppercase tracking-wider">{pilots[1].cuisine}</span>
                <h4 className="text-xl font-serif font-bold text-maven-cream mt-1">{pilots[1].name}</h4>
              </div>
              <span className="text-[9px] font-mono tracking-widest bg-maven-gold/20 text-maven-gold border border-maven-gold/30 py-1 px-3 rounded-full">
                CASE PILOT #02
              </span>
            </div>

            {/* Matrix details */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl space-y-1">
                <span className="text-[8px] font-mono text-maven-muted uppercase">ZOMATO/SWIGGY COMMISSION LEAK</span>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeSegment}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm font-mono font-bold ${activeSegment === 'before' ? 'text-red-400' : 'text-emerald-400'}`}
                  >
                    {activeSegment === 'before' ? pilots[1].before.commission : pilots[1].after.commission}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl space-y-1">
                <span className="text-[8px] font-mono text-maven-muted uppercase">GUEST CRM RETENTION RATE</span>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeSegment}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm font-mono font-bold ${activeSegment === 'before' ? 'text-red-400 font-medium' : 'text-maven-gold font-extrabold'}`}
                  >
                    {activeSegment === 'before' ? pilots[1].before.retention : pilots[1].after.retention}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-maven-muted leading-relaxed">
              Siena Bistro merged their POS and CRM databases using Maven. By firing Meta conversions that trigger automated WhatsApp birthday campaigns and QR menus, Siena achieved a **92% VIP Guest Re-engagement rate** with absolute zero marketing overhead.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-maven-cream/5">
            <div className="flex gap-6">
              {pilots[1].stats.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-maven-gold/10 flex items-center justify-center text-maven-gold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-[10px]">
                      <span className="font-bold text-maven-cream">{st.value}</span>
                      <span className="text-maven-muted font-mono uppercase text-[8px]">{st.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={() => onPrefillInquiry('Requested Siena Bistro WhatsApp/CRM custom deployment walkthrough.')}
              className="text-[9px] font-mono tracking-widest text-maven-gold uppercase flex items-center gap-1 group-hover:text-maven-cream transition-colors"
            >
              Analyze Case
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Amber Pavilion Bento Card (Right col 5) */}
        <div className="lg:col-span-5 bg-maven-green-dark border border-maven-gold/15 p-6 rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-maven-gold uppercase tracking-wider">{pilots[0].cuisine}</span>
              <h4 className="text-xl font-serif font-bold text-maven-cream mt-1">{pilots[0].name}</h4>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-maven-cream/5 pb-2">
                <span className="text-maven-muted">Monthly Aggregator Commission</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeSegment}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`font-mono font-bold ${activeSegment === 'before' ? 'text-red-400' : 'text-emerald-400'}`}
                  >
                    {activeSegment === 'before' ? pilots[0].before.commission : pilots[0].after.commission}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center text-xs border-b border-maven-cream/5 pb-2">
                <span className="text-maven-muted">Direct Online QR Bookings</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeSegment}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`font-mono font-bold ${activeSegment === 'before' ? 'text-red-400' : 'text-maven-gold'}`}
                  >
                    {activeSegment === 'before' ? pilots[0].before.directBookings : pilots[0].after.directBookings}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center text-xs border-b border-maven-cream/5 pb-2">
                <span className="text-maven-muted">Petpooja POS Terminal fee</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeSegment}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`font-mono font-bold ${activeSegment === 'before' ? 'text-red-400' : 'text-emerald-400'}`}
                  >
                    {activeSegment === 'before' ? pilots[0].before.posCost : pilots[0].after.posCost}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-[11px] text-maven-muted leading-relaxed">
              Before merging with Maven, The Amber Pavilion leaked ₹68,400 monthly on aggregator commissions. Utilizing the Maven flat-rate POS + Ads setup, they directed customers onto zero-commission QR sheets.
            </p>
          </div>

          <button 
            onClick={() => onPrefillInquiry('Requested The Amber Pavilion zero-commission QR checkout case study details.')}
            className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1"
          >
            Review Amber Pavilion Strategy
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
