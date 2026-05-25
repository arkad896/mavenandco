'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Sparkles,
  Heart,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { trpc } from './utils/trpc';
import Logo from './components/Logo';
import CreativePlanner from './components/interactive/CreativePlanner';
import ServiceBlocks from './components/interactive/ServiceBlocks';
import VerticalMapper from './components/interactive/VerticalMapper';
import ConciergeBot from './components/interactive/ConciergeBot';
import ContrastMatrix from './components/interactive/ContrastMatrix';

export default function Home() {
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

  // tRPC system status check
  const statusQuery = trpc.getSystemStatus.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Lead capture mutation via tRPC
  const submitInquiryMutation = trpc.simulateAdImpression.useMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    inquiryType: 'Custom Multi-Vertical Systems' as any,
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);

    if (!form.name || !form.email || !form.phone || !form.companyName) {
      setFormError('Please fill out all required fields.');
      setFormSubmitting(false);
      return;
    }

    submitInquiryMutation.mutate({
      brandId: 'corporate-portal',
      platform: 'Local Maps',
      budget: 20999
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-maven-green text-maven-cream font-body relative selection:bg-maven-gold selection:text-maven-green-dark">
      
      {/* Subtle luxury ambient glows */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
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

      {/* 1. Sticky Corporate Header with Glassmorphism */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-maven-green/70 backdrop-blur-md border-maven-cream/10 py-3 sm:py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-5 sm:py-6'
      }`}>
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center gap-4 lg:gap-8"
        >
          {/* Corporate Logo */}
          <Link href="#" className="flex items-center gap-3 group focus:outline-none whitespace-nowrap shrink-0">
            <Logo variant="monogram" size="sm" className="transform group-hover:scale-105 transition-transform duration-500" />
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-maven-cream group-hover:text-maven-gold transition-colors duration-500 leading-none whitespace-nowrap">
              MAVEN
            </span>
          </Link>

          {/* Corporate Central Links */}
          <div className="hidden xl:flex items-center gap-4 xl:gap-6 text-[10px] font-mono tracking-widest uppercase text-maven-cream/70">
            <Link href="/hospitality" className="text-maven-gold hover:text-maven-cream transition-colors duration-300 relative py-1 focus:outline-none flex items-center gap-1.5 font-bold whitespace-nowrap">
              Hearth OS
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
            <button onClick={() => scrollToSection('services')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              8 Blocks
            </button>
            <button onClick={() => scrollToSection('verticals')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Verticals
            </button>
            <button onClick={() => scrollToSection('concierge')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Kolkata Eats
            </button>
            <button onClick={() => scrollToSection('contrast')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              The Contrast
            </button>
            <button onClick={() => scrollToSection('sandbox')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Creative Planner
            </button>
            <button onClick={() => scrollToSection('process')} className="hover:text-maven-gold transition-colors duration-300 relative py-1 focus:outline-none whitespace-nowrap">
              Process
            </button>
          </div>

          {/* Right Action & Sync Status */}
          <div className="hidden sm:flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 border border-maven-cream/10 bg-maven-green-dark/30 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">
              <span 
                className={`w-1.5 h-1.5 rounded-full ${
                  statusQuery.data?.status === 'healthy' 
                    ? 'bg-emerald-400 animate-pulse' 
                    : 'bg-maven-gold/50'
                }`} 
              />
              <span className="text-[9px] font-mono tracking-wider uppercase text-maven-muted whitespace-nowrap">
                {statusQuery.data?.status === 'healthy' ? 'Studio Engine Online' : 'Sync Active'}
              </span>
            </div>

            <Link 
              href="/dashboard/login"
              className="text-xs font-mono uppercase tracking-widest text-maven-cream/70 hover:text-maven-gold transition-colors duration-300 font-semibold focus:outline-none whitespace-nowrap"
            >
              Partner Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-maven-cream hover:text-maven-gold transition-colors duration-300 focus:outline-none"
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
            <Link href="/hospitality" className="hover:text-maven-gold text-maven-gold font-bold transition-colors flex items-center gap-1.5">
              Hearth Hospitality OS
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
            <button onClick={() => scrollToSection('services')} className="hover:text-maven-gold text-maven-cream transition-colors">8 Service Blocks</button>
            <button onClick={() => scrollToSection('verticals')} className="hover:text-maven-gold text-maven-cream transition-colors">Industry Verticals</button>
            <button onClick={() => scrollToSection('concierge')} className="hover:text-maven-gold text-maven-cream transition-colors">Kolkata Eats Bot</button>
            <button onClick={() => scrollToSection('contrast')} className="hover:text-maven-gold text-maven-cream transition-colors">The Contrast</button>
            <button onClick={() => scrollToSection('sandbox')} className="hover:text-maven-gold text-maven-cream transition-colors">Creative Planner</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-maven-gold text-maven-cream transition-colors">Rollout Process</button>
            <Link href="/dashboard/login" className="hover:text-maven-gold text-maven-cream transition-colors">Partner Portal Login</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Parent Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-16">
        <div className="flex flex-col gap-10 lg:gap-14">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl text-[2.5rem] sm:text-[4rem] lg:text-[5.5rem] font-serif leading-[1.1] tracking-tight font-medium text-maven-cream"
          >
            A fully managed local business <span className="text-gold-gradient font-semibold italic">operating system</span> delivered as a flat monthly service.
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-4 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-7 lg:col-span-7 flex flex-col gap-5"
            >
              <span className="text-xs font-mono tracking-[0.2em] text-maven-gold uppercase">
                ONE FLAT SUBSCRIPTION • NO TRANSACTIONS COMMISSION • WHITE-GLOVE MANAGEMENT
              </span>
              <p className="text-sm sm:text-lg text-maven-muted font-body leading-relaxed max-w-xl">
                We design, engineer, and operate your entire digital and transactional infrastructure. By consolidating geofenced radius advertising, Meta WhatsApp automated CRM pipelines, and customized back-of-house operational dashboards — <strong className="text-maven-cream font-semibold">we replace every disconnected tool with a single point of contact.</strong>
              </p>

              <div className="flex flex-wrap gap-4 items-center mt-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="group relative inline-flex items-center gap-2 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-full font-bold shadow-lg transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark focus:outline-none"
                >
                  Explore 8 Service Blocks
                </button>

                <Link 
                  href="/hospitality"
                  className="group inline-flex items-center gap-2 border border-maven-gold/30 hover:border-maven-gold bg-maven-green-dark/30 hover:bg-maven-gold hover:text-maven-green-dark font-mono text-xs uppercase tracking-widest text-maven-cream py-4.5 px-6 rounded-full transition-all duration-300 shadow-md focus:outline-none"
                >
                  Enter Hearth OS
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>

            {/* Asymmetrical Pricing Status Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="md:col-span-5 lg:col-span-5 bg-maven-green-light/20 backdrop-blur-md border border-maven-gold/15 p-6 rounded-2xl flex flex-col gap-4 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-maven-cream/10 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Standard Intake Rates</span>
                <span className="text-xs text-emerald-400 font-mono">No Setup Fees</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-maven-muted">
                <div className="flex justify-between">
                  <span>Current Subscription</span>
                  <span className="text-maven-cream font-bold">₹20,999/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Q4 Intake Rate</span>
                  <span>₹29,999/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Commissions</span>
                  <span className="text-emerald-400 font-bold">0% Flat</span>
                </div>
                <div className="flex justify-between">
                  <span>Agreement Structuring</span>
                  <span>Month-to-Month</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Backdrop Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="relative mt-16 sm:mt-24 w-full h-[250px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-maven-cream/10 group"
        >
          <div 
            className="w-full h-full bg-cover bg-center grayscale contrast-[1.1] opacity-90 sepia-[8%] group-hover:scale-[1.02] transition-transform duration-[4000ms] ease-out"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maven-green-dark/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 flex flex-col gap-1.5 text-left">
            <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">The Maven Promise</span>
            <span className="text-xl sm:text-2xl font-serif text-maven-cream font-medium tracking-tight">Direct customer ownership. White-glove managed infrastructure. Total business synchronization.</span>
          </div>
        </motion.div>
      </main>

      {/* 3. Section: 8 Service Blocks Interactive Module */}
      <section 
        id="services"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-maven-cream/5 relative z-20"
      >
        <ServiceBlocks onPrefillInquiry={handlePrefillInquiry} />
      </section>

      {/* 4. Section: Verticals Mapping Interactive Module */}
      <section 
        id="verticals"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-maven-cream/5 relative z-20"
      >
        <VerticalMapper onPrefillInquiry={handlePrefillInquiry} />
      </section>

      {/* 4.5. Section: Featured Flagship Showcase: Hearth OS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 relative z-20">
        <div className="bg-gradient-to-br from-maven-green-light/40 to-maven-green-dark border border-maven-gold/20 p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_60%)] blur-2xl pointer-events-none" />
          
          <div className="space-y-4 text-left max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-maven-gold/30 bg-maven-gold/10 text-maven-gold text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Flagship Managed Vertical OS
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-maven-cream leading-tight font-medium">
              Experience the standalone elegance of <span className="text-gold-gradient italic font-bold">Hearth by Maven & Co.</span>
            </h3>
            <p className="text-xs sm:text-sm text-maven-muted leading-relaxed font-body">
              Our flagship Hospitality Operating System is built entirely to liberate restaurants, cafes, cloud kitchens, and boutique hotels from margin leakage. Consolidating recipe-level inventory billing, zero-commission ordering, geofenced acquisition funnels, and natural language WhatsApp CRM into a unified flat-fee managed suite.
            </p>
          </div>

          <div className="shrink-0 relative z-10 flex flex-col gap-3 w-full sm:w-auto">
            <Link 
              href="/hospitality"
              className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2 group w-full text-center"
            >
              <span>Explore Hearth OS Showcase</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="text-[9px] font-mono text-maven-muted text-center sm:text-left block sm:pl-1">
              * Included in your core Maven subscription with zero setup fees.
            </span>
          </div>
        </div>
      </section>

      {/* 5. Section: Kolkata Eats Bot WhatsApp Simulator */}
      <section 
        id="concierge"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-maven-cream/5 relative z-20"
      >
        <ConciergeBot onPrefillInquiry={handlePrefillInquiry} />
      </section>

      {/* 6. Section: Contrast Comparison Matrix */}
      <section 
        id="contrast"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-maven-cream/5 relative z-20"
      >
        <ContrastMatrix onPrefillInquiry={handlePrefillInquiry} />
      </section>

      {/* 7. Section: Live Creative Strategy Planner */}
      <section 
        id="sandbox"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-maven-cream/5 relative z-20 space-y-16"
      >
        <CreativePlanner onPrefillInquiry={handlePrefillInquiry} />
      </section>

      {/* 8. Section: 15-Day Rollout Intake Process */}
      <section 
        id="process"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-maven-cream/5 relative z-20"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3">Our Process</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
            The 15-Day Blueprint Intake
          </h2>
          <p className="text-xs sm:text-sm text-maven-muted mt-2 max-w-xl">
            We work fast using a rigorous, phase-gated execution model to take your custom platforms from raw spec concepts to compiled edge deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <div className="bg-maven-green-light/10 border border-maven-cream/10 p-6 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-lg font-mono text-maven-gold/30 font-bold">01</div>
            <span className="text-[10px] font-mono text-maven-gold tracking-widest uppercase font-bold block mb-1">Days 1 - 3</span>
            <h3 className="text-lg font-serif font-semibold text-maven-cream mb-2">Systems Blueprint</h3>
            <p className="text-[11px] text-maven-muted leading-relaxed font-body">
              Our systems architecture team maps your custom relational databases, schema fields, core REST/tRPC endpoint routes, and integrations matrices.
            </p>
          </div>

          <div className="bg-maven-green-light/10 border border-maven-cream/10 p-6 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-lg font-mono text-maven-gold/30 font-bold">02</div>
            <span className="text-[10px] font-mono text-maven-gold tracking-widest uppercase font-bold block mb-1">Days 4 - 9</span>
            <h3 className="text-lg font-serif font-semibold text-maven-cream mb-2">Creative & Code Sprint</h3>
            <p className="text-[11px] text-maven-muted leading-relaxed font-body">
              Creative heads craft the custom identity and UI systems while engineers construct the compiled monorepo directories and responsive structures.
            </p>
          </div>

          <div className="bg-maven-green-light/10 border border-maven-cream/10 p-6 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-lg font-mono text-maven-gold/30 font-bold">03</div>
            <span className="text-[10px] font-mono text-maven-gold tracking-widest uppercase font-bold block mb-1">Days 10 - 12</span>
            <h3 className="text-lg font-serif font-semibold text-maven-cream mb-2">Automation Sync</h3>
            <p className="text-[11px] text-maven-muted leading-relaxed font-body">
              We link WhatsApp Business templates, configure webhooks processors, and synchronize proprietary POS terminals or hardware layers.
            </p>
          </div>

          <div className="bg-maven-green-light/10 border border-maven-cream/10 p-6 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-lg font-mono text-maven-gold/30 font-bold">04</div>
            <span className="text-[10px] font-mono text-maven-gold tracking-widest uppercase font-bold block mb-1">Days 13 - 15</span>
            <h3 className="text-lg font-serif font-semibold text-maven-cream mb-2">Pilot Intake Deployment</h3>
            <p className="text-[11px] text-maven-muted leading-relaxed font-body">
              We execute final edge network deployment checks, trigger initial database syncs, and officially launch your custom platform pipelines.
            </p>
          </div>

        </div>
      </section>

      {/* 9. Section: Lead Capture Portal (Custom Inquiry Form) */}
      <section 
        id="inquire"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 border-t border-maven-cream/5 relative z-20"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3">Studio Intake</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-maven-cream">
            Begin Your Systems Spec Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-maven-muted mt-2 max-w-xl">
            Submit your corporate and product requirements logs to secure priority studio intake slots or review custom systems configuration with our builders.
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
                className="space-y-6 text-left"
              >
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 text-xs">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Contact Builder Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Rohan Sen"
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. rohan@enterprise.com"
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Phone (WhatsApp Sync)</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Company Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Amber Enterprises"
                      value={form.companyName}
                      onChange={(e) => setForm(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="inquiryType" className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Inquiry System Vertical</label>
                    <select 
                      id="inquiryType"
                      value={form.inquiryType}
                      onChange={(e) => setForm(prev => ({ ...prev, inquiryType: e.target.value as any }))}
                      className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream px-4 py-3 rounded-xl focus:outline-none transition-all text-sm select-custom"
                    >
                      <option value="Custom Multi-Vertical Systems">Custom Multi-Vertical Systems</option>
                      <option value="Flagship Hospitality OS">Hearth Hospitality OS (Flagship)</option>
                      <option value="Schools & Institutions Setup">Schools & Institutions Setup</option>
                      <option value="Salon/Wellness Sync Slots">Salon/Wellness Sync Slots</option>
                      <option value="Real Estate Lead Nurturing">Real Estate Lead Nurturing</option>
                      <option value="Gyms & Fitness Automations">Gyms & Fitness Automations</option>
                      <option value="Coaching/Tutorial Centre Setup">Coaching/Tutorial Centre Setup</option>
                      <option value="Custom Creative Strategy">Custom Creative Strategy</option>
                    </select>
                  </div>

                  <div className="hidden sm:block" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex">Custom Specifications Notes (Optional)</label>
                  <textarea 
                    placeholder="Provide details about your required monorepo architecture, design token styles, database requirements, or rollout timeline goals..."
                    value={form.notes}
                    onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-5 bg-maven-gold text-maven-green-dark font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 hover:bg-maven-cream hover:text-maven-green-dark flex items-center justify-center gap-2 group disabled:opacity-50 focus:outline-none"
                >
                  {formSubmitting ? (
                    <div className="h-4 w-4 border-2 border-maven-green-dark/30 border-t-maven-green-dark rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Blueprint Spec Inquiry</span>
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
                  <h3 className="text-2xl font-serif text-maven-cream font-bold">Blueprint Specs Logged!</h3>
                  <p className="text-xs text-maven-muted max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{form.name}</strong>. We have logged <strong>{form.companyName}</strong> under our active systems intake slots list. A senior builder from our team will sync with you via WhatsApp at <strong>{form.phone}</strong> shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. Corporate Minimal Footer */}
      <footer className="border-t border-maven-cream/5 py-16 bg-maven-green-dark/80 relative z-20 text-center text-xs text-maven-muted font-mono tracking-wider">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-8">
          <Logo variant="full" size="md" className="mb-2" />
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-maven-cream/5 pt-8">
            <span>&copy; {new Date().getFullYear()} MAVEN & CO. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/hospitality" className="hover:text-maven-gold transition-colors duration-300">Hearth Hospitality OS</Link>
              <span className="text-maven-cream/10">|</span>
              <Link href="/dashboard/login" className="hover:text-maven-gold transition-colors duration-300">Partner Login</Link>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-maven-gold fill-maven-gold animate-pulse" />
              <span>for custom enterprises</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
