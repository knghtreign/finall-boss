import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../utils/clinic-data';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  LUXURY_EASE,
} from './ScrollReveal';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
  onOpenAiConsult?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceToBook,
}) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for decorative stars
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const starY1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const starY2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const total = SERVICES_DATA.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentService = SERVICES_DATA[currentIndex];

  const getOffset = (idx: number) => {
    let diff = idx - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-8 sm:py-12 bg-[#F7F4E9] relative overflow-hidden select-none"
    >
      {/* Decorative stars with scroll parallax */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : starY1 }}
        className="absolute top-10 left-12 text-amber-300/40 text-xl pointer-events-none"
      >
        ✦
      </motion.div>
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : starY2 }}
        className="absolute top-24 right-20 text-amber-300/40 text-2xl pointer-events-none"
      >
        ✧
      </motion.div>
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : starY1 }}
        className="absolute bottom-12 left-1/4 text-amber-300/30 text-lg pointer-events-none"
      >
        ✦
      </motion.div>
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : starY2 }}
        className="absolute top-1/2 right-12 text-amber-300/40 text-xl pointer-events-none"
      >
        ✧
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-3">
          <ScrollReveal animation="slide-down" delay={20} once={false}>
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#293549]/20 text-[#293549]" />
              <span>TREATMENTS & PROCEDURES</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Title & Subheading with TextReveal */}
        <div className="text-center mb-6 sm:mb-8">
          <TextReveal
            text="Dental Treatments & Procedures"
            as="h2"
            className="text-3xl sm:text-5xl lg:text-[50px] font-black tracking-tight text-[#1E252B] leading-tight"
            highlightWords={['Procedures']}
            highlightClass="text-[#293549]"
            delay={40}
            once={false}
          />
          <FadeUp delay={80} once={false}>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium max-w-xl mx-auto">
              Explore the treatments and procedures available at Dr Deepals Dental Clinic.
            </p>
          </FadeUp>
        </div>

        {/* Carousel Indicator & Arrow Controls */}
        <FadeUp delay={100} once={false}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button
              onClick={handlePrev}
              aria-label="Previous treatment"
              className="w-10 h-10 rounded-full bg-white border border-stone-300 shadow-sm hover:shadow-md hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center text-stone-800 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Center Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-full bg-white border border-stone-200 shadow-sm text-xs sm:text-sm font-bold text-stone-800 whitespace-nowrap shrink-0 flex-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              <span className="tracking-wide whitespace-nowrap shrink-0 font-extrabold">
                {currentIndex + 1} / {total}
              </span>
              <span className="text-[#293549] font-black tracking-wide whitespace-nowrap shrink-0">
                · {currentService.title}
              </span>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next treatment"
              className="w-10 h-10 rounded-full bg-white border border-stone-300 shadow-sm hover:shadow-md hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center text-stone-800 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </FadeUp>

        {/* 3D Coverflow Carousel Container */}
        <ScrollReveal animation="scale-up" delay={120} duration={0.65} once={false}>
          <div className="relative h-[420px] sm:h-[480px] w-full max-w-5xl mx-auto flex items-center justify-center overflow-visible">
            {SERVICES_DATA.map((service, idx) => {
              const offset = getOffset(idx);
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;

              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;
              let rotateY = 0;

              if (offset === 0) {
                translateX = 0;
                scale = 1.04;
                opacity = 1;
                zIndex = 30;
                rotateY = 0;
              } else if (offset === -1) {
                translateX = -180;
                scale = 0.88;
                opacity = 0.82;
                zIndex = 20;
                rotateY = 15;
              } else if (offset === 1) {
                translateX = 180;
                scale = 0.88;
                opacity = 0.82;
                zIndex = 20;
                rotateY = -15;
              } else if (offset === -2) {
                translateX = -330;
                scale = 0.74;
                opacity = 0.55;
                zIndex = 10;
                rotateY = 24;
              } else if (offset === 2) {
                translateX = 330;
                scale = 0.74;
                opacity = 0.55;
                zIndex = 10;
                rotateY = -24;
              }

              return (
                <motion.div
                  key={service.id}
                  onClick={() => {
                    if (isCenter) {
                      setSelectedServiceForModal(service);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  animate={{
                    x: translateX,
                    scale,
                    opacity,
                    rotateY,
                    zIndex,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: LUXURY_EASE,
                  }}
                  className={`absolute w-[240px] sm:w-[280px] h-[340px] sm:h-[400px] rounded-[28px] overflow-hidden cursor-pointer transition-shadow ${
                    isCenter
                      ? 'border-4 border-[#293549] shadow-[0_20px_45px_rgba(41,53,73,0.35)] ring-2 ring-[#293549]/30'
                      : 'border border-stone-300 shadow-md hover:opacity-95'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/gal-2.png';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {/* Top Pill Badge */}
                  <div className="absolute top-4 left-0 right-0 flex justify-center px-2 pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] sm:text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md border border-stone-200 whitespace-nowrap max-w-[92%] truncate text-center">
                      {service.pillLabel}
                    </span>
                  </div>

                  {/* Bottom info banner on center card */}
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#293549]/20 flex items-center justify-between text-left"
                    >
                      <div className="min-w-0 pr-2">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight whitespace-nowrap truncate max-w-[130px] sm:max-w-[160px]">
                          {service.title}
                        </h4>
                        <p className="text-[10px] text-stone-500 font-medium whitespace-nowrap truncate max-w-[130px] sm:max-w-[160px]">
                          {service.highlight || 'Malabar Hill Practice'}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServiceToBook(service.title);
                        }}
                        className="shrink-0 px-3 py-1.5 bg-[#293549] hover:bg-[#1E2838] text-white text-[11px] font-bold rounded-full flex items-center gap-1 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Thumbnail Dots Navigation for all 18 services */}
        <FadeUp delay={140} once={false}>
          <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap max-w-md mx-auto">
            {SERVICES_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to ${s.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-[#293549]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedServiceForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: LUXURY_EASE }}
              className="bg-[#FBF9F5] rounded-3xl max-w-lg w-full p-6 border-2 border-[#293549] shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#293549] bg-[#EAEFF5] px-2.5 py-1 rounded-full border border-[#CBD8E6]">
                    {selectedServiceForModal.categoryLabel}
                  </span>
                  <h3 className="font-serif-clinic text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                    {selectedServiceForModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedServiceForModal(null)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden h-44 border border-stone-200">
                <img
                  src={selectedServiceForModal.image}
                  alt={selectedServiceForModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#EFEAE0] p-4 rounded-2xl text-xs sm:text-sm text-stone-700 leading-relaxed border border-[#DFD8CB]">
                <p className="font-semibold text-stone-900 mb-1">Clinical Procedure Overview:</p>
                <p>{selectedServiceForModal.description}</p>
                <div className="mt-2 pt-2 border-t border-stone-300 flex items-center gap-1.5 text-stone-800 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#293549]" />
                  <span>Personally performed by Dr. Deepal Shah at Malabar Hill.</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const title = selectedServiceForModal.title;
                    setSelectedServiceForModal(null);
                    onSelectServiceToBook(title);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-[#F0C05A]" />
                  <span>Book {selectedServiceForModal.title}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
