"use client";
import React from 'react';
import Link from 'next/link';
import LogoComponent from './LogoComponent';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

export const FooterComponent = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-2">
            <LogoComponent lightMode={true} />
            <p className="text-slate-500 text-xs">
              Simple, reliable home and office cleaning across Perth, Western Australia.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-1.5 text-slate-300">
            <p className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">Contact</p>
            <p className="flex items-center gap-2"><FaPhoneAlt className="text-sky-400 text-xs" /> 1300 34 60 34</p>
            <p className="flex items-center gap-2"><FaEnvelope className="text-sky-400 text-xs" /> hello@kleanix.com.au</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-sky-400 text-xs" /> South Perth, WA 6151</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">Navigation</p>
            <ul className="space-y-1.5">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/suburbs" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Guarantee */}
          <div>
            <p className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">Standard</p>
            <p className="text-slate-400 leading-relaxed text-xs">
              Every clean backed by national police background checks, eco-friendly supplies, and 100% satisfaction re-clean promise.
            </p>
          </div>
        </div>

        {/* Bottom Bar with discrete portal link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Kleanix Platform Pty Ltd. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-slate-400">Privacy</Link>
            <Link href="/faq" className="hover:text-slate-400">Terms</Link>
            {/* Discrete/obscured portal link */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
              title="Staff & Admin Portal"
            >
              <FaLock className="text-[10px]" />
              <span className="text-[11px]">Staff Access</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterComponent;
