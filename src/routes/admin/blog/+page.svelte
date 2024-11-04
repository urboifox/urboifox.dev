<script lang="ts">
    import Button from '$lib/components/common/button.svelte';
    import { toast } from 'svelte-sonner';
    import type { PageServerData } from './$types.js';

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
    <h1 class="text-3xl">Blog</h1>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
        {#each data.posts as post (post.id)}
            <div
                class="flex max-w-lg flex-col justify-between gap-4 rounded-md bg-background-secondary p-4"
            >
                <div>
                    <h2 class="text-2xl font-medium">{post.title}</h2>
                    <p class="line-clamp-3 text-paragraph">{post.summary}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <img src={post.image} alt={post.title} class="aspect-video w-full rounded-md" />
                    <a href="/admin/blog/{post.slug}" class='w-max'>
                        <Button>Details</Button>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
