<script lang="ts">
    import type { PageData } from './$types';

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    const { blogPosts } = data;
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
  {#each blogPosts as blogPost}
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">{blogPost.metadata.title}</h1>
      <p class="text-lg">{blogPost.metadata.summary}</p>
      <a href="/blog/{blogPost.metadata.slug}">Read more</a>
    </div>
  {/each}
</div>
