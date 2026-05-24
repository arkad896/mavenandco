'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HOW_IT_WORKS } from '../../lib/constants';
import { LucideIcon } from 'lucide-react';

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll filling line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 sm:py-36 bg-maven-green text-maven-cream overflow-hidden border-t border-maven-cream/5"
      id="how-it-works"
    >
      {/* Background Decorative Accents */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.03)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-[20%] left-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle,rgba(28,74,56,0.25)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 sm:mb-28">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-mono tracking-[0.25em] text-maven-gold uppercase mb-3"
          >
            The Operating System
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-serif font-medium leading-tight tracking-tight text-maven-cream"
          >
            A fully-integrated guest ecosystem built to <span className="text-gold-gradient italic font-semibold">convert</span> and <span className="text-gold-gradient italic font-semibold">retain</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-sm sm:text-base text-maven-muted mt-6 leading-relaxed"
          >
            From the initial online spark to automated WhatsApp campaigns that drive return visits, our full-funnel system runs smoothly in the background.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 md:mt-24">
          
          {/* Central Vertical Line / Track */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-maven-cream/10 -translate-x-1/2 pointer-events-none" aria-hidden="true">
            {/* Scroll-linked filling progress line */}
            <motion.div 
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-maven-gold via-maven-gold-light to-maven-gold origin-top"
              style={{ scaleY }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {HOW_IT_WORKS.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.step} 
                  className={`flex flex-col md:flex-row relative items-center justify-between ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Card Column */}
                  <div className="w-full pl-16 md:pl-0 md:w-[45%] z-10">
                    <TimelineCard item={item} icon={Icon} alignLeft={isEven} />
                  </div>

                  {/* Centered Node / Pulse Bullet Point */}
                  <div 
                    className="absolute left-[30px] md:left-1/2 top-[24px] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="relative w-8 h-8 rounded-full bg-maven-green-dark border-2 border-maven-gold flex items-center justify-center shadow-lg"
                    >
                      {/* Interactive internal glowing dot */}
                      <div className="w-2.5 h-2.5 rounded-full bg-maven-gold-light animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Spacer Column for Desktop */}
                  <div className="hidden md:block md:w-[45%]" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

interface CardProps {
  item: typeof HOW_IT_WORKS[number];
  icon: LucideIcon;
  alignLeft: boolean;
}

function TimelineCard({ item, icon: Icon, alignLeft }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-maven-green-light/20 hover:bg-maven-green-light/35 backdrop-blur-md border border-maven-gold/10 hover:border-maven-gold/30 rounded-2xl p-6 sm:p-8 transition-all duration-500 shadow-xl cursor-default"
    >
      {/* Ambient background hover glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,168,76,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" 
        aria-hidden="true"
      />

      <div className={`flex flex-col gap-4 ${alignLeft ? 'md:items-end md:text-right' : 'items-start'}`}>
        
        {/* Step Index & Icon Row */}
        <div className={`flex items-center gap-4 ${alignLeft ? 'md:flex-row-reverse' : ''}`}>
          {/* Luxury icon container */}
          <div className="w-12 h-12 bg-maven-green-dark border border-maven-gold/20 group-hover:border-maven-gold/60 rounded-full flex items-center justify-center text-maven-gold group-hover:text-maven-cream group-hover:bg-maven-gold/25 transition-all duration-500 shadow-inner">
            <Icon className="w-5 h-5 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[360deg]" />
          </div>
          
          <span className="font-serif text-lg tracking-widest text-maven-gold/55 group-hover:text-maven-gold-light transition-colors duration-500 font-semibold">
            STEP {item.step}
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-maven-cream tracking-tight group-hover:text-maven-gold-light transition-colors duration-500">
            {item.title}
          </h3>
          <p className="text-sm text-maven-muted font-body leading-relaxed max-w-md">
            {item.description}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
