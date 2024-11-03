import PostModel from '$lib/models/post';
import { EJSON } from 'bson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts = await PostModel.find(); 
    console.log('posts', posts);

    return { posts: EJSON.deserialize(posts) };
};
