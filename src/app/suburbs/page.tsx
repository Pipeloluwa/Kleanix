"use client";
import React from 'react';
import SuburbCoverageChecker from '../components/home-components/SuburbCoverageChecker';
import { FaMapMarkerAlt, FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

export default function SuburbsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Local Perth Cleaners
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Perth Suburbs We Service
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            From Alkimos down to Rockingham and the Perth Hills, our fully insured cleaning teams travel across all metropolitan postcodes.
          </p>
        </div>
      </div>

      <SuburbCoverageChecker />

      {/* Regional Guide Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-10">
          Metropolitan Perth Regional Zones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Central & South Perth</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perth CBD, East Perth, West Perth, South Perth, Victoria Park, Como, Applecross, Kensington, Rivervale, Burswood.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <FaCheckCircle /> Daily morning & afternoon dispatch
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Western Suburbs & Coast</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subiaco, Nedlands, Claremont, Cottesloe, Dalkeith, Floreat, City Beach, Mosman Park, Swanbourne, Fremantle.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <FaCheckCircle /> Daily luxury residence teams
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Northern & Eastern Metro</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scarborough, Innaloo, Karrinyup, Joondalup, Mount Lawley, Inglewood, Midland, Guildford, Bayswater, Morley.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <FaCheckCircle /> Full coverage 7 days/week
            </div>
          </div>
        </div>

        <div className="mt-12 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-sky-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold">Don&apos;t see your suburb listed?</h4>
            <p className="text-xs text-slate-400">We frequently accommodate outer Perth suburbs upon request.</p>
          </div>
          <a
            href="tel:1300346034"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Call Concierge: 1300 34 60 34</span>
          </a>
        </div>
      </div>
    </div>
  );
}
