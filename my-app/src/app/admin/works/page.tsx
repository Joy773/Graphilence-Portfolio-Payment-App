"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/Components/AdminLayout";
import { FaPen, FaPlus, FaEdit } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";

interface Section {
  id: number;
  heading: string;
  content: string;
}

interface Work {
  _id: string;
  title: string;
  clientName?: string;
  projectUrl?: string;
  keywords: string[];
  sections: Array<{ heading?: string; content?: string }>;
  images: string[];
  featured?: boolean;
  createdAt: string;
}

const WorksPage = () => {
  const [workTitle, setWorkTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [keywords, setKeywords] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([
    { id: 1, heading: "", content: "" },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/works');
      const result = await response.json();

      if (result.success) {
        setWorks(result.data);
      }
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    const newId =
      sections.length > 0 ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
    setSections([...sections, { id: newId, heading: "", content: "" }]);
  };

  const updateSection = (
    id: number,
    field: "heading" | "content",
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const deleteSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleEdit = async (workId: string) => {
    try {
      const response = await fetch(`/api/works/${workId}`);
      const result = await response.json();

      if (result.success) {
        const work = result.data;
        setWorkTitle(work.title);
        setClientName(work.clientName || '');
        setProjectUrl(work.projectUrl || '');
        setKeywords(work.keywords ? work.keywords.join(', ') : '');
        setFeatured(work.featured || false);
        setImages(work.images || []);
        
        // Convert sections to form format
        if (work.sections && work.sections.length > 0) {
          const formSections = work.sections.map((section: any, index: number) => ({
            id: index + 1,
            heading: section.heading || '',
            content: section.content || '',
          }));
          setSections(formSections);
        } else {
          setSections([{ id: 1, heading: '', content: '' }]);
        }

        setEditingId(workId);
        setMessage(null);
        
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching work:', error);
      setMessage({ type: 'error', text: 'Failed to load work' });
    }
  };

  const handleDelete = async (workId: string) => {
    if (!window.confirm('Are you sure you want to delete this work?')) {
      return;
    }

    try {
      const response = await fetch(`/api/works/${workId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Work deleted successfully!' });
        fetchWorks();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete work' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting work:', error);
      setMessage({ type: 'error', text: 'An error occurred while deleting' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const resetForm = () => {
    setWorkTitle('');
    setClientName('');
    setProjectUrl('');
    setKeywords('');
    setFeatured(false);
    setSections([{ id: 1, heading: '', content: '' }]);
    setImages([]);
    setEditingId(null);
    setMessage(null);
  };

  const handleCreateNew = () => {
    resetForm();
  };

  const handleSaveWork = async () => {
    // Validate title
    if (!workTitle.trim()) {
      setMessage({ type: 'error', text: 'Please enter a work title' });
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

    // Validate URL format if provided
    if (projectUrl && projectUrl.trim() !== "") {
      try {
        new URL(projectUrl);
      } catch {
        setMessage({ type: 'error', text: 'Please provide a valid project URL' });
        setTimeout(() => setMessage(null), 3000);
        return;
      }
    }

    setIsSaving(true);
    setMessage(null);

    try {
      // Process keywords (split by comma and trim)
      const keywordsArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      // Prepare data for API (remove id from sections)
      const workData = {
        title: workTitle.trim(),
        clientName: clientName.trim() || undefined,
        projectUrl: projectUrl.trim() || undefined,
        keywords: keywordsArray,
        featured: featured,
        sections: sections.map(({ id, ...rest }) => rest),
        images: images,
      };

      // Send to API (POST for create, PUT for update)
      const url = editingId ? `/api/works/${editingId}` : '/api/works';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Work updated successfully!' : 'Work saved successfully!' 
        });
        // Clear the form
        handleCreateNew();
        // Refresh works list
        fetchWorks();
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to save work' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error saving work:', error);
      setMessage({ type: 'error', text: 'An error occurred while saving. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm();
    }
  };

    return (
        <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-midnight-monarch mb-6">
          Works
        </h1>

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

        {/* Create / Edit Work Form */}
        <div className="bg-white rounded-lg border-2 border-dashed border-midnight-monarch p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaPen className="w-4 h-4" />
              <h2 className="text-xl font-bold text-midnight-monarch">
                {editingId ? 'Edit Work' : 'Create New Work'}
              </h2>
            </div>
            {editingId && (
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Create New Work</span>
              </button>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Title
              </label>
              <input
                type="text"
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                placeholder="Enter the work / project title..."
                className="w-full px-4 py-2 bg-gray-50 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name (optional)
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client or brand name..."
                className="w-full px-4 py-2 bg-gray-50 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project URL (optional)
            </label>
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://example.com/project"
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

          {/* Featured Section - Show on Home Page */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 text-midnight-monarch border-2 border-zinc-300 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Show on Home Page (Top 6 Featured Works)
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Only the top 6 featured works will be displayed on the home page
                </p>
              </div>
            </label>
          </div>

          {/* Images Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Work Images ({images.length})
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 cursor-pointer transition-colors">
                <TfiGallery className="w-4 h-4" />
                <span className="text-sm font-medium">Add Images</span>
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
                      alt={`Work image ${index + 1}`}
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
                Detailed Sections ({sections.length})
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
                      {/* Drag Handle (visual only) */}
                      <div className="cursor-move">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                      onChange={(e) =>
                        updateSection(section.id, "heading", e.target.value)
                      }
                      placeholder="Section heading (e.g. Problem, Solution, Results)..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Section Content */}
                  <div>
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(section.id, "content", e.target.value)
                      }
                      placeholder="Describe this part of the project in detail..."
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
              onClick={handleSaveWork}
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Save Work</span>
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

        {/* All Works List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-midnight-monarch mb-4">
            All Works ({works.length})
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading works...</p>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No works created yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {works.map((work) => (
                <div
                  key={work._id}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-midnight-monarch">
                          {work.title}
                        </h3>
                        {work.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      {work.clientName && (
                        <p className="text-sm text-gray-600 mb-1">
                          Client: {work.clientName}
                        </p>
                      )}
                      {work.keywords && work.keywords.length > 0 && (
                        <p className="text-sm text-gray-500">
                          Keywords: {work.keywords.join(', ')}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(work.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(work._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(work._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      >
                        <MdDelete className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
        </AdminLayout>
    );
};

export default WorksPage;
