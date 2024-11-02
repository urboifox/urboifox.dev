<script lang="ts">
    import gsap from 'gsap';

    let container: HTMLDivElement;
    let slider: HTMLDivElement;
    let intro: HTMLDivElement;

    $effect(() => {
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(slider.children);
            gsap.to(panels, {
                x: () => -1 * (slider.scrollWidth - innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    start: 'top top',
                    scrub: 1,
                    end: () => '+=' + (slider.scrollWidth - innerWidth)
                }
            });

            gsap.from(intro, {
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top center',
                    end: 'top top',
                    scrub: 1
                }
            });
        });

        return () => ctx.revert();
    });
</script>

<div class="h-screen w-screen bg-background-primary" bind:this={container}>
    <div class="relative flex h-screen flex-row flex-nowrap overflow-hidden" bind:this={slider}>
        <div
            class="flex h-screen w-screen shrink-0 items-center justify-center bg-background-primary font-yeseva text-7xl capitalize bg-transition transition-colors duration-500"
        >
            <h2 bind:this={intro} class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">My Craft</h2>
        </div>
        {#each [1, 2, 3] as i (i)}
            <div
                class="flex h-screen w-screen shrink-0 items-center justify-center bg-background-primary text-3xl transition-colors duration-500"
            >
                Slide {i}
            </div>
        {/each}
    </div>
</div>
