"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { motion, useMotionValue, animate } from "motion/react";
import RevealOnScroll from "@/Components/RevealOnScroll";
import Lottie from "lottie-react";
import { useApi, type WorkItem } from "@/contexts/ApiContext";
import { animatedLogos, servicesImages, testimonials } from "@/contexts/assets";

const Campany = dynamic(() => import("@/Components/campany").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] w-full animate-pulse rounded-xl bg-gray-100/60" />
  ),
});

export default function Services() {
  const { fetchWorks } = useApi();
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rocketAnimation, setRocketAnimation] = useState<any>(null);
  const [webDesignAnimation, setWebDesignAnimation] = useState<any>(null);
  const [orderPackedAnimation, setOrderPackedAnimation] = useState<any>(null);

  const CARD_WIDTH = 400;
  const GAP = 24;
  const SLIDE_STEP = CARD_WIDTH + GAP;
  const totalSlides = 1 + testimonials.length;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselX = useMotionValue(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchWorks();
        if (result.success && result.data) {
          const featuredWorks = result.data
            .filter((work) => work.featured === true)
            .slice(0, 6);
          setWorks(featuredWorks);
        }
      } catch (err) {
        console.error("Error fetching works:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchWorks]);

  useEffect(() => {
    // Load Lottie animations
    const loadAnimations = async () => {
      try {
        const [rocket, webDesign, orderPacked] = await Promise.all([
          fetch(animatedLogos.rocket).then((res) => res.json()),
          fetch(animatedLogos.webDesign).then((res) => res.json()),
          fetch(animatedLogos.orderPacked).then((res) => res.json()),
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
    return servicesImages.screenImg;
  };

  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      {/* Hero Banner Section */}
      <RevealOnScroll>
        <div className="mt-0 md:mt-0 mb-12 -mx-10 lg:-mx-20 bg-midnight-monarch px-10 lg:px-20 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="flex-1 w-full lg:max-w-2xl">
              {/* Clutch Rating Badge */}
              <div className="mt-2 md:mt-0 mb-4 md:mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg ">
                  <span className="text-white font-medium">Fiverr</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-[#FFB800] shrink-0" />
                    ))}
                  </div>
                  <span className="text-white font-medium">4.8</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
                Digital product &<br />
                UI UX design<br />
                services
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 mb-4 md:mb-6 leading-relaxed">
                Are you struggling to turn your ideas into something users love? Wavespace designs digital products for the US, UK, Europe, and Central Asia that are clean, fast, and ready to develop, built with smart UX and clean UI.
              </p>

              {/* Quote */}
              <p className="text-base md:text-lg text-gray-300 italic mb-6 md:mb-8">
                &ldquo;Design is the bridge between user intent and product impact..&rdquo;
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="group relative bg-purplish-blue cursor-pointer text-white font-semibold py-3 pl-6 pr-10 rounded-full transition-colors whitespace-nowrap flex items-center gap-2"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <span>Consult an expert</span>
                  <div className="absolute right-2 w-6 h-6 flex items-center justify-center">
                    <motion.div
                      variants={{
                        rest: { 
                          x: 0, 
                          y: 0,
                        },
                        hover: { 
                          x: [0, 3, -3, 0],
                          y: [0, -3, 3, 0],
                          transition: { 
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        },
                      }}
                    >
                      <MdArrowOutward className="text-white" size={18} />
                    </motion.div>
                  </div>
                </motion.button>
                <button className="bg-transparent cursor-pointer border border-white/40 hover:border-white text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                  View work
                </button>
              </div>
            </div>

            {/* Right Side - Screen Image (top on mobile, right on desktop) */}
            <div className="flex flex-1 w-full lg:w-auto justify-center lg:justify-end lg:items-center">
              <div className="relative w-full max-w-lg lg:max-w-2xl lg:-mt-4">
                <Image
                  src={servicesImages.screenImg}
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
                src={servicesImages.uiUx}
                alt="Mobile app UI/UX design"
                width={400}
                height={800}
                className="w-full h-auto object-contain rounded-xl"

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
                src={servicesImages.webDev}
                alt="Web design laptop"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
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
            <p className="text-lg md:text-xltext-3xl sm:text-4xl md:text-5xl text-midnight-monarch lg:text-6xl font-bold leading-tight mb-2">
              across globally
            </p>
          </div>
          <motion.button
            className="bg-midnight-monarch hover:bg-purplish-blue cursor-pointer text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap"
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            Consult an expert
            <motion.span
              variants={{
                rest: { 
                  x: 0, 
                  y: 0,
                },
                hover: { 
                  x: [0, 3, -3, 0],
                  y: [0, -3, 3, 0],
                  transition: { 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                },
              }}
              className="flex items-center"
            >
              <MdArrowOutward className="text-white" size={18} />
            </motion.span>
          </motion.button>
        </div>

        {/* Six Images Grid - 3 per row */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="loader" aria-label="Loading works" />
          </div>
        )}

        {!loading && works.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            {works.map((work, index) => (
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
            ))}
          </div>
        )}
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
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-midnight-monarch">
              we support them
            </p>
          </div>
          <motion.button
            className="bg-midnight-monarch hover:bg-purplish-blue cursor-pointer text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap"
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            Start your project
            <motion.span
              variants={{
                rest: { 
                  x: 0, 
                  y: 0,
                },
                hover: { 
                  x: [0, 3, -3, 0],
                  y: [0, -3, 3, 0],
                  transition: { 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                },
              }}
              className="flex items-center"
            >
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
            </motion.span>
          </motion.button>
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
        <div className="overflow-hidden w-full mb-25 select-none" style={{ position: 'relative' }}>
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
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          style={{
            width: 'max-content',
            willChange: 'transform',
            x: carouselX,
          }}
          drag="x"
          dragConstraints={{
            left: -(totalSlides - 1) * SLIDE_STEP,
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            const currentX = carouselX.get();
            const newIndex = Math.round(-currentX / SLIDE_STEP);
            const clamped = Math.max(0, Math.min(totalSlides - 1, newIndex));
            setCarouselIndex(clamped);
            animate(carouselX, -clamped * SLIDE_STEP, {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            });
          }}
        >
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
        </motion.div>
      </div>
      </RevealOnScroll>

      <Footer />
    </div>
  );
}
