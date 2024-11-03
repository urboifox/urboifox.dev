import PostModel, { type Post } from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdastExtractHeadings, type TOCHeading } from '$lib/utils/mdast-extract-headings';

export const load: PageServerLoad = async ({
    params
}): Promise<{ post: Post; toc: TOCHeading[] }> => {
    const { slug } = params;
    const post = await PostModel.findOne({ slug });

    if (!post) {
        error(404, 'Post not found');
    }

    const tree = fromMarkdown(post.content);
    const toc = mdastExtractHeadings(tree);

    return { post: EJSON.deserialize(post), toc };
};
