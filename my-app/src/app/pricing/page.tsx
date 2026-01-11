"use client";

import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");

  // Company logos - using text-based logos for the mentioned companies
  const companies = [
    { name: "Y Combinator", logo: null },
    { name: "Kodezi", logo: null },
    { name: "Delve", logo: null },
    { name: "Hey Gen", logo: null },
    { name: "ZeroEssay", logo: null },
  ];

  return (
    <div className="px-10 lg:px-20">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="mt-20 mb-4">
        <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 text-center">
          {/* Clutch Rating Badge */}
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <span className="text-midnight-monarch font-medium">Clutch</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FFB800"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span className="text-midnight-monarch font-medium">5.0</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-3 md:mb-4">
            <div className="block">Your on-demand design team,</div>
            <div className="block">for a flat monthly</div>
            <div className="block">fee</div>
        </h1>

          {/* Descriptive Paragraph */}
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-2 md:mb-0 md:hidden">
            We deliver superior designs to fast-moving startups, SMB&apos;s, and
            agencies. Our innovative work helps them scale up fast.
          </p>
        </div>
      </div>

      {/* Trusted by Brands & Pricing Toggle Section */}
      <div className="mb-20 -mt-2 md:mt-0">
        <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Trusted by Brands Section - Left Side */}
            <div>
              <h2 className="text-gray-600 text-lg md:text-xl font-medium mb-3 md:mb-4">
                Trusted by top global brands
              </h2>
              {/* Companies in one row */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="text-gray-600 text-sm md:text-base font-medium"
                  >
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={120}
                        height={40}
                        className="object-contain opacity-80"
                      />
                    ) : (
                      <span>{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Toggle Buttons - Right Side */}
            <div className="flex items-center gap-3 justify-center lg:justify-end">
              {/* Monthly Button */}
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-purplish-blue text-white border border-purplish-blue"
                    : "bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                Monthly
              </button>

              {/* Quarterly Button */}
              <button
                onClick={() => setBillingPeriod("quarterly")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all relative ${
                  billingPeriod === "quarterly"
                    ? "bg-purplish-blue text-white border border-purplish-blue"
                    : "bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                <span>Quarterly</span>
                <span className="ml-2 px-2 py-0.5 rounded text-xs bg-green-500 text-white">
                  -10%
                </span>
              </button>

              {/* Yearly Button */}
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all relative ${
                  billingPeriod === "yearly"
                    ? "bg-purplish-blue text-white border border-purplish-blue"
                    : "bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                <span>Yearly</span>
                <span className="ml-2 px-2 py-0.5 rounded text-xs bg-green-500 text-white">
                  2 Months free
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="mb-20 bg-white py-12 px-4 md:px-8 lg:px-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col">
            <h3 className="text-3xl font-bold text-midnight-monarch mb-3">Starter</h3>
            <p className="text-gray-600 text-sm mb-6">
              Perfect for early startups and marketers needing steady design help to grow faster.
            </p>
            <div className="mb-6">
              <div className="text-3xl font-bold text-midnight-monarch mb-1">
                {billingPeriod === "monthly" ? "$1,980" : billingPeriod === "quarterly" ? "$5,940" : "$19,800"}
                <span className="text-lg font-normal text-gray-600">
                  /{billingPeriod === "monthly" ? "Monthly" : billingPeriod === "quarterly" ? "Quarterly" : "Yearly"}
                </span>
              </div>
              <p className="text-gray-500 text-xs">Cancel anytime</p>
            </div>
            <button className="bg-midnight-monarch text-white font-semibold py-3 px-6 rounded-lg mb-2 hover:bg-purplish-blue transition-colors">
              Buy Now
            </button>
            <a href="#" className="text-gray-600 text-sm text-center hover:text-midnight-monarch transition-colors">
              Book a Intro call
            </a>
            
            {/* Testimonial */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-midnight-monarch text-sm font-semibold">IK</span>
                </div>
                <div>
                  <p className="text-midnight-monarch font-medium text-sm">Isragh Khan</p>
                  <p className="text-gray-500 text-xs">CEO at Kodezi</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-midnight-monarch text-sm font-medium">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                &ldquo;wavespace very reliable at all times and we have enjoyed working & designs are truly impressive&rdquo;
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">55 hours of per month</span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">
                  All design services included{" "}
                  <a href="#" className="text-green-600 hover:underline">view all</a>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">Dedicated team with Senior Designer and Project Manager.</span>
              </div>
            </div>
          </div>

          {/* Accelerate Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Only 5 spots left
            </div>
            <h3 className="text-3xl font-bold text-midnight-monarch mb-3">Accelerate</h3>
            <p className="text-gray-600 text-sm mb-6">
              Perfect for SaaS and VC-backed teams needing rapid, expert design support
            </p>
            <div className="mb-6">
              <div className="text-3xl font-bold text-midnight-monarch mb-1">
                {billingPeriod === "monthly" ? "$5,280" : billingPeriod === "quarterly" ? "$15,840" : "$52,800"}
                <span className="text-lg font-normal text-gray-600">
                  /{billingPeriod === "monthly" ? "Monthly" : billingPeriod === "quarterly" ? "Quarterly" : "Yearly"}
                </span>
              </div>
              <p className="text-gray-500 text-xs">Cancel anytime</p>
            </div>
            <button className="bg-midnight-monarch text-white font-semibold py-3 px-6 rounded-lg mb-2 hover:bg-purplish-blue transition-colors">
              Buy Now
            </button>
            <a href="#" className="text-gray-600 text-sm text-center hover:text-midnight-monarch transition-colors">
              Book a Intro call
            </a>
            
            {/* Testimonial */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-midnight-monarch text-sm font-semibold">NF</span>
                </div>
                <div>
                  <p className="text-midnight-monarch font-medium text-sm">Nick Fisher</p>
                  <p className="text-gray-500 text-xs">CEO at tournated</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-midnight-monarch text-sm font-medium">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                &ldquo;Highly happy with a design delivered by Wavespace. Definitely will keep working with Wavespace.&rdquo;
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">110 hours of per month</span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">
                  All design services included{" "}
                  <a href="#" className="text-green-600 hover:underline">view all</a>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">Dedicated team with Senior Designer, Copywriter, and Project Manager.</span>
              </div>
            </div>
          </div>

          {/* Flexible Project / Custom Project */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col">
            <h3 className="text-3xl font-bold text-midnight-monarch mb-3">Flexible project</h3>
            <p className="text-gray-600 text-sm mb-6">
              Perfect for startups, SaaS, and brands needing flexible, one-time, or mixed projects.
            </p>
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-midnight-monarch mb-2">Custom Project</h4>
              <p className="text-gray-600 text-sm">Full stack design team</p>
            </div>
            <button className="bg-midnight-monarch text-white font-semibold py-3 px-6 rounded-lg mb-2 hover:bg-purplish-blue transition-colors">
              Get custom quote
            </button>
            
            {/* Testimonial */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-midnight-monarch text-sm font-semibold">AA</span>
                </div>
                <div>
                  <p className="text-midnight-monarch font-medium text-sm">Abraham Ajayi</p>
                  <p className="text-gray-500 text-xs">CEO at ActiveSync</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-midnight-monarch text-sm font-medium">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                &ldquo;Wavespace brought my idea to life. Taken great care of my business & implement best user experience.&rdquo;
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">Meetings, Daily Slack + Loom (Flexible scope & timeline)</span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">Custom development or no-code build</span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span className="text-gray-700 text-sm">Dedicated team of senior Designer, Copywriter, and Project Manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="mb-20">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-monarch">
              What Do You Get<br />By Choosing Graphilence?
            </h2>
            <button className="bg-midnight-monarch text-white font-semibold py-3 px-6 rounded-lg hover:bg-purplish-blue transition-colors whitespace-nowrap self-end md:self-auto">
              Book an Intro Call →
            </button>
          </div>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-midnight-monarch">Graphilence</span>
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 md:px-6">
                    <span className="text-xl md:text-2xl font-bold text-midnight-monarch">Other Design Agencies</span>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* Row 1: The best design talent */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">The best design talent</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">The best design talent</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Designers with expertise in design for SaaS */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">Designers with expertise in design for SaaS</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-400 text-base md:text-lg">Designers with expertise in design for SaaS</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Team scaling on demand */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">Team scaling on demand</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-400 text-base md:text-lg">Team scaling on demand</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Dedicated account manager */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">Dedicated account manager</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-400 text-base md:text-lg">Dedicated account manager</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5: It takes days from project request to start */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">It takes days from project request to start</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">It takes days from project request to start</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6: 3-day FREE trial */}
                <tr>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">3-day FREE trial</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-gray-700 text-base md:text-lg">3-day FREE trial</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
