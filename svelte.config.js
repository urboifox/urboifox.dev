import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import codeTitles from 'remark-code-title';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
            filename.split(/[/\\]/).includes('node_modules') ? undefined : true
    },
    kit: { adapter: adapter() },
    preprocess: [mdsvex({ extensions: ['.svx', '.md'], remarkPlugins: [codeTitles] })],
    extensions: ['.svelte', '.svx', '.md']
};

export default config;
