"use client";
import React from 'react';
import Link from 'next/link';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaAward,
  FaLock
} from 'react-icons/fa';
import { DUMMY_SERVICES, DUMMY_SUBURBS } from '@/app/services/mockApiService';

export const FooterComponent = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Trust Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10 border-b border-slate-800/80">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center text-xl flex-shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Police-Checked Cleaners & $10M Insurance</h4>
              <p className="text-xs text-slate-400">Vetted professionals with comprehensive liability coverage.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
              <FaAward />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Satisfaction & Bond Back Guarantee</h4>
              <p className="text-xs text-slate-400">Not completely satisfied? We re-clean free within 72 hours.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-slate-800/80 text-xs">
          
          {/* Brand info */}
          <div className="space-y-3">
            <LogoComponent lightMode={true} />
            <p className="text-slate-400 leading-relaxed">
              Simple, reliable home and commercial cleaning in Perth WA. Upfront pricing, vetted professionals, and fast online booking.
            </p>
            <div className="pt-1 text-slate-400 space-y-1">
              <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-sky-400" /> 9 Parker Street, South Perth WA</p>
              <p className="flex items-center gap-2"><FaPhoneAlt className="text-sky-400" /> 1300 34 60 34</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-sky-400" /> hello@kleanix.com.au</p>
            </div>
          </div>

          {/* Cleaning Services */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-3">Cleaning Services</h5>
            <ul className="space-y-2">
              {DUMMY_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & Portal */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/book" className="text-sky-400 font-semibold hover:underline">Book A Clean</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing & Rates</Link>
              </li>
              <li>
                <Link href="/suburbs" className="hover:text-sky-400 transition-colors">Perth Areas</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">About Kleanix</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sky-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">Contact Us</Link>
              </li>
              <li className="pt-1">
                <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white font-bold">
                  <FaLock className="text-sky-400 text-[10px]" /> User & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Perth Areas */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-3">Service Areas</h5>
            <div className="flex flex-wrap gap-1.5">
              {DUMMY_SUBURBS.slice(0, 8).map((sub) => (
                <Link
                  key={sub.postcode}
                  href="/suburbs"
                  className="text-[11px] bg-slate-900 hover:bg-sky-900/50 hover:text-white px-2 py-1 rounded border border-slate-800 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Serving Central, South, North & Coastal Perth.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>&copy; {new Date().getFullYear()} Kleanix Platform Pty Ltd. ABN 84 928 104 391.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-slate-400">Privacy</Link>
            <Link href="/faq" className="hover:text-slate-400">Terms</Link>
            <Link href="/contact" className="hover:text-slate-400">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterComponent;
