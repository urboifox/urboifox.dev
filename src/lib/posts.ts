type PostMeta = {
    title: string;
    description: string;
    published: string;
    category: string;
};

export type PostSummary = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category?: string;
};

export function getPosts() {
    const modules = import.meta.glob<{ metadata: PostMeta }>('/src/posts/*.md', { eager: true });

    const posts: PostSummary[] = Object.entries(modules)
        .map(([path, module]) => {
            const slug = path.split('/').pop()?.replace('.md', '') ?? '';
            const meta = module.metadata ?? {};

            return {
                slug,
                title: meta.title ?? slug,
                description: meta.description ?? '',
                date: meta.published ?? '',
                category: meta.category
            };
        })
        .filter((post) => post.title)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return posts;
}
