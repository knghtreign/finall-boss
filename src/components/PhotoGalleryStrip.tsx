import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';

interface PhotoItem {
  id: string;
  url: string;
  alt: string;
}

// Authentic gallery photos preserving original uncropped aspect ratios
const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'gallery-img-1',
    url: '/assets/user/gal1.webp',
    alt: 'Clinical Smile Transformation - Dr. Deepals Dental Clinic',
  },
  {
    id: 'gallery-img-2',
    url: '/assets/user/gal2.webp',
    alt: 'Modern Operatory and Practice Environment - Malabar Hill',
  },
  {
    id: 'gallery-img-3',
    url: '/assets/user/gal3.webp',
    alt: 'Precision Aesthetic Dental Results and Patient Care',
  },
  {
    id: 'gallery-img-4',
    url: '/assets/user/gal4.webp',
    alt: 'Clinical Treatment Equipment and Examination Suite',
  },
  {
    id: 'gallery-img-5',
    url: '/assets/user/gal5.webp',
    alt: 'Radiant Smile Result and Alignment Dentistry',
  },
  {
    id: 'gallery-img-6',
    url: '/assets/user/gal6.webp',
    alt: 'Sterile Operatory Setting and Patient Care Facilities',
  },
];

export const PhotoGalleryStrip: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(
        (activePhotoIdx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % GALLERY_PHOTOS.length);
    }
  };

  return (
    <section id="gallery" className="py-8 sm:py-12 bg-[#F7F4E9] overflow-hidden border-t border-[#E6DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - Clean title without filter pills or category options */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <TextReveal
            text="Gallery & Results"
            as="h2"
            className="font-serif-clinic text-3xl sm:text-4xl font-bold text-[#1C221D]"
            highlightWords={['Results']}
            highlightClass="text-[#293549]"
            delay={30}
            once={false}
          />
          <FadeUp delay={60} once={false}>
            <div className="w-10 h-0.5 bg-[#293549] mx-auto mt-2.5 mb-2 rounded-full" />
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Authentic glimpses of our Malabar Hill practice and patient smiles.
            </p>
          </FadeUp>
        </div>

        {/* Uncropped Responsive Image Grid (columns masonry preserving each photo's true aspect ratio) */}
        <StaggerContainer
          staggerDelay={0.07}
          delayChildren={0.06}
          once={false}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5"
        >
          {GALLERY_PHOTOS.map((photo, index) => (
            <StaggerItem key={photo.id} distance={18} scale={0.97} className="break-inside-avoid mb-4 sm:mb-5 inline-block w-full">
              <div
                onClick={() => setActivePhotoIdx(index)}
                className="group relative rounded-2xl overflow-hidden bg-[#EFECE3] border border-[#DDD4C3] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer p-1.5"
              >
                {/* Image rendered in its natural uncropped aspect ratio */}
                <div className="relative rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] block"
                  />
                  {/* Subtle hover overlay with zoom icon only - no text */}
                  <div className="absolute inset-0 bg-[#1C2534]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#1C2534] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Lightbox Modal with uncropped display and navigation */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: LUXURY_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#18212D] rounded-3xl overflow-hidden shadow-2xl border border-stone-700 p-2 sm:p-3 flex flex-col items-center justify-center"
            >
              {/* Uncropped Full Photo Container */}
              <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50">
                <img
                  src={GALLERY_PHOTOS[activePhotoIdx].url}
                  alt={GALLERY_PHOTOS[activePhotoIdx].alt}
                  className="max-h-[78vh] w-auto max-w-full object-contain select-none"
                />

                {/* Left arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Close button */}
                <button
                  onClick={() => setActivePhotoIdx(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Minimalist image indicator (e.g. 1 / 8) without any text labels */}
              <div className="w-full pt-3 pb-1 px-4 flex items-center justify-between text-stone-300 text-xs font-semibold">
                <span className="text-stone-400">Dr. Deepal's Dental Clinic</span>
                <span>
                  {activePhotoIdx + 1} / {GALLERY_PHOTOS.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
