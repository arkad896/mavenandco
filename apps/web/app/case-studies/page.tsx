'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CASE_STUDIES } from '../../lib/case-studies';

export default function CaseStudiesDirectory() {
  return (
    <div className="min-h-screen bg-[#12352A] text-[#FDFCF0] font-body relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A2119]">
      {/* Background grain */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient vector grid & glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Premium Header */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center border-b border-[#C9A84C]/10 bg-[#12352A]/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <Link href="/" aria-label="Maven Home" className="flex flex-col group text-center focus:outline-none">
          <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#FDFCF0] group-hover:text-[#C9A84C] transition-colors duration-500">
            MAVEN
          </span>
          <span className="text-[8px] font-mono tracking-[0.25em] text-[#8FAF95] uppercase leading-none">
            HOSPITALITY OS
          </span>
        </Link>
        <Link 
          href="/#inquire"
          className="text-[10px] font-mono uppercase tracking-widest bg-[#C9A84C] text-[#0A2119] hover:bg-[#FDFCF0] px-4 py-2 rounded-full transition-all duration-300 font-bold"
        >
          Inquire Now
        </Link>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-16 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/20 bg-[#0A2119]/50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proven Operational Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight leading-none text-[#FDFCF0]">
            Case Studies
          </h1>
          <p className="text-sm sm:text-base text-[#8FAF95] font-light leading-relaxed">
            Real metrics, verified margins, and precise tactical breakdowns of food brands that unified their marketing, POS, and CRM under the Maven OS.
          </p>
        </div>

        {/* Grid List */}
        <div className="space-y-10">
          {CASE_STUDIES.map((study, idx) => (
            <motion.article 
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#0A2119]/40 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 p-6 sm:p-10 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/5 relative overflow-hidden flex flex-col lg:flex-row justify-between gap-8"
            >
              {/* Left Column: Summary & Bio */}
              <div className="lg:w-[60%] flex flex-col justify-between">
                <div>
                  {/* Category Pill / Location */}
                  <div className="flex items-center gap-3 text-[10px] font-mono tracking-wider text-[#8FAF95] mb-4">
                    <span className="text-[#C9A84C] border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3 py-0.5 rounded-full">
                      {study.cuisine}
                    </span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{study.location}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 leading-tight group-hover:text-[#E8C97A] transition-colors duration-300">
                    {study.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#8FAF95]/80 font-light leading-relaxed mb-6">
                    {study.summary}
                  </p>
                </div>

                {/* Quote snippet */}
                <div className="border-l-2 border-[#C9A84C]/40 pl-4 py-1.5 italic text-xs text-[#FDFCF0]/70 font-serif mb-6 lg:mb-0">
                  "{study.quote.text}"
                  <span className="block font-mono text-[9px] text-[#C9A84C] uppercase tracking-wider not-italic mt-1.5">— {study.quote.author}, {study.quote.role}</span>
                </div>
              </div>

              {/* Right Column: Dynamic Core Metric Pills */}
              <div className="lg:w-[35%] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#C9A84C]/10 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-widest block mb-2">Verified Growth:</span>
                  {study.metrics.map((metric, metricIdx) => (
                    <div 
                      key={metricIdx} 
                      className="bg-[#0A2119]/80 border border-[#C9A84C]/10 p-4 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-[#8FAF95]/80 uppercase">{metric.label}</span>
                        {metric.subtext && <span className="text-[8px] font-mono text-[#8FAF95]/50 uppercase">{metric.subtext}</span>}
                      </div>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#C9A84C]">{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Read Button */}
                <div className="mt-8 flex justify-end">
                  <Link 
                    href={`/case-studies/${study.slug}`} 
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-[#C9A84C] text-[#0A2119] hover:bg-[#FDFCF0] px-6 py-3 rounded-full transition-all duration-300 font-bold group-hover:scale-105"
                  >
                    <span>Analyze Case</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </main>

      {/* Styled Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-12 text-center text-xs font-mono text-[#8FAF95]/50 relative z-10 max-w-7xl mx-auto">
        <p>© 2026 Maven & Co. | Audited with real performance data.</p>
      </footer>
    </div>
  );
}
