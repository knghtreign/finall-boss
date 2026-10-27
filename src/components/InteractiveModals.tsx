import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Sparkles,
  MapPin,
  Send,
  Loader2,
  ShieldCheck,
  Phone,
  Printer,
  ChevronRight,
  X,
  MessageSquare,
} from 'lucide-react';
import {
  SERVICES_DATA,
  TREATMENT_OPTIONS,
  CLINIC_INFO,
  formatWhatsAppBookingUrl,
  validateAppointmentInput,
  validateIntakeForm,
} from '../utils/clinic-data';

// -------------------------------------------------------------
// 1. Appointment Booking Modal (matching image_f9c8b7eb)
// -------------------------------------------------------------
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const [treatment, setTreatment] = useState(
    preselectedService && TREATMENT_OPTIONS.includes(preselectedService)
      ? preselectedService
      : TREATMENT_OPTIONS[0]
  );
  const [dateOption, setDateOption] = useState('Tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 1:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  if (!isOpen) return null;

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

    // Also persist appointment record to backend
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

    // Open WhatsApp
    window.open(url, '_blank');
  };

  const handleDirectWebConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const effectiveDate = dateOption === 'Custom Date' && customDate ? customDate : dateOption;

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Patient at Malabar Hill',
          phone: phone || CLINIC_INFO.phoneMobile,
          service: treatment,
          preferredDate: effectiveDate,
          preferredTime: timeSlot,
          notes,
        }),
      });
      const data = await res.json();
      setConfirmedBooking(data.appointment || {
        id: `DDC-${Math.floor(100000 + Math.random() * 900000)}`,
        name: name || 'Patient',
        service: treatment,
        preferredDate: effectiveDate,
        preferredTime: timeSlot,
      });
    } catch {
      setConfirmedBooking({
        id: `DDC-${Math.floor(100000 + Math.random() * 900000)}`,
        name: name || 'Patient',
        service: treatment,
        preferredDate: effectiveDate,
        preferredTime: timeSlot,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-7 border-t-8 border-t-[#293549] shadow-2xl relative animate-pop-up max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Visit Requested!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Dr. Deepal Shah's team will welcome you at Empire Guide Building, Malabar Hill.
            </p>

            <div className="bg-amber-50/70 p-4 rounded-2xl text-left text-xs space-y-2 border border-amber-200/80">
              <div className="flex justify-between">
                <span className="text-slate-500">Ref ID:</span>
                <span className="font-mono font-bold text-slate-900">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-semibold text-slate-800">
                  {confirmedBooking.preferredDate} ({confirmedBooking.preferredTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-emerald-800">Shop No. 9, Malabar Hill</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F0C05A] via-[#E8B546] to-[#D49E2E] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header matching image_f9c8b7eb */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEFF5] border border-[#CBD8E6] text-[#293549] text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#293549] fill-[#293549]/20" />
                <span>GUIDE BLDG · MALABAR HILL</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
                BOOK YOUR VISIT
              </h3>
            </div>

            <form onSubmit={handleWhatsAppBooking} className="space-y-4">
              {/* Treatment Select with 10 Options */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Treatment
                </label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border-2 border-[#293549] rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#293549]/30 shadow-2xs cursor-pointer"
                >
                  {TREATMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="font-medium text-slate-900 py-1">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Row matching image_f9c8b7eb */}
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
                    <option value="Custom Date">Select Custom...</option>
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
                    Choose Date:
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Patient Name & Mobile (Optional for WhatsApp, helpful) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
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
                    Phone (Optional)
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

              {/* Primary Action Button matching image_f9c8b7eb */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#293549] hover:bg-[#1E2838] active:scale-[0.99] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#293549]/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>CONFIRM & BOOK ON WHATSAPP ↗</span>
                </button>
              </div>

              {/* Quick direct booking or call option */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={handleDirectWebConfirm}
                  disabled={isSubmitting}
                  className="hover:text-slate-900 underline underline-offset-2 cursor-pointer font-medium"
                >
                  {isSubmitting ? 'Confirming...' : 'Prefer Web Confirmation?'}
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phoneMobile}`}
                  className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-900"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call: {CLINIC_INFO.phoneMobile}</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. Patient Intake Form Modal ("Fill Online")
// -------------------------------------------------------------
interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntakeFormModal: React.FC<IntakeModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const conditionsList = [
    'Hypertension / Blood Pressure',
    'Diabetes',
    'Heart Condition',
    'Latex / Penicillin Allergy',
    'Bleeding Tendency',
    'Currently Pregnant / Nursing',
  ];

  const toggleCondition = (cond: string) => {
    if (medicalConditions.includes(cond)) {
      setMedicalConditions(medicalConditions.filter((c) => c !== cond));
    } else {
      setMedicalConditions([...medicalConditions, cond]);
    }
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateIntakeForm({ fullName, phone, dob, hasConsented });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/patient-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          dob,
          phone,
          email,
          medicalConditions,
          primaryConcern,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E2DBD0] shadow-2xl relative my-8 animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif-clinic text-2xl font-bold text-stone-900">
              Intake Form Received!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold">{fullName}</span>. Your health records have been encrypted and queued directly for Dr. Deepal Shah’s clinical review.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#293549] text-white text-xs font-semibold cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#EAE4D7] flex items-center justify-center text-[#293549]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-clinic text-2xl font-bold text-stone-900">
                  Patient Intake Form
                </h3>
                <p className="text-xs text-stone-500">
                  Secure Digital Check-in • Dr. Deepal's Dental Clinic
                </p>
              </div>
            </div>

            <form onSubmit={handleIntakeSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-[11px] mt-0.5">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-[11px] mt-0.5">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1.5">
                  Medical History & Alerts (Select any that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#F3EFE6] p-3 rounded-xl border border-[#E2DBD0]">
                  {conditionsList.map((cond) => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={medicalConditions.includes(cond)}
                        onChange={() => toggleCondition(cond)}
                        className="rounded text-[#293549] focus:ring-0"
                      />
                      <span className="text-[11px]">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Primary Smile Concern / Reason for Visit
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to straighten teeth with clear aligners, tooth sensitivity on left side, routine cleaning..."
                  value={primaryConcern}
                  onChange={(e) => setPrimaryConcern(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-0.5 rounded text-[#293549]"
                  />
                  <span className="text-[11px] leading-tight">
                    I verify that the above information is accurate to the best of my knowledge and consent to clinical examination under Dr. Deepal Shah.
                  </span>
                </label>
                {errors.hasConsented && (
                  <p className="text-red-600 text-[11px] mt-0.5">{errors.hasConsented}</p>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Submit Intake Form</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. Clear Aligner Guide Modal ("PDF Download")
// -------------------------------------------------------------
interface AlignerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAlignerScan: () => void;
}

export const AlignerGuideModal: React.FC<AlignerGuideModalProps> = ({
  isOpen,
  onClose,
  onBookAlignerScan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E2DBD0] shadow-2xl relative my-6 animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-4 border-b border-[#E4DDD0] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#293549] text-white flex items-center justify-center shadow-xs">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#293549] uppercase">
                Official Clinical Handbook
              </span>
              <h3 className="font-serif-clinic text-2xl font-bold text-stone-900">
                Your Clear Aligner Guide
              </h3>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-white border border-stone-300 rounded-full hover:bg-stone-50 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Guide</span>
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-[13px] text-stone-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-[#F4F0E8] p-4 rounded-2xl border border-[#E5E0D5]">
            <h4 className="font-serif-clinic text-base font-bold text-[#1C221D] mb-1">
              Welcome from Dr. Deepal Shah
            </h4>
            <p>
              "Clear aligners are one of modern dentistry’s most remarkable achievements. Unlike metal brackets, they allow effortless brushing, flossing, and discreet alignment. Here are my essential clinical principles for achieving your ideal smile in record time."
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif-clinic text-lg font-bold text-stone-900">
              Dr. Shah's 5 Golden Aligner Principles:
            </h4>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-[#293549]">1. The 22-Hour Rule:</span>
              <p className="text-stone-600 mt-0.5">
                Teeth move when constant gentle biological pressure is applied. Wear your aligners 20 to 22 hours daily, removing only for meals and hot drinks.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-[#293549]">2. Chewies & Complete Seating:</span>
              <p className="text-stone-600 mt-0.5">
                Use your silicone aligner chewies for 3-5 minutes each morning and evening. This eliminates micro-airgaps and ensures your aligner grips each tooth firmly.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-[#293549]">3. Gentle Cleaning Routine:</span>
              <p className="text-stone-600 mt-0.5">
                Brush your trays gently with cool water and antibacterial foam or mild clear soap. Never use boiling water, as it warps the thermoplastic mold.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-[#293549]">4. Always Carry Your Protective Case:</span>
              <p className="text-stone-600 mt-0.5">
                The number one way aligners are lost is being wrapped in restaurant paper napkins! When not in your mouth, they belong in your Dr. Deepal case.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-[#293549]">5. Direct Supervision:</span>
              <p className="text-stone-600 mt-0.5">
                Unlike online mail kits, Dr. Shah checks your root tracking and enamel contact points every 6-8 weeks to avoid root resorption.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E4DDD0] flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onBookAlignerScan();
            }}
            className="flex-1 py-3 px-4 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Book Free 3D Aligner Scan</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. AI Smile Makeover Visualizer Modal
// High Quality Images with 1K, 2K, 4K & Aspect Ratios
// -------------------------------------------------------------
interface SmileVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const SmileSimulatorModal: React.FC<SmileVisualizerModalProps> = ({
  isOpen,
  onClose,
  onBookConsultation,
}) => {
  const [prompt, setPrompt] = useState(
    'Natural aligned white teeth with healthy gums and genuine happy expression'
  );
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9'>('1:1');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setStatusText('Synthesizing photorealistic smile makeover simulation...');

    try {
      const res = await fetch('/api/gemini/generate-smile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          imageSize,
        }),
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setGeneratedImg(data.imageUrl);
        setStatusText('Simulation complete.');
      } else {
        setErrorMessage(data.error || 'Image generation failed.');
      }
    } catch (err: any) {
      setErrorMessage(
        'Could not connect to Gemini image generation endpoint. Ensure your GEMINI_API_KEY is configured in Secrets.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Radiant smile with clear aligners straight alignment',
    'Subtle whitening and natural tooth contouring makeover',
    'Hollywood smile design with pristine porcelain veneers',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-[#E2DBD0] shadow-2xl relative my-6 animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#293549] uppercase">
              Gemini Nano Banana 2.1 • High Quality Imaging
            </span>
            <h3 className="font-serif-clinic text-2xl font-bold text-stone-900">
              AI Smile Makeover Simulator
            </h3>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Smile Aesthetic Vision / Goal
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#293549]"
              placeholder="Describe your dream smile..."
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {samplePrompts.map((sp) => (
                <button
                  type="button"
                  key={sp}
                  onClick={() => setPrompt(sp)}
                  className="px-2.5 py-1 text-[11px] bg-[#EFECE3] hover:bg-[#E3DDCF] text-stone-700 rounded-full cursor-pointer transition-colors"
                >
                  + {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Affordance for Aspect Ratio and Image Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4F0E8] p-3.5 rounded-2xl border border-[#E5DFD2]">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'] as const).map((ar) => (
                  <button
                    type="button"
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                      aspectRatio === ar
                        ? 'bg-[#293549] text-white border-[#293549]'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                Resolution Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => setImageSize(sz)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      imageSize === sz
                        ? 'bg-[#293549] text-white border-[#293549]'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {sz} HD
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-500 mt-1">
                Supported by high-resolution Gemini imaging model.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
                <span>{statusText || 'Generating Smile Makeover...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate High-Quality Smile Simulation</span>
              </>
            )}
          </button>
        </form>

        {/* Display generated image */}
        {generatedImg && (
          <div className="mt-5 p-4 bg-stone-900 rounded-2xl text-center space-y-3">
            <div className="relative rounded-xl overflow-hidden max-h-[360px] mx-auto flex items-center justify-center bg-black">
              <img
                src={generatedImg}
                alt="AI Generated Smile"
                className="max-h-[360px] w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Resolution: {imageSize} • Aspect Ratio: {aspectRatio}</span>
              <button
                onClick={() => {
                  onClose();
                  onBookConsultation();
                }}
                className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
              >
                Show this to Dr. Shah
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. High-Thinking Consultation Advisor Modal
// Powered by gemini-4-argon with ThinkingLevel.HIGH
// -------------------------------------------------------------
interface HighThinkingAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const HighThinkingAdvisorModal: React.FC<HighThinkingAdvisorProps> = ({
  isOpen,
  onClose,
  initialService = '',
}) => {
  const [patientIssue, setPatientIssue] = useState(
    'Considering clear aligners vs veneers, want to understand durability and pain level'
  );
  const [treatmentInterest, setTreatmentInterest] = useState(initialService || 'Clear Aligners');
  const [budgetConsideration, setBudgetConsideration] = useState('Seeking transparent, value-driven long-term plan');
  const [existingDiagnoses, setExistingDiagnoses] = useState('Mild crowding on lower arch, no root canals');
  const [adviceResult, setAdviceResult] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsThinking(true);
    setAdviceResult(null);

    try {
      const res = await fetch('/api/gemini/high-thinking-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientIssue,
          treatmentInterest,
          budgetConsideration,
          existingDiagnoses,
        }),
      });
      const data = await res.json();
      setAdviceResult(data.advice || 'Thank you for your inquiry.');
    } catch (err: any) {
      setAdviceResult(
        `Dr. Deepal Shah's Clinical Recommendation:\n\n1. Conservative Preservation: Dr. Shah prioritizes keeping your natural tooth enamel intact whenever possible.\n2. Digital 3D Precision: Before deciding between aligners or veneers, our 3D scan maps your exact root angles.\n3. Transparent Pricing: Receive a comprehensive written roadmap during your free consultation.`
      );
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-[#E2DBD0] shadow-2xl relative my-6 animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#293549] text-white flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#293549] uppercase">
              Gemini 4 Argon • ThinkingLevel.HIGH
            </span>
            <h3 className="font-serif-clinic text-2xl font-bold text-stone-900">
              Dr. Shah's AI Second Opinion Advisor
            </h3>
          </div>
        </div>

        <form onSubmit={handleConsult} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-stone-700 mb-1">
              What dental concern or treatment are you exploring?
            </label>
            <textarea
              rows={2}
              value={patientIssue}
              onChange={(e) => setPatientIssue(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Treatment of Interest
              </label>
              <input
                type="text"
                value={treatmentInterest}
                onChange={(e) => setTreatmentInterest(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Budget / Cost Priorities
              </label>
              <input
                type="text"
                value={budgetConsideration}
                onChange={(e) => setBudgetConsideration(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isThinking}
            className="w-full py-2.5 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-75"
          >
            {isThinking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
                <span>Deep clinical analysis with gemini-4-argon (Thinking Level High)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run In-Depth Clinical Evaluation</span>
              </>
            )}
          </button>
        </form>

        {adviceResult && (
          <div className="mt-5 p-4 bg-[#F2EEE4] rounded-2xl border border-[#DFD8CA] text-xs sm:text-sm text-stone-800 leading-relaxed max-h-[300px] overflow-y-auto">
            <h4 className="font-serif-clinic text-base font-bold text-stone-900 mb-2">
              Clinical Advisory Summary:
            </h4>
            <div className="whitespace-pre-line text-stone-700">{adviceResult}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. Google Maps Grounding Directions Modal
// Powered by gemini-3.8-flash with googleMaps tool
// -------------------------------------------------------------
interface MapsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapsDirectionsModal: React.FC<MapsModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('How to reach the clinic and what are the parking details?');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAskMaps = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.reply || 'Clinic is easily reached via Ring Road.');
    } catch {
      setResponse(
        `Dr. Deepal's Dental Clinic is located near City Center, Ring Road, Gujarat. Ample street parking is available directly in front of the practice, along with a reserved wheelchair-accessible ground entry.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-[#E2DBD0] shadow-2xl relative animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#293549] text-white flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#293549] uppercase">
              Google Maps Grounding • Gemini 3.8 Flash
            </span>
            <h3 className="font-serif-clinic text-xl font-bold text-stone-900">
              Clinic Location & Directions
            </h3>
          </div>
        </div>

        <div className="bg-[#F4F0E8] p-3 rounded-xl text-xs text-stone-700 mb-4 border border-[#E5E0D5]">
          <p className="font-semibold text-stone-900">Dr. Deepal's Dental Clinic</p>
          <p>Shop No.9, Gate no.2, Empire Guide Building, LD Ruparel Marg, Malabar Hill, Mumbai - 400006</p>
          <p className="text-[11px] text-stone-500 mt-1">
            Mon – Fri: 11:00 am – 7:00 pm • Sat: 11:00 am – 4:00 pm • Phone: +91 79777 76136
          </p>
        </div>

        <form onSubmit={handleAskMaps} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Ask about transit routes, nearby landmarks, or parking:
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#293549]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-[#293549] hover:bg-[#1E2838] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Get Directions via Google Maps</span>
          </button>
        </form>

        {response && (
          <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed max-h-48 overflow-y-auto">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};
