"use client";
import React from 'react';
import Link from 'next/link';
import { FaPhoneAlt, FaTag, FaCheckCircle, FaLock } from 'react-icons/fa';

export const TopAnnouncementBar = () => {
  return (
    <aside aria-label="Announcement bar" className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left: Clean offer */}
        <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 bg-sky-500 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
            <FaTag className="text-[9px]" /> 15% OFF
          </span>
          <span className="text-slate-300 text-[11px] sm:text-xs">
            First recurring clean with promo code <strong className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded border border-slate-700">KLEAN15</strong>
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 text-xs">
            <FaCheckCircle className="text-emerald-400 text-xs" /> 100% Bond Back Guarantee
          </span>
        </div>

        {/* Right: Portal quick link & Direct Phone */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <FaLock className="text-[10px] text-sky-400" />
            <span>Portal Login</span>
          </Link>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <a
            href="tel:1300346034"
            className="flex items-center gap-1.5 font-bold text-sky-400 hover:text-white transition-colors"
          >
            <FaPhoneAlt className="text-[9px]" />
            <span>1300 34 60 34</span>
          </a>
        </div>

      </div>
    </aside>
  );
};

export default TopAnnouncementBar;
