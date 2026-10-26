"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { fadeInUp, scaleIn } from '@/app/animation/animationVariants';

interface TransformationItem {
  id: string;
  title: string;
  area: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  details: string;
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'oven',
    title: 'Baked-On Carbon & Grease Removal',
    area: 'Kitchen Oven Restoration',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80',
    afterImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=700&q=80',
    duration: '1 hr 15 mins',
    details: 'Non-toxic, fume-free paste applied to inner chamber, racks soaked in heated decarboniser tank, glass disassembled and cleaned streak-free.'
  },
  {
    id: 'shower',
    title: 'Limescale & Mineral Soap Scum Descaling',
    area: 'Master Bathroom Shower Screen',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=700&q=80',
    duration: '45 mins',
    details: 'Heavy mineral deposit dissolution using acid-balanced citrus descaler, followed by nano-buffing to restore clear visibility to glass screens.'
  },
  {
    id: 'carpet',
    title: 'High-Traffic Soil & Spot Stain Lift',
    area: 'Lounge Carpet Steam Clean',
    beforeImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=700&q=80',
    duration: '1 hr 30 mins',
    details: 'Industrial heated water soil extraction with anti-microbial deodorizer, killing 99.9% of dust mites and reviving crushed fibers.'
  }
];

export const BeforeAfterShowcase = () => {
  const [activeItem, setActiveItem] = useState<TransformationItem>(TRANSFORMATIONS[0]);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Real Perth Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            See The Kleanix Difference
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Drag the comparison slider to reveal how our hospital-grade cleaning treatments restore neglected appliances, bathrooms, and carpets.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {TRANSFORMATIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                setSliderPos(50);
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeItem.id === item.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.area}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Widget */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-slate-700 p-3 sm:p-8 shadow-2xl"
        >
          
          <div ref={containerRef} className="relative h-[270px] sm:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden select-none">
            
            {/* After Image (Full background) */}
            <img
              src={activeItem.afterImg}
              alt="After Cleaning"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-md">
              After: Spotless Clean
            </span>

            {/* Before Image (Clipped on top by sliderPos %) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activeItem.beforeImg}
                alt="Before Cleaning"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Before: Built-up Grime
              </span>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 cursor-ew-resize flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center text-xs font-extrabold">
                &harr;
              </div>
            </div>

            {/* Invisible Range Slider Overlay for dragging */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Drag to compare before and after images"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          {/* Details below slider */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-base">{activeItem.title}</h4>
              <p className="text-slate-400 max-w-xl">{activeItem.details}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-slate-400">Treatment Time:</span>
              <p className="font-extrabold text-sky-400 text-sm">{activeItem.duration}</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default BeforeAfterShowcase;
