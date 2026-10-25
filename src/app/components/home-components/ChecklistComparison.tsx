"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FaCheck, FaTimes, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import { fadeInUp } from '@/app/animation/animationVariants';

interface ChecklistItem {
  task: string;
  room: string;
  standard: boolean;
  deep: boolean;
  vacate: boolean;
  note?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // General & Living
  { task: 'Dust all furniture, shelves & surfaces', room: 'General & Living', standard: true, deep: true, vacate: true },
  { task: 'Vacuum all carpets, rugs & stairs', room: 'General & Living', standard: true, deep: true, vacate: true },
  { task: 'Mop all hard floors (tile, timber, vinyl)', room: 'General & Living', standard: true, deep: true, vacate: true },
  { task: 'Empty waste bins & replace fresh liners', room: 'General & Living', standard: true, deep: true, vacate: true },
  { task: 'Hand wipe skirting boards & door frames', room: 'General & Living', standard: false, deep: true, vacate: true, note: 'Intensive wipe' },
  { task: 'Remove high cobwebs & dust ceiling vents', room: 'General & Living', standard: false, deep: true, vacate: true },
  { task: 'Inside built-in wardrobes & drawer interiors', room: 'General & Living', standard: false, deep: false, vacate: true, note: 'REIWA requirement' },
  { task: 'Spot clean reachable scuffs on walls', room: 'General & Living', standard: false, deep: true, vacate: true },

  // Kitchen
  { task: 'Wipe countertops, splashback & stovetop', room: 'Kitchen', standard: true, deep: true, vacate: true },
  { task: 'Scrub & disinfect sink and polish chrome taps', room: 'Kitchen', standard: true, deep: true, vacate: true },
  { task: 'Wipe exterior of microwave, fridge & dishwasher', room: 'Kitchen', standard: true, deep: true, vacate: true },
  { task: 'Deep degrease rangehood filters & fan canopy', room: 'Kitchen', standard: false, deep: true, vacate: true },
  { task: 'Full oven interior, racks & glass door restoration', room: 'Kitchen', standard: false, deep: false, vacate: true, note: 'Included in Vacate (Add-on for Standard)' },
  { task: 'Inside all cupboards, pantry shelves & drawers', room: 'Kitchen', standard: false, deep: false, vacate: true },

  // Bathrooms
  { task: 'Clean & disinfect toilet bowl, seat and cistern', room: 'Bathrooms', standard: true, deep: true, vacate: true },
  { task: 'Scrub shower screen, base & bathtub', room: 'Bathrooms', standard: true, deep: true, vacate: true },
  { task: 'Wipe vanity counter, basin & mirror streak-free', room: 'Bathrooms', standard: true, deep: true, vacate: true },
  { task: 'Mineral deposit & stubborn soap scum descaling', room: 'Bathrooms', standard: false, deep: true, vacate: true },
  { task: 'Tile grout deep scrub with antibacterial solution', room: 'Bathrooms', standard: false, deep: true, vacate: true },
  { task: 'Exhaust fan cover dust removal & floor drains', room: 'Bathrooms', standard: false, deep: true, vacate: true },

  // Windows & Specialty
  { task: 'Interior window glass & sills wipe', room: 'Windows & Doors', standard: false, deep: false, vacate: true, note: 'Included in Vacate' },
  { task: 'Window track vacuum & detail', room: 'Windows & Doors', standard: false, deep: false, vacate: true },
  { task: '100% Bond Back Inspection Guarantee', room: 'Guarantee', standard: false, deep: false, vacate: true, note: '72hr free re-clean guarantee' }
];

export const ChecklistComparison = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const rooms = ['all', 'General & Living', 'Kitchen', 'Bathrooms', 'Windows & Doors'];

  const filteredItems = selectedRoom === 'all'
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter(item => item.room === selectedRoom || item.room === 'Guarantee');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
            Transparent Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Detailed Cleaning Checklist Matrix
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Wondering what is covered in each clean? Explore our comprehensive checklist to pick the exact service tier your home needs.
          </p>
        </motion.div>

        {/* Room Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedRoom === room
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {room === 'all' ? 'All Areas' : room}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="overflow-x-auto rounded-3xl border border-slate-200 shadow-md"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="py-5 px-6 font-bold text-sm tracking-wide w-2/5">
                  Task & Scope
                </th>
                <th className="py-5 px-4 font-bold text-center w-1/5 bg-slate-800/80">
                  <div className="space-y-0.5">
                    <p className="text-sm font-extrabold text-white">Standard Clean</p>
                    <p className="text-[11px] text-sky-300 font-semibold">From $130</p>
                  </div>
                </th>
                <th className="py-5 px-4 font-bold text-center w-1/5 bg-sky-950">
                  <div className="space-y-0.5">
                    <span className="inline-block bg-sky-500 text-white text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full mb-0.5">
                      Recommended
                    </span>
                    <p className="text-sm font-extrabold text-white">Deep Clean</p>
                    <p className="text-[11px] text-sky-300 font-semibold">From $240</p>
                  </div>
                </th>
                <th className="py-5 px-4 font-bold text-center w-1/5 bg-slate-900">
                  <div className="space-y-0.5">
                    <span className="inline-block bg-amber-500 text-white text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full mb-0.5">
                      Bond Back
                    </span>
                    <p className="text-sm font-extrabold text-white">Vacate Clean</p>
                    <p className="text-[11px] text-amber-300 font-semibold">From $360</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <td className="py-3.5 px-6 font-medium text-slate-900">
                    <div>
                      <span>{item.task}</span>
                      {item.note && (
                        <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Standard */}
                  <td className="py-3.5 px-4 text-center">
                    {item.standard ? (
                      <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <FaCheck className="text-xs" />
                      </span>
                    ) : (
                      <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
                        <FaTimes className="text-xs" />
                      </span>
                    )}
                  </td>

                  {/* Deep */}
                  <td className="py-3.5 px-4 text-center bg-sky-50/40">
                    {item.deep ? (
                      <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <FaCheck className="text-xs" />
                      </span>
                    ) : (
                      <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
                        <FaTimes className="text-xs" />
                      </span>
                    )}
                  </td>

                  {/* Vacate */}
                  <td className="py-3.5 px-4 text-center bg-amber-50/30">
                    {item.vacate ? (
                      <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <FaCheck className="text-xs" />
                      </span>
                    ) : (
                      <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
                        <FaTimes className="text-xs" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footer CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-sky-400 text-2xl flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Need a specialized task not listed?</p>
              <p className="text-xs text-slate-300">Add custom extras like interior fridge, balcony wash, or steam cleaning during online checkout.</p>
            </div>
          </div>
          <Link
            href="/book"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold text-sm shadow-md whitespace-nowrap"
          >
            Start Customized Booking
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ChecklistComparison;
