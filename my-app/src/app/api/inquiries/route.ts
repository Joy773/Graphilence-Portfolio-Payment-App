import { NextRequest, NextResponse } from "next/server";
import Inquiry from "@/models/Inquiry";
import connectDB from "@/lib/mongodb";

// GET - Retrieve all inquiries (for admin)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        // Get query parameters for filtering and sorting
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const sort = searchParams.get("sort") || "-createdAt"; // Default: newest first

        // Build query
        const query: any = {};
        if (status) {
            query.status = status;
        }

        const inquiries = await Inquiry.find(query)
            .sort(sort)
            .select("name email phone subject message status createdAt updatedAt");

        return NextResponse.json(
            { success: true, data: inquiries, count: inquiries.length },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch inquiries" },
            { status: 500 }
        );
    }
}

// POST - Create a new inquiry
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || name.trim() === "") {
            return NextResponse.json(
                { success: false, message: "Name is required" },
                { status: 400 }
            );
        }

        if (!email || email.trim() === "") {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        if (!subject || subject.trim() === "") {
            return NextResponse.json(
                { success: false, message: "Subject is required" },
                { status: 400 }
            );
        }

        if (!message || message.trim() === "") {
            return NextResponse.json(
                { success: false, message: "Message is required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return NextResponse.json(
                { success: false, message: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        // Create inquiry
        const inquiry = new Inquiry({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || undefined,
            subject: subject.trim(),
            message: message.trim(),
            status: "new",
        });

        await inquiry.save();

        console.log("Inquiry created successfully:", inquiry._id);

        return NextResponse.json(
            {
                success: true,
                message: "Inquiry submitted successfully",
                data: inquiry,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating inquiry:", error);

        // Handle validation errors
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                { success: false, message: errors.join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to submit inquiry" },
            { status: 500 }
        );
    }
}
