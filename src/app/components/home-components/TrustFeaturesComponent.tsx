"use client";
import React from 'react';
import { FaUserCheck, FaAward, FaShieldAlt, FaCalendarCheck } from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaUserCheck,
    title: 'Police Checked',
    desc: 'National police check and identity verified before stepping into your home.'
  },
  {
    icon: FaShieldAlt,
    title: '$10M Insurance',
    desc: 'Comprehensive public liability insurance covers every booking.'
  },
  {
    icon: FaAward,
    title: 'Satisfaction Guaranteed',
    desc: 'If anything is missed, let us know within 24h and we re-clean free.'
  },
  {
    icon: FaCalendarCheck,
    title: 'No Lock-in Contracts',
    desc: 'Book once or recurring. Reschedule or cancel with zero hassle.'
  }
];

export const TrustFeaturesComponent = () => {
  return (
    <section className="py-12 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80">
                <Icon className="text-sky-600 text-lg mb-2" />
                <h3 className="font-bold text-sm text-slate-900">{f.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeaturesComponent;
