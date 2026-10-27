/**
 * Pure data and logic for Dr. Deepal's Dental Clinic
 * Malabar Hill, Mumbai Practice with Google Maps data
 */

export interface ServiceItem {
  id: string;
  title: string;
  pillLabel: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'surgery';
  categoryLabel: string;
  description: string;
  iconName: string;
  durationMinutes: number;
  highlight?: string;
  image: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'teeth-whitening',
    title: 'Teeth whitening',
    pillLabel: 'TEETH WHITENING',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'In-clinic gentle whitening system to lift deep stains and brighten your smile noticeably in one visit.',
    iconName: 'Sparkles',
    durationMinutes: 45,
    highlight: 'Instant Brightening',
    image: '/assets/aistudio/image_686c6331.png',
  },
  {
    id: 'bonding',
    title: 'Bonding',
    pillLabel: 'BONDING',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Direct tooth-colored composite bonding to repair minor chips, close small gaps, and smooth rough edges.',
    iconName: 'Layers',
    durationMinutes: 30,
    highlight: 'Single-Visit Fix',
    image: '/assets/aistudio/image_175a7667.png',
  },
  {
    id: 'check-ups',
    title: 'Check-ups',
    pillLabel: 'CHECK-UPS',
    category: 'preventive',
    categoryLabel: 'Preventive',
    description: 'Comprehensive dental consultation, bite assessment, and preventative oral health examination with Dr. Deepal.',
    iconName: 'Search',
    durationMinutes: 30,
    highlight: 'Comprehensive Review',
    image: '/assets/aistudio/image_8f250ec7.png',
  },
  {
    id: 'cosmetic-procedures',
    title: 'Cosmetic procedures',
    pillLabel: 'COSMETIC PROCEDURES',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Full aesthetic smile transformations, customized smile makeovers, and clear aligner therapies.',
    iconName: 'Smile',
    durationMinutes: 60,
    highlight: 'Bespoke Makeover',
    image: '/assets/aistudio/image_e6cb984e.png',
  },
  {
    id: 'dental-implants',
    title: 'Dental implants',
    pillLabel: 'DENTAL IMPLANTS',
    category: 'restorative',
    categoryLabel: 'Restorative',
    description: 'Permanent titanium implant fixtures topped with natural-looking crowns for missing teeth replacement.',
    iconName: 'ShieldCheck',
    durationMinutes: 60,
    highlight: 'Permanent Solution',
    image: '/assets/aistudio/image_3c43f1d5.png',
  },
  {
    id: 'dentures-bridges',
    title: 'Dentures & bridges',
    pillLabel: 'DENTURES & BRIDGES',
    category: 'restorative',
    categoryLabel: 'Restorative',
    description: 'Custom-fitted full/partial dentures and fixed ceramic bridges engineered for stable bite and comfort.',
    iconName: 'Component',
    durationMinutes: 45,
    highlight: 'Natural Function',
    image: '/assets/aistudio/image_45a69641.png',
  },
  {
    id: 'emergency-care',
    title: 'Emergency care',
    pillLabel: 'EMERGENCY CARE',
    category: 'surgery',
    categoryLabel: 'Urgent Care',
    description: 'Same-day emergency dental relief for severe toothaches, broken teeth, bleeding, and facial trauma.',
    iconName: 'HeartPulse',
    durationMinutes: 30,
    highlight: 'Priority Same-Day',
    image: '/assets/aistudio/image_d1b8e06f.png',
  },
  {
    id: 'extractions',
    title: 'Extractions',
    pillLabel: 'EXTRACTIONS',
    category: 'surgery',
    categoryLabel: 'Surgical',
    description: 'Gentle, atraumatic tooth removal using pre-numbing topical gels and precision local anesthesia.',
    iconName: 'Scissors',
    durationMinutes: 30,
    highlight: 'Painless Removal',
    image: '/assets/aistudio/image_7db29731.png',
  },
  {
    id: 'fillings-sealants',
    title: 'Fillings and sealants',
    pillLabel: 'FILLINGS & SEALANTS',
    category: 'preventive',
    categoryLabel: 'Preventive',
    description: 'Seamless tooth-colored composite fillings for cavities, plus protective fissure sealants for molars.',
    iconName: 'Shield',
    durationMinutes: 35,
    highlight: 'Tooth-Colored',
    image: '/assets/aistudio/image_b8460d83.png',
  },
  {
    id: 'mouth-guards',
    title: 'Mouth guards',
    pillLabel: 'MOUTH GUARDS',
    category: 'preventive',
    categoryLabel: 'Preventive',
    description: 'Custom-molded night guards for teeth grinding (bruxism) and protective mouth guards for sports.',
    iconName: 'ShieldAlert',
    durationMinutes: 25,
    highlight: 'Custom Molded',
    image: '/assets/aistudio/image_4f88dd50.png',
  },
  {
    id: 'online-booking',
    title: 'Online dentist booking',
    pillLabel: 'ONLINE BOOKING',
    category: 'preventive',
    categoryLabel: 'Convenience',
    description: 'Direct digital appointment booking with zero waiting lines and instant confirmation from Dr. Deepal.',
    iconName: 'CalendarCheck',
    durationMinutes: 15,
    highlight: 'Zero Queue Wait',
    image: '/assets/aistudio/image_711a1700.png',
  },
  {
    id: 'oral-surgery',
    title: 'Oral surgery',
    pillLabel: 'ORAL SURGERY',
    category: 'surgery',
    categoryLabel: 'Surgical',
    description: 'Advanced minor oral surgical procedures performed with utmost gentleness and meticulous post-op care.',
    iconName: 'Activity',
    durationMinutes: 50,
    highlight: 'Expert Surgical Care',
    image: '/assets/aistudio/image_7ba97ad8.png',
  },
  {
    id: 'paediatrics',
    title: 'Paediatrics',
    pillLabel: 'PAEDIATRICS',
    category: 'preventive',
    categoryLabel: 'Family',
    description: 'Warm, stress-free pediatric dentistry designed to keep children calm, confident, and cavity-free.',
    iconName: 'Heart',
    durationMinutes: 30,
    highlight: 'Kid Friendly',
    image: '/assets/aistudio/image_9a0a1084.png',
  },
  {
    id: 'root-canals',
    title: 'Root canals',
    pillLabel: 'ROOT CANALS',
    category: 'restorative',
    categoryLabel: 'Restorative',
    description: 'Modern rotary endodontic therapy to eliminate root infection and save natural teeth without discomfort.',
    iconName: 'Zap',
    durationMinutes: 45,
    highlight: 'Comfort First',
    image: '/assets/aistudio/image_de5e0dd3.png',
  },
  {
    id: 'teeth-cleaning',
    title: 'Teeth cleaning',
    pillLabel: 'TEETH CLEANING',
    category: 'preventive',
    categoryLabel: 'Preventive',
    description: 'Gentle ultrasonic scaling to remove plaque, calculus, and tartar, followed by enamel polishing.',
    iconName: 'Droplets',
    durationMinutes: 30,
    highlight: 'Fresh & Clean',
    image: '/assets/aistudio/image_aa5a18b0.png',
  },
  {
    id: 'teeth-reshaping',
    title: 'Teeth reshaping',
    pillLabel: 'TEETH RESHAPING',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Subtle micro-aesthetic odontoplasty to smooth sharp corners, irregular lengths, and minor tooth overlap.',
    iconName: 'Sparkle',
    durationMinutes: 30,
    highlight: 'Subtle Perfection',
    image: '/assets/aistudio/image_f97f4db3.png',
  },
  {
    id: 'veneers-crowns',
    title: 'Veneers & crowns',
    pillLabel: 'VENEERS & CROWNS',
    category: 'cosmetic',
    categoryLabel: 'Restorative',
    description: 'Ultra-thin ceramic veneers and high-strength zirconia crowns crafted for lifelike translucency and durability.',
    iconName: 'Crown',
    durationMinutes: 60,
    highlight: 'Premium Ceramic',
    image: '/assets/aistudio/image_4128f6cd.png',
  },
  {
    id: 'x-ray',
    title: 'X-ray',
    pillLabel: 'X-RAY',
    category: 'preventive',
    categoryLabel: 'Diagnostics',
    description: 'Low-dose digital 2D dental X-rays for fast, ultra-accurate assessment of roots, bone, and interdental health.',
    iconName: 'Scan',
    durationMinutes: 15,
    highlight: 'Low-Dose Digital',
    image: '/assets/aistudio/image_17ebf9b8.png',
  },
];

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  reviewCountInfo: string;
  text: string;
  avatarInitial?: string;
  avatarBg?: string;
  photoUrl?: string;
  verified?: boolean;
}

