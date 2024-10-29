import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {},
            fontFamily: {
                montserrat: ['Montserrat Variable', 'sans-serif']
            },
            container: {
                center: true,
                padding: '1rem'
            }
        }
    },

    plugins: []
} as Config;
