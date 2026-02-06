import { NextRequest, NextResponse } from 'next/server';

const PLATFORM_DOMAINS = [
	'zzpcv.nl',
	'www.zzpcv.nl',
	'localhost',
	'127.0.0.1',
];

async function lookupUsernameByDomain(domain: string): Promise<string | null> {
	try {
		const cleanDomain = domain.toLowerCase().replace(/^www\./, '');
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/graphql';

		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `query GetUserByCustomDomain($domain: String!) {
					getUserByCustomDomain(domain: $domain) { username }
				}`,
				variables: { domain: cleanDomain },
			}),
			cache: 'no-store',
		});

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		return data?.data?.getUserByCustomDomain?.username || null;
	} catch {
		return null;
	}
}

export async function middleware(request: NextRequest) {
	const hostname = request.headers.get('host') || '';

	// Skip for platform domains and localhost
	if (PLATFORM_DOMAINS.some((d) => hostname.includes(d))) {
		return NextResponse.next();
	}

	// Only rewrite root path for custom domains
	if (request.nextUrl.pathname === '/') {
		const username = await lookupUsernameByDomain(hostname);

		if (username) {
			const url = request.nextUrl.clone();
			url.pathname = `/${username}`;
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
