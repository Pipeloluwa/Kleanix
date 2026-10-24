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
  FaStar,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaAward
} from 'react-icons/fa';
import { DUMMY_SERVICES, DUMMY_SUBURBS } from '@/app/services/mockApiService';

export const FooterComponent = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80">
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-2xl flex-shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Police-Checked & Insured</h4>
              <p className="text-xs text-slate-400 mt-0.5">$10M Public Liability insurance with fully vetted cleaners.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl flex-shrink-0">
              <FaAward />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Happiness Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">If you aren&apos;t 100% satisfied, we return and re-clean free of charge.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
              <FaStar />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">4.9 / 5 Google Rating</h4>
              <p className="text-xs text-slate-400 mt-0.5">Over 520+ verified residential & commercial reviews in Perth.</p>
            </div>
          </div>

        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <LogoComponent lightMode={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Kleanix is Perth&apos;s leading technology-enabled cleaning service. We provide trusted, top-tier home cleaning, deep detailing, and REIWA-compliant bond cleans across the entire Perth metropolitan area.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <FaMapMarkerAlt className="text-sky-400 text-sm" />
                <span>9 Parker Street, South Perth, WA 6151</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FaPhoneAlt className="text-sky-400 text-sm" />
                <a href="tel:1300346034" className="hover:text-white font-bold">1300 34 60 34</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FaEnvelope className="text-sky-400 text-sm" />
                <a href="mailto:hello@kleanix.com.au" className="hover:text-white">hello@kleanix.com.au</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FaClock className="text-sky-400 text-sm" />
                <span>Monday - Sunday: 7:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaFacebookF className="text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaInstagram className="text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaLinkedinIn className="text-xs" />
              </a>
            </div>
          </div>

          {/* Cleaning Services */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Our Services</h5>
            <ul className="space-y-2.5 text-xs">
              {DUMMY_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-sky-400 transition-colors flex items-center justify-between"
                  >
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & Support */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Company & Info</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing & Rate Card</Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-sky-400 transition-colors">Customer Reviews</Link>
              </li>
              <li>
                <Link href="/suburbs" className="hover:text-sky-400 transition-colors">Perth Suburbs Served</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sky-400 transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-sky-400 font-bold text-sky-400 transition-colors">Book A Clean Online</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Perth Areas */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Key Perth Areas</h5>
            <div className="flex flex-wrap gap-1.5">
              {DUMMY_SUBURBS.slice(0, 10).map((sub) => (
                <Link
                  key={sub.postcode}
                  href="/suburbs"
                  className="text-[11px] bg-slate-900 hover:bg-sky-900/60 hover:text-white px-2 py-1 rounded-md border border-slate-800 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Covering North, South, Central & Western suburbs of Perth WA.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Kleanix Platform Pty Ltd. All rights reserved. ABN 84 928 104 391.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-400">Help Center</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterComponent;
