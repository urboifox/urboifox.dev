<script lang="ts">
    import gsap from 'gsap';

    let container: HTMLDivElement;

    $effect(() => {
        let ctx = gsap.context(() => {
            gsap.to(container, {
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true
                }
            });
        });

        return () => ctx.revert();
    });
</script>

<div
    bind:this={container}
    class="min-h-screen text-white bg-background-primary"
>
    crafts
</div>
