<script lang="ts">
    // css and fonts
    import 'lenis/dist/lenis.css';
    import '@fontsource-variable/montserrat';
    import '../app.css';

    // libraries
    import Lenis from 'lenis';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import type { LayoutData } from './$types';
    import { type Snippet } from 'svelte';

    // register gsap plugins
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    type Props = {
        children: Snippet;
        data: LayoutData;
    };

    let { children, data }: Props = $props();

    // Lenis for smooth scrolling
    $effect(() => {
        const lenis = new Lenis({
            duration: 2
        });

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
    });
</script>

{#key data.pathname}
    <div
        in:fade={{ duration: 500, delay: 400, easing: cubicOut }}
        out:fade={{ duration: 500, easing: cubicOut }}
    >
        {@render children()}
    </div>
{/key}
