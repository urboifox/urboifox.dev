<script lang="ts">
    import '../app.css';
    import 'lenis/dist/lenis.css';
    import favicon from '$lib/assets/favicon.svg';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import Lenis from 'lenis';
    import { onMount, tick } from 'svelte';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    import Cursor from '$lib/components/cursor.svelte';
    import Background from '$lib/components/background.svelte';
    import Header from '$lib/components/header.svelte';
    import { setLenis, getLenis } from '$lib/lenis';
    import Footer from '$lib/components/footer.svelte';
    import { page } from '$app/state';

    let { children } = $props();

    gsap.registerPlugin(ScrollTrigger);

    let prevPath = '';
    let prevY = 0;

    onMount(() => {
        const lenis = new Lenis({ stopInertiaOnNavigate: true });
        setLenis(lenis);

        lenis.on('scroll', ScrollTrigger.update);

        const rafCallback = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(document.body);

        return () => {
            ro.disconnect();
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
            setLenis(null);
        };
    });

    beforeNavigate(({ from, type }) => {
        if (from && type !== 'popstate') {
            prevPath = from.url.pathname;
            prevY = window.scrollY;
        }
    });

    afterNavigate(({ to, type }) => {
        void tick().then(() => {
            requestAnimationFrame(() => {
                if (type === 'popstate' && to?.url.pathname === prevPath) {
                    getLenis()?.scrollTo(prevY, { immediate: true, force: true });
                }
                ScrollTrigger.refresh();
            });
        });
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Background />
<Header />
<Cursor />

<div class="relative z-10">
    {@render children()}
    {#key page.url.pathname}
        <Footer />
    {/key}
</div>
