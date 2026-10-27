import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnimatedStatsSection } from './components/AnimatedStatsSection';
import { ServicesSection } from './components/ServicesSection';
import { SmileTransformationSlider } from './components/SmileTransformationSlider';
import { TreatmentJourneySection } from './components/TreatmentJourneySection';
import { PhotoGalleryStrip } from './components/PhotoGalleryStrip';
import { LeadClinicianSection } from './components/LeadClinicianSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HealthySmilesBanner } from './components/HealthySmilesBanner';
import { PatientFaqSection } from './components/PatientFaqSection';
import { BookVisitSection } from './components/BookVisitSection';
import { GoogleMapsLocationSection } from './components/GoogleMapsLocationSection';
import { Footer } from './components/Footer';
import {
  BookingModal,
  SmileSimulatorModal,
  HighThinkingAdvisorModal,
  MapsDirectionsModal,
} from './components/InteractiveModals';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState('');
  const [isSmileSimulatorOpen, setIsSmileSimulatorOpen] = useState(false);
  const [isAiConsultOpen, setIsAiConsultOpen] = useState(false);
  const [isMapsModalOpen, setIsMapsModalOpen] = useState(false);

  const handleOpenBooking = (serviceTitle?: string) => {
    setSelectedServiceToBook(serviceTitle || '');
    setIsBookingOpen(true);
  };

  const handleOpenAiConsult = (serviceTitle?: string) => {
    setSelectedServiceToBook(serviceTitle || '');
    setIsAiConsultOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#1C241E] font-sans selection:bg-[#293549] selection:text-white overflow-x-clip">
      {/* 1. Navbar with Top Scroll Progress Bar & Dynamic Depth */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenSmileSimulator={() => setIsSmileSimulatorOpen(true)}
        onOpenMapsModal={() => setIsMapsModalOpen(true)}
      />

      <main>
        {/* 2. Hero Section: Word-by-word reveal, scroll-linked parallax artwork & ambient lighting */}
        <HeroSection
          onScheduleConsultation={() => handleOpenBooking('General Checkup')}
          onExploreServices={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSmileSimulator={() => setIsSmileSimulatorOpen(true)}
        />

        {/* 3. Animated Impact Stats Counter: Bidirectional numeric count-up with staggered cards */}
        <AnimatedStatsSection />

        {/* 4. Comprehensive Services 3D Coverflow: Smooth text reveals & perspective coverflow */}
        <ServicesSection
          onSelectServiceToBook={(title) => handleOpenBooking(title)}
          onOpenAiConsult={(title) => handleOpenAiConsult(title)}
        />

        {/* 5. Interactive Before & After Smile Slider: Scale-in visualizer with fluid drag handle */}
        <SmileTransformationSlider
          onOpenBooking={() => handleOpenBooking('Teeth Straightening (Invisible Braces)')}
          onOpenSmileSimulator={() => setIsSmileSimulatorOpen(true)}
        />

        {/* 6. What Happens When You Visit?: Staggered journey tabs & animated step card */}
        <TreatmentJourneySection
          onOpenBooking={() => handleOpenBooking('General Checkup')}
        />

        {/* 7. Gallery with Staggered Grid, hover-lift and smooth lightbox */}
        <PhotoGalleryStrip />

        {/* 8. Lead Clinician Personal Care by Dr. Deepal Shah: Parallax glow & doctor profile */}
        <LeadClinicianSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Real Google Maps Patient Reviews: Staggered horizontal track */}
        <div id="reviews">
          <TestimonialsSection
            onOpenBooking={() => handleOpenBooking()}
          />
        </div>

        {/* 10. Healthy Smiles, Happy Lives Banner: Fluid social buttons & script signature */}
        <HealthySmilesBanner />

        {/* 11. Patient Frequently Asked Questions: Smooth accordion expand/collapse */}
        <div id="faq">
          <PatientFaqSection />
        </div>

        {/* 12. Book Your Visit Direct Form: ScaleIn appointment card */}
        <BookVisitSection />

        {/* 13. Google Maps Clinic Location: Map enclosure & contact business cards */}
        <div id="location">
          <GoogleMapsLocationSection />
        </div>
      </main>

      {/* 14. Footer with Staggered Columns & Malabar Hill contacts */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMapsModal={() => setIsMapsModalOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedServiceToBook}
      />

      {/* AI Smile Simulator Modal */}
      <SmileSimulatorModal
        isOpen={isSmileSimulatorOpen}
        onClose={() => setIsSmileSimulatorOpen(false)}
        onBookConsultation={() => {
          setIsSmileSimulatorOpen(false);
          handleOpenBooking('Smile Makeover');
        }}
      />

      {/* AI Advisor Modal */}
      <HighThinkingAdvisorModal
        isOpen={isAiConsultOpen}
        onClose={() => setIsAiConsultOpen(false)}
        initialService={selectedServiceToBook}
      />

      {/* Google Maps Directions Modal */}
      <MapsDirectionsModal
        isOpen={isMapsModalOpen}
        onClose={() => setIsMapsModalOpen(false)}
      />
    </div>
  );
}
