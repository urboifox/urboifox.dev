import PostModel, { type Post } from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { type TOCHeading } from '$lib/utils/mdast-extract-headings';
import { parseMarkdown } from '$lib/utils/markdown-parser';

export const load: PageServerLoad = async ({
    params
}): Promise<{ post: Post; toc: TOCHeading[], dom: string }> => {
    const { slug } = params;
    const post = await PostModel.findOne({ slug });

    if (!post) {
        error(404, 'Post not found');
    }

    const { dom, toc } = await parseMarkdown(post.content);

    return { post: EJSON.deserialize(post), toc, dom };
};
