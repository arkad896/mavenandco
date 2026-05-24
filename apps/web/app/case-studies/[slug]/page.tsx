'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Sparkles, MapPin, CheckCircle2, AlertCircle, Quote, ArrowRight } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../../../lib/case-studies';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyAnalyzer({ params }: PageProps) {
  const study = CASE_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  // Custom JSON-LD schema for Case Studies
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": study.title,
    "description": study.summary,
    "datePublished": new Date(study.date).toISOString().split('T')[0],
    "about": {
      "@type": "Organization",
      "name": study.restaurantName,
      "location": study.location
    },
    "author": {
      "@type": "Organization",
      "name": "Maven & Co."
    },
    "publisher": {
      "@type": "Organization",
      "name": "Maven & Co.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mavenandco.in/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#12352A] text-[#FDFCF0] font-body relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A2119]">
      <head>
        <title>{`${study.title} | Maven & Co. Success`}</title>
        <meta name="description" content={study.summary} />
        <meta name="keywords" content={study.seoKeywords.join(', ')} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      {/* Background grain */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient vector grid */}
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
        <Link href="/case-studies" className="flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Case Studies</span>
        </Link>
        <Link href="/" className="flex flex-col group text-center focus:outline-none">
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
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 relative z-10">
        
        {/* Breadcrumb Info */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-[#8FAF95] mb-6">
          <span className="text-[#C9A84C] border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3 py-1 rounded-full">
            {study.cuisine}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{study.location}</span>
          </div>
          <span>•</span>
          <span>{study.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-8 text-[#FDFCF0] border-b border-[#C9A84C]/10 pb-8">
          {study.title}
        </h1>

        {/* Top Verified Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#0A2119] to-[#1C4A38]/30 border border-[#C9A84C]/15 p-6 rounded-2xl relative overflow-hidden">
              <span className="block text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider mb-2">{metric.label}</span>
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#C9A84C] block mb-1">{metric.value}</span>
              {metric.subtext && <span className="text-[9px] font-mono text-[#8FAF95]/60 uppercase tracking-widest">{metric.subtext}</span>}
            </div>
          ))}
        </div>

        {/* Section 1: Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#FDFCF0] mb-4 border-l-2 border-[#C9A84C] pl-4">
            Operational Overview
          </h2>
          <p className="text-sm sm:text-base text-[#FDFCF0]/85 font-light leading-relaxed">
            {study.overview}
          </p>
        </div>

        {/* Section 2: Pain vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Before Maven */}
          <div className="bg-[#0A2119]/50 border border-[#C9A84C]/10 hover:border-red-500/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] uppercase tracking-widest mb-4">
              <AlertCircle className="w-4 h-4" />
              <span>Before Maven OS</span>
            </div>
            <ul className="space-y-4">
              {study.beforeMaven.painPoints.map((pain, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-[#FDFCF0]/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 animate-pulse" />
                  <p>{pain}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#C9A84C]/10 mt-6 pt-4 text-[10px] font-mono text-red-300/80 uppercase">
              Commission leakage: {study.beforeMaven.commissionLeakage}
            </div>
          </div>

          {/* After Maven */}
          <div className="bg-[#0A2119]/50 border border-[#C9A84C]/20 hover:border-[#C9A84C]/45 p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-[10px] uppercase tracking-widest mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" />
              <span>Deployed Solution</span>
            </div>
            <ul className="space-y-4">
              {study.afterMaven.solutions.map((sol, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-[#FDFCF0]/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                  <p>{sol}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#C9A84C]/15 mt-6 pt-4 text-[10px] font-mono text-[#C9A84C] uppercase font-bold">
              Margin improvement: {study.afterMaven.marginIncrease}
            </div>
          </div>
        </div>

        {/* Section 3: Performance Comparison Matrix */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#FDFCF0] mb-6 border-l-2 border-[#C9A84C] pl-4">
            Quantitative Performance Matrix
          </h2>
          <div className="border border-[#C9A84C]/10 rounded-2xl overflow-hidden bg-[#0A2119]/40 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C9A84C]/15 text-[10px] font-mono text-[#8FAF95] uppercase tracking-widest">
                    <th className="py-4 px-6">Operational Metric</th>
                    <th className="py-4 px-6 text-center">Before Maven</th>
                    <th className="py-4 px-6 text-center">After Maven OS</th>
                    <th className="py-4 px-6 text-right">Net Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/5 text-xs sm:text-sm font-light text-[#FDFCF0]/90">
                  {study.metricsComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#C9A84C]/5 transition-colors">
                      <td className="py-4 px-6 font-mono text-[11px] tracking-wide text-[#FDFCF0]">{row.metric}</td>
                      <td className="py-4 px-6 text-center text-red-300">{row.before}</td>
                      <td className="py-4 px-6 text-center text-emerald-400 font-medium">{row.after}</td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-[#C9A84C]">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: Verified Testimonial Quote */}
        <div className="my-12 bg-[#0A2119]/60 border-y border-[#C9A84C]/20 py-8 px-6 sm:px-10 relative rounded-md text-center max-w-3xl mx-auto">
          <Quote className="w-8 h-8 text-[#C9A84C]/25 absolute top-4 left-4" />
          <p className="text-base sm:text-lg font-serif italic text-[#E8C97A] mb-4 leading-relaxed">
            "{study.quote.text}"
          </p>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-[#FDFCF0]">{study.quote.author}</span>
            <span className="text-[9px] font-mono text-[#8FAF95] uppercase tracking-widest mt-1">{study.quote.role}</span>
          </div>
        </div>

        {/* Dynamic bottom CTA Card */}
        <div className="mt-16 border border-[#C9A84C]/20 bg-gradient-to-b from-[#0A2119] to-[#12352A] p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <Sparkles className="w-6 h-6 text-[#C9A84C] mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFCF0] mb-3">
            Deploy Maven OS in Your Venue
          </h3>
          <p className="text-xs sm:text-sm text-[#8FAF95] max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Reclaim your profit margins, automate guest relationships, and run restaurant billing natively under a single flat monthly operating fee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/#inquire"
              className="text-xs font-mono uppercase tracking-widest bg-[#C9A84C] text-[#0A2119] hover:bg-[#FDFCF0] px-6 py-3 rounded-full transition-all duration-300 font-bold"
            >
              Configure Your Package
            </Link>
            <Link 
              href="/blog"
              className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] hover:text-[#FDFCF0] flex items-center gap-1"
            >
              <span>Read Strategy Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      {/* Styled Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-12 text-center text-xs font-mono text-[#8FAF95]/50 relative z-10 max-w-7xl mx-auto">
        <p>© 2026 Maven & Co. | Audited and verified performance data.</p>
      </footer>
    </div>
  );
}
