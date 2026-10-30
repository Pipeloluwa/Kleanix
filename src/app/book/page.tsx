"use client";
import React from 'react';
import InteractiveBookingFlow from '../components/home-components/InteractiveBookingFlow';
import { FaShieldAlt, FaAward, FaLock } from 'react-icons/fa';

export default function BookPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
          Professional Cleaning Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
          Schedule Your Cleaning Service
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto mt-1">
          Select your service specifications, choose your preferred arrival window, and confirm your booking with verified professionals.
        </p>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <FaShieldAlt className="text-sky-600" /> Police Checked Cleaners
          </span>
          <span className="flex items-center gap-1.5">
            <FaAward className="text-amber-500" /> 100% Happiness Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <FaLock className="text-emerald-600" /> No Card Charged Until Done
          </span>
        </div>
      </div>

      {/* Embedded Redux Booking Engine */}
      <InteractiveBookingFlow />

    </div>
  );
}
