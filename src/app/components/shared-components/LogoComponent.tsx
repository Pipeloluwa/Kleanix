"use client";
import React from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';

interface LogoProps {
  lightMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LogoComponent: React.FC<LogoProps> = ({ lightMode = false, size = 'md' }) => {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 select-none focus:outline-none">
      <div className="relative flex items-center justify-center">
        {/* Sparkle icon badge */}
        <div className={`
          flex items-center justify-center rounded-xl transition-all duration-300
          ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}
          bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white shadow-md shadow-sky-500/25 group-hover:scale-105 group-hover:shadow-sky-500/40
        `}>
          <HiSparkles className={`${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'} animate-pulse`} />
        </div>
        {/* Decorative corner dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 ring-2 ring-white" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`
            font-black tracking-tight leading-none
            ${size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl'}
            ${lightMode ? 'text-white' : 'text-slate-900 group-hover:text-sky-600'}
            transition-colors
          `}>
            KLEAN<span className="text-sky-500">IX</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 ml-1">
            WA
          </span>
        </div>
        <span className={`text-[10px] font-semibold tracking-wider uppercase ${lightMode ? 'text-sky-200' : 'text-slate-500'}`}>
          Home & Office Cleaning
        </span>
      </div>
    </Link>
  );
};

export default LogoComponent;