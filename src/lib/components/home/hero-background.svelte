<script lang="ts">
    import { tweened } from "svelte/motion";

    let mx = tweened(0, {
        duration: 500,
    })
    let my = tweened(0, {
        duration: 500,
    })

    const handleMouseMove = (e: MouseEvent) => {
        mx.set(e.clientX);
        my.set(e.clientY);
    }

    $effect(() => {
        addEventListener('mousemove', handleMouseMove);

        return () => {
            removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<div
    class="absolute inset-0 -z-20 grid h-full w-full pointer-events-none gap-px grid-cols-4 lg:grid-cols-12"
>
    {#each [...Array(4 * 12).keys()].map((i) => i + 1) as n (n)}
        <span class="bg-background-primary transition-colors duration-500"></span>
    {/each}
</div>
<div class="absolute inset-0 -z-40 dark:bg-comment/5 bg-comment/10">
</div>
<div class="w-[500px] h-[500px] absolute -z-30 bg-primary dark:bg-primary/50 rounded-full blur-3xl -translate-x-[250px] -translate-y-[250px]" style="left: {$mx}px; top: {$my}px">
</div>
