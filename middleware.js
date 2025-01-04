import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    const publicPaths = ["/", "/about", "/products", "/contact"];
    const requiresAuthPaths = ["/cart/add", "/cart/view", "/dashboard"];

    if (publicPaths.some(path => req.url.includes(path))) {
        return NextResponse.next();
    }

    if (!token && requiresAuthPaths.some(path => req.url.includes(path))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (req.url.includes("/dashboard/admin") && decoded.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard/customer", req.url));
        }

        if (req.url.includes("/dashboard/customer") && decoded.role !== "customer") {
            return NextResponse.redirect(new URL("/dashboard/admin", req.url));
        }
    } catch (err) {
        console.error("Invalid token:", err);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
