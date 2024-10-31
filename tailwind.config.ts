import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                accent: 'var(--accent)',
                background: 'var(--background)',
                comment: 'var(--comment)',
                paragraph: 'var(--paragraph)'
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
