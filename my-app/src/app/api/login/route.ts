import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {email, password} = await request.json();

    if(email === "admin@gmail.com" && password === "123456") {
        // Store timestamp when user logs in (current time in seconds)
        const loginTime = Math.floor(Date.now() / 1000);
        
        const res = NextResponse.json({success: true, message: "Login successful"}, {status: 200});
        res.cookies.set("auth", loginTime.toString(), {
            httpOnly: true,
            path: "/",
            maxAge: 60, // 1 minute
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return res;
    }
    else {
        return NextResponse.json({success: false, message: "Invalid email or password"}, {status: 400});
    }
}