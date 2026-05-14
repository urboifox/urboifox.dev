<script>
    import { Canvas } from '@threlte/core';
    import Scene from './scene.svelte';
    import { blurIn } from '$lib/actions/blur-in';

    const description =
        'Frontend developer with a thing for motion, depth, and interfaces that make people stop scrolling.';

    const stack = ['Neovim', 'Svelte', 'Three.js', 'Tailwind', 'GSAP'];

    const socials = [
        { title: 'Github', href: 'https://github.com/urboifox' },
        { title: 'Linkedin', href: 'https://linkedin.com/in/urboifox' },
        { title: 'Email', href: 'mailto:urboifox@gmail.com' }
    ];
</script>

<section class="relative min-h-screen overflow-hidden">
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
        class="absolute top-16 left-4 z-20 text-neutral-800 select-none md:top-20 md:left-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="absolute top-16 right-4 z-20 text-neutral-800 select-none md:top-20 md:right-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="absolute bottom-4 left-4 z-20 text-neutral-800 select-none md:bottom-6 md:left-6"
    >
        +
    </span>
    <span
        aria-hidden="true"
        class="absolute right-4 bottom-4 z-20 text-neutral-800 select-none md:right-6 md:bottom-6"
    >
        +
    </span>

    <div class="relative z-10 container flex h-screen flex-col justify-between pt-28 pb-16">
        <div
            class="flex items-center justify-between text-xs text-neutral-500 opacity-0"
            {@attach blurIn()}
        >
            <div class="flex items-center gap-3">
                <span class="font-mono text-neutral-600">[01]</span>
                <span class="h-px w-8 bg-neutral-800"></span>
                <span class="font-mono">~/home</span>
            </div>
            <div class="hidden items-center gap-3 tracking-widest uppercase sm:flex">
                <span>Keyboard</span>
                <span class="text-neutral-700">·</span>
                <span>Terminal</span>
                <span class="text-neutral-700">·</span>
                <span>Code</span>
            </div>
        </div>

        <div class="flex items-end justify-between gap-4">
            <div class="space-y-6">
                <div
                    class="flex w-fit items-center gap-2 rounded-full border border-neutral-900 bg-background/40 p-2 px-4 backdrop-blur-sm"
                >
                    <span
                        class="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_1px] shadow-primary"
                    ></span>
                    <p class="text-xs text-neutral-400 uppercase">Available for work</p>
                </div>
                <div class="space-y-2">
                    <h1 class="text-8xl font-bold md:text-[10rem]">
                        Fox<span class="text-primary">.</span>
                    </h1>
                    <p class="max-w-md text-xs text-neutral-500 md:text-base">
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
                            class="stack-pill rounded-full border border-neutral-900 bg-background/40 px-3 py-1 text-xs text-neutral-500 opacity-0 backdrop-blur-sm"
                            {@attach blurIn(index * 0.1 + 1)}
                        >
                            {tech}
                        </li>
                    {/each}
                </ul>

                <div class="flex items-center gap-2 text-sm text-neutral-500 uppercase">
                    {#each socials as { title, href }, index (title)}
                        <a
                            {href}
                            target="_blank"
                            class="group relative overflow-hidden transition-colors"
                        >
                            <span
                                class="flex transition-transform duration-500 ease-out group-hover:-translate-y-full"
                            >
                                {title}
                            </span>
                            <span
                                class="absolute top-full left-0 text-foreground transition-[top] duration-500 ease-out group-hover:top-0"
                            >
                                {title}
                            </span>
                        </a>
                        {#if index !== socials.length - 1}
                            <span> // </span>
                        {/if}
                    {/each}
                </div>
            </div>

            <div class="flex flex-col items-end gap-8 text-neutral-600">
                <div
                    class="hero-meta flex flex-col items-end gap-2 text-xs tracking-widest uppercase opacity-0"
                    {@attach blurIn()}
                >
                    <span class="font-mono text-neutral-700">v.2.0</span>
                    <span class="h-8 w-px bg-neutral-800"></span>
                    <span class="text-neutral-600">Scroll to explore</span>
                </div>
            </div>
        </div>
    </div>
</section>
