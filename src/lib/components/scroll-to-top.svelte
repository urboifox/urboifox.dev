<script lang="ts">
    import { fly } from 'svelte/transition';
    import { getLenis } from '$lib/lenis';

    let visible = $state(false);

    function handleScroll() {
        visible = window.scrollY > 400;
    }

    function scrollToTop() {
        const lenis = getLenis();
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
</script>

<svelte:window onscroll={handleScroll} />

{#if visible}
    <button
        type="button"
        onclick={scrollToTop}
        class="pointer-events-auto fixed right-6 bottom-6 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card/20 px-4 py-2 font-mono text-xs tracking-widest text-muted backdrop-blur-sm transition-colors duration-300 hover:border-primary md:right-10 md:bottom-10"
        transition:fly={{ y: 16, duration: 300 }}
    >
        <span class="sr-only">Scroll to top</span>
        <span class="text-primary">&gt;</span>
        <span>cd ~/top</span>
    </button>
{/if}
