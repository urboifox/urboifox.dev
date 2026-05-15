<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import Footer from '$lib/components/footer.svelte';
    import PostCard from '$lib/components/post-card.svelte';
    import Seo from '$lib/components/seo.svelte';

    const { data } = $props();

    let category = $state('all');

    const filteredPosts = $derived(
        category === 'all' ? data.posts : data.posts.filter((p) => p.category === category)
    );

    const seoTitle = $derived(category !== 'all' ? `Posts · ${category}` : 'Posts');
    const description = 'Notes, deep-dives and the occasional rant about the things I build.';
</script>

<Seo title={seoTitle} {description} />

<section class="min-h-screen py-32">
    <div class="container mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-muted">
                <span class="font-mono text-primary">$</span>
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono">~/journal</span>
            </div>
            <h1 class="text-5xl font-bold capitalize md:text-6xl">
                All posts<span class="text-primary">.</span>
            </h1>
        </div>
        <p class="max-w-xs text-sm text-muted" {@attach blurIn()}>
            {description}
        </p>
    </div>

    <div class="container mb-8" {@attach blurIn(0.1)}>
        <div class="flex items-center gap-3 text-xs text-muted">
            <span class="font-mono tracking-widest uppercase">Filter</span>
            <span class="h-px flex-1 bg-border"></span>
        </div>
        <ul class="mt-4 flex flex-wrap gap-2">
            {#each data.categories as cat (cat)}
                {@const isActive = category === cat}
                <li>
                    <button
                        type="button"
                        onclick={() => (category = cat)}
                        aria-pressed={isActive}
                        class="pointer-events-auto inline-block rounded-full border px-3 py-1 text-[11px] tracking-widest uppercase transition-colors duration-300 {isActive
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted hover:border-muted hover:text-foreground'}"
                    >
                        {cat}
                    </button>
                </li>
            {/each}
        </ul>
    </div>

    <ul class="bg-card/20 backdrop-blur-sm">
        <div class="container border-t border-border">
            {#each filteredPosts as post, index (post.slug)}
                <div {@attach blurIn(index * 0.1)}>
                    <PostCard {post} {index} />
                </div>
            {:else}
                <li class="py-16 text-center text-sm text-muted">
                    No posts in <span class="text-foreground">{category}</span> yet.
                </li>
            {/each}
        </div>
    </ul>
</section>

<Footer />
