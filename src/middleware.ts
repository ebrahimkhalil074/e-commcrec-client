import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/authServices";

const authRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  ADMIN: [/^\/admin/],
  CUSTOMER: [/^\/customer/],
  SELLER: [/^\/seller/],
  DELIVERYBOY: [/^\/delivaryboy/],
};

type TRole = keyof typeof roleBasedRoutes;
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  console.log(user);
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Checkout route (any logged-in user)
  if (pathname.startsWith("/checkout")) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));

    return NextResponse.next();
  }
  if (user?.role && roleBasedRoutes[user?.role as TRole]) {
    const routes = roleBasedRoutes[user?.role as TRole];

    console.log(routes);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin",
    "/admin/:page*",
    "/seller",
    "/seller/:page*",
    "/customer",
    "/customer/:page*",
    "/delivaryboy",
    "/delivaryboy/:page*",
    "/login",
    "/register",
    "/checkout",
  ],
};
