<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import Textarea from '$lib/components/common/textarea.svelte';
    import { toast } from 'svelte-sonner';
    import ImageInput from '$lib/components/common/image-input.svelte';
    import { ArrowLeft } from 'lucide-svelte';
    import type { SubmitFunction } from './$types.js';
    import MultiImageInput from '$lib/components/common/multi-image-input.svelte';

    let { form } = $props();
    let imageUrl = $state('');

    let loading = $state(false);

    $effect(() => {
        if (form?.error) {
            toast.error(form?.error);
        }
    });

    const addCraft: SubmitFunction = ({ formData }) => {
        loading = true;
        formData.append('image', imageUrl);
        return async ({ update }) => {
            await update();
            loading = false;
        };
    };
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-10 pb-20 pt-32">
    <a
        href="/admin/craft"
        class="flex items-center gap-2 text-paragraph transition-colors duration-200 hover:text-white"
        ><ArrowLeft size={20} />Back to craft</a
    >
    <form
        method="POST"
        use:enhance={addCraft}
        class="flex w-full flex-col gap-6"
        enctype="multipart/form-data"
        onreset={(e) => e.preventDefault()}
    >
        <Input error={form?.errors?.title} name="title" label="Title" required />
        <Textarea
            name="description"
            label="Description"
            error={form?.errors?.description}
            required
        />

        <div class="flex items-start gap-2">
            <Input name="repo" label="Repository" type="url" />
            <Input name="link" label="Link" type="url" />
        </div>

        <div class="flex items-start gap-2">
            <Input name="client" label="Client" />
            <Input name="clientUrl" label="Client URL" type="url" />
        </div>

        <ImageInput
            name="image"
            label="Main Image"
            bind:imageUrl
            error={form?.errors?.image}
            required
        />
        <MultiImageInput
            label="Gallery"
            name="additional_images"
        />

        <div class="flex items-start gap-2">
            <Input
                error={form?.errors?.startDate}
                name="startDate"
                label="Start Date"
                type="date"
                required
            />
            <Input
                error={form?.errors?.endDate}
                name="endDate"
                label="End Date"
                type="date"
                required
            />
        </div>

        <div class="flex flex-col items-start gap-2">
            <Input
                type="radio"
                name="published"
                label="Published"
                value="true"
                id="published"
                checked={true}
            />
            <Input type="radio" name="published" label="Draft" value="false" id="draft" />
        </div>
        <Button disabled={loading} type="submit" {loading}>Submit</Button>
    </form>
</div>
