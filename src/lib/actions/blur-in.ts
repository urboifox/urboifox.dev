import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function blurIn(delay = 0, _key?: unknown) {
    return (node: HTMLElement) => {
        if (!node) return;

        gsap.set(node, { opacity: 0, filter: 'blur(8px)' });

        const tween = gsap.to(node, {
            duration: 1,
            opacity: 1,
            delay,
            ease: 'power2.out',
            filter: 'blur(0px)',
            paused: true
        });

        const trigger = ScrollTrigger.create({
            trigger: node,
            start: 'top bottom',
            onEnter: () => tween.restart(true)
        });

        if (trigger.isActive) {
            tween.restart(true);
        }

        return () => {
            tween.kill();
            trigger.kill();
        };
    };
}
