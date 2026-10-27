import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SERVICES_DATA,
  REVIEWS_DATA,
  CLINIC_STATS,
  TREATMENT_STEPS,
  TREATMENT_OPTIONS,
  PATIENT_FAQS,
  CLINIC_INFO,
  validateAppointmentInput,
  calculateProgressPercentage,
  formatWhatsAppBookingUrl,
} from './clinic-data';

test('SERVICES_DATA contains 18 comprehensive services from clinic menu', () => {
  assert.equal(SERVICES_DATA.length, 18);
});

test('TREATMENT_OPTIONS contains 10 treatment choices from clinic menu', () => {
  assert.equal(TREATMENT_OPTIONS.length, 10);
  assert.ok(TREATMENT_OPTIONS.includes('General Checkup'));
  assert.ok(TREATMENT_OPTIONS.includes('Teeth Straightening (Invisible Braces)'));
  assert.ok(TREATMENT_OPTIONS.includes('Full Mouth Rehabilitation'));
});

test('REVIEWS_DATA contains 8 real Google Maps reviews', () => {
  assert.equal(REVIEWS_DATA.length, 8);
  const names = REVIEWS_DATA.map(r => r.name);
  assert.ok(names.includes('udayant khemani'));
  assert.ok(names.includes("Lymaraina D'souza"));
  assert.ok(names.includes('Pooja Shah'));
  assert.ok(names.includes('Pram'));
  assert.ok(names.includes('Taran Mundkar'));
  assert.ok(names.includes('Sweta Virani'));
  assert.ok(names.includes('madhuri deoras'));
  assert.ok(names.includes('H.Hlondo'));
});

test('PATIENT_FAQS contains 5 common questions about appointments and services', () => {
  assert.equal(PATIENT_FAQS.length, 5);
  const questions = PATIENT_FAQS.map(f => f.question);
  assert.ok(questions.includes('Do I need an appointment before visiting?'));
  assert.ok(questions.includes('What treatments do you offer at Malabar Hill?'));
  assert.ok(questions.includes('How much does a consultation cost?'));
  assert.ok(questions.includes('Where is the clinic located in Malabar Hill?'));
  assert.ok(questions.includes('How can I book or reschedule my visit?'));
});

test('CLINIC_INFO contains Malabar Hill Mumbai details and 3-5 word slogan', () => {
  assert.ok(CLINIC_INFO.address.includes('Malabar Hill'));
  assert.ok(CLINIC_INFO.address.includes('Mumbai'));
  assert.equal(CLINIC_INFO.phoneMobile, '+91 79777 76136');
  assert.equal(CLINIC_INFO.phoneLandline, '022 35767495');
  assert.equal(CLINIC_INFO.email, 'drdeepalshah@gmail.com');
  assert.equal(CLINIC_INFO.slogan, 'Restore Your True Smile');
  const wordCount = CLINIC_INFO.slogan.trim().split(/\s+/).length;
  assert.ok(wordCount <= 5, `Slogan should be 5 words max, got ${wordCount}`);
});

test('TREATMENT_STEPS defines 4-step sequence matching uploaded UI', () => {
  assert.equal(TREATMENT_STEPS.length, 4);
  assert.equal(TREATMENT_STEPS[0].title, 'Welcome & Check-In');
  assert.equal(TREATMENT_STEPS[1].title, 'Understanding Your Dental Concerns');
  assert.equal(TREATMENT_STEPS[2].title, 'A Closer Look at Your Dental Health');
  assert.equal(TREATMENT_STEPS[3].title, 'Your Treatment');
});

test('formatWhatsAppBookingUrl creates valid WhatsApp link with Malabar Hill phone', () => {
  const url = formatWhatsAppBookingUrl({
    treatment: 'Smile Makeover',
    date: 'Tomorrow',
    timeSlot: '11:00 AM – 1:00 PM',
    name: 'Ananya',
    phone: '7977776136',
  });
  assert.ok(url.startsWith('https://wa.me/917977776136?text='));
  assert.ok(url.includes('Smile%20Makeover') || url.includes('Smile+Makeover'));
});

test('calculateProgressPercentage computes accurate scroll indicator math', () => {
  assert.equal(calculateProgressPercentage(0, 1000, 500), 0);
  assert.equal(calculateProgressPercentage(250, 1000, 500), 50);
});

test('validateAppointmentInput validates patient details', () => {
  assert.equal(validateAppointmentInput({ name: 'A', phone: '123' }).valid, false);
  assert.equal(validateAppointmentInput({ name: 'Riya Patel', phone: '+91 79777 76136' }).valid, true);
});
