import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectDB from "@/lib/mongodb";

// GET - Retrieve all blog posts
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const blogs = await Blog.find()
            .select('title images keywords createdAt')
            .sort({ createdAt: -1 })
            .lean() // Use lean() for faster queries
            .limit(100); // Limit results to prevent slow queries

        return NextResponse.json(
            { success: true, data: blogs, count: blogs.length },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const {title, keywords, sections, images, fontColor, fontStyle} = body;

        if(!title || title.trim() === "") {
            return NextResponse.json(
                {success: false, message: "Title is required"},
                {status: 400}
            );
        }

        // Filter out empty sections
        const validSections = (sections || []).filter((section: any) => 
            section.heading?.trim() || section.content?.trim()
        );

        // Process keywords (ensure it's an array and filter empty values)
        let keywordsArray: string[] = [];
        if (keywords) {
            if (Array.isArray(keywords)) {
                keywordsArray = keywords
                    .filter((k: string) => k && typeof k === 'string' && k.trim().length > 0)
                    .map((k: string) => k.trim());
            } else if (typeof keywords === 'string') {
                // Handle case where keywords might be sent as a string
                keywordsArray = keywords
                    .split(',')
                    .map((k: string) => k.trim())
                    .filter((k: string) => k.length > 0);
            }
        }

        // Create blog post object with all fields
        const blogData: any = {
            title: title.trim(),
            sections: validSections,
            images: images || [],
            keywords: keywordsArray,
            fontColor: fontColor || '#000000',
            fontStyle: fontStyle || 'Arial',
        };

        const blogPost = new Blog(blogData);
        
        // Explicitly set keywords and mark as modified to ensure they're saved
        blogPost.set('keywords', keywordsArray);
        blogPost.markModified('keywords');
        
        const savedBlog = await blogPost.save();

        return NextResponse.json(
            {success: true, message: "Blog post created successfully", data: savedBlog},
            {status: 201}
        );
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            {success: false, message: "Failed to create blog post"},
            {status: 500}
        );
    }
}