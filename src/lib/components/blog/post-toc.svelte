<script lang="ts">
    import { lenisInstance } from '$lib/store/lenis.svelte';
    import type { TOCHeading } from '$lib/utils/mdast-extract-headings';

    interface Props {
        toc: TOCHeading[];
    }
    let { toc }: Props = $props();
</script>

<aside class="sticky top-32 hidden w-80 flex-col gap-2 2xl:flex">
    {#each toc as heading}
        <button
            onclick={() => {
                lenisInstance.lenis?.scrollTo(`#${heading.id}`);
            }}
            class="text-start text-sm text-paragraph transition-colors duration-200 active:text-accent lg:hover:text-accent"
            >{heading.value}</button
        >
    {/each}
</aside>
