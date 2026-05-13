import { getPosts } from '$lib/posts';
import { projects } from '../data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const posts = getPosts();

    return { projects, posts };
};
