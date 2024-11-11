<script lang="ts">
    import type { Post } from '$lib/models/post';
    import { Edit, Eye, Trash } from 'lucide-svelte';
    import moment from 'moment';
    import Modal from '../common/modal.svelte';
    import { enhance } from '$app/forms';
    import Button from '../common/button.svelte';
    import type { SubmitFunction } from '@sveltejs/kit';

    interface Props {
        post: Post;
        isAdmin?: boolean;
    }
    let { post, isAdmin = false }: Props = $props();

    let modalVisible = $state(false);
    let loading = $state(false);

    const deletePost: SubmitFunction = () => {
        loading = true;
        return async ({ update }) => {
            await update();
            loading = false;
            modalVisible = false;
        };
    };
</script>

{#if isAdmin}
    <Modal bind:visible={modalVisible}>
        <form
            use:enhance={deletePost}
            method="POST"
            class="flex flex-col items-center gap-10 rounded-xl bg-background-primary p-10"
            action={`/admin/blog/${post.slug}/edit?/delete`}
        >
            <h2>Are you sure you want to delete this post?</h2>
            <div class="flex items-center gap-4">
                <Button size="sm" onclick={() => (modalVisible = false)}>Close</Button>
                <Button size="sm" type="submit" variant="danger" disabled={loading}
                    >{loading ? 'Deleting post...' : 'Confirm'}</Button
                >
            </div>
        </form>
    </Modal>
{/if}

<article
    class="group flex w-full flex-col-reverse gap-2 overflow-hidden rounded-lg border border-accent/20 bg-accent/5 shadow-lg transition-colors duration-200 hover:border-accent/40 sm:flex-row"
>
    <div class="flex flex-1 flex-col justify-between gap-2 p-4 md:p-8">
        <div class="flex flex-col gap-2">
            {#if isAdmin}
                <div class="flex items-center gap-2">
                    <button
                        onclick={() => (modalVisible = !modalVisible)}
                        class="text-paragraph transition-colors duration-200 hover:text-red-500"
                    >
                        <Trash strokeWidth={1} size={20} />
                    </button>
                    <a
                        href={`/admin/blog/${post.slug}/edit`}
                        class="text-paragraph transition-colors duration-200 hover:text-primary"
                    >
                        <Edit strokeWidth={1} size={20} />
                    </a>
                    <a
                        href={`/admin/blog/${post.slug}`}
                        class="text-paragraph transition-colors duration-200 hover:text-accent"
                    >
                        <Eye strokeWidth={1} size={20} />
                    </a>
                </div>
            {/if}

            <div class="flex items-center gap-2">
                <time
                    class="text-sm text-comment transition-colors duration-300 group-hover:text-paragraph"
                    >{moment(post.createdAt).fromNow()}</time
                >
                {' • '}
                <span
                    class="text-sm text-comment transition-colors duration-300 group-hover:text-paragraph"
                    >{post.readingTime} min read</span
                >
            </div>
            <h1
                class="text-xl font-bold text-accent/80 transition-colors duration-300 group-hover:text-accent md:text-2xl"
            >
                {post.title}
            </h1>
            <p
                class="line-clamp-2 text-paragraph/80 transition-colors duration-300 group-hover:text-paragraph md:text-lg"
            >
                {post.summary}
            </p>
        </div>
        <div class="text-sm text-comment transition-colors duration-300 group-hover:text-paragraph">
            {post.tags.join(', ')}
        </div>
    </div>
    <img
        src={post.image}
        alt={post.title}
        class="object-cover opacity-70 saturate-0 transition-all duration-300 group-hover:opacity-100 group-hover:saturate-100 sm:w-1/2"
    />
</article>
