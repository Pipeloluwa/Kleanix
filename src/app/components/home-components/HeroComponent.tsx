"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useAppDispatch } from '@/app/state_management/hooks';
import {
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency
} from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { DUMMY_SERVICES, FREQUENCY_OPTIONS, calculateCleaningPrice } from '@/app/services/mockApiService';
import { FaShieldAlt, FaCheck, FaArrowRight } from 'react-icons/fa';
import { CleanFrequency } from '@/app/state_management/types';
import { fadeInUp } from '@/app/animation/animationVariants';

export const HeroComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Simple local state for initial selection
  const [selectedServiceId, setSelectedServiceId] = useState(DUMMY_SERVICES[0].id);
  const [bedrooms, setLocalBedrooms] = useState(2);
  const [bathrooms, setLocalBathrooms] = useState(1);
  const [frequency, setLocalFrequency] = useState<CleanFrequency>('once_off');

  // Calculate clean flat-rate price
  const priceCalculation = calculateCleaningPrice({
    serviceId: selectedServiceId,
    bedrooms,
    bathrooms,
    frequency,
    extras: []
  });

  const handleStartBooking = () => {
    dispatch(setServiceId(selectedServiceId));
    dispatch(setBedrooms(bedrooms));
    dispatch(setBathrooms(bathrooms));
    dispatch(setFrequency(frequency));
    router.push('/book');
  };

  return (
    <section className="bg-gradient-to-b from-sky-50/60 via-white to-slate-50 pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Simple badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold mb-4">
          <FaShieldAlt className="text-sky-600 text-xs" />
          <span>Simple, police-checked home cleaning in Perth</span>
        </div>

        {/* Crisp Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          Book trusted cleaners <span className="text-sky-600">online with ease</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8">
          Flat-rate pricing, vetted professionals, and satisfaction guaranteed. No contracts.
        </p>

        {/* Minimalist Instant Booking Selector */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-5 sm:p-6 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            
            {/* Service */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Clean Type
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
              >
                {DUMMY_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Beds & Baths */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Home Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={bedrooms}
                  onChange={(e) => setLocalBedrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Bed</option>
                  ))}
                </select>
                <select
                  value={bathrooms}
                  onChange={(e) => setLocalBathrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} Bath</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setLocalFrequency(e.target.value as CleanFrequency)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
              >
                {FREQUENCY_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Price Bar & Action */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400">Total (GST included):</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">${priceCalculation.finalTotal}</span>
                <span className="text-xs text-slate-500">&bull; ~{priceCalculation.estimatedHours} hrs</span>
              </div>
            </div>

            <button
              onClick={handleStartBooking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Book Clean</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>

        {/* Simple highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <FaCheck className="text-emerald-500 text-[10px]" /> Police Checked Cleaners
          </span>
          <span className="flex items-center gap-1.5">
            <FaCheck className="text-emerald-500 text-[10px]" /> Eco-Friendly Supplies
          </span>
          <span className="flex items-center gap-1.5">
            <FaCheck className="text-emerald-500 text-[10px]" /> 100% Bond Guarantee
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroComponent;
