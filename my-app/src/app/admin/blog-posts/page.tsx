"use client";

import React, { useState } from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { FaPen, FaPlus } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";


import { MdDelete } from "react-icons/md";

interface Section {
    id: number;
    heading: string;
    content: string;
}

const BlogPostsPage = () => {
    const [postTitle, setPostTitle] = useState("");
    const [sections, setSections] = useState<Section[]>([
        { id: 1, heading: "", content: "" }
    ]);
    const [images, setImages] = useState<string[]>([]);

    const addSection = () => {
        const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
        setSections([...sections, { id: newId, heading: "", content: "" }]);
    };

    const updateSection = (id: number, field: 'heading' | 'content', value: string) => {
        setSections(sections.map(section => 
            section.id === id ? { ...section, [field]: value } : section
        ));
    };

    const deleteSection = (id: number) => {
        setSections(sections.filter(section => section.id !== id));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        setImages([...images, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const deleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        // Handle publish logic here
        console.log("Publishing post:", { postTitle, sections });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-midnight-monarch mb-6">Blog Posts</h1>
                
                {/* Create New Post Form */}
                <div className="bg-white rounded-lg border-2 border-dashed border-midnight-monarch p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <FaPen className="w-4 h-4" />
                            <h2 className="text-xl font-bold text-midnight-monarch">Create New Post</h2>
                        </div>
                   
                    </div>

                    {/* Post Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="Enter your post title..."
                            className="w-full px-4 py-2 bg-gray-50 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Images Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Images ({images.length})
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 cursor-pointer transition-colors">
                                <TfiGallery className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Image</span>  
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Image Grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image}
                                            alt={`Upload ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            onClick={() => deleteImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete image"
                                        >
                                            <MdDelete className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sections */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Sections ({sections.length})
                            </label>
                            <button
                                onClick={addSection}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg text-gray-700 transition-colors"
                            >
                                <FaPlus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Section</span>
                            </button>
                        </div>

                        {/* Section List */}
                        <div className="space-y-4">
                            {sections.map((section, index) => (
                                <div
                                    key={section.id}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {/* Drag Handle */}
                                            <div className="cursor-move">
                                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 5a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm6-12a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-sm font-semibold text-gray-700 uppercase">
                                                SECTION {index + 1}
                                            </h3>
                                        </div>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteSection(section.id)}
                                            className="text-midnight-monarch cursor-pointer p-1 rounded transition-colors"
                                            title="Delete section"
                                        >
                                            <MdDelete className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Section Heading */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={section.heading}
                                            onChange={(e) => updateSection(section.id, 'heading', e.target.value)}
                                            placeholder="Section heading..."
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Section Content */}
                                    <div>
                                        <textarea
                                            value={section.content}
                                            onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                                            placeholder="Write your section content here..."
                                            rows={4}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 px-6 py-3 bg-midnight-monarch cursor-pointer text-white rounded-lg font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Publish Post</span>
                        </button>
                        <button className="px-6 py-3 bg-white border cursor-pointer border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogPostsPage;
