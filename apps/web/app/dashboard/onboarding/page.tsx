'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Coffee, 
  Store, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  ChefHat, 
  MessageSquare, 
  Volume2, 
  ShieldCheck, 
  Rocket, 
  HelpCircle,
  Briefcase,
  Layers,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { trpc } from '../../utils/trpc';

const LUXURY_COLORS = [
  { name: 'Imperial Gold', hex: '#C9A84C', desc: 'Fine Dining & Heritage' },
  { name: 'Emerald Forest', hex: '#0D5C3A', desc: 'Bistros & Farm-to-Table' },
  { name: 'Brewed Sienna', hex: '#D4A373', desc: 'Cafes & Artisan Bakeries' },
  { name: 'Terracotta Fire', hex: '#E76F51', desc: 'Cloud Kitchens & Street Food' },
  { name: 'Midnight Orchid', hex: '#6D28D9', desc: 'Cocktail Bars & Lounges' }
];

const PRESET_AD_IMAGES = [
  { name: 'Luxury Steakhouse', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80' },
  { name: 'Cozy Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80' },
  { name: 'Modern Bowls', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80' },
  { name: 'Gourmet Desserts', url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80' }
];

const STEPS = [
  { id: 1, name: 'Access Key', desc: 'Enter onboarding token' },
  { id: 2, name: 'Brand Style', desc: 'Identity, icon & accent color' },
  { id: 3, name: 'Menu Builder', desc: 'Chef specialty dishes' },
  { id: 4, name: 'Marketing Hub', desc: 'Meta Ads & WhatsApp bot' },
  { id: 5, name: 'Deploy Roadmap', desc: 'Rollout & launch operations' }
];

type Dish = {
  name: string;
  description: string;
  price: number;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Token Gate States
  const [tokenInput, setTokenInput] = useState('');
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState('');
  
  // Step 2: Visual Style
  const [brandSlug, setBrandSlug] = useState('');
  const [brandName, setBrandName] = useState('');
  const [businessType, setBusinessType] = useState('Fine Dining Restaurant');
  const [accentColor, setAccentColor] = useState('#C9A84C');
  const [brandIcon, setBrandIcon] = useState<'utensils' | 'coffee' | 'store' | 'sparkles'>('utensils');
  const [passphrase, setPassphrase] = useState('venuepass');

  // Step 3: Signature Dishes
  const [dishes, setDishes] = useState<Dish[]>([
    { name: 'Truffle Butter Sautéed lobster', description: 'Fresh butter-poached lobster tail served with shaved seasonal truffles.', price: 1850 },
    { name: 'Artisanal Saffron Risotto', description: 'Italian arborio rice slow-cooked in rich saffron broth with parmesan crisp.', price: 950 }
  ]);
  const [newDishName, setNewDishName] = useState('');
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishPrice, setNewDishPrice] = useState(650);

  // Step 4: Marketing campaigns
  const [adHeadline, setAdHeadline] = useState('Experience Culinary Perfection');
  const [adDescription, setAdDescription] = useState('Indulge in our fine chef-selected signature creations in a beautiful atmosphere tonight.');
  const [adImageUrl, setAdImageUrl] = useState(PRESET_AD_IMAGES[0].url);
  const [adCta, setAdCta] = useState('Reserve Table');
  const [waTriggers, setWaTriggers] = useState('/menu,/reserve,/offers');
  const [waReply, setWaReply] = useState('Greetings from our concierge! 🥂 Table bookings are available for tonight. Reply with /menu for dishes or /reserve to claim your luxury booth.');

  // verify token query
  const verifyQuery = trpc.verifyOnboardingToken.useQuery(
    { token: activeToken || '' },
    {
      enabled: !!activeToken,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  // Mutation
  const onboardMutation = trpc.onboardBrand.useMutation();

  // Load token from URL query string on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');
      if (urlToken) {
        setTokenInput(urlToken);
        setActiveToken(urlToken);
      }
    }
  }, []);

  // Handle token verification reactive side effects
  useEffect(() => {
    if (activeToken) {
      if (verifyQuery.isSuccess && verifyQuery.data) {
        const details = verifyQuery.data;
        setBrandName(details.businessName);
        setBrandSlug(details.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
        
        // Auto prefill business type and visuals
        if (details.businessType === 'Cafe') {
          setBusinessType('Boutique Coffee & Bistro');
          setBrandIcon('coffee');
          setAccentColor('#D4A373');
          setAdHeadline(`Indulge in ${details.businessName}`);
          setAdDescription(`Savor artisan freshly roasted coffees and handcrafted flaky pastries at ${details.businessName} today.`);
          setAdImageUrl(PRESET_AD_IMAGES[1].url);
        } else if (details.businessType === 'Cloud Kitchen') {
          setBusinessType('Cloud Kitchen & Delivery');
          setBrandIcon('store');
          setAccentColor('#E76F51');
          setAdHeadline(`Gourmet Boxes Delivered Hot`);
          setAdDescription(`Get perfectly balanced, organic meals delivered straight to your doorstep within 25 minutes.`);
          setAdImageUrl(PRESET_AD_IMAGES[2].url);
        } else {
          setBusinessType('Fine Dining Restaurant');
          setBrandIcon('utensils');
          setAccentColor('#C9A84C');
          setAdImageUrl(PRESET_AD_IMAGES[0].url);
        }

        setVerifiedToken(activeToken);
        setTokenError('');
        setErrorMessage('');
        setCurrentStep(2);
      } else if (verifyQuery.isError) {
        setTokenError(verifyQuery.error.message || 'Invalid onboarding token.');
        setActiveToken(null);
      }
    }
  }, [verifyQuery.isSuccess, verifyQuery.isError, verifyQuery.data, verifyQuery.error, activeToken]);

  const handleVerifyClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setTokenError('Please enter an access key.');
      return;
    }
    setTokenError('');
    setActiveToken(tokenInput.trim());
  };

  // Handle dish additions
  const addDish = () => {
    if (!newDishName || !newDishDesc || newDishPrice <= 0) return;
    setDishes([...dishes, { name: newDishName, description: newDishDesc, price: newDishPrice }]);
    setNewDishName('');
    setNewDishDesc('');
    setNewDishPrice(650);
  };

  const removeDish = (index: number) => {
    setDishes(dishes.filter((_, i) => i !== index));
  };

  // Submit complete onboarding pipeline
  const handleLaunch = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      if (!verifiedToken) {
        throw new Error('Onboarding token has not been verified.');
      }
      if (!brandSlug || !brandName) {
        throw new Error('Please fill in Brand Name and URL Slug in Step 2.');
      }
      if (dishes.length === 0) {
        throw new Error('Please add at least 1 signature dish in Step 3.');
      }

      const payload = {
        brandId: brandSlug,
        name: brandName,
        type: businessType,
        accent: accentColor,
        icon: brandIcon,
        passphrase,
        dishes,
        adHeadline,
        adDescription,
        adImageUrl,
        adCta,
        waTriggers,
        waReply,
        onboardingToken: verifiedToken,
      };

      const res = await onboardMutation.mutateAsync(payload);
      if (res.success) {
        // Auto-login newly registered brand
        localStorage.setItem('maven_session', JSON.stringify({
          role: 'client',
          brandId: brandSlug,
          timestamp: new Date().toISOString()
        }));
        router.push('/dashboard/client');
      } else {
        throw new Error(res.message || 'Onboarding failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during deployment.');
      setLoading(false);
    }
  };

  // Step validation before advancing
  const nextStep = () => {
    if (currentStep === 1) {
      if (!verifiedToken) {
        setErrorMessage('Please enter and verify a valid onboarding access key first.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!brandName.trim()) {
        setErrorMessage('Please enter a Brand Name.');
        return;
      }
      if (!brandSlug.trim() || brandSlug.length < 2) {
        setErrorMessage('Please enter a valid URL slug (at least 2 characters).');
        return;
      }
    }
    setErrorMessage('');
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const prevStep = () => {
    setErrorMessage('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Render correct step body
  const renderStepBody = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Token Entrance Gate
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="p-3.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] inline-flex mb-2 shadow-[0_0_20px_rgba(201,168,76,0.1)] animate-pulse">
                <ShieldCheck className="w-8 h-8" />
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#FDFCF0]">Initialize Hospitality Space</h2>
              <p className="text-xs text-[#8FAF95] leading-relaxed">
                Enter your unique, secure onboarding access key received from the Maven HQ onboarding team to begin your FOH/BOH provisioning pipeline and unlock your design workshop.
              </p>
            </div>

            <form onSubmit={handleVerifyClick} className="max-w-md mx-auto space-y-4">
              <div className="space-y-1.5 font-mono">
                <label htmlFor="onboarding-token" className="text-[10px] text-[#8FAF95] uppercase tracking-wider block text-center">
                  Onboarding Access Key
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <input
                    id="onboarding-token"
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="e.g. MAVEN-ONB-XXXXXX"
                    required
                    disabled={verifyQuery.isFetching || !!verifiedToken}
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs px-12 py-4 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all font-mono tracking-wider text-center font-bold"
                  />
                  {verifiedToken && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 rounded-full p-1">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {tokenError && (
                <div className="text-red-400 text-[10px] font-mono text-center bg-red-950/20 border border-red-900/30 py-2 rounded-xl">
                  {tokenError}
                </div>
              )}

              {verifiedToken && (
                <div className="text-emerald-400 text-[10px] font-mono text-center bg-emerald-950/20 border border-emerald-900/30 py-2 rounded-xl animate-bounce">
                  ✓ Token Verified! Loading workspace...
                </div>
              )}

              <button
                type="submit"
                disabled={verifyQuery.isFetching || !!verifiedToken}
                className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#081a15] font-mono font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
              >
                {verifyQuery.isFetching ? (
                  <span className="h-4 w-4 border-2 border-[#081a15] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Unlock Space</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        );

      case 2:
        // Step 2: Visual Style
        const IconComponent = brandIcon === 'utensils' ? Utensils : brandIcon === 'coffee' ? Coffee : brandIcon === 'store' ? Store : Sparkles;
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FDFCF0]">Define Brand Visual Persona</h2>
              <p className="text-xs text-[#8FAF95] mt-1 leading-relaxed">
                Design custom visual design tokens. Choosing these styles will dynamically set accent colors, logo indicators, and login portals throughout the venue's client space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label htmlFor="brand-name" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                    Brand Name
                  </label>
                  <input
                    id="brand-name"
                    type="text"
                    value={brandName}
                    onChange={(e) => {
                      setBrandName(e.target.value);
                      setBrandSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
                    }}
                    placeholder="e.g. L'Aura Bistro"
                    required
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs px-4 py-3 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all font-mono"
                  />
                </div>

                {/* Brand Slug */}
                <div className="space-y-1.5 font-mono">
                  <label htmlFor="brand-slug" className="text-[10px] text-[#8FAF95] uppercase tracking-wider block">
                    URL Slug Identifier (Brand ID)
                  </label>
                  <div className="relative">
                    <input
                      id="brand-slug"
                      type="text"
                      value={brandSlug}
                      onChange={(e) => setBrandSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="e.g. laura-bistro"
                      required
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs pl-4 pr-24 py-3 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#8FAF95]/50 uppercase tracking-widest">
                      slug format
                    </span>
                  </div>
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label htmlFor="biz-type" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                    Operational Niche
                  </label>
                  <select
                    id="biz-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs px-4 py-3 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all font-mono"
                  >
                    <option value="Fine Dining Restaurant">Fine Dining Restaurant</option>
                    <option value="Boutique Coffee & Bistro">Boutique Coffee & Bistro</option>
                    <option value="Cloud Kitchen & Delivery">Cloud Kitchen & Delivery</option>
                    <option value="Cocktail Lounge & Bar">Cocktail Lounge & Bar</option>
                  </select>
                </div>

                {/* Secure Passphrase */}
                <div className="space-y-1.5">
                  <label htmlFor="passphrase" className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                    Secure Portal Passphrase
                  </label>
                  <input
                    id="passphrase"
                    type="text"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="venuepass"
                    required
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 focus:border-[#C9A84C]/50 text-xs px-4 py-3 rounded-xl text-[#FDFCF0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/30 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Accent & Icon selections */}
              <div className="space-y-5">
                {/* Accent Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                    Theme Accent Accent Color
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {LUXURY_COLORS.map(color => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setAccentColor(color.hex)}
                        className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex items-center gap-2.5 ${
                          accentColor === color.hex
                            ? 'bg-[#12352A]/50 border-[#C9A84C] text-[#FDFCF0]'
                            : 'bg-[#081a15]/30 border-transparent text-[#FDFCF0]/50 hover:bg-[#081a15]/50'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-[#FDFCF0]/15 shrink-0 block" style={{ backgroundColor: color.hex }} />
                        <div className="truncate">
                          <span className="text-[10px] font-mono block font-bold leading-tight">{color.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer p-0 shrink-0"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="bg-[#081a15] border border-[#FDFCF0]/10 text-xs font-mono px-3 py-2 rounded-lg text-[#FDFCF0] w-full"
                    />
                  </div>
                </div>

                {/* Brand Icon Selector */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider block">
                    Portal Navigation Icon
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { key: 'utensils', icon: Utensils, label: 'Dining' },
                      { key: 'coffee', icon: Coffee, label: 'Cafe' },
                      { key: 'store', icon: Store, label: 'Kitchen' },
                      { key: 'sparkles', icon: Sparkles, label: 'Specialty' }
                    ].map(item => {
                      const Icon = item.icon;
                      const isSelected = brandIcon === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setBrandIcon(item.key as any)}
                          className={`p-3 rounded-xl border text-center transition-all duration-300 flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#12352A]/50 text-[#FDFCF0]'
                              : 'bg-[#081a15]/30 text-[#FDFCF0]/40 border-transparent hover:bg-[#081a15]/50'
                          }`}
                          style={{ borderColor: isSelected ? accentColor : 'transparent' }}
                        >
                          <Icon className="w-5 h-5" style={{ color: isSelected ? accentColor : 'currentColor' }} />
                          <span className="text-[8px] font-mono leading-none font-bold uppercase">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        // Step 3: Signature Dishes Menu
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FDFCF0]">Build Signature Menu Items</h2>
              <p className="text-xs text-[#8FAF95] mt-1 leading-relaxed">
                Add signature chef creations. These catalog entries automatically construct the digital POS menu and seed live guest dining room tables dynamically upon launching.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Form: Add Dish */}
              <div className="lg:col-span-2 space-y-4 bg-[#081a15]/30 p-4 border border-[#FDFCF0]/5 rounded-2xl h-fit">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold block mb-1">
                  New Specialty Item
                </span>
                
                <div className="space-y-1.5">
                  <label htmlFor="dish-name" className="text-[9px] font-mono text-[#8FAF95] uppercase block">Dish Name</label>
                  <input
                    id="dish-name"
                    type="text"
                    value={newDishName}
                    onChange={(e) => setNewDishName(e.target.value)}
                    placeholder="e.g. Pan-Seared Sea Bass"
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2.5 rounded-lg text-[#FDFCF0] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5 font-mono">
                  <label htmlFor="dish-price" className="text-[9px] text-[#8FAF95] uppercase block">Price (INR ₹)</label>
                  <input
                    id="dish-price"
                    type="number"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(Number(e.target.value))}
                    placeholder="1250"
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2.5 rounded-lg text-[#FDFCF0] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dish-desc" className="text-[9px] font-mono text-[#8FAF95] uppercase block">Culinary Description</label>
                  <textarea
                    id="dish-desc"
                    value={newDishDesc}
                    onChange={(e) => setNewDishDesc(e.target.value)}
                    placeholder="Served with lemon butter sauce and organic roasted baby asparagus..."
                    rows={3}
                    className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2.5 rounded-lg text-[#FDFCF0] focus:outline-none resize-none font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={addDish}
                  className="w-full bg-[#12352A] hover:bg-[#12352A]/80 border border-[#C9A84C]/20 text-[#FDFCF0] font-mono text-[10px] uppercase font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ChefHat className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Add Special Dish
                </button>
              </div>

              {/* Right Side: Digital Menu Preview */}
              <div className="lg:col-span-3 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8FAF95] block">
                  Interactive Live Digital Menu (Added: {dishes.length})
                </span>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {dishes.map((dish, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#12352A]/15 border border-[#FDFCF0]/5 p-4 rounded-xl flex justify-between items-start gap-4 transition-all duration-300 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-[2px] h-full" style={{ backgroundColor: accentColor }} />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#FDFCF0]">{dish.name}</h4>
                          <span className="text-[9px] px-2 py-0.2 border border-[#C9A84C]/30 rounded-full font-mono text-[#C9A84C]">
                            ₹{dish.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8FAF95] leading-relaxed max-w-md">{dish.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDish(idx)}
                        className="text-red-400 hover:text-red-300 text-[10px] font-mono uppercase bg-red-950/20 border border-red-900/30 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {dishes.length === 0 && (
                    <div className="h-44 border border-dashed border-[#FDFCF0]/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[#081a15]/20">
                      <ChefHat className="w-8 h-8 text-[#8FAF95]/30 mb-2" />
                      <p className="text-[11px] font-mono text-[#8FAF95]/60">Menu is empty. Add culinary specialties on the left panel to continue.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        // Step 4: Marketing campaigns & WhatsApp
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FDFCF0]">Marketing Creative & Concierge Bot</h2>
              <p className="text-xs text-[#8FAF95] mt-1 leading-relaxed">
                Customize guest-acquisition funnels. Design high-performance digital ad creatives and automatic WhatsApp reply triggers to boot-up marketing streams.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Forms */}
              <div className="space-y-5">
                {/* Meta ad configs */}
                <div className="bg-[#081a15]/30 p-4 border border-[#FDFCF0]/5 rounded-2xl space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold block mb-1">
                    Meta Ad Settings
                  </span>

                  <div className="space-y-1.5">
                    <label htmlFor="ad-headline" className="text-[9px] font-mono text-[#8FAF95] uppercase block">Ad Headline</label>
                    <input
                      id="ad-headline"
                      type="text"
                      value={adHeadline}
                      onChange={(e) => setAdHeadline(e.target.value)}
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2 rounded-lg text-[#FDFCF0] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ad-desc" className="text-[9px] font-mono text-[#8FAF95] uppercase block">Ad Copy Body</label>
                    <textarea
                      id="ad-desc"
                      value={adDescription}
                      onChange={(e) => setAdDescription(e.target.value)}
                      rows={2}
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2 rounded-lg text-[#FDFCF0] focus:outline-none resize-none font-mono"
                    />
                  </div>

                  {/* Preset images picker */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-[#8FAF95] uppercase block">Select Preset Culinary Photo</span>
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_AD_IMAGES.map(img => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setAdImageUrl(img.url)}
                          className={`relative h-12 rounded-lg overflow-hidden border transition-all ${
                            adImageUrl === img.url ? 'border-[#C9A84C] scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp bot configs */}
                <div className="bg-[#081a15]/30 p-4 border border-[#FDFCF0]/5 rounded-2xl space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold block mb-1">
                    WhatsApp Concierge Chatbot
                  </span>

                  <div className="space-y-1.5 font-mono">
                    <label htmlFor="wa-triggers" className="text-[9px] text-[#8FAF95] uppercase block">Command Triggers (comma separated)</label>
                    <input
                      id="wa-triggers"
                      type="text"
                      value={waTriggers}
                      onChange={(e) => setWaTriggers(e.target.value)}
                      placeholder="/menu,/reserve,/offers"
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2 rounded-lg text-[#FDFCF0] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="wa-reply" className="text-[9px] font-mono text-[#8FAF95] uppercase block">Bot Greeting Template Response</label>
                    <textarea
                      id="wa-reply"
                      value={waReply}
                      onChange={(e) => setWaReply(e.target.value)}
                      rows={2.5}
                      className="w-full bg-[#081a15] border border-[#FDFCF0]/10 text-xs px-3 py-2 rounded-lg text-[#FDFCF0] focus:outline-none resize-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Right Live Previews (Aesthetics WOW factor!) */}
              <div className="space-y-6">
                {/* Meta Ad Live Mockup */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-[#8FAF95] uppercase block">Live Meta Social Ad Preview</span>
                  <div className="bg-[#12352A]/10 border border-[#FDFCF0]/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#081a15] border border-[#FDFCF0]/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <span className="text-xs font-serif font-bold text-[#FDFCF0] block">{brandName || 'Your Brand'}</span>
                        <span className="text-[9px] text-[#8FAF95] font-mono leading-none">Sponsored • Meta Networks</span>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-[#FDFCF0]/90 leading-relaxed mb-2.5 font-sans font-medium">{adDescription}</p>
                    
                    <div className="relative h-44 rounded-xl overflow-hidden mb-3 border border-[#FDFCF0]/5">
                      <img src={adImageUrl} alt="Ad Creative" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                        <h4 className="font-serif font-bold text-[#FDFCF0] text-sm tracking-tight leading-snug drop-shadow-md">{adHeadline}</h4>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-[#081a15]/40 border border-[#FDFCF0]/5 p-2 rounded-xl">
                      <span className="text-[9px] font-mono text-[#8FAF95] truncate max-w-[200px]">instagram.com/{brandSlug}</span>
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg text-[9px] font-mono uppercase font-bold tracking-wider transition-all"
                        style={{ backgroundColor: accentColor, color: '#081a15' }}
                      >
                        {adCta}
                      </button>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chatbot Live Mockup */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-[#8FAF95] uppercase block">Live WhatsApp Concierge Preview</span>
                  <div className="bg-[#0b141a] border border-[#0d2a21] rounded-2xl p-4 shadow-xl font-sans relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#128c7e_0.5px,transparent_0.5px)] bg-[size:16px_16px] opacity-[0.03] pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-[#0d2a21] pb-2.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-[#128c7e] flex items-center justify-center text-white shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#f0f2f5] block leading-tight">{brandName || 'Brand'} Concierge</span>
                        <span className="text-[8px] text-[#8696a0] block leading-none">Online bot agent</span>
                      </div>
                    </div>

                    {/* Chat Bubble flow */}
                    <div className="space-y-3">
                      {/* Customer question */}
                      <div className="flex justify-end">
                        <div className="bg-[#005c4b] text-[#e9edef] text-[10px] p-2.5 rounded-2xl rounded-tr-none max-w-[80%] shadow">
                          <p className="leading-relaxed">Hello! I want to view details. Are there tables open? /reserve</p>
                          <span className="text-[7px] text-[#aebac1] float-right mt-1">22:26</span>
                        </div>
                      </div>

                      {/* Bot automatic reply */}
                      <div className="flex justify-start">
                        <div className="bg-[#202c33] text-[#e9edef] text-[10px] p-2.5 rounded-2xl rounded-tl-none max-w-[85%] shadow relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-[3px] h-full bg-[#128c7e]" />
                          <p className="leading-relaxed font-sans">{waReply}</p>
                          <span className="text-[7px] text-[#8696a0] float-right mt-1">22:26</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        // Step 5: Rollout Summary & Launch
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FDFCF0]">Operational Launch & Deployment Roadmap</h2>
              <p className="text-xs text-[#8FAF95] mt-1 leading-relaxed">
                Confirm your parameters below. Upon confirmation, Maven's automated backend provisions your isolated SQLite records, creates FOH/BOH restaurant dining tables, and initializes campaign metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left summary columns */}
              <div className="lg:col-span-2 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8FAF95] block">
                  Configuration Summary
                </span>

                <div className="bg-[#12352A]/15 border border-[#FDFCF0]/5 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: `${accentColor}15`, borderColor: accentColor }}
                    >
                      {brandIcon === 'utensils' && <Utensils className="w-5 h-5" style={{ color: accentColor }} />}
                      {brandIcon === 'coffee' && <Coffee className="w-5 h-5" style={{ color: accentColor }} />}
                      {brandIcon === 'store' && <Store className="w-5 h-5" style={{ color: accentColor }} />}
                      {brandIcon === 'sparkles' && <Sparkles className="w-5 h-5" style={{ color: accentColor }} />}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#FDFCF0]">{brandName}</h3>
                      <span className="text-[10px] font-mono text-[#8FAF95]">{businessType}</span>
                    </div>
                  </div>

                  <hr className="border-[#FDFCF0]/5" />

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-[#8FAF95]/60 block uppercase">Brand Slug</span>
                      <span className="text-[#FDFCF0] font-bold block truncate">{brandSlug}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8FAF95]/60 block uppercase">Passphrase</span>
                      <span className="text-[#FDFCF0] font-bold block">{passphrase}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8FAF95]/60 block uppercase">Dishes Menu</span>
                      <span className="text-[#FDFCF0] font-bold block">{dishes.length} Items Configured</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8FAF95]/60 block uppercase">Accent Hex</span>
                      <span className="font-bold flex items-center gap-1.5" style={{ color: accentColor }}>
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                        {accentColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right roadmap timeline */}
              <div className="lg:col-span-3 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8FAF95] block">
                  Automatic Launch Day-by-Day Roadmap
                </span>

                <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-[#C9A84C] before:via-[#8FAF95]/30 before:to-[#0d2a21]">
                  {[
                    { day: 'Day 1', title: 'Database Partition & Table Generation', desc: 'Auto-allocating brand metadata inside local SQLite dev.db, compiling isolated floor plan table array.' },
                    { day: 'Day 2', title: 'Automated WhatsApp Concierge Provisioning', desc: 'Securing bot API listener node configured to intercept conversational triggers.' },
                    { day: 'Day 3', title: 'Meta Ads Channel Orchestration', desc: 'Deploying high-impact targeted reels campaign (Budget allocation: ₹12,000, forecasted ROAS: 5.5x).' },
                    { day: 'Day 4', title: 'Live Front-of-House Portal Sync', desc: 'Handover complete. Real-time POS order webhook listeners and event-emit SSE channels go live!' }
                  ].map((road, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full bg-[#081a15] border border-[#C9A84C] group-hover:bg-[#C9A84C] transition-colors shrink-0" />
                      <div className="bg-[#081a15]/30 border border-[#FDFCF0]/5 p-3 rounded-xl">
                        <span className="text-[9px] font-mono text-[#C9A84C] font-bold uppercase block">{road.day} • AUTOMATED ROUTE</span>
                        <h4 className="font-serif font-bold text-xs text-[#FDFCF0] mt-0.5">{road.title}</h4>
                        <p className="text-[10px] text-[#8FAF95] leading-relaxed mt-0.5">{road.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans flex flex-col justify-between relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#081a15]">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#12352A]/30 blur-[120px] pointer-events-none" />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: `${accentColor}15`, filter: 'blur(100px)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,252,240,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Navbar Brand */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl tracking-widest text-[#C9A84C]">
            MAVEN
          </span>
          <span className="text-[9px] px-2 py-0.5 border border-[#C9A84C]/30 rounded-full font-mono text-[#FDFCF0]/60">
            LAUNCH DESK
          </span>
        </div>
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin')}
          className="text-xs font-mono text-[#C9A84C] hover:text-[#FDFCF0] border border-[#C9A84C]/20 hover:border-[#FDFCF0]/30 px-4 py-2 rounded-full transition-all"
        >
          Back to HQ Console
        </button>
      </header>

      {/* Main Wizard Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 py-8">
        {/* Wizard Progress Line */}
        <div className="mb-10 relative">
          <div className="hidden md:flex justify-between items-center relative z-10">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  disabled={step.id > currentStep}
                  className="flex flex-col items-center text-center focus:outline-none select-none shrink-0"
                >
                  <div 
                    className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#C9A84C] border-[#C9A84C] text-[#081a15] scale-110 shadow-lg' 
                        : isCompleted
                        ? 'bg-[#12352A] border-[#C9A84C] text-[#C9A84C]'
                        : 'bg-[#081a15] border-[#FDFCF0]/10 text-[#8FAF95]/50'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                  </div>
                  <span className={`text-[10px] font-serif font-bold mt-2 transition-colors duration-300 ${isActive ? 'text-[#C9A84C]' : 'text-[#8FAF95]/60'}`}>
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Connector Line behind steps */}
          <div className="absolute top-4 left-[5%] right-[5%] h-[1px] bg-[#FDFCF0]/10 -z-0 hidden md:block" />
        </div>

        {/* Wizard Card Body */}
        <div className="bg-[#12352A]/25 backdrop-blur-xl border border-[#FDFCF0]/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[460px] flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

          {/* Form Step Body with Animating Preventions */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {renderStepBody()}
            </AnimatePresence>
          </div>

          {/* Error and Footer Controller */}
          <div className="mt-8 pt-6 border-t border-[#FDFCF0]/5 space-y-4">
            {errorMessage && (
              <div className="text-red-400 text-[10px] font-mono text-center bg-red-950/20 border border-red-900/30 py-2.5 rounded-xl animate-shake">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-[#081a15]/50 hover:bg-[#081a15]/80 border border-[#FDFCF0]/10 hover:border-[#FDFCF0]/25 text-[#FDFCF0] font-mono font-bold tracking-widest text-[10px] uppercase px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#081a15] font-mono font-bold tracking-widest text-[10px] uppercase px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-1.5 hover:scale-[1.01]"
                  style={{ backgroundColor: accentColor }}
                >
                  Next Step
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLaunch}
                  disabled={loading}
                  className="bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#081a15] font-mono font-bold tracking-widest text-[10px] uppercase px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 hover:scale-[1.01]"
                  style={{ backgroundColor: accentColor }}
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-[#081a15] border-t-transparent rounded-full animate-spin" />
                      <span>Deploying Operations...</span>
                    </>
                  ) : (
                    <>
                      <span>Launch Brand OS Portal</span>
                      <Rocket className="w-3.5 h-3.5 text-[#081a15]" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="relative z-10 border-t border-[#FDFCF0]/5 py-6 text-center text-[10px] font-mono text-[#8FAF95]/40 max-w-7xl mx-auto w-full">
        <p>© 2026 Maven Hospitality automatic tenant provisioning wizard systems.</p>
      </footer>
    </div>
  );
}
