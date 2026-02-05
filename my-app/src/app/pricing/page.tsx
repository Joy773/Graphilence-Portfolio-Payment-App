"use client";

import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import RevealOnScroll from "@/Components/RevealOnScroll";
import { FaArrowRight, FaStar, FaChevronRight } from "react-icons/fa";
import { motion } from "motion/react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // FAQ data for accordion
  const faqItems = [
    { q: "Who will be designing my projects?", a: "Your projects will be handled by our senior design team with expertise in UI/UX, brand design, and product design. You'll have a dedicated account manager and direct access to your designers." },
    { q: "How do I know your designs will match my brand and goals?", a: "We start with a discovery call to understand your brand, audience, and goals. Our team creates designs aligned with your vision and iterates based on your feedback until you're satisfied." },
    { q: "What happens after I subscribe?", a: "After you subscribe, we'll onboard you within days: kickoff call, access to our project hub, and you can start submitting requests. Your dedicated team will be assigned and ready to deliver." },
    { q: "Do you offer meetings?", a: "Yes. We offer regular syncs via video call, Slack, and Loom. You can book calls with your account manager and designers as needed." },
    { q: "Can I pause or cancel my subscription?", a: "Yes. You can cancel anytime. Unused hours don't roll over after cancellation. We also offer the option to pause your plan for a limited period in certain cases." },
    { q: "What if I need more hours?", a: "You can upgrade your plan at any time for more hours. We also offer add-on hours for one-off spikes in demand." },
    { q: "How fast can I get started?", a: "Most clients are onboarded and have their first request in progress within 3–5 business days after signing." },
    { q: "Do you work with startups and enterprises?", a: "Yes. We work with early-stage startups, scale-ups, and enterprises. Our plans are flexible to fit different team sizes and needs." },
    { q: "What design tools do you use?", a: "We use Figma, Adobe Creative Suite, and other industry-standard tools. Deliverables are shared in your preferred format and can be handed off to your dev team." },
    { q: "Is there a minimum commitment?", a: "Our monthly plan has no long-term commitment. Quarterly and yearly plans offer better rates with a minimum commitment period." },
    { q: "Do you offer a free trial?", a: "We offer a 3-day free trial on selected plans so you can experience our process and quality before committing." },
    { q: "How do I submit and track requests?", a: "You'll use our project hub (WaveHub) to submit briefs, attach files, and track progress. You can also communicate via Slack and get updates in real time." },
  ];

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

      {/* Pricing section: midnight monarch background till end */}
      <div className="bg-midnight-monarch -mx-10 lg:-mx-20 px-10 lg:px-20 pt-4 pb-0">
      {/* Hero Banner Section */}
      <RevealOnScroll>
        <div className="mt-10 mb-4">
          <div className="rounded-2xl p-4 md:p-6 text-center">
            {/* Clutch Rating Badge */}
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <div className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg bg-white/10">
                <span className="text-white font-medium">Fiverr</span>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-[#FFB800] shrink-0" />
                  ))}
                </div>
                <span className="text-white font-medium">4.8</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-4">
              <div className="block">Your on-demand design team,</div>
              <div className="block">for a flat monthly</div>
              <div className="block">fee</div>
            </h1>

            {/* Descriptive Paragraph */}
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-2 md:mb-0 md:hidden">
              We deliver superior designs to fast-moving startups, SMB&apos;s, and
              agencies. Our innovative work helps them scale up fast.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Trusted by Brands & Pricing Toggle Section */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-10 md:mt-0">
          <div className="rounded-2xl lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Trusted by Brands Section - Left Side */}
              <div className="text-center lg:text-left">
                <h2 className="text-gray-300 text-lg md:text-xl font-medium mb-3 md:mb-4">
                  Trusted by top global brands
                </h2>
                {/* Companies in one row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
                  {companies.map((company, index) => (
                    <div
                      key={index}
                      className="text-gray-300 text-sm md:text-base font-medium"
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
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all cursor-pointer ${billingPeriod === "monthly"
                      ? "bg-purplish-blue text-white border border-purplish-blue"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                    }`}
                >
                  Monthly
                </button>

                {/* Quarterly Button */}
                <button
                  onClick={() => setBillingPeriod("quarterly")}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all cursor-pointer ${billingPeriod === "quarterly"
                      ? "bg-purplish-blue text-white border border-purplish-blue"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                    }`}
                >
                  Quarterly
                </button>

                {/* Yearly Button */}
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all cursor-pointer ${billingPeriod === "yearly"
                      ? "bg-purplish-blue text-white border border-purplish-blue"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                    }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Pricing Cards Section */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-20 px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Starter Plan */}
            <div className="bg-[#252045] border border-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col text-white">
              <h3 className="text-3xl font-bold mb-3">Starter</h3>
              <p className="text-gray-300 text-sm mb-6">
                Perfect for early startups and marketers needing steady design help to grow faster.
              </p>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1">
                  {billingPeriod === "monthly" ? "$1,980" : billingPeriod === "quarterly" ? "$5,940" : "$19,800"}
                  <span className="text-lg font-normal text-gray-300">
                    /{billingPeriod === "monthly" ? "Monthly" : billingPeriod === "quarterly" ? "Quarterly" : "Yearly"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Cancel anytime</p>
              </div>
              <button className="bg-purplish-blue text-white font-semibold py-3 px-6 rounded-lg mb-2 cursor-pointer ">
                Buy Now
              </button>
            

              {/* Testimonial */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">IK</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Isragh Khan</p>
                    <p className="text-gray-400 text-xs">CEO at Kodezi</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-white text-sm font-medium">5.0</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">
                  &ldquo;wavespace very reliable at all times and we have enjoyed working & designs are truly impressive&rdquo;
                </p>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">55 hours of per month</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">
                    All design services included{" "}
                    <a href="#" className="text-green-400 hover:underline">view all</a>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Dedicated team with Senior Designer and Project Manager.</span>
                </div>
              </div>
            </div>

            {/* Accelerate Plan - animated border loop (top → right → bottom → left) */}
            <div className="relative bg-[#252045] border border-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col text-white overflow-hidden">
              {/* Animated border: draws top → right → bottom → left in a loop (one 2.4s cycle) */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-purplish-blue origin-left"
                animate={{ scaleX: [0, 1, 1, 1, 0] }}
                transition={{ duration: 2.4, times: [0, 0.08, 0.25, 0.92, 1], repeat: Infinity }}
              />
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-0.5 bg-purplish-blue origin-top"
                animate={{ scaleY: [0, 0, 1, 1, 0] }}
                transition={{ duration: 2.4, times: [0, 0.25, 0.33, 0.58, 0.92], repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purplish-blue origin-right"
                animate={{ scaleX: [0, 0, 1, 1, 0] }}
                transition={{ duration: 2.4, times: [0, 0.5, 0.58, 0.83, 0.92], repeat: Infinity }}
              />
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-0.5 bg-purplish-blue origin-bottom"
                animate={{ scaleY: [0, 0, 1, 1, 0] }}
                transition={{ duration: 2.4, times: [0, 0.75, 0.83, 1, 1], repeat: Infinity }}
              />
              <h3 className="text-3xl font-bold mb-3">Accelerate</h3>
              <p className="text-gray-300 text-sm mb-6">
                Perfect for SaaS and VC-backed teams needing rapid, expert design support
              </p>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1">
                  {billingPeriod === "monthly" ? "$5,280" : billingPeriod === "quarterly" ? "$15,840" : "$52,800"}
                  <span className="text-lg font-normal text-gray-300">
                    /{billingPeriod === "monthly" ? "Monthly" : billingPeriod === "quarterly" ? "Quarterly" : "Yearly"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Cancel anytime</p>
              </div>
              <button className="bg-purplish-blue text-white font-semibold py-3 px-6 rounded-lg mb-2 cursor-pointer transition-colors">
                Buy Now
              </button>
             

              {/* Testimonial */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">NF</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Nick Fisher</p>
                    <p className="text-gray-400 text-xs">CEO at tournated</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-white text-sm font-medium">5.0</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">
                  &ldquo;Highly happy with a design delivered by Wavespace. Definitely will keep working with Wavespace.&rdquo;
                </p>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">110 hours of per month</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">
                    All design services included{" "}
                    <a href="#" className="text-green-400 hover:underline">view all</a>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Dedicated team with Senior Designer, Copywriter, and Project Manager.</span>
                </div>
              </div>
            </div>

            {/* Flexible Project / Custom Project */}
<div className="bg-[#252045] border border-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col text-white">
            <h3 className="text-3xl font-bold mb-3">Flexible project</h3>
              <p className="text-gray-300 text-sm mb-6">
                Perfect for startups, SaaS, and brands needing flexible, one-time, or mixed projects.
              </p>
              <div className="mb-6">
                <h4 className="text-2xl font-bold mb-2">Custom Project</h4>
                <p className="text-gray-300 text-sm">Full stack design team</p>
              </div>
              <button className="bg-purplish-blue text-white font-semibold py-3 px-6 rounded-lg mb-2 cursor-pointer">
                Get custom quote
              </button>

              {/* Testimonial */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">AA</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Abraham Ajayi</p>
                    <p className="text-gray-400 text-xs">CEO at ActiveSync</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-white text-sm font-medium">5.0</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">
                  &ldquo;Wavespace brought my idea to life. Taken great care of my business & implement best user experience.&rdquo;
                </p>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Meetings, Daily Slack + Loom (Flexible scope & timeline)</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Custom development or no-code build</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Dedicated team of senior Designer, Copywriter, and Project Manager</span>
                </div>
              </div>
            </div>
          </div>

          {/* Included in all package */}
          <div className="mt-10 rounded-2xl bg-[#252045] p-6 md:p-8">
            <h3 className="text-white font-bold text-lg md:text-xl mb-4">Included in all package</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Hours rollover",
                "Unlimited requests",
                "Turnaround time from 12h",
                "WaveHub",
                "Global timezone coverage",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-500 bg-[#252045] text-white text-sm font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Comparison Table Section - full white background */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-20 bg-white -mx-10 lg:-mx-20 px-10 lg:px-20 py-20 lg:py-25">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-monarch text-center md:text-left">
                What Do You Get<br />By Choosing Graphilence?
              </h2>
              <motion.button
                className="bg-midnight-monarch hover:bg-purplish-blue text-white font-semibold py-3 px-6 rounded-lg cursor-pointer whitespace-nowrap self-center md:self-auto flex items-center gap-2"
                initial="rest"
                animate="rest"
                whileHover="hover"
              >
                <span>Book an Intro Call</span>
                <motion.span
                  variants={{
                    rest: {
                      x: 0,
                    },
                    hover: {
                      x: [0, 6, 0],
                      transition: {
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="flex items-center"
                >
                  <FaArrowRight className="text-white" size={14} />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Comparison Table Card */}
          <div className="rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                          <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                          <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                          <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      </RevealOnScroll>

      </div>
      {/* End pricing section */}

      {/* FAQ Accordion Section */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: FAQ Accordion */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-8 lg:mb-10">
                <span className="block">Frequently asked</span>
                <span className="block text-gray-500 font-bold mt-1">Questions</span>
              </h2>
              <div className="divide-y divide-gray-200">
                {faqItems.map((item, index) => (
                  <div key={index} className="py-4 lg:py-5">
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 text-left group"
                    >
                      <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-midnight-monarch transition-colors pr-4">
                        {item.q}
                      </span>
                      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-midnight-monarch transition-transform duration-200">
                        <FaChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${faqOpenIndex === index ? "rotate-90" : ""}`}
                        />
                      </span>
                    </button>
                    {faqOpenIndex === index && (
                      <div className="mt-3 pl-0 pr-12">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Card */}
            <div className="lg:col-span-5">
              <div className="bg-midnight-monarch rounded-2xl p-6 lg:p-8 h-fit sticky top-24">
                <div className="flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gray-500 mb-6 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    G
                  </div>
                  <p className="text-white text-base lg:text-lg leading-relaxed mb-6">
                    Hi, I&apos;m the CEO and Founder of Graphilence. Don&apos;t hesitate to reach out anytime — I&apos;m here to answer all your questions!
                  </p>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-purplish-blue text-white font-semibold hover:bg-purplish-blue/90 transition-colors cursor-pointer"
                  >
                    <span>Ask Questions</span>
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
