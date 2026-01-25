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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear message when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Build subject from service
      const subject = formData.service 
        ? `Inquiry for ${formData.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
        : "Project Inquiry";

      // Build message with all details
      let messageContent = formData.projectDetails;
      
      if (formData.companyName) {
        messageContent = `Company: ${formData.companyName}\n\n${messageContent}`;
      }
      
      if (formData.budget) {
        const budgetText = formData.budget
          .replace(/-/g, ' - $')
          .replace(/k/g, ',000')
          .replace(/\+/g, '+');
        messageContent = `${messageContent}\n\nBudget: $${budgetText}`;
      }

      // Prepare inquiry data
      const inquiryData = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: subject,
        message: messageContent.trim(),
      };

      // Send to API
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Thank you! Your inquiry has been submitted successfully. We\'ll get back to you soon.' 
        });
        
        // Clear the form
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          service: "",
          budget: "",
          projectDetails: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Failed to submit inquiry. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setMessage({ 
        type: 'error', 
        text: 'An error occurred while submitting. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 bg-gray-50 -mx-10 lg:-mx-20 px-10 pt-16 pb-0">
      <div className="max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight text-center lg:text-left">
              Have a project idea in mind? Let&apos;s get started
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed text-center lg:text-left">
              We&apos;ll schedule a call to discuss your idea. After discovery sessions, we&apos;ll send a proposal, and upon approval, we&apos;ll get started.
            </p>
            
            {/* Profile Section */}
            <div className="mt-auto flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden mb-4 bg-teal-200">
                {/* Placeholder for profile image - replace with actual image */}
                <div className="w-full h-full bg-teal-200 flex items-center justify-center">
                  <span className="text-teal-600 text-4xl font-bold">RA</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center lg:text-left">Zihan Ahmed Joy</h3>
              <p className="text-gray-600 mb-6 text-center lg:text-left">Founder & CEO of Graphilence</p>
            </div>
          </div>
          </RevealOnScroll>

          {/* Right Section - Form */}
          <RevealOnScroll delay={0.1} direction="right">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            {/* Success/Error Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span>{message.text}</span>
                  <button
                    onClick={() => setMessage(null)}
                    className="ml-4 text-lg font-bold hover:opacity-70"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

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
                disabled={isSubmitting}
                className={`w-full bg-midnight-monarch text-white font-semibold py-4 px-6 rounded-lg transition-colors ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:bg-opacity-90'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Send inquiry'
                )}
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
