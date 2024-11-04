<script lang="ts">
    import { javascript } from '@codemirror/lang-javascript';
    import { markdown } from '@codemirror/lang-markdown';
    import { languages as codeLanguages } from '@codemirror/language-data';
    import { EditorState } from '@codemirror/state';
    import { svelte } from '@replit/codemirror-lang-svelte';
    import { vim } from '@replit/codemirror-vim';
    import { minimalSetup } from 'codemirror';
    import { EditorView, keymap } from '@codemirror/view';
    import { gruvboxDark } from '@fsegurai/codemirror-theme-gruvbox-dark';
    import { defaultKeymap, indentLess, indentMore } from '@codemirror/commands';

    let container: HTMLDivElement;

    interface Props {
        value?: string;
        label?: string;
        required?: boolean;
        name?: string;
        error?: string | string[] | undefined;
        onDocChange?: (doc: string) => void;
    }
    let { value = '', label, error, required, name, onDocChange }: Props = $props();

    let content = $state('');

    $effect(() => {
        const state = EditorState.create({
            doc: value,
            extensions: [
                minimalSetup,
                markdown({ codeLanguages }),
                svelte(),
                keymap.of([
                    ...defaultKeymap,
                    {
                        key: 'Tab',
                        preventDefault: true,
                        run: indentMore
                    },
                    {
                        key: 'Shift-Tab',
                        preventDefault: true,
                        run: indentLess
                    }
                ]),
                javascript({ jsx: true, typescript: true }),
                vim(),
                gruvboxDark,
                EditorView.updateListener.of((update) => {
                    const doc = update.state.doc;
                    const structuredDoc = doc.toJSON().join('\n');
                    if (update.docChanged) {
                        content = structuredDoc;
                        onDocChange?.(structuredDoc);
                    }
                })
            ]
        });

        const editor = new EditorView({
            state,
            parent: container
        });

        return () => {
            editor.destroy();
        };
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/cm-gruvbox.dark.css" />
    <style>
        .cm-editor {
            @apply rounded-md border border-comment bg-background-secondary p-2 caret-white transition-colors duration-300;
        }
        .cm-editor .cm-content {
            @apply min-h-[50vh] overflow-y-auto;
        }
        .cm-editor.cm-focused,
        .cm-editor .cm-cursor {
            @apply border-primary;
        }
        .cm-editor .cm-selectionBackground,
        .cm-editor.cm-focused .cm-selectionBackground {
            @apply !bg-primary;
        }
        .cm-editor .cm-fat-cursor {
            @apply bg-primary !outline-primary;
        }
        .cm-editor:not(.cm-focused) .cm-fat-cursor {
            @apply animate-pulse;
        }
    </style>
</svelte:head>

<textarea class="hidden" value={content} {name}></textarea>

<div class="flex flex-col gap-2">
    {#if label}
        <span class="text-paragraph">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </span>
    {/if}

    <div bind:this={container}></div>

    {#if error}
        {#if typeof error === 'string'}
            <span class="text-sm text-red-600">{error}</span>
        {:else}
            {#each error as error}
                <span class="text-sm text-red-600">{error}</span>
            {/each}
        {/if}
    {/if}
</div>
