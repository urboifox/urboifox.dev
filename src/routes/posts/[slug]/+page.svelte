<script lang="ts">
    const { data } = $props();
</script>

<svelte:head>
    <title>{data.metadata.title}</title>
</svelte:head>

<div class="container">
    <a href="/posts" class="text-primary">Back to posts</a>

    <h1 class="mt-4 text-3xl font-bold">{data.metadata.title}</h1>

    <div class="prose mt-4 text-foreground prose-headings:text-primary prose-strong:text-primary">
        <data.content />
    </div>
</div>
