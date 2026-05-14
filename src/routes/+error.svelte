<script lang="ts">
    import { page } from '$app/state';
    import { blurIn } from '$lib/actions/blur-in';
    import Seo from '$lib/components/seo.svelte';
</script>

<Seo
    title={`${page.status}`}
    description={page.error?.message ?? 'Page not found.'}
    noindex
/>

<section class="container flex min-h-screen flex-col items-center justify-center py-32">
    <div class="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
        <div class="flex items-center gap-3 text-xs text-muted opacity-0" {@attach blurIn()}>
            <span class="font-mono text-primary">!</span>
            <span class="h-px w-8 bg-border"></span>
            <span class="font-mono tracking-widest uppercase">~/lost</span>
        </div>

        <h1
            class="text-7xl font-bold tracking-tight opacity-0 md:text-9xl"
            {@attach blurIn(0.1)}
        >
            {page.status}<span class="text-primary">.</span>
        </h1>

        <p
            class="max-w-md text-base text-muted opacity-0 md:text-lg"
            {@attach blurIn(0.2)}
        >
            {page.error?.message ?? 'Something went sideways.'}
        </p>

        <div
            class="flex flex-wrap items-center justify-center gap-4 pt-2 opacity-0"
            {@attach blurIn(0.3)}
        >
            <a
                href="/"
                class="group pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2 text-sm text-muted backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
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
                <span>Back home</span>
            </a>

            <a
                href="/posts"
                class="group pointer-events-auto inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            >
                <span>Browse posts</span>
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
            </a>
        </div>
    </div>
</section>
