"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaCalendarCheck
} from 'react-icons/fa';

export const NavBarComponent = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
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

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <LogoComponent />
          </div>

          {/* Simple Clean Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link
              href="/services"
              className={`hover:text-sky-600 transition-colors ${pathname === '/services' ? 'text-sky-600 font-bold' : ''}`}
            >
              Services
            </Link>

            <Link
              href="/pricing"
              className={`hover:text-sky-600 transition-colors ${pathname === '/pricing' ? 'text-sky-600 font-bold' : ''}`}
            >
              Pricing
            </Link>

            <Link
              href="/suburbs"
              className={`hover:text-sky-600 transition-colors ${pathname === '/suburbs' ? 'text-sky-600 font-bold' : ''}`}
            >
              Areas
            </Link>

            <Link
              href="/faq"
              className={`hover:text-sky-600 transition-colors ${pathname === '/faq' ? 'text-sky-600 font-bold' : ''}`}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className={`hover:text-sky-600 transition-colors ${pathname === '/contact' ? 'text-sky-600 font-bold' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => dispatch(openQuoteModal())}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3.5 py-2 rounded-xl transition-all"
            >
              Quote
            </button>

            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              <FaCalendarCheck className="text-[11px]" />
              <span>Book Clean</span>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden text-xs font-bold text-white bg-sky-600 px-3 py-1.5 rounded-lg"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
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
                <button onClick={closeMobile} className="p-1 text-slate-500">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2 flex-1 text-sm font-medium text-slate-800">
                <Link href="/services" onClick={closeMobile} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  Services
                </Link>
                <Link href="/pricing" onClick={closeMobile} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  Pricing
                </Link>
                <Link href="/suburbs" onClick={closeMobile} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  Perth Areas
                </Link>
                <Link href="/faq" onClick={closeMobile} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  FAQ
                </Link>
                <Link href="/contact" onClick={closeMobile} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  Contact
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <Link
                  href="/book"
                  onClick={closeMobile}
                  className="block w-full py-2.5 text-center rounded-xl bg-sky-600 text-white font-bold text-xs"
                >
                  Book A Clean
                </Link>
                <a
                  href="tel:1300346034"
                  className="block w-full py-2 text-center rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
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
