<script lang="ts">
    const word = 'Mohamed Ashraf';
    const repeats = 2;
    const items = Array.from({ length: repeats }, (_, i) => ({ id: i, word }));
</script>

<section aria-hidden="true" class="relative mt-24 overflow-hidden py-6 select-none md:py-10">
    <div class="marquee-track flex w-max items-center gap-12 pr-12">
        {#each items as item (`a-${item.id}`)}
            <div class="flex items-center gap-12">
                <span
                    class="bg-neutral-200/10 bg-clip-text text-5xl font-bold tracking-tight text-transparent uppercase backdrop-blur-sm md:text-7xl lg:text-8xl"
                >
                    {item.word}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="h-6 w-6 shrink-0 text-primary md:h-10 md:w-10"
                    fill="currentColor"
                >
                    <path
                        d="M12 1.5l1.6 7.3L21 10.4l-6.4 3.8L16 21l-4-4.3L8 21l1.4-6.8L3 10.4l7.4-1.6z"
                    />
                </svg>
            </div>
        {/each}
        {#each items as item (`b-${item.id}`)}
            <div aria-hidden="true" class="flex items-center gap-12">
                <span
                    class="bg-neutral-200/10 bg-clip-text text-5xl font-bold tracking-tight text-transparent uppercase backdrop-blur-sm md:text-7xl lg:text-8xl"
                >
                    {item.word}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="h-6 w-6 shrink-0 text-primary md:h-10 md:w-10"
                    fill="currentColor"
                >
                    <path
                        d="M12 1.5l1.6 7.3L21 10.4l-6.4 3.8L16 21l-4-4.3L8 21l1.4-6.8L3 10.4l7.4-1.6z"
                    />
                </svg>
            </div>
        {/each}
    </div>
</section>

<style>
    @keyframes marquee-scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }

    .marquee-track {
        animation: marquee-scroll 45s linear infinite;
        will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
        .marquee-track {
            animation: none;
        }
    }
</style>
