'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Shield, 
  Server, 
  Terminal, 
  MessageSquare, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Loader2, 
  Sparkles, 
  X, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { trpc } from '../../utils/trpc';

interface PricingConfiguratorProps {
  onPrefillInquiry: (note: string) => void;
}

export default function PricingConfigurator({ onPrefillInquiry }: PricingConfiguratorProps) {
  // Configurator States
  const [selectedTier, setSelectedTier] = useState<'starter' | 'os' | 'enterprise'>('os');
  const [kdsAddon, setKdsAddon] = useState<boolean>(false);
  const [broadcastAddon, setBroadcastAddon] = useState<boolean>(false);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(3000); // Slider state

  // Checkout Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutSessionData, setCheckoutSessionData] = useState<any>(null);
  const [checkoutStep, setCheckoutStep] = useState<'handshake' | 'form' | 'success'>('handshake');
  const [cardForm, setCardForm] = useState({
    holder: '',
    number: '4242 4242 4242 4242',
    expiry: '12/29',
    cvv: '999'
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // tRPC Mutation
  const checkoutMutation = trpc.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      setCheckoutSessionData(data);
      // Simulate gateway handshake delay
      setTimeout(() => {
        setCheckoutStep('form');
      }, 1500);
    },
    onError: (err) => {
      setPaymentError(err.message || 'Stripe Session generation failed. Please try again.');
    }
  });

  // Pricing values
  const tierPrices = {
    starter: 14999,
    os: 29999,
    enterprise: 89999
  };

  const kdsPrice = 5000;
  const broadcastPrice = 3000;

  // Dynamic calculations
  const basePrice = tierPrices[selectedTier];
  
  // Calculate server volume fee based on orders
  let serverLoadFee = 0;
  if (monthlyOrders > 10000) {
    serverLoadFee = 3500;
  } else if (monthlyOrders > 5000) {
    serverLoadFee = 1500;
  }

  const totalPrice = basePrice + (kdsAddon ? kdsPrice : 0) + (broadcastAddon ? broadcastPrice : 0) + serverLoadFee;

  const handleSelectPackage = () => {
    const tierNames = {
      starter: 'Starter Marketing',
      os: 'Maven Full OS',
      enterprise: 'Enterprise Core'
    };
    
    const addonsText: string[] = [];
    if (kdsAddon) addonsText.push('Multi-terminal KDS');
    if (broadcastAddon) addonsText.push('Weekly WhatsApp Broadcasts');
    if (serverLoadFee > 0) addonsText.push(`High Transaction Volume Server Load (${monthlyOrders} orders/mo)`);

    const summary = `Selected package: ${tierNames[selectedTier]} (Base: ₹${basePrice.toLocaleString('en-IN')}/mo). Addons: ${addonsText.length > 0 ? addonsText.join(', ') : 'None'}. Calculated Custom Total: ₹${totalPrice.toLocaleString('en-IN')}/mo.`;
    
    onPrefillInquiry(summary);
  };

  const handleInitiateCheckout = () => {
    setPaymentError(null);
    setCheckoutStep('handshake');
    setIsCheckoutOpen(true);
    // Call the tRPC payment endpoint
    checkoutMutation.mutate({
      tierId: selectedTier === 'os' ? 'full-os' : selectedTier,
    });
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardForm.holder.trim()) {
      setPaymentError("Card holder's name is required.");
      return;
    }
    setPaymentError(null);
    setCheckoutStep('handshake'); // Re-use for loading authorization
    
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2000);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center pb-8 mb-8 border-b border-maven-cream/10">
        <span className="text-xs font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Flat Rates • No Commissions
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-maven-cream mt-2 font-medium">
          Custom Pricing Packages & Configurator
        </h3>
        <p className="text-xs text-maven-muted mt-2 max-w-xl">
          Choose a foundational tier and customize operational add-ons tailored to your hospitality volume. Watch your flat-rate fee recalculate in real-time.
        </p>
      </div>

      {/* Grid: Left - Foundational Packages, Right - Interactive Addons & Price */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Foundational Tiers (Grid column 1 to 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1: Starter */}
          <button 
            type="button"
            onClick={() => setSelectedTier('starter')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer text-left w-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none ${
              selectedTier === 'starter' 
                ? 'border-maven-gold bg-[#0A2119]/80 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/5 hover:border-maven-gold/30'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-muted uppercase">MARKETING ONLY</span>
                {selectedTier === 'starter' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-[#0A2119] stroke-[3]" /></div>}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-maven-cream">Starter Marketing</h4>
                <div className="text-xl font-mono text-maven-gold font-bold">₹14,999<span className="text-[10px] text-maven-muted font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-[10px] text-maven-muted font-sans leading-relaxed list-none">
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Full Meta Paid Ads Setup</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Radius & Interest Targeting</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Organic Content Post Drafts</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Monthly Growth Audits</li>
              </ul>
            </div>
            <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider">Ideal for growing cafes</span>
          </button>

          {/* Tier 2: Full OS */}
          <button 
            type="button"
            onClick={() => setSelectedTier('os')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer text-left w-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none relative ${
              selectedTier === 'os' 
                ? 'border-maven-gold bg-[#0A2119]/80 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/5 hover:border-maven-gold/30'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maven-gold text-[#0A2119] text-[8px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow">
              RECOMMENDED
            </div>
            
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-gold font-bold uppercase">COMPLETE STACK</span>
                {selectedTier === 'os' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-[#0A2119] stroke-[3]" /></div>}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-maven-cream">Maven Full OS</h4>
                <div className="text-xl font-mono text-maven-gold font-bold">₹29,999<span className="text-[10px] text-maven-muted font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-[10px] text-maven-muted font-sans leading-relaxed list-none">
                <li className="flex gap-1.5 items-start text-maven-cream"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Meta Ads + Content Strategy</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Custom Landing Web Portal</li>
                <li className="flex gap-1.5 items-start text-maven-cream"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> WhatsApp Automated Concierge</li>
                <li className="flex gap-1.5 items-start text-maven-cream"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> POS + Inventory Sync (Free)</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Table QR Multi-Ordering</li>
              </ul>
            </div>
            <span className="text-[9px] font-mono text-maven-gold uppercase tracking-wider font-bold">Max Operational Value</span>
          </button>

          {/* Tier 3: Enterprise */}
          <button 
            type="button"
            onClick={() => setSelectedTier('enterprise')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer text-left w-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none ${
              selectedTier === 'enterprise' 
                ? 'border-maven-gold bg-[#0A2119]/80 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/5 hover:border-maven-gold/30'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-muted uppercase">MULTI-STORE PREMIUM</span>
                {selectedTier === 'enterprise' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-[#0A2119] stroke-[3]" /></div>}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-maven-cream">Enterprise Core</h4>
                <div className="text-xl font-mono text-maven-gold font-bold">₹89,999<span className="text-[10px] text-maven-muted font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-[10px] text-maven-muted font-sans leading-relaxed list-none">
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Full OS + Dedicated Manager</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Bi-weekly Food Photography</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Multi-location Sync Terminals</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Tailored Custom System APIs</li>
              </ul>
            </div>
            <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider">For high-end resorts & chains</span>
          </button>

        </div>

        {/* Customization & Dynamic pricing (Grid column 9 to 12) */}
        <div className="lg:col-span-4 bg-maven-green-dark/45 border border-maven-gold/15 p-6 rounded-2xl flex flex-col justify-between gap-6 shadow-inner">
          
          <div className="space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Configure Add-Ons</span>
            
            {/* Toggle 1 */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-maven-gold/10 flex items-center justify-center text-maven-gold group-hover:bg-maven-gold/25 transition-all">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-maven-cream">Multi-KDS Display</span>
                  <span className="text-[9px] font-mono text-maven-muted">+₹5,000/mo</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                aria-label="Multi-KDS Display Add-on"
                checked={kdsAddon} 
                onChange={(e) => setKdsAddon(e.target.checked)}
                className="w-4 h-4 rounded text-maven-gold focus:ring-maven-gold accent-maven-gold cursor-pointer focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none"
              />
            </label>

            {/* Toggle 2 */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-maven-gold/10 flex items-center justify-center text-maven-gold group-hover:bg-maven-gold/25 transition-all">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-maven-cream">WhatsApp Newsletter</span>
                  <span className="text-[9px] font-mono text-maven-muted">+₹3,000/mo</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                aria-label="WhatsApp Newsletter Add-on"
                checked={broadcastAddon} 
                onChange={(e) => setBroadcastAddon(e.target.checked)}
                className="w-4 h-4 rounded text-maven-gold focus:ring-maven-gold accent-maven-gold cursor-pointer focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none"
              />
            </label>

            {/* Volume slider */}
            <div className="space-y-2 pt-2 border-t border-maven-cream/5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-maven-cream flex items-center gap-1">
                  <Server className="w-3.5 h-3.5 text-maven-gold" />
                  Monthly Orders Volume
                </span>
                <span className="font-mono text-maven-gold font-bold">{monthlyOrders.toLocaleString()}</span>
              </div>
              <input 
                type="range"
                aria-label="Monthly Orders Volume"
                min="1000"
                max="15000"
                step="500"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full h-1 bg-maven-green-dark rounded-lg appearance-none cursor-pointer accent-maven-gold focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none"
              />
              <div className="flex justify-between text-[8px] font-mono text-maven-muted">
                <span>1K Orders</span>
                <span>8K Orders</span>
                <span>15K+ Orders</span>
              </div>
              
              {/* Dynamic load status alert */}
              {serverLoadFee > 0 && (
                <div className="text-[9px] font-mono text-maven-gold bg-maven-gold/10 border border-maven-gold/20 py-1.5 px-3 rounded-lg flex items-center justify-between">
                  <span>Server Volume Load:</span>
                  <span className="font-bold">+₹{serverLoadFee.toLocaleString('en-IN')}/mo</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Total Card */}
          <div className="border-t border-maven-cream/10 pt-5 space-y-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-maven-muted uppercase">TOTAL FLATE RATE</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest font-bold">0% COMMISSIONS</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-maven-gold font-bold tracking-tight">₹{totalPrice.toLocaleString('en-IN')}</div>
                <span className="text-[9px] font-mono text-maven-muted">FLAT RATE / MONTH</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button 
                onClick={handleSelectPackage}
                className="w-full border border-maven-gold/30 hover:border-maven-gold bg-[#0A2119]/60 text-maven-cream font-mono text-[9px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all shadow"
              >
                1. Select & Prefill Lead Form
              </button>
              
              <button 
                onClick={handleInitiateCheckout}
                className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>2. Subscribe & Checkout (Stripe)</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* STRIPE CHECKOUT SLIDING MODAL OVERLAY */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-maven-green-dark/80 backdrop-blur-md">
            
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsCheckoutOpen(false)} />
            
            {/* Sliding Container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-[#0A2119] border-l border-maven-gold/20 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 text-maven-cream shadow-2xl"
            >
              
              {/* Top Bar */}
              <div className="flex justify-between items-center pb-6 border-b border-maven-cream/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-[#8FAF95] uppercase">STRIPE SECURE CHECKOUT</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)} 
                  aria-label="Close checkout modal"
                  className="w-8 h-8 rounded-full bg-maven-green-light/10 border border-maven-gold/15 flex items-center justify-center text-maven-muted hover:text-maven-gold transition-colors focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step 1: Handshake connection screen */}
              {checkoutStep === 'handshake' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                  <Loader2 className="w-12 h-12 text-maven-gold animate-spin stroke-[1.5]" />
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif font-bold text-maven-cream">
                      {checkoutMutation.isLoading ? "Securing tRPC Session..." : "Authorizing Payment Intent..."}
                    </h4>
                    <p className="text-xs text-maven-muted max-w-xs mx-auto leading-relaxed">
                      Establishing encrypted handshake with Stripe API endpoints and signing dynamic payment client keys.
                    </p>
                  </div>
                  
                  {/* Dynamic Handshake Payload Logs */}
                  <div className="w-full bg-[#12352A]/60 border border-maven-gold/10 p-4 rounded-xl font-mono text-[9px] text-[#8FAF95] text-left space-y-1 overflow-x-auto shadow-inner">
                    <span className="text-[#C9A84C] block font-bold">DEVELOPER SECURE PAYLOAD LOGS:</span>
                    <div>&gt; [tRPC] POST /api/createCheckoutSession</div>
                    <div>&gt; [Stripe] Requesting client_secret hook…</div>
                    {checkoutSessionData ? (
                      <>
                        <div className="text-emerald-400">&gt; [Stripe] Session generated: {checkoutSessionData.sessionId}</div>
                        <div className="text-emerald-400">&gt; [tRPC] Intent Response: 200 OK</div>
                      </>
                    ) : (
                      <div className="animate-pulse">&gt; Loading server crypt keys…</div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Payment credit card form */}
              {checkoutStep === 'form' && checkoutSessionData && (
                <div className="flex-1 flex flex-col justify-between py-6 space-y-6">
                  
                  {/* Order Summary Card */}
                  <div className="bg-[#12352A]/70 border border-maven-gold/15 p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] pointer-events-none" />
                    <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider block">PLAN TRANSACTION SUMMARY</span>
                    <h5 className="text-lg font-serif font-bold text-maven-cream mt-1">{checkoutSessionData.tierName}</h5>
                    <div className="flex justify-between items-end mt-4 border-t border-maven-cream/10 pt-3">
                      <div className="text-[8px] font-mono text-maven-muted">
                        Session: <span className="text-maven-gold">{checkoutSessionData.sessionId.substring(0, 16)}…</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-maven-muted mr-1 font-mono">Total Due:</span>
                        <span className="text-xl font-mono text-maven-gold font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Elegant Interactive Card Visualizer */}
                  <div className="bg-gradient-to-br from-[#1C4A38] to-[#12352A] border border-maven-gold/25 w-full aspect-[1.586] rounded-2xl p-6 flex flex-col justify-between relative shadow-xl overflow-hidden">
                    {/* Glossy vector grids */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono tracking-widest text-maven-muted uppercase">MAVEN OS CAPITAL</span>
                        <span className="text-xs font-serif italic text-maven-gold mt-0.5">Corporate Guest Card</span>
                      </div>
                      <div className="w-8 h-6 rounded bg-amber-400/80 backdrop-blur-sm shadow flex items-center justify-center font-mono text-[8px] font-bold text-[#0A2119]">
                        CHIP
                      </div>
                    </div>

                    <div className="space-y-4 z-10">
                      {/* Card number */}
                      <span className="text-base sm:text-lg font-mono tracking-[0.18em] text-maven-cream block text-glow">
                        {cardForm.number}
                      </span>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[7px] font-mono text-maven-muted uppercase">CARDHOLDER</span>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-maven-cream truncate max-w-[180px]">
                            {cardForm.holder || 'YOUR NAME HERE'}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col text-right">
                            <span className="text-[7px] font-mono text-maven-muted uppercase">EXPIRES</span>
                            <span className="text-[10px] font-mono text-maven-cream">{cardForm.expiry}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[7px] font-mono text-maven-muted uppercase">CVV</span>
                            <span className="text-[10px] font-mono text-maven-cream">{cardForm.cvv}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment form submission */}
                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="cardholderName" className="text-[9px] font-mono text-maven-muted uppercase tracking-wider block cursor-pointer">Cardholder Name</label>
                      <input 
                        id="cardholderName"
                        type="text"
                        name="cardholderName"
                        autoComplete="name"
                        spellCheck={false}
                        required
                        placeholder="John Doe"
                        value={cardForm.holder}
                        onChange={(e) => setCardForm(prev => ({ ...prev, holder: e.target.value }))}
                        className="w-full bg-[#12352A]/50 border border-maven-gold/15 focus:border-maven-gold rounded-xl px-4 py-2.5 text-xs text-maven-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-maven-gold/50 focus-visible:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-[9px] font-mono text-maven-muted uppercase tracking-wider block">Card Number</label>
                        <input 
                          type="text"
                          disabled
                          value={cardForm.number}
                          className="w-full bg-[#12352A]/30 border border-maven-gold/10 rounded-xl px-4 py-2.5 text-xs text-maven-muted cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-maven-muted uppercase tracking-wider block">Expiry</label>
                        <input 
                          type="text"
                          disabled
                          value={cardForm.expiry}
                          className="w-full bg-[#12352A]/30 border border-maven-gold/10 rounded-xl px-4 py-2.5 text-xs text-maven-muted cursor-not-allowed text-center"
                        />
                      </div>
                    </div>

                    {paymentError && (
                      <div className="text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/25 py-2 px-3 rounded-lg text-center">
                        {paymentError}
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authorize Payment of ₹{totalPrice.toLocaleString('en-IN')}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Step 3: Success Screen */}
              {checkoutStep === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-[#0A2119]"
                  >
                    <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
                  </motion.div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Transaction Succeeded</span>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-maven-cream">
                      Welcome to Maven OS
                    </h4>
                    <p className="text-xs text-maven-muted max-w-xs mx-auto leading-relaxed">
                      Your business subscription has been securely authenticated by Stripe. A receipt and onboarding instructions have been sent to your email.
                    </p>
                  </div>

                  {/* Payment Receipt Specifications */}
                  <div className="w-full bg-[#12352A]/50 border border-maven-gold/15 p-5 rounded-2xl font-mono text-[10px] text-left space-y-2.5">
                    <div className="flex justify-between border-b border-maven-cream/5 pb-2">
                      <span className="text-[#8FAF95]">TRANSACTION ID:</span>
                      <span className="text-[#FDFCF0] font-bold">ch_3N19zL2xp9…</span>
                    </div>
                    <div className="flex justify-between border-b border-maven-cream/5 pb-2">
                      <span className="text-[#8FAF95]">PLAN DEPLOYED:</span>
                      <span className="text-maven-gold font-bold">{checkoutSessionData?.tierName}</span>
                    </div>
                    <div className="flex justify-between border-b border-maven-cream/5 pb-2">
                      <span className="text-[#8FAF95]">AMOUNT AUTH:</span>
                      <span className="text-emerald-400 font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8FAF95]">STATUS:</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">ACTIVE (PROVISIONED)</span>
                    </div>
                  </div>

                  <Link 
                    href="/dashboard"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Owner Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Secure Lock Badge footer */}
              <div className="border-t border-maven-cream/10 pt-4 mt-auto flex items-center justify-center gap-2.5 text-[#8FAF95]/50 text-[9px] font-mono">
                <Lock className="w-3 h-3" />
                <span>256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
