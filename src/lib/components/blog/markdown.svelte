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
    class="prose w-full max-w-5xl text-paragraph dark:prose-invert prose-a:text-primary prose-code:text-orange-400 prose-pre:transition-colors prose-pre:duration-300 prose-hr:border-comment/50"
>
    {@html content}
</div>
