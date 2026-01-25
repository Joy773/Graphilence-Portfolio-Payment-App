"use client";

import React, { useEffect, useState } from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'      
import Link from 'next/link'     
import Image from 'next/image' 

interface BlogPost {
  _id: string;
  title: string;
  images: string[];
  createdAt: string;
}

const Page = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Colorful backgrounds cycling through different colors
  const backgroundColors = [
    'bg-green-200', // Mint green
    'bg-red-200',   // Coral red
    'bg-yellow-200', // Bright yellow
    'bg-blue-200',  // Blue
    'bg-purple-200', // Purple
    'bg-pink-200',  // Pink
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog-posts');
        const result = await response.json();

        if (result.success) {
          setBlogs(result.data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An error occurred while loading blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className='px-10 lg:px-20'>   
      <Navbar />
      <div className='mt-20 mb-20'>
        <h1 className='text-4xl font-bold text-midnight-monarch text-center mb-12'>
          Graphilence Blog Posts
        </h1>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available yet.</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, index) => {
              const bgColor = backgroundColors[index % backgroundColors.length];

              return (
                <Link 
                  key={blog._id} 
                  href={`/blog/${blog._id}`}
                  className="group"
                >
                  <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Blog Image/Illustration Area with Colorful Background */}
                    <div className={`relative w-full aspect-[4/3] overflow-hidden ${bgColor} flex items-center justify-center`}>
                      {blog.images && blog.images.length > 0 ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-gray-600 text-sm font-medium">No Image</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Blog Title - Bold and Black */}
                    <div className="p-6 flex-1 bg-white">
                      <h2 className="text-xl font-bold text-black leading-tight line-clamp-3 group-hover:text-midnight-monarch transition-colors">
                        {blog.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
};

export default Page;    