<script lang="ts">
    import { onMount } from 'svelte';

    let clickable = $state(false);
    let cursor: HTMLDivElement;
    let lastTarget: EventTarget | null = null;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false;

    onMount(() => {
        let rafId = 0;

        const tick = () => {
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;
            if (cursor && hasMoved) {
                cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    });

    function handleMouseMove(e: MouseEvent) {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!hasMoved) {
            currentX = targetX;
            currentY = targetY;
            hasMoved = true;
        }

        if (e.target !== lastTarget) {
            lastTarget = e.target;
            clickable = !!(e.target as HTMLElement).closest(
                'a, button, [role="button"], input, select, textarea, label, summary'
            );
        }
    }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div
    bind:this={cursor}
    style="transform: translate3d(-100vw, -100vh, 0);"
    class={[
        'pointer-events-none fixed top-0 left-0 z-100 rounded-full transition-[height,width,border-color] max-lg:hidden',
        clickable ? 'h-6 w-6 bg-white/80' : 'h-3 w-3 bg-white/50'
    ]}
></div>
