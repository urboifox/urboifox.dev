<script lang="ts">
    import gsap from 'gsap';
    import WordsIn from '../animated/WordsIn.svelte';

    const headingText = 'Mohamed Ashraf';
    let heading: HTMLHeadingElement;

    $effect(() => {
        let ctx = gsap.context(() => {
            const spans = heading.querySelectorAll('span');
            gsap.utils.toArray(spans).forEach((span) => {
                const randomY = Math.random() * 20;
                const randomX = Math.random() * 20;

                gsap.to(span as HTMLSpanElement, {
                    y: randomY,
                    x: randomX,
                    opacity: 0,
                    lazy: false,
                    duration: 2,
                    scrollTrigger: {
                        trigger: '.container',
                        start: 'top top',
                        end: 'center top',
                        scrub: true
                    }
                });
            });
        });

        return () => ctx.revert();
    });
</script>

<div class="container flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 bind:this={heading} class="text-8xl font-bold" id="heading">
        {#each headingText.split('') as char, i (i)}
            <span class:space={char === ' '} class="inline-block">
                {char}
            </span>
        {/each}
    </h1>
    <WordsIn
        scrollTrigger={false}
        text={'They also call me Fox'}
        class="text-2xl text-neutral-500"
        delay={0.5}
    />
    <a href="/about">Go to about</a>
</div>

<style>
    .space {
        margin-inline-end: 0.3em;
    }
</style>
