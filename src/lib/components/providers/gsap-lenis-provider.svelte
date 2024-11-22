<script lang="ts">
    import { lenisInstance } from '$lib/store/lenis.svelte';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/dist/ScrollTrigger';
    import Lenis from 'lenis';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // init lenis and sync scrollTrigger with it
    $effect(() => {
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
        });

        lenisInstance.lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    });
</script>

{@render children()}
