"use client";

import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import SendQuery from "@/Components/SendQuery";
import RevealOnScroll from "@/Components/RevealOnScroll";

export default function Work() {
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

  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      
      {/* Work Grid Section */}
      <div className="mt-20 lg:mt-18 mb-20">
        {/* Heading */}
        <RevealOnScroll>
          <div className="lg:w-1/2 mb-12 lg:mb-16 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-midnight-monarch">Our Case Study</span>{" "}
            </h2>
            <p className="text-gray-600 mt-4">An Experience design agency building high-end products and experiences that grow your business exponentially.</p>
          </div>
        </RevealOnScroll>

        {/* Work Grid - 3 cards per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workItems.map((item, index) => (
            <RevealOnScroll key={item.id} delay={index * 0.1}>
              <div className="flex flex-col group">
              {/* Image Container - Wrapped in Link */}
              <Link href={`/work/${item.slug}`}>
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-4 cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>

              {/* Title, Description and Tags */}
              <div className="text-midnight-monarch">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-20">
            <SendQuery />
        </div>
      </div>

      <Footer />
    </div>
  );
}

