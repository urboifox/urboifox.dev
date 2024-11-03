<script lang="ts">
    import type { Post } from '$lib/models/post';
    import { ArrowLeft } from 'lucide-svelte';
    import moment from 'moment';
    import Tag from '../common/tag.svelte';

    interface Props {
        post: Post;
        url: URL;
    }
    let { post, url }: Props = $props();
</script>

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
            >{moment(post.createdAt).format('dddd, MMMM Do YYYY')}</time
        >
        <div class="flex flex-col gap-4">
            <h1 class="text-4xl font-bold capitalize">{post.title}</h1>
            <p class="text-paragraph">{post.summary}</p>
            <p class="text-sm text-comment">{post.readingTime} min read</p>
        </div>
        <div class="aspect-video overflow-hidden rounded-lg">
            {#if post.youtubeId}
                <iframe
                    class="h-full w-full"
                    src={`https://www.youtube.com/embed/${post.youtubeId}?origin=${url.origin}`}
                    title={post.title}
                    allow="fullscreen"
                ></iframe>
            {:else}
                <img src={post.image} alt={post.title} />
            {/if}
        </div>
        <div class="flex flex-wrap gap-2">
            {#each post?.tags as tag (tag)}
                <Tag {tag} />
            {/each}
        </div>
    </div>
</header>
