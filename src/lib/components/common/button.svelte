<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils/cn';
    import Loading from './loading.svelte';

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        variant?: 'danger';
        loading?: boolean;
        type?: 'button' | 'submit' | 'reset';
        size?: 'sm';
    }

    const { children, type = 'button', loading, ...rest }: Props = $props();
</script>

<button
    {type}
    {...rest}
    class={cn(
        'rounded-md border border-comment px-6 py-4 text-paragraph transition-colors duration-300 hover:border-primary hover:text-primary flex justify-center',
        rest?.variant === 'danger' &&
            'border-red-600 text-red-600 hover:border-red-500 hover:text-red-500',
        rest?.size === 'sm' && 'px-4 py-2',
        rest?.disabled && 'opacity-60',
        rest?.class
    )}
>
    {#if loading}
        <Loading />
    {:else}
        {@render children?.()}
    {/if}
</button>
