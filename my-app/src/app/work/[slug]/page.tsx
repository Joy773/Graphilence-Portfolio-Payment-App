"use client";

import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import HTMLFlipBook from "react-pageflip";

// Page component with forwardRef for react-pageflip
const FlipPage = React.forwardRef<
  HTMLDivElement,
  { image: string; alt: string }
>(({ image, alt }, ref) => {
  return (
    <div
      ref={ref}
      className="demoPage relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover rounded-2xl"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority
        quality={100}
      />
    </div>
  );
});

FlipPage.displayName = "FlipPage";

// Blank page component for single-page mode
const BlankPage = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="demoPage relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
});

BlankPage.displayName = "BlankPage";

export default function WorkDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const workItems = [
    {
      id: 1,
      image: "/work-list/first.avif",
      title: "Tournament - Sport management web app",
      description: "User-centric website design for sport management services",
      tags: ["App Design", "Saas Design", "UI/UX Design"],
      slug: "tournament",
    },
    {
      id: 2,
      image: "/work-list/second.avif",
      title: "Off-White - Modern fashion web design",
      description: "E-commerce platform design for modern fashion brand",
      tags: ["E-commerce", "Branding", "Web Design"],
      slug: "off-white",
    },
    {
      id: 3,
      image: "/work-list/third.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions",
      tags: ["Category 1", "Category 2", "Category 3"],
      slug: "project-3",
    },
    {
      id: 4,
      image: "/work-list/fourth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions",
      tags: ["Category 1", "Category 2", "Category 3"],
      slug: "project-4",
    },
    {
      id: 5,
      image: "/work-list/fifth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions",
      tags: ["Category 1", "Category 2", "Category 3"],
      slug: "project-5",
    },
    {
      id: 6,
      image: "/work-list/sixth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions",
      tags: ["Category 1", "Category 2", "Category 3"],
      slug: "project-6",
    },
  ];

  const project = workItems.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="px-10 lg:px-20">
        <Navbar />
        <div className="mt-20 mb-20 text-center">
          <h1 className="text-4xl font-bold text-midnight-monarch mb-4">Project Not Found</h1>
          <Link href="/work" className="text-purplish-blue hover:underline">
            Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      
      {/* Project Detail Section */}
      <div className="mt-20 mb-20">
        {/* Back Button */}
        <Link 
          href="/work" 
          className="inline-flex items-center gap-2 text-midnight-monarch hover:text-purplish-blue mb-8 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Work
        </Link>

        {/* Main Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Project Details */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 sticky top-20">
              <div className="space-y-6">
                {/* Company */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    COMPANY
                  </h3>
                  <p className="text-lg font-semibold text-midnight-monarch">
                    {project.title.split(" - ")[0] || "Company Name"}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    CATEGORY
                  </h3>
                  <p className="text-lg font-semibold text-midnight-monarch">
                    {project.tags[0] || "Web/App Design"}
                  </p>
                </div>

                {/* Live View */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    LIVE VIEW
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-midnight-monarch hover:text-purplish-blue transition-colors"
                  >
                    Visit Website
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                {/* Timelines */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    TIMELINES
                  </h3>
                  <p className="text-lg font-semibold text-midnight-monarch">
                    3 Months
                  </p>
                </div>

                {/* Service We Provided */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    SERVICE WE PROVIDED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share this Case Study */}
                <div>
                  <h3 className="text-sm font-semibold text-black mb-4">
                    Share this Case Study:
                  </h3>
                  <div className="flex gap-3">
                    {/* Facebook */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <span className="text-black font-bold text-sm">f</span>
                    </a>
                    {/* Twitter/X */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <span className="text-black font-bold text-xs">in</span>
                    </a>
                    {/* WhatsApp */}
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area - Project Image and Details */}
          <div className="lg:col-span-3">
            {/* Project Title */}
            <div className="mb-0 -mb-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch mb-0 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed md:hidden mb-0">
                {project.description}
              </p>
            </div>

            {/* Project Image */}
            <div className="relative w-full mt-8 mb-8 flex justify-center items-center px-4">
              <div className="relative w-full sm:w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] aspect-[4/3] rounded-2xl overflow-hidden" style={{ minHeight: '500px' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 800px, (max-width: 1024px) 1000px, (max-width: 1280px) 1200px, 1400px"
                  priority
                  quality={100}
                />
              </div>
            </div>

            {/* About The Project Section */}
            <div className="max-w-4xl mb-12">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch block mb-4">About The Project</p>
                This project represents a comprehensive design solution that combines innovative user experience design with modern web technologies. Our team worked closely with the client to understand their vision and translate it into a functional, beautiful, and user-friendly digital experience. 
            </div>

            {/* Objectives Section */}
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">Objectives</h1>
              <p className="text-lg text-gray-600 leading-relaxed">The client wanted a website for Recharge IV that makes booking door-to-door drip therapies effortless. They emphasized the importance of keeping the design consistent even when adding new drip and wellness products.</p>
            </div>
{/* Requirements Section */}
            <div className="max-w-4xl mt-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">Requirements</h2>
              <p className="text-lg text-gray-600 leading-relaxed">The drip booking should be straightforward and swift, avoiding unnecessary steps for users. Additionally, they want the ability to update the site with new content easily, minimizing the need for frequent designer involvement.</p>
            </div>

            {/* Styled Guide Section */}
            <div className="max-w-4xl mt-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">Styled Guide</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The style guide establishes a cohesive visual identity for the project, ensuring consistency across all design elements. It defines typography scales, color palettes, spacing systems, and component specifications that guide the overall aesthetic and user experience.
              </p>
            </div>

            {/* Icons and Illustrations Section */}
            <div className="max-w-4xl mt-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">Icons and illustrations</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The icons and illustrations used throughout the project are carefully crafted to maintain visual consistency and enhance user understanding. Each icon follows a unified design language, while illustrations serve to communicate complex concepts in an accessible and engaging manner.
              </p>
            </div>

            {/* Responsiveness Section */}
            <div className="max-w-4xl mt-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">Responsiveness</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The design has been carefully optimized for all device sizes, ensuring a seamless user experience across desktop, tablet, and mobile devices. The responsive layout adapts fluidly to different screen dimensions, maintaining visual hierarchy and functionality across all breakpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

