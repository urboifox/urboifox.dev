<script lang="ts">
    import type { PostSummary } from '$lib/posts';

    const { post, index }: { post: PostSummary; index: number } = $props();

    function formatDate(value: string) {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .toUpperCase();
    }
</script>

<li class="border-b border-border">
    <a
        href="/posts/{post.slug}"
        class="group pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-[padding] duration-500 ease-out md:gap-10 lg:hover:pl-6"
    >
        <div class="flex items-center gap-3 font-mono text-xs text-muted md:w-20">
            <span>{String(index + 1).padStart(2, '0')}</span>
            {#if post.date}
                <span class="hidden md:inline">{formatDate(post.date)}</span>
            {/if}
        </div>

        <div class="min-w-0 space-y-2">
            <div class="flex items-center gap-3">
                {#if post.category}
                    <span
                        class="rounded-full border border-border px-2.5 py-0.5 text-[10px] tracking-widest text-muted uppercase"
                    >
                        {post.category}
                    </span>
                {/if}
            </div>
            <h3
                class="truncate text-2xl leading-normal font-semibold transition-colors duration-300 group-hover:text-primary md:text-4xl"
            >
                {post.title}
            </h3>
            {#if post.description}
                <p class="line-clamp-1 max-w-xl text-sm text-muted">
                    {post.description}
                </p>
            {/if}
        </div>

        <div
            class="flex items-center gap-3 text-muted transition-colors duration-300 group-hover:text-primary"
        >
            <span class="hidden text-xs tracking-widest uppercase md:inline"> Read </span>
            <span
                class="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
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
