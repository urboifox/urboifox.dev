<script lang="ts">
    interface Props {
        title: string;
        description?: string;
        image?: string;
        href?: string;
    }
    const { title, description, image, href }: Props = $props();
</script>

<title>{title}</title>
<meta name="title" content={title} />
<meta property="og:title" content={title} />
<meta property="og:type" content="website" />
<meta property="twitter:title" content={title} />

{#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="twitter:description" content={description} />
{/if}

{#if href}
    <meta property="og:url" content={href} />
    <meta property="twitter:url" content={href} />
{/if}

<meta property="twitter:card" content="description_large_image" />
{#if image}
    <meta property="og:image" content={image} />
    <meta property="twitter:image" content={image} />
{/if}
