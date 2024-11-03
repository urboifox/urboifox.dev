<script lang="ts">
    import { marked } from 'marked';

    let { content }: { content: string } = $props();
</script>

<div
    class="prose w-full max-w-5xl text-paragraph dark:prose-invert prose-a:text-primary prose-code:text-orange-400 prose-pre:transition-colors prose-pre:duration-300 prose-hr:border-comment/50"
>
    {@html marked(content)}
</div>
