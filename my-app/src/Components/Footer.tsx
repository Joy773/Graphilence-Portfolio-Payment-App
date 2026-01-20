"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const servicesLeft = [
    "UI UX Design",
    "Web Design",
    "Product Design",
    "SaaS Design",
    "Branding"
  ];

 

  const caseStudies = [
    "Open Hub",
    "Better AI",
    "Spacebook",
    "Kodezi",
    "View all work"
  ];

  const contact = [
    "Clutch",
    "Behance",
    "Dribbble",
    "Awwwards"
  ];

  return (
    <footer className="bg-midnight-monarch text-white w-screen relative" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw', maxWidth: '100vw' }}>
      <div className="px-10 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Logo */}
            <h2 className="text-white font-bold text-2xl lg:text-3xl mb-4">
              wavespace
            </h2>

            {/* Company Description */}
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-md">
              Wavespace is a global UI/UX design agency that boosts brand value with user-friendly, effective designs for web, mobile, and SaaS platforms.
            </p>

            {/* Company Deck Button */}
            <div className="mb-8 lg:mb-12">
              <button className="group relative bg-purplish-blue text-white font-semibold rounded-full py-3 px-6 pr-12 flex items-center gap-3 hover:opacity-90 transition-opacity">
                <span>Company Deck</span>
                <div className="absolute right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4V12M4 8L8 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>

          </div>

          {/* Middle Section - Navigation Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Services Column */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-base mb-4">
                Services
              </h3>
              <ul className="flex flex-col gap-2">
                {servicesLeft.map((service, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case studies Column */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-base mb-4">
                Case studies
              </h3>
              <ul className="flex flex-col gap-2">
                {caseStudies.map((study, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {study}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-base mb-4">
                Contact
              </h3>
              <ul className="flex flex-col gap-2">
                {contact.map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Social Media and CTA Section */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Instagram
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Facebook
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Twitter
            </Link>
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col items-start lg:items-end">
            <h3 className="text-white font-medium text-base mb-3">
              Let's work together
            </h3>
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-purplish-blue font-bold text-2xl lg:text-3xl whitespace-nowrap">
                Call wavespace
              </span>
              <div className="w-12 h-12 bg-purplish-blue rounded-full flex items-center justify-center group-hover:opacity-90 transition-colors flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal */}
      <div className="border-t border-gray-800 px-10 lg:px-20 py-6 w-full bg-midnight-monarch">
        <div className="grid grid-cols-4 gap-4 items-center">
          {/* Column 1 - Copyright */}
          <div className="text-gray-400 text-sm">
            wavespace LLC © 2025
          </div>

          {/* Column 2 - Empty or spacing */}
          <div></div>

          {/* Column 3 - Location Text */}
          <div className="text-gray-400 text-sm">
            Wavespace is a limited liability company based in
          </div>

          {/* Column 4 - Flags and Profile Icons */}
          <div className="flex items-center gap-3 justify-end">
            {/* Flag Icons */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">🇺🇸</div>
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">🇦🇪</div>
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">🇧🇩</div>
            </div>
            {/* Profile Icons */}
            <div className="flex items-center gap-1">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#1A1A1A] -ml-2 first:ml-0"
                  style={{
                    background: `linear-gradient(135deg, hsl(${index * 45}, 70%, 60%), hsl(${index * 45 + 30}, 70%, 60%))`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
