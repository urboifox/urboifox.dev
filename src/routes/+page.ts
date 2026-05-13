import { projects } from '../data/projects';
import type { PageLoad } from './$types';

type PostMeta = {
    title?: string;
    description?: string;
    date?: string;
    published?: boolean | string;
    category?: string;
};

export type PostSummary = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category?: string;
};

export const load: PageLoad = () => {
    const modules = import.meta.glob<{ metadata: PostMeta }>('/src/posts/*.md', { eager: true });

    const posts: PostSummary[] = Object.entries(modules)
        .map(([path, module]) => {
            const slug = path.split('/').pop()?.replace('.md', '') ?? '';
            const meta = module.metadata ?? {};

            const date =
                meta.date ?? (typeof meta.published === 'string' ? meta.published : '');

            return {
                slug,
                title: meta.title ?? slug,
                description: meta.description ?? '',
                date,
                category: meta.category
            };
        })
        .filter((post) => post.title)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return { projects, posts };
};
