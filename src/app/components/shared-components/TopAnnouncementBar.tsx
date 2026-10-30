"use client";
import React from 'react';
import { FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';

export const TopAnnouncementBar = () => {
  return (
    <aside aria-label="Announcement bar" className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Left: Quality guarantee */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-200">
            <FaCheckCircle className="text-emerald-400 text-[10px]" />
            <span>100% Bond Back & Happiness Guarantee</span>
          </span>
        </div>

        {/* Right: Phone */}
        <div className="flex items-center gap-2 text-xs">
          <a
            href="tel:1300346034"
            className="flex items-center gap-1 font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <FaPhoneAlt className="text-[10px] text-sky-400" />
            <span>1300 34 60 34</span>
          </a>
        </div>

      </div>
    </aside>
  );
};

export default TopAnnouncementBar;
