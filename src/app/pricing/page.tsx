"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import {
  updateQuoteService,
  updateQuoteBedrooms,
  updateQuoteBathrooms,
  updateQuoteFrequency
} from '@/app/state_management/reducers/client-reducers/quoteSlice';
import {
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency
} from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { DUMMY_SERVICES, DUMMY_EXTRAS, FREQUENCY_OPTIONS } from '@/app/services/mockApiService';
import { FaCheckCircle, FaCalculator, FaArrowRight } from 'react-icons/fa';
import { CleanFrequency } from '@/app/state_management/types';

export default function PricingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state.quote);

  const handleBookFromPricing = () => {
    dispatch(setServiceId(quote.serviceId));
    dispatch(setBedrooms(quote.bedrooms));
    dispatch(setBathrooms(quote.bathrooms));
    dispatch(setFrequency(quote.frequency));
    router.push('/book');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Clear, Upfront Rates with Zero Surprises
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All prices include 10% Australian GST, all eco-friendly supplies, and full insurance. No travel fees or parking surcharges.
          </p>
        </div>

        {/* Dynamic Calculator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-8 lg:p-10 mb-16">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl flex-shrink-0">
              <FaCalculator />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Custom Price Calculator</h2>
              <p className="text-xs text-slate-500">Select your specifications for an instant accurate estimate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Service</label>
              <select
                value={quote.serviceId}
                onChange={(e) => dispatch(updateQuoteService(e.target.value))}
                className="w-full text-base sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-2.5 sm:p-3"
              >
                {DUMMY_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Bedrooms</label>
              <select
                value={quote.bedrooms}
                onChange={(e) => dispatch(updateQuoteBedrooms(Number(e.target.value)))}
                className="w-full text-base sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-2.5 sm:p-3"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Bed' : 'Beds'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Bathrooms</label>
              <select
                value={quote.bathrooms}
                onChange={(e) => dispatch(updateQuoteBathrooms(Number(e.target.value)))}
                className="w-full text-base sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-2.5 sm:p-3"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Bath' : 'Baths'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Frequency</label>
              <select
                value={quote.frequency}
                onChange={(e) => dispatch(updateQuoteFrequency(e.target.value as CleanFrequency))}
                className="w-full text-base sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 p-2.5 sm:p-3"
              >
                {FREQUENCY_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} {f.discountPercentage > 0 ? `(-${f.discountPercentage}%)` : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-extrabold text-sky-400">Calculated Estimate</span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-3xl sm:text-4xl font-black text-white">${quote.estimatedTotal}</span>
                <span className="text-xs text-slate-400">AUD (GST Included &bull; ~{quote.estimatedHours} hrs)</span>
              </div>
              {quote.discountSaved > 0 && (
                <p className="text-xs text-emerald-400 font-bold">Includes ${quote.discountSaved} recurring discount savings</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleBookFromPricing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <span>Lock In This Rate & Book</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Base Rate Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-8">Service Package Rate Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-600">{service.category}</span>
                    {service.badge && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">${service.basePrice}</span>
                    <span className="text-xs text-slate-500">AUD (1 bed / 1 bath base)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{service.shortDesc}</p>

                  <ul className="space-y-2 text-xs text-slate-700 pt-4 border-t border-slate-100">
                    {service.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/services/${service.slug}`}
                    className="block text-center py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    View Inclusions & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-on Extras Rate Menu */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm mb-16">
          <h3 className="text-xl font-black text-slate-900 mb-2">Optional Add-On Extras Rate Menu</h3>
          <p className="text-xs text-slate-500 mb-6">Add any of these specialized tasks to your booking with a single click</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DUMMY_EXTRAS.map((extra) => (
              <div key={extra.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{extra.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">+{extra.estimatedMinutes} mins</p>
                </div>
                <span className="text-sm font-black text-sky-700">${extra.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frequency Discounts */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recurring Cleaning Savings</span>
            <h3 className="text-xl font-bold">Save up to 15% on Scheduled Cleans</h3>
            <p className="text-xs text-slate-400">Weekly cleans receive 15% off, Fortnightly cleans receive 10% off, and Monthly cleans receive 5% off.</p>
          </div>
          <Link
            href="/book"
            className="w-full md:w-auto text-center px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md whitespace-nowrap transition-colors"
          >
            Start Recurring Plan
          </Link>
        </div>

      </div>
    </div>
  );
}
