import type { Component } from 'svelte';
import type { BlogFile, BlogMetadata } from '../../../lib/types/blog';
import type { PageLoad } from './$types';

interface PageLoadData {
    metadata: BlogMetadata;
    BlogPost: Component;
    url: URL;
}
export const load: PageLoad = async ({ params, url }): Promise<PageLoadData> => {
    const { slug } = params;

    const blog: BlogFile = await import(`../../../blog/${slug}.md`);

    return { metadata: blog.metadata, BlogPost: blog.default, url };
};
