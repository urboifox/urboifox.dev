<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import PostCard from '$lib/components/post-card.svelte';

    const { data } = $props();

    function hrefFor(category: string) {
        return category === 'all' ? '/posts' : `/posts?category=${encodeURIComponent(category)}`;
    }
</script>

<svelte:head>
    <title>Posts - Mohamed Ashraf</title>
</svelte:head>

<section class="py-32 min-h-screen">
    <div class="container mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-muted">
                <span class="font-mono text-primary">#</span>
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono">~/journal</span>
            </div>
            <h1 class="text-5xl font-bold capitalize md:text-6xl">
                All posts<span class="text-primary">.</span>
            </h1>
        </div>
        <p class="max-w-xs text-sm text-muted" {@attach blurIn()}>
            Notes, deep-dives and the occasional rant about the things I build.
        </p>
    </div>

    {#if data.categories.length > 2}
        <div class="container mb-8" {@attach blurIn(0.1)}>
            <div class="flex items-center gap-3 text-xs text-muted">
                <span class="font-mono tracking-widest uppercase">Filter</span>
                <span class="h-px flex-1 bg-border"></span>
            </div>
            <ul class="mt-4 flex flex-wrap gap-2">
                {#each data.categories as category (category)}
                    {@const isActive = data.category === category}
                    <li>
                        <a
                            href={hrefFor(category)}
                            data-sveltekit-noscroll
                            data-sveltekit-replacestate
                            aria-current={isActive ? 'page' : undefined}
                            class="pointer-events-auto inline-block rounded-full border px-3 py-1 text-[11px] tracking-widest uppercase transition-colors duration-300 {isActive
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-muted hover:border-muted hover:text-foreground'}"
                        >
                            {category}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    <ul class="bg-card/20 backdrop-blur-sm">
        <div class="container border-t border-border">
            {#each data.posts as post, index (post.slug)}
                <div {@attach blurIn(index * 0.1)}>
                    <PostCard {post} {index} />
                </div>
            {:else}
                <li class="py-16 text-center text-sm text-muted">
                    No posts in <span class="text-foreground">{data.category}</span> yet.
                </li>
            {/each}
        </div>
    </ul>
</section>
