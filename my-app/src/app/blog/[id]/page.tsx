"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useApi, type BlogPost } from "@/contexts/ApiContext";
import { blogIcons } from "@/contexts/assets";

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { fetchBlogPostById } = useApi();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    const id = params.id as string;
    if (!id) {
      setError("Blog post ID is missing");
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchBlogPostById(id);
        if (result.success && result.data) {
          setBlog(result.data);
        } else {
          setError(result.message ?? "Failed to load blog post");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("An error occurred while loading the blog post");
      } finally {
        setLoading(false);
      }
    };
    load();
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [params.id, fetchBlogPostById]);

  if (loading) {
    return (
      <div className="w-full min-w-0">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-20 min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870]">
          <Navbar variant="gradient" />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/80 text-lg">Loading blog post...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full min-w-0">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-20 min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870]">
          <Navbar variant="gradient" />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-200 text-lg mb-4">{error || 'Blog post not found'}</p>
              <Link 
                href="/blog"
                className="text-white/90 hover:text-white underline"
              >
                ← Back to Blog Posts
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate reading time (approximate: 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  const totalContent = blog.sections?.map(s => s.content || '').join(' ') || '';
  const readingTime = calculateReadingTime(totalContent);
  const titleUppercase = blog.title.toUpperCase();

  return (
    <div className="w-full min-w-0">
      <div className="max-w-[1400px] mx-auto px-10 lg:px-20 pt-0 min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870]">
      <Navbar variant="gradient" />
      <div className='mt-0 mb-20'>
        {/* Title hero - gradient, breadcrumb, title, meta (match reference image) */}
        <div className="bg-gradient-to-r from-[#2d2648] to-[#251870] -mx-10 lg:-mx-20 -mt-2 px-10 lg:px-20 py-10 lg:py-14 mb-10">
          <div className="w-full max-w-6xl">
            <nav className="text-white/70 text-sm mb-5">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
              <span className="mx-2">/</span>
              <span className="text-white/90 truncate max-w-full inline-block align-bottom" title={blog.title}>
                {titleUppercase}
              </span>
            </nav>
            <h1 className="text-4xl sm:text-5xl lg:text-[80px] font-bold text-white leading-tight mb-5">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-left">
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium">
              Design Process
            </span>
            <span className="text-white/60">•</span>
            <span className="text-white/90 text-sm">{readingTime} MIN READ</span>
            <span className="text-white/60">•</span>
            <div className="flex items-center gap-4">
              <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="relative w-6 h-6 flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-90" aria-label="ChatGPT">
                <Image src={blogIcons.chatGpt} alt="ChatGPT" width={24} height={24} className="object-contain w-6 h-6" />
              </a>
              <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="relative w-6 h-6 flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-90" aria-label="Perplexity AI">
                <Image src={blogIcons.ai} alt="AI" width={24} height={24} className="object-contain w-6 h-6" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="relative w-6 h-6 flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-90" aria-label="Google">
                <Image src={blogIcons.google} alt="Google" width={24} height={24} className="object-contain w-6 h-6" />
              </a>
            </div>
          </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-24 space-y-8">
              {/* Back Link */}
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Blog Posts</span>
              </Link>

              {/* Author */}
              <div>
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  AUTHOR
                </h3>
                <p className="text-lg font-semibold text-white">
                  Graphilence
                </p>
              </div>

              {/* Published Date */}
              {blog.createdAt && (
                <div>
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    PUBLISHED
                  </h3>
                  <p className="text-lg font-semibold text-white">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {/* Reading Time */}
              <div>
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  READING TIME
                </h3>
                <p className="text-lg font-semibold text-white">
                  {readingTime} {readingTime === 1 ? 'Minute' : 'Minutes'}
                </p>
              </div>

              {/* Share this Blog Post */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Share this Blog Post:
                </h3>
                <div className="flex gap-3">
                  {/* Facebook */}
                  <a
                    href={currentUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white"
                    aria-label="Share on Facebook"
                  >
                    <span className="text-white font-bold text-sm">f</span>
                  </a>
                  {/* Twitter/X */}
                  <a
                    href={currentUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white"
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
                      className="text-white"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={currentUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="text-white font-bold text-xs">in</span>
                  </a>
                  {/* WhatsApp */}
                  <a
                    href={currentUrl ? `https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + currentUrl)}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white"
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
                      className="text-white"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area - Blog Content */}
          <div className="lg:col-span-3">
            {/* Blog Hero Images */}
            {blog.images && blog.images.length > 0 && (
              <div className="relative w-full mt-8 mb-12 flex justify-center items-center">
                {blog.images.length === 1 ? (
                  <div className="relative w-full sm:w-[800px] md:w-[1000px] lg:w-[1200px] aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200" style={{ minHeight: '500px' }}>
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 800px, (max-width: 1024px) 1000px, (max-width: 1280px) 1200px, 1200px"
                      priority
                      quality={100}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {blog.images.slice(0, 2).map((image, index) => (
                      <div key={index} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                        <Image
                          src={image}
                          alt={`${blog.title} - Image ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blog Sections */}
            {blog.sections && blog.sections.length > 0 ? (
              <div 
                className="space-y-12 text-zinc-200"
                style={{
                  fontFamily: blog.fontStyle || 'Arial, sans-serif'
                }}
              >
                {blog.sections.map((section, index) => (
                  <div key={index} className="max-w-4xl">
                    {section.heading && (
                      <h2 
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
                        style={{
                          fontFamily: blog.fontStyle || 'Arial, sans-serif'
                        }}
                      >
                        {section.heading}
                      </h2>
                    )}
                    {section.content && (
                      <div 
                        className="text-lg leading-relaxed whitespace-pre-wrap text-zinc-200"
                        style={{
                          fontFamily: blog.fontStyle || 'Arial, sans-serif'
                        }}
                      >
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
              <div className="text-center py-12">
                <p className="text-white/70">No content available for this blog post.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
