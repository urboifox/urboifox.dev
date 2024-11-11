<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import { Eye, EyeOffIcon } from 'lucide-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    interface Props extends HTMLInputAttributes {
        containerClass?: string;
        label?: string;
        value?: string;
        type?: HTMLInputAttributes['type'];
        error?: string | string[] | undefined;
    }
    let { containerClass, label, error, value = $bindable(), type, ...rest }: Props = $props();
    let inputType = $state(type);
</script>

<label
    class={cn(
        'relative flex w-full flex-col gap-2',
        ['radio', 'checkbox'].includes(type ?? '') &&
            'w-fit cursor-pointer flex-row-reverse items-center',
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
        type={inputType}
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

    {#if type === 'password'}
        <button
            class="absolute bottom-[10px] right-2"
            type="button"
            onclick={(e) => {
                e.preventDefault();
                if (inputType === 'password') {
                    inputType = 'text';
                } else {
                    inputType = 'password';
                }
            }}
        >
            {#if inputType === 'password'}
                <EyeOffIcon strokeWidth={1} />
            {:else}
                <Eye strokeWidth={1} />
            {/if}
        </button>
    {/if}

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
