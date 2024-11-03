<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import Textarea from '$lib/components/common/textarea.svelte';
    import type { ActionData } from './$types';
    import { getFileUrl } from '$lib/utils/get-file-url';

    interface Props {
        form: ActionData;
    }
    let { form }: Props = $props();
    let imageUrl = $state('');

    async function handleImageChange(
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) {
        const image = e?.currentTarget?.files?.[0];
        if (!image) return;

        imageUrl = await getFileUrl(image);
    }
</script>

<div class="mx-auto flex min-h-screen items-center justify-center">
    <form
        method="POST"
        use:enhance={({ formData }) => {
            formData.set('image', imageUrl);
        }}
        action="?/add"
        class="flex flex-col gap-6"
        enctype="multipart/form-data"
    >
        <Input value={form?.title} name="title" label="Title" required />
        <Textarea value={form?.summary ?? ''} name="summary" label="Summary" required />
        <!-- add image -->

        <Input
            onchange={handleImageChange}
            value={imageUrl ?? ''}
            type="file"
            accept="image/*"
            label="Image"
            required
        />
        <div class="flex gap-2">
            <Input value={form?.youtubeId} name="youtubeId" label="Youtube video ID" />
            <Input
                value={form?.readingTime}
                name="readingTime"
                label="Reading Time"
                type="number"
            />
        </div>
        <Textarea value={form?.content} name="content" label="Markdown" required class="min-h-60" />

        <div class="flex flex-col items-start gap-2">
            <Input
                type="radio"
                name="published"
                label="Published"
                value="true"
                id="published"
                checked={form?.published === 'true' || !form?.published}
            />
            <Input
                type="radio"
                name="published"
                label="Draft"
                value="false"
                id="draft"
                checked={form?.published === 'false'}
            />
        </div>
        <Button type="submit">submit</Button>
    </form>
</div>
