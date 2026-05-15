<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import type { Project } from '../data/projects';

    let { projects }: { projects: Project[] } = $props();

    let listEl: HTMLUListElement | undefined = $state();
    let innerWidth = $state(0);
    const isMobile = $derived(innerWidth > 0 && innerWidth < 768);

    let pendingX = 0;
    let pendingY = 0;
    let rafScheduled = false;
    let cachedCards: HTMLElement[] = [];
    let cachedRects: DOMRect[] = [];

    function refreshCache() {
        if (!listEl) {
            cachedCards = [];
            cachedRects = [];
            return;
        }
        cachedCards = Array.from(listEl.querySelectorAll<HTMLElement>('.project-card'));
        cachedRects = cachedCards.map((c) => c.getBoundingClientRect());
    }

    function flush() {
        rafScheduled = false;
        for (let i = 0; i < cachedCards.length; i++) {
            const rect = cachedRects[i];
            cachedCards[i].style.setProperty('--x', `${pendingX - rect.left}px`);
            cachedCards[i].style.setProperty('--y', `${pendingY - rect.top}px`);
        }
    }

    function handleMouseMove(event: MouseEvent) {
        if (isMobile || !listEl) return;
        pendingX = event.clientX;
        pendingY = event.clientY;
        if (!rafScheduled) {
            rafScheduled = true;
            requestAnimationFrame(flush);
        }
    }

    $effect(() => {
        if (!listEl) return;
        refreshCache();

        if (isMobile) {
            cachedCards.forEach((card, index) => {
                if (index === 0) {
                    card.style.setProperty('--x', '50%');
                    card.style.setProperty('--y', '0px');
                } else {
                    card.style.removeProperty('--x');
                    card.style.removeProperty('--y');
                }
            });
            return;
        }

        const onResize = () => refreshCache();
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onResize, { passive: true });
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onResize);
        };
    });
</script>

<svelte:window bind:innerWidth onmousemove={handleMouseMove} />

<section class="container py-20 md:py-32">
    <div class="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-muted">
                <span class="font-mono text-primary">02</span>
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono">~/workspace</span>
            </div>
            <h2 class="text-5xl font-bold md:text-6xl">
                Projects<span class="text-primary">.</span>
            </h2>
        </div>
        <p class="max-w-xs text-sm text-muted" {@attach blurIn()}>
            A few things I've built recently. Each one was an excuse to push pixels a little
            further.
        </p>
    </div>

    <ul bind:this={listEl} class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {#each projects as project, index (project.slug)}
            <li {@attach blurIn(index * 0.15)}>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-card group pointer-events-auto relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-border bg-card/20 p-6"
                >
                    <div
                        class="pointer-events-none absolute -top-px -right-px h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                    ></div>

                    <div class="flex items-start justify-between gap-4">
                        <span class="font-mono text-xs text-muted">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </div>

                    <div class="space-y-3">
                        <h3
                            class="text-3xl font-semibold transition-colors group-hover:text-primary"
                        >
                            {project.title}
                        </h3>
                        <p class="max-w-md text-sm text-muted">
                            {project.description}
                        </p>
                        <ul class="flex flex-wrap gap-2 pt-2">
                            {#each project.tags as tag (tag)}
                                <li
                                    class="rounded-full border border-border px-3 py-1 text-xs text-muted"
                                >
                                    {tag}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</section>

<style>
    .project-card::before {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: radial-gradient(
            280px circle at var(--x, -200px) var(--y, -200px),
            var(--color-primary) 0%,
            transparent 70%
        );
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 1;
    }
</style>
