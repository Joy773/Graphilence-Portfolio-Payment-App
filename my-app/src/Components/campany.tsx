"use client";

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

interface CampanyProps {
  singleRow?: boolean;
}

const campany = ({ singleRow = false }: CampanyProps) => {
  // Company logos organized by rows - matching the design image
  const companies = [
    // Row 1: On Deck, Peel, Microsoft, The Motley Fool., daXtra, ARRIVE, river, grame/prameenphone
    [
      { name: "On Deck", logo: "/company-logos/on deck.avif" },
      { name: "Peel", logo: "/company-logos/peel.avif" },
      { name: "Microsoft", logo: "/company-logos/microsoft.avif" },
      { name: "The Motley Fool.", logo: "/company-logos/motley.avif" },
      { name: "ARRIVE", logo: "/company-logos/arrive.avif" },
    ],
    // Row 2: متا UMS, panther, DOCSHIPPER, On Deck, The Motley Fool., Microsoft, Packt>, CIS
    [
      { name: "متا UMS", logo: null },
      { name: "panther", logo: "/company-logos/panther.avif" },
      { name: "DOCSHIPPER", logo: "/company-logos/docshipper.avif" },
      { name: "On Deck", logo: "/company-logos/on deck.avif" },
      { name: "The Motley Fool.", logo: "/company-logos/motley.avif" },
      { name: "Microsoft", logo: "/company-logos/microsoft.avif" },
      { name: "Packt>", logo: "/company-logos/packt.avif" },
      { name: "CIS", logo: "/company-logos/cis.avif" },
    ],
    // Row 3: telo.ai, pathrise, RECHARGE W, telenor, PRIME>, CYBER AUTOMOTIVE SOLUTIONS, وزارة الحج والعمرة MINISTRY OF HAJJ AND UMRAH, رقمية Raqamyah
    [
      { name: "pathrise", logo: "/company-logos/pathrise.avif" },
      { name: "RECHARGE W", logo: "/company-logos/recharge.avif" },
      { name: "telenor", logo: "/company-logos/telenor.avif" },
      { name: "PRIME>", logo: "/company-logos/prime.avif" },
      { name: "CYBER AUTOMOTIVE SOLUTIONS", logo: "/company-logos/cas.avif" },
    ],
  ];

  // If singleRow is true, combine all companies into one array
  if (singleRow) {
    // Flatten all companies from all rows and filter out those without logos
    const allCompanies = companies.flat().filter(company => company.logo);
    const duplicatedRow = [...allCompanies, ...allCompanies, ...allCompanies];

    return (
      <div className="mt-20 lg:mt-32 mb-16">
        {/* Header */}
        <h2 className="text-center text-sm lg:text-base font-semibold text-midnight-monarch uppercase tracking-wide mb-8 lg:mb-12">
          TRUSTED BY 300+ GLOBAL BRANDS
        </h2>

        {/* Single Row - Continuous Scrolling from Left to Right */}
        <div className="overflow-hidden w-full" style={{ position: 'relative', height: '48px' }}>
          <motion.div
            className="flex items-center gap-4 lg:gap-6 xl:gap-8"
            style={{ 
              width: 'max-content',
              willChange: 'transform'
            }}
            animate={{
              x: ['0%', '-33.333%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedRow.map((company, companyIndex) => (
              <div
                key={companyIndex}
                className="flex items-center justify-center min-w-[80px] lg:min-w-[100px] h-10 lg:h-12 shrink-0"
              >
                <Image
                  src={company.logo!}
                  alt={company.name}
                  width={100}
                  height={40}
                  className="object-contain w-auto h-full max-w-[120px]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      {/* Header */}
      <h2 className="text-center text-sm lg:text-base font-semibold text-midnight-monarch uppercase tracking-wide mb-8 lg:mb-12">
        TRUSTED BY 300+ GLOBAL BRANDS
      </h2>

      {/* Logo Grid */}
      <div className="flex flex-col gap-8 lg:gap-12">
        {companies.map((row, rowIndex) => {
          // First row: continuous scrolling from left to right
          if (rowIndex === 0) {
            // Duplicate the row items multiple times for seamless infinite loop
            const duplicatedRow = [...row, ...row, ...row];
            
            return (
              <div key={rowIndex} className="overflow-hidden w-full" style={{ position: 'relative', height: '48px' }}>
                <motion.div
                  className="flex items-center gap-4 lg:gap-6 xl:gap-8"
                  style={{ 
                    width: 'max-content',
                    willChange: 'transform'
                  }}
                  animate={{
                    x: ['0%', '-33.333%'],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedRow.map((company, companyIndex) => (
                    <div
                      key={companyIndex}
                      className="flex items-center justify-center min-w-[80px] lg:min-w-[100px] h-10 lg:h-12 shrink-0"
                    >
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={100}
                          height={40}
                          className="object-contain w-auto h-full max-w-[120px]"
                        />
                      ) : (
                        <span className="text-xs lg:text-sm font-medium text-midnight-monarch whitespace-nowrap">
                          {company.name}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          }

          // Second row: continuous scrolling from right to left
          if (rowIndex === 1) {
            // Duplicate the row items multiple times for seamless infinite loop
            const duplicatedRow = [...row, ...row, ...row];
            
            return (
              <div key={rowIndex} className="overflow-hidden w-full" style={{ position: 'relative', height: '48px' }}>
                <motion.div
                  className="flex items-center gap-4 lg:gap-6 xl:gap-8"
                  style={{ 
                    width: 'max-content',
                    willChange: 'transform'
                  }}
                  animate={{
                    x: ['-33.333%', '0%'],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedRow.map((company, companyIndex) => (
                    <div
                      key={companyIndex}
                      className="flex items-center justify-center min-w-[80px] lg:min-w-[100px] h-10 lg:h-12 shrink-0"
                    >
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={100}
                          height={40}
                          className="object-contain w-auto h-full max-w-[120px]"
                        />
                      ) : (
                        <span className="text-xs lg:text-sm font-medium text-midnight-monarch whitespace-nowrap">
                          {company.name}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          }

          // Third row: continuous scrolling from left to right
          if (rowIndex === 2) {
            // Duplicate the row items multiple times for seamless infinite loop
            const duplicatedRow = [...row, ...row, ...row];
            
            return (
              <div key={rowIndex} className="overflow-hidden w-full" style={{ position: 'relative', height: '48px' }}>
                <motion.div
                  className="flex items-center gap-4 lg:gap-6 xl:gap-8"
                  style={{ 
                    width: 'max-content',
                    willChange: 'transform'
                  }}
                  animate={{
                    x: ['0%', '-33.333%'],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedRow.map((company, companyIndex) => (
                    <div
                      key={companyIndex}
                      className="flex items-center justify-center min-w-[80px] lg:min-w-[100px] h-10 lg:h-12 shrink-0"
                    >
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={100}
                          height={40}
                          className="object-contain w-auto h-full max-w-[120px]"
                        />
                      ) : (
                        <span className="text-xs lg:text-sm font-medium text-midnight-monarch whitespace-nowrap">
                          {company.name}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          }

          // Other rows: existing slide animations (row 4 and beyond)
          const isEvenRow = rowIndex % 2 === 0;
          const initialX = isEvenRow ? -100 : 100;
          const exitX = isEvenRow ? -100 : 100;

          return (
            <motion.div
              key={rowIndex}
              className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 xl:gap-12"
              initial={{ opacity: 0, x: initialX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: exitX }}
              transition={{
                duration: 0.6,
                delay: (rowIndex - 3) * 0.2,
                ease: "easeOut"
              }}
            >
              {row.map((company, companyIndex) => (
                <div
                  key={companyIndex}
                  className="flex items-center justify-center min-w-[80px] lg:min-w-[100px] h-10 lg:h-12"
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={140}
                      height={56}
                      className="object-contain w-auto h-full max-w-[180px]"
                    />
                  ) : (
                    <span className="text-xs lg:text-sm font-medium text-midnight-monarch whitespace-nowrap">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default campany;