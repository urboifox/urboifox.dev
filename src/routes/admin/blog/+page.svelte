<script lang="ts">
    import { toast } from 'svelte-sonner';
    import type { PageServerData } from './$types.js';
    import BlogPost from '$lib/components/blog/blog-post.svelte';
    import BackButton from '$lib/components/common/back-button.svelte';
    import AddNewButton from '$lib/components/common/add-new-button.svelte';

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
    <div class="flex items-center justify-between gap-4">
        <BackButton href="/admin" label="Back to dashboard" />
        <AddNewButton href="/admin/blog/add" />
    </div>
    <h1 class="text-3xl">Blog</h1>

    <div class="flex flex-col gap-4">
        {#each data.posts as post (post.id)}
            <BlogPost {post} isAdmin />
        {/each}
    </div>
</div>
