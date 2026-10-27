import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  TREATMENT_OPTIONS,
  CLINIC_INFO,
  formatWhatsAppBookingUrl,
} from '../utils/clinic-data';
import {
  ScrollReveal,
  TextReveal,
  FadeUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from './ScrollReveal';

export const BookVisitSection: React.FC = () => {
  const [treatment, setTreatment] = useState(TREATMENT_OPTIONS[0]);
  const [dateOption, setDateOption] = useState('Tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 1:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookedStatus, setBookedStatus] = useState(false);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveDate = dateOption === 'Custom Date' && customDate ? customDate : dateOption;
    const url = formatWhatsAppBookingUrl({
      treatment,
      date: effectiveDate,
      timeSlot,
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
    });

    // Save record to backend
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || 'WhatsApp Patient',
        phone: phone || CLINIC_INFO.phoneMobile,
        service: treatment,
        preferredDate: effectiveDate,
        preferredTime: timeSlot,
        notes,
      }),
    }).catch(() => {});

    setBookedStatus(true);
    window.open(url, '_blank');
  };

  return (
    <section id="book" className="py-8 sm:py-12 bg-[#F7F4E9] border-t border-[#E5DEC8] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left info column */}
          <div className="md:col-span-5 space-y-4">
            <ScrollReveal animation="slide-down" delay={20} once={false}>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#293549] fill-[#293549]/20" />
                <span>DIRECT APPOINTMENTS</span>
              </div>
            </ScrollReveal>

            <TextReveal
              text="Schedule Your Visit with Dr. Deepal"
              as="h2"
              className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight"
              highlightWords={['Dr.', 'Deepal']}
              highlightClass="text-[#293549]"
              delay={40}
              once={false}
            />

            <FadeUp delay={60} once={false}>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Experience gentle, unhurried dentistry. Confirm instantly over WhatsApp or reserve a call back with our reception team.
              </p>
            </FadeUp>

            <StaggerContainer
              staggerDelay={0.06}
              delayChildren={0.08}
              once={false}
              className="pt-2 space-y-2.5 text-xs text-stone-700"
            >
              <StaggerItem>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#293549] shrink-0" />
                  <span>Mon–Fri: 11:00 am – 7:00 pm | Sat: 11:00 am – 4:00 pm</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#293549] shrink-0" />
                  <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="font-bold hover:underline">
                    Mobile: {CLINIC_INFO.phoneMobile}
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right: Exact Card matching image_f9c8b7eb with ScaleIn */}
          <div className="md:col-span-7">
            <ScaleIn delay={60} duration={0.65} once={false}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-t-8 border-t-[#293549] shadow-2xl relative transition-shadow hover:shadow-[0_24px_50px_rgba(41,53,73,0.18)]">
                {/* Header */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-2 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#293549] fill-[#293549]/20" />
                    <span>GUIDE BLDG · MALABAR HILL</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
                    BOOK YOUR VISIT
                  </h3>
                </div>

                {bookedStatus && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 font-medium animate-fade-up">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp conversation opened! You can also reach out anytime.</span>
                  </div>
                )}

                <form onSubmit={handleWhatsAppBooking} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Treatment
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs sm:text-sm bg-white border-2 border-[#293549] rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#293549]/30 shadow-2xs cursor-pointer"
                    >
                      {TREATMENT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="font-medium text-slate-900 py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <select
                        value={dateOption}
                        onChange={(e) => setDateOption(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Monday">Monday</option>
                        <option value="Custom Date">Select Custom Date...</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      >
                        <option value="11:00 AM – 1:00 PM">11:00 AM – 1:00 PM</option>
                        <option value="1:00 PM – 3:00 PM">1:00 PM – 3:00 PM</option>
                        <option value="3:00 PM – 5:00 PM">3:00 PM – 5:00 PM</option>
                        <option value="5:00 PM – 7:00 PM">5:00 PM – 7:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {dateOption === 'Custom Date' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  {/* Patient Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Radhika"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Mobile Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 98200..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Primary Button with smooth hover lift */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-5 rounded-2xl bg-[#293549] hover:bg-[#1E2838] active:scale-[0.99] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#293549]/20 transition-all cursor-pointer hover-lift"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>CONFIRM & BOOK ON WHATSAPP ↗</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Dr. Deepal Shah • 1-on-1 Consultation</span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneMobile}`}
                      className="font-bold text-[#293549] hover:underline"
                    >
                      {CLINIC_INFO.phoneMobile}
                    </a>
                  </div>
                </form>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
};
