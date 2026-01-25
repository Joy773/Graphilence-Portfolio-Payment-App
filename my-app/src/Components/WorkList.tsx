"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from './RevealOnScroll';

interface WorkItem {
  _id: string;
  title: string;
  clientName?: string;
  projectUrl?: string;
  keywords: string[];
  images: string[];
  sections: Array<{ heading?: string; content?: string }>;
  createdAt: string;
}

const WorkList = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gradient colors for cards
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-purple-300 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
  ];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/works');
        const result = await response.json();

        if (result.success) {
          setWorkItems(result.data);
        } else {
          setError('Failed to load works');
        }
      } catch (err) {
        console.error('Error fetching works:', err);
        setError('An error occurred while loading works');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // Get description from first section's content
  const getDescription = (work: WorkItem) => {
    if (work.sections && work.sections.length > 0 && work.sections[0].content) {
      return work.sections[0].content.substring(0, 120) + (work.sections[0].content.length > 120 ? '...' : '');
    }
    return "A creative project showcasing innovative design solutions that drive business growth and user satisfaction";
  };

  // Format keywords as string with bullet separator
  const formatTags = (keywords: string[]) => {
    if (!keywords || keywords.length === 0) return "Design • Development • Creative";
    return keywords.join(" • ");
  };

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
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading works...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Work Grid - 3 cards per row */}
      {!loading && !error && workItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workItems.map((item, index) => {
            const gradient = gradients[index % gradients.length];
            return (
              <RevealOnScroll key={item._id} delay={index * 0.1}>
                <div className="flex flex-col group">
                {/* Gradient Card with Image */}
                <Link href={`/work/${item._id}`}>
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${gradient} mb-4 cursor-pointer`}>
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3]">
                      {item.images && item.images.length > 0 ? (
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/20 rounded-2xl">
                          <span className="text-white/70 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                      <div className="text-center text-white">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                          {getDescription(item)}
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
                    {formatTags(item.keywords)}
                  </p>
                </div>
              </div>
              </RevealOnScroll>
            );
          })}
        </div>
      )}

      {!loading && !error && workItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No works available yet.</p>
        </div>
      )}
    </div>
  );
};

export default WorkList;