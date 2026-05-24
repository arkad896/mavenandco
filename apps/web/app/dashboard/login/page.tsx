'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import { 
  Utensils, 
  Coffee, 
  Store, 
  ArrowRight, 
  Lock, 
  Shield, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

import { trpc } from '../../utils/trpc';

const iconMap = {
  utensils: Utensils,
  coffee: Coffee,
  store: Store,
  sparkles: Sparkles,
};

type DbBrand = {
  id: string;
  name: string;
  type: string;
  accent: string;
  icon: string;
  passphrase: string;
  adDescription: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  
  // Dynamic brand fetching
  const { data: fetchedBrands, isLoading } = trpc.getBrands.useQuery();
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [passphrase, setPassphrase] = useState('venuepass');
  const [adminPass, setAdminPass] = useState('admin123');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync selectedBrandId once brands are fetched
  useEffect(() => {
    if (fetchedBrands && fetchedBrands.length > 0 && !selectedBrandId) {
      setSelectedBrandId(fetchedBrands[0].id);
    }
  }, [fetchedBrands, selectedBrandId]);

  // Sync default passphrases on tab change or brand change
  useEffect(() => {
    if (activeTab === 'client') {
      setPassphrase('venuepass');
    } else {
      setAdminPass('admin123');
    }
    setError('');
  }, [activeTab, selectedBrandId]);

  const brandsList: DbBrand[] = (fetchedBrands as DbBrand[]) || [];

  const currentBrand: DbBrand = brandsList.find(b => b.id === selectedBrandId) || brandsList[0] || {
    id: 'fine-dining',
    name: 'The Heritage Room',
    type: 'Fine Dining Restaurant',
    accent: '#C9A84C',
    icon: 'utensils',
    passphrase: 'venuepass',
    adDescription: 'Savor Michelin-inspired traditional recipes recreated with fresh seasonal ingredients.'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (activeTab === 'client') {
        if (!selectedBrandId) {
          setError('No brand selected.');
          setLoading(false);
          return;
        }

        const brandToVerify = brandsList.find(b => b.id === selectedBrandId);
        if (!brandToVerify) {
          setError('Selected brand could not be verified.');
          setLoading(false);
          return;
        }

        if (passphrase === brandToVerify.passphrase) {
          // Store session
          localStorage.setItem('maven_session', JSON.stringify({
            role: 'client',
            brandId: selectedBrandId,
            timestamp: new Date().toISOString()
          }));
          router.push('/dashboard/client');
        } else {
          setError(`Invalid passphrase for "${brandToVerify.name}".`);
          setLoading(false);
        }
      } else {
        if (adminPass === 'admin123') {
          // Store session
          localStorage.setItem('maven_session', JSON.stringify({
            role: 'admin',
            timestamp: new Date().toISOString()
          }));
          router.push('/dashboard/admin');
        } else {
          setError('Invalid administrator access code. Hint: use "admin123"');
          setLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans flex flex-col justify-between relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#081a15]">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#12352A]/30 blur-[120px] pointer-events-none" />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: activeTab === 'client' ? `${currentBrand.accent}15` : 'rgba(201, 168, 76, 0.08)', filter: 'blur(100px)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,252,240,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Navbar Brand */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo variant="monogram" size="sm" />
          <span className="font-display font-bold text-2xl tracking-widest text-[#C9A84C] leading-none">
            MAVEN
          </span>
          <span className="text-[9px] px-2 py-0.5 border border-[#C9A84C]/30 rounded-full font-mono text-[#FDFCF0]/60 leading-none">
            SECURE ENTRY
          </span>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Glassmorphic Login Card */}
          <div className="bg-[#12352A]/25 backdrop-blur-xl border border-[#FDFCF0]/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
            
            {/* Header Content */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFCF0] tracking-tight">
                Hospitality Control Room
              </h1>
              <p className="text-xs text-[#8FAF95] mt-2 font-mono uppercase tracking-wider">
                Select Portal Access Level
              </p>
            </div>

            {/* Tab Swappers */}
            <div className="flex bg-[#081a15] p-1.5 rounded-full border border-[#FDFCF0]/5 mb-8">
              <button
                type="button"
                onClick={() => setActiveTab('client')}
                className={`flex-1 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'client'
                    ? 'bg-[#C9A84C] text-[#081a15] shadow-md'
                    : 'text-[#FDFCF0]/60 hover:text-[#FDFCF0]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                Venue Partner
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-[#12352A] text-[#FDFCF0] border border-[#C9A84C]/20 shadow-md font-bold'
                    : 'text-[#FDFCF0]/60 hover:text-[#FDFCF0]'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
                HQ Administration
              </button>
            </div>

            {/* Simulated Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === 'client' ? (
                  <motion.div
                    key="client-fields"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Brand Selection grid */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                        Select Your Brand
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {isLoading ? (
                          [1, 2, 3].map(n => (
                            <div key={n} className="p-3.5 rounded-xl border border-[#FDFCF0]/5 bg-[#081a15]/10 animate-pulse flex flex-col items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#12352A] flex items-center justify-center border border-[#C9A84C]/5" />
                              <div className="h-3 w-12 bg-[#12352A] rounded" />
                            </div>
                          ))
                        ) : (
                          brandsList.map(brand => {
                            const Icon = iconMap[brand.icon as keyof typeof iconMap] || Utensils;
                            const isSelected = selectedBrandId === brand.id;
                            return (
                              <button
                                key={brand.id}
                                type="button"
                                onClick={() => setSelectedBrandId(brand.id)}
                                className={`p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center gap-2 ${
                                  isSelected
                                    ? 'bg-[#12352A]/50 text-[#FDFCF0]'
                                    : 'bg-[#081a15]/30 text-[#FDFCF0]/50 hover:bg-[#081a15]/50 border-transparent'
                                }`}
                                style={{ borderColor: isSelected ? brand.accent : 'transparent' }}
                              >
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: isSelected ? `${brand.accent}15` : 'rgba(253,252,240,0.05)' }}
                                >
                                  <Icon 
                                    className="w-4 h-4 transition-transform duration-300"
                                    style={{ color: isSelected ? brand.accent : 'currentColor' }}
                                  />
                                </div>
                                <span className="text-[9px] font-mono leading-none tracking-tight break-words max-w-full font-bold">
                                  {brand.name.split(' ')[0]}
                                </span>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Selected Venue Summary Card */}
                    <div className="bg-[#081a15]/40 border border-[#FDFCF0]/5 p-3.5 rounded-2xl flex gap-3 text-xs">
                      <div className="h-6 w-6 rounded-full bg-[#12352A] flex items-center justify-center shrink-0 border border-[#C9A84C]/10">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-[#FDFCF0] block text-[11px]">
                          {currentBrand.name} Portal
                        </span>
                        <p className="text-[10px] text-[#8FAF95] leading-relaxed mt-0.5">
                          {currentBrand.adDescription}
                        </p>
                      </div>
                    </div>

                    {/* Passphrase Input */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="client-pass" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider">
                          Enter Venue Passphrase
                        </label>
                        <span className="text-[9px] font-mono text-[#C9A84C]/60">Hint: venuepass</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                        <input
                          id="client-pass"
                          type={showPass ? 'text' : 'password'}
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs font-mono px-10 py-3.5 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8FAF95] hover:text-[#FDFCF0] transition-colors"
                        >
                          {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="admin-fields"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Admin Warning Note */}
                    <div className="bg-[#0A2119]/70 border border-[#C9A84C]/15 p-4 rounded-2xl flex gap-3 text-xs leading-relaxed text-[#8FAF95]">
                      <div className="h-6 w-6 rounded-full bg-[#12352A] flex items-center justify-center shrink-0 border border-[#C9A84C]/30">
                        <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold block mb-0.5">
                          SECURE SYSTEM HUBS
                        </span>
                        <span>
                          Connecting to this portal allows real-time operational dashboard monitoring, inquiry lead database mutations, and simulation broadcast triggers globally.
                        </span>
                      </div>
                    </div>

                    {/* Admin Passphrase */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="admin-pass" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider">
                          HQ Authorization Code
                        </label>
                        <span className="text-[9px] font-mono text-[#C9A84C]/60">Hint: admin123</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                          <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
                        </span>
                        <input
                          id="admin-pass"
                          type={showPass ? 'text' : 'password'}
                          value={adminPass}
                          onChange={(e) => setAdminPass(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs font-mono px-10 py-3.5 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8FAF95] hover:text-[#FDFCF0] transition-colors"
                        >
                          {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="text-red-400 text-[10px] font-mono text-center bg-red-950/20 border border-red-900/30 py-2 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#081a15] font-mono font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
                style={{ 
                  backgroundColor: activeTab === 'client' ? currentBrand.accent : '#C9A84C',
                  color: activeTab === 'client' && selectedBrandId !== 'fine-dining' ? '#081a15' : '#081a15' 
                }}
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-[#081a15] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Control Room</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="relative z-10 border-t border-[#FDFCF0]/5 py-6 text-center text-[10px] font-mono text-[#8FAF95]/40 max-w-7xl mx-auto w-full">
        <p>© 2026 Maven Hospitality monorepo operations systems secure gate.</p>
      </footer>
    </div>
  );
}
