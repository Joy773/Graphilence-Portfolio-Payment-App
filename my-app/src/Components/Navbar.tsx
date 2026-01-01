"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const text = "Graphilence";
  const letters = text.split("");

  const container = {
    rest: {
      transition: {
        staggerChildren: 0.02,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    rest: {
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 400,
      },
    },
    hover: {
      y: -10,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 400,
      },
    },
  };

  return (
    <div className="pt-8 hidden md:block">
      <div className="flex justify-between items-center w-full">
        <div>
          {/* Mobile Heading */}
          <h1 className="text-3xl font-bold tracking-wide cursor-pointer text-midnight-monarch md:hidden">
            Graphilence
          </h1>
          {/* Desktop Animated Heading */}
          <motion.h1
            className="hidden md:block text-5xl font-bold cursor-pointer text-midnight-monarch"
            variants={container}
            initial="rest"
            whileHover="hover"
          >
            {letters.map((letterChar, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{ display: "inline-block" }}
              >
                {letterChar === " " ? "\u00A0" : letterChar}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-8 font-semibold relative text-[18px]">
            {["Home", "Services", "Work", "Pricing", "About", "Blog"].map((item, index) => (
              <li key={index} className="relative">
                <Link href="/">
                  <motion.div
                    className="text-midnight-monarch cursor-pointer relative inline-block"
                    initial="rest"
                    whileHover="hover"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 h-0.5 origin-left"
                      style={{ 
                        backgroundColor: '#1A1436',
                        left: '-4px',
                        right: '-4px',
                      }}
                      variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 },
                      }}
                      transition={{
                        type: "spring" as const,
                        damping: 20,
                        stiffness: 300,
                      }}
                    />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <motion.button
            className="text-white border border-midnight-monarch rounded-full px-4 py-2 cursor-pointer font-semibold bg-midnight-monarch relative overflow-hidden hover:bg-purplish-blue hover:border-purplish-blue transition-all"
            initial="rest"
            whileHover="hover"
            variants={{
              rest: {},
              hover: {},
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{
                  type: "spring" as const,
                  damping: 20,
                  stiffness: 300,
                }}
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
            <motion.div
              className="absolute bottom-0 h-0.5 origin-left"
              style={{ 
                backgroundColor: '#1A1436',
                left: '-4px',
                right: '-4px',
              }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{
                type: "spring" as const,
                damping: 20,
                stiffness: 300,
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white cursor-pointer rounded-full px-4 py-2 flex items-center gap-2 font-semibold whitespace-nowrap"
            style={{ backgroundColor: '#6940F2' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden mt-6 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="flex flex-col gap-4 font-semibold">
            {["Home", "Services", "Work", "Pricing", "About", "Blog"].map((item, index) => (
              <li key={index} className="relative">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    className="text-midnight-monarch cursor-pointer relative inline-block text-lg"
                    initial="rest"
                    whileHover="hover"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 h-0.5 origin-left"
                      style={{ 
                        backgroundColor: '#1A1436',
                        left: '-4px',
                        right: '-4px',
                      }}
                      variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 },
                      }}
                      transition={{
                        type: "spring" as const,
                        damping: 20,
                        stiffness: 300,
                      }}
                    />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
          <motion.button
            className="mt-6 text-white border border-midnight-monarch rounded-full px-4 py-2 cursor-pointer font-semibold bg-midnight-monarch relative overflow-hidden hover:bg-purplish-blue hover:border-purplish-blue transition-all w-full"
            initial="rest"
            whileHover="hover"
            variants={{
              rest: {},
              hover: {},
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Contact Us
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{
                  type: "spring" as const,
                  damping: 20,
                  stiffness: 300,
                }}
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
            <motion.div
              className="absolute bottom-0 h-0.5 origin-left"
              style={{ 
                backgroundColor: '#1A1436',
                left: '-4px',
                right: '-4px',
              }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{
                type: "spring" as const,
                damping: 20,
                stiffness: 300,
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
