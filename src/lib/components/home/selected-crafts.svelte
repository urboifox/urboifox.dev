<script lang="ts">
    import gsap from 'gsap';

    let container: HTMLDivElement;
    let slider: HTMLDivElement;

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
        });

        return () => ctx.revert();
    });
</script>

<div class="h-screen w-screen bg-background-primary" bind:this={container}>
    <div class="relative flex h-screen flex-row flex-nowrap overflow-hidden" bind:this={slider}>
        {#each [1, 2, 3] as i (i)}
            <div
                class="flex h-screen min-w-[100vw] items-center justify-center bg-background-primary text-3xl"
            >
                Slide {i}
            </div>
        {/each}
    </div>
</div>
