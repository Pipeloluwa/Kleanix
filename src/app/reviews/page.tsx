"use client";
import React, { useState } from 'react';
import CustomerReviewsComponent from '../components/home-components/CustomerReviewsComponent';
import { useAppDispatch } from '@/app/state_management/hooks';
import { addCustomerReview } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import { FaStar, FaGoogle, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { DUMMY_SERVICES, DUMMY_SUBURBS } from '@/app/services/mockApiService';

export default function ReviewsPage() {
  const dispatch = useAppDispatch();

  const [formOpen, setFormOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [suburb, setSuburb] = useState('South Perth');
  const [service, setService] = useState('Standard Home Clean');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && comment.trim()) {
      dispatch(
        addCustomerReview({
          author: author.trim(),
          suburb,
          service,
          rating,
          comment: comment.trim()
        })
      );
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormOpen(false);
        setAuthor('');
        setComment('');
      }, 2500);
    }
  };

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
              onClick={() => setFormOpen(!formOpen)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              {formOpen ? 'Close Form' : 'Write A Review'}
            </button>
          </div>
        </div>

        {/* Write A Review Box */}
        {formOpen && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl mb-12 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-slate-900 mb-4">Share Your Cleaning Experience</h3>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-center text-sm font-bold flex items-center justify-center gap-2">
                <FaCheckCircle className="text-emerald-600 text-lg" />
                <span>Thank you! Your verified review has been published.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Miller"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Perth Suburb</label>
                    <select
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {DUMMY_SUBURBS.map((s) => (
                        <option key={s.postcode} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {DUMMY_SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.title}>{srv.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-xl ${rating >= star ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the cleaner's attention to detail, punctuality, and overall satisfaction..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Submit Customer Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        <CustomerReviewsComponent />

      </div>
    </div>
  );
}
