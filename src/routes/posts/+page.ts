import { getCategories, getPosts } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const posts = getPosts();
    const categories = ['all', ...getCategories()];

    return { posts, categories };
};
