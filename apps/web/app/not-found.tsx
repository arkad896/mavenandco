'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import Logo from './components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip flex flex-col justify-between selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12352A] rounded-full filter blur-[150px] opacity-35 pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-[#C9A84C]/5 rounded-full filter blur-[80px] opacity-20 pointer-events-none -z-10" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo variant="monogram" size="sm" />
          <span className="font-serif italic text-lg tracking-wider font-bold leading-none text-[#FDFCF0] group-hover:text-[#C9A84C] transition-colors duration-300">MAVEN</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e]/50 backdrop-blur-md p-10 space-y-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gold line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-[#12352A] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
              <Compass className="h-8 w-8 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest">Error 404</span>
            <h1 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
              Lost in <span className="italic">Transmission.</span>
            </h1>
            <p className="text-xs font-mono text-[#FDFCF0]/60 leading-relaxed max-w-xs mx-auto">
              The page you are looking for has been moved, archived, or does not exist in the Maven operating system.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A84C] text-[#081a15] text-xs font-mono hover:bg-[#FDFCF0] transition-colors duration-300 group shadow-lg shadow-[#C9A84C]/10"
            >
              Back to Terminal
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[10px] font-mono text-[#FDFCF0]/30 border-t border-[#FDFCF0]/5 z-10">
        <p>&copy; {new Date().getFullYear()} Maven & Co. Systems Node 4.0.4</p>
      </footer>
    </div>
  );
}
