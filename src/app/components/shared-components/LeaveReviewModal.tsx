"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector, useAppDispatch } from '@/app/state_management/hooks';
import { closeLeaveReviewModal, addCustomerReview } from '@/app/state_management/reducers/client-reducers/reviewsSlice';
import { modalOverlayVariants, modalContentVariants } from '@/app/animation/animationVariants';
import { FaStar, FaTimes, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { DUMMY_SERVICES, DUMMY_SUBURBS } from '@/app/services/mockApiService';

const RATING_LABELS = ['', '1 - Poor', '2 - Fair', '3 - Good', '4 - Great', '5 - Exceptional'];

export const LeaveReviewModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.reviews.leaveReviewModalOpen);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [suburb, setSuburb] = useState('South Perth');
  const [service, setService] = useState('Standard Home Clean');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        dispatch(closeLeaveReviewModal());
        setAuthor('');
        setComment('');
        setRating(5);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => dispatch(closeLeaveReviewModal())}
        />

        {/* Modal Window */}
        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-slate-100 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-lg">
                <FaStar />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Rate & Review Your Clean</h3>
                <p className="text-xs text-slate-500">Your feedback helps us maintain Perth&apos;s highest standard</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(closeLeaveReviewModal())}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <FaCheckCircle className="text-5xl text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-slate-900">Thank You For Your Review!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your verified rating has been saved and published to the Kleanix community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Star Rating Selection */}
              <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-600 mb-1.5">How was your cleaning service?</p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <FaStar
                        className={
                          (hoverRating || rating) >= star
                            ? 'text-amber-400 drop-shadow-sm'
                            : 'text-slate-200'
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] font-bold text-amber-600 mt-1">
                  {RATING_LABELS[hoverRating || rating]}
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lisa Davies"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Suburb & Service Grid */}
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
                  <label className="block font-bold text-slate-700 mb-1">Service Received</label>
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

              {/* Review Comment */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Feedback & Experience</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the cleaner's punctuality, attention to detail, shower grout, kitchen..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => dispatch(closeLeaveReviewModal())}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Post Verified Review</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeaveReviewModal;
