import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const modules = import.meta.glob('/src/posts/*.md', { eager: true });

    const posts = Object.entries(modules)
        .map(([path, module]) => {
            const slug = path.split('/').pop()?.replace('.md', '');
            return {
                slug,
                ...module.metadata
            };
        })
        .filter((post) => post.published);

    return { posts };
};
