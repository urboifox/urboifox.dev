<script lang="ts">
    import MetaData from '$lib/components/common/meta-data.svelte';

    let { data } = $props();
    const { posts } = data;
</script>

<svelte:head>
    <MetaData
        title="Blog | Fox"
        description="Welcome to my blog! Where I write about my experiences, thoughts, programming, and more."
    />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
    {#each posts as post}
        <div class="flex flex-col gap-4 max-w-sm">
            <h1 class="text-3xl font-bold">{post.title}</h1>
            <p class="text-lg line-clamp-2">{post.summary}</p>
            <a href="/blog/{post.slug}">Read more</a>
        </div>
    {/each}
</div>
