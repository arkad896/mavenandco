'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  HelpCircle, 
  TrendingDown, 
  AlertTriangle,
  Award
} from 'lucide-react';

interface ContrastDimension {
  name: string;
  scope: string;
  maven: { status: 'check' | 'cross' | 'text'; value: string };
  agency: { status: 'check' | 'cross' | 'text'; value: string };
  saas: { status: 'check' | 'cross' | 'text'; value: string };
  aggregators: { status: 'check' | 'cross' | 'text'; value: string };
}

interface ContrastMatrixProps {
  onPrefillInquiry: (note: string) => void;
}

export default function ContrastMatrix({ onPrefillInquiry }: ContrastMatrixProps) {
  const [activeCell, setActiveCell] = useState<string | null>(null);

  const dimensions: ContrastDimension[] = [
    {
      name: "Core Business Model",
      scope: "Pricing stability & revenue retainment",
      maven: { status: 'check', value: "Flat monthly fee (₹20,999/mo). Zero commission slots." },
      agency: { status: 'text', value: "High retainer fees + ad budget percentage overheads." },
      saas: { status: 'text', value: "Multiple fragmented software subscriptions." },
      aggregators: { status: 'cross', value: "Heavy 20% to 30% transaction commission cuts." }
    },
    {
      name: "Operational Burden",
      scope: "Software operations & campaign management",
      maven: { status: 'check', value: "White-glove fully managed service. Zero client work." },
      agency: { status: 'text', value: "Requires client approvals & asset assets coordinate." },
      saas: { status: 'cross', value: "Client has to log in, build, and maintain the tools." },
      aggregators: { status: 'text', value: "Client must upload data & reconcile menu changes." }
    },
    {
      name: "Systems Integration",
      scope: "API synchronization & data coordination",
      maven: { status: 'check', value: "Custom coordinated monorepo. Direct KDS/CRM sync." },
      agency: { status: 'cross', value: "Marketing only. No connection with POS or inventory." },
      saas: { status: 'cross', value: "Disconnected tools. No natural language routing." },
      aggregators: { status: 'cross', value: "Closed silos. Customer details are withheld." }
    },
    {
      name: "Customer Data Ownership",
      scope: "User profiles & database controls",
      maven: { status: 'check', value: "100% permanent client data ownership." },
      agency: { status: 'text', value: "Ownership varies based on agency contracts." },
      saas: { status: 'check', value: "Client owns databases but must pull logs manually." },
      aggregators: { status: 'cross', value: "Aggregators own customer data and guest access." }
    },
    {
      name: "Integrated Scope",
      scope: "Deliverables bundle and technology footprint",
      maven: { status: 'check', value: "Marketing + Web + WhatsApp API + POS + CRM Loyalty." },
      agency: { status: 'cross', value: "Organic & paid ad content only." },
      saas: { status: 'cross', value: "Fragmented software features per tool." },
      aggregators: { status: 'cross', value: "Order/listing channel booking only." }
    }
  ];

  const renderStatus = (cell: ContrastDimension['maven'], type: string) => {
    if (cell.status === 'check') {
      return (
        <div className="flex flex-col items-center gap-1.5 text-center p-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[10px] font-semibold text-maven-cream leading-tight">{cell.value}</span>
        </div>
      );
    } else if (cell.status === 'cross') {
      return (
        <div className="flex flex-col items-center gap-1.5 text-center p-2 opacity-50">
          <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[10px] text-maven-cream/85 leading-tight">{cell.value}</span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center gap-1.5 text-center p-2 opacity-75">
          <div className="w-6 h-6 rounded-full bg-maven-gold/10 border border-maven-gold/30 flex items-center justify-center text-maven-gold">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] text-maven-cream/85 leading-tight">{cell.value}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-cream/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3 block">Structural Superiority</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-maven-cream font-medium leading-tight">
          Why Maven Beats The Stack
        </h2>
        <p className="text-xs sm:text-sm text-maven-cream/85 mt-2">
          Traditional vendors address only isolated sectors of your business. Maven coordinates your entire digital and operational stack in one white-glove flat fee.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-maven-cream/10 rounded-2xl bg-maven-green-dark/45 scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          
          {/* Table Head */}
          <thead>
            <tr className="border-b border-maven-cream/10 font-mono text-[9px] text-maven-gold uppercase tracking-wider bg-maven-green-dark">
              <th className="p-4 sm:p-5 w-[22%]">Telemetry Comparison</th>
              <th className="p-4 sm:p-5 w-[22%] border-l border-maven-cream/5 bg-maven-gold/5 text-maven-gold relative">
                <div className="absolute top-0 left-0 right-0 bg-maven-gold text-maven-green-dark text-[7px] text-center font-bold tracking-widest py-0.5 uppercase">RECOMMENDED</div>
                <div className="flex items-center gap-1.5 justify-center pt-2">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>The Maven Way</span>
                </div>
              </th>
              <th className="p-4 sm:p-5 w-[18%] border-l border-maven-cream/5 text-center">Marketing Agency</th>
              <th className="p-4 sm:p-5 w-[18%] border-l border-maven-cream/5 text-center">Standalone SaaS</th>
              <th className="p-4 sm:p-5 w-[20%] border-l border-maven-cream/5 text-center">Aggregators</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-maven-cream/5 font-sans">
            {dimensions.map((dim, idx) => (
              <tr key={idx} className="hover:bg-maven-green-light/5 transition-colors">
                
                {/* Dimension label */}
                <td className="p-4 sm:p-5 text-left space-y-1">
                  <span className="block text-xs font-mono font-bold text-maven-cream leading-tight">{dim.name}</span>
                  <span className="block text-[8px] font-mono text-maven-cream/70 uppercase leading-none">{dim.scope}</span>
                </td>

                {/* Maven value */}
                <td className="p-4 sm:p-5 border-l border-maven-cream/5 bg-maven-gold/5 text-center font-mono">
                  {renderStatus(dim.maven, 'maven')}
                </td>

                {/* Agency value */}
                <td className="p-4 sm:p-5 border-l border-maven-cream/5 text-center font-mono">
                  {renderStatus(dim.agency, 'agency')}
                </td>

                {/* SaaS value */}
                <td className="p-4 sm:p-5 border-l border-maven-cream/5 text-center font-mono">
                  {renderStatus(dim.saas, 'saas')}
                </td>

                {/* Aggregator value */}
                <td className="p-4 sm:p-5 border-l border-maven-cream/5 text-center font-mono">
                  {renderStatus(dim.aggregators, 'aggregators')}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ROI Box */}
      <div className="mt-8 bg-maven-gold/5 border border-maven-gold/30 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[9px] font-mono text-maven-gold uppercase tracking-wider font-bold">Guaranteed Cost Efficiency</span>
            <p className="text-xs sm:text-sm text-maven-cream/90 font-medium leading-relaxed mt-0.5 max-w-2xl">
              Retain 100% of your transaction amounts. Avoid losing 25% to food aggregators, appointment brokers, or listing platforms. Retain absolute customer data.
            </p>
          </div>
        </div>
        <button
          onClick={() => onPrefillInquiry('Requested comparison analysis regarding SaaS/Agency replacement.')}
          className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all focus:outline-none shrink-0"
        >
          Compare Stack Costs
        </button>
      </div>

    </div>
  );
}
