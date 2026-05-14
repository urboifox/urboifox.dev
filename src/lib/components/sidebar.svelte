<script lang="ts">
    import XIcon from '@lucide/svelte/icons/x';
    import gsap from 'gsap';
    import { fade } from 'svelte/transition';

    let { open = $bindable() }: { open: boolean } = $props();

    const barsCount = 3;
    const links = [
        { href: '/', label: 'Home' },
        { href: '/posts', label: 'Journal' }
    ];

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            open = false;
        }
    }

    function linkHover(node: HTMLElement) {
        const chars = node.querySelectorAll('.char');

        const enter = () => {
            gsap.to(chars, {
                x: () => gsap.utils.random(-20, 20),
                y: () => gsap.utils.random(-20, 20),
                rotation: () => gsap.utils.random(-30, 30),
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true
            });
        };
        const leave = () => {
            gsap.to(chars, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true
            });
        };

        node.addEventListener('mouseenter', enter);
        node.addEventListener('mouseleave', leave);

        return () => {
            node.removeEventListener('mouseenter', enter);
            node.removeEventListener('mouseleave', leave);
            gsap.killTweensOf(chars);
        };
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class={['fixed inset-0 z-100 flex', open ? 'pointer-events-auto' : 'pointer-events-none']}>
    {#each Array(barsCount), i (i)}
        <div
            style="width: calc(100% / {barsCount}); transition-delay: {i * 100}ms"
            class={[
                'flex bg-[#0c0c0c] transition-transform duration-1000 ease-in-out',
                open ? 'translate-y-0' : '-translate-y-full'
            ]}
        ></div>
    {/each}

    {#if open}
        <div
            class="absolute inset-0 container flex flex-col justify-between gap-4 py-12 text-6xl font-bold uppercase md:text-9xl"
            in:fade={{ duration: 500, delay: barsCount * 100 + 200 }}
            out:fade={{ duration: 200 }}
        >
            <button
                class="w-fit transition-colors hover:text-primary"
                onclick={() => (open = false)}
            >
                <XIcon size={42} />
            </button>
            <div class="flex flex-col gap-6">
                {#each links as { href, label } (href)}
                    <a
                        {href}
                        class="w-fit transition-colors hover:text-primary"
                        {@attach linkHover}
                        onclick={() => (open = false)}
                    >
                        {#each [...label] as ch, i (i)}
                            <span class="char inline-block">
                                {ch}
                            </span>
                        {/each}
                    </a>
                {/each}
            </div>
            <div></div>
        </div>
    {/if}
</div>
