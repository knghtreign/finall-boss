import React from 'react';
import { ArrowRight, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../utils/clinic-data';
import {
  ScrollReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  LUXURY_EASE,
} from './ScrollReveal';
import { useScroll, useTransform, motion, useReducedMotion } from 'motion/react';

interface HeroSectionProps {
  onScheduleConsultation: () => void;
  onExploreServices: () => void;
  onOpenSmileSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScheduleConsultation,
  onExploreServices,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll-linked smooth parallax effects
  const glowY = useTransform(scrollY, [0, 600], [0, 80]);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const artworkY = useTransform(scrollY, [0, 600], [0, 36]);
  const contentY = useTransform(scrollY, [0, 600], [0, -18]);

  return (
    <section
      id="home"
      className="relative pt-4 pb-8 sm:pt-7 sm:pb-12 overflow-hidden bg-gradient-to-b from-[#F7F4E9] via-[#F4EFE3] to-[#F7F4E9]"
    >
      {/* Scroll-linked Ambient Warm Glow */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : glowY,
          scale: shouldReduceMotion ? 1 : glowScale,
        }}
        className="absolute -top-16 -right-16 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : glowY,
        }}
        className="absolute top-1/2 -left-20 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Slogan, Surgeon Badge, and Action Buttons */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : contentY }}
            className="lg:col-span-7 space-y-4 sm:space-y-5"
          >
            {/* Surgeon Badge */}
            <ScrollReveal animation="slide-down" delay={40} once={false}>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAE3D4] text-[#293549] text-xs font-bold tracking-wide border border-[#DDD3C0] shadow-2xs hover-lift">
                <Sparkles className="w-3.5 h-3.5 text-[#293549]" />
                <span>Dr. Deepal Shah • 21+ Years Dental Surgeon</span>
              </div>
            </ScrollReveal>

            {/* Slogan with exact two-line split */}
            <div className="overflow-visible">
              <ScrollReveal animation="fade-up" delay={50} once={false}>
                <h1 className="font-serif-clinic text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1C221D] leading-[1.08] tracking-tight">
                  <span className="block">Restore Your</span>
                  <span className="block text-[#293549]">True Smile</span>
                </h1>
              </ScrollReveal>
            </div>

            {/* Action Buttons with staggered entrance */}
            <StaggerContainer
              staggerDelay={0.08}
              delayChildren={0.2}
              once={false}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <StaggerItem>
                <button
                  onClick={onScheduleConsultation}
                  className="px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#293549] hover:bg-[#1E2838] rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-[#F0C05A]" />
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </StaggerItem>

              <StaggerItem>
                <button
                  onClick={onExploreServices}
                  className="text-xs sm:text-sm font-bold text-[#293549] hover:text-[#18212D] flex items-center gap-1.5 py-3 px-5 rounded-full hover:bg-stone-200/60 transition-all cursor-pointer group hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore 18 Services</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>

          {/* Right Column: 3D Precision Dental Artwork with Parallax & Circling CTA */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal animation="scale-up" delay={120} duration={0.65} once={false}>
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <motion.div
                  style={{
                    y: shouldReduceMotion ? 0 : artworkY,
                  }}
                  className="relative rounded-[28px] overflow-hidden shadow-2xl bg-[#E2EEF8] border-2 border-[#CBD8E6]/80 transition-shadow duration-500 hover:shadow-[0_24px_50px_rgba(41,53,73,0.22)]"
                >
                  {/* Artwork Image Container */}
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-gradient-to-b from-[#76B0DA] via-[#89BCE0] to-[#6099C7]">
                    <img
                      src="/assets/user/hero.png"
                      alt="Dr. Deepal's Dental Clinic - Precision Aesthetic Dentistry"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      fetchPriority="high"
                    />

                    {/* Animated Circling CTA: slightly more compact circle badge with bolder, larger typography */}
                    <button
                      onClick={onScheduleConsultation}
                      className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-28 h-28 sm:w-34 sm:h-34 rounded-full group/btn cursor-pointer z-20 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none select-none"
                      title="Click to Book Your Consultation"
                      aria-label="Book your consultation"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* White circular backdrop card with golden border */}
                        <div className="absolute inset-0 rounded-full bg-white border-2 border-[#F5D883] shadow-2xl transition-shadow group-hover/btn:shadow-[0_12px_28px_rgba(240,192,90,0.55)]" />

                        {/* Continuous spinning circular text ring with enlarged prominent typography */}
                        <svg
                          className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] group-hover/btn:animate-[spin_4s_linear_infinite]"
                          viewBox="0 0 140 140"
                        >
                          <defs>
                            <path
                              id="heroCircleTextPath"
                              d="M 70, 70 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                            />
                          </defs>
                          <text className="text-[12px] sm:text-[13px] font-black tracking-[0.16em] fill-[#1C2534] uppercase">
                            <textPath href="#heroCircleTextPath" startOffset="0%">
                              • BOOK CONSULTATION •
                            </textPath>
                          </text>
                        </svg>

                        {/* Center Golden Circle with Arrow pointing up-right */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#E8B546] via-[#F5D883] to-[#E8B546] border-2 border-white shadow-md flex items-center justify-center group-hover/btn:scale-105 transition-transform">
                          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A222F] stroke-[3] transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
