<script lang="ts">
    import MetaData from '$lib/components/common/meta-data.svelte';
    import PostToc from '$lib/components/blog/post-toc.svelte';
    import Markdown from '$lib/components/blog/markdown.svelte';
    import PostHeader from '$lib/components/blog/post-header.svelte';

    let { data } = $props();
    const { post, url, toc, dom } = data;
</script>

<svelte:head>
    <MetaData
        title={post.title}
        description={post.summary}
        href={url.href}
        image={post.image}
    />
</svelte:head>


<div class="container flex items-start gap-4 px-4 py-32">
    <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10">
        <PostHeader {post} {url} />
        <Markdown content={dom} />
    </div>
    <PostToc {toc} />
</div>
