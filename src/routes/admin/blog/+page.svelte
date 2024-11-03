<script lang="ts">
    import type { PageServerData } from './$types.js';

    interface Props {
        data: PageServerData;
    }
    let { data }: Props = $props();
</script>

<h1>Blog</h1>

<div>
    {#each data.posts as post (post.id)}
        <p>{post?.title}</p>
        <p>{post?.summary}</p>
        <img src={post?.image} alt={post?.title} />
    {/each}
</div>
