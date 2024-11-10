<script lang="ts">
    import BlogPost from '$lib/components/blog/blog-post.svelte';
    import MetaData from '$lib/components/common/meta-data.svelte';
    import { toast } from 'svelte-sonner';

    let { data } = $props();
    const { posts } = data;

    $effect(() => {
        if (data.error) {
            toast.error(data.error);
        }
    });
</script>

<svelte:head>
    <MetaData
        title="Blog | Fox"
        description="Welcome to my blog! Where I write about my experiences, thoughts, programming, and more."
    />
</svelte:head>

<div class="container space-y-8 py-32">
    <h1 class="font-yeseva text-4xl text-accent">Blog</h1>

    <div class="grid min-h-screen grid-cols-1 gap-4 lg:grid-cols-2">
        {#each posts as post (post.id)}
            <a href="/blog/{post.slug}" class="flex">
                <BlogPost {post} />
            </a>
        {/each}
    </div>
</div>
