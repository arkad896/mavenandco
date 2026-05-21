'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Calculator, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Receipt,
  Heart
} from 'lucide-react';
import { trpc } from './utils/trpc';
import HowItWorks from './components/HowItWorks';
import { MAVEN_SERVICES } from '../lib/constants';

// Interactive Custom Widgets
import EcosystemSimulator from './components/interactive/EcosystemSimulator';
import WhatsAppSimulator from './components/interactive/WhatsAppSimulator';
import PricingConfigurator from './components/interactive/PricingConfigurator';
import CaseStudies from './components/interactive/CaseStudies';
import FeatureAccordion from './components/interactive/FeatureAccordion';
import BrandVisualizer from './components/interactive/BrandVisualizer';
import OnboardingTimeline from './components/interactive/OnboardingTimeline';
import FAQDirectory from './components/interactive/FAQDirectory';
import SolutionComparison from './components/interactive/SolutionComparison';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  // Interactive ROI Calculator State
  const [onlineRevenue, setOnlineRevenue] = useState<number>(500000); // 5 Lakhs default

  // Lead Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'Restaurant' as 'Restaurant' | 'Cafe' | 'Hotel' | 'Cloud Kitchen' | 'Resort' | 'Other',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // tRPC Queries & Mutations
  const statusQuery = trpc.getSystemStatus.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const submitInquiryMutation = trpc.submitInquiry.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
      setFormError(null);
    },
    onError: (err) => {
      setFormError(err.message || 'Something went wrong. Please check your inputs and try again.');
    }
  });

  // Calculate savings metrics
  const oldPlatformCommissions = onlineRevenue * 0.20; // 20% Zomato/Swiggy leakage
  const traditionalAgencyFee = 25000;
  const standardPOSFee = 4000;
  const whatsappToolFee = 5000;
  const websiteHostingFee = 2000;

  const totalOldWayCost = oldPlatformCommissions + traditionalAgencyFee + standardPOSFee + whatsappToolFee + websiteHostingFee;
  const mavenFlatFee = 29999;
  const monthlySavings = Math.max(0, totalOldWayCost - mavenFlatFee);
  const yearlySavings = monthlySavings * 12;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    submitInquiryMutation.mutate(form);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const prefillServiceInquiry = (serviceTitle: string) => {
    setForm(prev => ({
      ...prev,
      notes: `Interested specifically in: ${serviceTitle}. Please share deployment details.`
    }));
    scrollToSection('inquire');
  };

  const handlePrefillInquiry = (note: string) => {
    setForm(prev => ({
      ...prev,
      notes: note
    }));
    scrollToSection('inquire');
  };

  return (
    <div className="min-h-screen bg-maven-green text-maven-cream font-body relative overflow-hidden selection:bg-maven-gold selection:text-maven-green-dark">
      {/* 1. Global Subtle Luxury Grain Layer */}
      <div className="grain" aria-hidden="true" />

      {/* Decorative ambient vector grid & glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(28,74,56,0.35)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Premium Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center"
      >
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group focus:outline-none">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-maven-cream group-hover:text-maven-gold transition-colors duration-500">
            MAVEN
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-maven-muted uppercase leading-none">
            HOSPITALITY OS
          </span>
        </a>

        {/* Central Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-mono tracking-widest uppercase text-maven-cream/70">
          <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none">
            Savings
          </button>
          <button onClick={() => scrollToSection('services')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none">
            Services
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none">
            Lifecycle
          </button>
          <button onClick={() => scrollToSection('pos-spotlight')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none">
            Free POS
          </button>
        </div>

        {/* Right Action & tRPC Status Indicator */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Live tRPC Status Pill */}
          <div className="flex items-center gap-2 border border-maven-cream/10 bg-maven-green-dark/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span 
              className={`w-1.5 h-1.5 rounded-full ${
                statusQuery.data?.status === 'healthy' 
                  ? 'bg-emerald-400 animate-pulse' 
                  : 'bg-maven-gold/50'
              }`} 
            />
            <span className="text-[9px] font-mono tracking-wider uppercase text-maven-muted">
              {statusQuery.data?.status === 'healthy' ? 'Core OS Sync' : 'Offline Mode'}
            </span>
          </div>

          <button 
            onClick={() => scrollToSection('inquire')}
            className="text-xs font-mono uppercase tracking-widest bg-maven-gold text-maven-green-dark hover:bg-maven-cream px-5 py-2.5 rounded-full transition-all duration-300 font-bold focus:outline-none"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-maven-cream hover:text-maven-gold transition-colors duration-300 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 bg-maven-green-dark/98 backdrop-blur-xl flex flex-col justify-center items-center gap-8 text-lg font-serif"
          >
            <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-maven-gold text-maven-cream transition-colors">Savings Calculator</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-maven-gold text-maven-cream transition-colors">Our 8 Services</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-maven-gold text-maven-cream transition-colors">Guest Lifecycle</button>
            <button onClick={() => scrollToSection('pos-spotlight')} className="hover:text-maven-gold text-maven-cream transition-colors">Free Enterprise POS</button>
            <button 
              onClick={() => scrollToSection('inquire')}
              className="text-maven-green-dark bg-maven-gold font-mono text-xs uppercase tracking-widest font-bold px-8 py-3 rounded-full mt-4"
            >
              Get Started Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section (Operating System Positioning) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-24 sm:pb-36">
        <div className="flex flex-col gap-10 lg:gap-14">
          
          {/* Main H1 - Clear Positioning */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl text-[2.5rem] sm:text-[4rem] lg:text-[5.5rem] font-serif leading-[1.1] tracking-tight font-medium text-maven-cream"
          >
            The entire operating system for your{' '}
            <span className="text-gold-gradient font-semibold">hospitality</span> brand.
          </motion.h1>

          {/* Asymmetrical Grid: Left Column Description, Right Column ROI Savings Hook */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-4">
            
            {/* Supporting Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-6 lg:col-span-6 flex flex-col gap-5"
            >
              <span className="text-xs font-mono tracking-[0.2em] text-maven-gold uppercase">
                MARKETING + AUTOMATION + TECHNOLOGY
              </span>
              <p className="text-sm sm:text-lg text-maven-muted font-body leading-relaxed max-w-xl">
                We handle your Meta Ads, create premium Instagram content, optimize local SEO, build custom native WhatsApp automations, and manage your custom website — <strong className="text-maven-cream">plus we bundle an enterprise POS system and ingredient inventory tracking completely free.</strong> All under one monthly flat subscription.
              </p>

              <div className="flex flex-wrap gap-4 items-center mt-4">
                <button 
                  onClick={() => scrollToSection('roi-calculator')}
                  className="group relative inline-flex items-center gap-3 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-full font-bold shadow-lg transition-all duration-500 hover:bg-maven-cream hover:text-maven-green-dark"
                >
                  Calculate Your Savings
                  <Calculator className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => scrollToSection('inquire')}
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-maven-cream hover:text-maven-gold py-4 px-6 transition-all duration-300"
                >
                  Book Onboarding Call
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>

            {/* Micro visual stats block */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="md:col-span-6 lg:col-span-6 bg-maven-green-light/20 backdrop-blur-md border border-maven-gold/15 p-6 rounded-2xl flex flex-col gap-4 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-maven-cream/10 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Standard Agency Bundle</span>
                <span className="text-xs text-maven-muted line-through">₹55,000+/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-serif font-semibold">Maven Flat OS Rate</span>
                <span className="text-lg font-mono text-maven-cream font-bold">₹29,999/mo</span>
              </div>
              <div className="bg-maven-green-dark/40 px-4 py-3 rounded-lg flex items-center gap-3 border border-maven-gold/10">
                <div className="w-8 h-8 rounded-full bg-maven-gold/15 flex items-center justify-center text-maven-gold">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-maven-muted font-mono uppercase">Direct Orders Hook</span>
                  <span className="text-xs font-semibold text-maven-cream">0% Commission Table QR Ordering</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4. Cinematic Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="relative mt-16 sm:mt-24 w-full h-[280px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-maven-cream/10 group"
        >
          <div 
            className="w-full h-full bg-cover bg-center grayscale contrast-[1.1] opacity-90 sepia-[8%] group-hover:scale-[1.02] transition-transform duration-[4000ms] ease-out"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maven-green-dark/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">The Maven Promise</span>
            <span className="text-xl sm:text-2xl font-serif text-maven-cream font-medium tracking-tight">Direct Client Relations, Automated Logistics, Maximum Revenue.</span>
          </div>
        </motion.div>
      </main>

      {/* 4.5. Ecosystem Simulator Section */}
      <section 
        id="ecosystem-simulator"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <EcosystemSimulator onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 5. Interactive ROI Savings Calculator */}
      <section 
        id="roi-calculator"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/30 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3">Value Engineered</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
              Calculate Your Direct Cost Leakage
            </h2>
            <p className="text-sm sm:text-base text-maven-muted mt-4 max-w-xl">
              See what you are paying third-party aggregators and fragmented tools compared to Maven&apos;s single flat operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
            
            {/* Input Slider Column */}
            <div className="lg:col-span-5 bg-maven-green-light/10 border border-maven-gold/10 p-8 rounded-2xl flex flex-col justify-center gap-8">
              <div className="space-y-3">
                <label className="flex justify-between items-center">
                  <span className="text-sm font-semibold uppercase tracking-wider text-maven-cream">Monthly Online Revenue</span>
                  <span className="text-xl font-mono text-maven-gold font-bold">₹{onlineRevenue.toLocaleString('en-IN')}</span>
                </label>
                <input 
                  type="range" 
                  min="50000" 
                  max="1500000" 
                  step="50000"
                  value={onlineRevenue}
                  onChange={(e) => setOnlineRevenue(Number(e.target.value))}
                  className="w-full h-1 bg-maven-green-dark rounded-lg appearance-none cursor-pointer accent-maven-gold"
                />
                <div className="flex justify-between text-[10px] font-mono text-maven-muted">
                  <span>₹50K</span>
                  <span>₹7.5L</span>
                  <span>₹15L</span>
                </div>
              </div>

              <div className="border-t border-maven-cream/10 pt-6 space-y-4">
                <span className="text-xs font-mono tracking-widest text-maven-gold uppercase">Traditional Expenses Leak</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-maven-muted">
                    <span>20% Aggregator Commission</span>
                    <span>₹{oldPlatformCommissions.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>Content & Marketing Agency</span>
                    <span>₹{traditionalAgencyFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>POS Subscription (Petpooja/POSist)</span>
                    <span>₹{standardPOSFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>WhatsApp Business Broadcast Tool</span>
                    <span>₹{whatsappToolFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>Managed Website Hosting & Devs</span>
                    <span>₹{websiteHostingFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Visual Comparison Column */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Old way card */}
              <div className="bg-maven-green-dark border border-red-500/10 p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase font-bold">The Broken Stack</span>
                  <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">Traditional Costs</h3>
                  <p className="text-xs text-maven-muted mt-2">Paying agencies, web developers, multiple software portals, and leaking 20% on aggregators.</p>
                </div>
                <div className="mt-8">
                  <span className="text-[11px] font-mono uppercase text-maven-muted">Estimated Total Cost</span>
                  <div className="text-3xl font-mono text-red-400 font-bold mt-1">₹{totalOldWayCost.toLocaleString('en-IN')}<span className="text-xs text-maven-muted">/mo</span></div>
                </div>
              </div>

              {/* Maven way card */}
              <div className="bg-gradient-to-br from-maven-green-light/40 to-maven-green-dark border-2 border-maven-gold p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-maven-gold text-maven-green-dark text-[9px] font-mono tracking-widest uppercase font-bold py-1.5 px-4 rounded-bl-lg">
                  RECOMMENDED
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Integrated OS</span>
                  <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">The Maven Way</h3>
                  <p className="text-xs text-maven-muted mt-2">Everything in one place. One flat subscription. 0% aggregator commission loops.</p>
                </div>
                <div className="mt-8">
                  <span className="text-[11px] font-mono uppercase text-maven-muted">Flat Subscription Fee</span>
                  <div className="text-3xl font-mono text-maven-gold font-bold mt-1">₹{mavenFlatFee.toLocaleString('en-IN')}<span className="text-xs text-maven-muted">/mo</span></div>
                </div>
              </div>

            </div>
          </div>

          {/* Savings Highlight Pill */}
          <motion.div 
            layout
            className="mt-12 bg-maven-gold/10 border border-maven-gold/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold animate-bounce">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <span className="text-sm font-semibold uppercase tracking-wider text-maven-gold">Monthly Cash Retained</span>
                <span className="text-xs text-maven-muted">Based on your dynamic online transaction inputs.</span>
              </div>
            </div>
            <div className="flex gap-8 items-center text-center md:text-right">
              <div>
                <span className="text-[10px] font-mono text-maven-muted uppercase">Estimated Monthly Savings</span>
                <div className="text-2xl sm:text-3xl font-mono text-maven-cream font-bold mt-1">₹{monthlySavings.toLocaleString('en-IN')}</div>
              </div>
              <div className="border-l border-maven-cream/15 pl-8">
                <span className="text-[10px] font-mono text-maven-muted uppercase">Yearly Value Kept</span>
                <div className="text-2xl sm:text-3xl font-mono text-maven-gold font-bold mt-1">₹{yearlySavings.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5.3. Solution Comparison Section */}
      <section 
        id="solution-comparison"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SolutionComparison onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 5.5. Interactive Pricing Configurator Section */}
      <section 
        id="pricing-packages"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/20 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <PricingConfigurator onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 5.7. Brand Visualizer Section */}
      <section 
        id="brand-visualizer"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/30 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <BrandVisualizer onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 6. The 8-Service Bento Grid */}
      <section 
        id="services"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3">Our Platform Services</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
              8 Core Blocks of the Maven Operating System
            </h2>
            <p className="text-sm sm:text-base text-maven-muted mt-4 max-w-xl">
              We replace five different agencies and SaaS tools. Hover to explore features, click to request a deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-12">
            {MAVEN_SERVICES.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <motion.div 
                  key={service.id}
                  layout
                  onClick={() => setActiveService(isActive ? null : service.id)}
                  className={`group bg-maven-green-light/15 hover:bg-maven-green-light/25 border ${
                    isActive ? 'border-maven-gold ring-1 ring-maven-gold/30' : 'border-maven-gold/10'
                  } rounded-2xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between gap-6 transition-all duration-500 shadow-lg`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-full bg-maven-green-dark border border-maven-gold/25 flex items-center justify-center text-maven-gold group-hover:text-maven-cream group-hover:bg-maven-gold/20 transition-all duration-500 shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {service.isFree && (
                        <span className="text-[9px] font-mono tracking-widest uppercase bg-maven-gold/20 text-maven-gold border border-maven-gold/30 py-1 px-3 rounded-full">
                          INCLUDED FREE
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-serif text-maven-cream font-medium tracking-tight group-hover:text-maven-gold-light transition-colors">
                        {service.title}
                      </h3>
                      <span className="block text-[11px] font-mono text-maven-gold uppercase tracking-wider leading-relaxed">
                        {service.tagline}
                      </span>
                      <p className="text-xs sm:text-sm text-maven-muted leading-relaxed pt-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bullet details on click or tap */}
                  <div className="space-y-4 pt-4 border-t border-maven-cream/5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-maven-muted">
                      <span>{isActive ? 'Click to hide details' : 'Click to expand features'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'rotate-90 text-maven-gold' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 text-xs text-maven-muted pt-2 list-none overflow-hidden"
                        >
                          {service.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-maven-gold pt-0.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prefillServiceInquiry(service.title);
                      }}
                      className="text-[10px] font-mono tracking-widest text-maven-gold uppercase flex items-center gap-1 group-hover:text-maven-cream transition-colors"
                    >
                      Prefill Form
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6.5. WhatsApp Simulator Section */}
      <section 
        id="whatsapp-demo"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/10 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <WhatsAppSimulator onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 7. How It Works Timeline Component */}
      <HowItWorks />

      {/* 8. POS Spotlight Back-of-House Showcase */}
      <section 
        id="pos-spotlight"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/20 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Screen Mockup Column */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-maven-gold/10 to-transparent blur-[80px] pointer-events-none" />
              
              {/* POS Interface Visual mockup */}
              <div className="bg-maven-green-dark border border-maven-gold/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
                
                {/* Visual POS header */}
                <div className="flex justify-between items-center border-b border-maven-cream/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-maven-gold/15 flex items-center justify-center text-maven-gold">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-maven-muted">TABLE 04 BILLING</span>
                      <span className="text-xs font-semibold">Active Checkout Ticket</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded">
                    SYNCED
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-maven-muted">
                    <span>2x Truffle Tagliolini Pasta</span>
                    <span>₹1,580</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>1x Burrata & Heirloom Salad</span>
                    <span>₹690</span>
                  </div>
                  <div className="flex justify-between text-maven-muted">
                    <span>2x Classic Negroni Cocktail</span>
                    <span>₹1,180</span>
                  </div>
                </div>

                {/* Real-time inventory logs visual */}
                <div className="bg-maven-green-light/20 p-4 rounded-xl border border-maven-gold/10 space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold">AUTOMATED REAL-TIME INVENTORY DECREMENT</span>
                  <div className="space-y-1.5 text-[10px] text-maven-muted font-mono">
                    <div className="flex justify-between">
                      <span>• Imported Italian Truffles</span>
                      <span className="text-red-400">-12g (Low Stock Alert)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Fresh Burrata Cheese</span>
                      <span>-1 Unit</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Gin & Campari Spirit Vol</span>
                      <span>-120ml</span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-maven-cream/10 pt-4">
                  <span className="text-sm font-semibold">Bill Total (Cashier Screen)</span>
                  <span className="text-lg font-mono text-maven-gold font-bold">₹3,450</span>
                </div>

              </div>
            </div>

            {/* Context & Description Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-mono tracking-[0.2em] text-maven-gold uppercase font-bold">
                WORTH ₹5,000/MONTH — INCLUDED FREE
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream tracking-tight leading-tight">
                Full Enterprise POS + Inventory & Order Tracking
              </h2>
              <p className="text-sm sm:text-base text-maven-muted leading-relaxed">
                Most branding agencies only build the ads. Standalone POS systems like Petpooja or POSist charge heavy monthly fees just for billing and stock management. 
              </p>
              <p className="text-sm sm:text-base text-maven-muted leading-relaxed">
                Maven gives you our **complete, pre-integrated Point of Sale and back-of-house ingredient tracker completely free** as part of your marketing package. Your ads, WhatsApp automations, table QR codes, stock sheets, and billing run as a single unified ecosystem.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono tracking-wider uppercase text-maven-cream pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maven-gold" />
                  <span>Recipe Cost Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maven-gold" />
                  <span>Low Stock Warnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maven-gold" />
                  <span>Kitchen Displays (KDS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maven-gold" />
                  <span>Role-based Logins</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8.5. Case Studies Section */}
      <section 
        id="case-pilots"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <CaseStudies onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 8.7. Deep-Dive Feature Accordion Section */}
      <section 
        id="technical-specs"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/20 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FeatureAccordion onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 8.9. Onboarding Timeline Section */}
      <section 
        id="onboarding-timeline"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/30 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <OnboardingTimeline onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 9. Interactive Inquiry Lead Capture Form (tRPC Mutation Linked) */}
      <section 
        id="inquire"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3">Begin Onboarding</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
              Request Your System Deployment
            </h2>
            <p className="text-sm sm:text-base text-maven-muted mt-4 max-w-xl">
              Submit your inquiry to test live monorepo type-safety, and schedule a deployment call with our team.
            </p>
          </div>

          <div className="bg-maven-green-light/10 border border-maven-gold/15 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.02),transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="inquiry-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 text-xs">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Contact Name</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Priyanshu Bose"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Email Address</label>
                      <input 
                        type="email"
                        required
                        placeholder="e.g. priyanshu@restaurant.com"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Phone (WhatsApp Contact)</label>
                      <input 
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Business Name</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. The Amber Pavilion"
                        value={form.businessName}
                        onChange={(e) => setForm(prev => ({ ...prev, businessName: e.target.value }))}
                        className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Business Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Business Type</label>
                      <select 
                        value={form.businessType}
                        onChange={(e) => setForm(prev => ({ ...prev, businessType: e.target.value as 'Restaurant' | 'Cafe' | 'Hotel' | 'Cloud Kitchen' | 'Resort' | 'Other' }))}
                        className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream px-4 py-3 rounded-xl focus:outline-none transition-all text-sm select-custom"
                      >
                        <option value="Restaurant">Restaurant</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Cloud Kitchen">Cloud Kitchen</option>
                        <option value="Resort">Resort</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Empty placeholder spacer for layout balance */}
                    <div className="hidden sm:block" />
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Special Requests / Campaign Notes (Optional)</label>
                    <textarea 
                      placeholder="Share details about your average ticket size, main culinary cuisine, or specific timeline expectations..."
                      value={form.notes}
                      onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={submitInquiryMutation.isLoading}
                      className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-xs uppercase tracking-widest py-4 px-8 rounded-full font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {submitInquiryMutation.isLoading ? 'Syncing Lead to monorepo...' : 'Submit Deployment Request'}
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-maven-gold/15 text-maven-gold border border-maven-gold/40 flex items-center justify-center mx-auto animate-pulse">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif text-maven-cream font-medium tracking-tight">Lead Registered in Backend</h3>
                    <p className="text-sm text-maven-muted max-w-lg mx-auto leading-relaxed">
                      {submitInquiryMutation.data?.message || 'Success! Your lead details have been routed natively to the Maven tRPC backend.'}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-mono uppercase tracking-widest text-maven-gold hover:text-maven-cream hover:underline focus:outline-none"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 9.5. FAQ Directory Section */}
      <section 
        id="faq-directory"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <FAQDirectory onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 10. Luxury Client Marquee */}
      <section className="border-t border-maven-cream/5 py-16 bg-maven-green-dark/40 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col gap-8">
          <span className="text-[10px] font-mono tracking-[0.3em] text-maven-muted uppercase text-center">
            INTEGRATING TECHNOLOGY FOR PREMIUM HOSPITALITY BRANDS
          </span>
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-8 md:gap-12 opacity-35 grayscale contrast-200 py-2 text-center text-xs font-serif uppercase tracking-widest font-semibold text-maven-cream">
            <span>Fine Dining Restaurants</span>
            <span>Boutique Hotels</span>
            <span>Local Cafes & Bakeries</span>
            <span>Cloud Kitchen Networks</span>
            <span>Luxury Holiday Resorts</span>
          </div>
        </div>
      </section>

      {/* 11. Minimal Footer */}
      <footer className="border-t border-maven-cream/5 py-12 bg-maven-green-dark/80 relative z-20 text-center text-xs text-maven-muted font-mono tracking-wider">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span>&copy; {new Date().getFullYear()} MAVEN OS. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-maven-gold fill-maven-gold animate-pulse" />
            <span>for hospitality clients</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
