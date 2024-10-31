<script lang="ts">
    import images from '$lib/constants/images';
</script>

<svelte:head>
    <link rel="preload" as="image" href={images.grain} />
</svelte:head>

<div
    style="background-image: url({images.grain});"
    class="pointer-events-none fixed -left-1/2 -top-full z-50 h-[300%] w-[300%] animate-[grain_2s_steps(10)_infinite] bg-center object-cover"
></div>
