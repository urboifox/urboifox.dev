<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import type { Project } from '../data/projects';

    let { projects }: { projects: Project[] } = $props();

    let listEl: HTMLUListElement | undefined = $state();

    function handleMouseMove(event: MouseEvent) {
        if (!listEl) return;
        const cards = listEl.querySelectorAll<HTMLElement>('.project-card');
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${event.clientX - rect.left}px`);
            card.style.setProperty('--y', `${event.clientY - rect.top}px`);
        });
    }
</script>

<svelte:window onmousemove={handleMouseMove} />

<section class="container py-32">
    <div class="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <p class="text-sm tracking-widest text-primary">~/selected-work</p>
            <h2 class="text-5xl font-bold md:text-6xl">
                Projects<span class="text-primary">.</span>
            </h2>
        </div>
        <p class="max-w-xs text-sm text-neutral-500" {@attach blurIn()}>
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
                    class="project-card group pointer-events-auto relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6"
                >
                    <div
                        class="pointer-events-none absolute -top-px -right-px h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                    ></div>

                    <div class="flex items-start justify-between gap-4">
                        <span class="font-mono text-xs text-neutral-600">
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
                            class="h-5 w-5 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
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
                        <p class="max-w-md text-sm text-neutral-400">
                            {project.description}
                        </p>
                        <ul class="flex flex-wrap gap-2 pt-2">
                            {#each project.tags as tag (tag)}
                                <li
                                    class="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500"
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
