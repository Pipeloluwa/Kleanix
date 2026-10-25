"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import {
  setStep,
  nextStep,
  prevStep,
  setServiceId,
  setBedrooms,
  setBathrooms,
  setFrequency,
  toggleExtra,
  setSchedule,
  updateCustomerField,
  validateCouponThunk,
  removeCoupon,
  submitBookingThunk,
  resetBooking
} from '@/app/state_management/reducers/client-reducers/bookingSlice';
import { openLeaveReviewModal } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import {
  DUMMY_SERVICES,
  DUMMY_EXTRAS,
  FREQUENCY_OPTIONS,
  DUMMY_SUBURBS
} from '@/app/services/mockApiService';
import {
  FaCheck,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaTag,
  FaShieldAlt,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaKey,
  FaCar,
  FaPaw,
  FaPrint,
  FaStar
} from 'react-icons/fa';
import { CleanFrequency, BookingCustomer } from '@/app/state_management/types';
import { stepVariants } from '@/app/animation/animationVariants';

const TIME_SLOTS = [
  '08:00 AM - 11:00 AM',
  '11:00 AM - 02:00 PM',
  '02:00 PM - 05:00 PM',
  'Flexible (Anytime during the day)'
];

const ACCESS_METHODS: { id: BookingCustomer['accessMethod']; label: string; desc: string }[] = [
  { id: 'someone_home', label: 'Someone will be home', desc: 'You or a family member will let the cleaners in' },
  { id: 'key_under_mat', label: 'Key under doormat / plant', desc: 'Securely left in a safe spot for arrival' },
  { id: 'lockbox', label: 'Key Lockbox / Safe', desc: 'Code provided in the access instructions' },
  { id: 'building_concierge', label: 'Building Concierge / Intercom', desc: 'Left with building reception or buzz upon arrival' },
  { id: 'call_on_arrival', label: 'Call upon arrival', desc: 'Cleaner will ring your phone 10 minutes prior' }
];

