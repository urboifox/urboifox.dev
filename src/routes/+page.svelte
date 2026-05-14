<script lang="ts">
    import Hero from './hero.svelte';
    import Marquee from './marquee.svelte';
    import Skills from './skills.svelte';
    import Projects from './projects.svelte';
    import Posts from './posts.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Mohamed Ashraf - Frontend Developer</title>
</svelte:head>

<main>
    <Hero />
    <Marquee />
    <Projects projects={data.projects} />
    <Posts posts={data.posts} />
    <Skills />
</main>
