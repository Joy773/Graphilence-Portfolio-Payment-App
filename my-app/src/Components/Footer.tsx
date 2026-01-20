"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const services = [
    "Web Design",
    "Webflow",
    "MVP Development",
    "SaaS Design",
    "MVP Web",
    "Mobile App",
    "Branding",
    "UI/UX Design",
    "UI/UX Consulting",
    "Brand Identity",
    "Corporate Identity",
    "Motion Graphics"
  ];

  const quickLinks = [
    "Work",
    "About",
    "Contact",
    "Pricing",
    "Career",
    "Blog",
    "Sitemap",
    "Privacy Policy",
    "Terms & Condition"
  ];

  const reviews = [
    "Clutch",
    "Good Firms",
    "Design Rush",
    "Behance",
    "Dribbble",
    "Webflow"
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800 -mx-10 lg:-mx-20">
      <div className="px-10 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Company Info and CTA */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div
                className="w-8 h-8 bg-midnight-monarch mr-2"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)'
                }}
              ></div>
              <div
                className="w-8 h-8 bg-yellow-400"
                style={{
                  clipPath: 'polygon(0% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                }}
              ></div>
            </div>

            {/* Company Description */}
            <div className='lg:w-2/3'>
              <p className="text-white mb-6 text-sm lg:text-base leading-relaxed">
                An Experience Design Agency focusing on building functional, simple, human-centered digital products for future.
              </p>
            </div>


            {/* Contact Button */}
            <div>
            <button className="bg-purplish-blue cursor-pointer text-white font-bold rounded-full py-3 px-6">
              Contact us now
            </button>
            </div>
           
          </div>

          {/* Right Side - SERVICES, QUICK LINK, and REVIEW */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {/* SERVICES Section */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                SERVICES
              </h3>
              <ul className="flex flex-col gap-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUICK LINK Section */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                QUICK LINK
              </h3>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* REVIEW Section */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                REVIEW
              </h3>
              <ul className="flex flex-col gap-2">
                {reviews.map((review, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {review}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations Section */}
      <div className="bg-black text-white px-10 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
          {[
            {
              city: "New York",
              address: "47 Macdonough St, Apt 01, Brooklyn, NY 11216",
              phone: "+1 (917) 960-9979",
            },
            {
              city: "Dubai",
              address: "B1906 East Wing, Latifa towers, World trade 1, Sheikh Zayed Road 413658",
              phone: "+971 50 196 6827",
            },
            {
              city: "Berlin",
              address: "Reuterstr. 23, 12043 Berlin, Germany",
              phone: "+49 1511 000 3257",
            },
            {
              city: "KSA",
              address: "4194 Bir Al Mahallat, Al Wisham, Riyadh 12741, Saudi Arabia",
              phone: "+966 53 138 2220",
            },
            {
              city: "London",
              address: "19-21 Mortimer St, London W1T 3JE, United Kingdom",
              phone: "+44 7441 921 927",
            },
            {
              city: "Dhaka",
              address: "Joypurhat Tower, Level- 06, Block F, Main Road, Dhaka - 1219",
              phone: "+8801630-253650",
            },
          ].map((office, index) => (
            <div key={index} className="flex flex-col">
              {/* Gradient Icon */}
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>

              {/* City Name */}
              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">
                {office.city}
              </h3>

              {/* Address */}
              <p className="text-gray-400 text-sm mb-2 leading-relaxed">
                {office.address}
              </p>

              {/* Phone */}
              <p className="text-gray-400 text-sm">
                {office.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="bg-black text-white px-10 lg:px-20 py-6 border-t border-gray-800">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Company Deck */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purplish-blue rounded-full flex items-center justify-center cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4V12M4 8L8 12L12 8" stroke="#1A1436" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">Company Deck</p>
              <p className="text-gray-400 text-xs">PDF, 3 MB</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center">
            © 2021-2025, Musemind Agency | All Rights Reserved.
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            {[
              { name: "Facebook", icon: "f" },
              { name: "LinkedIn", icon: "in" },
              { name: "YouTube", icon: "▶" },
              { name: "X", icon: "X" },
              { name: "Instagram", icon: "📷" },
            ].map((social, index) => (
              <Link
                key={index}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label={social.name}
              >
                <span className="text-white text-sm font-semibold">{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;