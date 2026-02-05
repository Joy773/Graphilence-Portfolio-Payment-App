"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useApi, type BlogPost } from "@/contexts/ApiContext";
import { founderImages } from "@/contexts/assets";

const Page = () => {
  const { fetchBlogPosts } = useApi();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchBlogPosts();
        if (result.success && result.data) {
          setBlogs(result.data);
        } else {
          setError(result.message ?? "Failed to load blog posts");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("An error occurred while loading blogs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchBlogPosts]);

  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic')

  const topicLinks = [
    { label: 'All topics', href: '/blog', slug: null },
    { label: 'Design Process', href: '/blog?topic=design-process', slug: 'design-process' },
    { label: 'Hiring designer', href: '/blog?topic=hiring-designer', slug: 'hiring-designer' },
    { label: 'SaaS product', href: '/blog?topic=saas-product', slug: 'saas-product' },
    { label: 'Web design & Dev', href: '/blog?topic=web-design-dev', slug: 'web-design-dev' },
    { label: 'Product design', href: '/blog?topic=product-design', slug: 'product-design' },
  ]

  const headingLabel = topicLinks.find((t) => t.slug === topicParam)?.label ?? 'All Topics'

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870] px-10 lg:px-20'>
      <Navbar variant="gradient" />
      <div className='mt-20 mb-20 flex flex-col lg:flex-row gap-10 lg:gap-12'>
        {/* Left sidebar - topic nav */}
        <aside className='w-full lg:w-64 shrink-0 bg-[#2d2648] rounded-xl p-6 lg:p-8 h-fit border border-white/10'>
          <nav className='space-y-5'>
            {topicLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='block text-white font-medium text-base hover:text-white/80 transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className='border-t border-gray-600 my-6 w-full' />
          <p className='text-gray-400 text-xs font-medium uppercase tracking-wide mb-5'>
            Explore More
          </p>
          <nav className='space-y-5'>
            <Link
              href='/work'
              className='block text-white font-medium text-base hover:text-white/80 transition-colors'
            >
              Case Study
            </Link>
            <Link
              href='/about'
              className='block text-white font-medium text-base hover:text-white/80 transition-colors'
            >
              About Us
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className='flex-1 min-w-0'>
          <h1 className='text-5xl lg:text-6xl font-bold text-white text-left mb-12'>
            {headingLabel}
          </h1>

          {loading && (
            <div className='flex justify-center items-center py-24'>
              <div className='loader' aria-label='Loading blog posts' />
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-12">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/80">No blog posts available yet.</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog) => {
              const dateLabel = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
                : '';
              return (
                <Link
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  className="group flex flex-col h-full"
                >
                  <article className="flex flex-col h-full rounded-2xl overflow-hidden bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    {/* Image area with gradient + badges overlay */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">
                      {blog.images && blog.images.length > 0 ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {/* Category and date pills on image */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-[#786C8F]/95 text-[#D1D1D1] text-sm font-medium shadow-sm">
                          Design Process
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#786C8F]/95 text-[#D1D1D1] text-sm font-medium shadow-sm">
                          {dateLabel}
                        </span>
                      </div>
                    </div>

                    {/* Author and read time */}
                    <div className="px-5 pt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex-shrink-0 overflow-hidden">
                          <Image
                            src={founderImages.one}
                            alt="Vlad Gavriluk"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white text-sm font-medium truncate">Vlad Gavriluk</span>
                      </div>
                      <span className="text-gray-400 text-sm flex-shrink-0 border-l border-white/20 pl-3">30 MIN READ</span>
                    </div>

                    {/* Title */}
                    <div className="p-5 pt-2 flex-1">
                      <h2 className="text-lg font-bold text-white leading-snug line-clamp-3 group-hover:text-white/90 transition-colors">
                        {blog.title}
                      </h2>
                    </div>
                  </article>
                </Link>
              );
            })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
};
export default Page;    
