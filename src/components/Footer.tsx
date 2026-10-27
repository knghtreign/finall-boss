import React from 'react';
import { Clock, MapPin, Heart, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../utils/clinic-data';
import { StaggerContainer, StaggerItem, FadeUp } from './ScrollReveal';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMapsModal: () => void;
  onOpenSmileSimulator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
}) => {
  return (
    <footer id="contact" className="bg-[#1C231F] text-stone-300 pt-12 pb-8 border-t border-stone-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <StaggerContainer
          staggerDelay={0.08}
          delayChildren={0.05}
          once={false}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
        >
          {/* Col 1: Brand */}
          <StaggerItem distance={18}>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center p-1.5">
                  <svg
                    className="w-full h-full text-sky-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M12 2C8.5 2 6 4 6 7c0 3 1.5 5 2 8 0.5 3 1.5 7 4 7s3.5-4 4-7c0.5-3 2-5 2-8 0-3-2.5-5-6-5z" />
                    <path d="M9 12c1 1.5 2 2 3 2s2-0.5 3-2" />
                  </svg>
                </div>
                <div>
                  <span className="font-serif-clinic text-lg font-bold text-white block leading-tight">
                    Dr. Deepal's
                  </span>
                  <span className="text-[9px] tracking-widest text-sky-400 uppercase font-semibold">
                    DENTAL CLINIC
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Personalized orthodontics and aesthetic dental care by Dr. Deepal Shah.
              </p>

              <p className="font-script text-2xl text-sky-300">
                Healthy Smiles, Happy Lives ♡
              </p>
            </div>
          </StaggerItem>

          {/* Col 2: Quick Links */}
          <StaggerItem distance={18}>
            <div className="space-y-2.5 text-xs">
              <h4 className="font-serif-clinic text-base font-bold text-white">
                Quick Navigation
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Clear Aligners & Services
                  </a>
                </li>
                <li>
                  <a href="#transformation" className="hover:text-white transition-colors">
                    Smile Transformations
                  </a>
                </li>
                <li>
                  <a href="#journey" className="hover:text-white transition-colors">
                    4-Step Smile Journey
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors">
                    Gallery & Results
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-white transition-colors">
                    Google Maps Reviews
                  </a>
                </li>
                <li>
                  <a href="#book" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                    Book Your Visit
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Patient FAQ
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-white transition-colors">
                    Google Maps & Directions
                  </a>
                </li>
              </ul>
            </div>
          </StaggerItem>

          {/* Col 3: Exact Clinic Hours from Google Maps */}
          <StaggerItem distance={18}>
            <div className="space-y-2.5 text-xs">
              <h4 className="font-serif-clinic text-base font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Clinic Hours</span>
              </h4>
              <div className="space-y-1 text-stone-400 text-[11px]">
                <p className="text-white font-medium">Mon – Fri: 11:00 am – 7:00 pm</p>
                <p className="text-white font-medium">Saturday: 11:00 am – 4:00 pm</p>
                <p className="text-stone-500">Sunday: Closed</p>
              </div>
            </div>
          </StaggerItem>

          {/* Col 4: Location & Visiting Card Contacts */}
          <StaggerItem distance={18}>
            <div className="space-y-2.5 text-xs">
              <h4 className="font-serif-clinic text-base font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Malabar Hill Practice</span>
              </h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Shop No.9, Gate no.2, Empire Guide Building, LD Ruparel Marg, Malabar Hill, Mumbai - 400006
              </p>
              <div className="space-y-1 text-stone-300 font-medium">
                <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="hover:text-white block transition-colors">
                  {CLINIC_INFO.phoneMobile}
                </a>
                <a href={`tel:${CLINIC_INFO.phoneLandline}`} className="hover:text-white block text-stone-400 transition-colors">
                  {CLINIC_INFO.phoneLandline} (Landline)
                </a>
                <a href={`mailto:${CLINIC_INFO.email}`} className="text-sky-400 hover:underline block text-[11px]">
                  {CLINIC_INFO.email}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom bar */}
        <FadeUp delay={80} once={false}>
          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} Dr. Deepal's Dental Clinic. Malabar Hill, Mumbai.</p>
            <div className="flex items-center gap-2 text-sky-400 font-medium">
              <Heart className="w-3 h-3 fill-sky-400" />
              <span>Your smile is in good hands</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </footer>
  );
};