export interface PatientFaqItem {
  id: string;
  question: string;
  answerHtml: string;
  plainAnswer: string;
  category: 'aligners' | 'visits';
}

export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

export interface StepItem {
  step: string;
  tabLabel: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

export const CLINIC_INFO = {
  name: "Dr. Deepal's Dental Clinic",
  doctor: "Dr. Deepal Shah",
  doctorFullName: "Dr. Deepal J. Shah (Dental Surgeon)",
  slogan: "Restore Your True Smile", // 4 words
  phoneMobile: "+91 79777 76136",
  phoneLandline: "022 35767495",
  email: "drdeepalshah@gmail.com",
  address: "Shop No.9, Gate no.2, Empire Guide Building, L. D. Ruparel Marg, near Priyadarshini Park, Malabar Hill, Mumbai, Maharashtra 400006",
  shortAddress: "Empire Guide Bldg, Malabar Hill, Mumbai 400006",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dr.+Deepal%27s+Dental+clinic+Malabar+Hill+Mumbai",
  rating: 5.0,
  reviewCount: 38,
  hours: [
    { day: "Monday", time: "11:00 am – 7:00 pm" },
    { day: "Tuesday", time: "11:00 am – 7:00 pm" },
    { day: "Wednesday", time: "11:00 am – 7:00 pm" },
    { day: "Thursday", time: "11:00 am – 7:00 pm" },
    { day: "Friday", time: "11:00 am – 7:00 pm" },
    { day: "Saturday", time: "11:00 am – 4:00 pm" },
    { day: "Sunday", time: "Closed" },
  ]
};

export const CLINIC_STATS: StatItem[] = [
  { id: 'exp', target: 21, suffix: '+', label: 'Years Experience' },
  { id: 'smiles', target: 4800, suffix: '+', label: 'Smiles Perfected' },
  { id: 'painfree', target: 100, suffix: '%', label: 'Gentle Care' },
  { id: 'rating', target: 5, suffix: '.0', label: 'Google Rating' },
];

/**
 * 10 Treatment Options for Booking (from official clinic menu)
 */
export const TREATMENT_OPTIONS: string[] = [
  "General Checkup",
  "Full Mouth Rehabilitation",
  "Smile Makeover",
  "Fixed Teeth/Implants",
  "Root Canal Treatment",
  "Crowns/Caps/Bridges",
  "Teeth Straightening (Invisible Braces)",
  "Child Dentistry",
  "Teeth Whitening",
  "Other"
];

/**
 * 4-Step Visit Experience sequence with dedicated clinic photos
 */
export const TREATMENT_STEPS: StepItem[] = [
  {
    step: 'STEP 01',
    tabLabel: 'Welcome',
    icon: 'Coffee',
    title: 'Welcome & Check-In',
    desc: "Start with a simple check-in before your appointment. We'll get you settled and ready for your consultation.",
    tags: ['Simple Check-In', 'Comfortable Arrival'],
    image: '/assets/user/step1.png',
  },
  {
    step: 'STEP 02',
    tabLabel: '1-on-1 Consultation',
    icon: 'Heart',
    title: 'Understanding Your Dental Concerns',
    desc: "Dr. Deepal takes the time to understand your dental concerns, what you're experiencing, and what you want to achieve. She then explains the suitable treatment options and guides you on what is best for you.",
    tags: ['Unhurried Discussion', 'Personal Guidance'],
    image: '/assets/user/step2.png',
  },
  {
    step: 'STEP 03',
    tabLabel: 'Dental Assessment',
    icon: 'Eye',
    title: 'A Closer Look at Your Dental Health',
    desc: "Dr. Deepal examines your teeth and overall dental health to understand your needs and decide on the right course of treatment. 2D X-rays may be used when needed.",
    tags: ['Gentle Examination', '2D X-Rays When Needed'],
    image: '/assets/user/step3.jpg',
  },
  {
    step: 'STEP 04',
    tabLabel: 'Treatment',
    icon: 'FileText',
    title: 'Your Treatment',
    desc: "Once the right treatment is decided, Dr. Deepal carries out the treatment and guides you through each step.",
    tags: ['Guided Procedure', 'Gentle Care'],
    image: '/assets/user/step4.png',
  },
];

export const PATIENT_FAQS: PatientFaqItem[] = [
  {
    id: 'faq-appointment',
    question: 'Do I need an appointment before visiting?',
    plainAnswer: 'Yes, we operate as a private dedicated clinic to ensure Dr. Deepal provides unhurried time for each patient. However, for acute dental emergencies, walk-ins are available.',
    answerHtml: 'Yes, we operate as a private dedicated clinic to ensure Dr. Deepal provides <span class="text-[#F0C05A] font-bold">unhurried time</span> for each patient. However, for acute dental emergencies, <span class="text-[#F0C05A] font-bold">walk-ins are available</span>.',
    category: 'visits',
  },
  {
    id: 'faq-treatments',
    question: 'What treatments do you offer at Malabar Hill?',
    plainAnswer: 'We offer 18 specialized dental services including Teeth Whitening, Bonding, Check-ups, Cosmetic Procedures, Dental Implants, Dentures & Bridges, Emergency Care, Extractions, Fillings & Sealants, Mouth Guards, Oral Surgery, Paediatrics, Root Canals, Teeth Cleaning, Teeth Reshaping, Veneers & Crowns, and digital X-Rays.',
    answerHtml: 'We offer 18 specialized dental services including <span class="text-[#F0C05A] font-bold">Teeth Whitening</span>, <span class="text-[#F0C05A] font-bold">Bonding</span>, Check-ups, Cosmetic Procedures, <span class="text-[#F0C05A] font-bold">Dental Implants</span>, Dentures & Bridges, Emergency Care, Extractions, Fillings & Sealants, Mouth Guards, Oral Surgery, <span class="text-[#F0C05A] font-bold">Paediatrics</span>, Root Canals, Teeth Cleaning, Teeth Reshaping, Veneers & Crowns, and digital X-Rays.',
    category: 'aligners',
  },
  {
    id: 'faq-cost',
    question: 'How much does a consultation cost?',
    plainAnswer: 'Our comprehensive consultation includes a thorough dental examination and a personalized treatment plan with 100% upfront, transparent pricing. There are never any hidden fees or surprise costs.',
    answerHtml: 'Our comprehensive consultation includes a thorough dental examination and a personalized treatment plan with <span class="text-[#F0C05A] font-bold">100% upfront, transparent pricing</span>. There are never any hidden fees or surprise costs.',
    category: 'visits',
  },
  {
    id: 'faq-location',
    question: 'Where is the clinic located in Malabar Hill?',
    plainAnswer: 'We are situated at Guide Building, (Gate No. 2), Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006, with convenient curbside parking access.',
    answerHtml: 'We are situated at <span class="text-[#F0C05A] font-bold">Guide Building, (Gate No. 2), Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006</span>, with convenient curbside parking access.',
    category: 'visits',
  },
  {
    id: 'faq-booking',
    question: 'How can I book or reschedule my visit?',
    plainAnswer: 'You can instantly reserve your preferred slot via the Book Consultation button on this page, call our clinic desk at 7977776136, or email drdeepalshah@gmail.com.',
    answerHtml: 'You can instantly reserve your preferred slot via the <span class="text-[#F0C05A] font-bold">Book Consultation</span> button on this page, call our clinic desk at <span class="text-[#F0C05A] font-bold">7977776136</span>, or email <span class="text-[#F0C05A] font-bold">drdeepalshah@gmail.com</span>.',
    category: 'aligners',
  },
];

/**
 * 8 Real Google Maps Reviews from official Google Profile
 */
export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-udayant',
    name: 'udayant khemani',
    rating: 5,
    timeAgo: '2 months ago',
    reviewCountInfo: '7 reviews · 2 photos',
    avatarInitial: 'u',
    avatarBg: '#2E7D32', // green
    text: "I had a great experience with Dr Deepal. She's highly skilled and sharp at identifying issues, and she fixed everything efficiently. What I appreciated most was her honesty - she never pushed unnecessary treatment and always gave me straightforward, trustworthy advice.\n\nThe clinic itself is clean, well-located, and easy to get to. Overall, a highly professional and talented dentist who I'd recommend without hesitation. One of the best dentists in town.",
    verified: true,
  },
  {
    id: 'rev-lymaraina',
    name: "Lymaraina D'souza",
    rating: 5,
    timeAgo: '10 months ago',
    reviewCountInfo: '2 reviews · 3 photos',
    avatarInitial: 'L',
    avatarBg: '#E64A19', // deep orange
    text: "Very professional and skilled, top to bottom. Cannot recommend her more highly. Dr. Deepal is so thorough and informative, and lets you know every step of the way what's going on so there are no surprises. Very calming, as well. Her staff was courteous friendly and professional. They really took the time necessary to do everything right – and as a new patient took some really good time to get to know me and my dental needs. Great dental experience!\n\nThey don't try to sell you services you don't need like other dentists in town. I highly recommend Dr. Deepal's Dental Clinic",
    verified: true,
  },
  {
    id: 'rev-pooja',
    name: 'Pooja Shah',
    rating: 5,
    timeAgo: '10 months ago',
    reviewCountInfo: '9 reviews · 1 photo',
    avatarInitial: 'P',
    avatarBg: '#5C6BC0', // indigo
    text: "Dr. Deepal is not only highly skilled but also genuinely caring. She took the time to thoroughly explain my treatment options, answer all of my questions, and ensure that I was comfortable throughout the entire process. It's rare to find a dentist who combines expertise with such a personal touch.\n\nI highly recommend to anyone looking for top-notch dental care. I'll definitely be returning for my next check-up!",
    verified: true,
  },
  {
    id: 'rev-pram',
    name: 'Pram',
    rating: 5,
    timeAgo: '3 months ago',
    reviewCountInfo: '2 reviews',
    avatarInitial: 'P',
    avatarBg: '#512DA8', // deep purple
    text: "Dr. Deepali is very knowledgeable and does her job thoroughly. I got my cavity cleaned and filled again as it was not done right the first time somewhere else. I am fully satisfied with her treatment and would highly recommend her for all tooth problems.",
    verified: true,
  },
  {
    id: 'rev-taran',
    name: 'Taran Mundkar',
    rating: 5,
    timeAgo: '7 months ago',
    reviewCountInfo: '3 reviews',
    avatarInitial: 'T',
    avatarBg: '#EF6C00', // orange
    text: "I had a great experience with Dr. Deepal. I initially went in for a general check-up and cleaning, and ended up needing a crown as well. She was very professional, explained the procedure clearly, and made sure I was comfortable throughout. The entire process was smooth and well-handled. Highly recommend her for anyone looking for a reliable dentist.",
    verified: true,
  },
  {
    id: 'rev-sweta',
    name: 'Sweta Virani',
    rating: 5,
    timeAgo: 'a year ago',
    reviewCountInfo: '5 reviews · 3 photos',
    avatarInitial: 'S',
    avatarBg: '#00897B', // teal
    text: "The most amazing place for all your dental problems. The team is extremely thoughtful, gentle and meticulous. Dr. Deepal is highly skilled and knowledgeable.I had a wonderful experience overall and would definitely recommend this place to my friends and family.",
    verified: true,
  },
  {
    id: 'rev-madhuri',
    name: 'madhuri deoras',
    rating: 4,
    timeAgo: '6 months ago',
    reviewCountInfo: '2 reviews',
    avatarInitial: 'm',
    avatarBg: '#E65100', // amber orange
    text: "Dr. Deepal had a zero pain tolerant patient in me. She used mimum words to explain the line of treatment. The most difficult gap between my molars was managed carefully by her. She has dexterous hand.",
    verified: true,
  },
  {
    id: 'rev-hlondo',
    name: 'H.Hlondo',
    rating: 5,
    timeAgo: '2 years ago',
    reviewCountInfo: '2 reviews',
    avatarInitial: 'H',
    avatarBg: '#5D4037', // brown
    text: "Very considerate doctors who are extremely professional in their work. Both doctors and assistant are so friendly and explains very well about every questions . I am really comfortable which is really important . The clinic was clean and always maintained. If you're looking for a great dentist, definitely check them out. Highly recommend them!",
    verified: true,
  },
];

