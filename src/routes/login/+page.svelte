<script lang="ts">
    import { enhance } from '$app/forms';
    import Button from '$lib/components/common/button.svelte';
    import Input from '$lib/components/common/input.svelte';
    import { toast } from 'svelte-sonner';
    import type { SubmitFunction } from './$types';

    let { form } = $props();

    $effect(() => {
        if (form?.success === false) {
            toast.error(form?.message);
        }
    });

    let loading = $state(false);

    const login: SubmitFunction = () => {
        loading = true;
        return async ({ update }) => {
            await update();
            loading = false;
        };
    };
</script>

<div class="container flex min-h-screen items-center justify-center">
    <form
        class="flex w-full max-w-lg flex-col items-center justify-center gap-6"
        method="POST"
        use:enhance={login}
        onreset={(e) => e.preventDefault()}
    >
        <Input name="username" label="Username" />
        <Input name="password" type="password" label="Password" />
        <Button type="submit" class="mt-4 w-full">{loading ? 'Logging in...' : 'Login'}</Button>
    </form>
</div>
