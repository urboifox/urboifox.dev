import gsap from 'gsap';

export function blurIn(delay = 0) {
    return (node: HTMLElement) => {
        if (!node) return;

        const tween = gsap.fromTo(
            node,
            { opacity: 0, filter: 'blur(8px)' },
            {
                duration: 1,
                opacity: 1,
                delay,
                ease: 'power2.out',
                filter: 'blur(0px)',
                paused: true,
                scrollTrigger: {
                    trigger: node,
                    markers: true
                },
                onComplete: () => {
                    tween.kill();
                }
            }
        );

        return () => {
            tween.kill();
        };
    };
}
