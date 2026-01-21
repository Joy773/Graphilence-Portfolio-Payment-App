import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {email, password} = await request.json();

    if(email === "admin@gmail.com" && password === "123456") {
        const res = NextResponse.json({success: true, message: "Login successful"}, {status: 200});
        res.cookies.set("auth", "true", {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60,
        });
        return res;
    }
    else {
        return NextResponse.json({success: false, message: "Invalid email or password"}, {status: 400});
    }
}