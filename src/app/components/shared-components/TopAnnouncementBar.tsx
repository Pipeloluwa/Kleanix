"use client";
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaClock, FaTag, FaCheckCircle } from 'react-icons/fa';
import { useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';

export const TopAnnouncementBar = () => {
  const dispatch = useAppDispatch();

  return (
    <aside aria-label="Announcement bar" className="bg-sky-950 text-slate-100 text-xs py-2 px-4 border-b border-sky-900/60 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left: Special Offer Banner */}
        <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[11px] shadow-sm uppercase tracking-wider animate-pulse-subtle">
            <FaTag className="text-[10px]" /> 15% OFF
          </span>
          <span className="text-slate-200">
            First recurring clean with code <strong className="text-white font-mono bg-sky-900/80 px-1.5 py-0.5 rounded border border-sky-700">KLEAN15</strong>
          </span>
          <span className="hidden lg:inline text-sky-400">|</span>
          <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
            <FaCheckCircle className="text-emerald-400 text-xs" /> 100% Bond Back Guarantee
          </span>
        </div>

        {/* Right: Contact & Quick Links */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <FaClock className="text-sky-400" />
            <span>7am - 8pm (7 Days)</span>
          </div>

          <a
            href="mailto:hello@kleanix.com.au"
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <FaEnvelope className="text-sky-400" />
            <span>hello@kleanix.com.au</span>
          </a>

          <a
            href="tel:1300346034"
            className="flex items-center gap-1.5 font-bold text-sky-300 hover:text-white transition-colors bg-sky-900/60 hover:bg-sky-800 px-3 py-1 rounded-full border border-sky-700/50"
          >
            <FaPhoneAlt className="text-[10px]" />
            <span>1300 34 60 34</span>
          </a>

          <button
            onClick={() => dispatch(openQuoteModal())}
            className="text-amber-400 hover:text-amber-300 underline font-semibold text-xs ml-1"
          >
            Instant Estimate
          </button>
        </div>

      </div>
    </aside>
  );
};

export default TopAnnouncementBar;
