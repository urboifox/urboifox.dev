import PostModel, { type Post } from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }): Promise<{ post: Post }> => {
    const { slug } = params;
    const post = await PostModel.findOne({ slug });

    if (!post) {
        error(404, 'Post not found');
    }

    return { post: EJSON.deserialize(post) };
};
