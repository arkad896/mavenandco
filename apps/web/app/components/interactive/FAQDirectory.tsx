'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'marketing' | 'pos' | 'pricing' | 'support';
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'marketing',
      question: 'Do you manage Meta Business Manager advertising accounts directly, or do we create our own?',
      answer: 'We set up and manage your campaigns inside your official Meta Business Manager. Your brand retains 100% ownership of your pixel data, custom audiences, and ad accounts. We configure hyper-local radiuses and continuous A/B creative testing to maximize bookings.'
    },
    {
      id: 'faq-2',
      category: 'pos',
      question: 'Can I keep my existing Petpooja or POSist hardware, or do I need to buy new terminal screens?',
      answer: 'You do NOT need to buy new hardware. The Maven Point of Sale (POS) is built on open web protocols and runs flawlessly on any tablet, desktop, or legacy terminal screen. We sync your existing recipe lists and menu catalogs in under 24 hours.'
    },
    {
      id: 'faq-3',
      category: 'pricing',
      question: 'Are there any hidden transaction commissions, setup fees, or percentage aggregator lock-ins?',
      answer: 'Zero hidden fees. We charge a flat monthly subscription. While standard aggregators charge 20%+ commission on every direct table booking or delivery, Maven charges 0% commission. You keep 100% of your customer order value.'
    },
    {
      id: 'faq-4',
      category: 'support',
      question: 'What level of daily technical support and account management is included in the OS subscription?',
      answer: 'Every client gets a dedicated Operations Lead and 24/7 priority WhatsApp support. If a ticket printer goes offline in the kitchen or a POS sync lags, our team handles it instantly. Enterprise clients also get bi-weekly food photography shoots and premium creative refreshes.'
    },
    {
      id: 'faq-5',
      category: 'marketing',
      question: 'How does the WhatsApp Business API automation prevent numbers from being marked as spam?',
      answer: 'We utilize Meta’s official verified WhatsApp Business Cloud API. We enforce mandatory opt-in checkpoints during order placements and table bookings. All promotional broadcasts are targeted strictly to active CRM VIP lists, maintaining high sender scores.'
    },
    {
      id: 'faq-6',
      category: 'pos',
      question: 'Does the real-time ingredient inventory decrement work for complex multi-brand cloud kitchens?',
      answer: 'Yes! Our inventory engine supports multi-level recipe dependencies. Tapping "Order Burrata Salad" automatically deducts exact quantities of burrata cheese, olive oil, and herbs across multiple brands sharing the same central inventory hub.'
    },
    {
      id: 'faq-7',
      category: 'pricing',
      question: 'Can we pause or scale down the marketing package during our off-season restaurant months?',
      answer: 'Absolutely. We offer flexible month-to-month contracts. You can scale down marketing campaigns during low-footfall months while keeping your core POS billing, WhatsApp concierge, and CRM loyalty programs active at a basic operational flat fee.'
    },
    {
      id: 'faq-8',
      category: 'support',
      question: 'How long does the transition from our legacy tools to the Maven Operating System take?',
      answer: 'The full setup and migration takes exactly 15 days. We build your landing pages, configure local ad radiuses, sync your POS recipes, and train your staff table-side without a single minute of venue downtime.'
    }
  ];

interface FAQDirectoryProps {
  onPrefillInquiry: (note: string) => void;
}

export default function FAQDirectory({ onPrefillInquiry }: FAQDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Client-side category filtering and instant text search
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleFAQToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleFAQPrefill = () => {
    onPrefillInquiry(`FAQ inquiry: Still have custom hardware/pricing queries. Looking to discuss direct transitions and POS mapping scopes. Please schedule a call.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* FAQ Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            MAVEN KNOWLEDGE INDEX
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Frequently Answered Objections
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Filter by topic or type an instant search keyword to clear doubts about recipe stocks, paid ads, terminal integrations, and billing limits.
          </p>
        </div>
      </div>

      {/* Controls: Search Bar and Category Selectors */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        {/* Category segment selectors */}
        <div className="flex flex-wrap gap-2 bg-maven-green-dark/40 p-1 rounded-xl border border-maven-cream/5 self-start">
          {['all', 'marketing', 'pos', 'pricing', 'support'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedIndex(null); // Reset accordions on category switch
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-maven-gold text-maven-green-dark font-bold'
                  : 'text-maven-muted hover:text-maven-cream'
              }`}
            >
              {cat === 'pos' ? 'POS & Hardware' : cat === 'pricing' ? 'Pricing & Billing' : cat}
            </button>
          ))}
        </div>

        {/* Live Search Bar */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search questions or terms..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedIndex(null); // Reset accordions on search
            }}
            className="w-full bg-maven-green-dark border border-maven-gold/20 focus:border-maven-gold text-maven-cream placeholder-maven-muted/65 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none transition-all text-xs font-mono"
          />
          <Search className="w-3.5 h-3.5 text-maven-muted/80 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Expandable Accordion Rows */}
      <div className="space-y-3 mb-8">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`border border-maven-cream/5 rounded-2xl overflow-hidden transition-colors duration-300 ${
                    isExpanded ? 'bg-maven-green-dark/40 border-maven-gold/30' : 'bg-maven-green-dark/10 hover:bg-maven-green-dark/20'
                  }`}
                >
                  {/* Accordion Trigger Toggle */}
                  <button
                    onClick={() => handleFAQToggle(index)}
                    className="w-full flex items-center justify-between text-left p-5 focus:outline-none"
                  >
                    <div className="flex gap-3 items-center">
                      <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                        isExpanded ? 'text-maven-gold' : 'text-maven-muted'
                      }`} />
                      <span className="text-xs sm:text-sm font-semibold text-maven-cream font-sans">{faq.question}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-maven-muted transition-transform duration-300 ${
                      isExpanded ? 'rotate-90 text-maven-gold' : ''
                    }`} />
                  </button>

                  {/* Expandable Panel Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-maven-cream/5 text-xs sm:text-xs text-maven-muted leading-relaxed font-body">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-maven-green-dark/20 border border-dashed border-maven-cream/5 rounded-2xl space-y-3"
            >
              <Info className="w-8 h-8 text-maven-muted/70 mx-auto" />
              <p className="text-xs text-maven-muted">No specific knowledge cards found matching &quot;{searchQuery}&quot;. Try filters or clear search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Objections / Integrations CTA */}
      <div className="bg-maven-gold/10 border border-maven-gold/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-maven-gold">Still have custom setup queries?</span>
            <span className="text-[10px] text-maven-muted">Have unique recipe lists, POS terminals, or multi-branch requirements? Ask our architecture team directly.</span>
          </div>
        </div>
        <button
          onClick={handleFAQPrefill}
          className="flex items-center gap-1.5 px-5 py-3 bg-maven-gold text-maven-green-dark hover:bg-maven-cream font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
        >
          <span>Prefill Integration Queries</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
