<script lang="ts">
    import { lenisInstance } from '$lib/store/lenis.svelte';
    import { cn } from '$lib/utils/cn';
    import type Lenis from 'lenis';

    let scroll = $state(0);
    let visible = $state(false);

    $effect(() => {
        let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

        function handleScroll({ progress }: Lenis) {
            const truncatedProgress = +progress.toFixed(5);
            if (truncatedProgress === scroll) return;
            scroll = truncatedProgress;

            if (truncatedProgress > 0.01 && truncatedProgress < 0.99) {
                visible = true;
            } else {
                visible = false;
            }

            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                visible = false;
            }, 200);
        }

        lenisInstance.lenis?.on('scroll', handleScroll);
        return () => {
            lenisInstance.lenis?.off('scroll', handleScroll);
        };
    });
</script>

<div
    class={cn(
        'pointer-events-none fixed right-1 sm:right-4 top-1/2 z-10 h-1/4 w-1 -translate-y-1/2 overflow-hidden rounded-md border border-comment/20 transition-opacity duration-500',
        visible ? 'opacity-100' : 'opacity-0'
    )}
>
    <div class="absolute w-full bg-accent/50" style="height: {scroll * 100}%;"></div>
</div>
