import React from 'react';
import { Mail, Star, ThumbsUp } from 'lucide-react';
import { CLINIC_INFO } from '../utils/clinic-data';
import {
  ScrollReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from './ScrollReveal';

export const HealthySmilesBanner: React.FC = () => {
  const whatsappUrl = `https://wa.me/917977776136?text=Hi%20Dr.%20Deepal,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment`;

  return (
    <section className="py-6 sm:py-8 bg-[#F7F4E9] border-t border-b border-[#E7DFCF] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" delay={20} duration={0.6} once={false}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-stone-800">
            {/* Left side: Icons & Review Us indicator */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <StaggerContainer
                staggerDelay={0.07}
                delayChildren={0.04}
                once={false}
                className="flex items-center gap-3.5"
              >
                {/* 1. WhatsApp Icon button */}
                <StaggerItem>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="w-11 h-11 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white flex items-center justify-center shadow-md transition-all cursor-pointer border border-[#293549] hover-lift"
                    title="Connect on WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.972.53 1.884.822 2.781.822 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.385 8.163c-.144.405-.837.774-1.17.822-.312.043-.687.068-2.083-.497-1.789-.724-2.936-2.545-3.025-2.664-.089-.119-.723-.961-.723-1.832 0-.871.455-1.299.616-1.478.162-.179.354-.224.472-.224.118 0 .237.001.341.006.109.005.257-.041.401.306.149.359.508 1.238.552 1.328.044.089.073.194.015.313-.059.119-.089.194-.177.298-.089.105-.187.234-.267.314-.089.089-.181.187-.078.365.103.178.459.757.986 1.226.678.604 1.25.791 1.428.88.178.089.281.074.385-.045.104-.119.444-.517.562-.695.118-.178.236-.149.399-.089.163.059 1.034.488 1.211.577.177.089.296.134.34.209.044.074.044.433-.1 1.042zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.447 5.167L2 22l4.98-1.309C8.423 21.536 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.062c-1.636 0-3.173-.483-4.474-1.314l-.32-.206-2.962.777.791-2.887-.225-.358C3.914 14.717 3.438 13.392 3.438 12c0-4.721 3.841-8.562 8.562-8.562 4.721 0 8.562 3.841 8.562 8.562 0 4.721-3.841 8.562-8.562 8.562z"/>
                    </svg>
                  </a>
                </StaggerItem>

                {/* 2. Google Icon button */}
                <StaggerItem>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Connect via Google"
                    className="w-11 h-11 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white flex items-center justify-center shadow-md transition-all cursor-pointer border border-[#293549] hover-lift"
                    title="Chat with us"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                    </svg>
                  </a>
                </StaggerItem>

                {/* 3. Mail Icon button */}
                <StaggerItem>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    aria-label="Send email"
                    className="w-11 h-11 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white flex items-center justify-center shadow-md transition-all cursor-pointer border border-[#293549] hover-lift"
                    title="Email Dr. Deepal"
                  >
                    <Mail className="w-5 h-5 text-sky-200" />
                  </a>
                </StaggerItem>
              </StaggerContainer>

              {/* Review Us and thumbs badge */}
              <div className="flex items-center gap-2 pt-1 text-xs text-stone-700 font-medium">
                <span className="font-bold text-stone-900">Review Us</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <ThumbsUp className="w-3.5 h-3.5 text-stone-600" />
                <span className="text-stone-500 font-normal">(148 thumbs)</span>
              </div>
            </div>

            {/* Right side: Script Title and Signature */}
            <div className="text-center md:text-right">
              <ScrollReveal animation="slide-left" delay={50} once={false}>
                <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#293549] font-normal tracking-tight leading-tight">
                  Healthy Smiles, Happy Lives ♡
                </h2>
              </ScrollReveal>
              <FadeUp delay={80} once={false}>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-stone-500 mt-2">
                  — DR. DEEPAL SHAH
                </p>
              </FadeUp>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
