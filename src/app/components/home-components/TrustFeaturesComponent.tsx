"use client";
import React from 'react';
import {
  FaShieldAlt,
  FaAward,
  FaMoneyBillWave,
  FaUserCheck
} from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaUserCheck,
    title: 'Police-Checked Cleaners',
    color: 'text-sky-600 bg-sky-50',
    description: 'Every cleaner passes national police history checks, identity validation, and practical quality tests.'
  },
  {
    icon: FaAward,
    title: '100% Happiness Guarantee',
    color: 'text-amber-600 bg-amber-50',
    description: 'If you are not 100% satisfied, notify us within 24 hours (or 72 hours for bond cleans) and we re-clean free.'
  },
  {
    icon: FaShieldAlt,
    title: '$10M Liability Insurance',
    color: 'text-emerald-600 bg-emerald-50',
    description: 'Your home, fixtures, and delicate surfaces are safeguarded under our full insurance policy.'
  },
  {
    icon: FaMoneyBillWave,
    title: 'Transparent Flat Pricing',
    color: 'text-indigo-600 bg-indigo-50',
    description: 'Instant upfront pricing including GST. No hidden call-out fees, fuel surcharges, or surprises.'
  }
];

export const TrustFeaturesComponent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            The Kleanix Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cleaning Made Safe & Simple
          </h2>
          <p className="text-slate-600 text-sm">
            We focus on what matters: trusted cleaners, honest pricing, and guaranteed results.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}>
                    <Icon />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
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
