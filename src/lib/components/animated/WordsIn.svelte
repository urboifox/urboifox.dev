<script lang="ts">
    import gsap from 'gsap';
    import type { HTMLAttributes } from 'svelte/elements';

    let container: HTMLDivElement;

    interface Props extends HTMLAttributes<HTMLDivElement> {
        text: string;
        delay?: number;
        scrollTrigger?: boolean;
    }
    let { text, scrollTrigger = true, delay = 0, ...rest }: Props = $props();

    $effect(() => {
        let ctx = gsap.context(() => {
            const spans = container.querySelectorAll('.char-container');
            gsap.utils.toArray(spans).forEach((span, i) => {
                gsap.from(span as HTMLSpanElement, {
                    y: container.clientHeight,
                    delay: i * 0.02 + delay,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: scrollTrigger
                        ? {
                              trigger: container,
                              start: 'top 80%',
                              end: 'bottom top'
                          }
                        : null
                });
            });
        });

        return () => ctx.revert();
    });
</script>

<div bind:this={container} {...rest}>
    {#each text.split(' ') as word, i (i)}
        <div class="char-container me-[.25em] inline-block last:me-0">{word}</div>
    {/each}
</div>

<style>
    div {
        overflow: hidden;
    }
</style>
