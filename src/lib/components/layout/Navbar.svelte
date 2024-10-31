<script>
    import { Tally2 } from 'lucide-svelte';
</script>

<header
    class="container fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-between gap-4 py-10 text-accent"
>
    <div></div>
    <button class="rotate-90 text-paragraph transition-transform duration-300 ease-in-out">
        <Tally2 size={36} strokeWidth={1} />
    </button>
</header>
