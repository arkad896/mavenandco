'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  ChefHat, 
  BarChart3, 
  ShoppingBag, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  Flame,
  Clock,
  RefreshCw
} from 'lucide-react';

interface EcosystemSimulatorProps {
  onPrefillInquiry: (note: string) => void;
}

export default function EcosystemSimulator({ onPrefillInquiry }: EcosystemSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'phone' | 'kds' | 'owner'>('phone');
  
  // Simulation States
  const [step, setStep] = useState<'idle' | 'ordered' | 'preparing' | 'served'>('idle');
  const [revenue, setRevenue] = useState<number>(45210);
  const [pastaStock, setPastaStock] = useState<number>(85); // % of total inventory
  const [truffleStock, setTruffleStock] = useState<number>(92); // % of total inventory
  const [orderTime, setOrderTime] = useState<string | null>(null);
  
  const [crmLogs, setCrmLogs] = useState<Array<{ name: string; action: string; time: string; amount: string }>>([
    { name: 'Rohan Sharma', action: 'Reserved Table 08 via WhatsApp', time: '10 Mins Ago', amount: '—' },
    { name: 'Aditi Roy', action: 'Scanned Menu QR at Table 12', time: '5 Mins Ago', amount: '—' },
    { name: 'Vikram Seth', action: 'Settled Bill (Table 02)', time: '2 Mins Ago', amount: '₹2,840' }
  ]);

  const handleOrderPlacement = () => {
    if (step !== 'idle') return;
    
    setStep('ordered');
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setOrderTime(timeStr);

    // After 2.5 seconds, automatically move to preparing in kitchen
    setTimeout(() => {
      setStep('preparing');
    }, 2500);

    // After 6 seconds, transition to served
    setTimeout(() => {
      setStep('served');
      setRevenue(prev => prev + 790); // Spikes revenue on completion
      setPastaStock(prev => Math.max(0, prev - 12)); // Deducts inventory
      setTruffleStock(prev => Math.max(0, prev - 8)); // Deducts inventory
      
      // Append order log to CRM
      setCrmLogs(prev => [
        { name: 'Kabir Dev (Table 04)', action: 'Completed Truffle Pasta QR Checkout', time: 'Just Now', amount: '₹790' },
        ...prev
      ]);
    }, 6000);
  };

  const resetSimulation = () => {
    setStep('idle');
    setRevenue(45210);
    setPastaStock(85);
    setTruffleStock(92);
    setOrderTime(null);
    setCrmLogs([
      { name: 'Rohan Sharma', action: 'Reserved Table 08 via WhatsApp', time: '10 Mins Ago', amount: '—' },
      { name: 'Aditi Roy', action: 'Scanned Menu QR at Table 12', time: '5 Mins Ago', amount: '—' },
      { name: 'Vikram Seth', action: 'Settled Bill (Table 02)', time: '2 Mins Ago', amount: '₹2,840' }
    ]);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      
      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Platform Sandbox
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            The Complete Maven Ecosystem in Action
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Click &quot;Order Truffle Pasta&quot; on the guest&apos;s phone to watch how the order instantly routes to the kitchen display and updates the owner&apos;s real-time financial ledger and CRM.
          </p>
        </div>

        <button 
          onClick={resetSimulation}
          className="flex items-center gap-2 border border-maven-cream/10 bg-maven-green-dark/40 hover:border-maven-gold/30 text-maven-muted hover:text-maven-gold px-4 py-2 rounded-xl transition-all duration-300 text-xs font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${step !== 'idle' ? 'animate-spin' : ''}`} />
          Reset Simulator
        </button>
      </div>

      {/* Mobile-only tab toggles */}
      <div className="flex md:hidden items-center border border-maven-cream/10 rounded-xl overflow-hidden mb-6 bg-maven-green-dark/40 text-xs font-mono">
        <button 
          onClick={() => setActiveTab('phone')}
          className={`flex-1 py-3 text-center border-r border-maven-cream/10 ${activeTab === 'phone' ? 'bg-maven-gold text-maven-green-dark font-bold' : 'text-maven-muted'}`}
        >
          1. Guest Phone
        </button>
        <button 
          onClick={() => setActiveTab('kds')}
          className={`flex-1 py-3 text-center border-r border-maven-cream/10 ${activeTab === 'kds' ? 'bg-maven-gold text-maven-green-dark font-bold' : 'text-maven-muted'}`}
        >
          2. Kitchen KDS
        </button>
        <button 
          onClick={() => setActiveTab('owner')}
          className={`flex-1 py-3 text-center ${activeTab === 'owner' ? 'bg-maven-gold text-maven-green-dark font-bold' : 'text-maven-muted'}`}
        >
          3. Owner CRM
        </button>
      </div>

      {/* 3-Column Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Guest Mobile Interface */}
        <div className={`space-y-4 ${activeTab === 'phone' ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center gap-2 text-maven-gold text-xs font-mono uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>1. Guest Menu Interface</span>
          </div>

          <div className="bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-5 shadow-inner relative max-w-[310px] mx-auto overflow-hidden">
            {/* Phone notch notch */}
            <div className="w-28 h-4 bg-maven-green-light/40 border border-maven-cream/10 mx-auto rounded-full mb-4 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-maven-green-dark" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-maven-cream/5">
                <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">AMBER PAVILION • T04</span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded">QR ORDER</span>
              </div>

              {/* Special chef selection card */}
              <div className="bg-maven-green-light/25 border border-maven-gold/25 rounded-2xl p-4 flex flex-col gap-3 relative group">
                <div 
                  className="w-full h-24 bg-cover bg-center rounded-xl grayscale contrast-[1.1]"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop')` }}
                />
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-serif font-semibold text-maven-cream">Truffle Tagliolini</span>
                    <span className="text-xs font-mono text-maven-gold font-bold">₹790</span>
                  </div>
                  <p className="text-[10px] text-maven-muted leading-relaxed mt-1">Hand-rolled pasta, imported black truffle, butter emulsion.</p>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOrderPlacement}
                  disabled={step !== 'idle'}
                  className={`w-full font-mono text-[10px] uppercase tracking-wider font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                    step === 'idle' 
                      ? 'bg-maven-gold hover:bg-maven-cream text-maven-green-dark' 
                      : 'bg-maven-green-light/40 text-maven-muted border border-maven-cream/10 cursor-not-allowed'
                  }`}
                >
                  {step === 'idle' && (
                    <>
                      Order Truffle Pasta
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </>
                  )}
                  {step === 'ordered' && 'Syncing order...'}
                  {step === 'preparing' && 'Preparing in kitchen...'}
                  {step === 'served' && 'Served & Settled!'}
                </motion.button>
              </div>

              <div className="text-[9px] text-center text-maven-muted font-mono uppercase tracking-wide">
                Powered by Maven QR Operating System
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Kitchen display KDS */}
        <div className={`space-y-4 ${activeTab === 'kds' ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center gap-2 text-maven-gold text-xs font-mono uppercase tracking-wider">
            <ChefHat className="w-4 h-4" />
            <span>2. Kitchen Monitor (KDS)</span>
          </div>

          <div className="bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-5 min-h-[380px] shadow-inner flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-maven-cream/5">
                <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">ACTIVE ORDERS LIST</span>
                <span className="text-[9px] font-mono text-maven-muted">LIVE SYNCED</span>
              </div>

              <AnimatePresence mode="wait">
                {step === 'idle' ? (
                  <motion.div 
                    key="kds-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-48 border border-dashed border-maven-cream/15 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-maven-muted"
                  >
                    <Clock className="w-6 h-6 stroke-[1.5] mb-2 text-maven-muted/50" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">No Active Tickets</span>
                    <p className="text-[9px] mt-1 max-w-[160px]">Place an order on the phone simulator to send tickets.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="kds-active"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-maven-green-light/10 border border-maven-gold/25 p-4 rounded-2xl space-y-3"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-maven-gold font-bold">TICKET #8241</span>
                      <span className="text-maven-muted">{orderTime}</span>
                    </div>

                    <div className="border-t border-maven-cream/5 pt-2 flex justify-between items-center">
                      <div>
                        <span className="block text-xs font-semibold text-maven-cream">1x Truffle Tagliolini</span>
                        <span className="block text-[9px] font-mono text-maven-gold uppercase mt-0.5">Table 04 • QR Dine-In</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <Flame className={`w-3.5 h-3.5 ${step === 'preparing' ? 'text-amber-500 animate-pulse' : 'text-maven-muted/40'}`} />
                        <span className={`text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded ${
                          step === 'ordered' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          step === 'preparing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {step === 'ordered' && 'QUEUED'}
                          {step === 'preparing' && 'COOKING'}
                          {step === 'served' && 'SERVED'}
                        </span>
                      </div>
                    </div>

                    {/* Progress tracking indicator */}
                    <div className="w-full bg-maven-green-dark h-1 rounded-full overflow-hidden mt-1.5">
                      <motion.div 
                        className="bg-maven-gold h-full rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: step === 'ordered' ? '15%' :
                                 step === 'preparing' ? '65%' : '100%' 
                        }}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-maven-green-light/20 p-3.5 rounded-xl border border-maven-cream/5">
              <span className="block text-[9px] font-mono text-maven-gold uppercase tracking-wider font-bold mb-1">
                KDS TERMINAL FEEDBACK
              </span>
              <p className="text-[10px] text-maven-muted leading-relaxed font-sans">
                {step === 'idle' && 'Idle Mode. Awaiting client QR signal...'}
                {step === 'ordered' && 'Signal received! Table 04 order ticket injected directly via API router.'}
                {step === 'preparing' && 'Order acknowledged by chef. Decrementing stock levels...'}
                {step === 'served' && 'Order served. Digital invoice dispatched to customer. Transaction settled.'}
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Owner Analytics Portal */}
        <div className={`space-y-4 ${activeTab === 'owner' ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center gap-2 text-maven-gold text-xs font-mono uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>3. Owner Control Portal</span>
          </div>

          <div className="bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-5 min-h-[380px] shadow-inner flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-maven-cream/5">
                <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">REAL-TIME TELEMETRY</span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded">SYNC OK</span>
              </div>

              {/* Financial metric cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-maven-green-light/10 border border-maven-cream/5 p-3.5 rounded-xl">
                  <span className="text-[8px] font-mono text-maven-muted uppercase">DAILY REVENUE</span>
                  <motion.div 
                    className="text-sm font-mono text-maven-cream font-bold mt-0.5 flex items-center gap-1"
                    animate={{ color: step === 'served' ? '#C9A84C' : '#F6F1E5' }}
                  >
                    ₹{revenue.toLocaleString('en-IN')}
                    {step === 'served' && <TrendingUp className="w-3.5 h-3.5 text-maven-gold" />}
                  </motion.div>
                </div>

                <div className="bg-maven-green-light/10 border border-maven-cream/5 p-3.5 rounded-xl">
                  <span className="text-[8px] font-mono text-maven-muted uppercase">COMMISSIONS WASTED</span>
                  <div className="text-sm font-mono text-red-400 font-bold mt-0.5">
                    ₹0
                  </div>
                </div>
              </div>

              {/* Recipe stock metrics */}
              <div className="bg-maven-green-light/10 border border-maven-cream/5 p-3.5 rounded-xl space-y-3">
                <span className="block text-[9px] font-mono text-maven-gold uppercase tracking-wider font-bold">
                  INGREDIENT STOCK COUNTER
                </span>
                
                <div className="space-y-2 text-[10px] font-mono">
                  <div>
                    <div className="flex justify-between text-maven-cream mb-1">
                      <span>Chef Pasta Flour</span>
                      <motion.span animate={{ color: pastaStock < 80 ? '#F87171' : '#F6F1E5' }}>{pastaStock}%</motion.span>
                    </div>
                    <div className="w-full bg-maven-green-dark h-1 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-maven-gold h-full"
                        animate={{ width: `${pastaStock}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-maven-cream mb-1">
                      <span>Black Truffle Est</span>
                      <motion.span animate={{ color: truffleStock < 90 ? '#F87171' : '#F6F1E5' }}>{truffleStock}%</motion.span>
                    </div>
                    <div className="w-full bg-maven-green-dark h-1 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-maven-gold h-full"
                        animate={{ width: `${truffleStock}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CRM Live logs */}
              <div className="space-y-1.5">
                <span className="block text-[8px] font-mono text-maven-muted uppercase tracking-widest">
                  LIVE GUEST CRM RECORD FEED
                </span>
                <div className="space-y-1.5 max-h-[105px] overflow-hidden text-[9px] font-mono text-maven-muted leading-relaxed">
                  <AnimatePresence>
                    {crmLogs.map((log, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-center py-1 border-b border-maven-cream/5"
                      >
                        <span className="truncate max-w-[130px] text-maven-cream font-medium">{log.name}</span>
                        <span className="truncate max-w-[160px] text-maven-muted">{log.action}</span>
                        <span className="text-maven-gold font-bold">{log.amount}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => onPrefillInquiry('Requested live walk-through of KDS and Real-time CRM Sync.')}
                className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                Request Dashboard Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
