"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaCrown,
  FaUserShield,
  FaHardHat,
  FaSignOutAlt,
  FaKey,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSlidersH,
  FaUsers,
  FaClipboardList
} from 'react-icons/fa';
import { StaffAccount, DashboardBooking, StaffRole } from '@/app/state_management/types';
import { INITIAL_STAFF_ACCOUNTS, INITIAL_PORTAL_BOOKINGS } from '@/app/services/mockApiService';

export default function AdminPortalPage() {
  const router = useRouter();

  // Active Authenticated User
  const [currentUser, setCurrentUser] = useState<StaffAccount | null>(null);
  const [loading, setLoading] = useState(true);

  // Data State
  const [staffList, setStaffList] = useState<StaffAccount[]>(INITIAL_STAFF_ACCOUNTS);
  const [bookings, setBookings] = useState<DashboardBooking[]>(INITIAL_PORTAL_BOOKINGS);

  // Modals & Panels State
  const [activeTab, setActiveTab] = useState<'bookings' | 'staff' | 'settings'>('bookings');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffAccount | null>(null);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  // Staff Creation / Edit Form State
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'cleaner' as StaffRole,
    suburbAssigned: '',
    policeCheckVerified: true,
    trainingVerified: true
  });
  const [profileNotice, setProfileNotice] = useState<string | null>(null);

  // Bookings Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  // Verify authentication on mount
  useEffect(() => {
    const raw = sessionStorage.getItem('kleanix_auth_user');
    if (!raw) {
      // Not logged in -> redirect to login
      router.push('/admin/login');
      return;
    }
    try {
      const parsed: StaffAccount = JSON.parse(raw);
      setCurrentUser(parsed);
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('kleanix_auth_user');
    router.push('/admin/login');
  };

  // Password Update
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordNotice('New password must be at least 6 characters.');
      return;
    }
    setPasswordNotice('Password updated successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordNotice(null);
      setCurrentPassword('');
      setNewPassword('');
    }, 1200);
  };

  // Save / Update Staff Profile
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.email) {
      setProfileNotice('Name and email are required.');
      return;
    }

    if (editingStaff) {
      // Edit existing
      setStaffList(prev =>
        prev.map(s => s.id === editingStaff.id ? { ...s, ...staffForm } : s)
      );
    } else {
      // Create new staff
      const newStaff: StaffAccount = {
        id: 'stf-' + Date.now(),
        ...staffForm,
        status: 'active',
        joinedDate: 'Oct 2026',
        jobsCompleted: 0
      };
      setStaffList(prev => [newStaff, ...prev]);
    }

    setProfileNotice('Staff profile saved!');
    setTimeout(() => {
      setShowProfileModal(false);
      setEditingStaff(null);
      setProfileNotice(null);
      setStaffForm({
        name: '',
        email: '',
        phone: '',
        role: 'cleaner',
        suburbAssigned: '',
        policeCheckVerified: true,
        trainingVerified: true
      });
    }, 800);
  };

  const openEditModal = (staff: StaffAccount) => {
    setEditingStaff(staff);
    setStaffForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      suburbAssigned: staff.suburbAssigned || '',
      policeCheckVerified: staff.policeCheckVerified,
      trainingVerified: staff.trainingVerified
    });
    setShowProfileModal(true);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('Are you sure you want to remove this staff profile?')) {
      setStaffList(prev => prev.filter(s => s.id !== staffId));
    }
  };

  const handleAssignCleaner = (bookingId: string, cleanerName: string) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, cleanerAssigned: cleanerName } : b)
    );
  };

  const handleUpdateStatus = (bookingId: string, newStatus: DashboardBooking['status']) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 text-sm">
        Authenticating staff credentials...
      </div>
    );
  }

  const isSuperAdmin = currentUser.role === 'superadmin';
  const isAdmin = currentUser.role === 'admin' || isSuperAdmin;
  const isCleaner = currentUser.role === 'cleaner';

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (isCleaner && b.cleanerAssigned !== currentUser.name) return false;
    const matchesFilter = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.suburb.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-lg tracking-tight text-white hover:text-sky-400 transition-colors">
            Kleanix<span className="text-sky-400">.</span>
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            INTERNAL OPS
          </span>
        </div>

        {/* Authenticated User Status & Quick Actions */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-slate-700 text-right">
            <div>
              <p className="font-bold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 capitalize">{currentUser.role}</p>
            </div>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
              isSuperAdmin ? 'bg-amber-500/20 text-amber-400' :
              isAdmin ? 'bg-indigo-500/20 text-indigo-400' : 'bg-teal-500/20 text-teal-400'
            }`}>
              {isSuperAdmin ? <FaCrown /> : isAdmin ? <FaUserShield /> : <FaHardHat />}
            </div>
          </div>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <FaKey className="text-[10px]" />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="text-[10px]" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FaClipboardList />
                <span>{isCleaner ? 'My Clean Schedule' : 'Bookings & Dispatch'}</span>
              </span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('staff')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'staff'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FaUsers />
                  <span>Staff Profiles ({staffList.length})</span>
                </span>
              </button>
            )}

            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FaSlidersH />
                  <span>Platform Governance</span>
                </span>
              </button>
            )}
          </div>

          {activeTab === 'staff' && isAdmin && (
            <button
              onClick={() => {
                setEditingStaff(null);
                setStaffForm({
                  name: '',
                  email: '',
                  phone: '',
                  role: 'cleaner',
                  suburbAssigned: '',
                  policeCheckVerified: true,
                  trainingVerified: true
                });
                setShowProfileModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <FaUserPlus />
              <span>Add Staff Profile</span>
            </button>
          )}
        </div>

        {/* ---------------- TAB 1: BOOKINGS & DISPATCH ---------------- */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
            
            {/* Header + Search/Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isCleaner ? 'My Assigned Cleans' : 'Live Booking Queue'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isCleaner ? 'Check details and mark status upon arrival or finish' : 'Assign vetted cleaners and manage booking status'}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <FaSearch className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search ref or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-500"
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
                    <th className="py-2.5 px-3">Address</th>
                    <th className="py-2.5 px-3">Cleaner</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-sky-700">{b.reference}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{b.customerName}</td>
                      <td className="py-3 px-3">{b.serviceTitle}</td>
                      <td className="py-3 px-3 text-slate-500">{b.date} &bull; {b.timeSlot}</td>
                      <td className="py-3 px-3">{b.address}, {b.suburb}</td>
                      <td className="py-3 px-3">
                        {isAdmin ? (
                          <select
                            value={b.cleanerAssigned || ''}
                            onChange={(e) => handleAssignCleaner(b.id, e.target.value)}
                            className="text-xs rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium"
                          >
                            <option value="">Unassigned</option>
                            {staffList.filter(s => s.role === 'cleaner').map(c => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="font-medium text-slate-700">{b.cleanerAssigned || 'Unassigned'}</span>
                        )}
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
                      <td className="py-3 px-3">
                        {b.status === 'upcoming' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'in_progress')}
                            className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px]"
                          >
                            Start
                          </button>
                        )}
                        {b.status === 'in_progress' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                          >
                            Complete
                          </button>
                        )}
                        {b.status === 'completed' && (
                          <span className="text-emerald-600 font-bold text-[11px]">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ---------------- TAB 2: STAFF & CLEANER PROFILES ---------------- */}
        {activeTab === 'staff' && isAdmin && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Staff & Cleaner Management</h2>
                <p className="text-xs text-slate-500">Manage cleaners, operations admins, and account permissions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between hover:border-slate-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        staff.role === 'superadmin' ? 'bg-amber-100 text-amber-900' :
                        staff.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {staff.role}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">{staff.name}</h3>
                    <p className="text-xs text-slate-500">{staff.email}</p>
                    <p className="text-xs text-slate-500">{staff.phone}</p>

                    {staff.suburbAssigned && (
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">Territory:</span> {staff.suburbAssigned}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <FaCheckCircle className="text-emerald-500 text-[10px]" /> Police Verified
                      </span>
                      {staff.jobsCompleted !== undefined && (
                        <span>&bull; {staff.jobsCompleted} jobs</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(staff)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-white text-slate-700 flex items-center gap-1"
                    >
                      <FaEdit className="text-[10px]" />
                      <span>Edit</span>
                    </button>
                    {isSuperAdmin && staff.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 flex items-center gap-1"
                      >
                        <FaTrash className="text-[10px]" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: PLATFORM GOVERNANCE (SUPER ADMIN ONLY) ---------------- */}
        {activeTab === 'settings' && isSuperAdmin && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-slate-900">Super Admin Platform Governance</h2>
              <p className="text-xs text-slate-500">Global operating rules and policy enforcement</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Auto-Dispatch Cleaners</p>
                <p className="text-slate-500">Match nearest verified cleaner upon booking submission</p>
                <span className="inline-block mt-2 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Enabled</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Police Check Requirement</p>
                <p className="text-slate-500">Block unvetted cleaners from job dispatching</p>
                <span className="inline-block mt-2 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Strict (100% Enforced)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Bond Guarantee Policy</p>
                <p className="text-slate-500">Standard 72-hour re-clean window for vacate cleans</p>
                <span className="inline-block mt-2 font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= MODAL 1: CHANGE PASSWORD ================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">Change Account Password</h3>
            <p className="text-xs text-slate-500 mb-4">Update your staff login credentials</p>

            {passwordNotice && (
              <div className="mb-3 p-2.5 rounded-lg bg-sky-50 text-sky-800 text-xs font-medium">
                {passwordNotice}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: CREATE / EDIT STAFF PROFILE ================= */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              {editingStaff ? 'Edit Staff Profile' : 'Create Staff Profile'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Set role permissions and territory allocation</p>

            {profileNotice && (
              <div className="mb-3 p-2.5 rounded-lg bg-sky-50 text-sky-800 text-xs font-medium">
                {profileNotice}
              </div>
            )}

            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    placeholder="alex@kleanix.com.au"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    placeholder="0400 123 456"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Permission</label>
                  <select
                    value={staffForm.role}
                    onChange={(e: any) => setStaffForm({ ...staffForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="cleaner">Cleaner</option>
                    <option value="admin">Operations Admin</option>
                    {isSuperAdmin && <option value="superadmin">Super Admin</option>}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Suburb / Area</label>
                  <input
                    type="text"
                    value={staffForm.suburbAssigned}
                    onChange={(e) => setStaffForm({ ...staffForm, suburbAssigned: e.target.value })}
                    placeholder="e.g. South Perth"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
