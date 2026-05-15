<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';
    import Seo from '$lib/components/seo.svelte';
    import { bio, experience } from '../../data/whoami';

    function year(value: string) {
        return value.slice(0, 4);
    }

    function range(start: string, end?: string) {
        return `${year(start)} — ${end ? year(end) : 'Present'}`;
    }
</script>

<Seo
    title="Whoami"
    description="A bit about me, the places I've worked, and the things I tend to reach for."
/>

<section class="container min-h-screen py-32">
    <div class="mx-auto max-w-3xl space-y-24">
        <header class="space-y-6 opacity-0" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-xs text-muted">
                <span class="font-mono text-primary">$</span>
                <span class="h-px w-8 bg-border"></span>
                <span class="font-mono tracking-widest">~/whoami</span>
            </div>
            <h1 class="text-6xl font-bold md:text-8xl">
                Whoami<span class="text-primary">.</span>
            </h1>
        </header>

        <article
            class="overflow-hidden rounded-2xl border border-border bg-card/40 opacity-0"
            {@attach blurIn(0.1)}
        >
            <header class="flex items-center gap-1.5 border-b border-border bg-card/60 px-4 py-2.5">
                <span class="h-2.5 w-2.5 rounded-full bg-primary"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-border"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-border"></span>
                <span class="ml-3 font-mono text-xs tracking-widest text-muted"> whoami.sh </span>
            </header>

            <div class="space-y-2 p-6 font-mono text-sm md:p-8">
                <p>
                    <span class="text-primary">$</span>
                    <span class="text-muted">whoami</span>
                </p>
                <p class="pl-3 text-foreground">{bio.name}</p>

                <p class="pt-4">
                    <span class="text-primary">$</span>
                    <span class="text-muted">cat ~/.profile</span>
                </p>
                <div class="space-y-0.5 pl-3 text-foreground">
                    <p><span class="text-muted">role&nbsp;&nbsp;&nbsp;&nbsp;:</span> {bio.role}</p>
                    <p>
                        <span class="text-muted">location:</span>
                        {bio.location}
                    </p>
                    <p>
                        <span class="text-muted">status&nbsp;&nbsp;:</span>
                        <span class="text-primary">{bio.status}</span>
                    </p>
                </div>

                <p class="pt-4">
                    <span class="text-primary">$</span>
                    <span class="text-muted">cat about.md</span>
                </p>
                <div class="space-y-4 pt-1 pl-3 font-sans">
                    {#each bio.paragraphs as paragraph, i (i)}
                        <p class="max-w-2xl leading-7 text-foreground">{paragraph}</p>
                    {/each}
                </div>

                <p class="pt-4">
                    <span class="text-primary">$</span>
                    <a
                        href="/cv.pdf"
                        download="Mohamed Ashraf — Frontend Developer.pdf"
                        class="group inline-flex items-center gap-1.5 text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                        <span>wget ~/cv.pdf</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                        >
                            <path d="M12 3v12" />
                            <path d="m7 10 5 5 5-5" />
                            <path d="M5 21h14" />
                        </svg>
                    </a>
                </p>

                <p class="pt-1">
                    <span class="text-primary">$</span>
                    <span class="caret"></span>
                </p>
            </div>
        </article>

        <section class="space-y-12">
            <div class="space-y-4" {@attach blurIn(0.2)}>
                <div class="flex items-center gap-3 text-muted">
                    <span class="font-mono text-primary">02</span>
                    <span class="h-px w-8 bg-border"></span>
                    <span class="font-mono text-xs tracking-widest">~/journey</span>
                </div>
                <h2 class="text-4xl font-bold md:text-5xl">
                    Where I've been<span class="text-primary">.</span>
                </h2>
            </div>

            <ol class="relative">
                <span aria-hidden="true" class="absolute top-2 bottom-2 left-1.75 w-px bg-border"
                ></span>

                {#each experience as exp, i (i)}
                    <li class="relative pb-12 pl-10 last:pb-0" {@attach blurIn(0.25 + i * 0.1)}>
                        <span
                            aria-hidden="true"
                            class="absolute top-2 left-0 h-4 w-4 rounded-full border-2 border-primary bg-background transition-transform duration-300 group-hover:scale-110"
                        ></span>

                        <div class="space-y-3">
                            <div
                                class="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-widest uppercase"
                            >
                                <span class="text-primary">{range(exp.start, exp.end)}</span>
                                {#if exp.location}
                                    <span aria-hidden="true" class="text-border">·</span>
                                    <span class="text-muted">{exp.location}</span>
                                {/if}
                            </div>

                            <h3 class="text-2xl font-semibold md:text-3xl">
                                {#if exp.url}
                                    <a
                                        href={exp.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="group pointer-events-auto inline-flex items-center gap-2 transition-colors hover:text-primary"
                                    >
                                        <span>{exp.company}</span>
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
                                {:else}
                                    {exp.company}
                                {/if}
                            </h3>

                            <p class="font-mono text-xs tracking-widest text-muted uppercase">
                                {exp.role}
                            </p>

                            {#if exp.description}
                                <p class="max-w-prose leading-7 text-muted">
                                    {exp.description}
                                </p>
                            {/if}

                            {#if exp.stack && exp.stack.length}
                                <ul class="flex flex-wrap gap-2 pt-2">
                                    {#each exp.stack as tech (tech)}
                                        <li
                                            class="rounded-full border border-border px-3 py-1 text-xs text-muted"
                                        >
                                            {tech}
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    </li>
                {/each}
            </ol>
        </section>
    </div>
</section>

<style>
    .caret {
        display: inline-block;
        width: 0.55rem;
        height: 1rem;
        vertical-align: -2px;
        background-color: currentColor;
        animation: blink 1.1s steps(1) infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
