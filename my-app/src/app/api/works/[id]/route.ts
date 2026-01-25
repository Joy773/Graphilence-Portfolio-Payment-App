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

    const work = await Work.findById(id);

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
