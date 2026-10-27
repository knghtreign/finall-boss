import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from './ScrollReveal';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onOpenSmileSimulator: () => void;
  onOpenMapsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked progress bar and glassmorphic depth
  const { scrollY, scrollYProgress } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);
  const navBorderOpacity = useTransform(scrollY, [0, 80], [0.4, 0.9]);
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 8px 24px -6px rgba(41,53,73,0.08)']
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = [
            'home',
            'services',
            'transformation',
            'journey',
            'gallery',
            'about',
            'reviews',
            'faq',
            'book',
            'location',
          ];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 160 && rect.bottom >= 160) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Transformations', href: '#transformation', id: 'transformation' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Location', href: '#location', id: 'location' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the top with fluid gradient */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E8E2D6]/40 z-50 overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#293549] via-[#435777] to-[#F0C05A] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <motion.header
        style={{
          boxShadow: navShadow,
        }}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
        className="sticky top-0 z-40 bg-[#F7F4E9]/95 backdrop-blur-md border-b border-[#E3DCce] transition-colors"
      >
        {/* Top minimal clinic alert bar */}
        <div className="bg-[#293549] text-white text-[11px] sm:text-xs py-1.5 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F0C05A] animate-pulse" />
              <span className="font-medium tracking-wide">
                Dr. Deepal Shah • Malabar Hill, Mumbai
              </span>
            </div>
            <div className="flex items-center gap-4 text-stone-200">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Dr.+Deepal%27s+Dental+clinic+Malabar+Hill+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#F0C05A]" />
                <span>Google Maps</span>
              </a>
              <a
                href="tel:+917977776136"
                className="flex items-center gap-1 hover:text-white font-medium"
              >
                <Phone className="w-3 h-3 text-[#F0C05A]" />
                <span>+91 79777 76136</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo with curved boundary */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border-2 border-[#D5CCBA] p-1.5 shadow-xs flex items-center justify-center overflow-hidden group-hover:border-[#293549] group-hover:scale-105 group-hover:shadow-md transition-all">
              <img
                src="/assets/aistudio/image_15ca881b.png"
                alt="Dr. Deepal's Dental Clinic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-clinic text-lg sm:text-xl font-bold tracking-tight text-[#1A1E1A] leading-none">
                Dr. Deepal's
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#293549] uppercase mt-0.5">
                DENTAL CLINIC
              </span>
            </div>
          </a>

          {/* Desktop Links with animated gliding indicator */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-stone-600 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors py-1.5 px-1 relative ${
                    isActive ? 'text-[#293549] font-bold' : 'hover:text-[#293549]'
                  }`}
                >
                  {link.label}
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#293549] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA with smooth hover elevation */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#293549] hover:bg-[#1E2838] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 rounded-full transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/50 cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown with smooth slide-down */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            className="lg:hidden bg-[#F2EDE1] border-b border-[#DCD3C0] px-6 py-4 space-y-2.5 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-medium py-1.5 transition-colors ${
                  activeSection === link.id ? 'text-[#293549] font-bold' : 'text-stone-700'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-300 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#293549] rounded-full shadow-sm hover:bg-[#1E2838] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};
