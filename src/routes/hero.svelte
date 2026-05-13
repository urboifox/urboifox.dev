<script>
    import { Canvas } from '@threlte/core';
    import Scene from './scene.svelte';
    import { blurIn } from '$lib/actions/blur-in';

    const description =
        'Frontend developer with a thing for motion, depth, and interfaces that make people stop scrolling.';

    const stack = ['Neovim', 'Svelte', 'Three.js', 'Tailwind', 'GSAP'];
</script>

<section class="relative min-h-dvh overflow-hidden">
    <div
        class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-foreground)_1px,transparent_0)] bg-size-[24px_24px] opacity-[0.06]"
    ></div>

    <div class="absolute top-0 left-0 z-0 h-full w-full">
        <Canvas>
            <Scene />
        </Canvas>
    </div>

    <span
        aria-hidden="true"
        class="pointer-events-none absolute top-16 left-4 z-20 text-neutral-800 select-none md:top-20 md:left-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="pointer-events-none absolute top-16 right-4 z-20 text-neutral-800 select-none md:top-20 md:right-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="pointer-events-none absolute bottom-4 left-4 z-20 text-neutral-800 select-none md:bottom-6 md:left-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="pointer-events-none absolute right-4 bottom-4 z-20 text-neutral-800 select-none md:right-6 md:bottom-6"
    >
        +
    </span>

    <div
        class="pointer-events-none relative z-10 container flex h-dvh flex-col justify-between pt-28 pb-16"
    >
        <div
            class="flex items-center justify-between text-xs tracking-widest text-neutral-500 uppercase opacity-0"
            {@attach blurIn()}
        >
            <div class="flex items-center gap-3">
                <span class="font-mono text-neutral-600">[01]</span>
                <span class="hidden h-px w-8 bg-neutral-800 sm:block"></span>
                <span class="font-mono">~/home</span>
            </div>
            <div class="hidden items-center gap-3 sm:flex">
                <span>Caffeine</span>
                <span class="text-neutral-700">·</span>
                <span>Curiosity</span>
                <span class="text-neutral-700">·</span>
                <span>Code</span>
            </div>
        </div>

        <div class="flex items-end justify-between gap-4">
            <div class="space-y-4">
                <div
                    class="flex w-fit items-center gap-2 rounded-full border border-neutral-900 bg-background/40 p-2 px-4 backdrop-blur-sm"
                >
                    <span
                        class="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_1px] shadow-primary"
                    ></span>
                    <p class="text-sm text-neutral-400">Available for work</p>
                </div>
                <div class="space-y-2">
                    <h1 class="text-8xl font-bold md:text-9xl">
                        Fox<span class="text-primary">.</span>
                    </h1>
                    <p class="max-w-md text-neutral-400">
                        {#each description.split(' ') as word, index (index)}
                            <span
                                class="whitespace-nowrap opacity-0"
                                {@attach blurIn(index * 0.05)}
                            >
                                {word}
                            </span>
                            {' '}
                        {/each}
                    </p>
                </div>

                <ul class="flex flex-wrap gap-2 pt-1">
                    {#each stack as tech, index (tech)}
                        <li
                            class="stack-pill pointer-events-auto rounded-full border border-neutral-900 bg-background/40 px-3 py-1 text-xs text-neutral-500 opacity-0 backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
                            {@attach blurIn(index * 0.1 + 1)}
                        >
                            {tech}
                        </li>
                    {/each}
                </ul>

                <div
                    class="flex items-center gap-2 text-neutral-500 opacity-0"
                    {@attach blurIn(1.5)}
                >
                    <a
                        href="https://github.com/urboifox"
                        target="_blank"
                        class="pointer-events-auto transition-colors hover:text-foreground"
                    >
                        Github
                    </a>
                    <span> / </span>
                    <a
                        href="https://linkedin.com/in/urboifox"
                        target="_blank"
                        class="pointer-events-auto transition-colors hover:text-foreground"
                    >
                        Linkedin
                    </a>
                    <span> / </span>
                    <a
                        href="mailto:urboifox@gmail.com"
                        target="_blank"
                        class="pointer-events-auto transition-colors hover:text-foreground"
                    >
                        Contact
                    </a>
                </div>
            </div>

            <div class="flex flex-col items-end gap-8 text-neutral-600">
                <div
                    class="hero-meta hidden flex-col items-end gap-2 text-xs tracking-widest uppercase opacity-0 blur-sm md:flex"
                >
                    <span class="font-mono text-neutral-700">v.2.0</span>
                    <span class="h-8 w-px bg-neutral-800"></span>
                    <span class="text-neutral-500">Scroll to explore</span>
                </div>
                <div class="flex animate-pulse flex-col gap-5">
                    <p class="-rotate-90 md:hidden">Scroll</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 28" fill="none">
                        <line
                            x1="8"
                            y1="0"
                            x2="8"
                            y2="22"
                            stroke="currentColor"
                            stroke-width="0.5"
                            stroke-linecap="round"
                        />
                        <polyline
                            points="4,20 8,25 12,20"
                            stroke="currentColor"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</section>
