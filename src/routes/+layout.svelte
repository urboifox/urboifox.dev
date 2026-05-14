<script lang="ts">
    import '../app.css';
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
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
        };
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div
    style="background-image: url({grain});"
    class="pointer-events-none fixed -top-full -left-1/2 z-50 h-[300%] w-[300%] animate-[grain_2s_steps(10)_infinite] bg-center object-cover"
></div>

<Cursor />
<Header />

{@render children()}
