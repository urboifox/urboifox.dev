<script lang="ts">
    // css and fonts
    import '../app.css';
    import 'lenis/dist/lenis.css';
    import '@fontsource-variable/montserrat';
    import '@fontsource/inria-sans';
    import '@fontsource/yeseva-one';

    // svelte
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import type { LayoutData } from './$types';
    import { type Snippet } from 'svelte';

    // components
    import MetaData from '$lib/components/common/meta-data.svelte';
    import images from '$lib/constants/images';
    import Providers from '$lib/components/providers/providers.svelte';

    type Props = {
        children: Snippet;
        data: LayoutData;
    };

    let { children, data }: Props = $props();
</script>

<svelte:head>
    <MetaData
        title="Mohamed Ashraf | Mobile & Web Developer"
        description="Frontend developer with hands-on experience in React, Next.js, Svelte, and SvelteKit, complemented by mobile development skills using React Native with Expo. With knowledge in backend technologies, including Node.js, Express, and NestJS, and familiar with Linux and DevOps practices. Passionate about learning new technologies and continuously expanding skillsets. Adept at building responsive, user-focused web and mobile applications, with a solid understanding of modern development workflows and cross-platform software solutions."
        href={data.url.href}
        image={images.ogImage}
    />
</svelte:head>

<Providers>
    <!-- re-render the children when the pathname changes -->
    {#key data.url.pathname}
        <div
            in:fade={{ duration: 500, delay: 400, easing: cubicOut }}
            out:fade={{ duration: 500, easing: cubicOut }}
        >
            {@render children()}
        </div>
    {/key}
</Providers>

<style>
    :global(body) {
        display: grid;
    }

    /* svelte exit transitions make the elements appear below each other, which ruines the values of scrollTrigger */
    /* this is a hack to fix that. so that the elements overlap when the transition is running */
    div {
        grid-area: 1/1;
    }
</style>
