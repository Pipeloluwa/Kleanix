"use client";
import React from 'react';
import Link from 'next/link';
import { FaPhoneAlt, FaTag, FaCheckCircle, FaStar, FaQuestionCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/app/state_management/hooks';
import { openLeaveReviewModal } from '@/app/state_management/reducers/client-reducers/reviewsSlice';

export const TopAnnouncementBar = () => {
  const dispatch = useAppDispatch();
  const displayReviews = useAppSelector((state) => state.reviews.displayReviews);

  return (
    <aside aria-label="Announcement bar" className="bg-sky-950 text-slate-100 text-xs py-2 px-4 border-b border-sky-900/60 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left: Special Offer Banner */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-center md:text-left flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-sm uppercase tracking-wider animate-pulse-subtle">
            <FaTag className="text-[9px]" /> 15% OFF
          </span>
          <span className="text-slate-200 text-[11px] sm:text-xs">
            First recurring clean with code <strong className="text-white font-mono bg-sky-900/80 px-1 py-0.5 rounded border border-sky-700">KLEAN15</strong>
          </span>
          <span className="hidden lg:inline text-sky-400">|</span>
          <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 text-xs">
            <FaCheckCircle className="text-emerald-400 text-xs" /> 100% Bond Back Guarantee
          </span>
        </div>

        {/* Right: Contact, FAQ & Review Links */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs flex-wrap justify-center">
          
          <Link
            href="/faq"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <FaQuestionCircle className="text-sky-400 text-[11px]" />
            <span>FAQ & Help</span>
          </Link>

          {displayReviews && (
            <Link
              href="/reviews"
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <FaStar className="text-amber-400 text-[10px]" />
              <span>Reviews (4.9★)</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => dispatch(openLeaveReviewModal())}
            className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
          >
            <span>Rate Clean</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>

          <a
            href="tel:1300346034"
            className="flex items-center gap-1.5 font-bold text-sky-300 hover:text-white transition-colors bg-sky-900/60 hover:bg-sky-800 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-sky-700/50 text-[11px] sm:text-xs"
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
