<script lang="ts">
    import { themeStore } from '$lib/store/theme.svelte';
    import { mount, unmount, type MountOptions } from 'svelte';
    import { Check, Copy } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';

    let { content }: { content: string } = $props();

    let container: HTMLElement;

    $effect(() => {
        const preElements = container.querySelectorAll('pre');
        preElements.forEach((pre) => {
            // relative position for the copy button
            pre.style.position = 'relative';

            // create the copy button
            const copyButton = document.createElement('button');
            copyButton.className =
                'absolute p-2 rounded-md top-2 right-2 aspect-square flex items-center justify-center border border-comment/60 transition-colors duration-200 hover:text-accent hover:border-paragraph';
            pre.appendChild(copyButton);

            const mountOptions: MountOptions = {
                target: copyButton,
                props: { strokeWidth: 1.5, size: 14 }
            };

            // add the copy icon to the button
            let copyEl = mount(Copy, mountOptions);

            // a variable to track wether the user can re-click the button
            let onHold = false;

            copyButton.addEventListener('mousedown', () => {
                if (onHold) return;
                onHold = true;
                // when the user clicks, add the code to his clipoard and show a toast
                const codeToCopy = pre.textContent || '';
                navigator.clipboard.writeText(codeToCopy);
                toast.success('Code copied to clipboard');

                // then replace the copy icon with a check icon for some time
                unmount(copyEl);
                const checkEl = mount(Check, mountOptions);

                setTimeout(() => {
                    // return the copy icon after 500 ms
                    unmount(checkEl);
                    copyEl = mount(Copy, mountOptions);
                    onHold = false;
                }, 2000);
            });
        });
    });
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href={themeStore.theme === 'dark'
            ? '/css/prism-gruvbox-dark.css'
            : '/css/prism-gruvbox-light.css'}
    />
</svelte:head>

<div
    bind:this={container}
    class="prose prose-sm w-full max-w-5xl text-paragraph dark:prose-invert sm:prose-lg prose-a:text-primary prose-code:text-orange-400 prose-pre:max-w-full prose-pre:transition-colors prose-pre:duration-300 prose-hr:border-comment/50"
>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html content}
</div>
