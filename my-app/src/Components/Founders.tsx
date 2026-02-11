"use client";

import React, { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { founders } from "@/contexts/assets";

const Founders = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, founders.length - 3); // show 3 at a time on desktop

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleFounders = founders.slice(currentIndex, currentIndex + 3);

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      {/* Headline */}
      <RevealOnScroll>
        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-12 lg:mb-16'>
          <div className='w-full lg:max-w-5xl shrink-0'>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch leading-tight text-left">
              500+ Founders trusted us. Get return on your investment, multiplied!
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
            <button
              type="button"
              aria-label="Previous"
              onClick={goPrev}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-midnight-monarch text-midnight-monarch flex items-center justify-center hover:bg-midnight-monarch hover:text-white transition-colors cursor-pointer"
            >
              <FaChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={goNext}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-midnight-monarch text-midnight-monarch flex items-center justify-center hover:bg-midnight-monarch hover:text-white transition-colors cursor-pointer"
            >
              <FaChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* Founders Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {visibleFounders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* Founder Image - full width of card, left-aligned with text */}
              <div className="relative w-full mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={480}
                  height={640}
                  className="w-full h-full object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  unoptimized
                />
              </div>

              {/* Founder Info */}
              <div className="text-midnight-monarch">
                <p className="text-lg font-semibold mb-1">
                  / {founder.name}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {founder.title}
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  &ldquo;{founder.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Founders;