export type Experience = {
    company: string;
    role: string;
    url?: string;
    start: string;
    end?: string;
    location?: string;
    description?: string;
    stack?: string[];
};

export const bio = {
    name: 'Mohamed Ashraf',
    role: 'Frontend Developer',
    location: 'Alexandria, Egypt',
    status: 'Available for work',
    paragraphs: [
        "Hello stranger — I'm Mohamed Ashraf, a self-taught frontend developer who's been building for the web for the past 5 years.",
        'Along the way I picked up bits of everything — backend, cloud, Linux, 3d modeling, and a lot of other stuff — but frontend became my favorite. being able to create something that people can see out of nothing was always magical to me.',
        'I spend most of my time in the terminal and Neovim, and I also spend too many evenings ricing my Linux setup.',
        'Outside of code, motorcycles are my thing. Stick around long enough and I might take you for a ride.'
    ]
} as const;

// Replace these with your real history.
export const experience: Experience[] = [
    {
        company: 'Freelance',
        role: 'Frontend Developer',
        start: '2021',
        location: 'Remote',
        description:
            'Currently taking on client work — shipping interactive marketing sites, dashboards, and the occasional weird side-experiment.',
        stack: ['Svelte', 'Next.js', 'Three.js', 'GSAP', 'Tailwind']
    },
    {
        company: 'Doctor Code',
        url: 'http://doctor-code.net',
        role: 'Frontend Developer',
        start: '2022',
        end: '2023',
        location: 'Cairo, Egypt',
        description: 'A software company. Worked on a range of websites for different clients.',
        stack: ['React', 'TypeScript', 'GSAP', 'Tailwind']
    },
    {
        company: 'Arabia Pixel',
        url: 'https://arabiapixel.com',
        role: 'Frontend Developer',
        start: '2023',
        end: '2024',
        location: 'Remote',
        description:
            'Another software company. Built websites for various clients across different industries.',
        stack: ['Next.js', 'TypeScript', 'Tailwind']
    },
    {
        company: 'Beetleware',
        url: 'https://beetleware.com',
        role: 'Senior Frontend Developer',
        start: '2024',
        location: 'Remote',
        description:
            'Currently working on Soumtech, a real estate auction platform that lets clients, agents, and entities run public and private auctions online.',
        stack: ['Svelte', 'TypeScript', 'Tailwind']
    }
];
