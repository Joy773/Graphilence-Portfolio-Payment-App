import { NextRequest, NextResponse } from "next/server";
import Work from "@/models/Work";
import connectDB from "@/lib/mongodb";

// GET - Retrieve all works
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const works = await Work.find()
            .select('title clientName projectUrl keywords images sections featured createdAt')
            .sort({ createdAt: -1 })
            .lean() // Use lean() for faster queries (returns plain JavaScript objects)
            .limit(100); // Limit results to prevent slow queries with large datasets

        return NextResponse.json(
            { success: true, data: works, count: works.length },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching works:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch works" },
            { status: 500 }
        );
    }
}

// POST - Create a new work
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { title, clientName, projectUrl, keywords, sections, images, featured } = body;

        // Validate required fields
        if (!title || title.trim() === "") {
            return NextResponse.json(
                { success: false, message: "Work title is required" },
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

        // If this work is being marked as featured, check if we already have 6 featured works
        if (featured === true) {
            const featuredCount = await Work.countDocuments({ featured: true });
            if (featuredCount >= 6) {
                // Unfeature the oldest featured work
                const oldestFeatured = await Work.findOne({ featured: true }).sort({ createdAt: 1 });
                if (oldestFeatured) {
                    oldestFeatured.featured = false;
                    await oldestFeatured.save();
                }
            }
        }

        // Create work object with all fields
        const workData: any = {
            title: title.trim(),
            sections: validSections,
            images: images || [],
            keywords: keywordsArray,
            featured: featured === true,
        };

        // Add optional fields only if they have values
        if (clientName && clientName.trim()) {
            workData.clientName = clientName.trim();
        }
        if (projectUrl && projectUrl.trim()) {
            workData.projectUrl = projectUrl.trim();
        }

        const work = new Work(workData);
        
        // Explicitly set keywords and mark as modified to ensure they're saved
        work.set('keywords', keywordsArray);
        work.markModified('keywords');
        
        const savedWork = await work.save();

        return NextResponse.json(
            { success: true, message: "Work created successfully", data: savedWork },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating work:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create work" },
            { status: 500 }
        );
    }
}
