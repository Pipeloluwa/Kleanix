"use client";
import React from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaArrowRight } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            About Kleanix
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Setting Perth&apos;s Gold Standard in Cleaning
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a singular mission: to make booking trusted, hospital-grade cleaning as effortless and dependable as ordering a rideshare.
          </p>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Modern Cleaning Platform Built for Busy Lives
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We started Kleanix right here in Western Australia after witnessing how difficult it was for homeowners and tenants to find reliable, police-checked cleaners who actually showed up on time and did what was promised.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              By combining seamless online scheduling, upfront transparent pricing, and rigorous cleaner vetting, we removed the stress from household chores so you can spend your weekends enjoying the Swan River and Perth&apos;s beaches instead of vacuuming.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-3xl font-black text-sky-600">520+</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">5-Star Google Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-black text-sky-600">100%</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Bond Back Guarantee</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="Kleanix Team"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-xs">
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FaShieldAlt className="text-sky-600 text-sm" /> 100% Police Checked
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Every cleaner undergoes identity and background checks before their first job.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vetting Standard 5 Steps */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
              Trust & Safety Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Only The Top 3% of Applicants Make the Cut
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We know inviting someone into your home requires trust. Here is how we verify every cleaner:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Identity & Right to Work', desc: '100-point Australian ID verification and visa validity check.' },
              { num: '02', title: 'National Police Check', desc: 'Zero criminal conviction history clearance verified by WA authorities.' },
              { num: '03', title: 'Practical Assessment', desc: 'In-person trial evaluating technique, speed, and safety protocols.' },
              { num: '04', title: '$10M Insurance Bond', desc: 'Covered under our public liability policy for ultimate property protection.' },
              { num: '05', title: 'Ongoing Quality Audits', desc: 'Cleaners must maintain at least a 4.8-star rating to remain active.' }
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <span className="text-3xl font-black text-sky-500 font-mono">{step.num}</span>
                <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Direct CTA */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-black text-slate-900">Experience The Kleanix Difference Today</h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Book online in 60 seconds. No cards charged until your clean is completed to perfection.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02]"
        >
          <span>Book Your Clean Now</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

    </div>
  );
}
