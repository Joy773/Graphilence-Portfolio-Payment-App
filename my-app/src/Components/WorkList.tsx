"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from './RevealOnScroll';

const WorkList = () => {
  const workItems = [
    {
      id: 1,
      image: "/work-list/first.avif",
      title: "Tournament - Sport management web app",
      description: "User-centric website design for sport management services that streamline tournament organization and enhance user engagement",
      tags: "App Design • Saas Design • UI/UX Design",
      gradient: "from-purple-500 to-pink-500",
      slug: "tournament"
    },
    {
      id: 2,
      image: "/work-list/second.avif",
      title: "Off-White - Modern fashion web design",
      description: "E-commerce platform design for modern fashion brand that combines aesthetics with functionality for seamless shopping experience",
      tags: "E-commerce • Branding • Web Design",
      gradient: "from-purple-300 to-purple-600",
      slug: "off-white"
    },
    {
      id: 3,
      image: "/work-list/third.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions that drive business growth and user satisfaction",
      tags: "Category 1 • Category 2 • Category 3",
      gradient: "from-blue-500 to-cyan-500",
      slug: "project-3"
    },
    {
      id: 4,
      image: "/work-list/fourth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions that drive business growth and user satisfaction",
      tags: "Category 1 • Category 2 • Category 3",
      gradient: "from-green-500 to-emerald-500",
      slug: "project-4"
    },
    {
      id: 5,
      image: "/work-list/fifth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions that drive business growth and user satisfaction",
      tags: "Category 1 • Category 2 • Category 3",
      gradient: "from-orange-500 to-red-500",
      slug: "project-5"
    },
    {
      id: 6,
      image: "/work-list/sixth.avif",
      title: "Project Title",
      description: "Description for project showcasing innovative design solutions that drive business growth and user satisfaction",
      tags: "Category 1 • Category 2 • Category 3",
      gradient: "from-indigo-500 to-purple-500",
      slug: "project-6"
    },
  ];

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      {/* Heading */}
      <RevealOnScroll>
        <div className='w-full flex justify-center'>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 lg:mb-16 leading-tight text-center lg:w-2/3">
            <span className="text-midnight-monarch">Turn your ideas into</span>{" "}
            <span className="text-gray-600">impactful</span>{" "}
            <span className="text-midnight-monarch">solutions like them!</span>
          </h2>
        </div>
      </RevealOnScroll>
      {/* Work Grid - 3 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {workItems.map((item, index) => (
          <RevealOnScroll key={item.id} delay={index * 0.1}>
            <div className="flex flex-col group">
            {/* Gradient Card with Image */}
            <Link href={`/work/${item.slug}`}>
              <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${item.gradient} mb-4 cursor-pointer`}>
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                  <div className="text-center text-white">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Title and Tags - Below gradient card on white background */}
            <div className="text-midnight-monarch">
              <h3 className="text-lg lg:text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-sm lg:text-base text-gray-600">
                {item.tags}
              </p>
            </div>
          </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default WorkList;