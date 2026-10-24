"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { DUMMY_SERVICES } from '@/app/services/mockApiService';
import { useAppDispatch } from '@/app/state_management/hooks';
import { setServiceId } from '@/app/state_management/reducers/client-reducers/bookingSlice';
import {
  FaCheck,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaPhoneAlt,
  FaAward
} from 'react-icons/fa';

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const service = DUMMY_SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const handleBookNow = () => {
    dispatch(setServiceId(service.id));
    router.push('/book');
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Service Hero Header */}
      <div className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            
            {service.badge && (
              <span className="inline-block bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                {service.badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {service.title}
            </h1>
            
            <p className="text-base sm:text-lg text-sky-200 font-medium">
              {service.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              {service.longDesc}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <FaClock className="text-sky-400 text-sm" />
                <span className="text-slate-300 font-semibold">{service.estimatedHours} Typical Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-400 text-sm" />
                <span className="text-slate-300 font-semibold">100% Police Checked & Insured</span>
              </div>
            </div>

            {/* Pricing Action */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-black text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
              >
                <span>Book This Clean Now</span>
                <FaArrowRight className="text-xs" />
              </button>

              <div className="text-xs text-slate-400 text-center sm:text-left">
                <span className="font-bold text-white text-base">From ${service.basePrice} AUD</span>
                <p>Includes GST & all cleaning agents</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Room By Room Checklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            Complete Checklist
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            What Is Included in Every Room
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Our systematic cleaning protocol ensures no corner, baseboard, or appliance surface is missed.
          </p>
        </div>

        {/* Room cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.checklist.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4"
            >
              <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-200 pb-3 flex items-center justify-between">
                <span>{group.room}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              </h3>

              <ul className="space-y-2.5 text-xs text-slate-700">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheck className="text-emerald-500 text-xs mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlights Bar */}
        <div className="mt-12 bg-sky-950 text-white rounded-3xl p-8 border border-sky-900">
          <h3 className="text-xl font-bold mb-4 text-sky-300">Key Highlights of This Package</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
            {service.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400 text-sm flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-sky-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaAward className="text-amber-400 text-2xl" />
              <div>
                <p className="font-bold text-sm">Backed by our 100% Happiness Guarantee</p>
                <p className="text-xs text-slate-400">If anything is missed, we return within 24 hours to make it right.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookNow}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              Select Date & Book
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
