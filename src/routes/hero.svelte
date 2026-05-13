<script>
    import { Canvas } from '@threlte/core';
    import Scene from './scene.svelte';
    import Header from '$lib/components/header.svelte';
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    const description =
        'Frontend developer with a thing for motion, depth, and interfaces that make people stop scrolling.';

    onMount(() => {
        gsap.to('.description-word', {
            duration: 1,
            opacity: 1,
            ease: 'power2.out',
            filter: 'blur(0px)',
            stagger: 0.05
        });

        gsap.to('#socials', {
            duration: 1,
            delay: 0.05 * description.split(' ').length,
            opacity: 1,
            ease: 'power2.out',
            filter: 'blur(0px)'
        });
    });
</script>

<section class="relative min-h-dvh">
    <div class="absolute top-0 left-0 z-0 h-full w-full">
        <Canvas>
            <Scene />
        </Canvas>
    </div>
    <div
        class="pointer-events-none relative z-10 container flex h-dvh flex-col justify-between pb-16"
    >
        <div>
            <Header />
        </div>
        <div class="flex items-end justify-between gap-4">
            <div class="space-y-4">
                <div
                    class="flex w-fit items-center gap-2 rounded-full border border-neutral-900 p-2 px-4"
                >
                    <span
                        class="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_1px] shadow-primary"
                    ></span>
                    <p class="text-sm text-neutral-400">Available for work</p>
                </div>
                <div class="space-y-2">
                    <h1 class="text-9xl font-bold">Fox<span class="text-primary">.</span></h1>
                    <p class="max-w-md text-neutral-400">
                        {#each description.split(' ') as word, index (index)}
                            <span class="description-word whitespace-nowrap opacity-0 blur-sm">
                                {word}
                            </span>
                            {' '}
                        {/each}
                    </p>
                </div>
                <div
                    id="socials"
                    class="flex items-center gap-2 text-neutral-500 opacity-0 blur-sm"
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

            <div class="flex animate-pulse flex-col gap-5 text-neutral-600">
                <p class="-rotate-90">Scroll</p>
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
</section>
