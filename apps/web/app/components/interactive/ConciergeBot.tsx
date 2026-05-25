'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  Star, 
  Check, 
  CheckCheck,
  ChevronRight,
  Award
} from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  card?: {
    title: string;
    description: string;
    image: string;
    rating: string;
    price: string;
    tags: string[];
  };
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ConciergeBotProps {
  onPrefillInquiry: (note: string) => void;
}

export default function ConciergeBot({ onPrefillInquiry }: ConciergeBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<'idle' | 'cafe' | 'dish' | 'resort'>('idle');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios = {
    cafe: {
      userQuery: "find me a bougainvillea themed cafe in South Kolkata under ₹500",
      botReply: "I've scanned our partner network and found a perfect match in South Kolkata:",
      card: {
        title: "The Amber Pavilion",
        description: "Stunning bougainvillea glasshouse themed dining, specialized in premium custom frappes and fresh tag dishes.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop",
        rating: "4.8★",
        price: "Avg cost: ₹450 for two",
        tags: ["South Kolkata", "Instagrammable", "Frappes"]
      },
      userFollowUp: "looks beautiful! can i book a table for 2 tonight at 8 PM?",
      botConfirmation: "Perfect. A table for 2 is reserved under your name at **The Amber Pavilion** tonight at 8:00 PM. I've dispatched a digital confirmation receipt and fast menu mapping directly to your WhatsApp! 🎟️"
    },
    dish: {
      userQuery: "which restaurant serves the best truffle tagliolini in the city?",
      botReply: "Our system matches dish-specific reviews instantly. Here is the highest-rated spot in the city:",
      card: {
        title: "L'Opera Bistro",
        description: "Custom fine-dining vertical. Hand-rolled tagliolini, imported black truffle, whipped butter emulsion.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop",
        rating: "4.9★",
        price: "Avg cost: ₹900 for two",
        tags: ["Salt Lake", "Fine Dining", "Pasta"]
      },
      userFollowUp: "book a slot for 4 people this Sunday at 1 PM",
      botConfirmation: "Booking confirmed! Table for 4 logged at **L'Opera Bistro** this Sunday at 1:00 PM. Direct recipe-level seating holds have been applied. See you then! 🍝"
    },
    resort: {
      userQuery: "recommend a luxury weekend getaway resort with a pool under ₹8,000",
      botReply: "I've scanned our partner network and found a gorgeous boutique resort getaway for you:",
      card: {
        title: "The Whispering Palms Resort",
        description: "Premium boutique resort. Lush tropical gardens, infinity swimming pool, and custom dining suites.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop",
        rating: "4.7★",
        price: "Rooms from ₹5,500/night",
        tags: ["Vedic Village", "Boutique", "Infinity Pool"]
      },
      userFollowUp: "looks incredible! reserve a premium garden room for this Saturday",
      botConfirmation: "Booking confirmed! A premium garden room is locked at **The Whispering Palms Resort** for this Saturday. Your confirmation receipt and digital check-in details have been dispatched to your WhatsApp! 🌴"
    }
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Hi there! 🌟 I'm Kolkata Eats. I act as your personal dining and lifestyle concierge. Send me any query in natural language — dishes, aesthetic themes, budget limits, or locations — and I'll find you perfect bookable recommendations from our partner network. Try clicking one of the prompts below!",
        timestamp: "Just Now"
      }
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const runScenario = (type: 'cafe' | 'dish' | 'resort') => {
    if (isTyping || currentScenario !== 'idle') return;
    setCurrentScenario(type);
    const scen = scenarios[type];

    // 1. User Message Dispatched
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'user',
        text: scen.userQuery,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }
    ]);

    // 2. Bot Typing & replying
    setTimeout(() => {
      setIsTyping(true);
    }, 800);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: scen.botReply,
          card: scen.card,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2800);

    // 3. User Follow up Typing
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'user',
          text: scen.userFollowUp,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }
      ]);
    }, 4500);

    // 4. Bot confirmation typing
    setTimeout(() => {
      setIsTyping(true);
    }, 5500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: scen.botConfirmation,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setCurrentScenario('idle'); // Allow new simulation
    }, 8000);
  };

  const resetChat = () => {
    setIsTyping(false);
    setCurrentScenario('idle');
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "System refreshed. Ask me anything! Send me queries based on aesthetic desires, budgets, locations, or service blocks.",
        timestamp: "Just Now"
      }
    ]);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Explanatory Content */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="text-xs font-mono tracking-widest text-maven-gold uppercase font-bold border border-maven-gold/25 bg-maven-gold/10 px-3 py-1.5 rounded-full inline-block">
            KOLKATA EATS
          </span>
          
          <h3 className="text-3xl sm:text-4xl font-serif text-maven-cream font-medium tracking-tight">
            City-Wide WhatsApp Discovery & Booking Network
          </h3>
          
          <p className="text-xs sm:text-sm text-maven-muted leading-relaxed">
            Every dining and lifestyle business inside the Maven monorepo ecosystem is automatically listed in the **Kolkata Eats Network**. This city-wide WhatsApp concierge lets users search for restaurants, cafes, and boutique getaways through natural language queries.
          </p>

          <div className="space-y-3 font-mono text-[10px] text-maven-cream">
            <div className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-maven-gold shrink-0 mt-0.5" />
              <span><strong>Understand Aesthetics:</strong> Bot processes queries like "bougainvillea glasshouse" or "cozy dim-lit corner".</span>
            </div>
            <div className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-maven-gold shrink-0 mt-0.5" />
              <span><strong>Selected Matchmaking:</strong> Recommendations are filtered by budget constraints, live locations, and ratings.</span>
            </div>
            <div className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-maven-gold shrink-0 mt-0.5" />
              <span><strong>Instant Reservations:</strong> Complete direct table booking or appointment slots inside the chat window.</span>
            </div>
          </div>

          <div className="border-t border-maven-cream/10 pt-4 space-y-2">
            <span className="text-[9px] font-mono text-maven-gold uppercase font-bold tracking-wider block">Interactive Scenarios:</span>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => runScenario('cafe')}
                disabled={currentScenario !== 'idle' || isTyping}
                className="text-left text-xs font-mono text-maven-cream hover:text-maven-gold border border-maven-cream/5 hover:border-maven-gold/30 bg-maven-green-light/5 p-2 rounded-xl transition-all focus:outline-none flex justify-between items-center"
              >
                <span>1. "find me a bougainvillea themed cafe..."</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => runScenario('dish')}
                disabled={currentScenario !== 'idle' || isTyping}
                className="text-left text-xs font-mono text-maven-cream hover:text-maven-gold border border-maven-cream/5 hover:border-maven-gold/30 bg-maven-green-light/5 p-2 rounded-xl transition-all focus:outline-none flex justify-between items-center"
              >
                <span>2. "best truffle tagliolini in the city..."</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => runScenario('resort')}
                disabled={currentScenario !== 'idle' || isTyping}
                className="text-left text-xs font-mono text-maven-cream hover:text-maven-gold border border-maven-cream/5 hover:border-maven-gold/30 bg-maven-green-light/5 p-2 rounded-xl transition-all focus:outline-none flex justify-between items-center"
              >
                <span>3. "weekend getaway resort with a pool..."</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-start">
            <button 
              onClick={() => {
                resetChat();
                onPrefillInquiry('Requested custom briefing regarding Kolkata Eats network inclusions.');
              }}
              className="text-[9px] font-mono uppercase text-maven-muted hover:text-maven-gold flex items-center gap-1.5 focus:outline-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Reset Concierge Chat
            </button>
          </div>
        </div>

        {/* Right Side: High Fidelity WhatsApp phone simulator */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-4 shadow-2xl relative w-full max-w-[340px] overflow-hidden flex flex-col justify-between h-[520px]">
            
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-maven-green-light/30 border border-maven-cream/5 mx-auto rounded-full mb-3 flex items-center justify-center pointer-events-none shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-maven-green-dark" />
            </div>

            {/* WA Header */}
            <div className="flex justify-between items-center border-b border-maven-cream/10 pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-maven-gold text-maven-green-dark font-serif font-bold text-sm flex items-center justify-center">
                  K
                </div>
                <div className="text-left">
                  <span className="block text-xs font-mono font-bold text-maven-cream flex items-center gap-1">
                    Kolkata Eats
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-maven-green-dark flex items-center justify-center text-[6px] text-maven-green font-bold leading-none shrink-0" title="Meta Verified">✓</span>
                  </span>
                  <span className="block text-[8px] font-mono text-emerald-400 leading-none">Online</span>
                </div>
              </div>
              <div className="text-[9px] font-mono text-maven-cream/80 uppercase font-bold">Meta Bot Node</div>
            </div>

            {/* Messages Screen Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin select-text p-1"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed text-left ${
                      msg.sender === 'user' 
                        ? 'bg-maven-gold text-maven-green-dark font-semibold rounded-tr-none' 
                        : 'bg-maven-green-light/20 border border-maven-cream/5 text-maven-cream rounded-tl-none'
                    }`}>
                      {msg.text}

                      {/* Display Selected Card recommendation */}
                      {msg.card && (
                        <div className="mt-3 border border-maven-gold/25 bg-maven-green-dark/90 rounded-xl overflow-hidden shadow-lg text-maven-cream text-[10px]">
                          <div 
                            className="w-full h-24 bg-cover bg-center"
                            style={{ backgroundImage: `url('${msg.card.image}')` }}
                          />
                          <div className="p-3 space-y-2 text-left">
                            <div className="flex justify-between items-center font-serif text-xs font-bold">
                              <span>{msg.card.title}</span>
                              <span className="text-maven-gold font-mono flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-maven-gold" />
                                {msg.card.rating}
                              </span>
                            </div>
                            <p className="text-[9px] text-maven-cream/85 leading-relaxed font-sans">{msg.card.description}</p>
                            <div className="flex justify-between items-center border-t border-maven-cream/5 pt-2 text-[8px] font-mono">
                              <span className="text-maven-gold font-bold">{msg.card.price}</span>
                              <div className="flex gap-1">
                                {msg.card.tags.slice(0, 2).map((t, idx) => (
                                  <span key={idx} className="bg-maven-green-light/20 border border-maven-cream/10 px-1.5 py-0.5 rounded text-maven-cream/90">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[8px] font-mono text-maven-cream/70 mt-1 select-none">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'user' && (
                        <CheckCheck className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    key="typing-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mr-auto bg-maven-green-light/10 border border-maven-cream/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center select-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* WA Input */}
            <div className="border-t border-maven-cream/10 pt-3 mt-3 flex items-center gap-2 shrink-0 select-none">
              <div className="flex-1 bg-maven-green-light/10 border border-maven-cream/5 px-4 py-2.5 rounded-full text-[11px] text-left text-maven-cream/80 font-mono flex justify-between items-center pointer-events-none">
                <span>WhatsApp text inputs...</span>
                <Award className="w-3.5 h-3.5 text-maven-gold/50" />
              </div>
              <div className="w-9 h-9 rounded-full bg-maven-gold text-maven-green-dark flex items-center justify-center pointer-events-none">
                <Send className="w-4 h-4 fill-maven-green-dark" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
