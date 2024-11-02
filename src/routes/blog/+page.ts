import type { BlogFile } from '$lib/types/blog';
import type { PageLoad } from './$types';

async function getBlogPosts(): Promise<BlogFile[]> {
    const blogPostsPaths: { [key: string]: BlogFile } = import.meta.glob('/src/blog/*.md', {
        eager: true
    });

    const blogPosts: BlogFile[] = [];

    Object.entries(blogPostsPaths).forEach(([key, value]) => {
        const slug = key.split('/').pop()?.replace('.md', '');

        if (!slug || !value.metadata.published) return;
        blogPosts.push({
            metadata: { ...value.metadata, slug },
            default: value.default
        });
    });

    return blogPosts;
}

interface PageLoadData {
    blogPosts: BlogFile[];
}

export const load: PageLoad = async (): Promise<PageLoadData> => {
    const blogPosts = await getBlogPosts();
    return { blogPosts };
};
