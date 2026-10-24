"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { closeQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import {
  updateQuoteService,
  updateQuoteBedrooms,
  updateQuoteBathrooms,
  updateQuoteFrequency,
  updateQuoteSuburb
} from '@/app/state_management/reducers/client-reducers/quoteSlice';
import {
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency,
  updateCustomerField
} from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { DUMMY_SERVICES, FREQUENCY_OPTIONS, DUMMY_SUBURBS } from '@/app/services/mockApiService';
import { FaTimes, FaCalculator, FaCheckCircle, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { CleanFrequency } from '@/app/state_management/types';

export const QuoteModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.quoteModalOpen);
  const quote = useAppSelector((state) => state.quote);

  if (!isOpen) return null;

  const handleProceedToBooking = () => {
    // Sync selections to booking state
    dispatch(setServiceId(quote.serviceId));
    dispatch(setBedrooms(quote.bedrooms));
    dispatch(setBathrooms(quote.bathrooms));
    dispatch(setFrequency(quote.frequency));
    
    // Extract suburb from quote selection
    const suburbName = quote.suburb.split('(')[0].trim();
    const postcode = quote.suburb.match(/\((.*?)\)/)?.[1] || '6000';
    dispatch(updateCustomerField({ field: 'suburb', value: suburbName }));
    dispatch(updateCustomerField({ field: 'postcode', value: postcode }));

    dispatch(closeQuoteModal());
    router.push('/book');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(closeQuoteModal())}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <FaCalculator className="text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Instant Price Estimate</h3>
              <p className="text-xs text-slate-500">Transparent rates, no hidden fees or travel surcharges</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeQuoteModal())}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-5">
          
          {/* Service selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Cleaning Service
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DUMMY_SERVICES.slice(0, 6).map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => dispatch(updateQuoteService(service.id))}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    quote.serviceId === service.id
                      ? 'border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <p className="font-bold line-clamp-1">{service.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">From ${service.basePrice}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Bedrooms: {quote.bedrooms}
              </label>
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => dispatch(updateQuoteBedrooms(num))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      quote.bedrooms === num
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {num}{num === 5 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Bathrooms: {quote.bathrooms}
              </label>
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => dispatch(updateQuoteBathrooms(num))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      quote.bathrooms === num
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {num}{num === 4 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Clean Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCY_OPTIONS.map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => dispatch(updateQuoteFrequency(freq.id as CleanFrequency))}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    quote.frequency === freq.id
                      ? 'border-sky-600 bg-sky-50 text-sky-800 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{freq.name}</span>
                    {freq.discountPercentage > 0 && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        -{freq.discountPercentage}%
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suburb */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Perth Suburb / Postcode
            </label>
            <select
              value={quote.suburb}
              onChange={(e) => dispatch(updateQuoteSuburb(e.target.value))}
              className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50 p-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {DUMMY_SUBURBS.map((sub) => (
                <option key={sub.postcode} value={`${sub.name} (${sub.postcode})`}>
                  {sub.name} ({sub.postcode}) - {sub.region}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Result Card */}
          <div className="bg-gradient-to-br from-sky-900 to-slate-900 text-white rounded-2xl p-5 shadow-inner">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">Estimated Total (GST Incl.)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">${quote.estimatedTotal}</span>
                  <span className="text-xs text-sky-200 font-medium">/ clean (~{quote.estimatedHours} hrs)</span>
                </div>
              </div>
              {quote.discountSaved > 0 && (
                <div className="text-right">
                  <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    You Save ${quote.discountSaved}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-sky-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="text-sky-400" /> Police Checked & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheckCircle className="text-emerald-400" /> 100% Re-Clean Guarantee
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeQuoteModal())}
            className="sm:w-1/3 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleProceedToBooking}
            className="sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed with this Quote</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuoteModal;
