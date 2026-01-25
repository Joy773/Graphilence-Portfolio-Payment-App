import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

// GET - Retrieve a single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();

    // Handle both async and sync params (Next.js 16 compatibility)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog post ID is required" },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ObjectId format:", id);
      return NextResponse.json(
        { success: false, message: "Invalid blog post ID format" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog post", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
