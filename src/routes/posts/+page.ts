import { getCategories, getPosts } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
    const category = url.searchParams.get('category') ?? 'all';
    const posts = getPosts({ category });
    const categories = ['all', ...getCategories()];

    return { posts, categories, category };
};
