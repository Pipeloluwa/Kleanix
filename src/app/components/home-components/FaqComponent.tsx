"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I book a cleaning service with Kleanix?',
    answer: 'Booking is quick and seamless! You can complete your booking directly through our website using our 60-second interactive booking form, or you can call our Perth support team at 1300 34 60 34. We will match you with a police-checked cleaner at your preferred date and time slot.'
  },
  {
    question: 'How long does a cleaning appointment take?',
    answer: 'The duration depends on your home size and selected service tier. A Standard Clean for a 2-bedroom home typically takes 2.5 to 3.5 hours. Deep Cleans take approximately 4 to 6 hours, while full REIWA Vacate Cleans take 5 to 8 hours depending on oven detailing and window tracks.'
  },
  {
    question: 'How many cleaners will come to my property?',
    answer: 'For standard residential upkeep, we typically send an experienced solo cleaner or a dedicated two-person team depending on scheduling. For large end-of-lease vacate cleans and deep cleans, we dispatch a coordinated team of 2 to 3 specialists to ensure the job is completed efficiently.'
  },
  {
    question: 'What if I am unhappy with any aspect of the clean?',
    answer: 'At Kleanix, customer satisfaction is our top priority. We operate a 100% Happiness Guarantee: if you notice any missed spot or unsatisfactory area, simply notify us within 24 hours (or 72 hours for vacate cleans) and we will return to re-clean the flagged area completely free of charge.'
  },
  {
    question: 'Do I need to supply any cleaning equipment or chemicals?',
    answer: 'Not at all! Our cleaners arrive fully equipped with commercial-grade vacuums featuring HEPA filtration, microfiber cloths, extension poles, mop systems, and hospital-grade eco-friendly cleaning detergents. If you have specific specialty products you prefer us to use on particular marble or timber surfaces, simply let us know.'
  },
  {
    question: 'Are your cleaners police-checked and insured?',
    answer: 'Yes, absolutely 100%. Every professional on the Kleanix platform has completed a comprehensive National Police History Check, right-to-work verification, and identity clearance. In addition, every job is covered by our $10,000,000 AUD Public Liability Insurance policy.'
  },
  {
    question: 'How does your 100% Bond Back Guarantee work for Vacate Cleans?',
    answer: 'Our Vacate Clean is built around standard REIWA real estate inspection criteria. We clean inside ovens, cupboards, rangehoods, window tracks, and skirting boards. If your property manager flags any cleaning item on their exit inspection report, send us the checklist and our team returns within 72 hours at no cost to you.'
  },
  {
    question: 'Can I cancel or reschedule my booking if my plans change?',
    answer: 'Yes! We know life happens. You can pause, reschedule, or cancel your appointment with zero penalty up to 24 hours prior to your scheduled arrival time. Simply contact us via email, phone, or live chat.'
  }
];

export const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            Got Questions? We&apos;ve Got Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our Perth cleaning services, booking procedures, and satisfaction guarantee.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-sky-100 text-sky-600' : ''
                  }`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Still have questions?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Can&apos;t find what you&apos;re looking for? Chat with our friendly Perth team.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:1300346034"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <FaPhoneAlt className="text-sky-400 text-xs" />
              <span>1300 34 60 34</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqComponent;
