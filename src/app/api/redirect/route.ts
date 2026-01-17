import { NextRequest, NextResponse } from 'next/server';
import { getRedirectUrl, findRoute } from '@/lib/routes';

/**
 * API endpoint for ?q= redirects
 * GET /api/redirect?q=search-term
 * 
 * Returns redirect URL or suggestions
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json(
      { error: 'Missing q parameter' },
      { status: 400 }
    );
  }

  const redirectUrl = getRedirectUrl(query);
  
  if (redirectUrl) {
    // Found exact match - redirect
    return NextResponse.redirect(redirectUrl);
  }

  // No match - return suggestions
  const mapping = findRoute(query);
  
  return NextResponse.json({
    query,
    found: false,
    suggestion: mapping ? {
      route: mapping.route,
      title: mapping.title,
      url: `https://pactown.com${mapping.route}`
    } : null
  });
}
