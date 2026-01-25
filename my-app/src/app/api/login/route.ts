import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {email, password} = await request.json();

    // Get admin credentials from environment variables
    const adminEmailStr = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionDurationStr = process.env.SESSION_DURATION;

    // Validate that environment variables are set
    if (!adminEmailStr || !adminPassword || !sessionDurationStr) {
        return NextResponse.json(
            {success: false, message: "Server configuration error"}, 
            {status: 500}
        );
    }

    const sessionDuration = parseInt(sessionDurationStr);
    if (isNaN(sessionDuration)) {
        return NextResponse.json(
            {success: false, message: "Invalid session duration configuration"}, 
            {status: 500}
        );
    }

    // Handle multiple admin emails (comma-separated)
    const adminEmails = adminEmailStr.split(',').map(e => e.trim());
    const isEmailValid = adminEmails.includes(email);

    if(isEmailValid && password === adminPassword) {
        // Store timestamp when user logs in (current time in seconds)
        const loginTime = Math.floor(Date.now() / 1000);
        
        const res = NextResponse.json({success: true, message: "Login successful"}, {status: 200});
        res.cookies.set("auth", loginTime.toString(), {
            httpOnly: true,
            path: "/",
            maxAge: sessionDuration, // Use session duration from environment variable
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return res;
    }
    else {
        return NextResponse.json({success: false, message: "Invalid email or password"}, {status: 400});
    }
}