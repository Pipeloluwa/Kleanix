"use client";
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { setRatingFilter } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import { FaStar, FaCheckCircle, FaGoogle, FaQuoteLeft } from 'react-icons/fa';

export const CustomerReviewsComponent = () => {
  const dispatch = useAppDispatch();
  const { items, ratingFilter, averageRating, totalCount } = useAppSelector((state) => state.reviews);

  const filteredReviews = ratingFilter === 'all'
    ? items
    : items.filter((r) => r.rating === ratingFilter);

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <FaGoogle className="text-red-500" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Rated 4.9 Stars Across Perth
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read authentic reviews from Perth homeowners, tenants, real estate agents, and commercial property managers.
          </p>

          {/* Rating Summary Bar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex text-amber-500 text-lg">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <span className="text-lg font-black text-slate-900">{averageRating}</span>
            <span className="text-xs text-slate-500 font-semibold">({totalCount} Total Verified Reviews)</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => dispatch(setRatingFilter('all'))}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              ratingFilter === 'all'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => dispatch(setRatingFilter(5))}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              ratingFilter === 5
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FaStar className="text-amber-500" />
            <span>5 Stars Only</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Service Tag */}
                <span className="inline-block text-[11px] font-bold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-lg">
                  {rev.service}
                </span>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center font-bold text-sm">
                    {rev.author[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-extrabold text-sm text-slate-900">{rev.author}</p>
                    {rev.verified && (
                      <FaCheckCircle className="text-emerald-500 text-xs" title="Verified Clean" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{rev.suburb}, WA</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewsComponent;
