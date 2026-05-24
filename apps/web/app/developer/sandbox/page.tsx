'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Terminal, 
  Sparkles, 
  Receipt, 
  MessageSquare, 
  MousePointerClick, 
  Radio, 
  Database,
  Trash2,
  Cpu
} from 'lucide-react';
import { trpc } from '../../utils/trpc';
import { getApiUrl } from '../../utils/apiConfig';

interface StreamLog {
  id: string;
  type: string;
  timestamp: string;
  message: string;
  payload: any;
}

export default function DeveloperSandbox() {
  // Trigger States
  const [posTable, setPosTable] = useState<number>(4);
  const [posAmount, setPosAmount] = useState<number>(2450);
  const [posItems, setPosItems] = useState<number>(3);

  const [waName, setWaName] = useState<string>('Rahul Sharma');
  const [waText, setWaText] = useState<string>('Hi, can I book a table for 4 tonight at 8 PM?');
  const [waIntent, setWaIntent] = useState<string>('Table Reservation');

  const [adPlatform, setAdPlatform] = useState<'Instagram Reels' | 'Facebook Feed' | 'Local Maps'>('Instagram Reels');
  const [adBudget, setAdBudget] = useState<number>(350);

  // SSE Logger States
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [sseConnected, setSseConnected] = useState<boolean>(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // tRPC Mutations
  const posMutation = trpc.simulatePOSOrder.useMutation();
  const waMutation = trpc.simulateWhatsAppMessage.useMutation();
  const adMutation = trpc.simulateAdImpression.useMutation();

  // Listen to SSE live stream
  useEffect(() => {
    // Connect to Express backend SSE endpoint
    const eventSource = new EventSource(`${getApiUrl()}/api/events`);

    eventSource.onopen = () => {
      setSseConnected(true);
      addLog({
        type: 'SYSTEM',
        message: `Established connection to SSE live event stream (${getApiUrl()}/api/events)`,
        payload: { status: 'CONNECTED', transport: 'HTTP/event-stream' }
      });
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      setSseConnected(false);
      addLog({
        type: 'ERROR',
        message: 'Lost connection to SSE stream. Attempting reconnection...',
        payload: { error: 'DISCONNECTED', retry: true }
      });
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'CONNECTED') return; // Ignore initial heartbeat in visual log list

        addLog({
          type: data.type,
          message: data.message || 'Incoming transaction event detected.',
          payload: data
        });
      } catch (err) {
        console.error('Failed to parse SSE payload:', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Auto-scroll logs terminal
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
    ].slice(-40)); // Cap at last 40 logs
  };

  const handlePOSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    posMutation.mutate({
      tableId: posTable,
      amount: posAmount,
      itemsCount: posItems
    });
  };

  const handleWASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    waMutation.mutate({
      senderName: waName,
      messageText: waText,
      intent: waIntent
    });
  };

  const handleAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    adMutation.mutate({
      platform: adPlatform,
      budget: adBudget
    });
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-[#12352A] text-[#FDFCF0] font-body relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A2119]">
      {/* Background grain */}
      <div className="grain" aria-hidden="true" />

      {/* Decorative ambient vector grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Premium Header */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center border-b border-[#C9A84C]/10 bg-[#12352A]/80 backdrop-blur-md">
        <Link href="/dashboard" className="flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Launch Active Dashboard</span>
        </Link>
        <div className="flex flex-col text-center">
          <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#FDFCF0]">
            MAVEN DEV CORE
          </span>
          <span className="text-[8px] font-mono tracking-[0.25em] text-[#8FAF95] uppercase leading-none">
            INTEGRATED SANDBOX
          </span>
        </div>
        
        {/* Dynamic SSE Connection Pill */}
        <div className="flex items-center gap-2 border border-[#C9A84C]/10 bg-[#0A2119]/50 px-3.5 py-1.5 rounded-full">
          <span className={`w-1.5 h-1.5 rounded-full ${sseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-[9px] font-mono tracking-wider uppercase text-[#8FAF95]">
            {sseConnected ? 'SSE Live Stream Active' : 'SSE Offline'}
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Triggers (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C9A84C] uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>tRPC Server Controller</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FDFCF0] tracking-tight">
              Webhook & Database Mutation Simulator
            </h1>
            <p className="text-xs text-[#8FAF95] max-w-2xl leading-relaxed">
              Press buttons below to trigger simulated operational updates. These represent hardware POS checkouts, incoming customer conversations via the WhatsApp API, or real-time Meta Ad conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Controller 1: POS Order */}
            <div className="bg-[#0A2119]/50 border border-[#C9A84C]/15 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#C9A84C]/10 pb-3">
                <Receipt className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate POS Order</h3>
              </div>
              <form onSubmit={handlePOSSubmit} className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#8FAF95]">Table ID</span>
                  <select 
                    value={posTable}
                    onChange={(e) => setPosTable(Number(e.target.value))}
                    className="bg-[#12352A] border border-[#C9A84C]/15 rounded-md px-2.5 py-1 text-[#FDFCF0] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>Table {n}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[#8FAF95]">
                    <span>Billing Amount</span>
                    <span className="font-bold text-[#C9A84C]">₹{posAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range"
                    min="450"
                    max="12500"
                    step="50"
                    value={posAmount}
                    onChange={(e) => setPosAmount(Number(e.target.value))}
                    className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[#8FAF95]">
                    <span>Items Count</span>
                    <span className="font-bold text-[#C9A84C]">{posItems} dishes</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={posItems}
                    onChange={(e) => setPosItems(Number(e.target.value))}
                    className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={posMutation.isLoading}
                  className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] font-mono text-[9px] font-bold uppercase tracking-widest py-2.5 rounded-lg transition-all"
                >
                  {posMutation.isLoading ? 'Dispatching...' : 'Emit POS Checkout'}
                </button>
              </form>
            </div>

            {/* Controller 2: WhatsApp Messages */}
            <div className="bg-[#0A2119]/50 border border-[#C9A84C]/15 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#C9A84C]/10 pb-3">
                <MessageSquare className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate WhatsApp</h3>
              </div>
              <form onSubmit={handleWASubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-[#8FAF95] block">Sender Name</label>
                  <input 
                    type="text"
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    className="w-full bg-[#12352A] border border-[#C9A84C]/15 rounded-md px-3 py-1.5 text-[#FDFCF0] focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[#8FAF95] block">Message Text</label>
                  <textarea 
                    rows={2}
                    value={waText}
                    onChange={(e) => setWaText(e.target.value)}
                    className="w-full bg-[#12352A] border border-[#C9A84C]/15 rounded-md px-3 py-1.5 text-[#FDFCF0] focus:outline-none text-[11px] resize-none"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8FAF95]">Intent Target</span>
                  <select 
                    value={waIntent}
                    onChange={(e) => setWaIntent(e.target.value)}
                    className="bg-[#12352A] border border-[#C9A84C]/15 rounded-md px-2.5 py-1 text-[#FDFCF0] focus:outline-none text-[11px]"
                  >
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Menu Inquiry">Menu Inquiry</option>
                    <option value="DND Opt-Out">DND Opt-Out</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={waMutation.isLoading}
                  className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] font-mono text-[9px] font-bold uppercase tracking-widest py-2.5 rounded-lg transition-all"
                >
                  {waMutation.isLoading ? 'Injecting...' : 'Inject WhatsApp Msg'}
                </button>
              </form>
            </div>

            {/* Controller 3: Meta Ad Conversion */}
            <div className="bg-[#0A2119]/50 border border-[#C9A84C]/15 p-6 rounded-2xl space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 border-b border-[#C9A84C]/10 pb-3">
                <MousePointerClick className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#FDFCF0]">Simulate Meta Ad Impression</h3>
              </div>
              <form onSubmit={handleAdSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs">
                <div className="space-y-1">
                  <label className="text-[#8FAF95] block">Target Placement</label>
                  <select 
                    value={adPlatform}
                    onChange={(e) => setAdPlatform(e.target.value as any)}
                    className="w-full bg-[#12352A] border border-[#C9A84C]/15 rounded-md px-3 py-2 text-[#FDFCF0] focus:outline-none"
                  >
                    <option value="Instagram Reels">Instagram Reels</option>
                    <option value="Facebook Feed">Facebook Feed</option>
                    <option value="Local Maps">Local Maps</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[#8FAF95]">
                    <span>Allocated Spend</span>
                    <span className="font-bold text-[#C9A84C]">₹{adBudget}</span>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={adBudget}
                    onChange={(e) => setAdBudget(Number(e.target.value))}
                    className="w-full h-1 bg-[#12352A] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={adMutation.isLoading}
                  className="w-full bg-[#C9A84C] hover:bg-[#FDFCF0] text-[#0A2119] font-mono text-[9px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
                >
                  {adMutation.isLoading ? 'Emitting...' : 'Trigger Ad Impression'}
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Right Column: Real-Time SSE Terminal (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col h-[600px] border border-[#C9A84C]/20 bg-[#0A2119] rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Header Console */}
          <div className="bg-[#12352A] border-b border-[#C9A84C]/15 px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-[10px] font-mono tracking-widest text-[#FDFCF0] uppercase font-bold">SSE Terminal Logger</span>
            </div>
            
            {/* Actions */}
            <button 
              onClick={clearConsole}
              className="text-[9px] font-mono text-[#8FAF95] hover:text-[#C9A84C] flex items-center gap-1 focus:outline-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Console Output Terminal */}
          <div className="flex-1 p-5 font-mono text-[10px] overflow-y-auto space-y-4 bg-black/30">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#8FAF95]/40 text-center gap-2">
                <Radio className="w-8 h-8 stroke-[1] animate-pulse" />
                <span>Awaiting live Server-Sent Events...<br />Use the controls on the left to inject mutations.</span>
              </div>
            ) : (
              <div className="space-y-3.5">
                {logs.map((log) => (
                  <div key={log.id} className="border-b border-[#C9A84C]/5 pb-2.5">
                    {/* Meta row */}
                    <div className="flex justify-between items-center text-[9px] mb-1">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        log.type === 'POS_ORDER' ? 'bg-amber-400/10 text-amber-400' :
                        log.type === 'WHATSAPP_LOG' ? 'bg-emerald-400/10 text-emerald-400' :
                        log.type === 'AD_IMPRESSION' ? 'bg-sky-400/10 text-sky-400' :
                        log.type === 'ERROR' ? 'bg-red-400/10 text-red-400' :
                        'bg-purple-400/10 text-purple-400'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-[#8FAF95]/50">{log.timestamp}</span>
                    </div>

                    {/* Msg */}
                    <p className="text-[#FDFCF0]/95 leading-normal mb-2">{log.message}</p>

                    {/* Collapsible raw payload code snippet */}
                    <pre className="bg-[#12352A]/40 border border-[#C9A84C]/10 p-2.5 rounded-lg text-[#8FAF95]/80 overflow-x-auto text-[8px] leading-tight">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            )}
          </div>

          {/* Secure Lock Badge footer */}
          <div className="bg-[#12352A] border-t border-[#C9A84C]/15 py-3 px-5 flex items-center justify-between text-[#8FAF95]/50 text-[8px] font-mono">
            <span className="flex items-center gap-1"><Database className="w-3 h-3 text-[#C9A84C]" /> SQLITE dev.db synced</span>
            <span>PROT: text/event-stream</span>
          </div>

        </div>

      </main>

      {/* Styled Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-8 text-center text-xs font-mono text-[#8FAF95]/50 relative z-10 max-w-7xl mx-auto">
        <p>© 2026 Maven Core Systems | Sandbox Environment.</p>
      </footer>
    </div>
  );
}
