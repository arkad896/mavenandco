'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import {
  TrendingUp,
  Smartphone,
  Sparkles,
  Utensils,
  Coffee,
  Store,
  ArrowRight,
  Radio,
  Receipt,
  MessageSquare,
  MousePointerClick,
  LogOut
} from 'lucide-react';
import { getApiUrl } from '../../utils/apiConfig';
import { trpc } from '../../utils/trpc';

const Facebook = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface BrandConfig {
  id: string;
  name: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  metrics: {
    spend: string;
    impressions: string;
    ctr: string;
    roas: string;
    sales: string;
    occupancy: string;
    growth: string;
  };
  adMockup: {
    headline: string;
    description: string;
    imageUrl: string;
    cta: string;
  };
  whatsappFlow: {
    triggers: string[];
    reply: string;
  };
  tables: { id: number; label: string; size: number; status: 'occupied' | 'checkout' | 'free'; bill: number; items: string[] }[];
}

const iconMap = {
  utensils: Utensils,
  coffee: Coffee,
  store: Store,
  sparkles: Sparkles,
};

const getMenuPool = (tablesList: any[]) => {
  const items = Array.from(new Set(tablesList.flatMap(t => t.items || []))).filter(Boolean);
  if (items.length > 0) return items;
  return ['Chef Gourmet Special', 'Gourmet Specialty Dish', 'House Mocktail', 'Premium Dessert'];
};

