"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/Components/RevealOnScroll";
import { useApi, type WorkItem } from "@/contexts/ApiContext";

const SendQuery = dynamic(() => import("@/Components/SendQuery").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] w-full animate-pulse rounded-xl bg-gray-100/60" />
  ),
});

export default function Work() {
  const { fetchWorks } = useApi();
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchWorks();
        if (result.success && result.data) {
          setWorkItems(result.data);
        } else {
          setError(result.message ?? "Failed to load works");
        }
      } catch (err) {
        console.error("Error fetching works:", err);
        setError("An error occurred while loading works");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchWorks]);

  // Get description from first section's content, or use a default
  const getDescription = (work: WorkItem) => {
    if (work.sections && work.sections.length > 0 && work.sections[0].content) {
      return work.sections[0].content.substring(0, 100) + (work.sections[0].content.length > 100 ? '...' : '');
    }
    return "A creative project showcasing innovative design solutions";
  };

  return (
    <div className="px-10 lg:px-20">
      <Navbar />

      {/* Work Grid Section - loader from globals.css until data is fetched */}
      <div className="mt-20 lg:mt-18">
        {loading && (
          <div className="flex justify-center items-center py-24" aria-label="Loading works">
            <div className="loader" />
          </div>
        )}

        {!loading && (
          <>
            {/* Heading */}
            <RevealOnScroll>
              <div className="lg:w-1/2 mb-12 lg:mb-16 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-midnight-monarch">Our Case Study</span>{" "}
                </h2>
                <p className="text-gray-600 mt-4">An Experience design agency building high-end products and experiences that grow your business exponentially.</p>
              </div>
            </RevealOnScroll>

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!error && workItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No works available yet.</p>
              </div>
            )}

            {/* Work Grid - 3 cards per row */}
            {!error && workItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {workItems.map((item, index) => (
                  <RevealOnScroll key={item._id} delay={index * 0.1}>
                    <div className="flex flex-col group">
                      <Link href={`/work/${item._id}`}>
                        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-4 cursor-pointer bg-gray-200">
                          {item.images && item.images.length > 0 ? (
                            <Image
                              src={item.images[0]}
                              alt={item.title}
                              fill
                              className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl">
                              <span className="text-gray-400 text-sm">No Image</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="text-midnight-monarch">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-600 mb-4">
                          {getDescription(item)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.keywords && item.keywords.length > 0 ? (
                            item.keywords.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                              Design
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-20">
          <SendQuery />
        </div>
      </div>

      <Footer />
    </div>
  );
}

