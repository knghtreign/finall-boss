import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  ScaleIn,
} from './ScrollReveal';
import { motion } from 'motion/react';

interface SmileTransformationSliderProps {
  onOpenBooking: () => void;
  onOpenSmileSimulator: () => void;
}

export const SmileTransformationSlider: React.FC<SmileTransformationSliderProps> = ({
  onOpenBooking,
  onOpenSmileSimulator,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <section id="transformation" className="py-8 sm:py-12 bg-[#F7F4E9] border-t border-[#E6DFD1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <ScrollReveal animation="slide-down" delay={30} once={false}>
            <span className="text-[11px] font-bold tracking-widest text-[#293549] uppercase">
              Interactive Visualizer
            </span>
          </ScrollReveal>

          <div className="mt-1">
            <TextReveal
              text="Real Smile Transformations"
              as="h2"
              className="font-serif-clinic text-3xl sm:text-4xl font-bold text-[#1C221D]"
              highlightWords={['Smile']}
              highlightClass="text-[#293549]"
              delay={60}
              once={false}
            />
          </div>

          <ScrollReveal animation="scale-up" delay={80} once={false}>
            <div className="w-10 h-0.5 bg-[#293549] mx-auto mt-2.5 mb-2 rounded-full" />
          </ScrollReveal>

          <FadeUp delay={100} once={false}>
            <p className="text-xs sm:text-sm text-stone-600">
              Slide horizontally to see the result of Dr. Shah's clear aligners.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Before / After Comparison Slider Container with NO cropping & glitch-free pointer capture */}
        <ScaleIn delay={120} duration={0.65} once={false} className="max-w-md sm:max-w-lg mx-auto">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DDD5C5] select-none cursor-ew-resize bg-stone-900 group touch-none"
            role="slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Comparison slider between before and after treatment"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
            }}
          >
            {/* After Image: natural document flow keeps natural aspect ratio without cropping */}
            <img
              src="/assets/user/after.png"
              alt="After smile transformation"
              className="w-full h-auto block select-none pointer-events-none"
              draggable={false}
            />
            <div className="absolute top-4 right-4 bg-[#293549]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs pointer-events-none z-10">
              After: Straightened Smile
            </div>

            {/* Before Image: exact matching overlay clipped using CSS clipPath (100% glitch-free) */}
            <div
              className="absolute inset-0 select-none pointer-events-none overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="/assets/user/before.png"
                alt="Before smile transformation"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-stone-900/80 text-stone-200 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs pointer-events-none z-10">
                Before Treatment
              </div>
            </div>

            {/* Divider Line & Draggable Handle: instant, silky smooth with no transition lag */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)] pointer-events-none z-20"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-white text-[#293549] border-2 border-[#293549] shadow-xl flex items-center justify-center pointer-events-none transition-transform group-hover:scale-105">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 px-2">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#293549] animate-pulse" />
              Average Treatment: 6 – 9 Months
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSmileSimulator}
                className="text-[#293549] font-semibold hover:underline flex items-center gap-1 cursor-pointer transition-colors hover:text-[#1c241e]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulate Your Smile</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-[#293549] hover:bg-[#1E2838] hover:-translate-y-0.5 active:translate-y-0 text-white rounded-full font-semibold transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                Book Your Scan
              </button>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};
