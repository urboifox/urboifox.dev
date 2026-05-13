<script lang="ts">
    import type { PostSummary } from './+page';

    let { posts }: { posts: PostSummary[] } = $props();

    function formatDate(value: string) {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .toUpperCase();
    }
</script>

<section class="container py-32">
    <div class="mb-16 flex items-end justify-between gap-4">
        <div class="space-y-3">
            <p class="text-sm tracking-widest text-primary uppercase">The Journal</p>
            <h2 class="text-5xl font-bold md:text-6xl">
                Writing<span class="text-primary">.</span>
            </h2>
        </div>
        <a
            href="/posts"
            class="group pointer-events-auto hidden items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-primary md:flex"
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

    <ul class="border-t border-neutral-900">
        {#each posts as post, index (post.slug)}
            <li class="border-b border-neutral-900">
                <a
                    href="/posts/{post.slug}"
                    class="group pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-[padding] duration-500 ease-out hover:pl-6 md:gap-10"
                >
                    <div
                        class="flex w-12 items-center gap-3 font-mono text-xs text-neutral-600 md:w-20"
                    >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {#if post.date}
                            <span class="hidden md:inline">{formatDate(post.date)}</span>
                        {/if}
                    </div>

                    <div class="min-w-0 space-y-2">
                        <div class="flex items-center gap-3">
                            {#if post.category}
                                <span
                                    class="rounded-full border border-neutral-800 px-2.5 py-0.5 text-[10px] tracking-widest text-neutral-500 uppercase"
                                >
                                    {post.category}
                                </span>
                            {/if}
                        </div>
                        <h3
                            class="truncate text-2xl font-semibold transition-colors duration-300 group-hover:text-primary md:text-4xl"
                        >
                            {post.title}
                        </h3>
                        {#if post.description}
                            <p class="line-clamp-1 max-w-xl text-sm text-neutral-500">
                                {post.description}
                            </p>
                        {/if}
                    </div>

                    <div
                        class="flex items-center gap-3 text-neutral-700 transition-colors duration-300 group-hover:text-primary"
                    >
                        <span class="hidden text-xs tracking-widest uppercase md:inline">
                            Read
                        </span>
                        <span
                            class="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            >
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </span>
                    </div>
                </a>
            </li>
        {/each}
    </ul>

    <a
        href="/posts"
        class="group pointer-events-auto mt-8 flex items-center justify-center gap-2 text-sm text-neutral-400 transition-colors hover:text-primary md:hidden"
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
</section>
