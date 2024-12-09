<script lang="ts">
    import { lenisInstance } from '$lib/store/lenis.svelte';
    import { cn } from '$lib/utils/cn';
    import type { TOCHeading } from '$lib/utils/mdast-extract-headings';

    interface Props {
        toc: TOCHeading[];
    }
    let { toc }: Props = $props();

    const leastDepth = Math.min(...toc.map((heading) => heading.depth));

    let tocContainer: HTMLElement;
    let tocLine: HTMLElement;
    let activeHeadingIndex = $state(0);

    $effect(() => {
        const tocElements = tocContainer.querySelectorAll('button');
        if (tocElements.length === 0) return;
        const activeHeading = tocElements[activeHeadingIndex];
        const activeHeadingHeight = activeHeading.clientHeight;
        tocLine.style.height = `${activeHeadingHeight}px`;

        const containerHeight = tocContainer.clientHeight;
        const offsetTop = activeHeading.offsetTop;
        const offsetTopPercentage = (offsetTop / containerHeight) * 100;
        tocLine.style.top = `${offsetTopPercentage}%`;
    });

    $effect(() => {
        const headings = toc.map((heading) => document.getElementById(heading.id));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = headings.findIndex((h) => h === entry.target);
                        if (index !== -1) {
                            activeHeadingIndex = index;
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -50% 0px',
                threshold: 0.5
            }
        );

        headings.forEach((heading) => {
            if (heading) observer.observe(heading);
        });

        return () => {
            observer.disconnect();
        };
    });
</script>

<aside class="sticky top-32 hidden w-80 flex-col gap-6 2xl:flex">
    <h2 class="text-lg font-semibold">Table of Contents</h2>
    <div
        class="relative flex flex-col gap-4 border-s border-comment/50 ps-4"
        bind:this={tocContainer}
    >
        {#each toc as heading, i}
            <button
                onclick={() => {
                    lenisInstance.lenis?.scrollTo(`#${heading.id}`);
                    activeHeadingIndex = i;
                }}
                style="margin-left: {(heading.depth - leastDepth) * 24}px;"
                class={cn(
                    'text-start text-sm text-paragraph transition-colors duration-300 active:text-accent lg:hover:text-accent',
                    activeHeadingIndex === i && 'text-accent'
                )}>{heading.value}</button
            >
        {/each}

        <div
            bind:this={tocLine}
            class="absolute left-0 top-0 h-20 w-px bg-primary transition-all duration-1000 ease-in-out"
        ></div>
    </div>
</aside>
