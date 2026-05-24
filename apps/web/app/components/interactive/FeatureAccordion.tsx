'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, BookOpen, Cpu, Terminal, Compass } from 'lucide-react';

interface FeatureAccordionProps {
  onPrefillInquiry: (note: string) => void;
}

export default function FeatureAccordion({ onPrefillInquiry }: FeatureAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<'marketing' | 'crm' | 'kitchen'>('marketing');
  const [openItem, setOpenItem] = useState<number | null>(0);

  const categories = {
    marketing: {
      label: '1. Paid Ads & SEO',
      icon: Compass,
      title: 'Hyper-Local Marketing Specs',
      items: [
        {
          title: 'Dynamic Radius Geotargeting',
          tagline: 'Pinpoint guests within 3.5km of your restaurant doors.',
          description: 'Standard agencies target whole cities, wasting budget. Maven targets specific sectors, residential complexes, and tech hubs within dining distance, raising click-to-footfall rates by 4.2x.',
          specs: ['Meta Custom Audience API integrations', 'Zip-code & radius boundary exclusions', 'Continuous retargeting matching lookalike curves']
        },
        {
          title: 'Continuous A/B Copy Tests',
          tagline: 'Evaluating visual styles and CTAs across 12 variations.',
          description: 'We test multiple creative combinations (reels-style videos vs static carousels) alongside unique copywriting angles to optimize cost-per-click automatically.',
          specs: ['Dynamic creative optimizations (DCO)', 'Weekly asset rotation triggers', 'Budget reallocation to winning variations']
        },
        {
          title: 'Google Maps Rank Booster',
          tagline: 'Securing top-3 search visibility for local food searches.',
          description: 'We manage and optimize your Google Business Profiles, automate guest review generation, and embed local schema markup to push you to the top of Google Maps search results.',
          specs: ['Local business JSON-LD schema inserts', 'Review solicitation automation integration', 'Keyword audits tailored to local cuisine searches']
        }
      ]
    },
    crm: {
      label: '2. WhatsApp CRM',
      icon: Terminal,
      title: 'Conversational Automation Specs',
      items: [
        {
          title: 'Meta Verified Opt-In Engine',
          tagline: 'GDPR-compliant contact list building with 94% open rates.',
          description: 'Build organic communication paths. Guests opt-in smoothly when accessing Table QR menus or using free guest Wi-Fi terminals, letting you build owned, direct databases.',
          specs: ['Meta Cloud API official verification checks', 'GDPR customer data encryption protocols', 'Automated double-opt-in workflows']
        },
        {
          title: 'Automated Checkout Recovery',
          tagline: 'Win back guest orders abandoned during table QR selections.',
          description: 'If a guest scans your table QR, adds items to their cart, and drops off without completing, our system waits 15 minutes before sending a polite WhatsApp prompt with an order link.',
          specs: ['Abandoned cart database session tracking', 'Customized WhatsApp conversational hooks', 'Direct single-tap shopping recovery links']
        },
        {
          title: 'Automated Birthday Win-Backs',
          tagline: 'Turn occasional diners into recurring loyal patrons.',
          description: 'Maven monitors birthdays in your guest CRM. Seven days before their birthday, it dispatches an automated WhatsApp invitation offering a complimentary dessert card for group tables.',
          specs: ['Calendar CRM trigger automation loops', 'Dynamic personal name insertion variables', 'Custom table reservation validation tags']
        }
      ]
    },
    kitchen: {
      label: '3. Kitchen Software',
      icon: Cpu,
      title: 'POS & Back-of-House Systems',
      items: [
        {
          title: 'Real-time Recipe Costing',
          tagline: 'Track raw ingredient cost-per-plate down to the gram.',
          description: 'Link inventory metrics directly to recipe definitions. When a chef bills a Truffle Pasta, the system deducts 150g of pasta flour and 12g of black truffles, tracking plate profitability in real-time.',
          specs: ['Recipe composition ingredient breakdown mapping', 'Plate profit-margin calculation telemetry', 'Real-time raw ingredient price inflation tracking']
        },
        {
          title: 'Low-Stock Predictive Warnings',
          tagline: 'Avoid menu item blackouts during active dinner runs.',
          description: 'Get automated warnings when high-importance raw ingredients fall below emergency thresholds, sending automatic notifications to procurement.',
          specs: ['SMS & email push warning integrations', 'Adjustable stock warning levels', 'Vendor purchase-order sheet autocompletion']
        },
        {
          title: 'Unified Kitchen Displays (KDS)',
          tagline: 'Eliminate printing latency and paper kitchen ticket waste.',
          description: 'Orders flow straight from table QR scans onto gorgeous, high-contrast digital tablet displays in the kitchen, sorting by duration to prevent ticket delays.',
          specs: ['WebSocket low-latency ticket transmissions', 'Time-elapsed warning alert systems', 'Role-based kitchen section routing']
        }
      ]
    }
  };

  const handleToggle = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleDeepDivePrefill = () => {
    onPrefillInquiry(`Requested deep-dive engineering review of category: ${categories[activeCategory].title}`);
  };

  const activeCategoryData = categories[activeCategory];
  const IconHeader = activeCategoryData.icon;

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Engineering Specifications
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Granular Operational Directory
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Explore the exact architecture, database logic, and API workflows that power Maven&apos;s direct guest operating software.
          </p>
        </div>
      </div>

      {/* Layout Grid: Left column category menu, Right column accordion directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Category Toggles (Col-span 4) */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0">
          {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => {
            const cat = categories[key];
            const Icon = cat.icon;
            const isActive = activeCategory === key;

            return (
              <button 
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setOpenItem(0); // Reset accordion to first item
                }}
                className={`flex items-center gap-3 text-left p-4 rounded-xl border transition-all duration-300 flex-shrink-0 lg:flex-shrink w-auto lg:w-full ${
                  isActive 
                    ? 'border-maven-gold bg-maven-green-dark text-maven-gold font-bold shadow' 
                    : 'border-maven-gold/10 bg-maven-green-light/10 text-maven-muted hover:border-maven-gold/30 hover:bg-maven-green-light/15'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Directory Accordion Display (Col-span 8) */}
        <div className="lg:col-span-8 bg-maven-green-dark border border-maven-gold/15 p-6 rounded-2xl flex flex-col justify-between min-h-[380px] shadow-inner">
          <div className="space-y-4">
            
            {/* Folder Header */}
            <div className="flex items-center gap-2 text-maven-gold pb-3 border-b border-maven-cream/10">
              <IconHeader className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest font-bold">
                {activeCategoryData.title}
              </span>
            </div>

            {/* Accordion items */}
            <div className="space-y-3">
              {activeCategoryData.items.map((item, index) => {
                const isOpen = openItem === index;

                return (
                  <div 
                    key={index}
                    className="border border-maven-gold/10 rounded-xl overflow-hidden bg-maven-green-light/5"
                  >
                    <button 
                      onClick={() => handleToggle(index)}
                      className="w-full flex justify-between items-center text-left p-4 focus:outline-none"
                    >
                      <div>
                        <h4 className="text-sm font-serif font-bold text-maven-cream group-hover:text-maven-gold transition-colors">{item.title}</h4>
                        <span className="block text-[9px] font-mono text-maven-gold uppercase mt-0.5">{item.tagline}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-maven-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-maven-cream/5"
                        >
                          <div className="p-4 space-y-4 text-xs">
                            <p className="text-maven-muted leading-relaxed font-sans">
                              {item.description}
                            </p>

                            {/* Bullet specs list */}
                            <div className="bg-maven-green-dark p-3 rounded-lg border border-maven-gold/10 space-y-2">
                              <span className="text-[8px] font-mono text-maven-gold uppercase tracking-wider font-bold">
                                SYSTEM TECH SPECS
                              </span>
                              <div className="space-y-1.5 text-[9px] font-mono text-maven-muted">
                                {item.specs.map((sp, idx) => (
                                  <div key={idx} className="flex gap-1.5 items-start">
                                    <span className="text-maven-gold">•</span>
                                    <span>{sp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Deep-dive button */}
          <div className="pt-6 border-t border-maven-cream/5 mt-6">
            <button 
              onClick={handleDeepDivePrefill}
              className="w-full bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              Request Specs Consultation
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
