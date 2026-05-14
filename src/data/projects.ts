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
        description:
            'Soumtech is a real estate auction platform that enables clients, sales agents, and entities to offer public and private auctions in a safe and organized electronic environment',
        tags: ['svelte', 'typescript', 'tailwindcss'],
        url: 'https://soum.tech'
    },
    {
        slug: 'arabic4u',
        title: 'Arabic4U',
        description:
            'An interactive Arabic language learning platform designed to help students learn Arabic through engaging educational content, assessments, and gamified experiences.',
        tags: ['svelte', 'typescript', 'tailwindcss'],
        url: 'https://arabic4u.ae'
    }
];
