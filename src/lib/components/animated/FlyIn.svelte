<script lang="ts">
    import gsap from 'gsap';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        children: Snippet;
        delay?: number;
        as?: keyof HTMLElementTagNameMap;
    }
    const { children, delay = 0.1, as = 'div', ...rest }: Props = $props();
    let container: HTMLElement;

    $effect(() => {
        const ctx = gsap.context(() => {
            gsap.from(container, {
                y: 20,
                opacity: 0,
                duration: 2,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom center'
                }
            });
        });

        return () => ctx.revert();
    });
</script>

<svelte:element this={as} {...rest} bind:this={container}>
    {@render children()}
</svelte:element>
