<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils/cn';

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        variant?: 'danger';
        type?: 'button' | 'submit' | 'reset';
        size?: 'sm';
    }

    const { children, type = 'button', ...rest }: Props = $props();
</script>

<button
    {type}
    {...rest}
    class={cn(
        'rounded-md border border-comment px-6 py-4 text-paragraph transition-colors duration-300 hover:border-primary hover:text-primary',
        rest?.variant === 'danger' && 'border-red-600 text-red-600 hover:border-red-500 hover:text-red-500',
        rest?.size === 'sm' && 'px-4 py-2',
        rest?.disabled && 'opacity-60',
        rest?.class
    )}
>
    {@render children?.()}
</button>
