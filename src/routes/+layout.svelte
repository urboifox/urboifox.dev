<script lang="ts">
    import '../app.css';
    import 'lenis/dist/lenis.css';
    import favicon from '$lib/assets/favicon.svg';
    import Lenis from 'lenis';
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    import Cursor from '$lib/components/cursor.svelte';
    import FluidSmokeBg from '$lib/components/fluid-smoke-bg.svelte';
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

<FluidSmokeBg />
<Cursor />
<Header />

{@render children()}
