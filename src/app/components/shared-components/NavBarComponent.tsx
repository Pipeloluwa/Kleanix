"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaCalendarCheck
} from 'react-icons/fa';

export const NavBarComponent = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  const linkBaseClasses =
    "px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-150 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 select-none active:scale-[0.98]";

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <LogoComponent />
          </div>

          {/* Clean Navigation */}
          <div className="hidden md:flex items-center gap-2 text-slate-700">
            <Link
              href="/services"
              className={`${linkBaseClasses} ${
                pathname === '/services'
                  ? 'text-sky-600 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Services
            </Link>

            <Link
              href="/pricing"
              className={`${linkBaseClasses} ${
                pathname === '/pricing'
                  ? 'text-sky-600 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/suburbs"
              className={`${linkBaseClasses} ${
                pathname === '/suburbs'
                  ? 'text-sky-600 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Areas
            </Link>

            <Link
              href="/faq"
              className={`${linkBaseClasses} ${
                pathname === '/faq'
                  ? 'text-sky-600 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className={`${linkBaseClasses} ${
                pathname === '/contact'
                  ? 'text-sky-600 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:1300346034"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors flex items-center gap-1.5"
            >
              <FaPhoneAlt className="text-sky-600 text-[10px]" />
              <span>1300 34 60 34</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl shadow-sm transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 active:scale-95"
            >
              <FaCalendarCheck className="text-[11px]" />
              <span>Book Clean</span>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden text-xs font-bold text-white bg-sky-600 px-3 py-1.5 rounded-lg outline-none active:scale-95"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 outline-none focus:outline-none active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={closeMobile}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col z-50 p-5 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <LogoComponent size="sm" />
                <button onClick={closeMobile} className="p-1 text-slate-500 outline-none">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-1.5 flex-1 text-sm font-medium text-slate-800">
                <Link
                  href="/services"
                  onClick={closeMobile}
                  className={`block py-2.5 px-3 rounded-xl transition-colors outline-none ${
                    pathname === '/services' ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  onClick={closeMobile}
                  className={`block py-2.5 px-3 rounded-xl transition-colors outline-none ${
                    pathname === '/pricing' ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  href="/suburbs"
                  onClick={closeMobile}
                  className={`block py-2.5 px-3 rounded-xl transition-colors outline-none ${
                    pathname === '/suburbs' ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Perth Areas
                </Link>
                <Link
                  href="/faq"
                  onClick={closeMobile}
                  className={`block py-2.5 px-3 rounded-xl transition-colors outline-none ${
                    pathname === '/faq' ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className={`block py-2.5 px-3 rounded-xl transition-colors outline-none ${
                    pathname === '/contact' ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Contact
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <Link
                  href="/book"
                  onClick={closeMobile}
                  className="block w-full py-2.5 text-center rounded-xl bg-sky-600 text-white font-bold text-xs shadow-sm outline-none active:scale-95"
                >
                  Book A Clean
                </Link>
                <a
                  href="tel:1300346034"
                  className="block w-full py-2 text-center rounded-xl border border-slate-200 text-slate-700 font-bold text-xs outline-none"
                >
                  1300 34 60 34
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBarComponent;
