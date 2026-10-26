"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { setActiveCategory } from '@/app/state_management/reducers/client-reducers/servicesSlice';
import { setServiceId } from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { ServiceCategory } from '@/app/state_management/types';
import {
  FaCheck,
  FaArrowRight,
  FaClock,
  FaShieldAlt
} from 'react-icons/fa';

export const ServicesComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, activeCategory } = useAppSelector((state) => state.services);

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Services', value: 'all' },
    { label: 'Residential Cleaning', value: 'residential' },
    { label: 'Commercial & Office', value: 'commercial' },
    { label: 'Specialized Treatments', value: 'specialized' }
  ];

  const filteredServices = activeCategory === 'all'
    ? items
    : items.filter((s) => s.category === activeCategory);

  const handleBookService = (serviceId: string) => {
    dispatch(setServiceId(serviceId));
    router.push('/book');
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            Tailored To Your Lifestyle
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Professional Cleaning Services Across Perth
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From regular weekly upkeep to stringent real estate bond cleans and office maintenance, every service is delivered by vetted, police-checked cleaning specialists.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => dispatch(setActiveCategory(cat.value))}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.value
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {service.badge && (
                    <span className="absolute top-4 right-4 bg-sky-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {service.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-xs font-medium text-sky-200 flex items-center gap-1.5">
                      <FaClock className="text-sky-300 text-xs" />
                      <span>{service.estimatedHours}</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      What&apos;s Included:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {service.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FaCheck className="text-emerald-500 text-[11px] mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer with Price & Actions */}
              <div className="p-6 pt-0 bg-white">
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Starting Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">${service.basePrice}</span>
                      <span className="text-xs text-slate-500">AUD</span>
                    </div>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 underline"
                  >
                    View Checklist &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs text-center transition-colors"
                  >
                    Learn More
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleBookService(service.id)}
                    className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <FaArrowRight className="text-[10px]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Note */}
        <div className="mt-14 max-w-3xl mx-auto p-4 rounded-2xl bg-sky-100/60 border border-sky-200 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-sky-950 font-medium">
          <FaShieldAlt className="text-sky-600 text-xl flex-shrink-0" />
          <span>
            Need something bespoke for commercial premises or large estates?{' '}
            <Link href="/contact" className="font-bold underline text-sky-800 hover:text-sky-950">
              Contact our Perth concierge team
            </Link>{' '}
            for a same-day custom inspection and quotation.
          </span>
        </div>

      </div>
    </section>
  );
};

export default ServicesComponent;
