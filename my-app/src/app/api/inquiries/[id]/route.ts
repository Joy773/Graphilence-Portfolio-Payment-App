import { NextRequest, NextResponse } from "next/server";
import Inquiry from "@/models/Inquiry";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

// GET - Retrieve a single inquiry by ID
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
                { success: false, message: "Inquiry ID is required" },
                { status: 400 }
            );
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid inquiry ID format" },
                { status: 400 }
            );
        }

    const inquiry = await Inquiry.findById(id).lean(); // Use lean() for faster queries

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: inquiry },
      { status: 200 }
    );
    } catch (error) {
        console.error("Error fetching inquiry:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch inquiry" },
            { status: 500 }
        );
    }
}

// PATCH - Update inquiry status
export async function PATCH(
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
                { success: false, message: "Inquiry ID is required" },
                { status: 400 }
            );
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid inquiry ID format" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        // Validate status if provided
        if (status && !["new", "read", "replied", "archived"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status. Must be: new, read, replied, or archived" },
                { status: 400 }
            );
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status: status || "read", updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!inquiry) {
            return NextResponse.json(
                { success: false, message: "Inquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Inquiry updated successfully", data: inquiry },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating inquiry:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update inquiry" },
            { status: 500 }
        );
    }
}

// DELETE - Delete an inquiry
export async function DELETE(
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
                { success: false, message: "Inquiry ID is required" },
                { status: 400 }
            );
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid inquiry ID format" },
                { status: 400 }
            );
        }

        const inquiry = await Inquiry.findByIdAndDelete(id);

        if (!inquiry) {
            return NextResponse.json(
                { success: false, message: "Inquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Inquiry deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete inquiry" },
            { status: 500 }
        );
    }
}
