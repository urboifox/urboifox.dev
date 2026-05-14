export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    url: string;
    github?: string;
    featured?: boolean;
};

export const projects: Project[] = [
    {
        slug: 'soumtech',
        title: 'Soumtech',
        description: 'The leading auctions platform in Saudi Arabia.',
        tags: ['svelte', 'typescript', 'tailwindcss'],
        url: 'https://soum.tech'
    },
    {
        slug: 'arabic4u',
        title: 'Arabic4U',
        description: 'The number one Arabic learning platform for non-arabic speakers.',
        tags: ['svelte', 'typescript', 'tailwindcss'],
        url: 'https://arabic4u.ae'
    }
];
