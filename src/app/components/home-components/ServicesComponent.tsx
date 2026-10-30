"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { setServiceId } from '@/app/state_management/reducers/client-reducers/bookingSlice';
import {
  FaCheck,
  FaArrowRight,
  FaClock
} from 'react-icons/fa';

export const ServicesComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.services);

  const handleBookService = (serviceId: string) => {
    dispatch(setServiceId(serviceId));
    router.push('/book');
  };

  return (
    <section id="services" className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Simple, Transparent Cleaning Solutions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything your home or workspace needs, without hidden fees or complex packages.
          </p>
        </div>

        {/* Services Grid (4 Focused Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-sky-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      {service.badge}
                    </span>
                  )}
                  <div className="absolute bottom-2 left-3 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow">
                    <FaClock className="text-sky-300 text-xs" />
                    <span>{service.estimatedHours}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="py-2 border-y border-slate-100">
                    <p className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Includes:</p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <FaCheck className="text-emerald-500 text-[10px] mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400">Starting from</span>
                    <p className="text-xl font-black text-slate-900">${service.basePrice}</p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                  >
                    Details &rarr;
                  </Link>
                </div>

                <button
                  onClick={() => handleBookService(service.id)}
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book This Clean</span>
                  <FaArrowRight className="text-[10px]" />
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
