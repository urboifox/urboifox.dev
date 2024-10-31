<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils/cn';

    interface Props extends HTMLAttributes<HTMLButtonElement> {
        children?: Snippet;
        type?: 'button' | 'submit' | 'reset';
    }

    const { children, type = 'button', ...rest }: Props = $props();
</script>

<button {type} {...rest} class={cn('border border-transparent rounded-sm px-6 py-4', rest?.class)}>
    {@render children?.()}
</button>

<style>
    button {
        border: 1px solid transparent;
        position: relative;
        transition: all 0.5s ease-in-out;
        color: var(--paragraph);
    }

    button::before {
        content: ' ';
        height: 1px;
        width: 2rem;
        top: -1px;
        left: 1.5rem;
        position: absolute;
        background: var(--comment);
        transition:
            width 0.5s ease-out,
            left 0.3s ease-out;
    }

    button::after {
        content: ' ';
        height: 1px;
        width: 2rem;
        right: 1.5rem;
        bottom: -1px;
        position: absolute;
        background: var(--comment);
        transition:
            width 0.5s ease-out,
            right 0.3s ease-out;
    }

    button:hover {
        border-color: var(--comment);
        color: var(--accent);
    }

    button:hover::before {
        left: 0px;
        width: 0px;
    }

    button:hover::after {
        right: 0;
        width: 0;
    }
</style>
