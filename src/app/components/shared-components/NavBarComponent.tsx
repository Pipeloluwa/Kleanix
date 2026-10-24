"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { openQuoteModal } from '@/app/state_management/reducers/client-reducers/uiSlice';
import LogoComponent from './LogoComponent';
import {
  FaPhoneAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaStar,
  FaRegQuestionCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { DUMMY_SERVICES } from '@/app/services/mockApiService';

export const NavBarComponent = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const navBgState = useAppSelector((state) => state.navBgState.value);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          navBgState
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 ${
                  pathname?.startsWith('/services') ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-12 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perth Cleaning Services</p>
                  </div>
                  {DUMMY_SERVICES.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sky-50/70 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        <HiSparkles className="text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {srv.title}
                          </p>
                          {srv.popular && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
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
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center justify-between"
                    >
                      <span>Explore all packages & checklists</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/pricing' ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Pricing & Calculator
            </Link>

            <Link
              href="/suburbs"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/suburbs' ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Service Areas
            </Link>

            <Link
              href="/reviews"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                pathname === '/reviews' ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              <span>Reviews</span>
              <span className="flex items-center text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                <FaStar className="text-[10px] text-amber-500 mr-1" /> 4.9★
              </span>
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/about' ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/faq"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/faq' ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:1300346034"
              className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-sky-600 font-bold text-sm px-3 py-2 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors"
            >
              <FaPhoneAlt className="text-sky-600 text-xs" />
              <span>1300 34 60 34</span>
            </a>

            <button
              onClick={() => dispatch(openQuoteModal())}
              className="text-xs lg:text-sm font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-2.5 rounded-xl border border-sky-200 transition-all shadow-sm"
            >
              Instant Quote
            </button>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 px-4 py-2.5 rounded-xl shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <FaCalendarCheck className="text-sm" />
              <span>Book Clean</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/book"
              className="text-xs font-bold text-white bg-sky-600 px-3 py-2 rounded-lg"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobile}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
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
              {/* Call support */}
              <a
                href="tel:1300346034"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-sm border border-sky-200"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call 1300 34 60 34</span>
              </a>

              {/* Book now primary */}
              <Link
                href="/book"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-sm shadow-md shadow-sky-500/20"
              >
                <FaCalendarCheck />
                <span>Book A Clean Now</span>
              </Link>

              {/* Nav links */}
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

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Explore</p>
                <div className="space-y-1">
                  <Link
                    href="/pricing"
                    onClick={closeMobile}
                    className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                  >
                    Pricing & Calculator
                  </Link>
                  <Link
                    href="/suburbs"
                    onClick={closeMobile}
                    className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                  >
                    Perth Service Areas
                  </Link>
                  <Link
                    href="/reviews"
                    onClick={closeMobile}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                  >
                    <span>Customer Reviews</span>
                    <span className="text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">4.9★</span>
                  </Link>
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
              <p className="font-semibold text-slate-700">Kleanix Perth</p>
              <p>9 Parker Street, South Perth WA 6151</p>
              <p className="text-[11px] text-slate-400">ABN: 84 928 104 391 | Fully Insured</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarComponent;