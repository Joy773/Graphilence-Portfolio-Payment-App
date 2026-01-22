import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const res = NextResponse.redirect(new URL("/login", url.origin));
    // Properly delete the cookie
    res.cookies.delete("auth");
    return res;
}