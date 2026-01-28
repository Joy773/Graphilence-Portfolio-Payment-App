"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface BlogSection {
  heading?: string;
  content?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  images: string[];
  sections: BlogSection[];
  fontColor?: string;
  fontStyle?: string;
  createdAt: string;
  updatedAt: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const id = params.id as string;
        
        if (!id) {
          setError('Blog post ID is missing');
          return;
        }

        console.log('Fetching blog with ID:', id);
        const response = await fetch(`/api/blog-posts/${id}`);
        const result = await response.json();

        console.log('API Response:', result);

        if (result.success) {
          setBlog(result.data);
        } else {
          setError(result.message || 'Failed to load blog post');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('An error occurred while loading the blog post');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
      // Set current URL for sharing
      if (typeof window !== 'undefined') {
        setCurrentUrl(window.location.href);
      }
    } else {
      setError('Blog post ID is missing');
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className='px-10 lg:px-20'>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className='px-10 lg:px-20'>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Blog post not found'}</p>
            <Link 
              href="/blog"
              className="text-midnight-monarch hover:text-orange-500 underline"
            >
              ← Back to Blog Posts
            </Link>
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

  return (
    <div className='px-10 lg:px-20'>
      <Navbar />
      <div className='mt-20 mb-20'>
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 lg:sticky lg:top-24 space-y-8">
              {/* Back Link */}
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-midnight-monarch hover:text-orange-500 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Blog Posts</span>
              </Link>

              {/* Author */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  AUTHOR
                </h3>
                <p className="text-lg font-semibold text-midnight-monarch">
                  Graphilence
                </p>
              </div>

              {/* Published Date */}
              {blog.createdAt && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    PUBLISHED
                  </h3>
                  <p className="text-lg font-semibold text-midnight-monarch">
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
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  READING TIME
                </h3>
                <p className="text-lg font-semibold text-midnight-monarch">
                  {readingTime} {readingTime === 1 ? 'Minute' : 'Minutes'}
                </p>
              </div>

              {/* Share this Blog Post */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-4">
                  Share this Blog Post:
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
                    href={currentUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}` : '#'}
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
                    href={currentUrl ? `https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + currentUrl)}` : '#'}
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

          {/* Right Content Area - Blog Content */}
          <div className="lg:col-span-3">
            {/* Blog Title */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch mb-0 leading-tight">
                {blog.title}
              </h1>
            </div>

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
                className="space-y-12"
                style={{
                  color: blog.fontColor || '#000000',
                  fontFamily: blog.fontStyle || 'Arial, sans-serif'
                }}
              >
                {blog.sections.map((section, index) => (
                  <div key={index} className="max-w-4xl">
                    {section.heading && (
                      <h2 
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                        style={{
                          color: blog.fontColor || '#1a1a2e',
                          fontFamily: blog.fontStyle || 'Arial, sans-serif'
                        }}
                      >
                        {section.heading}
                      </h2>
                    )}
                    {section.content && (
                      <div 
                        className="text-lg leading-relaxed whitespace-pre-wrap"
                        style={{
                          color: blog.fontColor || '#4b5563',
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
                <p className="text-gray-600">No content available for this blog post.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
