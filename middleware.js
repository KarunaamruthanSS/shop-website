import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Only apply middleware to admin API routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    // Get token from cookie
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Pass token to the API route via header so it can validate in Node.js runtime
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-auth-token', token)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/admin/:path*']
}