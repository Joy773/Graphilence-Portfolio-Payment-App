"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaDribbble, FaStar } from "react-icons/fa";
import { SiFiverr } from "react-icons/si";

export default function LandingPage() {
  const container = [
    "future unicorns",
    "startups"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewWorkHover, setViewWorkHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % container.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [container.length]);

  return (
    <div className="mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-center md:items-center lg:items-center gap-8 lg:gap-12">
        {/* Left Section */}
        <div className="w-full lg:w-[700px] flex flex-col items-center md:items-center lg:items-start">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-center lg:justify-start">
            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
              {/* Circular pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-500"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              {/* Solid green dot (circle) */}
              <motion.div
                className="relative w-2 h-2 rounded-full bg-green-500 aspect-square"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 8px rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <p className="text-xs text-gray-500">Available for New Projects</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-none mb-8 lg:mb-0 text-center md:text-center lg:text-left">
            Global Graphics Design Agency digital partner for{" "}
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
          <div className="flex flex-row gap-4 mt-8 justify-center md:justify-center lg:justify-start">
            {/* Book a call button */}
            <button className="bg-midnight-monarch hover:bg-purplish-blue text-white px-6 py-3 rounded-full font-semibold transition-colors cursor-pointer">
              Book a call
            </button>
            
            {/* View work button - Hidden on mobile */}
            <button
              className="hidden lg:flex bg-white text-midnight-monarch border-2 border-gray-200 px-6 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 items-center gap-2  hover:shadow-md"
              onMouseEnter={() => setViewWorkHover(true)}
              onMouseLeave={() => setViewWorkHover(false)}
            >
              <motion.span
                animate={{
                  scale: viewWorkHover ? 1.2 : 1,
                  rotate: viewWorkHover ? 15 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <FaDribbble className="w-4 h-4 text-[#EA4C89] shrink-0" />
              </motion.span>
              View Work
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[400px] lg:ml-auto flex flex-col items-center md:items-center lg:items-start">
          <p className="text-midnight-monarch mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed w-full text-center md:text-center lg:text-left">
            Graphilence is a global design agency that helps brands scale with fast, high performance digital experiences.
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

            {/* Right: Fiverr + Stars + Reviews */}
            <div className="flex items-start gap-1.5 lg:gap-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-[#1DBF73] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <SiFiverr className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-midnight-monarch font-semibold text-sm">4.8</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#E8B923] shrink-0" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-midnight-monarch font-medium">304 REVIEWS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
