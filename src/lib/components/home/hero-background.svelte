<script lang="ts">
    import { tweened } from 'svelte/motion';

    let mx = tweened(0, {
        duration: 700,
        delay: 200
    });
    let my = tweened(0, {
        duration: 700,
        delay: 200
    });

    const handleMouseMove = (e: MouseEvent) => {
        mx.set(e.clientX);
        my.set(e.clientY);
    };

    $effect(() => {
        addEventListener('mousemove', handleMouseMove);

        return () => {
            removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<div
    class="pointer-events-none absolute inset-0 -z-20 grid h-full w-full grid-cols-4 gap-px lg:grid-cols-12"
>
    {#each [...Array(4 * 12).keys()].map((i) => i + 1) as n (n)}
        <span class="bg-background-primary transition-colors duration-500"></span>
    {/each}
</div>
<div class="absolute inset-0 -z-40 bg-comment/10 dark:bg-comment/5"></div>
<div
    class="absolute -z-30 h-[500px] w-[500px] -translate-x-[250px] -translate-y-[250px] rounded-full bg-primary blur-3xl dark:bg-primary/70"
    style="left: {$mx}px; top: {$my}px;"
></div>
