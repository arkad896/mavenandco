'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';

export default function DashboardRouterPage() {
  const router = useRouter();

  useEffect(() => {
    // Read session state from localStorage
    const sessionStr = localStorage.getItem('maven_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'admin') {
          router.replace('/dashboard/admin');
          return;
        } else if (session.role === 'client' && session.brandId) {
          router.replace('/dashboard/client');
          return;
        }
      } catch (err) {
        console.error('Invalid session format, clearing...', err);
        localStorage.removeItem('maven_session');
      }
    }
    // Fallback to login
    router.replace('/dashboard/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans flex items-center justify-center relative overflow-hidden">
      {/* Ambient glowing vectors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#12352A] blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,252,240,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Luxury Onboarding Loading Spinner */}
      <div className="flex flex-col items-center gap-2 text-center relative z-10 select-none">
        <Logo variant="monogram" size="sm" className="mb-2 animate-pulse" />
        <span className="font-display font-bold text-2xl tracking-[0.2em] text-[#C9A84C]">
          MAVEN
        </span>
        <div className="h-6 w-6 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mt-2" />
        <span className="text-[9px] font-mono tracking-widest text-[#8FAF95] uppercase mt-2">
          Securing session pipeline…
        </span>
      </div>
    </div>
  );
}
