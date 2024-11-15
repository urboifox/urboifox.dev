<script lang="ts">
    import gsap from 'gsap';
    import images from '$lib/constants/images';
    import MainButton from '../common/main-button.svelte';
    import HeroBackground from './HeroBackground.svelte';
    import SocialLinks from '../layout/social-links.svelte';

    $effect(() => {
        let ctx = gsap.context(() => {
            const scrollTrigger = {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            };
            gsap.to('.hero-content', {
                ease: 'none',
                opacity: 0,
                y: -250,
                scale: 0.95,
                scrollTrigger: {
                    trigger: '.hero-content',
                    start: 'top top',
                    scrub: true,
                    pinSpacing: false,
                    pin: true
                }
            });
            gsap.to('.top-heading', {
                opacity: 0,
                x: -80,
                scrollTrigger
            });
            gsap.to('.slash', {
                opacity: 0.3,
                x: -40,
                scrollTrigger
            });
            gsap.to('.bottom-heading', {
                opacity: 0.5,
                x: 40,
                scrollTrigger
            });
        });

        return () => {
            ctx.revert();
        };
    });
</script>

<div
    class="hero flex h-screen items-center justify-center relative"
>
    <div class="hero-content flex h-full flex-col justify-center gap-10 w-full relative">
    <HeroBackground />
        <div
            class="flex flex-col items-center gap-3 font-inria text-[13vw] uppercase sm:-translate-y-20 sm:gap-6 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
            <h1
                class="top-heading bg-gradient-to-r from-accent/60 to-accent bg-clip-text font-bold text-transparent transition-colors duration-500 dark:bg-gradient-to-t"
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
            <div class="flex gap-4">
                <SocialLinks />
            </div>
            <div class="flex flex-col gap-10 max-sm:w-full sm:flex-row sm:gap-32">
                <p
                    class="description relative max-w-lg text-sm font-light leading-relaxed tracking-wider text-paragraph sm:text-lg transition-colors duration-500 hover:text-accent"
                >
                    Hello stranger! I’m Mohamed Ashraf. Also known as <span
                        class="peer cursor-help text-primary font-medium">Fox</span
                    >. I’m a 20 y.o mobile apps & web developer based in Egypt.
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
                    <MainButton>Get in touch</MainButton>
                </div>
            </div>
        </div>
    </div>
</div>
