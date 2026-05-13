<script lang="ts">
    let clickable = $state(false);
    let cursor: HTMLDivElement;
    let lastTarget: EventTarget | null = null;
</script>

<svelte:window
    onmousemove={(e: MouseEvent) => {
        cursor.animate(
            { left: `${e.clientX}px`, top: `${e.clientY}px` },
            { duration: 400, fill: 'forwards', easing: 'ease-out' }
        );

        if (e.target !== lastTarget) {
            lastTarget = e.target;
            clickable = !!(e.target as HTMLElement).closest(
                'a, button, [role="button"], input, select, textarea, label, summary'
            );
        }
    }}
/>

<div
    bind:this={cursor}
    class={[
        'pointer-events-none fixed z-100 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[height,width,border-color]',
        clickable ? 'h-20 w-20 border-white/50' : 'h-12 w-12 border-white/20'
    ]}
></div>
