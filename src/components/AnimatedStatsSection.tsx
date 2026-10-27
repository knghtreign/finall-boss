import React, { useState, useEffect, useRef } from 'react';
import { CLINIC_STATS } from '../utils/clinic-data';
import { Award, Users, ShieldCheck, Star } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { StaggerContainer, StaggerItem, LUXURY_EASE } from './ScrollReveal';

export const AnimatedStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Bidirectional trigger: once: false ensures it re-triggers when scrolling up and down!
  const isInView = useInView(sectionRef, { amount: 0.3, once: false });
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) {
      // Reset to 0 when exiting viewport so it re-counts smoothly on re-entry!
      if (!shouldReduceMotion) {
        setCounts([0, 0, 0, 0]);
      }
      return;
    }

    if (shouldReduceMotion) {
      setCounts(CLINIC_STATS.map((s) => s.target));
      return;
    }

    const durationMs = 1200;
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Fluid cubic deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts = CLINIC_STATS.map((stat) => {
        return Math.floor(stat.target * easeProgress);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCounts(CLINIC_STATS.map((s) => s.target));
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, shouldReduceMotion]);

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'exp':
        return <Award className="w-3.5 h-3.5 text-[#293549]" />;
      case 'smiles':
        return <Users className="w-3.5 h-3.5 text-[#293549]" />;
      case 'painfree':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#293549]" />;
      case 'rating':
        return <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />;
      default:
        return <Award className="w-3.5 h-3.5 text-[#293549]" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-3 sm:py-4 bg-[#F7F4E9] border-y border-[#E6DFD2] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF7F0] rounded-2xl border border-[#E2DBD0] shadow-xs px-4 py-3 sm:py-4">
          <StaggerContainer
            staggerDelay={0.08}
            delayChildren={0.05}
            once={false}
            className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EAE4D7]"
          >
            {CLINIC_STATS.map((stat, idx) => (
              <StaggerItem
                key={stat.id}
                distance={16}
                scale={0.97}
                className="py-2.5 sm:py-1 px-3 text-center flex flex-col items-center justify-center transition-all duration-300 hover-lift group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-6 h-6 rounded-full bg-[#EAE4D7]/80 group-hover:bg-[#EAE4D7] flex items-center justify-center transition-colors">
                    {getStatIcon(stat.id)}
                  </div>
                  <div className="font-serif-clinic text-lg sm:text-2xl font-bold text-[#1A1F1B] tracking-tight tabular-nums">
                    {stat.id === 'rating' ? (
                      <span>
                        {counts[idx]}.0{stat.suffix === '.0' ? '' : stat.suffix}
                      </span>
                    ) : (
                      <span>
                        {counts[idx].toLocaleString()}
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
