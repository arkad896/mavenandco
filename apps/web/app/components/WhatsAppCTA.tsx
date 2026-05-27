'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppCTA() {
  const pathname = usePathname();

  // Hide on dashboard and developer sandbox pages to avoid overlaying business panels
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/developer')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <motion.a
        href="https://wa.me/918910121582"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Direct WhatsApp Support"
        className="flex items-center gap-2.5 bg-[#25D366] text-[#081a15] px-4.5 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/20 font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-[#FDFCF0] transition-colors duration-300 group border border-emerald-400/20"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#081a15]/30 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#081a15]"></span>
        </span>
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp Sync</span>
      </motion.a>
    </div>
  );
}
