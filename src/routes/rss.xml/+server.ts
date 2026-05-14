import { site } from '$lib/config';
import { getPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

function escape(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export const GET: RequestHandler = () => {
    const posts = getPosts();

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>${escape(site.name)}</title>
        <description>${escape(site.description)}</description>
        <link>${site.url}</link>
        <language>en</language>
        <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts
            .map(
                (post) => `<item>
            <title>${escape(post.title)}</title>
            <description>${escape(post.description)}</description>
            <link>${site.url}/posts/${post.slug}</link>
            <guid isPermaLink="true">${site.url}/posts/${post.slug}</guid>${
                post.date ? `\n            <pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''
            }${post.category ? `\n            <category>${escape(post.category)}</category>` : ''}
        </item>`
            )
            .join('\n        ')}
    </channel>
</rss>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
