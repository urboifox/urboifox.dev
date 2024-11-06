<script lang="ts">
    import FlyIn from '$lib/components/animated/fly-in.svelte';
    import MetaData from '$lib/components/common/meta-data.svelte';
    import moment from 'moment';
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

<div class="container grid min-h-screen grid-cols-1 gap-4 py-32 lg:grid-cols-2">
    {#each posts as post, idx (idx)}
        <FlyIn class="flex" delay={idx * 0.2}>
            <a href="/blog/{post.slug}" class="flex">
                <article
                    class="group flex w-full flex-col-reverse gap-2 overflow-hidden rounded-xl border border-accent/20 bg-accent/5 shadow-lg transition-colors duration-300 hover:border-accent/40 sm:flex-row"
                >
                    <div class="flex flex-1 flex-col justify-between gap-2 p-4 md:p-8">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2">
                                <time
                                    class="text-sm text-comment transition-colors duration-500 group-hover:text-paragraph"
                                    >{moment(post.createdAt).fromNow()}</time
                                >
                                {' • '}
                                <span
                                    class="text-sm text-comment transition-colors duration-500 group-hover:text-paragraph"
                                    >{post.readingTime} min read</span
                                >
                            </div>
                            <h1
                                class="text-xl font-bold text-accent/80 transition-colors duration-500 group-hover:text-accent md:text-2xl"
                            >
                                {post.title}
                            </h1>
                            <p
                                class="line-clamp-2 text-paragraph/80 transition-colors duration-500 group-hover:text-paragraph md:text-lg"
                            >
                                {post.summary}
                            </p>
                        </div>
                        <div
                            class="text-sm text-comment transition-colors duration-500 group-hover:text-paragraph"
                        >
                            {post.tags.join(', ')}
                        </div>
                    </div>
                    <img
                        src={post.image}
                        alt={post.title}
                        class="object-cover opacity-70 saturate-0 transition-all duration-500 group-hover:opacity-100 group-hover:saturate-100 sm:w-1/2"
                    />
                </article>
            </a>
        </FlyIn>
    {/each}
</div>
