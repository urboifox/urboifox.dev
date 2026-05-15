<script lang="ts">
    import { page } from '$app/state';
    import { blurIn } from '$lib/actions/blur-in';
    import { mount, onMount } from 'svelte';
    import CopyButton from './copy-button.svelte';
    import Seo from '$lib/components/seo.svelte';
    import { site } from '$lib/config';

    const { data } = $props();

    const articleJsonLd = $derived({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.metadata.title,
        description: data.metadata.description,
        author: { '@type': 'Person', name: site.name, url: site.url },
        publisher: { '@type': 'Person', name: site.name, url: site.url },
        datePublished: data.metadata.published,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${page.url.pathname}` },
        ...(data.metadata.category ? { articleSection: data.metadata.category } : {})
    });

    function formatDate(value?: string) {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .toUpperCase();
    }

    onMount(() => {
        const titles = document.querySelectorAll('[data-remark-code-title]');

        titles.forEach((title) => {
            title.classList.add('flex', 'items-center', 'justify-between', 'gap-2');
            const titleText = title.innerHTML;
            const codeElement = title.nextElementSibling as HTMLElement;
            title.innerHTML = `<span>${titleText}</span>`;
            mount(CopyButton, { target: title, props: { content: codeElement.innerText } });
        });
    });
</script>

<Seo
    title={data.metadata.title}
    description={data.metadata.description}
    type="article"
    article={{
        publishedTime: data.metadata.published,
        author: site.name,
        section: data.metadata.category
    }}
    jsonLd={articleJsonLd}
/>

<svelte:head>
    <link href="/themes/theme.css" rel="stylesheet" />
</svelte:head>

<article class="container min-h-screen py-32">
    <div class="mx-auto max-w-3xl">
        <a
            href="/posts"
            class="group pointer-events-auto inline-flex items-center gap-2 text-sm text-muted opacity-0 transition-colors hover:text-primary"
            {@attach blurIn()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="11 18 5 12 11 6" />
            </svg>
            <span>All posts</span>
        </a>

        <header
            class="mt-12 mb-16 space-y-6 border-b border-border pb-12 opacity-0"
            {@attach blurIn(0.1)}
        >
            <div class="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span class="font-mono text-primary">#</span>
                <span class="h-px w-8 bg-border"></span>
                {#if data.metadata.category}
                    <span
                        class="rounded-full border border-border px-2.5 py-0.5 text-[10px] tracking-widest uppercase"
                    >
                        {data.metadata.category}
                    </span>
                {/if}
                {#if data.metadata.published}
                    <span class="font-mono tracking-widest">
                        {formatDate(data.metadata.published)}
                    </span>
                {/if}
            </div>

            <h1 class="text-5xl font-bold capitalize md:text-6xl">
                {data.metadata.title}<span class="text-primary">.</span>
            </h1>

            {#if data.metadata.description}
                <p class="text-base text-muted md:text-lg">
                    {data.metadata.description}
                </p>
            {/if}
        </header>

        <div
            class="prose max-w-none opacity-0
            prose-invert
                marker:text-primary prose-headings:scroll-mt-24 prose-headings:font-bold
                prose-headings:text-foreground prose-h1:mt-12 prose-h2:mt-12
                prose-h2:mb-4
                prose-h2:text-3xl prose-h3:mt-10 prose-h3:mb-3
                prose-h3:text-xl prose-h4:mt-8 prose-h4:mb-2
                prose-h4:text-lg prose-p:leading-7
                prose-p:text-neutral-400 prose-a:font-medium prose-a:text-primary
                prose-a:underline prose-a:underline-offset-4
                 prose-blockquote:rounded-r-lg
                prose-blockquote:border-l-2
                prose-blockquote:border-l-primary prose-blockquote:bg-card/40 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:text-muted prose-blockquote:not-italic prose-strong:font-bold prose-strong:text-foreground prose-em:text-foreground prose-kbd:rounded
                prose-kbd:border prose-kbd:border-border prose-kbd:bg-card prose-kbd:px-1.5
                prose-kbd:py-0.5 prose-kbd:text-[0.75em]
                prose-kbd:font-medium prose-kbd:text-foreground prose-code:rounded
                prose-code:border prose-code:border-border prose-code:bg-card
                prose-code:px-1.5
                prose-code:py-0.5 prose-code:text-[0.875em]
                prose-code:font-medium prose-code:text-foreground
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:m-0 prose-pre:border-0 prose-pre:bg-transparent
                prose-pre:p-0 prose-ol:my-6
                prose-ul:my-6 prose-li:my-1 prose-li:text-foreground
                prose-thead:border-border prose-tr:border-border prose-hr:my-10 prose-hr:border-border"
            {@attach blurIn(0.2)}
        >
            <data.content />
        </div>

        <footer
            class="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6 opacity-0"
            {@attach blurIn(0.3)}
        >
            <span class="font-mono text-xs tracking-widest text-muted"> ~/end </span>

            <a
                href="https://github.com/urboifox/urboifox.dev/blob/main/posts/{page.params
                    .slug}.md"
                target="_blank"
                rel="noopener noreferrer"
                class="group pointer-events-auto inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-4 w-4"
                >
                    <path
                        d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.98c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13v3.15c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
                    />
                </svg>
                <span>Edit on GitHub</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                </svg>
            </a>
        </footer>
    </div>
</article>
