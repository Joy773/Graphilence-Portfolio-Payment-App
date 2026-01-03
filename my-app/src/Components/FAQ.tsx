"use client";

import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are your focus areas as a UI/UX agency?"
    },
    {
      question: "What sets Musemind apart from other top UI/UX design agencies?"
    },
    {
      question: "What services do you offer for start-ups, and how can they add value to my business?"
    },
    {
      question: "Can you help us redesign our app, website, or enterprise/B2B software?"
    },
    {
      question: "How do you estimate the time for the UI/UX project?"
    },
    {
      question: "How much does a UI/UX design project cost?"
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Heading and CTA */}
        <div className="flex flex-col">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-8 lg:mb-12">
            Have questions?
          </h2>

          {/* CTA Box */}
          <div className="relative bg-midnight-monarch rounded-2xl p-6 lg:p-8 overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-gray-400 opacity-20 rounded-full blur-3xl"></div>
            
            {/* Profile Pictures */}
            <div className="flex -space-x-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-gray-500 border-2 border-white"></div>
            </div>

            {/* Text */}
            <div className="text-white mb-6 relative z-10">
              <p className="text-lg lg:text-xl font-semibold mb-1">Find the right solution</p>
              <p className="text-lg lg:text-xl font-semibold">for you now</p>
            </div>

            {/* Button */}
            <button className="bg-purplish-blue hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors relative z-10 w-full lg:w-auto">
              Book a Quick Call
            </button>
          </div>
        </div>

        {/* Right Side - FAQ List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-4 lg:py-6"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left hover:opacity-80 transition-opacity"
                type="button"
              >
                <span className="text-base lg:text-lg font-medium text-midnight-monarch pr-4">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="mt-4 text-gray-600 pb-2">
                  <p>This is a placeholder answer. You can add the actual answer content here.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;