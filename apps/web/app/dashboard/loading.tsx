'use client';

import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans antialiased overflow-x-clip p-6 flex flex-col justify-between selection:bg-[#C9A84C]/30 selection:text-[#FDFCF0]">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#12352A] rounded-full filter blur-[120px] opacity-20 pointer-events-none -z-10" />

      {/* Header Skeleton */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 border-b border-[#FDFCF0]/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#FDFCF0]/5 animate-pulse" />
          <div className="h-5 w-24 rounded bg-[#FDFCF0]/10 animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 rounded bg-[#FDFCF0]/5 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-[#FDFCF0]/10 animate-pulse" />
        </div>
      </div>

      {/* Main Workspace Grid Skeleton */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav Skeleton */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          <div className="h-4 w-1/3 rounded bg-[#FDFCF0]/10 animate-pulse mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg border border-transparent">
                <div className="h-4 w-4 rounded bg-[#FDFCF0]/5 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-[#FDFCF0]/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Headline & Breadcrumbs */}
          <div className="space-y-3">
            <div className="h-3 w-20 rounded bg-[#C9A84C]/25 animate-pulse" />
            <div className="h-8 w-2/3 rounded bg-[#FDFCF0]/10 animate-pulse" />
          </div>

          {/* Metric Cards Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#FDFCF0]/10 rounded-2xl bg-[#0c241e]/50 backdrop-blur-md p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-1/2 rounded bg-[#FDFCF0]/15 animate-pulse" />
                  <div className="h-5 w-5 rounded bg-[#C9A84C]/20 animate-pulse" />
                </div>
                <div className="h-8 w-3/4 rounded bg-[#FDFCF0]/10 animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-[#FDFCF0]/5 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Large Content Block Skeleton */}
          <div className="border border-[#FDFCF0]/10 rounded-3xl bg-[#0c241e]/30 backdrop-blur-md p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#FDFCF0]/5 pb-4">
              <div className="h-4 w-1/4 rounded bg-[#FDFCF0]/10 animate-pulse" />
              <div className="h-6 w-20 rounded bg-[#C9A84C]/10 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#FDFCF0]/5">
                  <div className="space-y-2 w-1/3">
                    <div className="h-4 w-full rounded bg-[#FDFCF0]/10 animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-[#FDFCF0]/5 animate-pulse" />
                  </div>
                  <div className="h-4 w-16 rounded bg-[#FDFCF0]/15 animate-pulse" />
                  <div className="h-4 w-8 rounded bg-[#C9A84C]/20 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full text-center text-[10px] font-mono text-[#FDFCF0]/20 py-8 border-t border-[#FDFCF0]/5 mt-12">
        <p>&copy; {new Date().getFullYear()} Maven Systems Inc. Workspace Auth Node</p>
      </footer>
    </div>
  );
}
