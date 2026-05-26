'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import {
  Shield,
  Activity,
  Receipt,
  MessageSquare,
  MousePointerClick,
  Terminal,
  Cpu,
  Trash2,
  Database,
  ArrowRight,
  TrendingUp,
  Sliders,
  ChevronDown,
  LogOut,
  Sparkles,
  Utensils,
  Coffee,
  Store,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Radio
} from 'lucide-react';
import { trpc } from '../../utils/trpc';
import { getApiUrl } from '../../utils/apiConfig';

interface StreamLog {
  id: string;
  type: string;
  brandId?: string;
  timestamp: string;
  message: string;
  payload: any;
}

const BRANDS = [
  { id: 'fine-dining', name: 'The Heritage Room', icon: Utensils, accent: '#C9A84C', type: 'Fine Dining' },
  { id: 'cafe', name: 'Brew & Bound', icon: Coffee, accent: '#D4A373', type: 'Boutique Cafe' },
  { id: 'cloud-kitchen', name: 'Bowl & Box Co.', icon: Store, accent: '#E76F51', type: 'Cloud Kitchen' }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulation' | 'leads'>('simulation');

  // Trigger States
  const [targetBrand, setTargetBrand] = useState('fine-dining');
  
  const [posTable, setPosTable] = useState<number>(4);
  const [posAmount, setPosAmount] = useState<number>(3400);
  const [posItems, setPosItems] = useState<number>(3);

  const [waName, setWaName] = useState<string>('Siddharth Sen');
  const [waText, setWaText] = useState<string>('Hey, do you have any private dining offers for this weekend?');
  const [waIntent, setWaIntent] = useState<string>('Offers Inquiry');

  const [adPlatform, setAdPlatform] = useState<'Instagram Reels' | 'Facebook Feed' | 'Local Maps'>('Instagram Reels');
  const [adBudget, setAdBudget] = useState<number>(450);

  // Global Config Flags
  const [stressMode, setStressMode] = useState(false);
  const [boostCampaigns, setBoostCampaigns] = useState(false);
  const [conciergeAutopilot, setConciergeAutopilot] = useState(true);

  // Aggregated Visual Metrics (Derived or accumulated)
  const [totalSales, setTotalSales] = useState(367500);
  const [totalSpend, setTotalSpend] = useState(41600);
  const [totalImpressions, setTotalImpressions] = useState(736100);

  // SSE Terminal States
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [sseConnected, setSseConnected] = useState<boolean>(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // tRPC Queries & Mutations
  const statusQuery = trpc.getSystemStatus.useQuery(undefined, { refetchInterval: 10000 });
  const inquiriesQuery = trpc.getInquiries.useQuery(undefined, { enabled: isAdmin });
  
  const updateInquiryStatusMutation = trpc.updateInquiryStatus.useMutation({
    onSuccess: () => {
      inquiriesQuery.refetch();
    }
  });

  const generateTokenMutation = trpc.generateOnboardingToken.useMutation({
    onSuccess: () => {
      inquiriesQuery.refetch();
    }
  });

  const handleGenerateToken = (inquiryId: string) => {
    generateTokenMutation.mutate({ inquiryId });
  };

  const posMutation = trpc.simulatePOSOrder.useMutation();
  const waMutation = trpc.simulateWhatsAppMessage.useMutation();
  const adMutation = trpc.simulateAdImpression.useMutation();

  // 1. Session authorization gate check
  useEffect(() => {
    const sessionStr = localStorage.getItem('maven_session');
    if (!sessionStr) {
      router.replace('/dashboard/login');
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== 'admin') {
        router.replace('/dashboard/login');
        return;
      }
      setIsAdmin(true);
    } catch (err) {
      localStorage.removeItem('maven_session');
      router.replace('/dashboard/login');
    }
  }, [router]);

  // 2. Connect to SSE (Unfiltered Global Stream)
  useEffect(() => {
    if (!isAdmin) return;

    const eventSource = new EventSource(`${getApiUrl()}/api/events`);

    eventSource.onopen = () => {
      setSseConnected(true);
      addLog({
        type: 'SYSTEM',
        message: `Established connection to SSE live event stream (${getApiUrl()}/api/events)`,
        payload: { status: 'CONNECTED', scope: 'GLOBAL_HQ' }
      });
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      setSseConnected(false);
      addLog({
        type: 'ERROR',
        message: 'Lost connection to SSE stream. Retrying connection…',
        payload: { error: 'DISCONNECTED' }
      });
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'CONNECTED') return;

        addLog({
          type: data.type,
          brandId: data.brandId,
          message: data.message || 'Incoming transaction detected.',
          payload: data
        });

        // Accumulate global admin metrics in real time
        if (data.type === 'POS_ORDER') {
          setTotalSales(prev => prev + data.amount);
        } else if (data.type === 'AD_IMPRESSION') {
          setTotalSpend(prev => prev + data.budget);
          setTotalImpressions(prev => prev + Math.floor(data.budget * 7.5));
        }
      } catch (err) {
        console.error('Failed to parse SSE payload:', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [isAdmin]);

  // 3. Stress mode random triggers simulation
  useEffect(() => {
    if (!stressMode || !sseConnected) return;

    const interval = setInterval(() => {
      const randomBrand = BRANDS[Math.floor(Math.random() * BRANDS.length)].id;
      const amount = Math.floor(Math.random() * 8000) + 1200;
      const itemsCount = Math.floor(Math.random() * 6) + 1;
      const tableId = Math.floor(Math.random() * 8) + 1;

      posMutation.mutate({
        brandId: randomBrand,
        tableId,
        amount,
        itemsCount
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [stressMode, sseConnected]);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (newLog: Omit<StreamLog, 'id' | 'timestamp'>) => {
    setLogs((prev) => [
      ...prev,
      {
        ...newLog,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-40));
  };

  const handlePOSSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    posMutation.mutate({
      brandId: targetBrand,
      tableId: posTable,
      amount: posAmount,
      itemsCount: posItems
    }, {
      onSuccess: () => {
        addLog({
          type: 'SYSTEM',
          brandId: targetBrand,
          message: `Dispatched Simulated POS Order for Table ${posTable} (₹${posAmount.toLocaleString('en-IN')})`,
          payload: { action: 'EMIT', brandId: targetBrand }
        });
      }
    });
  };

  const handleWASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    waMutation.mutate({
      brandId: targetBrand,
      senderName: waName,
      messageText: waText,
      intent: waIntent
    }, {
      onSuccess: () => {
        addLog({
          type: 'SYSTEM',
          brandId: targetBrand,
          message: `Injected Simulated WhatsApp Conversation from ${waName}`,
          payload: { action: 'EMIT', brandId: targetBrand }
        });
      }
    });
  };

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adMutation.mutate({
      brandId: targetBrand,
      platform: adPlatform,
      budget: adBudget
    }, {
      onSuccess: () => {
        addLog({
          type: 'SYSTEM',
          brandId: targetBrand,
          message: `Injected Simulated Ad Conversion on ${adPlatform} (₹${adBudget})`,
          payload: { action: 'EMIT', brandId: targetBrand }
        });
      }
    });
  };

  const handleInquiryStatusChange = (id: string, currentStatus: string) => {
    const statuses = ['New', 'Contacted', 'Converted', 'Archived'];
    const nextIndex = (statuses.indexOf(currentStatus) + 1) % statuses.length;
    const nextStatus = statuses[nextIndex] as 'New' | 'Contacted' | 'Converted' | 'Archived';
    
    updateInquiryStatusMutation.mutate({
      id,
      status: nextStatus
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('maven_session');
    router.push('/dashboard/login');
  };

  const clearConsole = () => {
    setLogs([]);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-[#C9A84C]/25 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans pb-24 relative overflow-clip selection:bg-[#C9A84C] selection:text-[#081a15]">
      {/* Background vector grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#081a15]/80 border-b border-[#FDFCF0]/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-2xl tracking-widest text-[#C9A84C] flex items-center gap-2">
              <Logo variant="monogram" size="sm" />
              <span className="leading-none">MAVEN</span>
              <span className="text-[10px] px-2 py-0.5 border border-[#C9A84C]/30 rounded-full font-mono text-[#FDFCF0]">HQ</span>
            </span>
            <div className="h-4 w-px bg-[#FDFCF0]/20" />
            <span className="text-[10px] font-mono text-[#FDFCF0]/60 flex items-center gap-2 bg-[#12352A]/40 border border-[#C9A84C]/10 px-3 py-1 rounded-full text-[10px]">
              <span className={`h-1.5 w-1.5 rounded-full ${sseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              HQ Command Control
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#12352A] border border-[#FDFCF0]/10 rounded-full p-1 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('simulation')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeTab === 'simulation'
                    ? 'bg-[#C9A84C] text-[#12352A] font-bold shadow'
                    : 'text-[#FDFCF0]/60 hover:text-[#FDFCF0]'
                }`}
              >
                Simulation Command
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'leads'
                    ? 'bg-[#C9A84C] text-[#12352A] font-bold shadow'
                    : 'text-[#FDFCF0]/60 hover:text-[#FDFCF0]'
                }`}
              >
                Leads Desk
                {inquiriesQuery.data && inquiriesQuery.data.length > 0 && (
                  <span className="text-[9px] bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                    {inquiriesQuery.data.filter(q => q.status === 'New').length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-red-950 hover:bg-red-950/20 text-red-400 font-mono text-xs rounded-full transition-all duration-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Intro Control Banner */}
        <div className="col-span-12 bg-gradient-to-r from-[#12352A] to-[#091e18] border border-[#C9A84C]/20 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
            <Shield className="w-56 h-56" />
          </div>
          <div className="relative z-10">
            <h1 className="text-xl font-bold font-display flex items-center gap-2 text-[#C9A84C]">
              <Shield className="h-5 w-5" /> Master Control Cockpit
            </h1>
            <p className="text-xs text-[#FDFCF0]/80 mt-1 max-w-3xl">
              Centralized operational console. Direct sqlite operations desk, tRPC webhook simulation injectors, and live unfiltered SSE activity logging stream are online.
            </p>
          </div>
          <div className="flex gap-2 relative z-10 shrink-0">
            <span className="text-[9px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full uppercase tracking-wider">
              SQLite Active
            </span>
            <span className="text-[9px] font-mono border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] px-3 py-1.5 rounded-full uppercase tracking-wider">
              tRPC OK
            </span>
          </div>
        </div>

        {/* HUD Quick Stats Matrix */}
        <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#12352A]/25 border border-[#FDFCF0]/5 p-5 rounded-2xl">
            <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Global Combined Revenue</span>
            <span className="text-2xl font-bold font-mono text-[#C9A84C] block mt-1">
              ₹{totalSales.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] font-mono text-[#8FAF95] mt-1 block">Live simulated checkout totals</span>
          </div>

          <div className="bg-[#12352A]/25 border border-[#FDFCF0]/5 p-5 rounded-2xl">
            <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Simulation Spend</span>
            <span className="text-2xl font-bold font-mono text-[#FDFCF0] block mt-1">
              ₹{totalSpend.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] font-mono text-emerald-500 mt-1 block">Accumulating campaign spends</span>
          </div>

          <div className="bg-[#12352A]/25 border border-[#FDFCF0]/5 p-5 rounded-2xl">
            <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Accumulated Impressions</span>
            <span className="text-2xl font-bold font-mono text-[#FDFCF0] block mt-1">
              {totalImpressions.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] font-mono text-emerald-500 mt-1 block">Visual campaign impressions</span>
          </div>

          <div className="bg-[#12352A]/25 border border-[#FDFCF0]/5 p-5 rounded-2xl">
            <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Core Server Health</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1 flex items-center gap-2">
              <Activity className="h-5 w-5 animate-pulse text-emerald-400" />
              {statusQuery.data?.status === 'healthy' ? 'ACTIVE' : 'STANDBY'}
            </span>
            <span className="text-[9px] font-mono text-[#8FAF95] mt-1 block">
              Uptime: {statusQuery.data ? `${Math.floor(statusQuery.data.uptime)}s` : 'connecting…'}
            </span>
          </div>
        </section>

        {activeTab === 'simulation' ? (
          <>
            {/* Left Column: Webhook Simulator Cockpit (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[#12352A]/15 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-[#FDFCF0]/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#C9A84C]" />
                    <h2 className="text-base font-bold font-serif text-[#FDFCF0]">Operations Webhook Simulator</h2>
                  </div>

                  {/* Targeted Venue Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#FDFCF0]/40">Target Venue:</span>
                    <select
                      value={targetBrand}
                      onChange={(e) => setTargetBrand(e.target.value)}
                      className="bg-[#081a15] border border-[#C9A84C]/30 text-xs font-mono rounded-lg px-3 py-1.5 text-[#FDFCF0] focus:outline-none"
                    >
                      {BRANDS.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Webhook 1: POS Checkout */}
                  <div className="bg-[#081a15]/40 border border-[#FDFCF0]/5 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#FDFCF0]/5 pb-3">
                      <Receipt className="w-4 h-4 text-[#C9A84C]" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate POS Checkout</h3>
                    </div>
                    <form onSubmit={handlePOSSubmit} className="space-y-4 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-[#8FAF95]">Table Code</span>
                        <select 
                          value={posTable}
                          onChange={(e) => setPosTable(Number(e.target.value))}
                          className="bg-[#12352A] border border-[#FDFCF0]/10 rounded-md px-2.5 py-1 text-[#FDFCF0] focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map(n => (
                            <option key={n} value={n}>Table {n}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-[#8FAF95]">
                          <span>Billing Value</span>
                          <span className="font-bold text-[#C9A84C]">₹{posAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <input 
                          type="range"
                          min="300"
                          max="15000"
                          step="100"
                          value={posAmount}
                          onChange={(e) => setPosAmount(Number(e.target.value))}
                          className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#8FAF95]">
                          <span>Total Dishes</span>
                          <span className="font-bold text-[#C9A84C]">{posItems}</span>
                        </div>
                        <input 
                          type="range"
                          min="1"
                          max="8"
                          step="1"
                          value={posItems}
                          onChange={(e) => setPosItems(Number(e.target.value))}
                          className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={posMutation.isLoading}
                        className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] text-[9px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
                      >
                        {posMutation.isLoading ? 'DISPATCHING…' : 'DISPATCH POS CHECKOUT'}
                      </button>
                    </form>
                  </div>

                  {/* Webhook 2: WhatsApp chat */}
                  <div className="bg-[#081a15]/40 border border-[#FDFCF0]/5 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#FDFCF0]/5 pb-3">
                      <MessageSquare className="w-4 h-4 text-[#C9A84C]" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate WhatsApp Msg</h3>
                    </div>
                    <form onSubmit={handleWASubmit} className="space-y-3 text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[#8FAF95] block text-[10px]">Customer Name</label>
                        <input 
                          type="text"
                          value={waName}
                          onChange={(e) => setWaName(e.target.value)}
                          className="w-full bg-[#12352A] border border-[#FDFCF0]/10 rounded-md px-3 py-1.5 text-[#FDFCF0] focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[#8FAF95] block text-[10px]">Message Text</label>
                        <textarea 
                          rows={2}
                          value={waText}
                          onChange={(e) => setWaText(e.target.value)}
                          className="w-full bg-[#12352A] border border-[#FDFCF0]/10 rounded-md px-3 py-1.5 text-[#FDFCF0] focus:outline-none text-[11px] resize-none"
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[#8FAF95]">Target Intent</span>
                        <select 
                          value={waIntent}
                          onChange={(e) => setWaIntent(e.target.value)}
                          className="bg-[#12352A] border border-[#FDFCF0]/10 rounded-md px-2 py-1 text-[#FDFCF0] focus:outline-none text-[11px]"
                        >
                          <option value="Table Reservation">Table Reservation</option>
                          <option value="Menu Inquiry">Menu Inquiry</option>
                          <option value="Offers Inquiry">Offers Inquiry</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        disabled={waMutation.isLoading}
                        className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] text-[9px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
                      >
                        {waMutation.isLoading ? 'DISPATCHING…' : 'DISPATCH CHAT LOG'}
                      </button>
                    </form>
                  </div>

                  {/* Webhook 3: Ad Impressions */}
                  <div className="bg-[#081a15]/40 border border-[#FDFCF0]/5 p-5 rounded-2xl space-y-4 md:col-span-2">
                    <div className="flex items-center gap-2 border-b border-[#FDFCF0]/5 pb-3">
                      <MousePointerClick className="w-4 h-4 text-[#C9A84C]" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate Ad Clicks</h3>
                    </div>
                    <form onSubmit={handleAdSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[#8FAF95] block text-[10px]">Placement Platform</label>
                        <select 
                          value={adPlatform}
                          onChange={(e) => setAdPlatform(e.target.value as any)}
                          className="w-full bg-[#12352A] border border-[#FDFCF0]/10 rounded-md px-3 py-2 text-[#FDFCF0] focus:outline-none"
                        >
                          <option value="Instagram Reels">Instagram Reels</option>
                          <option value="Facebook Feed">Facebook Feed</option>
                          <option value="Local Maps">Local Maps</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[#8FAF95]">
                          <span>Spend Budget</span>
                          <span className="font-bold text-[#C9A84C]">₹{adBudget}</span>
                        </div>
                        <input 
                          type="range"
                          min="100"
                          max="2000"
                          step="100"
                          value={adBudget}
                          onChange={(e) => setAdBudget(Number(e.target.value))}
                          className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={adMutation.isLoading}
                        className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] text-[9px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
                      >
                        {adMutation.isLoading ? 'DISPATCHING…' : 'EMIT CAMPAIGN SPEND'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* administrative Configuration Panel */}
              <div className="bg-[#12352A]/15 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 space-y-4">
                <h3 className="text-sm font-bold font-serif text-[#FDFCF0] border-b border-[#FDFCF0]/5 pb-3">
                  Global System Feature Flags
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="bg-[#081a15]/30 border border-[#FDFCF0]/5 p-4 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#C9A84C] block">Peak Stress Load Mode</span>
                      <span className="text-[10px] text-[#8FAF95] mt-1 block">Triggers automated checkout rushes every 4.5s</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStressMode(!stressMode)}
                      className={`w-full py-2 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-colors ${stressMode ? 'bg-[#C9A84C] text-[#081a15]' : 'bg-[#12352A] text-[#FDFCF0]/60'}`}
                    >
                      {stressMode ? 'ACTIVE / DISMISS' : 'INACTIVE / ENGAGE'}
                    </button>
                  </div>

                  <div className="bg-[#081a15]/30 border border-[#FDFCF0]/5 p-4 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#C9A84C] block">Campaign Boosting</span>
                      <span className="text-[10px] text-[#8FAF95] mt-1 block">Increases micro adimpression CTR conversion metrics</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBoostCampaigns(!boostCampaigns)}
                      className={`w-full py-2 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-colors ${boostCampaigns ? 'bg-[#C9A84C] text-[#081a15]' : 'bg-[#12352A] text-[#FDFCF0]/60'}`}
                    >
                      {boostCampaigns ? 'ACTIVE / BOOSTED' : 'INACTIVE / STABLE'}
                    </button>
                  </div>

                  <div className="bg-[#081a15]/30 border border-[#FDFCF0]/5 p-4 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#C9A84C] block">AI Auto-Concierge</span>
                      <span className="text-[10px] text-[#8FAF95] mt-1 block">Simulates micro-chatbot reservations responders</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConciergeAutopilot(!conciergeAutopilot)}
                      className={`w-full py-2 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-colors ${conciergeAutopilot ? 'bg-[#C9A84C] text-[#081a15]' : 'bg-[#12352A] text-[#FDFCF0]/60'}`}
                    >
                      {conciergeAutopilot ? 'AUTOPILOT ON' : 'AUTOPILOT OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Server Live Event Terminal (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col h-[700px] border border-[#C9A84C]/20 bg-[#0A2119] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="bg-[#12352A] border-b border-[#C9A84C]/15 px-5 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[9px] font-mono tracking-widest text-[#FDFCF0] uppercase font-bold">SSE Unified Stream Hub</span>
                </div>
                
                <button 
                  onClick={clearConsole}
                  className="text-[9px] font-mono text-[#8FAF95] hover:text-[#C9A84C] flex items-center gap-1 focus:outline-none"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="flex-1 p-5 font-mono text-[9.5px] overflow-y-auto space-y-4 bg-black/30">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#8FAF95]/30 text-center gap-2">
                    <Radio className="w-8 h-8 stroke-[1] animate-pulse" />
                    <span>Awaiting global Server-Sent Events stream...<br />Triggers from anywhere in the system will route here.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log) => {
                      const brandMatch = BRANDS.find(b => b.id === log.brandId);
                      return (
                        <div key={log.id} className="border-b border-[#FDFCF0]/5 pb-2">
                          <div className="flex justify-between items-center text-[8.5px] mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded font-bold ${
                                log.type === 'POS_ORDER' ? 'bg-amber-500/15 text-amber-400' :
                                log.type === 'WHATSAPP_LOG' ? 'bg-emerald-500/15 text-emerald-400' :
                                log.type === 'AD_IMPRESSION' ? 'bg-sky-500/15 text-sky-400' :
                                log.type === 'ERROR' ? 'bg-red-500/15 text-red-400' :
                                'bg-purple-500/15 text-purple-400'
                              }`}>
                                {log.type}
                              </span>
                              {brandMatch && (
                                <span 
                                  className="text-[8px] font-semibold border px-1.5 rounded" 
                                  style={{ color: brandMatch.accent, borderColor: `${brandMatch.accent}40`, backgroundColor: `${brandMatch.accent}05` }}
                                >
                                  {brandMatch.name.split(' ')[0]}
                                </span>
                              )}
                            </div>
                            <span className="text-[#8FAF95]/40">{log.timestamp}</span>
                          </div>

                          <p className="text-[#FDFCF0]/90 leading-relaxed font-mono break-all">{log.message}</p>
                        </div>
                      );
                    })}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </div>

              <div className="bg-[#12352A] border-t border-[#C9A84C]/15 py-3 px-5 flex items-center justify-between text-[#8FAF95]/50 text-[8px] font-mono">
                <span className="flex items-center gap-1"><Database className="w-3 h-3 text-[#C9A84C]" /> SQLITE dev.db synced</span>
                <span>Active SSE Transport Channel</span>
              </div>
            </div>
          </>
        ) : (
          /* Leads and Inquiry Operations Desk Tab (SQLite Integrated via tRPC) */
          <div className="col-span-12 bg-[#12352A]/15 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#FDFCF0]/5 pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#C9A84C]" />
                <div>
                  <h2 className="text-base font-bold font-serif text-[#FDFCF0]">Prisma SQLite Inquiry Leads Manager</h2>
                  <p className="text-[10px] font-mono text-[#8FAF95] mt-0.5">Real-time inquiries database metrics via active context pipelines</p>
                </div>
              </div>
              
              <button
                onClick={() => inquiriesQuery.refetch()}
                className="flex items-center gap-2 text-xs font-mono border border-[#C9A84C]/30 hover:border-[#C9A84C] px-3.5 py-1.5 rounded-full transition-all text-[#C9A84C]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${inquiriesQuery.isFetching ? 'animate-spin' : ''}`} />
                Sync Leads Table
              </button>
            </div>

            {inquiriesQuery.isLoading ? (
              <div className="py-24 text-center text-xs font-mono text-[#8FAF95]/50">
                Fetching Inquiry Leads from sqlite database…
              </div>
            ) : !inquiriesQuery.data || inquiriesQuery.data.length === 0 ? (
              <div className="py-24 text-center text-xs font-mono text-[#8FAF95]/40 space-y-2">
                <Mail className="w-8 h-8 stroke-[1] mx-auto text-[#C9A84C]/40" />
                <p>No client inquiries found in the local SQLite database.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#FDFCF0]/10 bg-black/10">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-[#12352A]/30 border-b border-[#FDFCF0]/10 text-[#8FAF95] text-[10px] uppercase tracking-wider">
                      <th className="p-4 font-bold">Contact Name</th>
                      <th className="p-4 font-bold">Business Entity</th>
                      <th className="p-4 font-bold">Inquiry Details</th>
                      <th className="p-4 font-bold">Onboarding Access Key</th>
                      <th className="p-4 font-bold">Submit Time</th>
                      <th className="p-4 font-bold text-center">Lifecycle Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDFCF0]/5">
                    {inquiriesQuery.data.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-[#12352A]/10 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-[#FDFCF0] block">{inquiry.name}</span>
                          <span className="text-[10px] text-[#8FAF95]/70 font-mono flex items-center gap-1.5 mt-1">
                            <Mail className="w-3 h-3 text-[#C9A84C]/60" /> {inquiry.email}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-[#C9A84C] block">{inquiry.businessName}</span>
                          <span className="text-[9px] px-2 py-0.5 border border-[#8FAF95]/30 rounded-full font-mono text-[#8FAF95]/80 inline-block mt-1 uppercase">
                            {inquiry.businessType}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="text-[#FDFCF0]/80 leading-normal line-clamp-2 italic text-[11px]">
                            {inquiry.notes ? `"${inquiry.notes}"` : 'No custom notes provided.'}
                          </p>
                          <span className="text-[10px] text-[#8FAF95]/70 font-mono flex items-center gap-1.5 mt-1.5">
                            <Phone className="w-3 h-3 text-[#C9A84C]/60" /> {inquiry.phone}
                          </span>
                        </td>
                        <td className="p-4">
                          {inquiry.onboardingToken ? (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#C9A84C] font-bold text-xs bg-[#C9A84C]/10 border border-[#C9A84C]/25 px-2.5 py-1.5 rounded-lg select-all">
                                {inquiry.onboardingToken}
                              </span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(inquiry.onboardingToken || '');
                                  alert('Token copied to clipboard!');
                                }}
                                className="text-[9px] font-mono uppercase bg-[#12352A] hover:bg-[#12352A]/80 border border-[#C9A84C]/20 px-2 py-1 rounded text-[#FDFCF0] font-bold transition-colors"
                              >
                                Copy
                              </button>
                            </div>
                          ) : inquiry.status === 'Converted' ? (
                            <span className="text-[10px] font-mono text-[#8FAF95]/50">Converted (Active Venue)</span>
                          ) : (
                            <button
                              onClick={() => handleGenerateToken(inquiry.id)}
                              className="text-[10px] font-mono uppercase bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#081a15] font-bold px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Generate Key
                            </button>
                          )}
                        </td>
                        <td className="p-4 text-[#8FAF95]/70 text-[10px]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A84C]/60" />
                            {new Date(inquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleInquiryStatusChange(inquiry.id, inquiry.status)}
                            className={`px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider border font-mono transition-all flex items-center gap-1.5 mx-auto ${
                              inquiry.status === 'New' ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' :
                              inquiry.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' :
                              inquiry.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' :
                              'bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/20'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              inquiry.status === 'New' ? 'bg-red-400 animate-pulse' :
                              inquiry.status === 'Contacted' ? 'bg-amber-400' :
                              inquiry.status === 'Converted' ? 'bg-emerald-400' :
                              'bg-gray-400'
                            }`} />
                            {inquiry.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Styled HQ Footer */}
      <footer className="border-t border-[#FDFCF0]/5 py-8 text-center text-xs font-mono text-[#8FAF95]/30 max-w-7xl mx-auto mt-16 relative z-10 w-full">
        <p>© 2026 Maven HQ Systems Administration Control Room.</p>
      </footer>
    </div>
  );
}
