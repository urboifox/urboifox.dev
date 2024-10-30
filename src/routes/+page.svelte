<script lang="ts">
    import FlyIn from '$lib/components/animated/FlyIn.svelte';
    import Hero from '$lib/components/home/Hero.svelte';
</script>

<div class="h-[300vh]">
    <Hero />
    <div class="flex h-[100vh] flex-col items-center justify-center gap-4">
        <FlyIn>
            <h2 class="text-center text-5xl">I'ts kinda nice to have tbh</h2>
        </FlyIn>
    </div>
</div>
