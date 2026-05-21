'use client';

import React, { useState } from 'react';
import { Check, Shield, Server, Terminal, MessageSquare } from 'lucide-react';

interface PricingConfiguratorProps {
  onPrefillInquiry: (note: string) => void;
}

export default function PricingConfigurator({ onPrefillInquiry }: PricingConfiguratorProps) {
  // Configurator States
  const [selectedTier, setSelectedTier] = useState<'starter' | 'os' | 'enterprise'>('os');
  const [kdsAddon, setKdsAddon] = useState<boolean>(false);
  const [broadcastAddon, setBroadcastAddon] = useState<boolean>(false);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(3000); // Slider state

  // Pricing values
  const tierPrices = {
    starter: 19999,
    os: 29999,
    enterprise: 49999
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
          <div 
            onClick={() => setSelectedTier('starter')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 ${
              selectedTier === 'starter' 
                ? 'border-maven-gold bg-maven-green-dark/60 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/10 hover:border-maven-gold/30'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-muted uppercase">MARKETING ONLY</span>
                {selectedTier === 'starter' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-maven-green-dark stroke-[3]" /></div>}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-maven-cream">Starter Marketing</h4>
                <div className="text-xl font-mono text-maven-gold font-bold">₹19,999<span className="text-[10px] text-maven-muted font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-[10px] text-maven-muted font-sans leading-relaxed list-none">
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Full Meta Paid Ads Setup</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Radius & Interest Targeting</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Organic Content Post Drafts</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Monthly Growth Audits</li>
              </ul>
            </div>
            <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider">Ideal for growing cafes</span>
          </div>

          {/* Tier 2: Full OS */}
          <div 
            onClick={() => setSelectedTier('os')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 relative ${
              selectedTier === 'os' 
                ? 'border-maven-gold bg-maven-green-dark/60 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/10 hover:border-maven-gold/30'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maven-gold text-maven-green-dark text-[8px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow">
              RECOMMENDED
            </div>
            
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-gold font-bold uppercase">COMPLETE STACK</span>
                {selectedTier === 'os' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-maven-green-dark stroke-[3]" /></div>}
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
          </div>

          {/* Tier 3: Enterprise */}
          <div 
            onClick={() => setSelectedTier('enterprise')}
            className={`border rounded-2xl p-5 flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 ${
              selectedTier === 'enterprise' 
                ? 'border-maven-gold bg-maven-green-dark/60 ring-1 ring-maven-gold/30' 
                : 'border-maven-gold/10 bg-maven-green-light/10 hover:border-maven-gold/30'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-maven-muted uppercase">MULTI-STORE PREMIUM</span>
                {selectedTier === 'enterprise' && <div className="w-4 h-4 rounded-full bg-maven-gold flex items-center justify-center"><Check className="w-3 h-3 text-maven-green-dark stroke-[3]" /></div>}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-maven-cream">Enterprise Core</h4>
                <div className="text-xl font-mono text-maven-gold font-bold">₹49,999<span className="text-[10px] text-maven-muted font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-[10px] text-maven-muted font-sans leading-relaxed list-none">
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Full OS + Dedicated Manager</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Bi-weekly Food Photography</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Multi-location Sync Terminals</li>
                <li className="flex gap-1.5 items-start"><Check className="w-3.5 h-3.5 text-maven-gold flex-shrink-0" /> Tailored Custom System APIs</li>
              </ul>
            </div>
            <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider">For high-end resorts & chains</span>
          </div>

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
                checked={kdsAddon} 
                onChange={(e) => setKdsAddon(e.target.checked)}
                className="w-4 h-4 rounded text-maven-gold focus:ring-maven-gold accent-maven-gold cursor-pointer"
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
                checked={broadcastAddon} 
                onChange={(e) => setBroadcastAddon(e.target.checked)}
                className="w-4 h-4 rounded text-maven-gold focus:ring-maven-gold accent-maven-gold cursor-pointer"
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
                min="1000"
                max="15000"
                step="500"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full h-1 bg-maven-green-dark rounded-lg appearance-none cursor-pointer accent-maven-gold"
              />
              <div className="flex justify-between text-[8px] font-mono text-maven-muted">
                <span>1K Orders</span>
                <span>8K Orders</span>
                <span>15K+ Orders</span>
              </div>
              
              {/* Dynamic load status alert */}
              {serverLoadFee > 0 && (
                <div className="text-[9px] font-mono text-maven-gold bg-maven-gold/10 border border-maven-gold/20 py-1.5 px-3 rounded-lg flex items-center justify-between">
                  <span>Server Volume Load Fee:</span>
                  <span className="font-bold">+₹{serverLoadFee.toLocaleString('en-IN')}/mo</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Total Card */}
          <div className="border-t border-maven-cream/10 pt-5 space-y-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-maven-muted uppercase">CALCULATED TOTAL RATE</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest font-bold">0% ORDER COMMISSIONS</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-maven-gold font-bold tracking-tight">₹{totalPrice.toLocaleString('en-IN')}</div>
                <span className="text-[9px] font-mono text-maven-muted">FLAT RATE / MONTH</span>
              </div>
            </div>

            <button 
              onClick={handleSelectPackage}
              className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow"
            >
              Select & Prefill Lead Form
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
