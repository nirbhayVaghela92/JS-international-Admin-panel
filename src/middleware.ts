import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes, routes } from "./constants/routes";

// Protected routes that require authentication
// Regular expression for dynamic routes
const protectedRegexRoutes = protectedRoutes.map(
  (route) => new RegExp(`^${route}(\/.*)?$`),
);

const middleware = (req: NextRequest) => {
  // const sessionStatus = req.cookies.get("token")?.value;
  // // Get the access token from cookies
  // const requestedRoute = req.nextUrl.pathname;
  // const isProtectedRoute =
  //   protectedRoutes.includes(requestedRoute) ||
  //   protectedRegexRoutes.some((regex) => regex.test(requestedRoute));

  // // Redirect to destinated page when try to access "/"
  // if (
  //   requestedRoute === "/" ||
  //   (!isProtectedRoute && !publicRoutes.includes(requestedRoute))
  // ) {
  //   if (sessionStatus) {
  //     const absoluteURL = new URL(routes.dashboard, req.nextUrl.origin);
  //     return NextResponse.redirect(absoluteURL.toString());
  //   } else {
  //     const absoluteURL = new URL(routes.auth.signIn, req.nextUrl.origin);
  //     return NextResponse.redirect(absoluteURL.toString());
  //   }
  // }

  // // Allow public routes without any checks
  // if (publicRoutes.includes(requestedRoute)) {
  //   if (sessionStatus && requestedRoute === routes.auth.signIn) {
  //     const absoluteURL = new URL(routes.dashboard, req.nextUrl.origin); // Redirect logged-in users away from login/signup
  //     return NextResponse.redirect(absoluteURL.toString());
  //   }
  //   return NextResponse.next(); // Continue to the requested public page
  // }

  // // Check if the requested route is a protected route

  // // If there's no session and the route is protected
  // if (!sessionStatus && isProtectedRoute) {
  //   const absoluteURL = new URL(routes.auth.signIn, req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  // If there's a session, continue to the requested route
  return NextResponse.next();
};

export default middleware;

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};



// 