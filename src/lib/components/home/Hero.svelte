<script lang="ts">
    import gsap from 'gsap';
    import Button from '../common/Button.svelte';
    import images from '$lib/constants/images';

    $effect(() => {
        let ctx = gsap.context(() => {
            const scrollTrigger = {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            };
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
            gsap.to('.dot', {
                backgroundColor: 'var(--accent)',
                opacity: 0,
                scrollTrigger
            });
            gsap.to('.description', {
                opacity: 0.5,
                y: -20,
                scrollTrigger
            });
            gsap.to('.cta', {
                y: 20,
                scrollTrigger
            });
        });

        return () => ctx.revert();
    });
</script>

<div id="hero" class="relative flex min-h-screen flex-col items-center justify-center gap-10">
    <span class="absolute -top-full aspect-square w-[50vw] rounded-full bg-accent blur-[150px]"
    ></span>
    <div class="flex sm:-translate-y-20 flex-col items-center gap-3 sm:gap-6 font-inria text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase">
        <h1 class="top-heading font-bold">Web &amp; Mobile</h1>
        <div class="flex sm:translate-x-20 lg:translate-x-40 items-center gap-2 sm:gap-5 lg:gap-10 text-comment">
            <h1 class="slash">//</h1>
            <h1 class="bottom-heading">
                Developer<span
                    class="dot ms-2 inline-block w-2 sm:w-3 aspect-square rounded-full bg-primary transition-colors duration-1000"
                ></span>
            </h1>
        </div>
    </div>

    <div class="container flex items-start justify-around gap-4">
        <div></div>
        <div class="flex gap-10 sm:gap-32 flex-col sm:flex-row max-sm:w-full">
            <p
                class="description group relative max-w-80 text-sm sm:text-lg font-light leading-relaxed tracking-wider text-paragraph"
            >
                Hey there! I’m Mohamed Ashraf. Also known as Fox. Working as a software developer,
                and loving to learn new technologies. :)
                <img
                    draggable="false"
                    src={images.foxEmoji}
                    alt="fox emoji"
                    width={160}
                    height={160}
                    class="absolute left-0 lg:-left-40 max-lg:-bottom-40 lg:top-1/2 h-40 w-40 -translate-x-4 lg:-translate-y-1/2 object-contain opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
            </p>
            <div class="cta max-sm:self-end">
                <Button>Get in touch</Button>
            </div>
        </div>
    </div>
</div>
