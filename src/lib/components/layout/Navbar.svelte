<script>
    import gsap from 'gsap';
    import { Tally2 } from 'lucide-svelte';

    $effect(() => {
        const ctx = gsap.context(() => {
            gsap.from('header', {
                opacity: 0,
                y: -10,
                scrollTrigger: {
                    trigger: 'body',
                    start: '15% top',
                    end: '20% top',
                    scrub: true
                }
            });
        });
        return () => ctx.revert();
    });
</script>

<header
    class="container fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-between gap-4 py-10 text-accent"
>
    <div></div>
    <button class="rotate-90 text-paragraph transition-transform duration-300 ease-in-out">
        <Tally2 size={36} />
    </button>
</header>
