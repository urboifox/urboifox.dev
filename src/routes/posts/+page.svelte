<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import PostCard from '$lib/components/post-card.svelte';

    const { data } = $props();
</script>

<svelte:head>
    <title>Posts - Mohamed Ashraf</title>
</svelte:head>

<section class="py-32">
    <div class="container mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-neutral-500">
                <span class="font-mono text-primary">#</span>
                <span class="h-px w-8 bg-neutral-800"></span>
                <span class="font-mono">~/journal</span>
            </div>
            <h1 class="text-5xl font-bold md:text-6xl">
                All posts<span class="text-primary">.</span>
            </h1>
        </div>
        <p class="max-w-xs text-sm text-neutral-500" {@attach blurIn()}>
            Notes, deep-dives and the occasional rant about the things I build.
        </p>
    </div>

    <ul class="bg-neutral-950/20 backdrop-blur-sm">
        <div class="container border-t border-neutral-900">
            {#each data.posts as post, index (post.slug)}
                <div {@attach blurIn(index * 0.15)}>
                    <PostCard {post} {index} />
                </div>
            {/each}
        </div>
    </ul>
</section>
