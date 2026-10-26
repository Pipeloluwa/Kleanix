"use client";
import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import { FaCalendarCheck, FaPhoneAlt, FaTag, FaCheckCircle } from 'react-icons/fa';

export const CtaBanner = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-sky-950 via-slate-900 to-sky-900 text-white py-20">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Discount badge */}
        <div className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider animate-pulse-subtle max-w-full text-center flex-wrap">
          <FaTag className="text-amber-400" />
          <span>New Customer Special: 15% OFF First Clean with code &ldquo;KLEAN15&rdquo;</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Reclaim Your Weekends. <br />
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Let Perth&apos;s Top Cleaners Handle The Rest.
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Join thousands of happy Perth families and businesses. Booking takes 60 seconds, no lock-in contracts, and our 100% Happiness Guarantee protects every appointment.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/30 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-2.5"
          >
            <FaCalendarCheck />
            <span>Book A Clean Online</span>
          </Link>

          <button
            type="button"
            onClick={() => dispatch(openQuoteModal())}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-sky-400/40 hover:bg-sky-900/60 text-white font-bold text-base transition-colors"
          >
            Calculate Exact Quote
          </button>

          <a
            href="tel:1300346034"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-sky-300 hover:text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Call 1300 34 60 34</span>
          </a>
        </div>

        {/* Guarantees */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300">
            <FaCheckCircle className="text-emerald-400" /> Police Checked Cleaners
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <FaCheckCircle className="text-emerald-400" /> $10M Liability Insured
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <FaCheckCircle className="text-emerald-400" /> 100% Satisfaction Re-Clean
          </span>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
