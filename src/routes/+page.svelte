<script lang="ts">
    import Hero from './hero.svelte';
    import Marquee from './marquee.svelte';
    import Skills from './skills.svelte';
    import Projects from './projects.svelte';
    import Posts from './posts.svelte';
    import Seo from '$lib/components/seo.svelte';
    import { site } from '$lib/config';
    import Footer from '$lib/components/footer.svelte';

    let { data } = $props();

    const personJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: site.url,
        image: `${site.url}${site.image}`,
        jobTitle: 'Frontend Developer',
        description: site.description,
        sameAs: [site.github, `https://twitter.com/${site.twitter.replace('@', '')}`]
    };
</script>

<Seo jsonLd={personJsonLd} />

<main>
    <Hero />
    <Marquee />
    <Projects projects={data.projects} />
    <Posts posts={data.posts} />
    <Skills />
</main>

<Footer />