// Pure logic functions
export function validateAppointmentInput(data: {
  name?: string;
  phone?: string;
  date?: string;
  treatment?: string;
}): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Please enter a valid full name (at least 2 characters).' };
  }
  const cleanPhone = (data.phone || '').replace(/[\s\-\(\)\+]/g, '');
  if (!cleanPhone || cleanPhone.length < 8) {
    return { valid: false, error: 'Please enter a valid phone number with at least 8 digits.' };
  }
  return { valid: true };
}

export function validateIntakeForm(data: {
  fullName?: string;
  phone?: string;
  dob?: string;
  hasConsented?: boolean;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full legal name is required.';
  }
  const cleanPhone = (data.phone || '').replace(/[\s\-\(\)\+]/g, '');
  if (!cleanPhone || cleanPhone.length < 8) {
    errors.phone = 'Valid contact number is required.';
  }
  if (!data.hasConsented) {
    errors.hasConsented = 'Please confirm the health statement.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateProgressPercentage(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  if (scrollHeight <= clientHeight) return 0;
  const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

export function formatWhatsAppBookingUrl(data: {
  treatment: string;
  date: string;
  timeSlot: string;
  name?: string;
  phone?: string;
}): string {
  const text = `Hello Dr. Deepal,\nI would like to book a dental appointment at Dr. Deepal's Dental Clinic (Malabar Hill).\n\n• Treatment: ${data.treatment || 'General Checkup'}\n• Preferred Date: ${data.date || 'Tomorrow'}\n• Time Slot: ${data.timeSlot || '11:00 AM – 1:00 PM'}${data.name ? `\n• Patient Name: ${data.name}` : ''}${data.phone ? `\n• Mobile: ${data.phone}` : ''}\n\nPlease confirm availability. Thank you!`;
  return `https://wa.me/917977776136?text=${encodeURIComponent(text)}`;
}
