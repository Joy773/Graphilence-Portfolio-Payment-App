"use client";

import React from 'react';
import Image from 'next/image';

const WorkList = () => {
  const workItems = [
    {
      id: 1,
      image: "/work-list/first.avif",
      title: "Tournament - Sport management web app",
      tags: "App Design • Saas Design • UI/UX Design",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      image: "/work-list/second.avif",
      title: "Off-White - Modern fashion web design",
      tags: "E-commerce • Branding • Web Design",
      gradient: "from-purple-300 to-purple-600"
    },
    {
      id: 3,
      image: "/work-list/third.avif",
      title: "Project Title",
      tags: "Category 1 • Category 2 • Category 3",
      gradient: "from-blue-500 to-cyan-500"
    },
  ];

  return (
    <div className="mt-20 lg:mt-32 mb-16">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 lg:mb-16 leading-tight">
        Turn your ideas into{" "}
        <span className="text-gray-600">impactful</span>{" "}
        <span className="text-midnight-monarch">solutions like them!</span>
      </h2>

      {/* Work Grid - 3 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {workItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            {/* Gradient Card with Image */}
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${item.gradient} mb-4`}>
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default WorkList;