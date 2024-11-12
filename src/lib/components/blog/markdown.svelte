<script lang="ts">
    import { themeStore } from '$lib/store/theme.svelte';

    let { content }: { content: string } = $props();
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href={themeStore.theme === 'dark'
            ? '/css/prism-gruvbox-dark.css'
            : '/css/prism-gruvbox-light.css'}
    />
</svelte:head>

<div
    class="prose prose-sm max-w-5xl w-full text-paragraph dark:prose-invert sm:prose-lg prose-a:text-primary prose-code:text-orange-400 prose-pre:transition-colors prose-pre:duration-300 prose-hr:border-comment/50 prose-pre:max-w-full"
>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html content}
</div>
