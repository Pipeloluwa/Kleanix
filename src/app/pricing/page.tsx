"use client";
import React from 'react';
import Link from 'next/link';
import { DUMMY_SERVICES, DUMMY_EXTRAS } from '@/app/services/mockApiService';
import { FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';

export default function PricingPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clear, Upfront Rates
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            All prices include 10% Australian GST, eco-friendly supplies, and full insurance. No travel fees or parking surcharges.
          </p>
        </div>

        {/* Base Rate Cards */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Service Rate Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUMMY_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {service.estimatedHours}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{service.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">${service.basePrice}</span>
                    <span className="text-[11px] text-slate-500">(1 bed / 1 bath base)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{service.shortDesc}</p>

                  <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    {service.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <FaCheckCircle className="text-emerald-500 text-[11px] mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    href="/book"
                    className="block text-center py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
                  >
                    Book This Clean
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-on Extras Rate Menu */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-12">
          <h3 className="text-base font-bold text-slate-900 mb-1">Optional Add-On Extras</h3>
          <p className="text-xs text-slate-500 mb-5">Flat-rate add-on tasks you can add to any clean</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DUMMY_EXTRAS.map((extra) => (
              <div key={extra.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{extra.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{extra.description}</p>
                </div>
                <span className="text-sm font-black text-slate-900 ml-2">${extra.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold">Ready to book your Perth clean?</h3>
            <p className="text-xs text-slate-400">Book online with ease. Flat pricing with full satisfaction guarantee.</p>
          </div>
          <Link
            href="/book"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <FaCalendarCheck />
            <span>Book Online</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
