'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Database, Server, RefreshCw, Layers } from 'lucide-react';
import Logo from '../components/Logo';

export default function PosFocusPage() {
  const specs = [
    {
      feature: "Toast Webhook Listeners",
      latency: "< 95ms",
      desc: "Catches real-time terminal checkout payloads dynamically. Synchronizes guest loyalty CRM and revenue trackers instantly."
    },
    {
      feature: "Clover REST Connection",
      latency: "< 110ms",
      desc: "Integrates deep Clover inventory catalogs. Automatically marks seasonal items out of stock as soon as kitchen supplies drain."
    },
    {
      feature: "Square GraphQL Sync",
      latency: "< 125ms",
      desc: "Bridges multi-site transaction checks into a single workspace panel. Perfect for restaurant groups and ghost kitchens."
    }
  ];

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#12352A] rounded-full filter blur-[120px] opacity-30 pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full filter blur-[100px] opacity-20 pointer-events-none -z-10" />

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
            <Cpu className="h-3 w-3" />
            POS Infrastructure Showcase
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight">
            Smooth Integrations. <br />
            <span className="italic text-[#C9A84C]">Zero Terminal Lag.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#FDFCF0]/60 font-mono leading-relaxed">
            Eliminate double entry. Maven mounts directly to your existing hardware infrastructure, aggregating Clover, Toast, and Square events into a unified local database database layer.
          </p>
        </motion.div>
      </section>

      {/* Infrastructure Bento Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Real-time Inventory Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-2 border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif">Dual-Write Database Integrity</h3>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              SaaS platforms fail when offline. Maven is built with a dual-write architecture: transactions are securely stored inside your local SQLite environment and queued instantly. The moment connection drops, transactions continue processing locally, syncing automatically to Cloud servers as soon as connection is restored.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FDFCF0]/5 font-mono text-center">
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">OFFLINE LAG</div>
              <div className="text-lg font-bold text-emerald-400">0ms</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">SYNC RESOLUTION</div>
              <div className="text-lg font-bold text-[#C9A84C]">Instant</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FDFCF0]/40">DB SECURITY</div>
              <div className="text-lg font-bold text-emerald-400">AES-256</div>
            </div>
          </div>
        </motion.div>

        {/* Server Specs Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e] p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif">Secure Keys</h3>
            <p className="text-xs text-[#FDFCF0]/60 leading-relaxed font-mono">
              We encrypt terminal credential stores using high-end envelope encryption, preventing breach access.
            </p>
          </div>
          <div className="p-3 bg-[#12352A]/30 border border-[#FDFCF0]/5 rounded-xl font-mono text-[10px] text-emerald-400 flex items-center justify-center gap-2">
            <Layers className="h-3 w-3" /> FIPS 140-2 Level 3 Validated
          </div>
        </motion.div>
      </section>

      {/* Technical Specifications Table */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border border-[#FDFCF0]/10 rounded-3xl bg-[#091a15] p-8 md:p-12 space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">Operational Specs</span>
            <h2 className="text-3xl font-serif">Cloud Webhook Benchmarks</h2>
            <p className="text-xs font-mono text-[#FDFCF0]/60">
              Technical comparisons of terminal events bridging into the Maven local database ecosystem.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#FDFCF0]/10 text-[#FDFCF0]/40 text-left">
                  <th className="pb-4 font-normal">Terminal Adapter</th>
                  <th className="pb-4 font-normal">Average Webhook Latency</th>
                  <th className="pb-4 font-normal">Security Pipeline</th>
                  <th className="pb-4 font-normal text-right">Data Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDFCF0]/5">
                {specs.map((spec, index) => (
                  <tr key={index} className="hover:bg-[#12352A]/10 transition-colors">
                    <td className="py-5 font-semibold text-[#FDFCF0]/90 flex items-center gap-2">
                      <RefreshCw className="h-3.5 w-3.5 text-[#C9A84C] animate-spin-slow" />
                      {spec.feature}
                    </td>
                    <td className="py-5 text-emerald-400 font-semibold">{spec.latency}</td>
                    <td className="py-5 text-[#FDFCF0]/60">Hashed Secret Validation</td>
                    <td className="py-5 text-[#FDFCF0]/50 text-right">{spec.desc.split(" ")[0]} Model</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Footer Branding */}
      <footer className="border-t border-[#FDFCF0]/10 py-12 text-center text-xs font-mono text-[#FDFCF0]/40">
        <p>&copy; {new Date().getFullYear()} Maven Hospitality OS. Architectural Focus Node 2.3.</p>
      </footer>
    </div>
  );
}
