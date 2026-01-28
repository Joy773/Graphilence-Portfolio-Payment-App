"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Campany from "@/Components/campany";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "motion/react";
import RevealOnScroll from "@/Components/RevealOnScroll";
import LoadingProgressBar from "@/Components/LoadingProgressBar";
import Lottie from "lottie-react";

interface WorkItem {
  _id: string;
  title: string;
  clientName?: string;
  projectUrl?: string;
  keywords: string[];
  images: string[];
  sections: Array<{ heading?: string; content?: string }>;
  featured?: boolean;
  createdAt: string;
}

// Testimonials data
const testimonials = [
  {
    company: "TechCorp",
    comment: "Outstanding design work that completely transformed our digital presence and user engagement. The team's attention to detail and innovative approach resulted in a significant increase in user satisfaction. Highly recommend their services!",
    name: "John Smith",
    position: "CEO"
  },
  {
    company: "InnovateLabs",
    comment: "The team delivered exceptional UX/UI designs that far exceeded our expectations. Their user-centered approach helped us create products that our customers truly love. The collaboration was smooth and the results speak for themselves.",
    name: "Sarah Johnson",
    position: "Product Manager"
  },
  {
    company: "StartupHub",
    comment: "Professional service and innovative solutions that helped us scale quickly and effectively. Their expertise in design systems and user experience made a tremendous difference in our product development journey. Truly exceptional work!",
    name: "Michael Chen",
    position: "Founder"
  },
  {
    company: "DesignCo",
    comment: "Their attention to detail and user-centered approach made all the difference in our project. The designs are not only beautiful but also highly functional, resulting in improved user engagement and business metrics. Exceptional work from start to finish.",
    name: "Emily Davis",
    position: "Design Director"
  },
  {
    company: "Digital Solutions",
    comment: "Fast, efficient, and incredibly creative. They understood our vision perfectly and brought it to life in ways we hadn't even imagined. The design quality and user experience improvements have been remarkable, and our users have taken notice.",
    name: "David Wilson",
    position: "CTO"
  },
  {
    company: "Creative Agency",
    comment: "Best investment we made this year. The design quality is top-notch, and the team's professionalism is unmatched. They helped us create a digital experience that truly represents our brand and connects with our audience on a deeper level.",
    name: "Lisa Anderson",
    position: "Marketing Head"
  },
  {
    company: "TechVentures",
    comment: "Excellent collaboration and outstanding results. Our users absolutely love the new interface, and we've seen a significant improvement in key metrics. The team's expertise in UX design and their ability to understand our business needs is truly impressive.",
    name: "Robert Taylor",
    position: "VP of Product"
  },
  {
    company: "Innovation Labs",
    comment: "They transformed our complex product into an intuitive and user-friendly experience. The design process was smooth, and the final result exceeded all our expectations. Our user feedback has been overwhelmingly positive, and engagement has increased substantially.",
    name: "Jennifer Martinez",
    position: "Product Lead"
  },
  {
    company: "FutureTech",
    comment: "Outstanding work from start to finish. The team is highly professional, responsive, and truly understands how to create designs that drive business results. The attention to detail and commitment to excellence is evident in every aspect of their work.",
    name: "James Brown",
    position: "Operations Manager"
  },
  {
    company: "NextGen Solutions",
    comment: "The designs are beautiful, functional, and exactly what we needed to elevate our brand. The team's creative approach combined with their technical expertise resulted in an excellent digital experience.",
    name: "Amanda White",
    position: "Founder & CEO"
  }
];

