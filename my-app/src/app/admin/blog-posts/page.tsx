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
    const [keywords, setKeywords] = useState<string>("");
    const [sections, setSections] = useState<Section[]>([
        { id: 1, heading: "", content: "" }
    ]);
    const [images, setImages] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

    const handlePublish = async () => {
        // Validate title
        if (!postTitle.trim()) {
            setMessage({ type: 'error', text: 'Please enter a post title' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        // Validate at least one section has content
        const hasContent = sections.some(section => 
            section.heading?.trim() || section.content?.trim()
        );
        
        if (!hasContent) {
            setMessage({ type: 'error', text: 'Please add at least one section with content' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setIsSaving(true);
        setMessage(null);

        try {
            // Process keywords (split by comma and trim)
            const keywordsArray = keywords
                .split(',')
                .map(k => k.trim())
                .filter(k => k.length > 0);

            console.log('Keywords input:', keywords);
            console.log('Keywords array:', keywordsArray);

            // Prepare data for API (remove id from sections)
            const blogData = {
                title: postTitle.trim(),
                keywords: keywordsArray,
                sections: sections.map(({ id, ...rest }) => rest),
                images: images,
            };

            console.log('Blog data being sent:', blogData);

            // Send to API
            const response = await fetch('/api/blog-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: 'Blog post saved successfully!' });
                // Clear the form
                setPostTitle('');
                setKeywords('');
                setSections([{ id: 1, heading: '', content: '' }]);
                setImages([]);
                // Clear success message after 3 seconds
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to save blog post' });
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error) {
            console.error('Error saving blog post:', error);
            setMessage({ type: 'error', text: 'An error occurred while saving. Please try again.' });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            setPostTitle('');
            setKeywords('');
            setSections([{ id: 1, heading: '', content: '' }]);
            setImages([]);
            setMessage(null);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-midnight-monarch mb-6">Blog Posts</h1>
                
                {/* Success/Error Message */}
                {message && (
                    <div className={`mb-4 p-4 rounded-lg ${
                        message.type === 'success' 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                        <div className="flex items-center justify-between">
                            <span>{message.text}</span>
                            <button
                                onClick={() => setMessage(null)}
                                className="ml-4 text-lg font-bold hover:opacity-70"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
                
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

                    {/* Keywords Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Keywords (optional)
                        </label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Enter keywords separated by commas (e.g., Web Design, UI/UX, Branding)"
                            className="w-full px-4 py-2 bg-gray-50 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate multiple keywords with commas
                        </p>
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
                            disabled={isSaving}
                            className={`flex items-center gap-2 px-6 py-3 bg-midnight-monarch text-white rounded-lg font-medium transition-colors ${
                                isSaving 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'cursor-pointer hover:bg-opacity-90'
                            }`}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Publish Post</span>
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleCancel}
                            disabled={isSaving}
                            className={`px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium transition-colors ${
                                isSaving 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'cursor-pointer hover:bg-gray-50'
                            }`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogPostsPage;
