'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  CheckCheck, 
  Calendar, 
  Menu, 
  Sparkles, 
  Gift, 
  FileText,
  CircleDot
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  type?: 'text' | 'template_booking' | 'template_menu' | 'template_event';
  templateData?: Record<string, string | undefined>;
}

interface ChatPrompt {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  userMessage: string;
  botResponse: string;
  type: 'template_booking' | 'template_menu' | 'template_event';
  data: Record<string, string>;
}

interface WhatsAppSimulatorProps {
  onPrefillInquiry: (note: string) => void;
}

export default function WhatsAppSimulator({ onPrefillInquiry }: WhatsAppSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Welcome to Kolkata Eats! How can we assist you with Siena Bistro today? ✨',
      time: '12:00 PM',
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const prompts: ChatPrompt[] = [
    {
      label: 'Book a Table',
      icon: Calendar,
      userMessage: 'I want to book a table for 4 guests tonight at 8 PM',
      botResponse: 'Great! Table 04 is open for Siena Bistro tonight. I have pre-secured your reservation. Please review the details below:',
      type: 'template_booking',
      data: { guests: '4', time: '8:00 PM (Tonight)', table: 'Table 04' }
    },
    {
      label: 'Show Special Menu',
      icon: Menu,
      userMessage: 'Show me your current dinner special menu',
      botResponse: 'Here is our selected Autumn Tasting menu. The chef recommends ordering the Truffle Pasta today:',
      type: 'template_menu',
      data: { item1: 'Truffle Tagliolini', price1: '₹790', item2: 'Burrata Salad', price2: '₹690' }
    },
    {
      label: 'Host a Birthday',
      icon: Gift,
      userMessage: 'I want to host a private birthday event for 25 people',
      botResponse: 'Fabulous! We cater private parties of up to 45 guests. I have compiled our package sheets for birthday inquiries:',
      type: 'template_event',
      data: { capacity: '25 Guests', space: 'Private Courtyard', note: 'Includes selected cocktail bar' }
    }
  ];

  const handlePromptClick = (prompt: ChatPrompt) => {
    if (isTyping) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Append User Message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt.userMessage,
      time: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: prompt.botResponse,
        time: timeStr,
        type: prompt.type as 'text' | 'template_booking' | 'template_menu' | 'template_event',
        templateData: prompt.data
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const handleActionPrefill = (service: string) => {
    onPrefillInquiry(`Inquired via WhatsApp Simulator about: ${service}. Please contact me to set up native WhatsApp automation channels.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <CircleDot className="w-3.5 h-3.5" />
            Meta API Sync Tool
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Meta Verified WhatsApp Business Simulator
          </h3>
          <p className="text-xs text-maven-muted mt-1 max-w-xl">
            Click any operational quick-reply button at the bottom of the device to experience the lightning-fast, zero-friction automated customer experience powered by Maven.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Device Wrapper */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[370px] bg-maven-green-dark border-4 border-maven-cream/15 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[520px] relative">
            
            {/* WhatsApp Header */}
            <div className="bg-[#0b141a] px-4 pt-6 pb-3 border-b border-maven-cream/5 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-maven-green-light/20 flex items-center justify-center border border-maven-gold/30">
                  <span className="text-[10px] font-mono text-maven-gold font-bold">K</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-[#0b141a]" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-serif font-bold tracking-wide text-maven-cream">Siena Bistro Concierge</span>
                  {/* Verified checkmark badge */}
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[#0b141a] font-bold text-[8px]" title="Official API">
                    ✓
                  </span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400/90 tracking-wider">verified business account</span>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(#ffffff03 1px, transparent 1px)`,
                backgroundSize: '16px 16px',
                backgroundColor: '#0c100e'
              }}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-maven-gold text-maven-green-dark rounded-tr-none font-medium'
                      : 'bg-[#182229] border border-maven-cream/5 text-maven-cream rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>

                    {/* Meta Booking Template */}
                    {msg.type === 'template_booking' && (
                      <div className="mt-3 bg-maven-green-dark border border-maven-gold/30 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-maven-gold text-[10px] font-mono uppercase font-bold">
                          <Calendar className="w-3 h-3" />
                          <span>Reservation Confirmed</span>
                        </div>
                        <div className="space-y-1 text-[10px] text-maven-muted font-mono leading-none">
                          <div className="flex justify-between">
                            <span>Guests:</span>
                            <span className="text-maven-cream">{msg.templateData?.guests}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="text-maven-cream">{msg.templateData?.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Seat Assigned:</span>
                            <span className="text-maven-gold font-bold">{msg.templateData?.table}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleActionPrefill('WhatsApp Table Reservation Sync')}
                          className="w-full mt-2 py-2 bg-maven-gold text-maven-green-dark font-mono text-[9px] font-bold uppercase rounded-lg text-center"
                        >
                          Confirm & Add to Wallet
                        </button>
                      </div>
                    )}

                    {/* Meta Menu Template */}
                    {msg.type === 'template_menu' && (
                      <div className="mt-3 bg-maven-green-dark border border-maven-gold/30 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-maven-gold text-[10px] font-mono uppercase font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>Chef Specials Today</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] text-maven-muted font-mono">
                          <div className="flex justify-between">
                            <span>{msg.templateData?.item1}</span>
                            <span className="text-maven-gold font-bold">{msg.templateData?.price1}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{msg.templateData?.item2}</span>
                            <span className="text-maven-gold font-bold">{msg.templateData?.price2}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleActionPrefill('WhatsApp Digital Menu Sync')}
                          className="w-full mt-2 py-2 border border-maven-gold/30 hover:border-maven-gold text-maven-gold font-mono text-[9px] font-bold uppercase rounded-lg text-center"
                        >
                          Order Direct via WhatsApp
                        </button>
                      </div>
                    )}

                    {/* Meta Event Template */}
                    {msg.type === 'template_event' && (
                      <div className="mt-3 bg-maven-green-dark border border-maven-gold/30 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-maven-gold text-[10px] font-mono uppercase font-bold">
                          <FileText className="w-3 h-3" />
                          <span>Private Gathering Brochure</span>
                        </div>
                        <div className="space-y-1 text-[10px] text-maven-muted font-mono leading-none">
                          <div className="flex justify-between">
                            <span>Capacity:</span>
                            <span className="text-maven-cream">{msg.templateData?.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Allocated Area:</span>
                            <span className="text-maven-cream">{msg.templateData?.space}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleActionPrefill('WhatsApp Birthday Event Planning')}
                          className="w-full mt-2 py-2 bg-maven-gold text-maven-green-dark font-mono text-[9px] font-bold uppercase rounded-lg text-center"
                        >
                          Prefill Event Quote Form
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-maven-muted px-1">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start mr-auto max-w-[85%]">
                  <div className="p-3.5 bg-[#182229] border border-maven-cream/5 text-maven-cream rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Mock Bottom Input Bar */}
            <div className="bg-[#0b141a] px-4 py-3 border-t border-maven-cream/5 flex items-center gap-2">
              <div className="flex-1 bg-[#1e2a30] rounded-full px-4 py-2 text-xs text-maven-muted font-sans select-none">
                Awaiting client option click...
              </div>
              <div className="w-8 h-8 rounded-full bg-maven-gold flex items-center justify-center text-maven-green-dark">
                <Send className="w-3.5 h-3.5 fill-maven-green-dark stroke-[2.5]" />
              </div>
            </div>

          </div>
        </div>

        {/* Informational Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-maven-gold uppercase font-bold">Integrated CRM Loop</span>
            <h4 className="text-xl font-serif text-maven-cream font-medium">Automated Meta CRM Synced Channels</h4>
            <p className="text-xs text-maven-muted leading-relaxed">
              Standard social agencies only run ads. When someone clicks your Facebook Ad, Maven intercepts the click and launches a verified WhatsApp conversational sequence directly inside their phone.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold">Select Prompt to Test Chat:</span>
            <div className="flex flex-col gap-3">
              {prompts.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <button 
                    key={idx}
                    onClick={() => handlePromptClick(p)}
                    className="flex items-center justify-between text-left p-3.5 bg-maven-green-light/10 border border-maven-gold/15 hover:border-maven-gold/45 rounded-xl hover:bg-maven-green-light/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-maven-gold/10 flex items-center justify-center text-maven-gold group-hover:bg-maven-gold group-hover:text-maven-green-dark transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-maven-cream group-hover:text-maven-gold transition-colors">{p.label}</span>
                    </div>
                    <span className="text-[9px] font-mono text-maven-muted uppercase group-hover:text-maven-cream transition-colors">Test Bot →</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
