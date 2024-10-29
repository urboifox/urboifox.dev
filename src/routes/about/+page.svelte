<script>
    import FlyIn from '$lib/components/animated/FlyIn.svelte';
    import WordsIn from '$lib/components/animated/WordsIn.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 py-40">
    <a class="text-4xl" href="/">
        <WordsIn scrollTrigger={false} text={'Go Home'} delay={0.5} />
    </a>
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as i (i)}
        <FlyIn delay={i * 100} duration={1000}>
            <p class="max-w-md text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima voluptate fuga
                corporis aspernatur reprehenderit asperiores, molestias, consequatur, deserunt a
                quibusdam necessitatibus vel eos libero at laudantium minus temporibus porro odio.
            </p>
        </FlyIn>
    {/each}
</div>
