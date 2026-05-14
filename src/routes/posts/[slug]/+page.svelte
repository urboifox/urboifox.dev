<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';

    const { data } = $props();

    function formatDate(value?: string) {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .toUpperCase();
    }
</script>

<svelte:head>
    <title>{data.metadata.title} - Mohamed Ashraf</title>
    <link href="/themes/theme.css" rel="stylesheet" />
    {#if data.metadata.description}
        <meta name="description" content={data.metadata.description} />
    {/if}
</svelte:head>

<article class="container min-h-screen py-32">
    <div class="mx-auto max-w-3xl">
        <a
            href="/posts"
            class="group pointer-events-auto inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            {@attach blurIn()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="11 18 5 12 11 6" />
            </svg>
            <span>All posts</span>
        </a>

        <header class="mt-12 mb-16 space-y-6 border-b border-border pb-12" {@attach blurIn(0.1)}>
            <div class="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span class="font-mono text-primary">#</span>
                <span class="h-px w-8 bg-border"></span>
                {#if data.metadata.category}
                    <span
                        class="rounded-full border border-border px-2.5 py-0.5 text-[10px] tracking-widest uppercase"
                    >
                        {data.metadata.category}
                    </span>
                {/if}
                {#if data.metadata.published}
                    <span class="font-mono tracking-widest">
                        {formatDate(data.metadata.published)}
                    </span>
                {/if}
            </div>

            <h1 class="text-5xl font-bold capitalize md:text-6xl">
                {data.metadata.title}<span class="text-primary">.</span>
            </h1>

            {#if data.metadata.description}
                <p class="text-base text-muted md:text-lg">
                    {data.metadata.description}
                </p>
            {/if}
        </header>

        <div class="prose" {@attach blurIn(0.2)}>
            <data.content />
        </div>
    </div>
</article>
