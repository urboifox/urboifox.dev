<script lang="ts">
    import type { Project } from '../data/projects';

    let { projects }: { projects: Project[] } = $props();
</script>

<section class="container py-32">
    <div class="mb-16 flex items-end justify-between gap-4">
        <div class="space-y-3">
            <p class="text-sm tracking-widest text-primary uppercase">Selected work</p>
            <h2 class="text-5xl font-bold md:text-6xl">
                Projects<span class="text-primary">.</span>
            </h2>
        </div>
        <p class="hidden max-w-xs text-sm text-neutral-500 md:block">
            A few things I've built recently. Each one was an excuse to push pixels a little
            further.
        </p>
    </div>

    <ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {#each projects as project, index (project.slug)}
            <li>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group pointer-events-auto relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 transition-colors duration-300 hover:border-primary/50"
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
