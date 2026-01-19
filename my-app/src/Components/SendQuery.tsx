"use client";

import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const SendQuery = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    service: "",
    budget: "",
    projectDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mt-20 bg-gray-50 -mx-10 lg:-mx-20 px-10 py-16">
      <div className="max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Have a project idea in mind? Let&apos;s get started
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We&apos;ll schedule a call to discuss your idea. After discovery sessions, we&apos;ll send a proposal, and upon approval, we&apos;ll get started.
            </p>
            
            {/* Profile Section */}
            <div className="mt-auto">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden mb-4 bg-teal-200">
                {/* Placeholder for profile image - replace with actual image */}
                <div className="w-full h-full bg-teal-200 flex items-center justify-center">
                  <span className="text-teal-600 text-4xl font-bold">RA</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Zihan Ahmed Joy</h3>
              <p className="text-gray-600 mb-6">Founder & CEO of Graphilence</p>
            </div>
          </div>
          </RevealOnScroll>

          {/* Right Section - Form */}
          <RevealOnScroll delay={0.1} direction="right">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Cooper"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent"
                />
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Ex. Tesla Inc"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="You@Example.Com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent"
                />
              </div>

              {/* Service Required */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service required <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent bg-white"
                >
                  <option value="">Select Your Service</option>
                  <option value="web-design">Web Design</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              {/* Project Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Project budget <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent bg-white"
                >
                  <option value="">Select Your Range</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Project details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Tell us more about your idea"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-midnight-monarch cursor-pointer text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Send inquiry
              </button>

              {/* Alternative Contact */}
              <div className="text-center pt-4">
                <p className="text-gray-700 text-sm mb-2">
                  Not Interested to submit the form?
                </p>
                <a
                  href="https://calendly.com/musemind/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-midnight-monarch hover:text-purplish-blue underline font-medium"
                >
                  Book A Call Directly
                </a>
              </div>
            </form>
          </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default SendQuery;
