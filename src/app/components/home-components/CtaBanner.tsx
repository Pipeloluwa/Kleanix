"use client";
import React from 'react';
import Link from 'next/link';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';

export const CtaBanner = () => {
  return (
    <section className="bg-slate-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">
          Ready for a spotless home?
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
          Book online in under 60 seconds. Transparent pricing and guaranteed satisfaction.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/book"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <FaCalendarCheck />
            <span>Book A Clean</span>
          </Link>

          <a
            href="tel:1300346034"
            className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <FaPhoneAlt className="text-xs" />
            <span>1300 34 60 34</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
