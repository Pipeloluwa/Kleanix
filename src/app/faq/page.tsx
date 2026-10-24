"use client";
import React from 'react';
import FaqComponent from '../components/home-components/FaqComponent';
import CtaBanner from '../components/home-components/CtaBanner';

export default function FaqPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Help & Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Find immediate answers regarding booking procedures, bond-back policies, supplies, and pricing.
          </p>
        </div>
      </div>

      <FaqComponent />
      <CtaBanner />
    </div>
  );
}
