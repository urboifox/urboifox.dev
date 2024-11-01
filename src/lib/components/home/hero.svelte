<script lang="ts">
    import gsap from 'gsap';
    import Button from '$lib/components/common/button.svelte';
    import images from '$lib/constants/images';

    let container: HTMLDivElement;

    $effect(() => {
        let ctx = gsap.context(() => {
            const scrollTrigger = {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            };
            gsap.to(container, {
                ease: 'none',
                y: -250,
                scale: 0.9,
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pinSpacing: false,
                    pin: true
                }
            });
            gsap.to('.top-heading', {
                opacity: 0,
                x: -50,
                scrollTrigger
            });
            gsap.to('.slash', {
                opacity: 0.3,
                x: -20,
                scrollTrigger
            });
            gsap.to('.bottom-heading', {
                opacity: 0.5,
                x: 20,
                scrollTrigger
            });
        });

        return () => ctx.revert();
    });
</script>

<div class="relative flex min-h-screen flex-col items-center justify-center gap-10" bind:this={container}>
    <span class="absolute -top-full aspect-square w-[50vw] rounded-full bg-accent blur-[150px]"
    ></span>
    <div
        class="flex flex-col items-center gap-3 font-inria text-[13vw] uppercase sm:-translate-y-20 sm:gap-6 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
    >
        <h1
            class="top-heading bg-gradient-to-t from-accent/40 to-accent bg-clip-text font-bold text-transparent"
        >
            Mobile &amp; Web
        </h1>
        <div
            class="flex items-center gap-2 text-comment sm:translate-x-20 sm:gap-5 lg:translate-x-40 lg:gap-10"
        >
            <h1 class="slash">//</h1>
            <h1 class="bottom-heading">
                Developer<span
                    class="dot ms-2 inline-block aspect-square w-2 rounded-full bg-primary transition-colors duration-1000 sm:w-3"
                ></span>
            </h1>
        </div>
    </div>

    <div class="container flex items-start justify-around gap-4">
        <div></div>
        <div class="flex flex-col gap-10 max-sm:w-full sm:flex-row sm:gap-32">
            <p
                class="description relative max-w-lg text-sm font-light leading-relaxed tracking-wider text-paragraph sm:text-lg"
            >
                Hello stranger! I’m Mohamed Ashraf. Also known as <span
                    class="peer cursor-help text-primary">Fox</span
                >. I’m a a web & mobile apps developer, passionate about
                <span class="text-primary"> coding </span>
                cool stuff.
                <img
                    draggable="false"
                    src={images.foxEmoji}
                    alt="fox emoji"
                    width={120}
                    height={120}
                    class="absolute left-0 h-32 w-32 -translate-x-4 object-contain opacity-0 transition-all duration-300 peer-hover:translate-x-0 peer-hover:opacity-100 max-lg:-bottom-40 lg:-left-32 lg:top-1/2 lg:-translate-y-1/2"
                />
            </p>
            <div class="cta max-sm:self-end">
                <Button>Get in touch</Button>
            </div>
        </div>
    </div>
</div>
