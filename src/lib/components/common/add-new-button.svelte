<script lang="ts">
    import { Plus } from 'lucide-svelte';

    interface Props {
        href: string;
    }
    let { href }: Props = $props();
</script>

<a
    {href}
    class="flex items-center gap-2 text-sm text-paragraph transition-colors duration-200 active:text-accent lg:hover:text-accent"
>
    <Plus strokeWidth={1} size={20} />
    Add
</a>
