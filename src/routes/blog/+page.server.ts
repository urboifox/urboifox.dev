import PostModel, { type Post } from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<{ posts: Post[]; error?: string }> => {
    let posts: Post[] = [];

    try {
        posts = await PostModel.find({ published: true });
    } catch (error) {
        console.error(error);
        return {
            posts: [],
            error: "Couldn't load posts"
        };
    }

    return { posts: EJSON.deserialize(posts) };
};
