<script lang="ts">
    import gsap from 'gsap';

    let container: HTMLDivElement;
    let slider: HTMLDivElement;
    let intro: HTMLDivElement;

    $effect(() => {
        let ctx = gsap.context(() => {
            gsap.from(intro, {
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top center',
                    end: 'top top',
                    scrub: 1
                }
            });

            let panels = gsap.utils.toArray(slider.children);
            const scrollTween = gsap.to(panels, {
                x: () => -1 * (slider.scrollWidth - innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    start: 'top top',
                    end: () => '+=' + (slider.scrollWidth - innerWidth),
                    scrub: 1,
                }
            });

            panels.forEach((panel: unknown) => {
                if (panel instanceof HTMLElement) {
                    const content = panel.querySelector('.content');
                    if (!content) return;
                    gsap.from(content, {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: content,
                            horizontal: true,
                            start: 'left 70%',
                            end: 'left: 20%',
                            containerAnimation: scrollTween,
                            scrub: 1
                        }
                    });
                }
            });
        });

        return () => ctx.revert();
    });
</script>

<div class="h-screen w-screen bg-background-primary" bind:this={container}>
    <div class="relative flex h-screen flex-row flex-nowrap overflow-hidden" bind:this={slider}>
        <div
            class="bg-transition flex h-screen w-screen shrink-0 items-center justify-center bg-background-primary font-yeseva text-7xl capitalize transition-colors duration-500"
        >
            <h2 bind:this={intro} class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">My Craft</h2>
        </div>
        {#each [1, 2, 3] as i (i)}
            <div
                class="flex h-screen w-screen shrink-0 items-center justify-center border border-red-600 bg-background-primary text-8xl transition-colors duration-500"
            >
                <div class="content flex flex-col gap-4 text-center">
                    Slide {i}
                    <p class="max-w-lg text-center text-lg">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt dolorum
                        voluptatibus animi quia hic nam suscipit esse est? Doloremque corporis earum
                        perferendis officiis voluptas, cupiditate voluptatibus possimus quos
                        assumenda natus.
                    </p>
                </div>
            </div>
        {/each}
    </div>
</div>
