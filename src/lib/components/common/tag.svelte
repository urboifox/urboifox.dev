<script lang="ts">
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
    class="rounded-lg border border-comment px-2 py-1 text-xs text-paragraph"
>
    {tag}
</button>
