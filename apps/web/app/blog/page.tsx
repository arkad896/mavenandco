'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../../lib/blog';

export default function BlogDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#12352A] text-[#FDFCF0] font-body relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A2119]">
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
        <Link href="/" className="flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
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
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-16 relative z-10">
        {/* Editorial Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/20 bg-[#0A2119]/50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Hospitality Editorial</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight leading-none text-[#FDFCF0]">
            Maven Insights
          </h1>
          <p className="text-sm sm:text-base text-[#8FAF95] font-light leading-relaxed">
            Analytical blueprints, operational case breakdowns, and margin strategy guides selected exclusively for forward-thinking restaurateurs, cafe owners, and hoteliers.
          </p>
        </div>

        {/* Category Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-[#C9A84C]/10 pb-6 max-w-xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-[#C9A84C] text-[#0A2119] font-bold shadow-md shadow-[#C9A84C]/10' 
                  : 'bg-[#0A2119]/50 border border-[#C9A84C]/10 text-[#FDFCF0]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/35'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredPosts.map((post, idx) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between bg-[#0A2119]/40 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/5 relative overflow-hidden"
            >
              {/* Top ambient hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C9A84C]/[0.01] to-[#C9A84C]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-wider text-[#8FAF95] mb-4">
                  <span className="text-[#C9A84C] border border-[#C9A84C]/20 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/5">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 group-hover:text-gold-gradient group-hover:text-[#E8C97A] transition-colors duration-300 leading-tight">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#8FAF95]/80 font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Author & CTA */}
              <div className="border-t border-[#C9A84C]/10 pt-6 mt-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1C4A38] border border-[#C9A84C]/25 flex items-center justify-center font-mono text-[10px] font-bold text-[#C9A84C]">
                    {post.author.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-[#FDFCF0]">{post.author.name}</span>
                    <span className="text-[8px] font-mono text-[#8FAF95] uppercase">{post.author.role}</span>
                  </div>
                </div>

                <Link 
                  href={`/blog/${post.slug}`} 
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C9A84C] group-hover:text-[#FDFCF0] transition-colors duration-300"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-12 text-center text-xs font-mono text-[#8FAF95]/50 relative z-10 max-w-7xl mx-auto">
        <p>© 2026 Maven & Co. | Designed with passion for hospitality pioneers.</p>
      </footer>
    </div>
  );
}
