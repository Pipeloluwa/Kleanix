"use client";
import React from 'react';
import CustomerReviewsComponent from '../components/home-components/CustomerReviewsComponent';
import { useAppDispatch } from '@/app/state_management/hooks';
import { openLeaveReviewModal } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import { FaStar, FaGoogle, FaShieldAlt } from 'react-icons/fa';

export default function ReviewsPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            Real Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Customer Reviews & Experiences
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See what our Perth clients say about our standard cleaning, deep detailing, and bond-back vacate cleans.
          </p>

          <div className="pt-3">
            <button
              onClick={() => dispatch(openLeaveReviewModal())}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 mx-auto active:scale-95"
            >
              <FaStar className="text-xs" />
              <span>Write A Verified Review</span>
            </button>
          </div>
        </div>

        <CustomerReviewsComponent />

      </div>
    </div>
  );
}
