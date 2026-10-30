"use client";
import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import { DUMMY_SUBURBS } from '../services/mockApiService';

export default function SuburbsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Greater Perth Coverage
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Perth Suburbs We Service
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Our police-checked, insured cleaners service homes and offices across all metropolitan Perth zones.
          </p>
        </div>
      </div>

      {/* Main Suburbs Directory List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Quick Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Central & South Perth</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Perth CBD, East Perth, West Perth, South Perth, Victoria Park, Como, Applecross, Kensington, Burswood.
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <FaCheckCircle className="text-[10px]" /> Same-day & next-day booking
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Western Suburbs & Coast</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subiaco, Claremont, Cottesloe, Nedlands, Shenton Park, Dalkeith, City Beach, Floreat, Scarborough.
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <FaCheckCircle className="text-[10px]" /> Regular weekly & fortnightly teams
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-600" />
              <span>Northern & Eastern Metro</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mount Lawley, Inglewood, Carine, Joondalup, Morley, Midland, Guildford, Bayswater.
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <FaCheckCircle className="text-[10px]" /> Vacate & bond cleans available
            </p>
          </div>
        </div>

        {/* List of Key Service Locations */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">Key Metropolitan Postcodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DUMMY_SUBURBS.map((sub) => (
              <div
                key={sub.postcode}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-xs text-slate-900">{sub.name}</p>
                  <p className="text-[10px] text-slate-400">Postcode {sub.postcode}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Covered
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 text-center space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Ready to book in your Perth suburb?</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Book online anytime. No travel surcharges or hidden call-out fees.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <FaCalendarCheck />
            <span>Book A Clean</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
