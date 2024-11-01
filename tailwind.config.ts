import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--primary))',
                accent: 'rgb(var(--accent))',
                background: {
                    primary: 'rgb(var(--background))',
                    secondary: 'rgb(var(--background-secondary))'
                },
                comment: 'rgb(var(--comment))',
                paragraph: 'rgb(var(--paragraph))',
                silver: 'rgb(var(--silver))'
            },
            fontFamily: {
                montserrat: ['Montserrat Variable', 'sans-serif'],
                inria: ['Inria Sans', 'sans-serif']
            },
            container: {
                center: true,
                padding: '0.75rem'
            }
        }
    },

    plugins: []
} as Config;
