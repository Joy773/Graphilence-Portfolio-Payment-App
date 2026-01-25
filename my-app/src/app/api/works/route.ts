import { NextRequest, NextResponse } from "next/server";
import Work from "@/models/Work";
import connectDB from "@/lib/mongodb";

// GET - Retrieve all works
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const works = await Work.find()
            .select('title clientName projectUrl keywords images sections createdAt')
            .sort({ createdAt: -1 }); // Sort by newest first

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
        const { title, clientName, projectUrl, keywords, sections, images } = body;

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

        console.log('Keywords received:', keywords);
        console.log('Keywords type:', typeof keywords);
        console.log('Keywords is array:', Array.isArray(keywords));
        console.log('Keywords processed:', keywordsArray);

        // Create work object with all fields
        const workData: any = {
            title: title.trim(),
            sections: validSections,
            images: images || [],
        };

        // Always set keywords, even if empty array
        workData.keywords = keywordsArray;

        // Add optional fields only if they have values
        if (clientName && clientName.trim()) {
            workData.clientName = clientName.trim();
        }
        if (projectUrl && projectUrl.trim()) {
            workData.projectUrl = projectUrl.trim();
        }

        console.log('Work data before save:', JSON.stringify(workData, null, 2));
        console.log('Keywords in workData:', workData.keywords);
        console.log('Keywords type:', typeof workData.keywords);
        console.log('Keywords is array:', Array.isArray(workData.keywords));

        const work = new Work(workData);
        
        // Explicitly set keywords again to ensure it's included
        work.set('keywords', keywordsArray);
        
        // Mark keywords as modified to ensure they're saved
        work.markModified('keywords');
        
        // Log before save
        console.log('Work before save - keywords:', work.keywords);
        console.log('Work before save - toObject:', work.toObject());
        
        const savedWork = await work.save();
        
        console.log('Work saved with ID:', savedWork._id);
        console.log('Work saved with keywords:', savedWork.keywords);
        console.log('Keywords length:', savedWork.keywords?.length || 0);
        
        // Verify by fetching the work again
        const verifyWork = await Work.findById(savedWork._id);
        console.log('Verified work keywords:', verifyWork?.keywords);
        console.log('Verified work full object:', verifyWork?.toObject());

        return NextResponse.json(
            { success: true, message: "Work created successfully", data: work },
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
