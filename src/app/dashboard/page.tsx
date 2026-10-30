"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaUser,
  FaHardHat,
  FaUserShield,
  FaCrown,
  FaCalendarCheck,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCheckCircle,
  FaSearch,
  FaFilter,
  FaPlus,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaShieldAlt,
  FaBolt,
  FaSlidersH
} from 'react-icons/fa';
import {
  UserRole,
  DashboardUser,
  DashboardBooking
} from '@/app/state_management/types';
import {
  INITIAL_DASHBOARD_USERS,
  INITIAL_DASHBOARD_BOOKINGS,
  DUMMY_SERVICES
} from '@/app/services/mockApiService';

export default function DashboardPage() {
  // Current active role perspective
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  
  // Local state for dashboard interactive testing
  const [bookings, setBookings] = useState<DashboardBooking[]>(INITIAL_DASHBOARD_BOOKINGS);
  const [users, setUsers] = useState<DashboardUser[]>(INITIAL_DASHBOARD_USERS);
  const [selectedBooking, setSelectedBooking] = useState<DashboardBooking | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Platform configuration state (Super Admin)
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [requirePoliceCheck, setRequirePoliceCheck] = useState(true);
  const [instantPayouts, setInstantPayouts] = useState(true);

  // Switch status handler
  const handleUpdateStatus = (bookingId: string, newStatus: DashboardBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  // Assign cleaner handler
  const handleAssignCleaner = (bookingId: string, cleanerName: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, cleanerAssigned: cleanerName } : b));
  };

  // Filtered bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.suburb.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header & Role Switcher Switchboard */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full">
                Kleanix Platform Workspaces
              </span>
              <span className="text-xs text-slate-400 font-mono">v2.0 Clean</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              User Journey Dashboards
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Switch role view to experience each stakeholder journey: Customer, Cleaner, Admin, or Super Admin.
            </p>
          </div>

          {/* Interactive Role Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveRole('customer')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 md:flex-initial justify-center ${
                activeRole === 'customer'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaUser className="text-xs" />
              <span>Customer</span>
            </button>

            <button
              onClick={() => setActiveRole('cleaner')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 md:flex-initial justify-center ${
                activeRole === 'cleaner'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaHardHat className="text-xs" />
              <span>Cleaner</span>
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 md:flex-initial justify-center ${
                activeRole === 'admin'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaUserShield className="text-xs" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => setActiveRole('superadmin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 md:flex-initial justify-center ${
                activeRole === 'superadmin'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaCrown className="text-xs text-amber-500" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* VIEW 1: CUSTOMER JOURNEY DASHBOARD                                       */}
        {/* ------------------------------------------------------------------------- */}
        {activeRole === 'customer' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Customer Welcome Bar */}
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-sky-100 uppercase tracking-wider">Welcome back</p>
                <h2 className="text-2xl font-black">Sarah Jenkins</h2>
                <p className="text-xs text-sky-100 mt-1">14 Labouchere Rd, South Perth &bull; Member since 2024</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/book"
                  className="px-5 py-2.5 rounded-xl bg-white text-sky-700 font-bold text-xs shadow-sm hover:bg-sky-50 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Book New Clean</span>
                </Link>
                <a
                  href="tel:1300346034"
                  className="px-4 py-2.5 rounded-xl bg-sky-700/60 hover:bg-sky-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <FaPhoneAlt className="text-[10px]" />
                  <span>Support</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Clean</p>
                <p className="text-xl font-black text-slate-900 mt-1">Tomorrow, 9:00 AM</p>
                <p className="text-xs text-sky-600 font-medium mt-0.5">Assigned to Elena Rostova</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Plan</p>
                <p className="text-xl font-black text-slate-900 mt-1">Fortnightly Regular</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">10% Off Applied Every Clean</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guarantee Status</p>
                <p className="text-xl font-black text-slate-900 mt-1">100% Protected</p>
                <p className="text-xs text-slate-500 mt-0.5">Free re-clean within 24h of any clean</p>
              </div>
            </div>

            {/* Customer Bookings List */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-lg font-bold text-slate-900">Your Cleans & Schedule</h3>
                <span className="text-xs text-slate-500 font-medium">Manage or reschedule anytime</span>
              </div>

              <div className="space-y-3">
                {bookings.filter(b => b.customerName.includes('Sarah') || b.id === 'bkg-101').map(b => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-sky-300 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                          {b.reference}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          b.status === 'upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{b.serviceTitle}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><FaCalendarCheck className="text-sky-500" /> {b.date}</span>
                        <span className="flex items-center gap-1"><FaClock className="text-slate-400" /> {b.timeSlot}</span>
                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-slate-400" /> {b.address}, {b.suburb}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="text-base font-black text-slate-900">${b.price}</p>
                        <p className="text-[11px] text-slate-400">Cleaner: {b.cleanerAssigned || 'Assigning...'}</p>
                      </div>
                      <button
                        onClick={() => alert(`Rescheduling request for ${b.reference} logged. Our Perth dispatcher will contact you.`)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 transition-colors"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* VIEW 2: CLEANER JOURNEY DASHBOARD                                         */}
        {/* ------------------------------------------------------------------------- */}
        {activeRole === 'cleaner' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Cleaner Header */}
            <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase">
                    Verified Professional
                  </span>
                  <span className="text-xs text-emerald-100">Police Check &bull; Active</span>
                </div>
                <h2 className="text-2xl font-black mt-1">Elena Rostova</h2>
                <p className="text-xs text-emerald-100">Assigned Territory: South Perth & Central CBD</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right px-4 py-2 rounded-2xl bg-teal-800/60 border border-teal-600/40">
                  <p className="text-[10px] uppercase font-bold text-teal-200">Weekly Payout</p>
                  <p className="text-xl font-black text-white">$680.00</p>
                </div>
              </div>
            </div>

            {/* Cleaner Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Jobs</p>
                <p className="text-2xl font-black text-slate-900 mt-1">2 Scheduled</p>
                <p className="text-xs text-teal-600 font-medium mt-0.5">Next arrival: 09:00 AM</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jobs Completed</p>
                <p className="text-2xl font-black text-slate-900 mt-1">48 Total</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">100% on-time arrival rate</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Supplies Restock</p>
                <p className="text-2xl font-black text-slate-900 mt-1">Good Status</p>
                <p className="text-xs text-slate-500 mt-0.5">HEPA filters & eco-detergents full</p>
              </div>
            </div>

            {/* Assigned Jobs Dispatch Feed */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Assigned Cleans & Schedule</h3>
                  <p className="text-xs text-slate-500">Tap status to mark arrival or completed</p>
                </div>
              </div>

              <div className="space-y-3">
                {bookings.filter(b => b.cleanerAssigned === 'Elena Rostova').map(b => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                          {b.reference}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          b.status === 'upcoming' ? 'bg-amber-100 text-amber-800' :
                          b.status === 'in_progress' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{b.serviceTitle}</h4>
                      <div className="text-xs text-slate-600 space-y-1">
                        <p className="flex items-center gap-2 font-medium">
                          <FaMapMarkerAlt className="text-teal-600 text-xs" />
                          <span>{b.address}, {b.suburb} WA</span>
                        </p>
                        <p className="flex items-center gap-4 text-slate-500">
                          <span>Client: {b.customerName} ({b.customerPhone})</span>
                          <span>Slot: {b.timeSlot}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                      {b.status === 'upcoming' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'in_progress')}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
                        >
                          Mark Arrived / In Progress
                        </button>
                      )}
                      {b.status === 'in_progress' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'completed')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                        >
                          Mark Clean Completed
                        </button>
                      )}
                      {b.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <FaCheckCircle /> Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* VIEW 3: ADMIN JOURNEY DASHBOARD                                           */}
        {/* ------------------------------------------------------------------------- */}
        {activeRole === 'admin' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Admin Overview Header */}
            <div className="bg-gradient-to-r from-indigo-700 to-slate-800 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Operations & Dispatch Portal</p>
                <h2 className="text-2xl font-black">Admin Operations Control</h2>
                <p className="text-xs text-indigo-100">Live booking intake, dispatch management, cleaner assignments</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30">
                  Perth Dispatch Online
                </span>
              </div>
            </div>

            {/* Admin Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{bookings.length}</p>
                <p className="text-[11px] text-indigo-600 mt-0.5">Across 4 zones</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Cleaners</p>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {users.filter(u => u.role === 'cleaner').length}
                </p>
                <p className="text-[11px] text-emerald-600 mt-0.5">100% Police Verified</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Dispatch</p>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {bookings.filter(b => !b.cleanerAssigned).length}
                </p>
                <p className="text-[11px] text-amber-600 mt-0.5">Awaiting cleaner allocation</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Revenue</p>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  ${bookings.reduce((acc, b) => acc + b.price, 0)}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">GST Included</p>
              </div>
            </div>

            {/* Operations Management Table */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Bookings Dispatch Queue</h3>
                
                {/* Search & Filter */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-56">
                    <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search ref or client..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 px-3">Ref</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Service</th>
                      <th className="py-2.5 px-3">Date & Time</th>
                      <th className="py-2.5 px-3">Suburb</th>
                      <th className="py-2.5 px-3">Cleaner</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-indigo-700">{b.reference}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">{b.customerName}</td>
                        <td className="py-3 px-3">{b.serviceTitle}</td>
                        <td className="py-3 px-3 text-slate-500">{b.date} &bull; {b.timeSlot}</td>
                        <td className="py-3 px-3">{b.suburb}</td>
                        <td className="py-3 px-3">
                          <select
                            value={b.cleanerAssigned || ''}
                            onChange={(e) => handleAssignCleaner(b.id, e.target.value)}
                            className="text-xs rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium"
                          >
                            <option value="">Unassigned</option>
                            <option value="Elena Rostova">Elena Rostova</option>
                            <option value="Marcus Cole">Marcus Cole</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">${b.price}</td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            b.status === 'upcoming' ? 'bg-amber-100 text-amber-800' :
                            b.status === 'in_progress' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* VIEW 4: SUPER ADMIN JOURNEY DASHBOARD                                     */}
        {/* ------------------------------------------------------------------------- */}
        {activeRole === 'superadmin' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Super Admin Top Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 shadow-lg border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <FaCrown className="text-amber-400 text-sm" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-600/40">
                    Full Platform Access & Control
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Super Admin Console
                </h2>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Platform governance, user credentials, service rules, financial health, system switches
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                  Global System Healthy
                </span>
              </div>
            </div>

            {/* High-Level Platform KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase">Gross Platform Volume</p>
                  <FaDollarSign className="text-amber-500 text-xs" />
                </div>
                <p className="text-2xl font-black text-slate-900 mt-2">$24,850</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">+18% this month</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase">Registered Users</p>
                  <FaUsers className="text-sky-500 text-xs" />
                </div>
                <p className="text-2xl font-black text-slate-900 mt-2">{users.length} Active</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Customers, Cleaners & Admins</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase">Active Services</p>
                  <FaClipboardList className="text-indigo-500 text-xs" />
                </div>
                <p className="text-2xl font-black text-slate-900 mt-2">{DUMMY_SERVICES.length} Core</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Standard, Deep, Vacate, Office</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase">Compliance Score</p>
                  <FaShieldAlt className="text-emerald-500 text-xs" />
                </div>
                <p className="text-2xl font-black text-slate-900 mt-2">100%</p>
                <p className="text-[11px] text-emerald-600 mt-0.5">Police checks & insurance valid</p>
              </div>
            </div>

            {/* Platform Master Controls & User Roles Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* System Governance & Switches */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FaSlidersH className="text-amber-500 text-sm" />
                  <h3 className="font-bold text-slate-900 text-base">Platform Switches</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-900">Automated Dispatch Engine</p>
                      <p className="text-slate-500">Auto-match nearest verified cleaner</p>
                    </div>
                    <button
                      onClick={() => setAutoDispatch(!autoDispatch)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        autoDispatch ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        autoDispatch ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-900">Enforce Police Background Check</p>
                      <p className="text-slate-500">Block unverified cleaner allocation</p>
                    </div>
                    <button
                      onClick={() => setRequirePoliceCheck(!requirePoliceCheck)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        requirePoliceCheck ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        requirePoliceCheck ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="font-bold text-slate-900">Instant Cleaner Payouts</p>
                      <p className="text-slate-500">Trigger payout on clean completion</p>
                    </div>
                    <button
                      onClick={() => setInstantPayouts(!instantPayouts)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        instantPayouts ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        instantPayouts ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* User Roles & Permissions Directory */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-amber-500 text-sm" />
                    <h3 className="font-bold text-slate-900 text-base">User Directory & Roles</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">RBAC Security Active</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Suburb</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-900">{u.name}</td>
                          <td className="py-3 px-3 text-slate-500">{u.email}</td>
                          <td className="py-3 px-3">{u.phone}</td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              u.role === 'superadmin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' :
                              u.role === 'cleaner' ? 'bg-teal-100 text-teal-800' : 'bg-sky-100 text-sky-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500">{u.suburb || 'Perth'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
