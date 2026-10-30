"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import {
  updateQuoteService,
  updateQuoteBedrooms,
  updateQuoteBathrooms,
  updateQuoteFrequency,
  updateQuoteSuburb
} from '@/app/state_management/reducers/client-reducers/quoteSlice';
import {
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency,
  updateCustomerField
} from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { DUMMY_SERVICES, FREQUENCY_OPTIONS, DUMMY_SUBURBS } from '@/app/services/mockApiService';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaLock
} from 'react-icons/fa';
import { CleanFrequency } from '@/app/state_management/types';
import { fadeInUp, fadeInDown } from '@/app/animation/animationVariants';

export const HeroComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state.quote);

  const handleStartBooking = () => {
    dispatch(setServiceId(quote.serviceId));
    dispatch(setBedrooms(quote.bedrooms));
    dispatch(setBathrooms(quote.bathrooms));
    dispatch(setFrequency(quote.frequency));

    const suburbName = quote.suburb.split('(')[0].trim();
    const postcode = quote.suburb.match(/\((.*?)\)/)?.[1] || '6000';
    dispatch(updateCustomerField({ field: 'suburb', value: suburbName }));
    dispatch(updateCustomerField({ field: 'postcode', value: postcode }));

    router.push('/book');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Trust Tag */}
        <motion.div
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-2 mb-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold">
            <FaShieldAlt className="text-sky-600 text-xs" />
            <span>Perth&apos;s Simple, Police-Checked Cleaning Platform</span>
          </div>
        </motion.div>

        {/* Headline & Subhead (Concise & Focused) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Book a Trusted Cleaner in <span className="text-sky-600">60 Seconds</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Professional home, deep, and bond cleaning across Perth. Upfront pricing, vetted cleaners, and no lock-in contracts.
          </p>
        </motion.div>

        {/* Streamlined Instant Pricing Calculator Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 p-5 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
            
            {/* Service Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service
              </label>
              <select
                value={quote.serviceId}
                onChange={(e) => dispatch(updateQuoteService(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
              >
                {DUMMY_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Beds
                </label>
                <select
                  value={quote.bedrooms}
                  onChange={(e) => dispatch(updateQuoteBedrooms(Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num} Bed</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Baths
                </label>
                <select
                  value={quote.bathrooms}
                  onChange={(e) => dispatch(updateQuoteBathrooms(Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} Bath</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Frequency
              </label>
              <select
                value={quote.frequency}
                onChange={(e) => dispatch(updateQuoteFrequency(e.target.value as CleanFrequency))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
              >
                {FREQUENCY_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} {f.discountPercentage > 0 ? `(-${f.discountPercentage}%)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Suburb */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <select
                value={quote.suburb}
                onChange={(e) => dispatch(updateQuoteSuburb(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
              >
                {DUMMY_SUBURBS.map((sub) => (
                  <option key={sub.postcode} value={`${sub.name} (${sub.postcode})`}>
                    {sub.name} ({sub.postcode})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Price Bar & Booking Trigger */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">Estimated Total (GST Inc)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  ${quote.estimatedTotal}
                </span>
                <span className="text-xs text-slate-500">
                  &bull; ~{quote.estimatedHours} hrs
                </span>
                {quote.discountSaved > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ${quote.discountSaved}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleStartBooking}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:scale-[1.01] active:scale-100 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Booking</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>

        {/* 3 Simple Pillars */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" /> Police Checked Cleaners
          </span>
          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" /> $10M Liability Insurance
          </span>
          <span className="flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500" /> 100% Bond Back Guarantee
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroComponent;
