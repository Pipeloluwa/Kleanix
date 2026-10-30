"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/state_management/hooks';
import { setServiceId } from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { DUMMY_SERVICES } from '@/app/services/mockApiService';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

export const ServicesComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBook = (id: string) => {
    dispatch(setServiceId(id));
    router.push('/book');
  };

  return (
    <section id="services" className="py-14 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Cleaning Services
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Pick the clean that suits your home. Upfront pricing, all supplies provided.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DUMMY_SERVICES.map((s) => (
            <div
              key={s.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-sky-300 hover:bg-white transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                    {s.badge || 'Core Clean'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{s.estimatedHours}</span>
                </div>
                
                <h3 className="font-bold text-base text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.shortDesc}</p>

                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                  {s.highlights.slice(0, 3).map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <FaCheck className="text-emerald-500 text-[9px] mt-1 flex-shrink-0" />
                      <span className="line-clamp-1">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">From</span>
                  <span className="text-xl font-black text-slate-900">${s.basePrice}</span>
                </div>

                <button
                  onClick={() => handleBook(s.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Select</span>
                  <FaArrowRight className="text-[9px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesComponent;
