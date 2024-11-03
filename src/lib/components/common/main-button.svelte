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

<button {type} {...rest} class={cn('rounded-sm w-max border border-transparent px-6 py-4', rest?.class)}>
    {@render children?.()}
</button>

<style>
    button {
        border: 1px solid transparent;
        position: relative;
        transition: all 0.5s ease-in-out;
        color: rgb(var(--paragraph));
    }

    button::before,
    button::after {
        content: ' ';
        height: 1px;
        width: 2rem;
        position: absolute;
        background: rgb(var(--comment));
        transition:
            width 0.5s ease-out,
            left 0.3s ease-out,
            right 0.3s ease-out,
            background-color .5s ease-out
    }

    button::before {
        top: -1px;
        left: 1.5rem;
    }

    button::after {
        right: 1.5rem;
        bottom: -1px;
    }

    button:hover {
        border-color: rgb(var(--primary));
        color: rgb(var(--accent));
    }

    button:hover::before,
    button:hover::after {
        background: rgb(var(--primary));
        width: 0px;
    }

    button:hover::before {
        left: 0px;
    }

    button:hover::after {
        right: 0;
    }
</style>