export default function ClientDashboard() {
  const router = useRouter();
  const [brandId, setBrandId] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<BrandConfig | null>(null);
  const [tables, setTables] = useState<BrandConfig['tables']>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [whatsappLogs, setWhatsappLogs] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dynamicMetrics, setDynamicMetrics] = useState({
    spend: 0,
    impressions: 0,
    ctr: 0,
    roas: 0,
    sales: 0,
  });
  const [salesChanged, setSalesChanged] = useState(false);
  const [adSpendChanged, setAdSpendChanged] = useState(false);
  const [flashingTableId, setFlashingTableId] = useState<number | null>(null);
  const [sseConnected, setSseConnected] = useState(false);
  interface Toast {
    id: string;
    type: 'POS_ORDER' | 'WHATSAPP_LOG' | 'AD_IMPRESSION' | 'SYSTEM';
    message: string;
    timestamp: string;
  }
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (newToast: Omit<Toast, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toLocaleTimeString();
    setToasts(prev => [...prev, { ...newToast, id, timestamp }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const botTriggers: Record<string, boolean> = {
    '/menu': true,
    '/reserve': true,
    '/offers': true,
  };

  // 1. Session and Security check
  useEffect(() => {
    const sessionStr = localStorage.getItem('maven_session');
    if (!sessionStr) {
      router.replace('/dashboard/login');
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== 'client' || !session.brandId) {
        router.replace('/dashboard/login');
        return;
      }
      setBrandId(session.brandId);
    } catch (err) {
      localStorage.removeItem('maven_session');
      router.replace('/dashboard/login');
    }
  }, [router]);

  // Fetch brand data dynamically
  const { data: dbBrand, isLoading: isBrandLoading, error: brandError } = trpc.getBrandById.useQuery(
    { id: brandId || '' },
    { enabled: !!brandId }
  );

  // Handle brand query errors or missing brands
  useEffect(() => {
    if (brandError) {
      localStorage.removeItem('maven_session');
      router.replace('/dashboard/login');
    }
  }, [brandError, router]);

  // Sync state when DB Brand is loaded
  useEffect(() => {
    if (!dbBrand) return;

    let parsedTables = [];
    try {
      parsedTables = JSON.parse(dbBrand.tablesJson);
    } catch (e) {
      console.error('Failed to parse tablesJson', e);
    }

    const mappedIcon = iconMap[dbBrand.icon as keyof typeof iconMap] || Sparkles;

    const brandConfig: BrandConfig = {
      id: dbBrand.id,
      name: dbBrand.name,
      type: dbBrand.type,
      icon: mappedIcon,
      accent: dbBrand.accent,
      metrics: {
        spend: `₹${dbBrand.spend.toLocaleString('en-IN')}`,
        impressions: dbBrand.impressions.toLocaleString('en-IN'),
        ctr: `${dbBrand.ctr.toFixed(2)}%`,
        roas: `${dbBrand.roas.toFixed(2)}x`,
        sales: `₹${dbBrand.sales.toLocaleString('en-IN')}`,
        occupancy: dbBrand.occupancy,
        growth: dbBrand.growth,
      },
      adMockup: {
        headline: dbBrand.adHeadline,
        description: dbBrand.adDescription,
        imageUrl: dbBrand.adImageUrl,
        cta: dbBrand.adCta,
      },
      whatsappFlow: {
        triggers: dbBrand.waTriggers.split(','),
        reply: dbBrand.waReply,
      },
      tables: parsedTables,
    };

    setActiveBrand(brandConfig);
    setTables(parsedTables);

    const initialOccupied = parsedTables.find((t: any) => t.status === 'occupied') || parsedTables[0];
    setSelectedTableId(initialOccupied ? initialOccupied.id : null);

    setWhatsappLogs([
      `System: Connected to ${dbBrand.name} WhatsApp Business API.`,
      `System: Preloaded dynamic triggers: ${dbBrand.waTriggers.split(',').join(', ')}.`
    ]);

    setDynamicMetrics({
      spend: dbBrand.spend,
      impressions: dbBrand.impressions,
      ctr: dbBrand.ctr,
      roas: dbBrand.roas,
      sales: dbBrand.sales,
    });
  }, [dbBrand]);

  // 2. Connect to SSE with Brand Filtering
  useEffect(() => {
    if (!activeBrand) return;

    const eventSource = new EventSource(`${getApiUrl()}/api/events`);

    eventSource.onopen = () => {
      setSseConnected(true);
      addToast({
        type: 'SYSTEM',
        message: `Linked core SSE live stream for ${activeBrand.name}`,
      });
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      setSseConnected(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'CONNECTED') return;

        // TENANT ISOLATION FILTERING
        // Only process events that belong specifically to this active venue!
        if (data.brandId && data.brandId !== activeBrand.id) {
          console.log(`[SSE tenant filter] Suppressed event for another venue: ${data.brandId}`);
          return;
        }

        if (data.type === 'POS_ORDER') {
          const orderAmount = data.amount;
          const tblId = data.tableId;
          const count = data.itemsCount;

          setDynamicMetrics(prev => ({
            ...prev,
            sales: prev.sales + orderAmount
          }));
          setSalesChanged(true);
          setTimeout(() => setSalesChanged(false), 2000);

          setTables(prev => {
            return prev.map(t => {
              if (t.id === tblId) {
                const menuPool = getMenuPool(activeBrand.tables);
                
                const chosenItems = [];
                for (let i = 0; i < count; i++) {
                  chosenItems.push(menuPool[Math.floor(Math.random() * menuPool.length)]);
                }

                return {
                  ...t,
                  status: 'checkout',
                  bill: orderAmount,
                  items: chosenItems
                };
              }
              return t;
            });
          });

          setFlashingTableId(tblId);
          setTimeout(() => setFlashingTableId(null), 3000);

          addToast({
            type: 'POS_ORDER',
            message: `Simulated POS Order: Table ${tblId} checked out for ₹${orderAmount.toLocaleString('en-IN')}`,
          });

        } else if (data.type === 'WHATSAPP_LOG') {
          const sender = data.senderName;
          const text = data.messageText;
          const intent = data.intent;

          setWhatsappLogs(prev => [...prev, `User: ${sender}: "${text}"`]);

          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const cleaned = text.toLowerCase().trim();
            const matchingTrigger = activeBrand.whatsappFlow.triggers.find(t => cleaned.includes(t.toLowerCase()));

            if (matchingTrigger && botTriggers[matchingTrigger.toLowerCase()] !== false) {
              setWhatsappLogs(prev => [...prev, `Bot: ${activeBrand.whatsappFlow.reply}`]);
            } else if (cleaned.includes('hello') || cleaned.includes('hey') || cleaned.includes('hi')) {
              setWhatsappLogs(prev => [
                ...prev,
                `Bot: Greetings from ${activeBrand.name} Concierge! 🥂 Try our quick commands: ${activeBrand.whatsappFlow.triggers.join(', ')}`
              ]);
            } else {
              setWhatsappLogs(prev => [
                ...prev,
                `Bot: Understood query for "${intent}". Routing request to active front desk team…`
              ]);
            }
          }, 1200);

          addToast({
            type: 'WHATSAPP_LOG',
            message: `Incoming Chat from ${sender} | Intent: ${intent}`,
          });

        } else if (data.type === 'AD_IMPRESSION') {
          const budgetVal = data.budget;
          const platform = data.platform;

          setDynamicMetrics(prev => {
            const addedImpressions = Math.floor(budgetVal * 7.5);
            const addedCtr = 0.01;
            const addedRoas = 0.02;
            return {
              ...prev,
              spend: prev.spend + budgetVal,
              impressions: prev.impressions + addedImpressions,
              ctr: Math.min(prev.ctr + addedCtr, 9.8),
              roas: Math.min(prev.roas + addedRoas, 10.5)
            };
          });

          setAdSpendChanged(true);
          setTimeout(() => setAdSpendChanged(false), 2000);

          addToast({
            type: 'AD_IMPRESSION',
            message: `Ad Conversion on ${platform} | Invested: ₹${budgetVal}`,
          });
        }
      } catch (err) {
        console.error('Failed to process incoming SSE message:', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [activeBrand]);

  const handleSendChat = (textToSend?: string) => {
    if (!activeBrand) return;
    const input = textToSend || chatInput;
    if (!input.trim()) return;

    setWhatsappLogs(prev => [...prev, `User: ${input}`]);
    if (!textToSend) setChatInput('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const cleaned = input.toLowerCase().trim();
      const matchingTrigger = activeBrand.whatsappFlow.triggers.find(t => cleaned.includes(t.toLowerCase()));

      if (matchingTrigger && botTriggers[matchingTrigger.toLowerCase()] !== false) {
        setWhatsappLogs(prev => [...prev, `Bot: ${activeBrand.whatsappFlow.reply}`]);
      } else if (cleaned.includes('hello') || cleaned.includes('hey') || cleaned.includes('hi')) {
        setWhatsappLogs(prev => [
          ...prev,
          `Bot: Hi there! 👋 I am the automated concierge for ${activeBrand.name}. Try typing one of our custom triggers: ${activeBrand.whatsappFlow.triggers.join(', ')}`
        ]);
      } else {
        setWhatsappLogs(prev => [
          ...prev,
          `Bot: Sorry, I didn't catch that trigger. Tap one of our preset triggers below to test the automatic response chain!`
        ]);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('maven_session');
    router.push('/dashboard/login');
  };

  if (isBrandLoading || !activeBrand) {
    return (
      <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-[#C9A84C]/25 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  const selectedTable = tables.find(t => t.id === selectedTableId) || null;

  return (
    <div className="min-h-screen bg-[#081a15] text-[#FDFCF0] font-sans pb-24 selection:bg-[#C9A84C] selection:text-[#081a15]">
      {/* 1. Tenant Glassmorphic Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#081a15]/80 border-b border-[#FDFCF0]/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-2xl tracking-widest text-[#C9A84C] flex items-center gap-2">
              <Logo variant="monogram" size="sm" />
              <span className="leading-none">MAVEN</span>
              <span className="text-[10px] px-2 py-0.5 border border-[#C9A84C]/30 rounded-full font-mono text-[#FDFCF0]">OS</span>
            </span>
            <div className="h-4 w-px bg-[#FDFCF0]/20" />
            <span className="text-[10px] font-mono text-[#FDFCF0]/60 flex items-center gap-2 bg-[#12352A]/40 border border-[#C9A84C]/10 px-3 py-1 rounded-full">
              <span className={`h-1.5 w-1.5 rounded-full ${sseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              {activeBrand.name} Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-red-900/30 hover:border-red-500/50 hover:bg-red-950/20 text-red-400 font-mono text-xs rounded-full transition-all duration-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dynamic Tenant Info banner */}
        <div 
          className="col-span-12 border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#12352A]/20 transition-colors duration-500"
          style={{ borderColor: `${activeBrand.accent}30` }}
        >
          <div>
            <h1 className="text-xl font-bold font-display flex items-center gap-2 text-[#C9A84C]" style={{ color: activeBrand.accent }}>
              <Sparkles className="h-5 w-5" /> Live Control Operations Room
            </h1>
            <p className="text-xs text-[#FDFCF0]/80 mt-1 max-w-3xl">
              Currently monitoring <strong>{activeBrand.name}</strong> ({activeBrand.type}). All metrics and transaction logs are isolated specifically to this venue.
            </p>
          </div>
          <div 
            className="flex items-center gap-2 border px-4.5 py-2 rounded-full font-mono text-xs select-none"
            style={{ borderColor: `${activeBrand.accent}30`, backgroundColor: `${activeBrand.accent}08`, color: activeBrand.accent }}
          >
            {React.createElement(activeBrand.icon, { className: 'w-4 h-4' })}
            <span>{activeBrand.type}</span>
          </div>
        </div>

        {/* 2. Meta Ads Command Center */}
        <section className="col-span-12 lg:col-span-6 bg-[#12352A]/20 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
            <Facebook className="h-36 w-36" />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#C9A84C] uppercase bg-[#C9A84C]/10 px-2 py-0.5 rounded-full" style={{ color: activeBrand.accent, backgroundColor: `${activeBrand.accent}15` }}>
                PAID ACQUISITION
              </span>
              <h2 className="text-lg font-bold font-display mt-2 flex items-center gap-2">
                Meta Ads Manager
              </h2>
            </div>
            <div className="flex gap-2 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono text-[#FDFCF0]/45">CAMPAIGN ACTIVE</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div 
              animate={adSpendChanged ? { scale: 1.03, borderColor: activeBrand.accent } : { scale: 1, borderColor: 'rgba(253, 252, 240, 0.05)' }}
              transition={{ duration: 0.3 }}
              className={`bg-[#12352A]/40 border p-4 rounded-xl transition-all duration-300 ${adSpendChanged ? 'shadow-[0_0_15px_rgba(201,168,76,0.2)] bg-[#12352A]/60' : 'border-[#FDFCF0]/5'}`}
            >
              <span className="text-[10px] font-mono text-[#FDFCF0]/40 uppercase block">Weekly Ad Spend</span>
              <span className="text-xl font-bold mt-1 block font-mono text-[#FDFCF0]">
                ₹{dynamicMetrics.spend.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] font-mono text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> optimized
              </span>
            </motion.div>

            <div className="bg-[#12352A]/40 border border-[#FDFCF0]/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-[#FDFCF0]/40 uppercase block">Total Impressions</span>
              <span className="text-xl font-bold mt-1 block font-mono text-[#FDFCF0]">
                {dynamicMetrics.impressions.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] font-mono text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> 84% local match
              </span>
            </div>

            <div className="bg-[#12352A]/40 border border-[#FDFCF0]/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-[#FDFCF0]/40 uppercase block">Click-Through Rate</span>
              <span className="text-xl font-bold mt-1 block font-mono text-[#FDFCF0]">
                {dynamicMetrics.ctr.toFixed(2)}%
              </span>
              <span className="text-[9px] font-mono text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> benchmark high
              </span>
            </div>

            <div className="bg-[#12352A]/40 border p-4 rounded-xl" style={{ borderColor: `${activeBrand.accent}30` }}>
              <span className="text-[10px] font-mono uppercase block text-[#8FAF95]" style={{ color: activeBrand.accent }}>ROAS (Return on Ad Spend)</span>
              <span className="text-xl font-bold mt-1 block font-mono font-bold" style={{ color: activeBrand.accent }}>
                {dynamicMetrics.roas.toFixed(2)}x
              </span>
              <span className="text-[9px] font-mono text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> +12% vs last month
              </span>
            </div>
          </div>

          {/* Social Ad Creative Preview Box */}
          <div className="border border-[#FDFCF0]/10 rounded-2xl bg-[#091a15] overflow-hidden">
            <div className="px-4 py-3 bg-[#12352A]/20 border-b border-[#FDFCF0]/5 flex items-center justify-between text-xs text-[#FDFCF0]/60">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" style={{ color: activeBrand.accent }} />
                <span className="font-mono">Facebook & Instagram Feed Ad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-[#12352A] flex items-center justify-center border" style={{ borderColor: `${activeBrand.accent}30` }}>
                  <Sparkles className="h-4 w-4" style={{ color: activeBrand.accent }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FDFCF0] flex items-center gap-1">
                    {activeBrand.name} <span className="text-[8px] bg-sky-500/20 text-sky-400 px-1 rounded">Sponsored</span>
                  </div>
                  <div className="text-[9px] text-[#FDFCF0]/45 font-mono">Meta Ads Premium Creative</div>
                </div>
              </div>

              <p className="text-xs text-[#FDFCF0]/80 mb-3 leading-relaxed">
                {activeBrand.adMockup.description}
              </p>

              <div className="relative h-48 rounded-xl overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeBrand.adMockup.imageUrl}
                  alt={activeBrand.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#FDFCF0]">
                      {activeBrand.adMockup.headline}
                    </h4>
                    <p className="text-[9px] text-[#FDFCF0]/60 font-mono mt-0.5">
                      Target Audience: 5km radius around venue
                    </p>
                  </div>
                  <span 
                    className="text-[#081a15] font-mono font-bold text-[9px] px-3.5 py-2.5 rounded uppercase tracking-wider select-none font-bold"
                    style={{ backgroundColor: activeBrand.accent }}
                  >
                    {activeBrand.adMockup.cta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WhatsApp CRM Automation */}
        <section className="col-span-12 lg:col-span-6 bg-[#12352A]/20 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase bg-[#C9A84C]/10 px-2 py-0.5 rounded-full" style={{ color: activeBrand.accent, backgroundColor: `${activeBrand.accent}15` }}>
                  CHATBOT & CONCIERGE
                </span>
                <h2 className="text-lg font-bold font-display mt-2 flex items-center gap-2">
                  WhatsApp Automation Engine
                </h2>
              </div>
              <div className="flex gap-2 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-[#FDFCF0]/45 font-mono">VERIFIED BUSINESS API</span>
              </div>
            </div>

            {/* Custom Triggers Panel */}
            <div className="mb-6 bg-[#12352A]/40 border border-[#FDFCF0]/5 p-4 rounded-xl">
              <h3 className="text-[10px] font-bold uppercase font-mono tracking-wider mb-3" style={{ color: activeBrand.accent }}>
                Active System Triggers
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeBrand.whatsappFlow.triggers.map((trigger) => (
                  <button
                    key={trigger}
                    onClick={() => handleSendChat(trigger)}
                    className="flex items-center gap-2 text-xs font-mono bg-[#081a15] hover:bg-[#C9A84C]/25 border border-[#FDFCF0]/10 hover:border-transparent text-[#FDFCF0] px-3.5 py-2 rounded-lg transition-all"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeBrand.accent }} />
                    {trigger}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="border border-[#FDFCF0]/10 rounded-2xl bg-[#091a15] overflow-hidden flex flex-col h-[28rem]">
            <div className="px-4 py-3 bg-[#12352A]/30 border-b border-[#FDFCF0]/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[#FDFCF0]/85">{activeBrand.name} Concierge</span>
              </div>
              <span className="text-[9px] font-mono text-[#FDFCF0]/45">Response Rate: 100%</span>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs flex flex-col justify-end">
              {whatsappLogs.map((log, index) => {
                const isUser = log.startsWith('User:');
                const isBot = log.startsWith('Bot:');
                
                let content = log;
                let bg = 'bg-[#12352A]/10 text-[#FDFCF0]/40 border border-[#FDFCF0]/5';
                let align = 'self-center text-center';

                if (isUser) {
                  content = log.replace('User: ', '');
                  bg = 'bg-[#12352A] text-[#FDFCF0] border border-[#FDFCF0]/15 max-w-[80%]';
                  align = 'self-end';
                } else if (isBot) {
                  content = log.replace('Bot: ', '');
                  bg = 'bg-[#091a15] text-[#FDFCF0] border border-[#FDFCF0]/10 max-w-[80%]';
                  align = 'self-start';
                }

                return (
                  <div key={index} className={`p-3 rounded-xl text-[10.5px] leading-relaxed ${bg} ${align}`}>
                    {content}
                  </div>
                );
              })}

              {isTyping && (
                <div className="p-2.5 rounded-xl bg-[#091a15] text-[#FDFCF0]/40 border border-[#FDFCF0]/10 max-w-[80%] self-start flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FDFCF0]/40 animate-bounce" />
                  <span className="h-1 w-1 rounded-full bg-[#FDFCF0]/40 animate-bounce delay-75" />
                  <span className="h-1 w-1 rounded-full bg-[#FDFCF0]/40 animate-bounce delay-150" />
                </div>
              )}
            </div>

            {/* Input sandbox */}
            <div className="p-3 border-t border-[#FDFCF0]/5 bg-[#12352A]/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Type in a trigger keyword..."
                className="flex-1 bg-[#081a15] border border-[#FDFCF0]/10 rounded-xl px-4 py-2.5 text-xs text-[#FDFCF0] focus:outline-none focus:border-[#C9A84C]/50 transition-all font-mono"
              />
              <button
                onClick={() => handleSendChat()}
                className="hover:bg-[#FDFCF0] text-[#12352A] px-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1 shrink-0"
                style={{ backgroundColor: activeBrand.accent }}
              >
                Send <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. POS Terminal & Floor Intelligence Map */}
        <section className="col-span-12 bg-[#12352A]/20 border border-[#FDFCF0]/5 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <span className="text-[9px] font-mono tracking-widest uppercase bg-[#C9A84C]/10 px-2 py-0.5 rounded-full" style={{ color: activeBrand.accent, backgroundColor: `${activeBrand.accent}15` }}>
                VENUE METRICS
              </span>
              <h2 className="text-xl font-bold font-display mt-2 flex items-center gap-2">
                Operational Terminal & Table Intelligence
              </h2>
              <p className="text-xs text-[#FDFCF0]/60 mt-1 max-w-xl">
                Simulated layouts representing dining booths, cafes, or delivery points updating dynamically.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#12352A]/40 border border-[#FDFCF0]/5 px-4 py-2.5 rounded-xl">
                <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Occupancy Rate</span>
                <span className="text-base font-bold font-mono text-[#FDFCF0]">{activeBrand.metrics.occupancy}</span>
              </div>
              <motion.div 
                animate={salesChanged ? { scale: 1.05, borderColor: activeBrand.accent } : { scale: 1, borderColor: 'rgba(253, 252, 240, 0.05)' }}
                transition={{ duration: 0.3 }}
                className={`bg-[#12352A]/40 border px-4 py-2.5 rounded-xl transition-all duration-300 ${salesChanged ? 'shadow-[0_0_20px_rgba(201,168,76,0.25)] bg-[#12352A]/60' : 'border-[#FDFCF0]/5'}`}
              >
                <span className="text-[9px] font-mono text-[#FDFCF0]/40 uppercase block">Gross Sales Realized</span>
                <span className="text-base font-bold font-mono transition-colors duration-300 font-bold" style={{ color: activeBrand.accent }}>
                  ₹{dynamicMetrics.sales.toLocaleString('en-IN')}
                </span>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table Floor map */}
            <div className="lg:col-span-8 bg-[#091a15] border border-[#FDFCF0]/10 rounded-2xl p-6">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#C9A84C] mb-4" style={{ color: activeBrand.accent }}>
                Active Table Map Layout
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tables.map((table) => {
                  let statusBg = 'bg-[#12352A]/40 text-[#FDFCF0]/40 border-[#FDFCF0]/5';
                  let statusLabel = 'Free';
                  
                  if (table.status === 'occupied') {
                    statusBg = 'bg-[#12352A] text-[#FDFCF0] border-emerald-500/40 border-2';
                    statusLabel = 'Occupied';
                  } else if (table.status === 'checkout') {
                    statusBg = 'bg-[#12352A] text-[#C9A84C] border-[#C9A84C]/50 border-2';
                    statusLabel = 'Checkout';
                  }

                  const isSelected = selectedTableId === table.id;
                  const isFlashing = flashingTableId === table.id;

                  return (
                    <motion.button
                      key={table.id}
                      onClick={() => setSelectedTableId(table.id)}
                      animate={isFlashing ? { 
                        scale: [1, 1.06, 1],
                        borderColor: ['rgba(253, 252, 240, 0.05)', activeBrand.accent, 'rgba(253, 252, 240, 0.05)'],
                        backgroundColor: ['rgba(18, 53, 42, 0.4)', `${activeBrand.accent}20`, 'rgba(18, 53, 42, 0.4)']
                      } : {}}
                      transition={isFlashing ? { duration: 1.5, repeat: 1 } : {}}
                      className={`p-4 rounded-xl text-left transition-all duration-300 relative ${statusBg} ${
                        isSelected ? 'ring-2 scale-[1.02]' : 'hover:scale-[1.01]'
                      }`}
                      style={{ '--tw-ring-color': isSelected ? activeBrand.accent : 'transparent' } as React.CSSProperties}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs font-bold">{table.label}</span>
                        <span className="text-[9px] font-mono text-[#FDFCF0]/40">Cap: {table.size}</span>
                      </div>
                      
                      <div className="text-[9px] font-mono uppercase tracking-wider mt-4">
                        Status: <span className={table.status === 'free' ? 'text-gray-500' : table.status === 'occupied' ? 'text-emerald-400' : 'text-[#C9A84C]'}>{statusLabel}</span>
                      </div>

                      {table.status !== 'free' && (
                        <div className="text-xs font-bold font-mono mt-1 text-[#FDFCF0]">
                          ₹{table.bill.toLocaleString('en-IN')}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bill / Orders Feed Drawer */}
            <div className="lg:col-span-4 bg-[#12352A]/30 border border-[#FDFCF0]/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#C9A84C] mb-4 flex items-center justify-between" style={{ color: activeBrand.accent }}>
                  <span>Table Inspect Info</span>
                  <span className="text-[9px] bg-[#C9A84C]/10 text-[#C9A84C] px-2 py-0.5 rounded-full font-mono font-normal">
                    {selectedTable?.label || 'None Selected'}
                  </span>
                </h3>

                {selectedTable && selectedTable.status !== 'free' ? (
                  <div className="space-y-4">
                    <div className="bg-[#081a15] p-3 rounded-lg border border-[#FDFCF0]/5">
                      <span className="text-[10px] font-mono text-[#FDFCF0]/40 uppercase">Table Total Balance</span>
                      <div className="text-xl font-bold font-mono text-[#C9A84C] mt-0.5" style={{ color: activeBrand.accent }}>
                        ₹{selectedTable.bill.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#FDFCF0]/40 uppercase block mb-2">Ordered Dishes</span>
                      <ul className="space-y-2">
                        {selectedTable.items.map((item: string, i: number) => (
                          <li key={i} className="text-xs font-mono flex items-center gap-2 text-[#FDFCF0]/90">
                            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: activeBrand.accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#FDFCF0]/40 font-mono text-xs">
                    This table is currently vacant.
                  </div>
                )}
              </div>

              {selectedTable && selectedTable.status !== 'free' && (
                <button
                  onClick={() => {
                    const newTables = tables.map(t => {
                      if (t.id === selectedTable.id) {
                        return { ...t, status: 'free' as const, bill: 0, items: [] };
                      }
                      return t;
                    });
                    setTables(newTables);
                    setSelectedTableId(null);
                    addToast({
                      type: 'SYSTEM',
                      message: `Successfully closed bill and released Table ${selectedTable.label}`,
                    });
                  }}
                  className="w-full bg-[#12352A] hover:bg-[#C9A84C] hover:text-[#12352A] border rounded-xl py-3.5 text-xs font-mono font-bold transition-all mt-6"
                  style={{ borderColor: `${activeBrand.accent}30`, color: activeBrand.accent }}
                >
                  Close Bill & Release Table
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Luxury Toasts Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toast.type === 'POS_ORDER' ? Receipt 
              : toast.type === 'WHATSAPP_LOG' ? MessageSquare 
              : toast.type === 'AD_IMPRESSION' ? MousePointerClick 
              : Radio;

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="bg-[#0A2119]/95 backdrop-blur-md border border-[#C9A84C]/25 p-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex gap-3 text-xs pointer-events-auto select-none"
                style={{ borderColor: `${activeBrand.accent}35` }}
              >
                <div className="h-7 w-7 rounded-lg bg-[#12352A] border border-[#C9A84C]/25 flex items-center justify-center shrink-0" style={{ borderColor: `${activeBrand.accent}20` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: activeBrand.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1 gap-4">
                    <span className={`text-[8px] font-mono tracking-widest uppercase font-bold px-1.5 py-0.5 rounded ${
                      toast.type === 'POS_ORDER' ? 'bg-amber-500/10 text-amber-400' :
                      toast.type === 'WHATSAPP_LOG' ? 'bg-emerald-500/10 text-emerald-400' :
                      toast.type === 'AD_IMPRESSION' ? 'bg-sky-500/10 text-sky-400' :
                      'bg-purple-500/10 text-[#C9A84C]'
                    }`}>
                      {toast.type}
                    </span>
                    <span className="text-[7.5px] font-mono text-[#FDFCF0]/30">{toast.timestamp}</span>
                  </div>
                  <p className="text-[#FDFCF0]/90 leading-relaxed font-mono text-[10px] break-words">{toast.message}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
