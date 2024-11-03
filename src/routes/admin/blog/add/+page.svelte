<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import Textarea from '$lib/components/common/textarea.svelte';
    import type { ActionData, SubmitFunction } from './$types';
    import { slug } from 'github-slugger';
    import Tag from '$lib/components/common/tag.svelte';
    import { toast } from 'svelte-sonner';
    import ImageInput from '$lib/components/common/image-input.svelte';
    import { ArrowLeft } from 'lucide-svelte';

    interface Props {
        form: ActionData;
    }
    let { form }: Props = $props();
    let imageUrl = $state('');

    let titleString = $state('');
    let tag = $state('');
    let tags = $state<string[]>([]);
    let loading = $state(false);

    $effect(() => {
        titleString = form?.payload?.title || '';
        tags = form?.payload?.tags || [];

        if (form?.toast) {
            toast.error(form?.toast);
        }
    });

    const addPost: SubmitFunction = ({ formData }) => {
        loading = true;
        formData.set('image', imageUrl);
        for (const tag of tags) {
            formData.append('tags', tag);
            formData.append('slug', slug(titleString));
        }

        return async ({ update }) => {
            await update();
            loading = false;
        };
    };
</script>

<div class="mx-auto flex w-full max-w-xl flex-col gap-10 pb-20 pt-32">
    <a
        href="/admin/blog"
        class="flex items-center gap-2 text-paragraph transition-colors duration-200 hover:text-white"
        ><ArrowLeft size={20} /> Back to blog</a
    >
    <form
        method="POST"
        use:enhance={addPost}
        action="?/add"
        class="flex w-full flex-col gap-6"
        enctype="multipart/form-data"
    >
        <Input
            oninput={(e) => {
                titleString = slug(e.currentTarget.value);
            }}
            value={form?.payload?.title}
            error={form?.errors?.title}
            name="title"
            label="Title"
        />
        <p class="text-sm text-paragraph">
            {titleString}
        </p>

        <Textarea
            value={form?.payload?.summary ?? ''}
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
                    tags.push(tag);
                    tag = '';
                }
            }}
        />
        <div class="flex flex-wrap gap-2">
            {#each tags as tag, i (i)}
                <Tag {tag} />
            {/each}
        </div>

        <ImageInput
            name="image"
            label="Image"
            onFileChange={(url) => (imageUrl = url)}
            error={form?.errors?.image}
        />
        <div class="flex gap-2">
            <Input value={form?.payload?.youtubeId} name="youtubeId" label="Youtube video ID" />
            <Input
                value={form?.payload?.readingTime}
                name="readingTime"
                label="Reading Time"
                type="number"
            />
        </div>
        <Textarea
            value={form?.payload?.content}
            name="content"
            label="Markdown"
            class="min-h-60"
            error={form?.errors?.content}
        />

        <div class="flex flex-col items-start gap-2">
            <Input
                type="radio"
                name="published"
                label="Published"
                value="true"
                id="published"
                checked={form?.payload?.published === 'true'}
            />
            <Input
                type="radio"
                name="published"
                label="Draft"
                value="false"
                id="draft"
                checked={form?.payload?.published === 'false' || !form?.payload?.published}
            />
        </div>
        <Button disabled={loading} type="submit">Submit</Button>
    </form>
</div>
