<script lang="ts">
    import { toast } from 'svelte-sonner';
    import type { PageServerData } from './$types.js';
    import BlogPost from '$lib/components/blog/blog-post.svelte';
    import BackButton from '$lib/components/common/back-button.svelte';

    interface Props {
        data: PageServerData;
    }
    let { data }: Props = $props();

    $effect(() => {
        if (data.error) {
            toast.error(data.error);
        }
    });
</script>

<div class="container flex flex-col gap-10 py-32">
    <BackButton href="/admin" label="Back to dashboard" />
    <h1 class="text-3xl">Blog</h1>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {#each data.posts as post (post.id)}
            <BlogPost {post} isAdmin />
        {/each}
    </div>
</div>
