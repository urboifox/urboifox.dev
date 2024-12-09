<script lang="ts">
    import gsap from 'gsap';
    import { cubicInOut, cubicOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { themeStore } from '$lib/store/theme.svelte';
    import { Moon, Sun } from 'lucide-svelte';

    const SLIDE_DURATION = 1000;
    const SLIDE_DELAY = 200;

    let isOpen = $state(false);

    function toggle() {
        isOpen = !isOpen;
    }

    const navItems = [
        {
            title: 'home',
            href: '/'
        },
        {
            title: 'craft',
            href: '/craft'
        },
        {
            title: 'blog',
            href: '/blog'
        }
    ] as const;

    let container: HTMLDivElement;

    function toggleTheme() {
        themeStore.theme = themeStore.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', themeStore.theme);
    }

    $effect(() => {
        if (!isOpen) return;
        let ctx = gsap.context(() => {
            const links = container.querySelectorAll('a');
            gsap.utils.toArray(links).forEach((link: unknown) => {
                if (link instanceof HTMLAnchorElement) {
                    const spans = link.querySelectorAll('span');
                    gsap.utils.toArray(spans).forEach((span) => {
                        let animation = gsap.to(span as HTMLSpanElement, {
                            paused: true,
                            y: gsap.utils.random(-30, 30),
                            x: gsap.utils.random(-10, 10),
                            opacity: gsap.utils.random(0.5, 1),
                            duration: 0.3
                        });

                        link.addEventListener('mouseenter', () => animation.play());
                        link.addEventListener('mouseleave', () => animation.reverse());
                    });
                }
            });
        }, container);

        return () => ctx.kill();
    });
</script>

<header
    class="container pointer-events-none fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-between gap-4 py-10 text-accent"
>
    <a
        href="/"
        class="pointer-events-auto text-xl capitalize text-paragraph transition-colors duration-300 hover:text-accent"
    >
        //
    </a>
    <nav>
        <ul class="flex items-center gap-10">
            <li>
                <a
                    class="pointer-events-auto text-comment transition-colors duration-300 hover:text-accent"
                    href="/">Home</a
                >
            </li>
            <li>
                <a
                    class="pointer-events-auto text-comment transition-colors duration-300 hover:text-accent"
                    href="/craft">Craft</a
                >
            </li>
            <li>
                <a
                    class="pointer-events-auto text-comment transition-colors duration-300 hover:text-accent"
                    href="/blog">Blog</a
                >
            </li>
        </ul>
    </nav>
    <div class="flex items-center gap-4">
        <button
            aria-label="switch theme"
            onclick={toggleTheme}
            class="pointer-events-auto transition-colors duration-300 hover:text-primary"
        >
            {#if themeStore.theme === 'dark'}
                <Sun size={24} strokeWidth={1} />
            {:else}
                <Moon size={24} strokeWidth={1} />
            {/if}
        </button>
        <button
            aria-label="switch menu"
            class="group pointer-events-auto origin-center py-2"
            onclick={toggle}
        >
            <div class="relative flex w-8 flex-col justify-center gap-2">
                <div
                    class="h-px w-full rounded-sm bg-comment transition-all duration-200 group-hover:bg-accent"
                    class:!bg-accent={isOpen}
                ></div>
                <div
                    class="h-px w-[70%] self-end rounded-sm bg-comment transition-all duration-200 group-hover:bg-accent"
                    class:!w-full={isOpen}
                    class:!bg-accent={isOpen}
                ></div>
                <div
                    class="h-px w-1/2 self-end rounded-sm bg-comment transition-all duration-200 group-hover:bg-accent"
                    class:!w-full={isOpen}
                    class:!bg-accent={isOpen}
                ></div>
            </div>
        </button>
    </div>
</header>

{#each [0, 1, 2, 3] as i (i)}
    {#if isOpen}
        <div
            transition:fly={{
                y: `-100vh`,
                duration: SLIDE_DURATION,
                delay: i * SLIDE_DELAY,
                opacity: 1,
                easing: cubicInOut
            }}
            class="fixed z-40 h-full w-1/4 bg-background-secondary"
            style="left: {i * 25}%"
        ></div>
    {/if}
{/each}

<div bind:this={container}>
    {#if isOpen}
        <div
            out:fade
            in:fade={{ delay: 5 * SLIDE_DELAY }}
            class="container fixed inset-0 z-40 flex flex-col justify-center"
        >
            <nav>
                <ul class="flex flex-col gap-10">
                    {#each navItems as { title, href }, i (i)}
                        <li
                            in:fly|global={{
                                x: -50,
                                duration: 1000,
                                easing: cubicOut,
                                delay: i * 200 + 5 * SLIDE_DELAY
                            }}
                        >
                            <a
                                onclick={toggle}
                                class="text-4xl capitalize text-paragraph transition-colors duration-200 hover:text-primary sm:text-6xl md:text-7xl lg:text-9xl"
                                {href}
                            >
                                {#each title.split('') as char, i (i)}
                                    <span class="inline-block transition-all duration-200 ease-out">
                                        {char}
                                    </span>
                                {/each}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    {/if}
</div>
