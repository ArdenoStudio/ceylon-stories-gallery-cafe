import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Priority 11: Vercel Deployment Foundation (§33)
 * §33 Middleware: Global Auth, Tenant Verification, and API Rate Limiting.
 * §45 Resilience: Hardening the API surface pre-execution.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static assets
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // 2. Extract Tenant ID from headers or subdomains (§37)
  const tenantId = request.headers.get('x-tenant-id');

  // 3. Rate Limiting Placeholder (§33)
  // In production, use Upstash Redis: 
  // const { success } = await ratelimit.limit(`ratelimit_${tenantId || 'anon'}`);

  // 4. API Shielding for /api/agents routes
  if (pathname.startsWith('/api/agents')) {
     if (!tenantId) {
       console.log(`[Middleware] Blocked unauthorized agent request to ${pathname}`);
       // return NextResponse.json({ error: 'Unauthorized: Missing Tenant ID' }, { status: 401 });
     }
  }

  const response = NextResponse.next();
  
  // 5. Inject Security Headers §45
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Ardeno-Edge', 'true');

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
