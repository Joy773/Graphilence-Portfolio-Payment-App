"use client";

import React, { createContext, useContext, useCallback } from "react";

const API_BASE = "";

// Shared types for API responses
export interface WorkItem {
  _id: string;
  title: string;
  clientName?: string;
  projectUrl?: string;
  keywords: string[];
  images: string[];
  sections: Array<{ heading?: string; content?: string }>;
  featured?: boolean;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  images: string[];
  sections?: Array<{ heading?: string; content?: string }>;
  fontColor?: string;
  fontStyle?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

interface ApiContextValue {
  fetchWorks: () => Promise<ApiResponse<WorkItem[]>>;
  fetchWorkById: (id: string) => Promise<ApiResponse<WorkItem>>;
  fetchBlogPosts: () => Promise<ApiResponse<BlogPost[]>>;
  fetchBlogPostById: (id: string) => Promise<ApiResponse<BlogPost>>;
  submitInquiry: (data: InquiryData) => Promise<ApiResponse>;
}

const ApiContext = createContext<ApiContextValue | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const fetchWorks = useCallback(async (): Promise<ApiResponse<WorkItem[]>> => {
    try {
      const response = await fetch(`${API_BASE}/api/works`);
      return await response.json();
    } catch (err) {
      console.error("fetchWorks error:", err);
      return { success: false, message: "Failed to fetch works" };
    }
  }, []);

  const fetchWorkById = useCallback(async (id: string): Promise<ApiResponse<WorkItem>> => {
    try {
      const response = await fetch(`${API_BASE}/api/works/${id}`);
      return await response.json();
    } catch (err) {
      console.error("fetchWorkById error:", err);
      return { success: false, message: "Failed to fetch work" };
    }
  }, []);

  const fetchBlogPosts = useCallback(async (): Promise<ApiResponse<BlogPost[]>> => {
    try {
      const response = await fetch(`${API_BASE}/api/blog-posts`);
      return await response.json();
    } catch (err) {
      console.error("fetchBlogPosts error:", err);
      return { success: false, message: "Failed to fetch blog posts" };
    }
  }, []);

  const fetchBlogPostById = useCallback(async (id: string): Promise<ApiResponse<BlogPost>> => {
    try {
      const response = await fetch(`${API_BASE}/api/blog-posts/${id}`);
      return await response.json();
    } catch (err) {
      console.error("fetchBlogPostById error:", err);
      return { success: false, message: "Failed to fetch blog post" };
    }
  }, []);

  const submitInquiry = useCallback(async (data: InquiryData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err) {
      console.error("submitInquiry error:", err);
      return { success: false, message: "Failed to submit inquiry" };
    }
  }, []);

  const value: ApiContextValue = {
    fetchWorks,
    fetchWorkById,
    fetchBlogPosts,
    fetchBlogPostById,
    submitInquiry,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi(): ApiContextValue {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return ctx;
}
