import React, { useState, useRef, useEffect } from 'react';
import {
  Star,
  ExternalLink,
  ThumbsUp,
  Share2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { REVIEWS_DATA, CLINIC_INFO } from '../utils/clinic-data';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from './ScrollReveal';

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking,
}) => {
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 360;
    const newIndex = Math.min(
      REVIEWS_DATA.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons, { passive: true });
      updateScrollButtons();
    }
    return () => el?.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const handleScrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -380, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 380, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-8 sm:py-12 bg-[#F7F4E9] border-t border-[#E8E2D6] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <ScrollReveal animation="slide-down" delay={20} once={false}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-2xs mb-2">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-[11px] font-semibold text-stone-800">
                  Official Google Maps Reviews
                </span>
                <span className="text-stone-300">|</span>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>5.0</span>
                </div>
              </div>
            </ScrollReveal>

            <TextReveal
              text="Patient Stories & Reviews"
              as="h2"
              className="font-serif-clinic text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B221C] tracking-tight"
              highlightWords={['Reviews']}
              highlightClass="text-[#293549]"
              delay={40}
              once={false}
            />

            <FadeUp delay={60} once={false}>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Verified experiences from patients at Dr. Deepal's Dental Clinic, Malabar Hill.
              </p>
            </FadeUp>
          </div>

          {/* Left/Right Carousel Controls */}
          <ScrollReveal animation="slide-left" delay={70} once={false}>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-[11px] font-medium text-stone-500 mr-2 hidden sm:inline">
                Slide left & right
              </span>
              <button
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                aria-label="Previous reviews"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-white hover:bg-[#293549] hover:text-white text-stone-700 border-stone-300 shadow-xs hover-lift'
                    : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                aria-label="Next reviews"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-[#293549] hover:bg-[#1E2838] text-white border-[#293549] shadow-xs hover-lift'
                    : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal Reviews Track with StaggerContainer */}
        <ScrollReveal animation="fade-up" delay={80} duration={0.6} once={false}>
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-2 px-0.5"
            tabIndex={0}
            role="region"
            aria-label="Reviews slider"
          >
            {REVIEWS_DATA.map((rev) => {
              const isLiked = !!likedReviews[rev.id];
              return (
                <div
                  key={rev.id}
                  className="snap-start shrink-0 w-[290px] sm:w-[350px] md:w-[380px] bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 hover-lift flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-2xs"
                          style={{ backgroundColor: rev.avatarBg || '#2E7D32' }}
                        >
                          {rev.avatarInitial || rev.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                              {rev.name}
                            </h3>
                            <span title="Verified Patient on Google" className="inline-flex items-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-500 font-normal">
                            {rev.reviewCountInfo}
                          </p>
                        </div>
                      </div>

                      <a
                        href={CLINIC_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-stone-600 p-1 transition-colors"
                        title="View on Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        {rev.rating < 5 && (
                          <Star className="w-3.5 h-3.5 fill-stone-200 text-stone-300" />
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 font-medium">
                        {rev.timeAgo}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal line-clamp-5">
                      {rev.text}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(rev.id)}
                        className={`inline-flex items-center gap-1 cursor-pointer transition-colors text-[11px] ${
                          isLiked ? 'text-blue-600 font-semibold' : 'hover:text-stone-800'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600' : ''}`} />
                        <span>{isLiked ? 'Helpful (1)' : 'Helpful'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `Review by ${rev.name} for Dr. Deepal's Dental Clinic`,
                              text: rev.text,
                              url: CLINIC_INFO.googleMapsUrl,
                            });
                          } else {
                            window.open(CLINIC_INFO.googleMapsUrl, '_blank');
                          }
                        }}
                        className="inline-flex items-center gap-1 hover:text-stone-800 cursor-pointer transition-colors text-[11px]"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>

                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium">
                      Google Review
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Carousel Pagination Dots & Direct Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5">
            {REVIEWS_DATA.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => {
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: i * 360, behavior: 'smooth' });
                  }
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === i ? 'w-5 bg-[#293549]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-medium text-xs border border-stone-300 shadow-2xs transition-colors hover-lift"
            >
              <span>View Google Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-medium text-xs shadow-xs transition-all hover-lift cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
