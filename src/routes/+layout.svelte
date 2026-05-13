<script lang="ts">
    import './layout.css';
    import 'lenis/dist/lenis.css';
    import favicon from '$lib/assets/favicon.svg';
    import Lenis from 'lenis';
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    import grain from '$lib/assets/grain.webp';
    import Cursor from '$lib/components/cursor.svelte';
    import Header from '$lib/components/header.svelte';

    let { children } = $props();

    gsap.registerPlugin(ScrollTrigger);

    onMount(() => {
        const lenis = new Lenis({ autoRaf: true });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Fox.</title>
</svelte:head>

<div
    style="background-image: url({grain});"
    class="pointer-events-none fixed -top-full -left-1/2 z-50 h-[300%] w-[300%] animate-[grain_2s_steps(10)_infinite] bg-center object-cover"
></div>

<Cursor />

<Header />

{@render children()}
