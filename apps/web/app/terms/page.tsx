'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale } from 'lucide-react';
import Logo from '../components/Logo';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#12352A] rounded-full filter blur-[120px] opacity-20 pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-[#FDFCF0]/10 backdrop-blur-md sticky top-0 z-50 bg-[#081a15]/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono">Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="monogram" size="sm" />
            <span className="font-serif italic text-lg tracking-wider font-bold leading-none">MAVEN</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12352A] border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-mono tracking-wider uppercase">
            <Scale className="h-3.5 w-3.5" />
            Legal Service Compact
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Terms of <span className="italic text-[#C9A84C]">Service.</span>
          </h1>
          <p className="font-mono text-xs text-[#FDFCF0]/45">
            Last Updated: May 28, 2026 • Maven Legal Node 1.2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="prose prose-invert max-w-none font-mono text-xs text-[#FDFCF0]/75 leading-relaxed space-y-8"
        >
          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">1. Scope of Managed Service</h2>
            <p>
              Maven & Co. ("Maven") delivers customized local operating systems, data aggregation models, digital interface layouts, and white-glove engineering support as a flat-rate managed subscription. By engaging our builders or authorizing system synchronizations, you agree to comply with the operational conditions laid out in this service agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">2. Subscription & Commission-Free Model</h2>
            <p>
              Our services are billed on a flat, recurring monthly schedule. In contrast to standard software aggregators:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Zero Transaction Tax:</strong> Maven charges absolutely no percentage-based commissions on digital transactions, table reservation bookings, or marketing-derived sales.</li>
              <li><strong>Billing Recurrence:</strong> Subscriptions are auto-invoiced on the first day of every operational cycle. Failure to settle outstanding balances within 7 calendar days may result in system suspension.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">3. Terminal Integrations & Offline Security</h2>
            <p>
              Clients authorize Maven to deploy custom webhook listeners and query active inventory/booking layers from Toast, Clover, or Square databases. We guarantee:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Local Resiliency:</strong> Dual-write SQLite databases will function offline during terminal disconnects.</li>
              <li><strong>Credential Shielding:</strong> We encrypt and store terminal credentials securely, and they will never be shared, exposed, or leased to third-party entities.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">4. Acceptable Conduct & Autopilot Operations</h2>
            <p>
              Clients must utilize WhatsApp conversational CRM autopilots in accordance with standard conversational guidelines. Spamming, bulk dispatching unapproved promotion lists to raw phone directories, or using autopilot nodes for malicious actions will result in immediate termination of the client's integration lease.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">5. Jurisdictional Mandate</h2>
            <p>
              This compact is governed by and construed under the sovereign laws of the Republic of India. Any litigation, dispute, or non-performance arbitration arising from Maven OS integrations will fall under the exclusive jurisdiction of the state courts located in Kolkata, West Bengal, India.
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FDFCF0]/10 py-12 text-center text-xs font-mono text-[#FDFCF0]/40">
        <p>&copy; {new Date().getFullYear()} MAVEN & CO. Legal Node.</p>
      </footer>
    </div>
  );
}
