<script lang="ts">
    import PostHeader from '$lib/components/blog/post-header.svelte';
    import Markdown from '$lib/components/blog/markdown.svelte';
    import PostToc from '$lib/components/blog/post-toc.svelte';
    import { themeStore } from '$lib/store/theme.svelte';

    let { data } = $props();
    const { post, url } = data;
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href={themeStore.theme === 'dark'
            ? '/css/prism-gruvbox-dark.css'
            : '/css/prism-gruvbox-light.css'}
    />
</svelte:head>

<div class="container flex items-start gap-4 px-4 py-32">
    <div class="mx-auto flex min-h-screen w-max max-w-5xl flex-col gap-10">
        <PostHeader {post} {url} />
        <Markdown content={post.content} />
    </div>
    <PostToc toc={[]} />
</div>
