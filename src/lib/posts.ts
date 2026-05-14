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

export type GetPostsOptions = {
    category?: string;
};

function loadAllPosts(): PostSummary[] {
    const modules = import.meta.glob<{ metadata: PostMeta }>('/src/posts/*.md', { eager: true });

    return Object.entries(modules)
        .map(([path, module]) => {
            const slug = path.split('/').pop()?.replace('.md', '') ?? '';
            const meta = module.metadata ?? ({} as PostMeta);

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
}

export function getPosts({ category }: GetPostsOptions = {}): PostSummary[] {
    const all = loadAllPosts();
    if (!category || category === 'all') return all;
    return all.filter((post) => post.category === category);
}

export function getCategories(): string[] {
    return Array.from(
        new Set(
            loadAllPosts()
                .map((post) => post.category)
                .filter((c): c is string => Boolean(c))
        )
    ).sort();
}

const foo = 'bar';

function baz(): string {
    return foo;
}

console.log(foo);
console.log(baz());
