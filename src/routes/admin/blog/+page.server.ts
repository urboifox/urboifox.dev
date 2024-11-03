import PostModel from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts = await PostModel.find({});

    return { posts: EJSON.deserialize(posts) };
};
