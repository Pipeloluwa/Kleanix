"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LogoComponent from '@/app/components/shared-components/LogoComponent';
import { FaLock, FaEnvelope, FaKey, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { INITIAL_STAFF_ACCOUNTS } from '@/app/services/mockApiService';
import { StaffAccount } from '@/app/state_management/types';

export default function AdminLoginPage() {
  const router = useRouter();

  // Mode: 'login' | 'forgot' | 'reset'
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Quick preset account selector for demonstration / testing
  const handleQuickSelect = (accEmail: string, defaultPass: string) => {
    setEmail(accEmail);
    setPassword(defaultPass);
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Look up staff account
    const found = INITIAL_STAFF_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      setError('Staff account not found. Please verify your email.');
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    // Persist authenticated session to sessionStorage
    sessionStorage.setItem('kleanix_auth_user', JSON.stringify(found));
    router.push('/admin/portal');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setError('Please enter your staff email.');
      return;
    }
    setError(null);
    setResetSent(true);
    setSuccess(`A password reset link and temporary security code have been sent to ${resetEmail}.`);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setSuccess('Password updated successfully! You can now log in.');
    setMode('login');
    setPassword(newPassword);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 text-slate-100">
      
      {/* Return to public site link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs text-slate-400">
        <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <FaArrowLeft className="text-[10px]" />
          <span>Back to public website</span>
        </Link>
        <span className="font-mono text-slate-500">Kleanix Internal Auth</span>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-xl mb-3">
            <FaLock />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Staff & Admin Access</h1>
          <p className="text-xs text-slate-400 mt-1">
            Restricted portal for Admins, Super Admins & Cleaners
          </p>
        </div>

        {/* Error / Success Notices */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <FaExclamationCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <FaCheckCircle className="flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* ---------------- LOGIN FORM ---------------- */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Staff Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-3 text-slate-500 text-xs" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kleanix.com.au"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccess(null);
                    setMode('forgot');
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FaKey className="absolute left-3.5 top-3 text-slate-500 text-xs" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Portal</span>
            </button>
          </form>
        )}

        {/* ---------------- FORGOT PASSWORD FORM ---------------- */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your registered staff email and we will generate a secure reset link.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Staff Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-3 text-slate-500 text-xs" />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your.email@kleanix.com.au"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
              >
                Send Reset Link
              </button>
            </div>

            {resetSent && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setMode('reset')}
                  className="w-full text-center text-xs text-sky-400 hover:underline"
                >
                  Have a reset code? Set new password &rarr;
                </button>
              </div>
            )}
          </form>
        )}

        {/* ---------------- RESET PASSWORD FORM ---------------- */}
        {mode === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-xs text-slate-300">
              Create a new secure password for your staff account.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
            >
              Update Password
            </button>
          </form>
        )}

        {/* Quick Demo Logins Helper */}
        <div className="mt-6 pt-5 border-t border-slate-700/80">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Demo Credentials (Quick Fill)
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickSelect('superadmin@kleanix.com.au', 'supersecret123')}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-amber-400 font-bold border border-slate-700 truncate"
              title="Super Admin: Full controls, permissions, accounts"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('admin@kleanix.com.au', 'adminpass123')}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-indigo-400 font-bold border border-slate-700 truncate"
              title="Admin: Operations & dispatching"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('cleaner.elena@kleanix.com.au', 'cleanerpass123')}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-teal-400 font-bold border border-slate-700 truncate"
              title="Cleaner: Jobs schedule & progress"
            >
              Cleaner
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
