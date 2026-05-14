import { site } from '$lib/config';
import { getPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

type SitemapEntry = {
    loc: string;
    lastmod?: string;
    changefreq: string;
    priority: string;
};

const STATIC_ROUTES = ['/', '/posts'];

export const GET: RequestHandler = () => {
    const posts = getPosts();

    const urls: SitemapEntry[] = [
        ...STATIC_ROUTES.map((path) => ({
            loc: `${site.url}${path}`,
            changefreq: 'weekly',
            priority: path === '/' ? '1.0' : '0.8'
        })),
        ...posts.map((post) => ({
            loc: `${site.url}/posts/${post.slug}`,
            lastmod: post.date || undefined,
            changefreq: 'monthly',
            priority: '0.7'
        }))
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (u) => `    <url>
        <loc>${u.loc}</loc>${u.lastmod ? `\n        <lastmod>${u.lastmod}</lastmod>` : ''}
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
    </url>`
    )
    .join('\n')}
</urlset>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
