<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { HTMLInputAttributes } from 'svelte/elements';

    interface Props extends HTMLInputAttributes {
        containerClass?: string;
        label?: string;
    }
    let { containerClass, label, ...rest }: Props = $props();
</script>

<label
    class={cn(
        'flex flex-col gap-2',
        ['radio', 'checkbox'].includes(rest?.type ?? '') &&
            'cursor-pointer flex-row-reverse items-center',
        containerClass
    )}
>
    {#if label}
        <span class="text-paragraph">
            {label}
            {#if rest?.required}
                <span class="text-red-500">*</span>
            {/if}
        </span>
    {/if}
    <input
        {...rest}
        class={cn(
            'rounded-md border border-comment bg-background-secondary px-4 py-2 accent-primary outline-none transition-colors duration-300 focus:border-primary',
            rest?.class
        )}
    />
</label>