export default function Services() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rocketAnimation, setRocketAnimation] = useState<any>(null);
  const [webDesignAnimation, setWebDesignAnimation] = useState<any>(null);
  const [orderPackedAnimation, setOrderPackedAnimation] = useState<any>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/works');
        const result = await response.json();

        if (result.success) {
          // Filter and show only featured works, limit to 6
          const featuredWorks = result.data
            .filter((work: WorkItem) => work.featured === true)
            .slice(0, 6);
          setWorks(featuredWorks);
        }
      } catch (err) {
        console.error('Error fetching works:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    // Load Lottie animations
    const loadAnimations = async () => {
      try {
        const [rocket, webDesign, orderPacked] = await Promise.all([
          fetch('/animated logo/Rocket.json').then(res => res.json()),
          fetch('/animated logo/web design.json').then(res => res.json()),
          fetch('/animated logo/Order packed.json').then(res => res.json()),
        ]);
        setRocketAnimation(rocket);
        setWebDesignAnimation(webDesign);
        setOrderPackedAnimation(orderPacked);
      } catch (err) {
        console.error('Error loading animations:', err);
      }
    };

    loadAnimations();
  }, []);

  // Get description from first section's content, or use a default
  const getDescription = (work: WorkItem) => {
    if (work.sections && work.sections.length > 0 && work.sections[0].content) {
      return work.sections[0].content.substring(0, 150) + (work.sections[0].content.length > 150 ? '...' : '');
    }
    return "A creative project showcasing innovative design solutions";
  };

  // Get the first image or use a placeholder
  const getImage = (work: WorkItem) => {
    if (work.images && work.images.length > 0) {
      return work.images[0];
    }
    return "/work-list/first.avif"; // Fallback to placeholder
  };

  return (
    <div className="px-10 lg:px-20">
      <LoadingProgressBar isLoading={loading} />
      <Navbar />
      {/* Hero Banner Section */}
      <RevealOnScroll>
        <div className="mb-8 mt-1 md:mt-15">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            {/* Left Side - Text Content */}
            <div className="flex-1 w-full lg:max-w-2xl">
              {/* Clutch Rating Badge */}
              <div className="mt-10 md:mt-0 mb-4 md:mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg ">
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
                <button className="bg-midnight-monarch cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
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
            <div className="hidden md:flex flex-1 w-full lg:w-auto justify-center lg:justify-end lg:items-center">
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
      </RevealOnScroll>

      {/* Company Logos Section */}
      <RevealOnScroll delay={0.2}>
        <Campany singleRow={true} />
      </RevealOnScroll>

      {/* UI/UX Design Section */}
      <RevealOnScroll delay={0.1} direction="left">
        <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          {/* Left Side - Mobile App Image */}
          <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg lg:max-w-2xl">
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
          <div className="flex-1 w-full lg:max-w-2xl flex flex-col justify-center">
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
      </RevealOnScroll>

      {/* Web Design Section */}
      <RevealOnScroll delay={0.1} direction="right">
        <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          {/* Left Side - Web Design Content */}
          <div className="flex-1 w-full lg:max-w-2xl flex flex-col justify-center">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-4 md:mb-6">
              Web Design
            </h2>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
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
      </RevealOnScroll>

      {/* Industry Expertise Section (header only, as per design) */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-2">
              Industry expertise
            </h2>
            <p className="text-lg md:text-xltext-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-gray-400">
              across globally
            </p>
          </div>
          <button className="bg-midnight-monarch cursor-pointer text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap">
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
          {works.length > 0 ? (
            works.map((work, index) => (
              <div
                key={work._id}
                className="flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer mb-4">
                  {work.images && work.images.length > 0 ? (
                    <Image
                      src={work.images[0]}
                      alt={work.title}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                    <div className="text-center text-white">
                      <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                        {getDescription(work)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Project Name and Bullets */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-midnight-monarch mb-3">
                    {work.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 flex flex-wrap items-center gap-1">
                    {work.keywords && work.keywords.length > 0 ? (
                      work.keywords.map((keyword, keywordIndex) => (
                        <span key={keywordIndex} className="flex items-center">
                          <span>{keyword}</span>
                          {keywordIndex < work.keywords.length - 1 && (
                            <span className="mx-2 text-midnight-monarch">•</span>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No keywords available</span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // Fallback to dummy data if no works are available
            [
              {
                src: "/work-list/first.avif",
                alt: "Work 1",
                title: "E-Commerce & DTC",
                description: "Our approach of making things simpler and more effective helps users go from browsing to checkout in a few simple steps",
                bullets: [
                  "E-commerce",
                  "Branding",
                  "Web Design"
                ]
              },
              {
                src: "/work-list/second.avif",
                alt: "Work 2",
                title: "Finance & Fintech",
                description: "Building secure and user-friendly financial solutions that empower users to manage their finances effortlessly",
                bullets: [
                  "UI/UX Design",
                  "Product Design",
                  "Mobile App"
                ]
              },
              {
                src: "/work-list/third.avif",
                alt: "Work 3",
                title: "SaaS & B2B Platforms",
                description: "Creating powerful business solutions that streamline operations and enhance productivity for teams worldwide",
                bullets: [
                  "SaaS Design",
                  "Web Design",
                  "UI/UX Consulting"
                ]
              },
              {
                src: "/work-list/fourth.avif",
                alt: "Work 4",
                title: "Healthcare & Wellness",
                description: "Designing intuitive health platforms that connect patients with care providers seamlessly",
                bullets: [
                  "Healthcare Design",
                  "Mobile App",
                  "UI/UX Design"
                ]
              },
              {
                src: "/work-list/fifth.avif",
                alt: "Work 5",
                title: "Education & E-Learning",
                description: "Transforming learning experiences with engaging and accessible educational platforms",
                bullets: [
                  "E-Learning Platform",
                  "Web Design",
                  "Branding"
                ]
              },
              {
                src: "/work-list/sixth.avif",
                alt: "Work 6",
                title: "Travel & Hospitality",
                description: "Crafting memorable travel experiences through beautiful and functional booking platforms",
                bullets: [
                  "Travel App",
                  "Web Design",
                  "UI/UX Design"
                ]
              },
            ].map((image, index) => (
              <div
                key={index}
                className="flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer mb-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                    <div className="text-center text-white">
                      <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Project Name and Bullets */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-midnight-monarch mb-3">
                    {image.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 flex flex-wrap items-center gap-1">
                    {image.bullets.map((bullet, bulletIndex) => (
                      <span key={bulletIndex} className="flex items-center">
                        <span>{bullet}</span>
                        {bulletIndex < image.bullets.length - 1 && (
                          <span className="mx-2 text-midnight-monarch">•</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </RevealOnScroll>

      {/* Who we design for Section */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-20 bg-gray-50 -mx-10 lg:-mx-20 px-10 lg:px-20 py-12 md:py-16 lg:py-20 rounded-none">
          <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-monarch leading-tight mb-2">
              Who we design for and how
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-500">
              we support them
            </p>
          </div>
          <button className="bg-midnight-monarch cursor-pointer text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap">
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
            <div className="mb-20 h-20 flex items-start">
              {rocketAnimation ? (
                <div className="w-20 h-20">
                  <Lottie animationData={rocketAnimation} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
              )}
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
            <div className="mb-20 h-20 flex items-start">
              {webDesignAnimation ? (
                <div className="w-20 h-20">
                  <Lottie animationData={webDesignAnimation} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
              )}
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
            <div className="mb-20 h-20 flex items-start">
              {orderPackedAnimation ? (
                <div className="w-24 h-24">
                  <Lottie animationData={orderPackedAnimation} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded animate-pulse" />
              )}
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
        </div>
      </RevealOnScroll>

      {/* Slogan Section */}
      <RevealOnScroll delay={0.1}>
        <div className="rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-midnight-monarch text-center">
            Find your best design into us. We guarantee next success is yours!
          </h2>
        </div>
      </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div className="overflow-hidden w-full mb-25" style={{ position: 'relative' }}>
          {/* Left Fog */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'
            }}
          />
          {/* Right Fog */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'
            }}
          />
        <motion.div
          className="flex gap-6"
          style={{
            width: 'max-content',
            willChange: 'transform'
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {/* First set: Rating Card + Testimonials */}
          <>
            {/* Rating Card */}
            <div className="border border-gray-200 rounded-lg p-6 h-[460px] w-[400px] flex flex-col items-center justify-center text-center shrink-0">
              <h1 className="text-8xl font-bold text-midnight-monarch">4.8</h1>
              <div className="flex gap-1 mt-2 justify-center">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text-gray-500 font-bold">200+ Reviews</p>
            </div>
            
            {/* Testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 h-[460px] w-[400px] flex flex-col shrink-0">
                <p className="text-gray-400 text-md font-semibold mb-4">
                  {testimonial.company}
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.comment}"
                </p>
                <div className="mt-auto">
                  <p className="text-midnight-monarch font-bold text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </>

          {/* Second set: Duplicate for seamless loop */}
          <>
            {/* Rating Card */}
            <div className="border border-gray-200 rounded-lg p-6 h-[460px] w-[400px] flex flex-col items-center justify-center text-center shrink-0">
              <h1 className="text-8xl font-bold text-midnight-monarch">4.8</h1>
              <div className="flex gap-1 mt-2 justify-center">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text-gray-500 font-bold">200+ Reviews</p>
            </div>
            
            {/* Testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={`duplicate-${index}`} className="border border-gray-200 rounded-lg p-6 h-[460px] w-[400px] flex flex-col shrink-0">
                <p className="text-gray-400 text-md font-semibold mb-4">
                  {testimonial.company}
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.comment}"
                </p>
                <div className="mt-auto">
                  <p className="text-midnight-monarch font-bold text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </>
        </motion.div>
      </div>
      </RevealOnScroll>

      <Footer />
    </div>
  );
}
