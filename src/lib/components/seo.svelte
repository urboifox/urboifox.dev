<script lang="ts">
    import { page } from '$app/state';
    import { site } from '$lib/config';

    type Article = {
        publishedTime?: string;
        author?: string;
        section?: string;
        tags?: string[];
    };

    type Props = {
        title?: string;
        description?: string;
        image?: string;
        type?: 'website' | 'article' | 'profile';
        canonical?: string;
        noindex?: boolean;
        article?: Article;
        jsonLd?: Record<string, unknown>;
    };

    const {
        title,
        description = site.description,
        image = site.image,
        type = 'website',
        canonical,
        noindex = false,
        article,
        jsonLd
    }: Props = $props();

    const pageTitle = $derived(title ? `${title} — ${site.name}` : site.title);
    const url = $derived(canonical ?? `${site.url}${page.url.pathname}`);
    const imageUrl = $derived(image.startsWith('http') ? image : `${site.url}${image}`);
    const jsonLdHtml = $derived(
        jsonLd
            ? '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '</' + 'script>'
            : ''
    );
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />

    {#if noindex}
        <meta name="robots" content="noindex, nofollow" />
    {:else}
        <meta name="robots" content="index, follow" />
    {/if}

    <meta property="og:type" content={type} />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:locale" content={site.locale} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:creator" content={site.twitter} />
    <meta name="twitter:site" content={site.twitter} />

    {#if article}
        {#if article.publishedTime}
            <meta property="article:published_time" content={article.publishedTime} />
        {/if}
        {#if article.author}
            <meta property="article:author" content={article.author} />
        {/if}
        {#if article.section}
            <meta property="article:section" content={article.section} />
        {/if}
        {#each article.tags ?? [] as tag (tag)}
            <meta property="article:tag" content={tag} />
        {/each}
    {/if}

    {#if jsonLd}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html jsonLdHtml}
    {/if}
</svelte:head>
