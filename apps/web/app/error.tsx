'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Logo from './components/Logo';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or reporting system
    console.error('🚨 Global Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip flex flex-col justify-between selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12352A] rounded-full filter blur-[150px] opacity-35 pointer-events-none -z-10" />

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e]/50 backdrop-blur-md p-10 space-y-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle red line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-[#12352A] border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="h-8 w-8 animate-bounce" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest">Runtime Exception</span>
            <h1 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
              System <span className="italic">Interrupted.</span>
            </h1>
            <p className="text-xs font-mono text-[#FDFCF0]/60 leading-relaxed max-w-xs mx-auto">
              A critical runtime error has occurred. Our telemetry node has captured this event for immediate engineering patch.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-[#C9A84C]/50">
                Digest Hash: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C9A84C] text-[#081a15] text-xs font-mono hover:bg-[#FDFCF0] transition-colors duration-300 group shadow-lg shadow-[#C9A84C]/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reboot App
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#FDFCF0]/10 bg-transparent text-[#FDFCF0] text-xs font-mono hover:bg-[#FDFCF0]/5 transition-colors duration-300"
            >
              <Home className="h-3.5 w-3.5" />
              Terminal Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[10px] font-mono text-[#FDFCF0]/30 border-t border-[#FDFCF0]/5 z-10">
        <p>&copy; {new Date().getFullYear()} Maven & Co. Security Core v5.1</p>
      </footer>
    </div>
  );
}
