import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md', '.svx'],
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md', '.svx'],
            rehypePlugins: [rehypeSlug]
        })
    ],
    vitePlugin: {
        exclude: ['lucide-svelte']
    },

    kit: {
        adapter: adapter()
    }
};

export default config;
