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
  EyeOff,
  User
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
  email?: string;
};

export default function LoginPage() {
  const router = useRouter();
  // Dynamic brand fetching
  const { data: fetchedBrands, isLoading } = trpc.getBrands.useQuery();
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [emailOrId, setEmailOrId] = useState('');
  const [passphrase, setPassphrase] = useState('venuepass');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isAdminKeyDetected = emailOrId.toLowerCase().includes('admin') || passphrase === 'admin123';

  // Sync selectedBrandId and default email once brands are fetched
  useEffect(() => {
    if (fetchedBrands && fetchedBrands.length > 0 && !selectedBrandId) {
      const defaultId = fetchedBrands[0].id;
      setSelectedBrandId(defaultId);
      setEmailOrId(`${defaultId}@maven.co`);
    }
  }, [fetchedBrands, selectedBrandId]);

  // Sync default passphrase and email on brand change
  useEffect(() => {
    if (selectedBrandId && !emailOrId.toLowerCase().includes('admin')) {
      setEmailOrId(`${selectedBrandId}@maven.co`);
    }
    setPassphrase('venuepass');
    setError('');
  }, [selectedBrandId]);

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
      // 1. Administrative access bypass
      if (isAdminKeyDetected) {
        if (emailOrId.toLowerCase().includes('admin') && passphrase === 'admin123') {
          localStorage.setItem('maven_session', JSON.stringify({
            role: 'admin',
            timestamp: new Date().toISOString()
          }));
          router.push('/dashboard/admin');
        } else {
          setError('Invalid administrator credentials.');
          setLoading(false);
        }
        return;
      }

      // 2. Regular venue partner verification
      if (!selectedBrandId) {
        setError('No brand selected.');
        setLoading(false);
        return;
      }

      if (!emailOrId) {
        setError('Please enter your Email or Venue ID.');
        setLoading(false);
        return;
      }

      const brandToVerify = brandsList.find(b => b.id === selectedBrandId);
      if (!brandToVerify) {
        setError('Selected brand could not be verified.');
        setLoading(false);
        return;
      }

      // Check both email match and passphrase match!
      const enteredEmailNormalized = emailOrId.trim().toLowerCase();
      const registeredEmailNormalized = (brandToVerify.email || `${brandToVerify.id}@maven.co`).trim().toLowerCase();

      if (enteredEmailNormalized !== registeredEmailNormalized && enteredEmailNormalized !== brandToVerify.id) {
        setError('Invalid Email or Venue ID for this brand.');
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
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans flex flex-col justify-between relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#081a15]">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#12352A]/30 blur-[120px] pointer-events-none" />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none transition-all duration-700" 
        style={{ 
          backgroundColor: isAdminKeyDetected ? 'rgba(201, 168, 76, 0.15)' : `${currentBrand.accent}15`, 
          filter: 'blur(100px)' 
        }}
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
          <div 
            className="bg-[#12352A]/25 backdrop-blur-xl border rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500"
            style={{ 
              borderColor: isAdminKeyDetected ? 'rgba(201, 168, 76, 0.4)' : 'rgba(253, 252, 240, 0.1)',
              boxShadow: isAdminKeyDetected ? '0 0 40px rgba(201, 168, 76, 0.25), 0 20px 50px rgba(0,0,0,0.6)' : '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent transition-all duration-500" 
              style={{
                background: isAdminKeyDetected 
                  ? 'linear-gradient(to right, transparent, #C9A84C, transparent)' 
                  : `linear-gradient(to right, transparent, ${currentBrand.accent}60, transparent)`
              }}
            />
            
            {/* Dynamic Gold Badge when Admin Key Detected */}
            <AnimatePresence>
              {isAdminKeyDetected && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center mb-6"
                >
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/40 px-4 py-1.5 rounded-full flex items-center gap-2 text-[#C9A84C] font-mono text-[9px] uppercase tracking-widest shadow-[0_0_15px_rgba(201,168,76,0.15)] animate-pulse">
                    <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>HQ Administrator Key Detected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Header Content */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFCF0] tracking-tight">
                Hospitality Control Room
              </h1>
              <p className="text-xs text-[#8FAF95] mt-2 font-mono uppercase tracking-wider">
                Venue Partner Portal Secure Gate
              </p>
            </div>

            {/* Simulated Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-6">
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

                {/* Email or Venue ID Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="client-email-id" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider">
                      Email or Venue ID
                    </label>
                    {emailOrId.toLowerCase().includes('admin') ? (
                      <span className="text-[9px] font-mono text-[#C9A84C] flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5 animate-pulse" /> Admin Mode Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-[#C9A84C]/60">Hint: {currentBrand.id}@maven.co</span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300" style={{ color: emailOrId.toLowerCase().includes('admin') ? '#C9A84C' : 'rgba(253, 252, 240, 0.4)' }}>
                      {emailOrId.toLowerCase().includes('admin') ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </span>
                    <input
                      id="client-email-id"
                      type="text"
                      value={emailOrId}
                      onChange={(e) => setEmailOrId(e.target.value)}
                      placeholder="e.g. manager@brand.com or fine-dining"
                      required
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs font-mono px-10 py-3.5 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                      style={{
                        borderColor: emailOrId.toLowerCase().includes('admin') ? 'rgba(201, 168, 76, 0.4)' : 'rgba(253, 252, 240, 0.1)',
                      }}
                    />
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
              </div>

              {error && (
                <div className="text-red-400 text-[10px] font-mono text-center bg-red-950/20 border border-red-900/30 py-2 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-[#081a15] font-mono font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
                style={{ 
                  backgroundColor: isAdminKeyDetected ? '#C9A84C' : currentBrand.accent,
                  color: '#081a15',
                  boxShadow: isAdminKeyDetected ? '0 0 20px rgba(201, 168, 76, 0.4)' : 'none'
                }}
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-[#081a15] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isAdminKeyDetected ? 'Enter Admin Cockpit' : 'Enter Control Room'}</span>
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
