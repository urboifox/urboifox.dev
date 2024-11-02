<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    import { themeStore, type Theme } from '$lib/store/theme.svelte';
    const defaultTheme: Theme = 'dark';

    $effect(() => {
        const localStorageTheme = localStorage.getItem('theme') || defaultTheme;
        themeStore.theme = localStorageTheme as Theme;
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', defaultTheme);
        }
    });
</script>

{@render children()}
