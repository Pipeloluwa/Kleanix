"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import {
  setSearchQuery,
  checkSuburbThunk,
  resetSuburbSearch
} from '@/app/state_management/reducers/client-reducers/suburbsSlice';
import { updateCustomerField } from '@/app/state_management/reducers/client-reducers/bookingSlice';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaSpinner,
  FaArrowRight
} from 'react-icons/fa';

export const SuburbCoverageChecker = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, searchResult, notFound, isSearching, items } = useAppSelector((state) => state.suburbs);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(checkSuburbThunk(searchQuery.trim()));
    }
  };

  const handleSelectQuickSuburb = (suburbName: string) => {
    dispatch(setSearchQuery(suburbName));
    dispatch(checkSuburbThunk(suburbName));
  };

  const handleBookInSuburb = (suburbName: string, postcode: string) => {
    dispatch(updateCustomerField({ field: 'suburb', value: suburbName }));
    dispatch(updateCustomerField({ field: 'postcode', value: postcode }));
    router.push('/book');
  };

  return (
    <section id="suburbs" className="py-20 bg-sky-50/60 border-y border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
            Greater Perth Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Check Cleaners Available in Your Suburb
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We operate dedicated mobile teams across North, South, Central, and Coastal Perth. Enter your suburb or 4-digit postcode to see real-time availability.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 bg-white p-2 rounded-2xl shadow-lg border border-slate-200">
            <div className="relative flex-1 flex items-center">
              <FaMapMarkerAlt className="absolute left-4 text-sky-600 text-base" />
              <input
                type="text"
                placeholder="Enter Perth suburb or postcode (e.g. South Perth, 6000, Fremantle)..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-11 pr-4 py-3 text-base sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
            >
              {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
              <span>Check<span className="hidden sm:inline">&nbsp;Suburb</span></span>
            </button>
          </form>

          {/* Quick Suburb Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-500">
            <span>Popular:</span>
            {['Perth CBD', 'South Perth', 'Subiaco', 'Fremantle', 'Scarborough', 'Cottesloe'].map((s) => (
              <button
                key={s}
                onClick={() => handleSelectQuickSuburb(s)}
                className="underline hover:text-sky-600 font-semibold"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {searchResult && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-500/40 p-4 sm:p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                  <FaCheckCircle className="text-emerald-600" /> Service Available Today
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{searchResult.name} (WA {searchResult.postcode})</h3>
                <p className="text-xs text-slate-500 font-medium">{searchResult.region} Service Zone</p>
              </div>
              <div className="text-left sm:text-right flex sm:block items-center justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <p className="text-xs text-slate-400">Next Slot:</p>
                <p className="text-sm font-extrabold text-sky-600 flex items-center gap-1 sm:justify-end">
                  <FaClock className="text-xs" />
                  <span>{searchResult.nextAvailableSlot}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-600 font-medium">
                No travel surcharges apply to this postcode.
              </span>
              <button
                onClick={() => handleBookInSuburb(searchResult.name, searchResult.postcode)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Book This Area</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {notFound && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-amber-300 p-4 sm:p-6 shadow-md text-center space-y-3">
            <p className="text-sm font-bold text-slate-800">
              Can&apos;t find an automated match for &ldquo;{searchQuery}&rdquo;?
            </p>
            <p className="text-xs text-slate-600">
              We cover nearly all of Western Australia&apos;s metro area. Call our direct dispatch desk to confirm schedule availability for your specific street.
            </p>
            <a
              href="tel:1300346034"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              <FaPhoneAlt className="text-xs text-sky-400" />
              <span>Call Dispatch: 1300 34 60 34</span>
            </a>
          </div>
        )}

        {/* Regional Coverage Grid */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((sub) => (
            <div
              key={sub.postcode}
              onClick={() => handleSelectQuickSuburb(sub.name)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-md cursor-pointer transition-all text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900">{sub.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-slate-400">WA {sub.postcode}</p>
              <p className="text-[10px] text-sky-600 font-medium mt-1">{sub.nextAvailableSlot}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuburbCoverageChecker;
