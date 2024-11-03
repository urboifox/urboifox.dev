<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    interface Props extends HTMLTextareaAttributes {
        containerClass?: string;
        label?: string;
        content?: string;
    }
    let { containerClass, label, ...rest }: Props = $props();
    $inspect(rest?.value);
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
        class={cn(
            'min-h-40 rounded-md border border-comment bg-background-secondary px-4 py-2 outline-none transition-colors duration-300 focus:border-primary',
            rest?.class
        )}></textarea
    >
</div>
