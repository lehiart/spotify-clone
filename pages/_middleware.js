import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const url = req.nextUrl.clone();
  url.pathname = '/login';

  const { pathname } = req.nextUrl;
  // allow request if wollowing is true
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // redirect them to login if thet dont have tokn and are requesting a protected route
  if (!token && pathname !== url.pathname) {
    return NextResponse.rewrite(url);
  }
}
