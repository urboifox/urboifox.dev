<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import PostCard from '$lib/components/post-card.svelte';
    import type { PostSummary } from '$lib/posts';

    let { posts }: { posts: PostSummary[] } = $props();
</script>

<section class="py-20 md:py-32">
    <div class="container mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-muted">
                <span class="font-mono text-primary">03</span>
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono">~/journal</span>
            </div>
            <h2 class="text-5xl font-bold md:text-6xl">
                Writing<span class="text-primary">.</span>
            </h2>
        </div>
        <a
            href="/posts"
            class="group pointer-events-auto flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            {@attach blurIn()}
        >
            <span>All posts</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
            </svg>
        </a>
    </div>

    <ul class="bg-card/20 backdrop-blur-sm">
        <div class="container border-t border-border">
            {#each posts as post, index (post.slug)}
                <div {@attach blurIn(index * 0.15)}>
                    <PostCard {post} {index} />
                </div>
            {/each}
        </div>
    </ul>
</section>
