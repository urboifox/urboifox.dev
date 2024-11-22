<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import { getFileUrl } from '$lib/utils/get-file-url';
    import { HandIcon, TrashIcon, UploadIcon } from 'lucide-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    let input: HTMLInputElement;

    interface Props extends Omit<HTMLInputAttributes, 'type'> {
        containerClass?: string;
        label?: string;
        value?: string;
        error?: string | string[] | undefined;
        defaultImage?: string;
        imageUrl?: string;
        onDrop?: (e: DragEvent) => void;
        onFileChange?: (e: string) => void;
    }
    let {
        containerClass,
        label,
        error,
        value = $bindable(),
        defaultImage,
        onFileChange,
        onDrop,
        imageUrl = $bindable(defaultImage || ''),
        ...rest
    }: Props = $props();

    async function handleImageChange(
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) {
        const image = e?.currentTarget?.files?.[0];
        if (!image) {
            imageUrl = '';
            return;
        }
        error = undefined;
        imageUrl = await getFileUrl(image);
        rest.onchange?.(e);
        onFileChange?.(imageUrl);
    }

    let draggingOver = $state(false);

    async function handleDropImage(e: DragEvent) {
        const image = e?.dataTransfer?.files?.[0];
        if (!image) {
            imageUrl = '';
            return;
        }
        error = undefined;
        imageUrl = await getFileUrl(image);
        onDrop?.(e);
        onFileChange?.(imageUrl);
    }
</script>

<label class={cn('flex flex-col gap-2', rest?.disabled && 'opacity-60', containerClass)}>
    {#if label}
        <span class="text-paragraph">
            {label}
            {#if rest?.required}
                <span class="text-red-500">*</span>
            {/if}
        </span>
    {/if}
    <div
        class={cn(
            'group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-comment transition-colors duration-300 hover:border-primary hover:text-primary focus:border-primary',
            error && 'border-red-600',
            imageUrl && 'border-primary'
        )}
        role="none"
        ondragenter={() => {
            draggingOver = true;
        }}
        ondragleave={(e) => {
            const { relatedTarget } = e;
            if (!relatedTarget || !e.currentTarget.contains(relatedTarget as Node)) {
                draggingOver = false;
            }
        }}
        ondragover={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}
        ondrop={(e) => {
            e.preventDefault();
            draggingOver = false;
            handleDropImage(e);
        }}
    >
        {#if draggingOver}
            <div
                class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background-secondary text-accent"
            >
                <HandIcon />
                release to upload
            </div>
        {/if}
        {#if imageUrl}
            <img src={imageUrl} alt="banner" class="aspect-video w-full rounded-lg object-cover" />
            <button
                type="button"
                onclick={(e) => {
                    e.preventDefault();
                    imageUrl = '';
                    input.value = '';
                    onFileChange?.('');
                }}
                class="absolute inset-0 flex items-center justify-center bg-background-secondary/80 text-red-600 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
            >
                <TrashIcon />
            </button>
        {:else}
            <div class="flex h-full w-full flex-col items-center justify-center gap-4">
                <UploadIcon />
                <span class="text-sm text-comment">Upload an image</span>
            </div>
        {/if}
    </div>
    <input
        bind:this={input}
        type="file"
        accept="image/*"
        {...rest}
        {value}
        class={'hidden'}
        onchange={handleImageChange}
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
