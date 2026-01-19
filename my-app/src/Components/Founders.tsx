"use client";

import React from 'react';
import Image from 'next/image';
import RevealOnScroll from './RevealOnScroll';

const Founders = () => {
  const founders = [
    {
      id: 1,
      image: "/founders/founder_one.webp",
      name: "Matt Kabus",
      title: "CEO & Founder @LifeTales",
      quote: "Wavespace is a fantastic design team, with a healthy blend of UI and UX skills. Highly recommended"
    },
    {
      id: 2,
      image: "/founders/founder_two.webp",
      name: "Ishraq Khan",
      title: "CEO @Kodezi",
      quote: "Wavespace very reliable at all times and we have enjoyed working & designs are truly impressive An absolute pleasure to work with and I'm super satisfied with the results. Highly recommended!"
    },
    {
      id: 3,
      image: "/founders/founder_three.webp",
      name: "Nikita Ribakovs",
      title: "Founder & CEO @Tournated",
      quote: "Highly happy with a design delivered by Wavespace. Definitely will keep working with Wavespace. Great quality and smooth communication"
    },
  ];

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      {/* Headline */}
      <RevealOnScroll>
        <div className='w-full flex justify-center'>
          <div className='w-full lg:w-2/3'>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-12 lg:mb-16 leading-tight text-center">
              500+ Founders trusted us. Get return on your{" "}
              <span className="text-gray-600">investment</span>, multiplied!
            </h2>
          </div>
        </div>
      </RevealOnScroll>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {founders.map((founder, index) => (
          <RevealOnScroll key={founder.id} delay={index * 0.1}>
            <div className="flex flex-col">
            {/* Founder Image */}
            <div className="relative w-full max-w-[360px] mx-auto mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '3/4' }}>
              <Image
                src={founder.image}
                alt={founder.name}
                width={360}
                height={480}
                className="w-full h-full object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 360px"
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
          </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Founders;