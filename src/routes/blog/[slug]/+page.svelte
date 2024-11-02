<script lang="ts">
    import type { PageData } from './$types';
    import { ArrowLeft } from 'lucide-svelte';
    import moment from 'moment';
    import MetaData from '$lib/components/common/meta-data.svelte';
    import { lenisInstance } from '$lib/store/lenis.svelte';
    import { themeStore } from '$lib/store/theme.svelte';

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    const { metadata, BlogPost, url, toc } = data;
</script>

<svelte:head>
    <MetaData
        title={metadata.title}
        description={metadata.summary}
        href={url.href}
        image={metadata.image}
    />

    <link
        rel="stylesheet"
        href={themeStore.theme === 'dark'
            ? '/css/prism-gruvbox-dark.css'
            : '/css/prism-gruvbox-light.css'}
    />
</svelte:head>

<div class="container flex items-start gap-4 px-4 py-32">
    <div class="mx-auto flex min-h-screen w-max max-w-5xl flex-col gap-10">
        <header class="flex flex-col gap-14">
            <a
                href="/blog"
                class="flex items-center gap-2 text-sm text-paragraph transition-colors duration-200 active:text-accent lg:hover:text-accent"
            >
                <ArrowLeft strokeWidth={1} size={20} />
                Back to blog
            </a>
            <div class="flex flex-col gap-8">
                <time class="mb-2 text-sm text-comment"
                    >{moment(metadata.date).format('dddd, MMMM Do YYYY')}</time
                >
                <div class="flex flex-col gap-4">
                    <h1 class="text-4xl font-bold capitalize">{metadata.title}</h1>
                    <p class="text-paragraph">{metadata.summary}</p>
                    <p class="text-sm text-comment">{metadata.readingTime} min read</p>
                </div>
                <div class="aspect-video overflow-hidden rounded-lg">
                    {#if metadata.youtubeId}
                        <iframe
                            src={`https://www.youtube.com/embed/${metadata.youtubeId}?origin=${url.origin}`}
                            title={metadata.title}
                            allow="fullscreen"
                        ></iframe>
                    {:else}
                        <img src={metadata.image} alt={metadata.title} />
                    {/if}
                </div>
                <ul class="flex flex-wrap gap-2">
                    {#each metadata?.tags as tag (tag)}
                        <li
                            class="rounded-lg border border-comment px-2 py-1 text-xs text-paragraph"
                        >
                            {tag}
                        </li>
                    {/each}
                </ul>
            </div>
        </header>
        <div
            class="prose w-full max-w-5xl text-paragraph dark:prose-invert prose-a:text-primary prose-code:text-orange-400 prose-hr:border-comment/50"
        >
            <hr />
            <BlogPost />
        </div>
    </div>
    <aside class="sticky top-32 hidden w-80 flex-col gap-2 2xl:flex">
        {#each toc as heading}
            <button
                onclick={() => {
                    lenisInstance.lenis?.scrollTo(`#${heading.id}`);
                }}
                class="text-start text-sm text-paragraph transition-colors duration-200 active:text-accent lg:hover:text-accent"
                >{heading.value}</button
            >
        {/each}
    </aside>
</div>
