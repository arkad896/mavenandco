'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  ArrowUpRight, 
  Menu, 
  X, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Heart
} from 'lucide-react';
import { trpc } from '../utils/trpc';
import { MAVEN_SERVICES } from '../../lib/constants';
import Logo from '../components/Logo';

// Interactive Custom Widgets
import EcosystemSimulator from '../components/interactive/EcosystemSimulator';
import OnboardingTimeline from '../components/interactive/OnboardingTimeline';
import FAQDirectory from '../components/interactive/FAQDirectory';
import SolutionComparison from '../components/interactive/SolutionComparison';

export default function HospitalityProductPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [activeService, setActiveService] = useState<string | null>(null);

  // Interactive ROI Calculator State
  const [onlineRevenue, setOnlineRevenue] = useState<number>(500000); // 5 Lakhs default

  // derived ROI metrics
  const oldPlatformCommissions = onlineRevenue * 0.20; // 20% commission on average online delivery platforms
  const traditionalAgencyFee = 25000;
  const standardPOSFee = 4000;
  const whatsappToolFee = 5000;
  const websiteHostingFee = 2000;
  
  const totalOldWayCost = oldPlatformCommissions + traditionalAgencyFee + standardPOSFee + whatsappToolFee + websiteHostingFee;
  const mavenFlatFee = 29999;
  const monthlySavings = totalOldWayCost - mavenFlatFee;
  const annualSavings = monthlySavings * 12;

  // Lead capture mutation via tRPC
  const submitInquiryMutation = trpc.simulateAdImpression.useMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'Restaurant' as 'Restaurant' | 'Cafe' | 'Hotel' | 'Cloud Kitchen' | 'Resort' | 'Other',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);

    if (!form.name || !form.email || !form.phone || !form.businessName) {
      setFormError('Please fill out all required fields.');
      setFormSubmitting(false);
      return;
    }

    submitInquiryMutation.mutate({
      brandId: 'fine-dining',
      platform: 'Local Maps',
      budget: 29999
    }, {
      onSuccess: () => {
        setFormSubmitting(false);
        setFormSubmitted(true);
      },
      onError: (err) => {
        setFormSubmitting(false);
        setFormError(err.message || 'System connectivity timeout. Please try again.');
      }
    });
  };

  const handlePrefillInquiry = (note: string) => {
    setForm(prev => ({
      ...prev,
      notes: note
    }));
    const el = document.getElementById('inquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-maven-green-dark text-maven-cream font-sans antialiased selection:bg-maven-gold/30 selection:text-maven-cream">
      
      {/* Dynamic Background Mesh Gradients */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(28,74,56,0.35)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Sticky Premium Product Header with Glassmorphism */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-maven-green-dark/70 backdrop-blur-md border-maven-cream/10 py-3 sm:py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-5 sm:py-6'
      }`}>
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center gap-4 lg:gap-8"
        >
          {/* Brand Link with Back Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 whitespace-nowrap">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 group text-xs font-mono uppercase text-maven-cream/70 hover:text-maven-gold transition-colors duration-300 whitespace-nowrap"
              title="Return to Parent Suite"
            >
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline whitespace-nowrap">Parent Suite</span>
            </Link>
            <div className="h-4 w-px bg-maven-cream/15" />
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Logo variant="monogram" size="xs" />
              <span className="text-sm font-serif font-bold tracking-tight text-maven-cream whitespace-nowrap">HEARTH</span>
              <span className="hidden sm:inline-block text-[9px] font-mono px-2.5 py-0.5 border border-maven-gold/30 bg-maven-gold/10 text-maven-gold rounded-full font-bold uppercase shrink-0 whitespace-nowrap">BY MAVEN & CO.</span>
            </div>
          </div>

          {/* Central Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[10px] font-mono tracking-widest uppercase text-maven-cream/70">
            <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Savings
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Services
            </button>
            <button onClick={() => scrollToSection('ecosystem-simulator')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Simulators
            </button>
            <button onClick={() => scrollToSection('pos-spotlight')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Free POS
            </button>
          </div>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-6 shrink-0 whitespace-nowrap">
            <Link 
              href="/dashboard/login"
              className="text-xs font-mono uppercase tracking-widest text-maven-cream/70 hover:text-maven-gold transition-colors duration-300 font-semibold focus:outline-none whitespace-nowrap"
            >
              Partner Login
            </Link>

            <button 
              onClick={() => scrollToSection('inquire')}
              className="text-xs font-mono uppercase tracking-widest bg-maven-gold text-maven-green-dark hover:bg-maven-cream px-5 py-2.5 rounded-full transition-all duration-300 font-bold focus:outline-none whitespace-nowrap"
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
      </header>

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
            <button onClick={() => scrollToSection('ecosystem-simulator')} className="hover:text-maven-gold text-maven-cream transition-colors">Ecosystem Simulators</button>
            <button onClick={() => scrollToSection('pos-spotlight')} className="hover:text-maven-gold text-maven-cream transition-colors">Free Enterprise POS</button>
            <Link href="/dashboard/login" className="hover:text-maven-gold text-maven-cream transition-colors">Partner Portal Login</Link>
            <button 
              onClick={() => scrollToSection('inquire')}
              className="text-maven-green-dark bg-maven-gold font-mono text-xs uppercase tracking-widest font-bold px-8 py-3 rounded-full mt-4"
            >
              Get Started Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flagship Hero Section */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-maven-gold uppercase font-bold bg-maven-gold/10 border border-maven-gold/20 px-4 py-1.5 rounded-full inline-block">
            HEARTH STANDALONE SYSTEM
          </span>
          <h1 className="max-w-5xl mx-auto text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight font-medium text-maven-cream">
            Hearth: The Operating System for Your <span className="text-gold-gradient font-semibold italic">Hospitality</span> Brand.
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-maven-muted font-body leading-relaxed">
            Consolidate your geofenced social ads, social media calendars, local map rankings, verified WhatsApp Business pipelines, CRM loyalty, digital table ordering, and recipe-level inventory POS. All under one flat monthly subscription.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('roi-calculator')}
              className="bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest px-8 py-4.5 rounded-full font-bold shadow-lg transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark"
            >
              Calculate Your Savings
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border border-maven-gold/30 hover:border-maven-gold bg-maven-green-light/10 text-maven-cream font-mono text-xs uppercase tracking-widest px-8 py-4.5 rounded-full transition-all duration-300"
            >
              View 8 Modules
            </button>
          </div>
        </motion.div>
      </header>

      {/* 1. Ecosystem Simulator Section */}
      <section 
        id="ecosystem-simulator"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <EcosystemSimulator onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 2. Interactive ROI Savings Calculator */}
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
            {/* Input Slider */}
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

            {/* Results Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
              <div className="w-10 h-10 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono text-maven-muted uppercase">ESTIMATED BOTTOM-LINE MARGIN INCREASE</div>
                <div className="text-lg font-serif font-bold text-maven-cream mt-0.5">
                  Save ₹{monthlySavings.toLocaleString('en-IN')}/mo — ₹{annualSavings.toLocaleString('en-IN')}/yr recaptured profits
                </div>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('inquire')}
              className="bg-maven-gold text-maven-green-dark font-mono text-[10px] uppercase tracking-widest font-bold px-6 py-4.5 rounded-full transition-all duration-300 hover:bg-maven-cream shrink-0"
            >
              Retain 100% of My Revenue
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Detailed Services Blueprint */}
      <section 
        id="services"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase">Integrated Core Modules</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
                The 8 Core Services in One Package
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-maven-muted leading-relaxed font-mono">
              Consolidate your technology stack. Instead of paying multiple software subscriptions, Maven manages every sector directly inside a unified ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MAVEN_SERVICES.map((service) => {
              const ServiceIcon = service.icon;
              const isSelected = activeService === service.id;
              
              return (
                <div 
                  key={service.id}
                  onClick={() => setActiveService(isSelected ? null : service.id)}
                  className={`bg-maven-green-light/5 border rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col justify-between group select-none relative overflow-hidden ${
                    isSelected 
                      ? 'border-maven-gold bg-maven-green-light/10 shadow-lg' 
                      : 'border-maven-cream/10 hover:border-maven-gold/40 hover:bg-maven-green-light/10'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                        isSelected 
                          ? 'bg-maven-gold text-maven-green-dark border-maven-gold' 
                          : 'bg-maven-green-dark text-maven-gold border-maven-gold/30 group-hover:bg-maven-gold group-hover:text-maven-green-dark group-hover:border-maven-gold'
                      }`}>
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      
                      {service.isFree && (
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 py-1 px-2.5 rounded-full uppercase tracking-wider font-bold">
                          Free Bundle Included
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-semibold text-maven-cream group-hover:text-maven-gold transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-[10px] font-mono text-maven-gold tracking-wide leading-snug">
                        {service.tagline}
                      </p>
                      <p className="text-xs text-maven-muted leading-relaxed font-body">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Spec Sheet Dropdown */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isSelected ? 'max-h-[300px] opacity-100 mt-6 pt-6 border-t border-maven-cream/10' : 'max-h-0 opacity-0'
                  }`}>
                    <span className="text-[9px] font-mono text-maven-gold tracking-widest uppercase block mb-3">Technical Specifications:</span>
                    <ul className="space-y-2 text-[11px] text-maven-cream/90 font-mono">
                      {service.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 items-start leading-relaxed">
                          <span className="text-maven-gold shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end items-center mt-6 text-[10px] font-mono text-maven-muted uppercase tracking-wider">
                    <span>{isSelected ? 'Collapse specs ↑' : 'View full specs →'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. POS Spotlight Showcase Section */}
      <section 
        id="pos-spotlight"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/20 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SolutionComparison onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 5. Pricing and Brochure downloads */}
      <section 
        id="brochure-download"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono tracking-widest text-maven-gold uppercase font-bold">Comprehensive Blueprint</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-maven-cream font-medium tracking-tight">
                Read the Technical Operations Brochure
              </h2>
              <p className="text-xs sm:text-sm text-maven-muted leading-relaxed">
                Download the official print publication version containing structural edge configurations, local map optimization charts, multi-site databases configurations, and detailed pricing matrix models.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-maven-gold/15 text-maven-gold flex items-center justify-center font-mono text-xs font-bold mt-0.5 flex-shrink-0">1</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-maven-cream">Page 1: Brand Cover & Vision</span>
                    <span className="text-xs text-maven-muted">Introduction to core system values and operational pillars.</span>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-maven-gold/15 text-maven-gold flex items-center justify-center font-mono text-xs font-bold mt-0.5 flex-shrink-0">2</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-maven-cream">Page 2: Core Platform Services</span>
                    <span className="text-xs text-maven-muted">Exhaustive specs of the 8 services from Meta Ads to managed portals.</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-maven-gold/15 text-maven-gold flex items-center justify-center font-mono text-xs font-bold mt-0.5 flex-shrink-0">3</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-maven-cream">Page 3: Engineering Architecture</span>
                    <span className="text-xs text-maven-muted">Prisma db adapters, serverless Edge networks, and recipe decrement.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a 
                  href="/maven-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-full font-bold shadow-lg transition-all duration-500 hover:bg-maven-cream hover:text-maven-green-dark"
                >
                  Download Brochure (PDF)
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="lg:col-span-6 bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-maven-cream/10">
                <div 
                  className="w-full h-full bg-cover bg-center grayscale contrast-[1.1] opacity-75"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maven-green-dark via-maven-green-dark/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Flagship Platform PDF</span>
                  <span className="text-lg font-serif text-maven-cream font-medium tracking-tight mt-1">Technical Deployment specs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Onboarding timeline */}
      <section 
        id="onboarding-timeline"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/30 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <OnboardingTimeline onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 7. FAQs */}
      <section 
        id="faq-directory"
        className="py-24 border-t border-maven-cream/5 bg-maven-green relative z-20"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <FAQDirectory onPrefillInquiry={handlePrefillInquiry} />
        </div>
      </section>

      {/* 8. Lead Capture Form */}
      <section 
        id="inquire"
        className="py-24 border-t border-maven-cream/5 bg-maven-green-dark/20 relative z-20"
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
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Business Type</label>
                      <select 
                        value={form.businessType}
                        onChange={(e) => setForm(prev => ({ ...prev, businessType: e.target.value as any }))}
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

                    <div className="hidden sm:block" />
                  </div>

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

                  <button 
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-5 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <div className="h-4 w-4 border-2 border-maven-green-dark/30 border-t-maven-green-dark rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Deploy Hearth OS Suite</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="inquiry-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-maven-cream font-bold">System Inquiry Logged!</h3>
                    <p className="text-xs text-maven-muted max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{form.name}</strong>. We have logged <strong>{form.businessName}</strong> under the live Hearth OS deployment pipeline. An onboarding engineer will contact you via WhatsApp at <strong>{form.phone}</strong> shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Corporate Minimal Footer */}
      <footer className="border-t border-maven-cream/5 py-12 bg-maven-green-dark/80 relative z-20 text-center text-xs text-maven-muted font-mono tracking-wider">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-8">
          <Logo variant="full" size="md" className="mb-2" />
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-maven-cream/5 pt-8">
            <span>&copy; {new Date().getFullYear()} MAVEN. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-maven-gold transition-colors duration-300">Corporate Parent Suite</Link>
              <span className="text-maven-cream/10">|</span>
              <Link href="/dashboard/login" className="hover:text-maven-gold transition-colors duration-300">Partner Login</Link>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-maven-gold fill-maven-gold animate-pulse" />
              <span>for hospitality clients</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
