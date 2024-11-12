import * as config from '$lib/config';
import type { Post } from '$lib/models/post';
import PostModel from '$lib/models/post';

export async function GET() {
    let posts: Post[] = [];

    try {
        posts = await PostModel.find({ published: true });
    } catch (error) {
        console.error(error);
        posts = [];
    }
    const headers = { 'Content-Type': 'application/xml' };

    const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.description}</description>
				<link>https://urboifox.dev</link>
				<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
                    .map(
                        (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.summary}</description>
							<link>${config.url}/blog/${post.slug}</link>
							<guid isPermaLink="true">${config.url}/blog/${post.slug}</guid>
							<pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
						</item>
					`
                    )
                    .join('')}
			</channel>
		</rss>
	`.trim();

    return new Response(xml, { headers });
}
