<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import Textarea from '$lib/components/common/textarea.svelte';
    import { toast } from 'svelte-sonner';
    import ImageInput from '$lib/components/common/image-input.svelte';
    import { ArrowLeft } from 'lucide-svelte';
    import type { SubmitFunction } from './$types.js';
    import { parseInputDate } from '$lib/utils/parse-input-date';

    let { form, data } = $props();
    const { craft } = data;
    let imageUrl = $state(craft?.image);

    let loading = $state(false);

    $effect(() => {
        if (form?.error) {
            toast.error(form?.error);
        }
        if (form?.success) {
            toast.success('Craft updated successfully');
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
        href="/admin/craft/{craft.slug}"
        class="flex items-center gap-2 text-paragraph transition-colors duration-200 hover:text-white"
        ><ArrowLeft size={20} />Back to craft</a
    >
    <form
        method="POST"
        use:enhance={addCraft}
        action="?/edit"
        class="flex w-full flex-col gap-6"
        enctype="multipart/form-data"
        onreset={(e) => e.preventDefault()}
    >
        <Input
            value={craft?.title}
            error={form?.errors?.title}
            name="title"
            label="Title"
            required
        />
        <Textarea
            value={craft?.description}
            name="description"
            label="Description"
            error={form?.errors?.description}
            required
        />

        <div class="flex items-start gap-2">
            <Input name="repo" label="Repository" type="url" value={craft?.repo} />
            <Input name="link" label="Link" type="url" value={craft?.link} />
        </div>

        <div class="flex items-start gap-2">
            <Input name="client" label="Client" value={craft?.client} />
            <Input name="clientUrl" label="Client URL" type="url" value={craft?.clientUrl} />
        </div>

        <ImageInput name="image" label="Image" bind:imageUrl error={form?.errors?.image} />

        <div class="flex items-start gap-2">
            <Input
                value={parseInputDate(craft?.startDate)}
                error={form?.errors?.startDate}
                name="startDate"
                label="Start Date"
                type="date"
                required
            />
            <Input
                value={parseInputDate(craft?.endDate)}
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
                checked={craft?.published}
            />
            <Input
                type="radio"
                name="published"
                label="Draft"
                value="false"
                id="draft"
                checked={!craft?.published}
            />
        </div>
        <Button disabled={loading} type="submit">Save</Button>
        <Button disabled={loading} variant="danger" type="submit" formaction="?/delete">
            Delete
        </Button>
    </form>
</div>
