"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaUserCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { DUMMY_SERVICES } from '@/app/services/mockApiService';

export const NavBarComponent = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const navBgState = useAppSelector((state) => state.navBgState.value);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

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
      <nav
        className={`sticky top-0 z-40 transition-all duration-200 ${
          navBgState
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 mr-4">
            <LogoComponent />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 focus:outline-none ${
                  pathname?.startsWith('/services') ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-4 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 px-2 z-50"
                  >
                    <div className="space-y-1">
                      {DUMMY_SERVICES.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                            <HiSparkles className="text-xs" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
                              {srv.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {srv.priceNote}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center justify-between py-1"
                      >
                        <span>All Services & Inclusions</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/pricing"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/pricing' ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/suburbs"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/suburbs' ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Areas
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/about' ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/contact' ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Contact
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                pathname?.startsWith('/dashboard') ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <FaUserCircle className="text-sm text-sky-500" />
              <span>Portal</span>
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => dispatch(openQuoteModal())}
              className="text-xs lg:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl transition-all"
            >
              Quick Quote
            </button>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-xs lg:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 px-4 lg:px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <FaCalendarCheck className="text-xs" />
              <span>Book Online</span>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden text-xs font-bold text-white bg-sky-600 px-3 py-2 rounded-xl shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
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
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeMobile}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 max-w-[85vw] sm:max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <LogoComponent size="sm" />
                <button
                  onClick={closeMobile}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              <div className="p-4 space-y-3 flex-1">
                <Link
                  href="/book"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-sm shadow-sm"
                >
                  <FaCalendarCheck />
                  <span>Book Clean</span>
                </Link>

                <button
                  onClick={() => {
                    closeMobile();
                    dispatch(openQuoteModal());
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center"
                >
                  Quick Quote
                </button>

                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-sky-200 bg-sky-50 text-sky-700 font-bold text-xs"
                >
                  <FaUserCircle />
                  <span>Portal (Customer / Admin / Super Admin)</span>
                </Link>

                <a
                  href="tel:1300346034"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  <FaPhoneAlt className="text-sky-600 text-[10px]" />
                  <span>1300 34 60 34</span>
                </a>

                {/* Services list */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Services</p>
                  <div className="space-y-1">
                    {DUMMY_SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        onClick={closeMobile}
                        className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Explore Links */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Explore</p>
                  <div className="space-y-1">
                    <Link
                      href="/pricing"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/suburbs"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Perth Areas
                    </Link>
                    <Link
                      href="/about"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      About
                    </Link>
                    <Link
                      href="/faq"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Contact
                    </Link>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Kleanix Perth WA</p>
                <p className="text-[11px] text-slate-400">Police Checked & Insured</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBarComponent;
