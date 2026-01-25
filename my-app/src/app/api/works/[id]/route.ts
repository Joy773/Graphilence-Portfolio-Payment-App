import { NextRequest, NextResponse } from "next/server";
import Work from "@/models/Work";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

// GET - Retrieve a single work by ID
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
        { success: false, message: "Work ID is required" },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid work ID format" },
        { status: 400 }
      );
    }

    const work = await Work.findById(id).lean(); // Use lean() for faster queries

    if (!work) {
      return NextResponse.json(
        { success: false, message: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: work },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch work" },
      { status: 500 }
    );
  }
}

// PUT - Update a work
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();

    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Work ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid work ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, clientName, projectUrl, keywords, sections, images, featured } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // Filter out empty sections
    const validSections = (sections || []).filter((section: any) => 
      section.heading?.trim() || section.content?.trim()
    );

    // Validate URL format if provided
    if (projectUrl && projectUrl.trim() !== "") {
      try {
        new URL(projectUrl);
      } catch {
        return NextResponse.json(
          { success: false, message: "Please provide a valid project URL" },
          { status: 400 }
        );
      }
    }

    // Process keywords
    let keywordsArray: string[] = [];
    if (keywords) {
      if (Array.isArray(keywords)) {
        keywordsArray = keywords
          .filter((k: string) => k && typeof k === 'string' && k.trim().length > 0)
          .map((k: string) => k.trim());
      } else if (typeof keywords === 'string') {
        keywordsArray = keywords
          .split(',')
          .map((k: string) => k.trim())
          .filter((k: string) => k.length > 0);
      }
    }

    // If this work is being marked as featured, check if we already have 6 featured works
    if (featured === true) {
      const featuredCount = await Work.countDocuments({ featured: true });
      const currentWork = await Work.findById(id);
      
      // Only unfeature the oldest if current work is not already featured
      if (featuredCount >= 6 && (!currentWork || !currentWork.featured)) {
        const oldestFeatured = await Work.findOne({ featured: true }).sort({ createdAt: 1 });
        if (oldestFeatured && oldestFeatured._id.toString() !== id) {
          oldestFeatured.featured = false;
          await oldestFeatured.save();
        }
      }
    }

    const updateData: any = {
      title: title.trim(),
      keywords: keywordsArray,
      sections: validSections,
      images: images || [],
      featured: featured === true,
      updatedAt: new Date(),
    };

    // Add optional fields only if they have values
    if (clientName && clientName.trim()) {
      updateData.clientName = clientName.trim();
    } else {
      updateData.clientName = undefined;
    }
    if (projectUrl && projectUrl.trim()) {
      updateData.projectUrl = projectUrl.trim();
    } else {
      updateData.projectUrl = undefined;
    }

    const work = await Work.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!work) {
      return NextResponse.json(
        { success: false, message: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Work updated successfully", data: work },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update work" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a work
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();

    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Work ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid work ID format" },
        { status: 400 }
      );
    }

    const work = await Work.findByIdAndDelete(id);

    if (!work) {
      return NextResponse.json(
        { success: false, message: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Work deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete work" },
      { status: 500 }
    );
  }
}
