<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import Textarea from '$lib/components/common/textarea.svelte';
    import { slug } from 'github-slugger';
    import Tag from '$lib/components/common/tag.svelte';
    import { toast } from 'svelte-sonner';
    import ImageInput from '$lib/components/common/image-input.svelte';
    import { ArrowLeft } from 'lucide-svelte';
    import type { SubmitFunction } from './$types';
    import CodeEditor from '$lib/components/common/code-editor.svelte';

    let { form, data } = $props();
    const { post } = data;
    let imageUrl = $state(post?.image);

    let titleSlug = $state(post?.slug);
    let tag = $state('');
    let tags = $state<string[]>(post?.tags || []);
    let loading = $state(false);

    $effect(() => {
        if (form?.toast) {
            toast.error(form?.toast);
        }
    });

    const editPost: SubmitFunction = ({ formData }) => {
        loading = true;
        formData.set('image', imageUrl);
        formData.append('slug', slug(titleSlug));
        for (const tag of tags) {
            formData.append('tags', tag);
        }

        return async ({ update }) => {
            await update();
            loading = false;
        };
    };
</script>

<div class="mx-auto flex w-full max-w-xl flex-col gap-10 pb-20 pt-32">
    <a
        href="/admin/blog/{post?.slug}"
        class="flex items-center gap-2 text-paragraph transition-colors duration-200 hover:text-white"
        ><ArrowLeft size={20} /> Back to blog</a
    >
    <form
        method="POST"
        action="?/edit"
        use:enhance={editPost}
        class="flex w-full flex-col gap-6"
        enctype="multipart/form-data"
        onreset={(e) => {
            e.preventDefault();
        }}
    >
        <Input
            oninput={(e) => {
                titleSlug = slug(e.currentTarget.value);
            }}
            value={post?.title}
            error={form?.errors?.title}
            name="title"
            label="Title"
        />
        <p class="text-sm text-paragraph">
            {titleSlug}
        </p>

        <Textarea
            value={post?.summary}
            name="summary"
            label="Summary"
            error={form?.errors?.summary}
        />
        <Input
            bind:value={tag}
            label="Tags"
            error={form?.errors?.tags}
            oninput={(e) => {
                tag = e.currentTarget.value;
            }}
            onkeypress={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tag.trim().length > 0) {
                        tags.push(tag.trim());
                        tag = '';
                    }
                }
            }}
        />
        <div class="flex flex-wrap gap-2">
            {#each tags as tag, i (i)}
                <Tag {tag} onclick={() => tags.splice(i, 1)} />
            {/each}
        </div>

        <ImageInput
            defaultImage={imageUrl}
            name="image"
            label="Image"
            onFileChange={(url) => (imageUrl = url)}
            error={form?.errors?.image}
        />
        <div class="flex gap-2">
            <Input value={post?.youtubeId} name="youtubeId" label="Youtube video ID" containerClass="w-full" />
            <Input
                value={post?.readingTime.toString()}
                name="readingTime"
                label="Reading Time"
                type="number"
                containerClass="w-full"
            />
        </div>
        <CodeEditor label="Markdown" error={form?.errors?.content} name="content" value={post?.content} />

        <div class="flex flex-col items-start gap-2">
            <Input
                type="radio"
                name="published"
                label="Published"
                value="true"
                id="published"
                checked={post?.published}
            />
            <Input
                type="radio"
                name="published"
                label="Draft"
                value="false"
                id="draft"
                checked={!post?.published}
            />
        </div>
        <Button disabled={loading} type="submit">Save</Button>
        <Button variant="danger" disabled={loading} type="submit" formaction="?/delete">Delete</Button>
    </form>
</div>
