"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import HTMLFlipBook from "react-pageflip";
import { useApi, type WorkItem } from "@/contexts/ApiContext";

// Page component with forwardRef for react-pageflip
const FlipPage = React.forwardRef<
  HTMLDivElement,
  { image: string; alt: string }
>(({ image, alt }, ref) => {
  return (
    <div
      ref={ref}
      className="demoPage relative w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 60vw"
          quality={100}
        />
      </div>
    </div>
  );
});

FlipPage.displayName = "FlipPage";

// Blank page component for cover pages
const BlankPage = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="demoPage relative w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        boxSizing: "border-box",
      }}
    />
  );
});

BlankPage.displayName = "BlankPage";

export default function WorkDetail() {
  const params = useParams();
  const workId = params?.slug as string;
  const { fetchWorkById } = useApi();
  const [project, setProject] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<{ pageFlip?: () => { flipNext: (corner?: string) => void; flipPrev: (corner?: string) => void } } | null>(null);

  const totalPages = project?.images?.length ?? 0;

  const goNext = useCallback(() => {
    const flip = flipBookRef.current?.pageFlip?.();
    if (flip?.flipNext) flip.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    const flip = flipBookRef.current?.pageFlip?.();
    if (flip?.flipPrev) flip.flipPrev();
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  useEffect(() => {
    if (!workId) {
      setError("Work ID is missing");
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchWorkById(workId);
        if (result.success && result.data) {
          setProject(result.data);
        } else {
          setError(result.message ?? "Failed to load work");
        }
      } catch (err) {
        console.error("Error fetching work:", err);
        setError("An error occurred while loading the work");
      } finally {
        setLoading(false);
      }
    };
    load();
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [workId, fetchWorkById]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (totalPages === 0) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentPage < totalPages - 1) goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentPage > 0) goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages, currentPage, goNext, goPrev]);

  if (loading) {
    return (
      <div className="w-full min-w-0">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-20">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg">Loading work...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full min-w-0">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-20">
          <Navbar />
          <div className="mt-20 mb-20 text-center">
            <h1 className="text-4xl font-bold text-midnight-monarch mb-4">
              {error || 'Project Not Found'}
            </h1>
            <Link href="/work" className="text-purplish-blue hover:underline">
              Back to Work
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="max-w-[1400px] mx-auto px-10 lg:px-20">
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
                    {project.clientName || project.title.split(" - ")[0] || "Company Name"}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    CATEGORY
                  </h3>
                  <p className="text-lg font-semibold text-midnight-monarch">
                    {project.keywords && project.keywords.length > 0 ? project.keywords[0] : "Web/App Design"}
                  </p>
                </div>

                {/* Live View */}
                {project.projectUrl && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      LIVE VIEW
                    </h3>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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
                )}

                {/* Service We Provided */}
                {project.keywords && project.keywords.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      SERVICE WE PROVIDED
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share this Case Study */}
                <div>
                  <h3 className="text-sm font-semibold text-black mb-4">
                    Share this Case Study:
                  </h3>
                  <div className="flex gap-3">
                    {/* Facebook */}
                    <a
                      href={currentUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <span className="text-black font-bold text-sm">f</span>
                    </a>
                    {/* Twitter/X */}
                    <a
                      href={currentUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(project.title)}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      href={currentUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <span className="text-black font-bold text-xs">in</span>
                    </a>
                    {/* WhatsApp */}
                    <a
                      href={currentUrl ? `https://wa.me/?text=${encodeURIComponent(project.title + ' ' + currentUrl)}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
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
              {project.sections && project.sections.length > 0 && project.sections[0].content && (
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed md:hidden mb-0">
                  {project.sections[0].content.substring(0, 100)}...
                </p>
              )}
            </div>

            {/* Project Images - Flipbook */}
            {project.images && project.images.length > 0 && (
              <div className="relative w-full mt-8 mb-8 flex flex-col justify-center items-center px-4">
                <div className="w-full flex justify-center cursor-grab active:cursor-grabbing">
                  <style jsx global>{`
                    .flipbook-container {
                      margin: 0 auto;
                      will-change: transform;
                      border-radius: 0.5rem;
                      box-shadow:
                        2px 2px 4px rgba(0,0,0,0.06),
                        6px 8px 16px rgba(0,0,0,0.08),
                        14px 18px 32px rgba(0,0,0,0.1);
                    }
                    .flipbook-container .stf__block {
                      background: transparent;
                    }
                    .flipbook-container .stf__item {
                      background: transparent;
                      border-radius: 0;
                      overflow: hidden;
                      transition: box-shadow 0.2s ease;
                    }
                    .flipbook-container .stf__item--hard,
                    .flipbook-container .stf__item--odd,
                    .flipbook-container .stf__item--even {
                      background: transparent;
                    }
                    .flipbook-container .stf__wrapper {
                      transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                  `}</style>
                  <HTMLFlipBook
                    ref={flipBookRef}
                    width={500}
                    height={700}
                    minWidth={300}
                    maxWidth={900}
                    minHeight={450}
                    maxHeight={1200}
                    size="stretch"
                    maxShadowOpacity={0.4}
                    showCover={false}
                    mobileScrollSupport={true}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={550}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={20}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    onFlip={onFlip}
                    className="flipbook-container"
                    style={{ margin: "0 auto" }}
                  >
                    {project.images.map((image, index) => (
                      <FlipPage
                        key={index}
                        image={image}
                        alt={`${project.title} - Image ${index + 1}`}
                      />
                    ))}
                  </HTMLFlipBook>
                </div>
                {/* Navigation and page indicator - under the book */}
                <div className="flex items-center justify-center gap-4 mt-6 w-full max-w-[500px]">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentPage <= 0}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-midnight-monarch hover:text-white text-midnight-monarch disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-midnight-monarch transition-all duration-200 shadow-sm"
                    aria-label="Previous page"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-600 min-w-[80px] text-center">
                    {currentPage + 1} / {project.images.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentPage >= project.images.length - 1}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-midnight-monarch hover:text-white text-midnight-monarch disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-midnight-monarch transition-all duration-200 shadow-sm"
                    aria-label="Next page"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">Use arrows or swipe to flip • Keyboard: ← →</p>
              </div>
            )}

            {/* Dynamic Sections from Database */}
            {project.sections && project.sections.length > 0 ? (
              <div className="space-y-12">
                {project.sections.map((section, index) => (
                  <div key={index} className="max-w-4xl">
                    {section.heading && (
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-monarch mb-4">
                        {section.heading}
                      </h2>
                    )}
                    {section.content && (
                      <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {section.content.split('\n').map((paragraph, pIndex) => (
                          paragraph.trim() && (
                            <p key={pIndex} className="mb-6">
                              {paragraph}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-4xl">
                <p className="text-lg text-gray-600">No content available for this project.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>
      <Footer />
    </div>
  );
}

