"use client";
import React from 'react';
import Link from 'next/link';
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
  FaStar,
  FaShieldAlt,
  FaCheckCircle,
  FaAward,
  FaArrowRight,
  FaRegCalendarAlt,
  FaBolt,
  FaLock
} from 'react-icons/fa';
import { CleanFrequency } from '@/app/state_management/types';
import { fadeInUp, fadeInDown, scaleIn, staggerContainer, staggerItem } from '@/app/animation/animationVariants';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -z-10 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pills */}
        <motion.div
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold border border-slate-200 shadow-sm">
            <span className="flex text-amber-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </span>
            <span className="font-extrabold text-slate-900">4.9/5</span>
            <span className="text-slate-500 font-normal">on Google (520+ Reviews)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-900 text-xs font-bold border border-sky-200 shadow-sm">
            <FaShieldAlt className="text-sky-600" />
            <span>100% Police Checked Cleaners</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-200 shadow-sm">
            <FaAward className="text-emerald-600" />
            <span>100% Bond Back Guarantee</span>
          </div>
        </motion.div>

        {/* Hero Headings */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-4 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Spotless Spaces. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 bg-clip-text text-transparent">
              Hassle-Free Living in Perth.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Perth&apos;s most reliable cleaning platform. Professional, fully insured, police-checked cleaners equipped with premium supplies. Book online in 60 seconds.
          </p>
        </motion.div>

        {/* HERO CALCULATOR WIDGET (Cleaner Co Inspired Instant Quote Engine) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 relative"
        >
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm sm:text-base">
              <FaBolt className="text-amber-500" />
              <span>Instant Online Estimate & Fast Booking</span>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <FaLock className="text-[10px]" /> No Payment Required Now
            </span>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* 1. Service Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Service Type
              </label>
              <select
                value={quote.serviceId}
                onChange={(e) => dispatch(updateQuoteService(e.target.value))}
                className="w-full text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              >
                {DUMMY_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Bedrooms & Bathrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Bedrooms & Baths
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={quote.bedrooms}
                  onChange={(e) => dispatch(updateQuoteBedrooms(Number(e.target.value)))}
                  className="w-full text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Bed' : 'Beds'}
                    </option>
                  ))}
                </select>

                <select
                  value={quote.bathrooms}
                  onChange={(e) => dispatch(updateQuoteBathrooms(Number(e.target.value)))}
                  className="w-full text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Bath' : 'Baths'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Frequency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Frequency
              </label>
              <select
                value={quote.frequency}
                onChange={(e) => dispatch(updateQuoteFrequency(e.target.value as CleanFrequency))}
                className="w-full text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              >
                {FREQUENCY_OPTIONS.map((freq) => (
                  <option key={freq.id} value={freq.id}>
                    {freq.name} {freq.discountPercentage > 0 ? `(-${freq.discountPercentage}%)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Suburb */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4. Perth Location
              </label>
              <select
                value={quote.suburb}
                onChange={(e) => dispatch(updateQuoteSuburb(e.target.value))}
                className="w-full text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              >
                {DUMMY_SUBURBS.map((sub) => (
                  <option key={sub.postcode} value={`${sub.name} (${sub.postcode})`}>
                    {sub.name} ({sub.postcode})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Pricing Action Box */}
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-sky-400">
                  Estimated Pricing
                </span>
                {quote.discountSaved > 0 && (
                  <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                    Saving ${quote.discountSaved}!
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${quote.estimatedTotal}
                </span>
                <span className="text-xs sm:text-sm text-sky-200">
                  AUD (Incl. GST) &bull; ~{quote.estimatedHours} hrs cleaning
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Supplies & equipment provided &bull; Free cancellation up to 24 hrs prior
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={handleStartBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-3"
              >
                <span>Book This Clean</span>
                <FaArrowRight className="text-sm" />
              </button>

              <Link
                href="/services"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                View Detailed Checklist
              </Link>
            </div>

          </div>

          {/* Micro Benefits Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" /> No Lock-in Contracts
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" /> Seamless Online Booking
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" /> WA Police Checked
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" /> Eco-Safe Cleaning Agents
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroComponent;
