<script lang="ts">
    import Hero from './hero.svelte';
    import Projects from './projects.svelte';
    import Posts from './posts.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Fox.</title>
</svelte:head>

<main>
    <Hero />
    <Projects projects={data.projects} />
    <Posts posts={data.posts} />
</main>
