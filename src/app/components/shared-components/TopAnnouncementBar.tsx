"use client";
import React from 'react';
import Link from 'next/link';
import { FaPhoneAlt, FaTag, FaCheckCircle } from 'react-icons/fa';

export const TopAnnouncementBar = () => {
  return (
    <aside aria-label="Announcement bar" className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Left: Code */}
        <div className="flex items-center gap-2">
          <span className="bg-sky-500 text-white font-bold px-1.5 py-0.2 rounded text-[10px] uppercase">
            Promo
          </span>
          <span className="text-[11px] sm:text-xs">
            15% off first clean with code <strong className="text-white font-mono">KLEAN15</strong>
          </span>
        </div>

        {/* Right: Phone */}
        <div className="flex items-center gap-2 text-xs">
          <a
            href="tel:1300346034"
            className="flex items-center gap-1 font-bold text-sky-400 hover:text-white transition-colors"
          >
            <FaPhoneAlt className="text-[10px]" />
            <span>1300 34 60 34</span>
          </a>
        </div>

      </div>
    </aside>
  );
};

export default TopAnnouncementBar;
