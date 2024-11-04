<script lang="ts">
    import { X } from 'lucide-svelte';

    type ClickEvent = MouseEvent & {
        currentTarget: EventTarget & HTMLButtonElement;
    };

    interface Props {
        tag: string;
        onclick?: (e: ClickEvent) => void;
    }
    let { tag, onclick }: Props = $props();
</script>

<button
    {onclick}
    type="button"
    class="flex items-center gap-1 rounded-lg border border-comment px-2 py-1 text-xs text-paragraph"
>
    {tag}
    <X size={12} class="text-red-600" />
</button>
