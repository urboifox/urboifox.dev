import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    vitePlugin: {
        exclude: ['lucide-svelte']
    },

    kit: {
        adapter: adapter({
            isr: {
                expiration: 60 * 120, // 2 hours
            }
        }),
    }
};

export default config;
