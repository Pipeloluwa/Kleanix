"use client";
import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            We&apos;re Here To Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact Our Perth Support Desk
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have a question about a complex clean, commercial quotation, or need to amend an existing booking? Get in touch today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-8 shadow-xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Get in Touch Directly</h2>
              <p className="text-xs text-slate-400 mt-1">Our customer concierge is available 7 days a week.</p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Phone Support</p>
                  <a href="tel:1300346034" className="text-lg font-black text-white hover:text-sky-300 transition-colors">
                    1300 34 60 34
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Direct line to our Perth dispatch team</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Email Enquiries</p>
                  <a href="mailto:hello@kleanix.com.au" className="font-bold text-white hover:text-sky-300 transition-colors">
                    hello@kleanix.com.au
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Average response under 20 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Headquarters</p>
                  <p className="font-bold text-white">9 Parker Street, South Perth, WA 6151</p>
                  <p className="text-xs text-slate-400 mt-0.5">Serving the entire Perth Metropolitan Area</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaClock />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Operating Hours</p>
                  <p className="font-bold text-white">Monday &ndash; Sunday: 7:00 AM &ndash; 8:00 PM</p>
                  <p className="text-xs text-slate-400 mt-0.5">Weekend & after-hours cleaning available</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-white">Need an urgent clean?</span> Call us directly for same-day dispatch availability.
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Send Us A Message</h2>
            <p className="text-xs text-slate-500 mb-6">Fill out the form below and we will get back to you shortly.</p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
                <FaCheckCircle className="text-3xl text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700">Thank you for contacting Kleanix. Our Perth concierge will respond within 20 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Lawson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-base sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="david@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-base sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="0400 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-base sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">How Can We Help?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your property size, preferred service, or specific enquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-base sm:text-sm rounded-xl border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
