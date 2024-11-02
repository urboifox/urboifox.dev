import type { Component } from 'svelte';
import type { BlogFile, BlogMetadata } from '../../../lib/types/blog';
import type { PageLoad } from './$types';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdastExtractHeadings, type TOCHeading } from '$lib/utils/mdast-extract-headings';

interface PageLoadData {
    metadata: BlogMetadata;
    BlogPost: Component;
    toc: TOCHeading[];
}

export const load: PageLoad = async ({ params }): Promise<PageLoadData> => {
    const { slug } = params;
    let blog: BlogFile;
    try {
        blog = await import(`../../../blog/${slug}.md`);
    } catch {
        throw new Error(`Blog post ${slug} not found`);
    }

    const raw = await import(`../../../blog/${slug}.md?raw`).then((m) => m.default);
    const tree = fromMarkdown(raw);
    const toc = mdastExtractHeadings(tree);

    return { metadata: blog.metadata, BlogPost: blog.default, toc: toc.slice(1) };
};
