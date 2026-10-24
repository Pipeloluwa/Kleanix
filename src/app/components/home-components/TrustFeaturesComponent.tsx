"use client";
import React from 'react';
import {
  FaShieldAlt,
  FaAward,
  FaLeaf,
  FaMoneyBillWave,
  FaUserCheck,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaUserCheck,
    title: 'Vetted & Police-Checked',
    color: 'text-sky-600 bg-sky-100',
    description: 'Every cleaner on the Kleanix platform passes extensive identity verification, national police background checks, and in-person practical assessments.'
  },
  {
    icon: FaAward,
    title: '100% Happiness Guarantee',
    color: 'text-amber-600 bg-amber-100',
    description: 'If you are ever dissatisfied with any room or fixture, notify us within 24 hours and we will dispatch a team to re-clean it free of charge.'
  },
  {
    icon: FaShieldAlt,
    title: '$10M Public Liability Insurance',
    color: 'text-emerald-600 bg-emerald-100',
    description: 'Rest easy knowing that your luxury residence, furnishings, appliances, and delicate surfaces are safeguarded under our comprehensive insurance policy.'
  },
  {
    icon: FaLeaf,
    title: 'Eco-Friendly, Pet-Safe Agents',
    color: 'text-teal-600 bg-teal-100',
    description: 'We prioritize hospital-grade, non-toxic, non-caustic cleaning formulations that are gentle on your family, sensitive skin, and furry friends.'
  },
  {
    icon: FaMoneyBillWave,
    title: 'Transparent Pricing, Zero Surprises',
    color: 'text-indigo-600 bg-indigo-100',
    description: 'Upfront estimates with GST included. No travel fees, no parking surcharges, and no hidden credit card handling deductions.'
  },
  {
    icon: FaClock,
    title: 'Flexible & Contract-Free',
    color: 'text-rose-600 bg-rose-100',
    description: 'Book once or schedule regular cleans. Pause, reschedule, or cancel anytime with a single click or a quick text to our support desk.'
  }
];

export const TrustFeaturesComponent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            The Kleanix Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Perth Homeowners & Businesses Trust Kleanix
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We combined hospitality-grade cleaning rigor with modern technology to deliver the most effortless home maintenance service in Western Australia.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <FaCheckCircle className="text-emerald-500 text-xs" />
                  <span>Kleanix Quality Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TrustFeaturesComponent;
