'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Globe, 
  Database, 
  MessageSquare, 
  Settings, 
  Zap, 
  Check, 
  RefreshCw, 
  Play, 
  ArrowRight,
  Code,
  Activity
} from 'lucide-react';

interface SystemsConsoleProps {
  onPrefillInquiry: (note: string) => void;
}

type TabType = 'api' | 'db' | 'router' | 'telemetry';

export default function SystemsConsole({ onPrefillInquiry }: SystemsConsoleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('api');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Initializing Maven Monorepo Core [v8.4.1]...',
    'Loading type-safe packages (@maven/types, @maven/api)...',
    'Edge networks active across 14 zones.',
    'System status: healthy.'
  ]);

  // Tab 1: API Explorer States
  const [activeEndpoint, setActiveEndpoint] = useState<string>('query.getSystemStatus');
  const [apiResponse, setApiResponse] = useState<any>({
    status: "healthy",
    latency: "14ms",
    environment: "production",
    services: {
      api: "online",
      database: "online",
      whatsappRouter: "online",
      posGateway: "online"
    }
  });

  // Tab 2: DB Schema States
  const [migrationStep, setMigrationStep] = useState<'idle' | 'running' | 'completed'>('idle');
  const [dbMetrics, setDbMetrics] = useState({
    activeConnections: 42,
    poolSize: 50,
    latency: '4.8ms',
    cacheHitRate: '99.4%'
  });

  // Tab 3: WhatsApp Router States
  const [routingStep, setRoutingStep] = useState<'idle' | 'webhook' | 'nlp' | 'queue' | 'dispatched'>('idle');
  const [whatsAppLogs, setWhatsAppLogs] = useState<Array<{ sender: string; text: string; action: string; status: string }>>([
    { sender: '+91 98300 XXXXX', text: '"Book a premium slot for Amber Pavilion tonight at 8"', action: 'Parsing NLP Intent...', status: 'incoming' },
    { sender: 'System Router', text: 'Reservation verified in Postgres.', action: 'Injected POS seat buffer.', status: 'processing' },
    { sender: 'Meta Gateway', text: 'WhatsApp Confirmation template sent.', action: 'Campaign logged in CRM.', status: 'sent' }
  ]);

  // Tab 4: Telemetry States
  const [cpuUsage, setCpuUsage] = useState<number>(18);
  const [memUsage, setMemUsage] = useState<number>(34);

  // Telemetry fluctuation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const diff = Math.floor(Math.random() * 8) - 4;
        return Math.min(Math.max(prev + diff, 8), 45);
      });
      setMemUsage(prev => {
        const diff = Math.floor(Math.random() * 4) - 2;
        return Math.min(Math.max(prev + diff, 30), 40);
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const addConsoleLog = (msg: string) => {
    setConsoleLogs(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Run Simulated tRPC Endpoint
  const handleExecuteApi = () => {
    setIsSyncing(true);
    addConsoleLog(`Executing tRPC: trpc.${activeEndpoint}.useQuery()...`);
    
    setTimeout(() => {
      setIsSyncing(false);
      if (activeEndpoint === 'query.getSystemStatus') {
        setApiResponse({
          status: "healthy",
          latency: `${Math.floor(Math.random() * 15) + 8}ms`,
          environment: "production",
          services: { api: "online", database: "online", whatsappRouter: "online" }
        });
        addConsoleLog('tRPC Query success. Cache hit in edge edge-cache-04.');
      } else if (activeEndpoint === 'mutation.provisionBrandEnvironment') {
        setApiResponse({
          status: "provisioned",
          brandId: "maven-brand-prod-409",
          allocatedNodes: ["edge-in-east", "edge-in-south"],
          timestamp: new Date().toISOString(),
          databaseSchema: "v4.2.1-migration-ok"
        });
        addConsoleLog('tRPC Mutation execution completed. Deployed 2 Edge pods.');
      } else if (activeEndpoint === 'query.getWhatsAppCampaignPerformance') {
        setApiResponse({
          campaignId: "meta-wa-camp-901",
          activeSessions: 242,
          deliverySuccess: "99.82%",
          conversionRate: "18.4%",
          leadsLoggedDaily: 89
        });
        addConsoleLog('tRPC Query success. Retrieved session cache.');
      }
    }, 800);
  };

  // Run DB Migration Simulation
  const handleRunMigration = () => {
    if (migrationStep !== 'idle') return;
    setMigrationStep('running');
    addConsoleLog('Starting db migration: prisma migrate deploy...');
    
    setTimeout(() => {
      addConsoleLog('Schema sync: Applying differential schema structures...');
    }, 1000);

    setTimeout(() => {
      setMigrationStep('completed');
      setDbMetrics(prev => ({
        ...prev,
        latency: '3.1ms',
        cacheHitRate: '99.8%'
      }));
      addConsoleLog('DB migration completed successfully. Prisma Client re-generated.');
    }, 2800);
  };

  const handleResetMigration = () => {
    setMigrationStep('idle');
    setDbMetrics({
      activeConnections: 42,
      poolSize: 50,
      latency: '4.8ms',
      cacheHitRate: '99.4%'
    });
    addConsoleLog('Prisma db connection schema refreshed.');
  };

  // Run Simulated WhatsApp webhook
  const handleSimulateWebhook = () => {
    if (routingStep !== 'idle') return;
    setRoutingStep('webhook');
    addConsoleLog('Receiving webhook callback from Meta WhatsApp API...');

    setTimeout(() => {
      setRoutingStep('nlp');
      addConsoleLog('Parsing incoming content: router.detectIntent(text)...');
    }, 1200);

    setTimeout(() => {
      setRoutingStep('queue');
      addConsoleLog('Intent matched: "booking_inquiry". Enqueuing task to queue-worker-2...');
    }, 2400);

    setTimeout(() => {
      setRoutingStep('dispatched');
      addConsoleLog('Queue worker completed: Database updated, message template sent.');
      setWhatsAppLogs(prev => [
        { 
          sender: `+91 90070 ${Math.floor(Math.random()*90000)+10000}`, 
          text: '"Enquire regarding customized retail automation system"', 
          action: 'Parsed Custom inquiry intent.', 
          status: 'success' 
        },
        ...prev
      ]);
    }, 3800);
  };

  const handleResetRouter = () => {
    setRoutingStep('idle');
    addConsoleLog('Meta webhook router queue purged.');
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(28,74,56,0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            Interactive Systems Studio Simulator
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            The Maven Engineering Suite Console
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Our team builds state-of-the-art type-safe infrastructures. Select a terminal panel below to interact with our live APIs, Prisma database pools, and high-performance Meta messaging webhook routes.
          </p>
        </div>

        <button 
          onClick={() => {
            handleResetMigration();
            handleResetRouter();
            setConsoleLogs([
              'Purging cache buffers...',
              'Re-indexing local monorepo...',
              'Connection re-established with 14 edge networks.',
              'Console status: online.'
            ]);
          }}
          className="flex items-center gap-2 border border-maven-cream/10 bg-maven-green-dark/40 hover:border-maven-gold/30 text-maven-muted hover:text-maven-gold px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-mono focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refactor & Refresh Logs
        </button>
      </div>

      {/* Terminal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Navigation Panels */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold px-2">Console Subsystems</span>
          
          <button 
            onClick={() => setActiveTab('api')}
            className={`flex items-center justify-between text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
              activeTab === 'api' 
                ? 'bg-maven-green-dark border-maven-gold/50 shadow-md text-maven-cream' 
                : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
            }`}
          >
            <div className="flex items-center gap-3">
              <Code className="w-4.5 h-4.5 text-maven-gold" />
              <div>
                <span className="block text-xs font-semibold uppercase font-mono">tRPC API Protocol</span>
                <span className="block text-[10px] text-maven-muted/80 mt-0.5">Type-safe RPC endpoints</span>
              </div>
            </div>
            <Zap className={`w-3.5 h-3.5 ${activeTab === 'api' ? 'text-maven-gold' : 'text-maven-muted/30'}`} />
          </button>

          <button 
            onClick={() => setActiveTab('db')}
            className={`flex items-center justify-between text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
              activeTab === 'db' 
                ? 'bg-maven-green-dark border-maven-gold/50 shadow-md text-maven-cream' 
                : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
            }`}
          >
            <div className="flex items-center gap-3">
              <Database className="w-4.5 h-4.5 text-maven-gold" />
              <div>
                <span className="block text-xs font-semibold uppercase font-mono">Prisma DB Telemetry</span>
                <span className="block text-[10px] text-maven-muted/80 mt-0.5">Postgres pool optimization</span>
              </div>
            </div>
            <Layers className={`w-3.5 h-3.5 ${activeTab === 'db' ? 'text-maven-gold' : 'text-maven-muted/30'}`} />
          </button>

          <button 
            onClick={() => setActiveTab('router')}
            className={`flex items-center justify-between text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
              activeTab === 'router' 
                ? 'bg-maven-green-dark border-maven-gold/50 shadow-md text-maven-cream' 
                : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4.5 h-4.5 text-maven-gold" />
              <div>
                <span className="block text-xs font-semibold uppercase font-mono">Meta API Router</span>
                <span className="block text-[10px] text-maven-muted/80 mt-0.5">Real-time webhook pipelines</span>
              </div>
            </div>
            <Globe className={`w-3.5 h-3.5 ${activeTab === 'router' ? 'text-maven-gold' : 'text-maven-muted/30'}`} />
          </button>

          <button 
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center justify-between text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
              activeTab === 'telemetry' 
                ? 'bg-maven-green-dark border-maven-gold/50 shadow-md text-maven-cream' 
                : 'bg-maven-green-light/5 border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu className="w-4.5 h-4.5 text-maven-gold" />
              <div>
                <span className="block text-xs font-semibold uppercase font-mono">Cluster Engine Logs</span>
                <span className="block text-[10px] text-maven-muted/80 mt-0.5">Virtual hardware monitoring</span>
              </div>
            </div>
            <Activity className={`w-3.5 h-3.5 ${activeTab === 'telemetry' ? 'text-maven-gold' : 'text-maven-muted/30'}`} />
          </button>

          {/* System Terminal Console Output Logger */}
          <div className="mt-4 bg-maven-green-dark/80 rounded-2xl p-4 border border-maven-cream/5 font-mono text-[10px] space-y-2">
            <span className="block text-[9px] text-maven-gold uppercase tracking-widest font-bold">Local Monorepo Output Feed</span>
            <div className="h-28 overflow-y-auto space-y-1 text-maven-muted">
              {consoleLogs.map((log, index) => (
                <div key={index} className="truncate select-none">{log}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Active Sandbox Terminal Screen */}
        <div className="lg:col-span-8 bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-6 shadow-inner min-h-[480px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-4 right-6 flex items-center gap-2 border border-maven-cream/10 bg-maven-green-light/20 px-3 py-1 rounded-full pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-mono tracking-widest text-maven-muted uppercase">SANDBOX ENGINE OK</span>
          </div>

          <AnimatePresence mode="wait">
            {/* Panel 1: tRPC API Explorer */}
            {activeTab === 'api' && (
              <motion.div 
                key="api-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-maven-cream/5 pb-2">
                    <span className="text-xs font-mono tracking-wider text-maven-gold">API EXPLORER</span>
                    <span className="text-[10px] text-maven-muted">| Querying type-safe endpoint schemas</span>
                  </div>

                  {/* Selector of Endpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      'query.getSystemStatus',
                      'mutation.provisionBrandEnvironment',
                      'query.getWhatsAppCampaignPerformance'
                    ].map(endpoint => (
                      <button 
                        key={endpoint}
                        onClick={() => {
                          setActiveEndpoint(endpoint);
                          addConsoleLog(`Active endpoint switched to: ${endpoint}`);
                        }}
                        className={`text-[9px] font-mono py-2.5 px-3 rounded-lg border text-center truncate focus:outline-none transition-all duration-300 ${
                          activeEndpoint === endpoint 
                            ? 'border-maven-gold text-maven-gold bg-maven-gold/5 font-bold' 
                            : 'border-maven-cream/5 text-maven-muted hover:border-maven-gold/30 hover:text-maven-cream bg-maven-green-light/5'
                        }`}
                      >
                        {endpoint}
                      </button>
                    ))}
                  </div>

                  {/* API Command Preview */}
                  <div className="bg-maven-green-dark border border-maven-cream/5 rounded-xl p-4 font-mono text-xs text-maven-cream/90 flex justify-between items-center relative overflow-hidden">
                    <div className="flex gap-2.5 items-center">
                      <span className="text-maven-muted text-[10px]">EXECUTE:</span>
                      <span className="text-emerald-400">const</span>
                      <span>res = await trpc.{activeEndpoint}.useQuery()</span>
                    </div>

                    <button 
                      onClick={handleExecuteApi}
                      disabled={isSyncing}
                      className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono font-bold uppercase tracking-wider text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md focus:outline-none shrink-0"
                    >
                      {isSyncing ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-maven-green-dark" />
                          RUN
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* API Output JSON */}
                <div className="mt-4 bg-maven-green-light/5 border border-maven-cream/10 rounded-xl p-5 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-maven-cream/5 pb-2 mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">Query Response Logs</span>
                    <span className="text-[9px] font-mono text-maven-gold font-bold">Type Checked</span>
                  </div>
                  <pre className="font-mono text-[11px] text-maven-cream/80 overflow-auto max-h-[160px] leading-relaxed select-text p-2 bg-maven-green-dark/40 rounded-lg">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                  <span className="text-[9px] text-maven-muted font-mono mt-3 text-center">
                    Note: Complete payload validated against packages/types in monorepo compilation.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Panel 2: Prisma Database Telemetry */}
            {activeTab === 'db' && (
              <motion.div 
                key="db-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-maven-cream/5 pb-2">
                    <span className="text-xs font-mono tracking-wider text-maven-gold">PRISMA POSTGRES METRICS</span>
                    <span className="text-[10px] text-maven-muted">| Deep DB schema pools and live migrations</span>
                  </div>

                  {/* DB Stats Bento grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-maven-muted uppercase">Active Connections</span>
                      <span className="block text-lg font-mono text-maven-cream font-bold mt-1">{dbMetrics.activeConnections}<span className="text-[10px] text-maven-muted">/50</span></span>
                    </div>

                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-maven-muted uppercase">Pool Allocation</span>
                      <span className="block text-lg font-mono text-maven-cream font-bold mt-1">{(dbMetrics.activeConnections/dbMetrics.poolSize*100).toFixed(0)}%</span>
                    </div>

                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-maven-muted uppercase">Read Latency</span>
                      <motion.span 
                        animate={{ color: migrationStep === 'completed' ? '#C9A84C' : '#FDFCF0' }}
                        className="block text-lg font-mono text-maven-cream font-bold mt-1"
                      >
                        {dbMetrics.latency}
                      </motion.span>
                    </div>

                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-maven-muted uppercase">Cache Hit Rate</span>
                      <motion.span 
                        animate={{ color: migrationStep === 'completed' ? '#10B981' : '#FDFCF0' }}
                        className="block text-lg font-mono text-maven-cream font-bold mt-1"
                      >
                        {dbMetrics.cacheHitRate}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Simulated Migration Interface */}
                <div className="bg-maven-green-light/5 border border-maven-cream/10 rounded-xl p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-center border-b border-maven-cream/5 pb-2">
                    <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">Prisma Migrate console</span>
                    {migrationStep === 'running' && (
                      <span className="text-[9px] font-mono text-maven-gold font-bold animate-pulse">DEPLOYING CONCURRENT DDL</span>
                    )}
                    {migrationStep === 'completed' && (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> SCHEMA SYNCED
                      </span>
                    )}
                    {migrationStep === 'idle' && (
                      <span className="text-[9px] font-mono text-maven-muted font-bold">READY</span>
                    )}
                  </div>

                  <div className="border border-maven-cream/10 bg-maven-green-dark/45 p-4 rounded-xl font-mono text-xs flex flex-col justify-center gap-4 text-left">
                    <div className="space-y-1">
                      <span className="text-maven-muted text-[9px] block uppercase">Next Database Migration task:</span>
                      <span className="text-maven-cream font-semibold">"202605240240_create_leads_analytics_index"</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleRunMigration}
                        disabled={migrationStep !== 'idle'}
                        className={`font-mono text-[10px] uppercase tracking-wider font-bold py-3 px-5 rounded-lg shadow-md transition-all focus:outline-none ${
                          migrationStep === 'idle' 
                            ? 'bg-maven-gold hover:bg-maven-cream text-maven-green-dark' 
                            : 'bg-maven-green-light/30 text-maven-muted cursor-not-allowed border border-maven-cream/10'
                        }`}
                      >
                        {migrationStep === 'idle' && 'Deploy Schema Migration'}
                        {migrationStep === 'running' && 'Executing Prisma Migrate...'}
                        {migrationStep === 'completed' && 'Migration Completed Successfully'}
                      </button>
                      
                      {migrationStep !== 'idle' && (
                        <button 
                          onClick={handleResetMigration}
                          className="font-mono text-[9px] uppercase hover:text-maven-gold text-maven-muted py-2.5 px-3 focus:outline-none"
                        >
                          Reset Pool
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <span className="text-[9px] text-maven-muted font-mono leading-relaxed text-center">
                    Note: High-speed connection pools automatically balance traffic spikes without manual configuration updates.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Panel 3: WhatsApp webhook router */}
            {activeTab === 'router' && (
              <motion.div 
                key="router-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-maven-cream/5 pb-2">
                    <span className="text-xs font-mono tracking-wider text-maven-gold">META MESSAGING BOT ROUTER</span>
                    <span className="text-[10px] text-maven-muted">| Active API webhook filters and intent routing</span>
                  </div>

                  {/* Webhook trigger test block */}
                  <div className="bg-maven-green-light/10 border border-maven-gold/25 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="block text-[8px] font-mono text-maven-gold uppercase font-bold">API Webhook Simulator</span>
                      <p className="text-[11px] text-maven-cream mt-1 font-semibold">Simulate client texting Maven Meta WhatsApp Gateway</p>
                    </div>

                    <button 
                      onClick={handleSimulateWebhook}
                      disabled={routingStep !== 'idle'}
                      className={`font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-md transition-all focus:outline-none ${
                        routingStep === 'idle' 
                          ? 'bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-extrabold' 
                          : 'bg-maven-green-light/40 text-maven-muted cursor-not-allowed border border-maven-cream/10'
                      }`}
                    >
                      {routingStep === 'idle' && 'Simulate Meta Text Webhook'}
                      {routingStep === 'webhook' && 'Webhook callback received...'}
                      {routingStep === 'nlp' && 'Parsing intent via NLP...'}
                      {routingStep === 'queue' && 'Intent routed. Synced to Queue.'}
                      {routingStep === 'dispatched' && 'Success. Dispatch completed.'}
                    </button>
                  </div>
                </div>

                {/* Active logs monitor */}
                <div className="bg-maven-green-light/5 border border-maven-cream/10 rounded-xl p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-center border-b border-maven-cream/5 pb-2">
                    <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">META API STREAM LOGS</span>
                    <span className="text-[9px] font-mono text-maven-gold font-bold">Live Synced</span>
                  </div>

                  <div className="space-y-2 overflow-y-auto max-h-[140px] text-[10px] font-mono">
                    {whatsAppLogs.map((log, index) => (
                      <div key={index} className="flex justify-between items-start py-1.5 border-b border-maven-cream/5 gap-4">
                        <span className="text-maven-cream font-bold shrink-0">{log.sender}</span>
                        <span className="text-maven-muted truncate text-left flex-1">{log.text}</span>
                        <span className="text-maven-gold font-bold shrink-0">{log.action}</span>
                        <span className={`shrink-0 uppercase font-extrabold text-[8px] py-0.5 px-1.5 rounded ${
                          log.status === 'incoming' ? 'bg-blue-500/10 text-blue-400' :
                          log.status === 'processing' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>{log.status}</span>
                      </div>
                    ))}
                  </div>

                  <span className="text-[9px] text-maven-muted font-mono leading-relaxed text-center">
                    Note: Meta webhooks are buffered instantly using Redis pipelines ensuring no message is ever lost.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Panel 4: Telemetry hardware engine */}
            {activeTab === 'telemetry' && (
              <motion.div 
                key="telemetry-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-maven-cream/5 pb-2">
                    <span className="text-xs font-mono tracking-wider text-maven-gold">EDGE CLUSTER COMPUTE ENGINES</span>
                    <span className="text-[10px] text-maven-muted">| Hardware allocation and real-time server telemetry</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {/* CPU Usage progress */}
                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-5 rounded-2xl space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-maven-muted uppercase">ACTIVE EDGE POD CPU</span>
                        <span className="text-lg font-mono text-maven-gold font-bold">{cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-maven-green-dark h-2.5 rounded-full overflow-hidden border border-maven-cream/5">
                        <motion.div 
                          className="bg-maven-gold h-full"
                          animate={{ width: `${cpuUsage}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="block text-[8px] font-mono text-maven-muted/70 leading-normal">
                        Active CPU cluster balanced across edge instances in East and South nodes.
                      </span>
                    </div>

                    {/* MEM Usage progress */}
                    <div className="bg-maven-green-light/10 border border-maven-cream/5 p-5 rounded-2xl space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-maven-muted uppercase">MEMORY FOOTPRINT ALLOCATION</span>
                        <span className="text-lg font-mono text-maven-cream font-bold">{memUsage}%</span>
                      </div>
                      <div className="w-full bg-maven-green-dark h-2.5 rounded-full overflow-hidden border border-maven-cream/5">
                        <motion.div 
                          className="bg-maven-cream h-full"
                          animate={{ width: `${memUsage}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="block text-[8px] font-mono text-maven-muted/70 leading-normal">
                        Redis instance buffering and in-memory caches currently allocated.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Telemetry charts summary */}
                <div className="bg-maven-green-light/5 border border-maven-cream/10 rounded-xl p-5 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-maven-cream/5 pb-2 mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-maven-muted uppercase">Edge telemetry logs</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">14 Clusters Active</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-maven-muted leading-relaxed text-left py-2">
                    <div>
                      <span className="block text-[8px] uppercase text-maven-gold/75">Active Pods</span>
                      <span className="block font-bold text-maven-cream">14 Pods</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase text-maven-gold/75">Active WebSockets</span>
                      <span className="block font-bold text-maven-cream">1,402 Sockets</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase text-maven-gold/75">Daily Requests</span>
                      <span className="block font-bold text-maven-cream">450K Request/day</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase text-maven-gold/75">Uptime SLA</span>
                      <span className="block font-bold text-emerald-400">99.995% Live</span>
                    </div>
                  </div>

                  <span className="text-[9px] text-maven-muted font-mono leading-relaxed text-center border-t border-maven-cream/5 pt-3">
                    Edge clusters dynamically scale according to client active transaction volumes.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button inside console */}
          <div className="border-t border-maven-cream/5 pt-4 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-maven-muted font-mono">
              Ready to construct your custom digital platform? Let&apos;s talk spec design.
            </span>

            <button 
              onClick={() => onPrefillInquiry('Requested custom systems engineering consultation and spec discussion.')}
              className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none shrink-0"
            >
              Consult Our Architecture Team
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
