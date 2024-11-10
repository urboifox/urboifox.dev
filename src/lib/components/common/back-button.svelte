<script lang="ts">
    import { ArrowLeft } from 'lucide-svelte';

    interface Props {
        href: string;
        label?: string;
    }
    let { href, label }: Props = $props();
</script>

<a
    {href}
    class="flex items-center gap-2 text-sm text-paragraph transition-colors duration-200 active:text-accent lg:hover:text-accent"
>
    <ArrowLeft strokeWidth={1} size={20} />
    {label}
</a>
