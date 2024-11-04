<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { HTMLInputAttributes } from 'svelte/elements';
    

    interface Props extends HTMLInputAttributes {
        containerClass?: string;
        label?: string;
        value?: string;
        error?: string | string[] | undefined;
    }
    let { containerClass, label, error, value = $bindable(), ...rest }: Props = $props();

</script>

<label
    class={cn(
        'flex flex-col gap-2 w-full',
        ['radio', 'checkbox'].includes(rest?.type ?? '') &&
            'cursor-pointer flex-row-reverse items-center w-fit',
        rest?.disabled && 'opacity-60',
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
        {value}
        class={cn(
            'rounded-md border border-comment bg-background-secondary px-4 py-2 accent-primary outline-none transition-colors duration-300 focus:border-primary',
            error && 'border-red-600',
            rest?.class
        )}
        oninput={(e) => {
            error = undefined;
            rest.oninput?.(e);
        }}
    />
    {#if error}
        {#if typeof error === 'string'}
            <span class="text-sm text-red-600">{error}</span>
        {:else}
            {#each error as error}
                <span class="text-sm text-red-600">{error}</span>
            {/each}
        {/if}
    {/if}
</label>
