"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LandingPage() {
  const container = [
    "future unicorns",
    "startups"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % container.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [container.length]);

  return (
    <div className="mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
        {/* Left Section */}
        <div className="w-full lg:w-[700px]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full" style={{ boxShadow: '0 0 8px 2px rgba(34, 197, 94, 0.6)' }}></div>
            <p className="text-xs text-gray-500">Available for New Projects</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-none mb-8 lg:mb-0">
            Global UX design agency digital partner for{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purplish-blue inline leading-none"
                style={{ display: 'inline' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {container[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>
          
          {/* Buttons Section */}
          <div className="flex flex-row gap-4 mt-8">
            {/* Book a call button */}
            <button className="bg-purplish-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors">
              Book a call
            </button>
            
            {/* View work button - Hidden on mobile */}
            <button className="hidden lg:flex bg-white text-midnight-monarch border border-gray-300 px-6 py-3 rounded-full font-semibold hover:border-purplish-blue transition-colors items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="4" width="8" height="8" rx="1" fill="#FF7262"/>
                <rect x="8" y="12" width="8" height="8" rx="1" fill="#F24E1E"/>
                <circle cx="6" cy="6" r="2" fill="#A259FF"/>
                <circle cx="6" cy="18" r="2" fill="#1ABCFE"/>
              </svg>
              <span>View work</span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[400px] lg:ml-auto flex flex-col items-start">
          <p className="text-midnight-monarch mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed w-full">
            Wavespace is a global UX agency that helps brands scale with fast, high performance digital experiences.
          </p>
          
          {/* Social Proof Section */}
          <div className="hidden lg:flex flex-row gap-4 lg:gap-6 items-center justify-start flex-wrap lg:flex-nowrap w-full">
            {/* Left: Profile Pictures + Text */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-500 border-2 border-white"></div>
              </div>
              <p className="text-xs lg:text-sm text-midnight-monarch font-medium">Loved by 500+ Founders</p>
            </div>

            {/* Right: Logo + Stars + Reviews */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="w-7 h-7 lg:w-8 lg:h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs lg:text-sm">C</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="#EF4444" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs text-midnight-monarch font-medium ml-8 lg:ml-10">13 REVIEWS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
