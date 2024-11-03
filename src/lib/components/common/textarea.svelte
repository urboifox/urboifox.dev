<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    interface Props extends HTMLTextareaAttributes {
        containerClass?: string;
        label?: string;
        content?: string;
        value?: string;
        error?: string | string[] | undefined;
    }
    let { containerClass, label, error, value = $bindable(), ...rest }: Props = $props();
</script>

<div class={cn('flex flex-col gap-2', containerClass)}>
    {#if label}
        <label for={rest?.id} class="text-paragraph">
            {label}
            {#if rest?.required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}
    <textarea
        {...rest}
        {value}
        class={cn(
            'min-h-40 rounded-md border border-comment bg-background-secondary px-4 py-2 outline-none transition-colors duration-300 focus:border-primary',
            error && 'border-red-600',
            rest?.class
        )}
        oninput={(e) => {
            error = undefined;
            rest.oninput?.(e);
        }}
    ></textarea>
    {#if error}
        {#if typeof error === 'string'}
            <span class="text-sm text-red-600">{error}</span>
        {:else}
            {#each error as error}
                <span class="text-sm text-red-600">{error}</span>
            {/each}
        {/if}
    {/if}
</div>
