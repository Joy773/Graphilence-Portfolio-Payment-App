"use client";

import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Campany from "@/Components/campany";
import Image from "next/image";

export default function Services() {
  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      {/* Hero Banner Section */}
      <div className="mb-20 -mt-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1 w-full lg:max-w-2xl">
              {/* Clutch Rating Badge */}
              <div className="mb-4 md:mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
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

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-4 md:mb-6">
                Digital product &<br />
                UI UX design<br />
                services
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Are you struggling to turn your ideas into something users love? Wavespace designs digital products for the US, UK, Europe, and Central Asia that are clean, fast, and ready to develop, built with smart UX and clean UI.
              </p>

              {/* Quote */}
              <p className="text-base md:text-lg text-gray-500 italic mb-6 md:mb-8">
                &ldquo;Design is the bridge between user intent and product impact..&rdquo;
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-midnight-monarch hover:bg-purplish-blue text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                  Consult an expert
                </button>
                <button className="bg-transparent border border-zinc-500 hover:border-purplish-blue text-midnight-monarch font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                  View work
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="2" fill="#FFB800" />
                    <circle cx="4" cy="10" r="2" fill="#10B981" />
                    <circle cx="16" cy="10" r="2" fill="#3B82F6" />
                    <circle cx="10" cy="4" r="2" fill="#EF4444" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Screen Image */}
            <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end lg:items-center">
              <div className="relative w-full max-w-lg lg:max-w-2xl">
                <Image
                  src="/screen_img.webp"
                  alt="Digital product design screens"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Logos Section */}
      <Campany singleRow={true} />

      {/* UI/UX Design Section */}
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left Side - Mobile App Image */}
          <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <Image
                src="/UI-UX.webp"
                alt="Mobile app UI/UX design"
                width={400}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Side - UI/UX Design Content */}
          <div className="flex-1 w-full lg:max-w-2xl">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-4 md:mb-6 text-center lg:text-left">
              UI/UX Design
            </h2>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed text-center lg:text-left">
              Your users will find the app easy to use. Our UI and UX services ensure your product is user-friendly so that it appeals to and catches the hearts of users on any device.
            </p>

            {/* Services List */}
            <div className="space-y-3 md:space-y-4">
              {[
                { number: "01", service: "UI UX Design" },
                { number: "02", service: "UX Audit" },
                { number: "03", service: "Design System" },
                { number: "04", service: "UI UX Consulting" },
                { number: "05", service: "UX Research" },
                { number: "06", service: "Usability Testing" },
                { number: "07", service: "Wireframe & UI Prototyping" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-base md:text-lg text-midnight-monarch font-medium">
                    {item.number} {item.service}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-midnight-monarch"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Web Design Section */}
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left Side - Web Design Content */}
          <div className="flex-1 w-full lg:max-w-2xl">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-4 md:mb-6 text-center lg:text-left">
              Web Design
            </h2>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed text-center lg:text-left">
              You don&apos;t just need a website, you need a sales machine. Our web design is user-friendly, fully responsive, and supports SEO. With each scroll, you can expect more clicks, longer time spent on your website, and more conversions.
            </p>

            {/* Services List */}
            <div className="space-y-3 md:space-y-4">
              {[
                { number: "01", service: "Web Design" },
                { number: "02", service: "SaaS Design" },
                { number: "03", service: "Product Design" },
                { number: "04", service: "Website Redesign" },
                { number: "05", service: "B2B Website Design" },
                { number: "06", service: "Landing Page Design" },
                { number: "07", service: "E-commerce Design" },
                { number: "08", service: "Startup Web Design" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-base md:text-lg text-midnight-monarch font-medium">
                    {item.number} {item.service}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-midnight-monarch"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Laptop Image */}
          <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-2xl">
              <Image
                src="/web-dev.webp"
                alt="Web design laptop"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Industry Expertise Section (header only, as per design) */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-2">
              Industry expertise
            </h2>
            <p className="text-lg md:text-xltext-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-gray-400">
              across globally
            </p>
          </div>
          <button className="hover:bg-purplish-blue bg-midnight-monarch text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap">
            Consult an expert
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            > 
              <path
                d="M5 15L15 5M15 5H5M15 5V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Six Images Grid - 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {[
            { 
              src: "/work-list/first.avif", 
              alt: "Work 1",
              title: "E-Commerce & DTC",
              description: "Our approach of making things simpler and more effective helps users go from browsing to checkout in a few simple steps"
            },
            { 
              src: "/work-list/second.avif", 
              alt: "Work 2",
              title: "Finance & Fintech",
              description: "Building secure and user-friendly financial solutions that empower users to manage their finances effortlessly"
            },
            { 
              src: "/work-list/third.avif", 
              alt: "Work 3",
              title: "SaaS & B2B Platforms",
              description: "Creating powerful business solutions that streamline operations and enhance productivity for teams worldwide"
            },
            { 
              src: "/work-list/fourth.avif", 
              alt: "Work 4",
              title: "Healthcare & Wellness",
              description: "Designing intuitive health platforms that connect patients with care providers seamlessly"
            },
            { 
              src: "/work-list/fifth.avif", 
              alt: "Work 5",
              title: "Education & E-Learning",
              description: "Transforming learning experiences with engaging and accessible educational platforms"
            },
            { 
              src: "/work-list/sixth.avif", 
              alt: "Work 6",
              title: "Travel & Hospitality",
              description: "Crafting memorable travel experiences through beautiful and functional booking platforms"
            },
          ].map((image, index) => (
            <div 
              key={index} 
              className="relative w-full aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {image.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who we design for Section */}
      <div className="mb-20 bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-2">
              Who we design for and how
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-500">
              we support them
            </p>
          </div>
          <button className="hover:bg-purplish-blue bg-midnight-monarch text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
            Start your project
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15L15 5M15 5H5M15 5V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: For startups */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Rocket body - red */}
                <path d="M24 32L20 20L24 8L28 20L24 32Z" fill="#FF6B6B"/>
                {/* Rocket tip - blue */}
                <path d="M24 8L22 14L24 16L26 14L24 8Z" fill="#3B82F6"/>
                {/* Rocket window - blue */}
                <circle cx="24" cy="20" r="3" fill="#3B82F6"/>
                {/* Rocket fins - yellow */}
                <path d="M20 20L16 24L20 28L20 20Z" fill="#FFB800"/>
                <path d="M28 20L32 24L28 28L28 20Z" fill="#FFB800"/>
                {/* Flame - yellow/orange */}
                <path d="M24 32L22 36L24 38L26 36L24 32Z" fill="#FFB800"/>
                <path d="M24 32L21 35L24 37L27 35L24 32Z" fill="#FF6B6B"/>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-midnight-monarch mb-3">
              For startups
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We assist early-stage teams in turning their ideas into MVPs more quickly. Get actual user input, win over investors, and release your app stress-free.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Launch MVPs fast</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Validate with users</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Build investor decks</span>
              </li>
            </ul>
          </div>

          {/* Card 2: For Product Teams */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="8" width="28" height="32" rx="2" fill="#3B82F6"/>
                <text x="24" y="28" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-midnight-monarch mb-3">
              For Product Teams
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We become a part of your internal process, handling the main tasks for you. Rely on us for UX support, design systems, and an easy transition of your project.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Full-cycle UX/UI</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Design systems</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Cross-platform support</span>
              </li>
            </ul>
          </div>

          {/* Card 3: For Founders */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Monitor screen - blue */}
                <rect x="8" y="10" width="32" height="24" rx="2" fill="#3B82F6"/>
                {/* Screen content - darker blue */}
                <rect x="12" y="14" width="24" height="16" rx="1" fill="#1E40AF"/>
                {/* UX text - white */}
                <text x="24" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UX</text>
                {/* Monitor stand */}
                <rect x="20" y="34" width="8" height="2" rx="1" fill="#3B82F6"/>
                <rect x="18" y="36" width="12" height="2" rx="1" fill="#3B82F6"/>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-midnight-monarch mb-3">
              For Founders
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Design that helps you reach your targets. We care about how things work and how they help, using hard information, not guesswork.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Growth-focused UX</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>Landing page design</span>
              </li>
              <li className="flex items-center text-midnight-monarch">
                <span className="mr-2">•</span>
                <span>A/B testing assets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slogan Section */}
      <div className="mb-20 bg-gray-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-midnight-monarch">Find your best design into us.</span>{" "}
            <span className="text-gray-600">We</span>
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600 mt-2">
            guarantee next success is yours!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
