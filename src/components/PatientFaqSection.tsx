import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PATIENT_FAQS } from '../utils/clinic-data';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';

export const PatientFaqSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('faq-appointment');

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-8 sm:py-12 bg-[#F7F4E9] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <ScrollReveal animation="slide-down" delay={20} once={false}>
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-xs font-bold uppercase tracking-widest shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-[#293549]/20 text-[#293549]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
          </ScrollReveal>

          <TextReveal
            text="Patient Questions & Answers"
            as="h2"
            className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E252B] mt-1 leading-tight"
            highlightWords={['Questions']}
            highlightClass="text-[#293549]"
            delay={40}
            once={false}
          />

          <FadeUp delay={60} once={false}>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-medium">
              Everything you need to know about scheduling, pricing, and procedures at Malabar Hill.
            </p>
          </FadeUp>
        </div>

        {/* 5 FAQ Cards styled in clinic's dark slate navy with StaggerContainer */}
        <StaggerContainer
          staggerDelay={0.08}
          delayChildren={0.06}
          once={false}
          className="space-y-4"
        >
          {PATIENT_FAQS.map((faq) => {
            const isOpen = expandedId === faq.id;

            return (
              <StaggerItem key={faq.id} distance={18} scale={0.98}>
                <div className="bg-[#1C2534] rounded-2xl border border-[#293549]/80 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover-lift">
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: LUXURY_EASE }}
                      className="w-8 h-8 rounded-full bg-[#F0C05A] text-slate-950 flex items-center justify-center font-black text-lg shrink-0 shadow-xs hover:bg-[#F5C866] transition-colors"
                    >
                      {isOpen ? '−' : '+'}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: LUXURY_EASE }}
                        className="px-5 pb-5 pt-2 text-xs sm:text-sm text-stone-200 leading-relaxed border-t border-white/10 font-medium overflow-hidden"
                      >
                        <div dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
