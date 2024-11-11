<script lang="ts">
    import type { Snippet } from 'svelte';
    import { fly } from 'svelte/transition';

    interface Props {
        visible: boolean;
        children: Snippet;
    }
    let { visible = $bindable(false), children }: Props = $props();

    function onclick() {
        visible = false;
    }

    function onkeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' || e.key === ' ') {
            onclick();
        }
    }

    $effect(() => {
        addEventListener('keydown', onkeydown);

        return () => removeEventListener('keydown', onkeydown);
    })
</script>

{#if visible}
    <div
        role="button"
        tabindex="0"
        aria-label="Close modal"
        {onclick}
        {onkeydown}
        transition:fly={{ y: 10, opacity: 0, duration: 200 }}
        class="fixed inset-0 z-40 grid cursor-default place-content-center place-items-center backdrop-blur-sm"
    >
        <div role="none" onclick={(e) => e.stopPropagation()}>
            {@render children()}
        </div>
    </div>
{/if}
