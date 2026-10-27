import React, { useState, useRef } from 'react';
import {
  Award,
  Star,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  X,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { CLINIC_INFO } from '../utils/clinic-data';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';

interface LeadClinicianSectionProps {
  onOpenBooking: () => void;
}

export const LeadClinicianSection: React.FC<LeadClinicianSectionProps> = ({
  onOpenBooking,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} id="about" className="py-8 sm:py-12 bg-[#F7F4E9] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Enclosed Card Container */}
        <ScrollReveal animation="scale-up" delay={50} duration={0.65} once={false}>
          <div className="relative rounded-[28px] sm:rounded-[44px] bg-[#1C2534] border-2 border-[#293549]/70 p-6 py-8 sm:p-12 sm:py-12 text-center text-white overflow-hidden shadow-2xl">
            {/* Subtle warm decorative glow with scroll parallax */}
            <motion.div
              style={{ y: shouldReduceMotion ? 0 : glowY }}
              className="absolute top-0 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              style={{ y: shouldReduceMotion ? 0 : glowY }}
              className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
            />

            {/* Tiny decorative star sparkles */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-10 text-amber-300/30 text-lg sm:text-xl pointer-events-none">
              ✦
            </div>
            <div className="absolute top-10 right-8 sm:top-16 sm:right-12 text-amber-300/30 text-xl sm:text-2xl pointer-events-none">
              ✧
            </div>
            <div className="absolute bottom-8 right-12 sm:bottom-10 sm:right-20 text-amber-300/30 text-base sm:text-lg pointer-events-none">
              ✦
            </div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              {/* Lead Clinician Badge */}
              <ScrollReveal animation="slide-down" delay={30} once={false}>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF6E4]/15 border border-[#F5D88E] text-[#F5D88E] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-[#F5D88E]" />
                  <span>LEAD CLINICIAN</span>
                </div>
              </ScrollReveal>

              {/* Title with Gold Doctor Name with TextReveal */}
              <div>
                <TextReveal
                  text="Personal Care by Dr. Deepal Shah"
                  as="h2"
                  className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
                  highlightWords={['Dr.', 'Deepal', 'Shah']}
                  highlightClass="text-[#F0C05A]"
                  delay={60}
                  once={false}
                />
              </div>

              {/* Subtitle */}
              <FadeUp delay={80} once={false}>
                <p className="text-xs sm:text-base text-stone-200/90 font-medium max-w-lg mx-auto leading-relaxed">
                  Every procedure is personally sculpted and performed with gentle precision in Malabar Hill.
                </p>
              </FadeUp>

              {/* Middle Big Shiny Gold Pill Button */}
              <FadeUp delay={100} once={false}>
                <div className="pt-1.5 flex flex-col items-center gap-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#F5D883] via-[#E8B847] to-[#D59828] text-slate-950 font-black text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-[0_10px_25px_rgba(240,192,90,0.35)] hover:shadow-[0_15px_35px_rgba(240,192,90,0.55)] transition-all cursor-pointer border-2 border-amber-200 whitespace-nowrap hover-lift active:scale-95"
                  >
                    {/* Circular Portrait on left of button */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-slate-900 shrink-0 bg-stone-300">
                      <img
                        src="/assets/user/doctor_deepal.png"
                        alt="Dr. Deepal Shah"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <span className="whitespace-nowrap shrink-0">MEET DR. DEEPAL SHAH</span>

                    {/* Circular dark pill with arrow */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5D883]" />
                    </div>
                  </button>

                  <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[#F0C05A] uppercase">
                    CLICK TO OPEN PROFILE ✨
                  </span>
                </div>
              </FadeUp>

              {/* Bottom 3 Badges with StaggerContainer */}
              <StaggerContainer
                staggerDelay={0.08}
                delayChildren={0.12}
                once={false}
                className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5"
              >
                <StaggerItem>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-stone-900 text-[11px] sm:text-[13px] font-bold shadow-xs hover-lift">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>21+ Years Clinical Mastery</span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-stone-900 text-[11px] sm:text-[13px] font-bold shadow-xs hover-lift">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    <span>5.0 Star Rated Care</span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-stone-900 text-[11px] sm:text-[13px] font-bold shadow-xs hover-lift">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Gentle & Pain-Free</span>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal Profile */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: LUXURY_EASE }}
              className="bg-white rounded-[24px] sm:rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl relative border border-stone-200 max-h-[90vh] flex flex-col"
            >
              <div className="h-1.5 sm:h-2 bg-[#F0C05A] w-full shrink-0" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer z-20"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="p-4 sm:p-7 overflow-y-auto">
                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 items-start">
                  <div className="w-full sm:col-span-5 flex sm:flex-col items-center gap-3.5 sm:gap-0">
                    <div className="relative w-28 h-36 sm:w-full sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-[#293549] shadow-md bg-stone-100 shrink-0">
                      <img
                        src="/assets/user/doctor_deepal.png"
                        alt="Dr. Deepal Shah - Malabar Hill"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2 bg-slate-950/90 text-white text-center text-[8px] sm:text-[10px] font-black uppercase tracking-wider py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                        MALABAR HILL
                      </div>
                    </div>

                    <div className="sm:hidden flex-1 space-y-1">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-[9px] font-black uppercase tracking-wider">
                        LEAD CLINICIAN
                      </div>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">
                        Dr. Deepal Shah
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#293549]">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#293549]" />
                        <span>Malabar Hill, Mumbai</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:col-span-7 space-y-2.5 sm:space-y-3.5">
                    <div className="hidden sm:block space-y-1.5">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-xs font-black uppercase tracking-wider">
                        DENTIST & LEAD CLINICIAN
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        Dr. Deepal Shah
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#293549]">
                        <MapPin className="w-4 h-4 shrink-0 text-[#293549]" />
                        <span>Malabar Hill, Mumbai</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                      Focused on gentle, pain-free dentistry and preserving natural tooth vitality through modern aesthetic techniques and unhurried personal care.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-stone-100 text-slate-800 text-[10px] sm:text-[11px] font-bold">
                        Restorative & Aesthetics
                      </span>
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-stone-100 text-slate-800 text-[10px] sm:text-[11px] font-bold">
                        21+ Years Practice
                      </span>
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#FDECB8] text-[#8C6D27] text-[10px] sm:text-[11px] font-extrabold border border-[#F5D88E]">
                        Zero-Pain Protocol
                      </span>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          onOpenBooking();
                        }}
                        className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-gradient-to-r from-[#F5D883] via-[#E8B847] to-[#D59828] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-amber-200 hover-lift"
                      >
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950" />
                        <span>BOOK CONSULTATION</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <a
                        href={`tel:${CLINIC_INFO.phoneMobile}`}
                        className="py-1.5 sm:py-2 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-[#C28B23]" />
                        <span>Call 7977776136</span>
                      </a>
                      <a
                        href={`mailto:${CLINIC_INFO.email}`}
                        className="py-1.5 sm:py-2 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-[#C28B23]" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
