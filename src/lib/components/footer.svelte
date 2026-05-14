<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';

    const email = 'urboifox@gmail.com';

    const socials = [
        { title: 'Github', href: 'https://github.com/urboifox' },
        { title: 'Linkedin', href: 'https://linkedin.com/in/urboifox' },
        { title: 'Email', href: `mailto:${email}` }
    ];

    const nav = [
        { title: 'Home', href: '/' },
        { title: 'Posts', href: '/posts' }
    ];

    const year = new Date().getFullYear();
</script>

<footer aria-label="Site footer" class="bg-neutral-950/20 backdrop-blur-sm">
    <div class="container flex min-h-screen flex-col justify-between py-12 md:py-20">
        <div
            class="flex flex-col gap-4 text-neutral-500 md:flex-row md:items-center md:justify-between"
            {@attach blurIn()}
        >
            <div class="flex items-center gap-3">
                <span class="font-mono text-primary">04</span>
                <span class="h-px w-8 bg-neutral-800"></span>
                <span class="font-mono">~/contact</span>
            </div>
            <span class="font-mono text-xs tracking-widest text-neutral-600 uppercase">
                Let's talk
            </span>
        </div>

        <div class="space-y-6" {@attach blurIn(0.1)}>
            <h2 class="text-9xl leading-[0.85] font-bold md:text-[10rem]">
                Let's<br />talk<span class="text-primary">.</span>
            </h2>
            <a
                href={`mailto:${email}`}
                class="group pointer-events-auto inline-flex items-center gap-3 text-neutral-400 transition-colors hover:text-primary"
            >
                <span class="text-base md:text-xl">{email}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                </svg>
            </a>
        </div>

        <div
            class="flex flex-col gap-6 border-t border-neutral-900 pt-6 md:flex-row md:items-end md:justify-between"
            {@attach blurIn(0.2)}
        >
            <div class="space-y-2">
                <span class="block font-mono text-xs tracking-widest text-neutral-600 uppercase">
                    © {year} — Mohamed Ashraf
                </span>
                <span class="block text-xs text-neutral-700">
                    Built with Svelte, GSAP & Three.js.
                </span>
            </div>

            <ul
                class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 uppercase"
            >
                {#each nav as { title, href } (href)}
                    <li>
                        <a
                            {href}
                            class="group pointer-events-auto relative inline-block overflow-hidden"
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
                    </li>
                {/each}
                <li aria-hidden="true" class="text-neutral-800">·</li>
                {#each socials as { title, href } (title)}
                    <li>
                        <a
                            {href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group pointer-events-auto relative inline-block overflow-hidden"
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
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</footer>