export const InteractiveBookingFlow = () => {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);

  const [couponInput, setCouponInput] = useState('');
  const flowTopRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    // 1. Reset standard window
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // 2. Reset PageContainer scroll position
    const scrollContainers = document.querySelectorAll('.overflow-y-auto');
    scrollContainers.forEach((container) => {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // 3. Ensure booking container starts at the top
    if (flowTopRef.current) {
      flowTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [booking.currentStep, booking.status]);

  const handleNextStep = () => {
    dispatch(nextStep());
    scrollToTop();
  };

  const handlePrevStep = () => {
    dispatch(prevStep());
    scrollToTop();
  };

  const handleSetStep = (stepNumber: number) => {
    dispatch(setStep(stepNumber));
    scrollToTop();
  };

  const currentService = DUMMY_SERVICES.find((s) => s.id === booking.serviceId) || DUMMY_SERVICES[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      dispatch(validateCouponThunk(couponInput.trim()));
    }
  };

  const handleSubmit = () => {
    dispatch(submitBookingThunk());
    scrollToTop();
  };

  // If successfully booked, render confirmation screen
  if (booking.status === 'confirmed' && booking.confirmationData) {
    const conf = booking.confirmationData;
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-6 shadow-md shadow-emerald-500/20">
          <FaCheckCircle />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Booking Confirmed
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">
          You&apos;re All Set, {conf.customerName.split(' ')[0]}!
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          We&apos;ve reserved your cleaning service. A detailed confirmation and receipt have been dispatched to your email.
        </p>

        {/* Ticket Summary Card */}
        <div className="my-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 text-left max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Booking Reference</p>
              <p className="text-lg font-mono font-black text-sky-600">{conf.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold">Total Amount (GST Incl.)</p>
              <p className="text-xl font-black text-slate-900">${conf.totalAmount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-semibold uppercase">Service Booked</p>
              <p className="font-bold text-slate-800 text-sm">{conf.serviceName}</p>
              <p className="text-slate-500">{booking.bedrooms} Bed &bull; {booking.bathrooms} Bath</p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold uppercase">Appointment Time</p>
              <p className="font-bold text-slate-800 text-sm">{conf.scheduledDate || 'Upcoming Selected Date'}</p>
              <p className="text-slate-500">{conf.scheduledTime}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-slate-400 font-semibold uppercase">Service Address</p>
              <p className="font-bold text-slate-800">{conf.address}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <FaShieldAlt className="text-emerald-500" /> 100% Satisfaction Bond Guarantee Active
            </span>
            <span>No upfront card charge</span>
          </div>
        </div>

        {/* Rate & Review Prompt */}
        <div className="my-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
              <FaStar className="text-amber-500" /> Have you used Kleanix before?
            </p>
            <p className="text-xs text-amber-800 mt-0.5">
              Share your feedback to help us maintain Perth&apos;s #1 cleaning standard.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(openLeaveReviewModal())}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-95"
          >
            Rate & Review Clean
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FaPrint />
            <span>Print Confirmation</span>
          </button>

          <button
            onClick={() => {
              dispatch(resetBooking());
              scrollToTop();
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            Book Another Clean
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sky-600 hover:text-sky-800 font-bold text-sm transition-colors"
          >
            Return to Homepage &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={flowTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      
      {/* Step Indicator Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          
          {/* Progress bar track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-sky-600 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((booking.currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, label: 'Service & Rooms' },
            { step: 2, label: 'Add-on Extras' },
            { step: 3, label: 'Schedule & Access' },
            { step: 4, label: 'Review & Confirm' }
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => handleSetStep(item.step)}
                disabled={item.step > booking.currentStep + 1}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  booking.currentStep === item.step
                    ? 'bg-sky-600 text-white ring-4 ring-sky-100 shadow-md scale-110'
                    : booking.currentStep > item.step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {booking.currentStep > item.step ? <FaCheck /> : item.step}
              </button>
              <span className={`text-[11px] font-bold mt-1.5 hidden sm:inline ${
                booking.currentStep === item.step ? 'text-sky-600' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* Main Layout Grid: Steps (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ================= STEP 1: SERVICE & ROOMS ================= */}
            {booking.currentStep === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Choose Your Cleaning Service</h3>
                  <p className="text-sm text-slate-500 mt-1">Select the type of clean that fits your requirement</p>
                </div>

              {/* Service Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DUMMY_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => dispatch(setServiceId(srv.id))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      booking.serviceId === srv.id
                        ? 'border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-extrabold text-slate-900 text-sm sm:text-base">{srv.title}</p>
                      {srv.popular && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.shortDesc}</p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                      <span className="font-bold text-sky-700">From ${srv.basePrice} AUD</span>
                      <span className="text-slate-400 font-medium">{srv.estimatedHours}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Room Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                
                {/* Bedrooms */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Number of Bedrooms
                    </label>
                    <span className="text-sm font-black text-sky-600">{booking.bedrooms} Bed{booking.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => dispatch(setBedrooms(num))}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          booking.bedrooms === num
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {num}{num === 6 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Number of Bathrooms
                    </label>
                    <span className="text-sm font-black text-sky-600">{booking.bathrooms} Bath{booking.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => dispatch(setBathrooms(num))}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          booking.bathrooms === num
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {num}{num === 5 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Clean Frequency Selection */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  How Often Would You Like Us To Clean?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FREQUENCY_OPTIONS.map((freq) => (
                    <div
                      key={freq.id}
                      onClick={() => dispatch(setFrequency(freq.id as CleanFrequency))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        booking.frequency === freq.id
                          ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{freq.name}</span>
                        {freq.discountPercentage > 0 && (
                          <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Save {freq.discountPercentage}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{freq.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next step button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span>Continue to Extras</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: ADD-ON EXTRAS ================= */}
          {booking.currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black text-slate-900">Customise With Add-On Extras</h3>
                <p className="text-sm text-slate-500 mt-1">Select any additional deep detailing tasks for your property</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DUMMY_EXTRAS.map((extra) => {
                  const isSelected = booking.selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => dispatch(toggleExtra(extra.id))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                            isSelected ? 'bg-sky-600 text-white' : 'border border-slate-300'
                          }`}>
                            {isSelected && <FaCheck className="text-[10px]" />}
                          </div>
                          <p className="text-sm font-bold text-slate-900">{extra.name}</p>
                        </div>
                        <p className="text-xs text-slate-500 pl-7">{extra.description}</p>
                        <p className="text-[11px] text-sky-600 pl-7 font-medium">Adds ~{extra.estimatedMinutes} mins</p>
                      </div>
                      <span className="text-sm font-black text-slate-900 flex-shrink-0">
                        +${extra.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span>Continue to Schedule</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: SCHEDULE & ACCESS ================= */}
          {booking.currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black text-slate-900">Select Date & Property Access</h3>
                <p className="text-sm text-slate-500 mt-1">Tell us when to arrive and how to access the property</p>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => dispatch(setSchedule({ date: e.target.value, timeSlot: booking.timeSlot }))}
                    className="w-full text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Bookings available 7 days a week</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Arrival Window
                  </label>
                  <select
                    value={booking.timeSlot}
                    onChange={(e) => dispatch(setSchedule({ date: booking.date, timeSlot: e.target.value }))}
                    className="w-full text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Address */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Perth Property Location</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 14 South Terrace"
                      value={booking.customer.address}
                      onChange={(e) => dispatch(updateCustomerField({ field: 'address', value: e.target.value }))}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Unit / Apt (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Apt 4B"
                      value={booking.customer.unitNumber || ''}
                      onChange={(e) => dispatch(updateCustomerField({ field: 'unitNumber', value: e.target.value }))}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Perth Suburb</label>
                    <select
                      value={booking.customer.suburb}
                      onChange={(e) => dispatch(updateCustomerField({ field: 'suburb', value: e.target.value }))}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {DUMMY_SUBURBS.map((sub) => (
                        <option key={sub.postcode} value={sub.name}>
                          {sub.name} (WA {sub.postcode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Postcode</label>
                    <input
                      type="text"
                      placeholder="6000"
                      value={booking.customer.postcode}
                      onChange={(e) => dispatch(updateCustomerField({ field: 'postcode', value: e.target.value }))}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Entry / Access Method */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Property Entry Method
                </label>
                <div className="space-y-2">
                  {ACCESS_METHODS.map((acc) => (
                    <label
                      key={acc.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        booking.customer.accessMethod === acc.id
                          ? 'border-sky-600 bg-sky-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accessMethod"
                        checked={booking.customer.accessMethod === acc.id}
                        onChange={() => dispatch(updateCustomerField({ field: 'accessMethod', value: acc.id }))}
                        className="mt-1 text-sky-600"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{acc.label}</p>
                        <p className="text-[11px] text-slate-500">{acc.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Special Entry Notes / Lockbox Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lockbox code is 4920, side gate is unlocked"
                    value={booking.customer.accessNotes || ''}
                    onChange={(e) => dispatch(updateCustomerField({ field: 'accessNotes', value: e.target.value }))}
                    className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Parking & Pets Checkboxes */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={booking.customer.parkingAvailable}
                    onChange={(e) => dispatch(updateCustomerField({ field: 'parkingAvailable', value: e.target.checked }))}
                    className="rounded text-sky-600"
                  />
                  <FaCar className="text-slate-400" />
                  <span>Free driveway / street parking available</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={booking.customer.hasPets}
                    onChange={(e) => dispatch(updateCustomerField({ field: 'hasPets', value: e.target.checked }))}
                    className="rounded text-sky-600"
                  />
                  <FaPaw className="text-slate-400" />
                  <span>Friendly pets on property</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span>Continue to Review</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 4: CONTACT & FINAL REVIEW ================= */}
          {booking.currentStep === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black text-slate-900">Contact Details & Final Confirmation</h3>
                <p className="text-sm text-slate-500 mt-1">Review your service summary before reserving your clean</p>
              </div>

              {/* Contact info form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                    <input
                      type="text"
                      placeholder="e.g. John Mitchell"
                      value={booking.customer.fullName}
                      onChange={(e) => dispatch(updateCustomerField({ field: 'fullName', value: e.target.value }))}
                      className="w-full text-sm rounded-xl border border-slate-300 pl-9 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (For Invoicing)</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={booking.customer.email}
                        onChange={(e) => dispatch(updateCustomerField({ field: 'email', value: e.target.value }))}
                        className="w-full text-sm rounded-xl border border-slate-300 pl-9 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (For SMS Updates)</label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                      <input
                        type="tel"
                        placeholder="0400 123 456"
                        value={booking.customer.phone}
                        onChange={(e) => dispatch(updateCustomerField({ field: 'phone', value: e.target.value }))}
                        className="w-full text-sm rounded-xl border border-slate-300 pl-9 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Focus Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please pay special attention to master bedroom shower screen and kitchen stove"
                    value={booking.customer.specialInstructions || ''}
                    onChange={(e) => dispatch(updateCustomerField({ field: 'specialInstructions', value: e.target.value }))}
                    className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Promotional Coupon / Voucher Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaTag className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Try code: KLEAN15 or PERTH20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-sm rounded-xl border border-slate-300 pl-9 p-2.5 bg-slate-50 uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Apply Code
                  </button>
                </div>

                {/* Coupon Feedback */}
                {booking.couponValid && (
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <FaCheck className="text-emerald-500" /> Coupon &ldquo;{booking.couponCode}&rdquo; applied successfully!
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(removeCoupon())}
                      className="text-emerald-800 underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {booking.couponError && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">
                    {booking.couponError}
                  </p>
                )}
              </div>

              {/* Payment Guarantee Notice */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
                <FaLock className="text-sky-600 text-base mt-0.5 flex-shrink-0" />
                <div className="text-xs text-sky-900 space-y-0.5">
                  <p className="font-bold">Zero Risk - Payment Held Upon Completion</p>
                  <p className="text-sky-700">
                    You will only be invoiced once our team completes your clean to 100% satisfaction. Free cancellation up to 24 hours prior.
                  </p>
                </div>
              </div>

              {/* Rate & Review Previous Clean Prompt */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-900">
                  <FaStar className="text-amber-500" />
                  <span>Used Kleanix before? Share your experience with other Perth locals.</span>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(openLeaveReviewModal())}
                  className="font-bold text-amber-800 hover:text-amber-900 underline whitespace-nowrap"
                >
                  Rate Cleaner
                </button>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={booking.status === 'submitting'}
                  onClick={handleSubmit}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 disabled:opacity-50 transition-transform active:scale-95"
                >
                  {booking.status === 'submitting' ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Securing Your Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Reserve Booking</span>
                      <FaCheckCircle className="text-sm" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>

        </div>

        {/* Right Sticky Order Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400 pb-3 border-b border-slate-800">
              Booking Breakdown
            </h4>

            {/* Service & Room Summary */}
            <div className="py-4 space-y-3 text-xs border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-sm text-white">{currentService.title}</p>
                  <p className="text-slate-400">{booking.bedrooms} Bedrooms &bull; {booking.bathrooms} Bathrooms</p>
                </div>
                <span className="font-bold text-sky-300">Included</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Frequency:</span>
                <span className="font-semibold text-white capitalize">
                  {booking.frequency.replace('_', ' ')}
                </span>
              </div>

              {booking.date && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Date:</span>
                  <span className="font-semibold text-white">{booking.date}</span>
                </div>
              )}
            </div>

            {/* Extras Summary */}
            {booking.selectedExtras.length > 0 && (
              <div className="py-3 space-y-2 border-b border-slate-800 text-xs">
                <p className="font-bold text-slate-400 uppercase text-[10px]">Selected Add-ons:</p>
                {booking.selectedExtras.map((extraId) => {
                  const item = DUMMY_EXTRAS.find((e) => e.id === extraId);
                  if (!item) return null;
                  return (
                    <div key={extraId} className="flex items-center justify-between text-slate-300">
                      <span>&bull; {item.name}</span>
                      <span className="font-semibold text-white">+${item.price}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="py-4 space-y-2 text-xs border-b border-slate-800">
              <div className="flex items-center justify-between text-slate-400">
                <span>Base Subtotal:</span>
                <span>${booking.subtotal}</span>
              </div>

              {booking.discountTotal > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Frequency / Promo Discount:</span>
                  <span>-${booking.discountTotal}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400">
                <span>GST (10% Included):</span>
                <span>${booking.taxGst}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400 font-semibold">Total Price</p>
                <p className="text-3xl font-black text-white tracking-tight">${booking.finalTotal}</p>
              </div>
              <span className="text-xs text-sky-400 font-semibold bg-sky-950 px-2 py-1 rounded-md border border-sky-800">
                AUD (No Hidden Fees)
              </span>
            </div>

            {/* Trust bulletpoints */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <p className="flex items-center gap-1.5 text-slate-300">
                <FaCheckCircle className="text-emerald-400" /> 100% Bond Back REIWA Guarantee
              </p>
              <p className="flex items-center gap-1.5 text-slate-300">
                <FaShieldAlt className="text-sky-400" /> Insured up to $10,000,000 AUD
              </p>
            </div>
          </div>

          {/* Need help telephone box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-center space-y-1">
            <p className="font-bold text-slate-800">Prefer to book over the phone?</p>
            <p className="text-slate-500">Our Perth concierge is standing by to help</p>
            <a
              href="tel:1300346034"
              className="inline-flex items-center gap-1.5 font-black text-sky-600 hover:text-sky-700 text-sm mt-1"
            >
              <FaPhoneAlt className="text-xs" />
              <span>1300 34 60 34</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InteractiveBookingFlow;
