<script lang="ts">
    import { page } from '$app/state';
    import { blurIn } from '$lib/actions/blur-in';

    const email = 'urboifox@gmail.com';

    const socials = [
        { title: 'Github', href: 'https://github.com/urboifox' },
        { title: 'Linkedin', href: 'https://linkedin.com/in/urboifox' },
        { title: 'Email', href: `mailto:${email}` }
    ];

    const nav = [
        { title: 'Home', href: '/' },
        { title: 'Posts', href: '/posts' },
        { title: 'About Me', href: '/whoami' }
    ];

    const year = new Date().getFullYear();
</script>

<footer aria-label="Site footer" class="bg-card/20 backdrop-blur-sm">
    <div class="container flex min-h-screen flex-col justify-between py-12 md:py-20">
        <div
            class="flex flex-col gap-4 text-muted md:flex-row md:items-center md:justify-between"
            {@attach blurIn()}
        >
            <div class="flex items-center gap-3">
                {#if page.url.pathname === '/'}
                    <span class="font-mono text-primary"> 05 </span>
                {:else}
                    <span class="font-mono text-primary"> $ </span>
                {/if}
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono">~/contact</span>
            </div>
            <span class="font-mono text-xs tracking-widest text-muted uppercase"> Let's talk </span>
        </div>

        <div class="space-y-6" {@attach blurIn(0.1)}>
            <h2 class="text-9xl leading-[0.85] font-bold md:text-[10rem]">
                Let's<br />talk<span class="text-primary">.</span>
            </h2>
            <a
                href={`mailto:${email}`}
                class="group pointer-events-auto inline-flex items-center gap-3 text-muted transition-colors hover:text-primary"
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
            class="flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-end md:justify-between"
            {@attach blurIn(0.2)}
        >
            <div class="space-y-2">
                <span class="block font-mono text-xs tracking-widest text-muted uppercase">
                    © {year} — Mohamed Ashraf
                </span>
                <span class="block text-xs text-muted"> Built with Svelte, GSAP & Three.js. </span>
            </div>

            <ul class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted uppercase">
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
                <li aria-hidden="true" class="text-border">·</li>
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
