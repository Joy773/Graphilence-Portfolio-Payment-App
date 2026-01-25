import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectDB from "@/lib/mongodb";

// GET - Retrieve all blog posts
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const blogs = await Blog.find()
            .select('title images keywords createdAt') // Select title, images, keywords, and createdAt
            .sort({ createdAt: -1 }); // Sort by newest first

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
        const {title, keywords, sections, images} = body;

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

        console.log('Keywords received:', keywords);
        console.log('Keywords processed:', keywordsArray);

        // Create blog post object with all fields - explicitly include keywords
        const blogData: any = {
            title: title.trim(),
            sections: validSections,
            images: images || [],
            keywords: keywordsArray, // Explicitly set keywords
        };

        console.log('Blog data before save:', JSON.stringify(blogData, null, 2));
        console.log('Keywords in blogData:', blogData.keywords);
        console.log('Keywords type:', typeof blogData.keywords);
        console.log('Keywords is array:', Array.isArray(blogData.keywords));

        const blogPost = new Blog(blogData);
        
        // Explicitly set keywords again to ensure it's included
        blogPost.set('keywords', keywordsArray);
        
        // Mark keywords as modified to ensure they're saved
        blogPost.markModified('keywords');
        
        // Log before save
        console.log('Blog post before save - keywords:', blogPost.keywords);
        console.log('Blog post before save - toObject:', blogPost.toObject());
        
        const savedBlog = await blogPost.save();
        
        console.log('Blog saved with ID:', savedBlog._id);
        console.log('Blog saved with keywords:', savedBlog.keywords);
        console.log('Keywords length:', savedBlog.keywords?.length || 0);
        
        // Verify by fetching the blog again
        const verifyBlog = await Blog.findById(savedBlog._id);
        console.log('Verified blog keywords:', verifyBlog?.keywords);

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