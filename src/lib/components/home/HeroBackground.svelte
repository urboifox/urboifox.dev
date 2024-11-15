<script lang="ts">
    import { tweened } from "svelte/motion";

    let gridSize = $state(0);
    const boxSize = 70;

    const calculateGridSize = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cols = Math.ceil(vw / boxSize);
        const rows = Math.ceil(vh / boxSize);
        gridSize = cols * rows;
    };

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
        calculateGridSize();

        addEventListener('resize', calculateGridSize);
        addEventListener('mousemove', handleMouseMove);

        return () => {
            removeEventListener('resize', calculateGridSize);
            removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<div
    class="grid-bg absolute inset-0 -z-20 grid h-full w-full pointer-events-none gap-px"
    style="grid-auto-rows: {boxSize}px; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));"
>
    {#each [...Array(gridSize).keys()].map((i) => i + 1) as n (n)}
        <div class="bg-background-primary transition-colors duration-500"></div>
    {/each}
</div>
<div class="absolute inset-0 -z-40 bg-comment/10">
</div>
<div class="w-[500px] h-[500px] absolute -z-30 bg-primary/50 rounded-full blur-3xl -translate-x-[250px] -translate-y-[250px]" style="left: {$mx}px; top: {$my}px">
</div>
