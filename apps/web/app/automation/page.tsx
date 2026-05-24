'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AutomationFocusPage() {
  const [activeTrigger, setActiveTrigger] = useState<string>('book');

  const chatFlows = {
    book: {
      userTrigger: "Hey, can I book a table for 4 tonight at 8 PM?",
      botResponse: "✨ reservation booked! ✨\n\nI have locked in a table for 4 guests under your name tonight at 8:00 PM. A SMS validation link has been dispatched to your device.\n\nType /menu to view Laurent's seasonal tasting options.",
      benefit: "Automated Seat Allocations",
      desc: "Our engine interfaces directly with active seating capacities, booking patrons into your POS or reservation grid instantly without team intervention."
    },
    menu: {
      userTrigger: "What is on the seasonal menu?",
      botResponse: "🌿 Laurent's Tasting Menu 🌿\n\n1. Smoked Trout Crudo with Sorrel\n2. Dry-aged duck breast with lavender honey glaze\n3. Burnt honey gelato with honeycomb crisps\n\nWould you like me to match wine pairings? (Reply /pairings)",
      benefit: "Live Digital Menus",
      desc: "Pushes elegant, cached digital menu cards and up-sell suggestions directly inside the chat, increasing high-margin beverage order values."
    },
    hours: {
      userTrigger: "Are you open on Sunday?",
      botResponse: "🕒 Operating Hours 🕒\n\nMonday - Thursday: 5:00 PM - 11:00 PM\nFriday - Saturday: 5:00 PM - 1:00 AM\nSunday: 11:00 AM - 9:00 PM (Brunch Spec)\n\nWe currently have a 25-minute wait for walk-ins today. Type /join-waitlist to lock your place.",
      benefit: "Intelligent Waitlists",
      desc: "Instantly handles common informational queries while offering dynamic waitlist placement, keeping your host stand clear of phone traffic."
    }
  };

  const activeFlow = chatFlows[activeTrigger as keyof typeof chatFlows];

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#12352A] rounded-full filter blur-[120px] opacity-30 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full filter blur-[100px] opacity-20 pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="border-b border-[#FDFCF0]/10 backdrop-blur-md sticky top-0 z-50 bg-[#081a15]/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono">Back to Platform</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="font-serif italic text-lg tracking-wider font-bold">MAVEN</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] font-mono">OS</span>
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
            <Bot className="h-3 w-3" />
            WhatsApp Business Cloud API
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight">
            Conversational CRM. <br />
            <span className="italic text-[#C9A84C]">Zero Staff Overhead.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#FDFCF0]/60 font-mono leading-relaxed">
            Convert user inquiries into immediate table covers. Maven’s direct Meta Cloud integrations process menus, reservations, and feedback checks instantly inside the guest's favorite chat application.
          </p>
        </motion.div>
      </section>

      {/* Interactive Bento Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* API Speed Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif">Instant Outbound Routing</h3>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              Guests demand answers in seconds. Maven routes Cloud webhooks in under 120ms, parsing custom triggers and fetching real-time database slot availabilities to respond instantly.
            </p>
          </div>
          <div className="p-3 bg-[#12352A]/30 border border-[#FDFCF0]/5 rounded-xl font-mono text-[10px] text-[#C9A84C] flex items-center justify-center gap-2">
            ⚡ Avg Response Time: 118ms
          </div>
        </motion.div>

        {/* Security & Verification Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-2 border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif">Official Verified Meta green badge</h3>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              Build immediate guest trust. Maven secures and registers your brand with Meta's official Business Partner program, ensuring your chat handles appear with high-fidelity green verification badges, business profiles, catalog menus, and secure call-to-action buttons.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FDFCF0]/5 font-mono text-center">
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">TRUST INDEX</div>
              <div className="text-lg font-bold text-emerald-400">99.4%</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">OPEN RATE</div>
              <div className="text-lg font-bold text-[#C9A84C]">98.2%</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">GUEST RETENTION</div>
              <div className="text-lg font-bold text-emerald-400">+35%</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Chat Console */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="border border-[#FDFCF0]/10 rounded-3xl bg-[#091a15] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Conversation Controls */}
          <div className="p-8 md:p-12 space-y-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#FDFCF0]/10">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">Trigger Console</span>
              <h2 className="text-3xl font-serif">Automated Guest Tree</h2>
              <p className="text-xs font-mono text-[#FDFCF0]/60 leading-relaxed">
                Choose a guest query trigger below to preview how the automated chatbot matches triggers and dynamically replies using database-backed checks.
              </p>
            </div>

            {/* Selection Toggles */}
            <div className="flex flex-col gap-2.5 font-mono text-xs">
              {(['book', 'menu', 'hours'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTrigger(type)}
                  className={`py-3.5 px-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between ${
                    activeTrigger === type
                      ? 'bg-[#C9A84C] text-[#081a15] border-[#C9A84C] font-semibold'
                      : 'border-[#FDFCF0]/10 hover:border-[#C9A84C]/50 hover:bg-[#12352A]/20'
                  }`}
                >
                  <span className="capitalize">{type === 'book' ? '📅 Table Booking' : type === 'menu' ? '🍴 Digital Menu' : '🕒 Operations Hours'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Operational Highlight */}
            <div className="bg-[#12352A]/20 border border-[#FDFCF0]/5 p-4 rounded-2xl font-mono text-xs space-y-1">
              <div className="text-[10px] text-[#C9A84C] uppercase tracking-wider font-semibold">{activeFlow.benefit}</div>
              <div className="text-[11px] text-[#FDFCF0]/60 leading-relaxed">{activeFlow.desc}</div>
            </div>
          </div>

          {/* Interactive Chat Stream */}
          <div className="p-8 md:p-12 bg-[#0c241e]/50 flex items-center justify-center">
            <div className="w-full max-w-[300px] border border-[#FDFCF0]/10 rounded-2xl bg-[#091a15] overflow-hidden flex flex-col h-[320px] shadow-2xl">
              {/* WhatsApp App Header */}
              <div className="px-4 py-3 bg-[#12352A]/30 border-b border-[#FDFCF0]/5 flex items-center gap-2.5 text-xs">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[#FDFCF0]/80">Maven OS Concierge</span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[10px] flex flex-col justify-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTrigger}-user`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2.5 rounded-xl bg-[#12352A] text-[#FDFCF0] border border-[#C9A84C]/25 max-w-[85%] self-end"
                  >
                    {activeFlow.userTrigger}
                  </motion.div>

                  <motion.div
                    key={`${activeTrigger}-bot`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-2.5 rounded-xl bg-[#091a15] text-[#FDFCF0]/90 border border-[#FDFCF0]/10 max-w-[85%] self-start whitespace-pre-line"
                  >
                    {activeFlow.botResponse}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="border-t border-[#FDFCF0]/10 py-12 text-center text-xs font-mono text-[#FDFCF0]/40">
        <p>&copy; {new Date().getFullYear()} Maven Hospitality OS. Architectural Focus Node 2.2.</p>
      </footer>
    </div>
  );
}
