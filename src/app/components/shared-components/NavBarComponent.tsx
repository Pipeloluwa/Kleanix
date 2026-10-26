"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import { openLeaveReviewModal } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaStar
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { DUMMY_SERVICES } from '@/app/services/mockApiService';

export const NavBarComponent = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const navBgState = useAppSelector((state) => state.navBgState.value);
  const displayReviews = useAppSelector((state) => state.reviews.displayReviews);

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
        className={`sticky top-0 z-40 transition-all duration-300 ${
          navBgState
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with comfortable breathing room */}
          <div className="flex-shrink-0 mr-4">
            <LogoComponent />
          </div>

          {/* Desktop Navigation Links (Clean, Uncluttered, Spaced) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 focus:outline-none ${
                  pathname?.startsWith('/services') ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
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

              {/* Animated Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full -left-8 w-[370px] bg-white rounded-3xl shadow-2xl border border-slate-100 py-3.5 px-3 z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1.5 flex items-center justify-between">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Perth Cleaning Services</p>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">WA Certified</span>
                    </div>

                    <div className="space-y-1">
                      {DUMMY_SERVICES.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-sky-50/70 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                            <HiSparkles className="text-sm" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                {srv.title}
                              </p>
                              {srv.popular && (
                                <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {srv.priceNote}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center justify-between py-1"
                      >
                        <span>View all packages & room checklists</span>
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
              Pricing & Rates
            </Link>

            <Link
              href="/suburbs"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/suburbs' ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Service Areas
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
          </div>

          {/* Action CTAs (Uncrowded, High-Converting) */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            <button
              onClick={() => dispatch(openQuoteModal())}
              className="text-xs lg:text-sm font-bold text-sky-700 hover:text-sky-900 bg-sky-50/80 hover:bg-sky-100 px-3.5 lg:px-4 py-2.5 rounded-xl border border-sky-200/80 transition-all shadow-sm active:scale-95"
            >
              Instant Quote
            </button>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-xs lg:text-sm font-extrabold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 px-4 lg:px-5 py-2.5 rounded-xl shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <FaCalendarCheck className="text-sm" />
              <span>Book Online</span>
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Navigation Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-600 px-3.5 py-2 rounded-xl shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeMobile}
            />

            {/* Drawer content */}
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

              <div className="p-4 space-y-4 flex-1">
                {/* Book & Quote primary buttons */}
                <Link
                  href="/book"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-sm shadow-md shadow-sky-500/20"
                >
                  <FaCalendarCheck />
                  <span>Book A Clean Now</span>
                </Link>

                <button
                  onClick={() => {
                    closeMobile();
                    dispatch(openQuoteModal());
                  }}
                  className="w-full py-2.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs border border-sky-200 text-center"
                >
                  Get Instant Quote
                </button>

                {/* Call direct */}
                <a
                  href="tel:1300346034"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  <FaPhoneAlt className="text-sky-600 text-[10px]" />
                  <span>Call 1300 34 60 34</span>
                </a>

                {/* Rate Your Clean Action in Drawer */}
                <button
                  onClick={() => {
                    closeMobile();
                    dispatch(openLeaveReviewModal());
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FaStar className="text-amber-500 text-xs" />
                  <span>Rate Your Clean</span>
                </button>

                {/* Services list */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Our Services</p>
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

                {/* Navigation links */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Explore</p>
                  <div className="space-y-1">
                    <Link
                      href="/pricing"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Pricing & Rate Card
                    </Link>
                    <Link
                      href="/suburbs"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Perth Service Areas
                    </Link>
                    {displayReviews && (
                      <Link
                        href="/reviews"
                        onClick={closeMobile}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        <span>Customer Reviews</span>
                        <span className="text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">4.9★</span>
                      </Link>
                    )}
                    <Link
                      href="/about"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      About Kleanix
                    </Link>
                    <Link
                      href="/faq"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

              </div>

              {/* Bottom info */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">Kleanix Perth WA</p>
                <p>9 Parker Street, South Perth WA 6151</p>
                <p className="text-[11px] text-slate-400">ABN: 84 928 104 391 &bull; Police Checked & Insured</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBarComponent;