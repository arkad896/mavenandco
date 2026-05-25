'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  MessageSquare, 
  Palette, 
  Shuffle, 
  Play, 
  CheckCircle2
} from 'lucide-react';

interface CreativePlannerProps {
  onPrefillInquiry: (note: string) => void;
}

type IndustryType = 'restaurant' | 'school' | 'salon' | 'realestate' | 'gym' | 'coaching';
type ObjectiveType = 'launch' | 'reactivate' | 'acquisition';

interface CampaignDetails {
  adHeadline: string;
  visualIdea: string;
  waCopy: string;
  triggers: string[];
}

interface IndustryConfig {
  id: IndustryType;
  name: string;
  emoji: string;
  paletteName: string;
  brandColors: string[];
  colorNames: string[];
  fonts: string;
  visualImage: string;
  campaigns: Record<ObjectiveType, CampaignDetails>;
}

export default function CreativePlanner({ onPrefillInquiry }: CreativePlannerProps) {
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>('restaurant');
  const [activeObjective, setActiveObjective] = useState<ObjectiveType>('acquisition');
  const [copyCopied, setCopyCopied] = useState<boolean>(false);

  const industries: IndustryConfig[] = [
    {
      id: 'restaurant',
      name: 'Restaurants & Cafes',
      emoji: '🕯️',
      paletteName: 'Tuscan Olive & Gold',
      brandColors: ['#1C4A38', '#C9A84C', '#FDFCF0'],
      colorNames: ['Forest Green', 'Tuscan Gold', 'Warm Cream'],
      fonts: 'Cormorant Garamond (Serif) + Inter (Sans)',
      visualImage: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'Ditch the aggregators. Taste direct.',
          visualIdea: 'Slow-motion macro shot of hand-rolled saffron truffle tagliolini glistening under warm ambient gold bistro lights.',
          waCopy: `Hey {first_name}! 🕯️ We reserved your favorite corner booth for tonight. Tap here to order our signature Truffle Tagliolini direct from our kitchen with 0% markup.`,
          triggers: ['Immediate sensory gratification', '0% platform aggregator markup clarity', 'Frictionless WhatsApp booking loop']
        },
        reactivate: {
          adHeadline: 'We missed you. Corner table reserved.',
          visualIdea: 'Soft ambient steam rising off a freshly prepared clay-pot curry on a rustic wooden table.',
          waCopy: `Hi {first_name}! It's been 30 days since you dined at Amber Pavilion. 🍷 We added a complimentary Chef's Dessert to your profile. Tap here to lock in your table reservation.`,
          triggers: ['Reciprocity (complimentary dessert)', 'Familiar corner table comfort anchor', 'Automated dormant guest reactivation']
        },
        launch: {
          adHeadline: 'Custom culinary craft. Rooted in Bangalore.',
          visualIdea: 'Artisanal chef carefully placing imported black truffles on fresh hand-rolled dough in an open kitchen.',
          waCopy: `Greetings {first_name}! 🧑‍🍳 Meet our executive chef Kabir. Tap here to view our 3-part micro-documentary exploring the rare Himalayan sourcing of our ingredients.`,
          triggers: ['Artisanal pedigree storytelling', 'Rare ingredient raw sourcing prestige', 'Humanizing chef brand authority']
        }
      }
    },
    {
      id: 'school',
      name: 'Premium Academies',
      emoji: '🎓',
      paletteName: 'Heritage Slate & Ivory',
      brandColors: ['#0F2537', '#8FAF95', '#F5F5F0'],
      colorNames: ['Navy Slate', 'Soft Sage', 'Alabaster Ivory'],
      fonts: 'Playfair Display (Serif) + Outfit (Sans)',
      visualImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'A heritage of excellence. Admissions active.',
          visualIdea: 'Morning light cascading across a historic brick campus library, focusing on high-performing students.',
          waCopy: `Dear parent, admissions for the 2026 academic term are now officially active. Tap here to view our digital brochure and book a private campus walk-through with our admissions team on WhatsApp.`,
          triggers: ['Prestigious educational social proof', 'Frictionless parent-to-teacher WhatsApp sync', 'Immediate high-definition prospectus access']
        },
        reactivate: {
          adHeadline: 'Intake queue clearing. Secure your seat.',
          visualIdea: 'Classroom bento grid showing advanced interactive technology boards and laboratory gear.',
          waCopy: `Hello parent! Our systems registered your incomplete admission application for {first_name}. Only 4 seats remain in our primary track. Tap here to instantly schedule your parent interview.`,
          triggers: ['Enrollment timeline scarcity', 'Direct conversational queue bypass', 'Automated incomplete lead recapture']
        },
        launch: {
          adHeadline: 'Cultivating leadership for tomorrow.',
          visualIdea: 'Students participating in clean energy robotics trials inside a state-of-the-art modern lab.',
          waCopy: `Dear parent, explore the academic philosophy behind Heritage Academy. Tap here to watch our 15-day student transition video, detailing our advanced STEM methodologies.`,
          triggers: ['Future-oriented curriculum authority', 'STEM physical facility prestige', 'Transparent academic methodology']
        }
      }
    },
    {
      id: 'salon',
      name: 'Wellness & Salons',
      emoji: '✨',
      paletteName: 'Espresso Rose & Copper',
      brandColors: ['#2A1B18', '#E8C97A', '#FAF5F0'],
      colorNames: ['Deep Espresso', 'Rose Copper', 'Soft Blush'],
      fonts: 'Syne (Display) + DM Sans (Sans)',
      visualImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'Your signature transformation. Reserve Kabir.',
          visualIdea: 'High-contrast cinematic transformation reel of a stylist sculpting high-end highlights reflecting blush studio lighting.',
          waCopy: `Hello {first_name}! ✨ It has been exactly 4 weeks since your last blowout. Our master stylist Kabir has 3 open slots this Saturday. Tap here to instantly reserve yours.`,
          triggers: ['Automated timeline booking urgency', 'Stylist portfolio prestige triggers', 'One-click calendar slot lock-in']
        },
        reactivate: {
          adHeadline: 'Recapture your glow. Comp slot reserved.',
          visualIdea: 'Inviting spa sanctuary setup with glowing basalt stone layout, eucalyptus oil diffusers, and warm linen.',
          waCopy: `Hey {first_name}! We haven't seen you in 6 weeks. 🌿 We added a complimentary Ayurvedic Head Therapy session to your profile. Tap here to instantly sync with stylist schedules.`,
          triggers: ['Complimentary high-value therapy bonus', 'Personalized stylist calendar slotting', 'Visual sanctuary relaxation cues']
        },
        launch: {
          adHeadline: 'Crafting organic wellness. Clean blends.',
          visualIdea: 'A close-up of organic lavender and custom cold-pressed essential oils being formulated in glass jars.',
          waCopy: `Welcome {first_name}! 🌿 Meet our master stylist team. Tap here to view our raw material sourcing guidelines and preview our signature plant-based product lines.`,
          triggers: ['Clean green-chemical authority', 'Raw custom wellness formulation', 'Staff-level expertise storytelling']
        }
      }
    },
    {
      id: 'realestate',
      name: 'Luxury Residences',
      emoji: '🏙️',
      paletteName: 'Custom Onyx & Sand',
      brandColors: ['#111111', '#D4AF37', '#ECE6D9'],
      colorNames: ['Pure Obsidian', 'Antique Bronze', 'Warm Sand'],
      fonts: 'Cinzel (Serif) + Montserrat (Sans)',
      visualImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'Architectural poetry. 3-BHK luxury suites.',
          visualIdea: 'Golden hour drone sweep of an expansive glass-paneled infinity terrace overlooking the urban cityscape.',
          waCopy: `Welcome {first_name}! 🏙️ We just released the high-resolution vector floor plans for Tower C at Amber Residences. Tap here to instantly download them and coordinate a private site visit.`,
          triggers: ['Exclusive high-value digital asset scarcity', 'Instant vector schematic distribution', 'High-end aesthetic positioning']
        },
        reactivate: {
          adHeadline: 'Phase 1 selling out. Lock current pricing.',
          visualIdea: 'Gleaming scale model of a luxury estate highlighted under architectural studio lights.',
          waCopy: `Hi {first_name}! We are closing Phase 1 pre-launch pricing this Sunday. Only 3 units override our upcoming ₹14L rate increase. Tap here to reserve your price guarantee lock.`,
          triggers: ['Fears of missing out (price hikes)', 'Price guarantee direct lock-in', 'Pre-launch inventory scarcity']
        },
        launch: {
          adHeadline: 'Redefining structural heights. The vision.',
          visualIdea: 'Architectural blueprint overlays fading into a modern rendered glass skybridge facade.',
          waCopy: `Greetings {first_name}! 🏗️ Explore the blueprint engineering behind Amber Residences. Tap here to watch our principal architect discuss our earthquake-resilient foundation design.`,
          triggers: ['High-authority engineering blueprints', 'Structural safety reassurance logs', 'Creator architect prestige']
        }
      }
    },
    {
      id: 'gym',
      name: 'Fitness Studios',
      emoji: '💪',
      paletteName: 'Monochrome Acid Steel',
      brandColors: ['#050505', '#D2FA64', '#ECECEC'],
      colorNames: ['Deep Charcoal', 'Acid Lime', 'Concrete Grey'],
      fonts: 'Space Grotesk (Display) + Plus Jakarta Sans',
      visualImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'Refine your thresholds. 14-day trial active.',
          visualIdea: 'Dynamic black-and-white high-contrast shot of a runner breathing in a minimalist concrete industrial gym.',
          waCopy: `Hey {first_name}! 💪 Your trial membership is verified. Our engines logged your interest in Strength & Conditioning. Tap here to instantly book your morning orientation slot.`,
          triggers: ['Immediate digital orientation reservation', 'High-contrast athletic focus', '14-day friction-free active testing']
        },
        reactivate: {
          adHeadline: 'Commitment calls. Comp personal coach pass.',
          visualIdea: 'Focus shot of hands chalking up, preparing to lift a heavy steel barbell in cinematic shadow.',
          waCopy: `Hey {first_name}! 💪 We noticed you haven't checked in for 10 days. We loaded a complimentary 1-on-1 private conditioning session into your profile. Tap here to book your coach.`,
          triggers: ['Loss aversion (comp session expires)', 'Frictionless coach booking grid', 'Dormant member lifestyle reactivation']
        },
        launch: {
          adHeadline: 'Science of threshold training. Our studio.',
          visualIdea: 'Athlete running on woodway curve treadmill equipped with a metabolic gas analysis mask.',
          waCopy: `Welcome {first_name}! 🧠 Learn the physiology behind our metabolic conditioning. Tap here to watch a 2-minute breakdown of our lactate-threshold heart rate zones coaching.`,
          triggers: ['Advanced exercise science authority', 'Heart rate diagnostic credibility', 'Metabolic engineering storytelling']
        }
      }
    },
    {
      id: 'coaching',
      name: 'Tutorial Centres',
      emoji: '📚',
      paletteName: 'Oxford Navy & Ochre',
      brandColors: ['#0B192C', '#E3B04B', '#F9F9F9'],
      colorNames: ['Oxford Navy', 'Warm Ochre', 'Pure Alabaster'],
      fonts: 'Lora (Serif) + Roboto (Sans)',
      visualImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      campaigns: {
        acquisition: {
          adHeadline: 'Break through complex topics. CBSE prep.',
          visualIdea: 'Elegant bento-grid typography sheet visualizing a complex physics equation made simple.',
          waCopy: `Hi {first_name}! 📚 Our master instructors just compiled the Chapter 4 Chemistry Formula Sheet. Tap here to instantly download the PDF directly in this chat thread.`,
          triggers: ['Direct high-utility PDF checklist', 'WhatsApp-native immediate doubt clearance', 'High academic score reassurance']
        },
        reactivate: {
          adHeadline: 'Exam prep window shrinking. Past papers active.',
          visualIdea: 'A study desk under warm desk light, showing organized color-coded mock question ledgers.',
          waCopy: `Hey {first_name}! 📝 The mid-term board exams are only 30 days away. We unlocked the live 2025 Solved Past Papers archive for your account. Tap here to instantly view the PDF files on WhatsApp.`,
          triggers: ['Exam preparation window urgency', 'Instant past paper PDF activation', 'Frictionless homework support bypass']
        },
        launch: {
          adHeadline: 'Making complex physics intuitive.',
          visualIdea: 'Close-up of a tutor mapping gravity field vectors using a glowing digital chalkboard display.',
          waCopy: `Hello {first_name}! 🧠 Ditch boring rote-learning. Tap here to view our 3D visual explanation of Kepler's planetary orbits and discover our learning paths.`,
          triggers: ['Rote-learning rejection positioning', '3D visual physics authority', 'Structured cognitive blueprint mapping']
        }
      }
    }
  ];

  const current = industries.find(i => i.id === activeIndustry) || industries[0];
  const activeCampaign = current.campaigns[activeObjective] || current.campaigns.acquisition;

  const handleTriggerCopy = () => {
    navigator.clipboard.writeText(activeCampaign.waCopy);
    setCopyCopied(true);
    setTimeout(() => setCopyCopied(false), 2000);
  };

  const handlePreFillCreative = () => {
    onPrefillInquiry(`Creative planner blueprint inquiry: Intrigued by the strategy deck and copywriting loops for ${current.name} (${activeObjective} campaign). Let's discuss campaigns.`);
  };

  return (
    <div className="bg-maven-green-light/10 border border-maven-gold/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      
      {/* Ambient luxury glows */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(28,74,56,0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-maven-cream/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-maven-gold uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Creative Strategy Simulator
          </span>
          <h3 className="text-2xl font-serif text-maven-cream mt-2 font-medium">
            Custom Creative & Strategy Deck
          </h3>
          <p className="text-xs text-maven-cream/85 mt-1 max-w-xl">
            Simulate your industry target audience to instantly generate custom geofenced Meta ad structures, luxury visual assets, typography scales, and highly converting WhatsApp copy.
          </p>
        </div>

        <button 
          onClick={() => {
            // Randomize active industry for fun exploration
            const filtered = industries.filter(i => i.id !== activeIndustry);
            const random = filtered[Math.floor(Math.random() * filtered.length)];
            setActiveIndustry(random.id);
          }}
          className="flex items-center gap-2 border border-maven-cream/10 bg-maven-green-dark/40 hover:border-maven-gold/30 text-maven-muted hover:text-maven-gold px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-mono focus:outline-none"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Shuffle Campaign Vertical
        </button>
      </div>

      {/* Simulator Deck Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Control Column: Toggles */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold px-1 block text-left">
              1. Choose Target Vertical
            </span>
            <div className="grid grid-cols-2 gap-2">
              {industries.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => {
                    setActiveIndustry(ind.id);
                  }}
                  className={`text-[10px] font-mono py-3 px-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 focus:outline-none transition-all duration-300 ${
                    activeIndustry === ind.id 
                      ? 'border-maven-gold text-maven-gold bg-maven-gold/5 font-bold shadow-md' 
                      : 'border-maven-cream/5 text-maven-muted hover:border-maven-gold/20 hover:text-maven-cream bg-maven-green-dark/40'
                  }`}
                >
                  <span className="text-xs shrink-0">{ind.emoji}</span>
                  <span className="truncate">{ind.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-maven-gold uppercase font-bold px-1 block text-left">
              2. Campaign Goal Strategy
            </span>
            <div className="flex flex-col gap-2 bg-maven-green-dark/60 p-2.5 border border-maven-cream/5 rounded-2xl">
              {[
                { id: 'acquisition', name: 'Radius Lead Acquisition', desc: 'Acquire new geofenced prospects within 5km' },
                { id: 'reactivate', name: 'Customer Win-back Loop', desc: 'Reactivate churned guests using historic logs' },
                { id: 'launch', name: 'Brand Authority Launch', desc: 'Inject storytelling assets to establish footprint' }
              ].map(obj => (
                <button
                  key={obj.id}
                  onClick={() => setActiveObjective(obj.id as any)}
                  className={`text-left p-3 rounded-xl border transition-all duration-300 focus:outline-none flex flex-col gap-0.5 ${
                    activeObjective === obj.id
                      ? 'bg-maven-green border-maven-gold/40 text-maven-cream animate-pulse'
                      : 'border-transparent text-maven-muted hover:text-maven-cream hover:bg-maven-green/20'
                  }`}
                  style={{ animationDuration: '3s' }}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider block">{obj.name}</span>
                  <span className="text-[8px] text-maven-muted font-mono leading-none block mt-0.5">{obj.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sandbox Display Column */}
        <div className="lg:col-span-8 bg-maven-green-dark border border-maven-cream/15 rounded-3xl p-5 sm:p-6 shadow-inner flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-4 right-6 flex items-center gap-2 border border-maven-cream/10 bg-maven-green-light/20 px-3 py-1 rounded-full pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-maven-gold animate-pulse" />
            <span className="text-[8px] font-mono text-maven-cream/70 uppercase font-bold">CREATIVE ENGINE DECK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch flex-1">
            
            {/* Ad Mockup Sub-Column */}
            <div className="flex flex-col gap-3">
              <span className="text-[9px] font-mono tracking-widest text-maven-muted uppercase font-bold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-maven-gold" />
                Meta Geofenced Ad Mockup
              </span>

              <div className="bg-[#050c0a] border border-maven-cream/10 rounded-2xl p-3 flex flex-col gap-3 relative overflow-hidden flex-1 justify-between shadow-lg">
                <div className="flex justify-between items-center pb-2 border-b border-maven-cream/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-maven-gold/20 border border-maven-gold/45 flex items-center justify-center font-serif text-[9px] font-bold text-maven-gold uppercase leading-none">
                      M
                    </div>
                    <span className="text-[9px] font-mono font-bold text-maven-cream">itsmaven • Sponsored</span>
                  </div>
                  <span className="text-[8px] font-mono text-maven-cream/70">5km Radius Geofence</span>
                </div>

                {/* Simulated Image/Video Visual Asset Container */}
                <div className="relative group rounded-xl overflow-hidden aspect-[4/3] w-full border border-maven-cream/5">
                  <img 
                    src={current.visualImage} 
                    alt={activeCampaign.adHeadline}
                    className="w-full h-full object-cover grayscale contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-left">
                    <span className="text-[8px] font-mono text-maven-gold tracking-widest uppercase font-bold">Creative Asset Preview</span>
                    <span className="text-xs font-serif font-bold text-maven-cream leading-tight mt-0.5">{activeCampaign.adHeadline}</span>
                  </div>

                  {/* Play trigger overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-maven-cream/20 backdrop-blur-md border border-maven-cream/40 flex items-center justify-center text-maven-cream transform group-hover:scale-105 transition-all">
                      <Play className="w-4 h-4 fill-maven-cream ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="bg-maven-green-light/10 border border-maven-cream/5 rounded-xl p-3 text-left space-y-1.5">
                  <span className="text-[8px] font-mono text-maven-gold uppercase tracking-wider font-bold block">Ad Design Visual Spec:</span>
                  <p className="text-[10px] text-maven-cream/85 leading-relaxed font-sans">{activeCampaign.visualIdea}</p>
                </div>
              </div>
            </div>

            {/* Strategy, Colors & Copy Sub-Column */}
            <div className="flex flex-col justify-between gap-6 text-left">
              
              {/* Brand palette specs */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono tracking-widest text-maven-muted uppercase font-bold flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-maven-gold" />
                  Visual Identity Specs
                </span>
                
                <div className="bg-[#050c0a] border border-maven-cream/10 p-5 sm:p-6 rounded-2xl space-y-4 sm:space-y-5 shadow-lg">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-maven-gold font-bold uppercase">{current.paletteName}</span>
                    <span className="text-maven-muted">Studio Specs</span>
                  </div>

                  {/* Color Chips row */}
                  <div className="flex gap-3">
                    {current.brandColors.map((color, idx) => (
                      <div key={idx} className="flex-1 flex flex-col gap-1.5 items-center">
                        <div 
                          className="w-full h-10 sm:h-12 rounded-xl border border-maven-cream/10 shadow-sm transition-transform duration-300 hover:scale-102"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[9px] font-mono text-maven-cream font-medium mt-0.5">{color}</span>
                        <span className="text-[8px] font-mono text-maven-cream/70 uppercase truncate max-w-[70px] mt-0.5">{current.colorNames[idx]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-maven-cream/5 pt-4 space-y-2">
                    <span className="text-[9px] font-mono text-maven-muted uppercase tracking-wider block">Coordinated Typography:</span>
                    <span className="block font-mono text-[10px] text-maven-cream font-bold">{current.fonts}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp copy generator */}
              <div className="space-y-3 flex-1 flex flex-col justify-end">
                <span className="text-[9px] font-mono tracking-widest text-maven-muted uppercase font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-maven-gold" />
                  WhatsApp Concierge Copy
                </span>

                <div className="bg-[#050c0a] border border-maven-cream/10 p-5 sm:p-6 rounded-2xl flex-1 flex flex-col justify-between gap-4 font-mono text-[10.5px] leading-relaxed relative min-h-[180px] sm:min-h-[200px] shadow-lg">
                  <div className="bg-maven-green-light/10 border border-maven-cream/5 p-4 sm:p-5 rounded-xl text-left text-maven-cream/90 whitespace-pre-wrap select-text relative min-h-[105px] sm:min-h-[115px] flex items-center leading-relaxed">
                    {activeCampaign.waCopy}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-maven-cream/5">
                    <span className="text-[8px] text-maven-muted font-sans font-medium uppercase tracking-wider">Includes direct reservation CTA hooks</span>
                    
                    <button 
                      onClick={handleTriggerCopy}
                      className="text-[9px] font-mono font-bold uppercase text-maven-gold hover:text-maven-cream hover:bg-maven-gold/10 transition-all duration-300 focus:outline-none py-1.5 px-3 border border-maven-gold/30 hover:border-maven-gold rounded-lg shadow-sm"
                    >
                      {copyCopied ? 'Copied!' : 'Copy Script'}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Engineered Conversion & Psychological Triggers Banner */}
          <div className="mt-6 bg-maven-gold/5 border border-maven-gold/25 p-5 rounded-2xl text-left">
            <span className="text-[9px] font-mono text-maven-gold uppercase tracking-widest font-bold block mb-3">
              Engineered Conversion & Psychological Triggers
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeCampaign.triggers.map((trig, idx) => (
                <div key={idx} className="bg-maven-green-dark/60 border border-maven-cream/5 p-3.5 rounded-xl flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-maven-gold/20 flex items-center justify-center text-maven-gold shrink-0 font-mono text-[10px] font-bold mt-0.5">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[9px] font-mono tracking-wider uppercase text-maven-gold font-bold">
                      {idx === 0 ? 'Cognitive Anchor' : idx === 1 ? 'Value Framer' : 'Friction Reducer'}
                    </span>
                    <p className="text-[10px] text-maven-cream/85 font-body leading-relaxed">{trig}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action bar */}
          <div className="border-t border-maven-cream/5 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <span className="text-[10px] text-maven-muted font-mono">
              Ready to deploy highly-converting creative campaigns? Let&apos;s talk design.
            </span>

            <button 
              onClick={handlePreFillCreative}
              className="bg-maven-gold hover:bg-maven-cream text-maven-green-dark font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none shrink-0"
            >
              Consult Creative Design Team
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
