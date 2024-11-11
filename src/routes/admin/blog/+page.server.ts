import PostModel, { type Post } from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from '../../blog/$types';

export const load: PageServerLoad = async () => {
    let posts: Post[] = [];

    try {
        posts = await PostModel.find();
    } catch (error) {
        console.error(error);
        return {
            posts: [],
            error: "Couldn't load posts"
        };
    }

    return { posts: EJSON.deserialize(posts) };
};
