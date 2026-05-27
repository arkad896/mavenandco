'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import Logo from '../components/Logo';

export default function PrivacyPage() {
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
            <Shield className="h-3.5 w-3.5" />
            Privacy Integrity Protocols
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Privacy <span className="italic text-[#C9A84C]">Policy.</span>
          </h1>
          <p className="font-mono text-xs text-[#FDFCF0]/45">
            Last Updated: May 28, 2026 • Maven Compliance Node 1.2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="prose prose-invert max-w-none font-mono text-xs text-[#FDFCF0]/75 leading-relaxed space-y-8"
        >
          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">1. Protocol & Framework</h2>
            <p>
              At Maven & Co. ("Maven", "we", "us", "our"), we process customer and operational transaction metadata with high-end architectural isolation. This Privacy Policy details how we aggregate, store, and utilize data across our Hearth Hospitality OS, WhatsApp CRM Autopilots, and geofenced Meta advertising pipelines.
            </p>
            <p>
              We act in full compliance with the Digital Personal Data Protection (DPDP) Act of India, ensuring all user rights regarding consent, correction, and erasure are rigorously enforced.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">2. Information Collection & Ingestion</h2>
            <p>
              We collect information to deliver specialized local systems operations:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Lead Forms & Registration:</strong> Personal identification data (names, phone numbers, corporate email addresses) submitted to register active intake slots.</li>
              <li><strong>Terminal API Syncs:</strong> Real-time checkout transactions, item catalog codes, and seat bookings cached directly from Toast, Clover, or Square databases.</li>
              <li><strong>WhatsApp Conversational Logs:</strong> Operational prompts and customer inquiries captured via verified Twilio or Meta WhatsApp Business accounts for auto-response training.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">3. Storage & AES Encryption</h2>
            <p>
              Telemetry data is securely partitioned inside our Postgres (Supabase) environments. All client-specific webhook keys, terminal passwords, and session identities are isolated using envelope-grade encryption (FIPS 140-2 Level 3 equivalent), ensuring complete shielding in the event of external network disruptions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">4. Third-Party Integrations & Relays</h2>
            <p>
              Maven works in tandem with third-party cloud infrastructure networks:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vercel Edge Networks:</strong> Renders static page builds, caches global image assets, and tracks core web vitals.</li>
              <li><strong>Resend Email Relay:</strong> Delivers multi-factor secure OTP authentication and system diagnostic logs.</li>
              <li><strong>Google Analytics:</strong> Optimizes audience routing and monitors anonymous site navigation paths.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-serif text-[#FDFCF0] uppercase tracking-wider border-b border-[#FDFCF0]/10 pb-2">5. User Compliance Rights</h2>
            <p>
              Pursuant to legal mandates, you retain absolute authority to request the auditing, modification, or permanent erasure of your corporate profile and transaction summaries stored in our nodes. To execute a digital erasure command, contact our security controllers directly at <a href="mailto:hello@itsmaven.in" className="text-[#C9A84C] hover:underline">hello@itsmaven.in</a>.
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FDFCF0]/10 py-12 text-center text-xs font-mono text-[#FDFCF0]/40">
        <p>&copy; {new Date().getFullYear()} MAVEN & CO. Systems Compliance Hub.</p>
      </footer>
    </div>
  );
}
