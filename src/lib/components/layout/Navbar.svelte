<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import { X } from 'lucide-svelte';
    import { cubicInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    const SLIDE_DURATION = 1000;
    const SLIDE_DELAY = 200;

    let isOpen = $state(false);

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<header
    class="container fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-between gap-4 py-10 text-accent"
>
    <div></div>
    <button
        class={cn(
            'origin-center rotate-45 text-paragraph transition-all duration-300 ease-in-out hover:text-primary',
            isOpen && 'rotate-0'
        )}
        onclick={toggle}
    >
        <X size={36} strokeWidth={1} />
    </button>
</header>

{#each [0, 1, 2, 3] as i (i)}
    {#if isOpen}
        <div
            transition:fly={{
                y: `-100vh`,
                duration: SLIDE_DURATION,
                delay: i * SLIDE_DELAY,
                opacity: 1,
                easing: cubicInOut
            }}
            class="fixed z-40 h-full w-1/4 bg-background-secondary"
            style="left: {i * 25}%"
        >

    </div>
    {/if}
{/each}

{#if isOpen}
    <div
        out:fade
        in:fade={{ delay: 5 * SLIDE_DELAY }}
        class="fixed inset-0 z-40 flex items-center justify-center"
    >
        <h1 class="text-7xl">Hello world</h1>
    </div>
{/if}
