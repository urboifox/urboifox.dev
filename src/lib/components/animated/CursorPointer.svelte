<script lang="ts">
    import { spring } from 'svelte/motion';

    let coords = spring(
        { x: 0, y: 0 },
        {
            stiffness: 0.05,
            damping: 0.2
        }
    );

    let size = spring(10);

    $effect(() => {
        function mousemove(e: MouseEvent) {
            coords.set({ x: e.clientX, y: e.clientY });
        }
        function mousedown() {
            size.set(40);
        }
        function mouseup() {
            size.set(10);
        }

        window.addEventListener('mousedown', mousedown);
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mousemove', mousemove);
        return () => {
            window.removeEventListener('mousedown', mousedown);
            window.removeEventListener('mouseup', mouseup);
            window.removeEventListener('mousemove', mousemove);
        };
    });
</script>

<svg role="presentation">
    <circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<style>
    svg {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 100;
        pointer-events: none;
    }

    circle {
        fill: #ff3e00;
    }
</style>
