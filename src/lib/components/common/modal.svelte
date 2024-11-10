<script lang="ts">
    import type { Snippet } from 'svelte';
    import { fly } from 'svelte/transition';

    interface Props {
        visible: boolean;
        children: Snippet;
    }
    let { visible = $bindable(false), children }: Props = $props();

    let modal: HTMLDivElement | undefined = $state();

    $effect(() => {
        const portal = document.createElement('div');
        if (visible && modal) {
            portal.className = 'portal';
            document.body.appendChild(portal);
            portal.appendChild(modal);
        }

        return () => {
            document.body.removeChild(portal);
        };
    });

    function onclick() {
        visible = false;
    }

    function onkeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' || e.key === ' ') {
            onclick();
        }
    }
</script>

{#if visible}
    <div
        role="button"
        tabindex="0"
        aria-label="Close modal"
        {onclick}
        {onkeydown}
        transition:fly={{ y: 10, opacity: 0, duration: 200 }}
        class="fixed inset-0 z-40 grid place-content-center place-items-center bg-background-secondary/50 backdrop-blur-sm cursor-default"
        bind:this={modal}
    >
        {@render children()}
    </div>
{/if}
