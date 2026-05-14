import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const slug = params.slug.replace(/\.md$/, '');

    if (params.slug !== slug) {
        redirect(307, `/posts/${slug}`);
    }

    try {
        const post = await import(`../../../../posts/${slug}.md`);
        return {
            content: post.default,
            metadata: post.metadata
        };
    } catch {
        error(404, 'This Post does not exist.');
    }
};
