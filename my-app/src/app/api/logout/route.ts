import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const res = NextResponse.redirect(new URL("/login", url.origin));
    res.cookies.set("auth", "", { 
        maxAge: 0, 
        path: "/",
        httpOnly: true 
    });
    return res;
}