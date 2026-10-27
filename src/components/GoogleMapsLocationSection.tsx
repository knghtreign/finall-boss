import React from 'react';
import {
  Compass,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  Star,
  Navigation,
  Clock,
} from 'lucide-react';
import { CLINIC_INFO } from '../utils/clinic-data';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from './ScrollReveal';

export const GoogleMapsLocationSection: React.FC = () => {
  return (
    <section id="location" className="py-8 sm:py-12 bg-[#F7F4E9] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <ScrollReveal animation="slide-down" delay={20} once={false}>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs mb-2">
                <Compass className="w-3.5 h-3.5 text-[#293549]" />
                <span>MALABAR HILL, MUMBAI</span>
              </div>
            </ScrollReveal>

            <TextReveal
              text="Visit Our Clinic in Malabar Hill"
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1E252B] leading-tight"
              highlightWords={['Our', 'Clinic']}
              highlightClass="text-[#293549]"
              delay={40}
              once={false}
            />
          </div>

          {/* Right side: Address text and contact pill buttons */}
          <div className="flex flex-col lg:items-end space-y-2.5 max-w-xl">
            <FadeUp delay={60} once={false}>
              <p className="text-xs sm:text-[13px] text-stone-600 font-medium lg:text-right leading-relaxed">
                Guide Building, (Gate No. 2), Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006
              </p>
            </FadeUp>

            {/* Pills with StaggerContainer */}
            <StaggerContainer
              staggerDelay={0.06}
              delayChildren={0.08}
              once={false}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              <StaggerItem>
                <a
                  href="tel:7977776136"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-stone-900 text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-[#D5E1EE] transition-colors hover-lift"
                >
                  <Phone className="w-3.5 h-3.5 text-[#293549]" />
                  <span>7977776136</span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href="tel:02235767495"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-stone-900 text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-[#D5E1EE] transition-colors hover-lift"
                >
                  <Phone className="w-3.5 h-3.5 text-[#293549]" />
                  <span>022 35767495</span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href="mailto:drdeepalshah@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-800 text-[11px] sm:text-xs font-semibold shadow-2xs hover:bg-stone-50 transition-colors hover-lift"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-600" />
                  <span>Email Clinic</span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-800 text-[11px] sm:text-xs font-semibold shadow-2xs hover:bg-stone-50 transition-colors hover-lift"
                >
                  <span>Google Profile</span>
                  <ExternalLink className="w-3 h-3 text-stone-600" />
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href="https://wa.me/917977776136?text=Hi%20Dr.%20Deepal,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#293549] text-[#F0C05A] text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-[#1E2838] transition-colors hover-lift"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.972.53 1.884.822 2.781.822 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.385 8.163c-.144.405-.837.774-1.17.822-.312.043-.687.068-2.083-.497-1.789-.724-2.936-2.545-3.025-2.664-.089-.119-.723-.961-.723-1.832 0-.871.455-1.299.616-1.478.162-.179.354-.224.472-.224.118 0 .237.001.341.006.109.005.257-.041.401.306.149.359.508 1.238.552 1.328.044.089.073.194.015.313-.059.119-.089.194-.177.298-.089.105-.187.234-.267.314-.089.089-.181.187-.078.365.103.178.459.757.986 1.226.678.604 1.25.791 1.428.88.178.089.281.074.385-.045.104-.119.444-.517.562-.695.118-.178.236-.149.399-.089.163.059 1.034.488 1.211.577.177.089.296.134.34.209.044.074.044.433-.1 1.042zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.447 5.167L2 22l4.98-1.309C8.423 21.536 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.062c-1.636 0-3.173-.483-4.474-1.314l-.32-.206-2.962.777.791-2.887-.225-.358C3.914 14.717 3.438 13.392 3.438 12c0-4.721 3.841-8.562 8.562-8.562 4.721 0 8.562 3.841 8.562 8.562 0 4.721-3.841 8.562-8.562 8.562z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href="https://wa.me/917977776136?text=Hi%20Dr.%20Deepal,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#293549] text-white text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-[#1E2838] transition-colors hover-lift"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  <span>Google Chat</span>
                </a>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        {/* Map Enclosure with ScaleIn */}
        <ScaleIn delay={80} duration={0.65} once={false}>
          <div className="relative rounded-[24px] sm:rounded-[36px] border-2 sm:border-4 border-slate-900 overflow-hidden shadow-2xl bg-[#D6E6F0] h-[280px] sm:h-[400px] w-full">
            <iframe
              title="Dr. Deepal's Dental Clinic Malabar Hill Map"
              src="https://maps.google.com/maps?q=Dr.+Deepal%27s+Dental+clinic+Malabar+Hill+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Google Place Profile Card */}
            <div className="absolute top-4 left-4 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200 z-10 hidden sm:block">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Dr. Deepal's Dental clinic
              </h3>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                Shop No.9, Gate no.2, LD Ruparel Marg, near Priyadarshini Park, Malabar Hill, Mumbai, Maharashtra 400006, India
              </p>

              <div className="flex items-center gap-1.5 mt-2 text-xs text-stone-700">
                <span className="font-bold">5.0</span>
                <div className="flex text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-blue-600 font-semibold cursor-pointer underline">
                  (87)
                </span>
                <span className="text-stone-400 text-[10px]">ⓘ</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold shadow-xs transition-colors hover-lift"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Maps</span>
                </a>

                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1A73E8] flex items-center justify-center transition-colors shadow-xs hover-lift"
                  aria-label="Directions"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Mobile Profile Card */}
        <div className="sm:hidden mt-3 bg-white rounded-2xl p-3.5 shadow-md border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Dr. Deepal's Dental clinic
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-700">
                <span className="font-bold">5.0</span>
                <div className="flex text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-blue-600 font-semibold">(87 Google Reviews)</span>
              </div>
            </div>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#1A73E8] text-white text-xs font-bold shadow-sm hover-lift"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* Official Business Card and Clinic Hours with StaggerContainer */}
        <StaggerContainer
          staggerDelay={0.1}
          delayChildren={0.08}
          once={false}
          className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* Card 1: Official Business Card */}
          <StaggerItem>
            <div className="bg-[#FAF8F5] border border-[#EBE4D8] rounded-[28px] p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover-lift h-full">
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#293549] uppercase block">
                  OFFICIAL BUSINESS CARD
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug mt-3">
                  Dr. Deepal Shah
                </h3>
                <p className="text-stone-600 text-sm sm:text-base font-medium mt-1">
                  Orthodontist & Dental Surgeon
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${CLINIC_INFO.phoneMobile.replace(/\s+/g, '')}`}
                  className="group flex items-start gap-3.5 p-1 rounded-2xl hover:bg-stone-200/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-stone-700 shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs">
                    <Phone className="w-4 h-4 text-stone-800" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#293549] transition-colors">
                      {CLINIC_INFO.phoneMobile}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-500 font-medium">
                      {CLINIC_INFO.phoneLandline} (Landline)
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="group flex items-center gap-3.5 p-1 rounded-2xl hover:bg-stone-200/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-stone-700 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-4 h-4 text-stone-800" />
                  </div>
                  <div className="text-sm sm:text-base font-medium text-stone-800 group-hover:text-[#293549] transition-colors truncate">
                    {CLINIC_INFO.email}
                  </div>
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Clinic Hours Card */}
          <StaggerItem>
            <div className="bg-white border border-stone-200/90 rounded-[28px] p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover-lift h-full">
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-stone-100">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs sm:text-sm tracking-wider uppercase">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-stone-700" />
                  <span>CLINIC HOURS</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FADF] text-[#027A48] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-pulse" />
                  Open Now
                </span>
              </div>

              <div className="mt-2 divide-y divide-stone-100">
                {CLINIC_INFO.hours.map((item) => {
                  const isClosed = item.time.toLowerCase() === 'closed';
                  return (
                    <div
                      key={item.day}
                      className="py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium"
                    >
                      <span className="text-stone-700">{item.day}</span>
                      <span className={isClosed ? 'text-stone-400 font-medium' : 'text-stone-900 font-semibold'}>
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
