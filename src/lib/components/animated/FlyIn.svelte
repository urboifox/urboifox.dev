<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        y?: number;
        duration?: number;
        delay?: number;
        easing?: (t: number) => number;
        children: Snippet;
    }

    const {
        y = 10,
        duration = 500,
        delay = 1,
        easing = cubicOut,
        children,
        ...rest
    }: Props = $props();
</script>

<div in:fly|global={{ y, easing, duration, delay: 500 + delay }} {...rest}>
    {@render children()}
</div>
