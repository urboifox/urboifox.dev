<script lang="ts">
    const { data } = $props();
</script>

<svelte:head>
    <title>Posts</title>
</svelte:head>

<div class="container space-y-4 py-4">
    <a href="/" class="text-primary">Home</a>
    <h1 class="text-3xl font-bold">Posts</h1>
    {#each data.posts as post (post.slug)}
        <a href="/posts/{post.slug}">
            <article class="rounded-xl border border-gray-500 p-4">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
            </article>
        </a>
    {/each}
</div>
