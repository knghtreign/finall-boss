import React, { useState } from 'react';
import { TREATMENT_STEPS } from '../utils/clinic-data';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  Eye,
  FileText,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';

interface TreatmentJourneyProps {
  onOpenBooking: () => void;
}

export const TreatmentJourneySection: React.FC<TreatmentJourneyProps> = ({
  onOpenBooking,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = TREATMENT_STEPS[activeStepIndex];

  const handleStepClick = (idx: number) => {
    setActiveStepIndex(idx);
  };

  const handlePrev = () => {
    const nextIdx = activeStepIndex > 0 ? activeStepIndex - 1 : TREATMENT_STEPS.length - 1;
    handleStepClick(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeStepIndex < TREATMENT_STEPS.length - 1 ? activeStepIndex + 1 : 0;
    handleStepClick(nextIdx);
  };

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Coffee':
        return <Coffee className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Eye':
        return <Eye className={className} />;
      case 'FileText':
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <section id="journey" className="py-8 sm:py-12 bg-[#F7F4E9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <ScrollReveal animation="slide-down" delay={20} once={false}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD8E6] bg-[#EAEFF5] text-[#293549] text-[11px] font-bold tracking-wider uppercase mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#293549]" />
              <span>Visit Experience</span>
            </div>
          </ScrollReveal>

          <TextReveal
            text="What Happens When You Visit?"
            as="h2"
            className="font-serif-clinic text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C221D] tracking-tight"
            highlightWords={['Visit?']}
            highlightClass="text-[#293549]"
            delay={50}
            once={false}
          />

          <FadeUp delay={80} once={false}>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal">
              A clear, comfortable 4-step sequence designed for peace of mind.
            </p>
          </FadeUp>
        </div>

        {/* 4 Step Navigation Tabs with StaggerContainer */}
        <StaggerContainer
          staggerDelay={0.08}
          delayChildren={0.04}
          once={false}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6"
        >
          {TREATMENT_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;

            return (
              <StaggerItem key={step.step}>
                <button
                  onClick={() => handleStepClick(idx)}
                  className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all duration-300 text-left cursor-pointer border select-none hover-lift ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F0C05A] via-[#E8B546] to-[#D49E2E] text-stone-950 border-amber-300 shadow-md font-bold'
                      : 'bg-[#293549] text-stone-200 hover:text-white hover:bg-[#34445c] border-[#3d4f6b] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-stone-950/10 text-stone-950' : 'bg-[#1C2534] text-stone-200'
                      }`}
                    >
                      {renderIcon(step.icon, 'w-4 h-4')}
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider block opacity-85 leading-none mb-0.5">
                        {step.step}
                      </span>
                      <span className="text-xs sm:text-sm font-bold tracking-tight truncate block">
                        {step.tabLabel}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ml-1.5 transition-colors ${
                      isActive ? 'bg-stone-950' : 'bg-[#536886]'
                    }`}
                  />
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Slate Navy Presentation Card with smooth step transition */}
        <ScrollReveal animation="fade-up" delay={120} duration={0.65} once={false}>
          <div className="bg-gradient-to-br from-[#1C2534] via-[#243044] to-[#151D2A] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#364761]/80 shadow-2xl text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.38, ease: LUXURY_EASE }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Left Photo Column: uncropped and dynamically expanding according to provided image */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#364761] bg-[#111722]/90 group flex items-center justify-center p-2 sm:p-3">
                    <img
                      key={currentStep.image}
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="w-full h-auto object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.01] block"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#151D2A]/90 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/30 shadow-md">
                      {currentStep.step}
                    </div>
                  </div>
                </div>

                {/* Right Information Column */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-block bg-[#E8B546] text-stone-950 font-extrabold text-[11px] tracking-wider uppercase px-3 py-1 rounded-md mb-3 shadow-xs">
                      {currentStep.step}
                    </div>

                    <h3 className="font-serif-clinic text-2xl sm:text-3xl md:text-3xl font-bold text-white tracking-tight mb-3">
                      {currentStep.title}
                    </h3>

                    <p className="text-[#E0E7F0] text-xs sm:text-sm md:text-base leading-relaxed mb-5 font-normal">
                      {currentStep.desc}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentStep.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#293549] border border-[#3d4f6b] text-[#E5ECF4] text-xs px-3.5 py-1.5 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Divider & Navigation Controls */}
                  <div className="pt-4 border-t border-[#364761] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous Step"
                        className="w-9 h-9 rounded-full bg-[#293549] hover:bg-[#34445c] text-[#E0E7F0] flex items-center justify-center transition-all cursor-pointer border border-[#3d4f6b] hover:scale-105 active:scale-95"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        aria-label="Next Step"
                        className="w-9 h-9 rounded-full bg-[#293549] hover:bg-[#34445c] text-[#E0E7F0] flex items-center justify-center transition-all cursor-pointer border border-[#3d4f6b] hover:scale-105 active:scale-95"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm font-bold text-[#E8B546]">
                        Step {activeStepIndex + 1} of {TREATMENT_STEPS.length}
                      </span>
                      <button
                        onClick={onOpenBooking}
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F0C05A] to-[#E8B546] text-stone-950 font-bold text-xs hover:brightness-105 shadow-md transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book This Step</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
