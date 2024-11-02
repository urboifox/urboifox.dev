<script lang="ts">
    // css and fonts
    import '../app.css';
    import 'lenis/dist/lenis.css';
    import '@fontsource-variable/montserrat';
    import '@fontsource/inria-sans';

    // svelte
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import type { LayoutData } from './$types';
    import { type Snippet } from 'svelte';

    // libraries
    import Lenis from 'lenis';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import { lenisInstance } from '$lib/store/lenis.svelte';

    // components
    import GrainOverlay from '$lib/components/layout/GrainOverlay.svelte';
    import Navbar from '$lib/components/layout/Navbar.svelte';

    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    type Props = {
        children: Snippet;
        data: LayoutData;
    };

    let { children, data }: Props = $props();

    // init lenis and sync scrollTrigger with it

    $effect(() => {
        const lenis = new Lenis({
            duration: 2,
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

<GrainOverlay />
<Navbar />
<!-- re-render the children when the pathname changes -->
{#key data.pathname}
    <div
        in:fade={{ duration: 500, delay: 400, easing: cubicOut }}
        out:fade={{ duration: 500, easing: cubicOut }}
    >
        {@render children()}
    </div>
{/key}

<style>
    :global(body) {
        display: grid;
    }

    /* svelte exit transitions make the elements appear below each other, which ruines the values of scrollTrigger */
    /* this is a hack to fix that. so that the elements overlap when the transition is running */
    div {
        grid-area: 1/1;
    }
</style>
