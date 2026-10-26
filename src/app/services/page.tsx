"use client";
import React from 'react';
import ServicesComponent from '../components/home-components/ServicesComponent';
import ChecklistComparison from '../components/home-components/ChecklistComparison';
import CtaBanner from '../components/home-components/CtaBanner';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Services Header */}
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Perth Cleaning Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Cleaning Services & Inclusions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our specialized service packages for homes, apartments, end-of-lease rentals, and offices across Perth.
          </p>
        </div>
      </div>

      <ServicesComponent />
      <ChecklistComparison />
      <CtaBanner />
    </div>
  );
}
