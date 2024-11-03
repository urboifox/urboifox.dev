<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils/cn';

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        type?: 'button' | 'submit' | 'reset';
    }

    const { children, type = 'button', ...rest }: Props = $props();
</script>

<button
    {type}
    {...rest}
    class={cn(
        'rounded-md border border-comment px-6 py-4 text-paragraph transition-colors duration-300 hover:border-primary hover:text-primary',
        rest?.disabled && 'opacity-60',
        rest?.class
    )}
>
    {@render children?.()}
</button>
