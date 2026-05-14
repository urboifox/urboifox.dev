<script lang="ts">
    import { blurIn } from '$lib/actions/blur-in';

    type Skill = { label: string; level?: string };
    type Group = { title: string; tag: string; items: Skill[] };

    let cardEl: HTMLUListElement | undefined = $state();
    let innerWidth = $state(0);
    const isMobile = $derived(innerWidth > 0 && innerWidth < 768);

    let pendingX = 0;
    let pendingY = 0;
    let rafScheduled = false;
    let cachedRect: DOMRect | undefined;

    function refreshCache() {
        cachedRect = cardEl?.getBoundingClientRect();
    }

    function flush() {
        rafScheduled = false;
        if (!cardEl || !cachedRect) return;
        cardEl.style.setProperty('--x', `${pendingX - cachedRect.left}px`);
        cardEl.style.setProperty('--y', `${pendingY - cachedRect.top}px`);
    }

    function handleMouseMove(event: MouseEvent) {
        if (isMobile || !cardEl) return;
        pendingX = event.clientX;
        pendingY = event.clientY;
        if (!rafScheduled) {
            rafScheduled = true;
            requestAnimationFrame(flush);
        }
    }

    $effect(() => {
        if (!cardEl) return;
        refreshCache();

        if (isMobile) {
            cardEl.style.setProperty('--x', '50%');
            cardEl.style.setProperty('--y', '0px');
            return;
        }

        const onResize = () => refreshCache();
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onResize, { passive: true });
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onResize);
        };
    });

    const groups: Group[] = [
        {
            title: 'Frontend',
            tag: 'ui',
            items: [
                { label: 'Svelte', level: 'daily' },
                { label: 'Next.js', level: 'daily' },
                { label: 'Tailwind CSS' },
                { label: 'TypeScript' },
                { label: 'Expo' }
            ]
        },
        {
            title: 'Motion & 3D',
            tag: 'fx',
            items: [
                { label: 'GSAP', level: 'daily' },
                { label: 'Three.js' },
                { label: 'Threlte' },
                { label: 'Lenis' },
                { label: 'Motion' }
            ]
        },
        {
            title: 'Tooling',
            tag: 'dx',
            items: [
                { label: 'Neovim', level: 'daily' },
                { label: 'Linux', level: 'daily' },
                { label: 'Bun' },
                { label: 'Git' },
                { label: 'Figma' }
            ]
        },
        {
            title: 'Backend & Misc',
            tag: 'srv',
            items: [
                { label: 'Node.js' },
                { label: 'PostgreSQL' },
                { label: 'Redis' },
                { label: 'Docker' },
                { label: 'REST / GraphQL' }
            ]
        }
    ];
</script>

<svelte:window bind:innerWidth onmousemove={handleMouseMove} />

<section class="container py-20 md:py-32">
    <div class="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3" {@attach blurIn()}>
            <div class="flex items-center gap-3 text-neutral-500">
                <span class="font-mono text-primary">04</span>
                <span class="h-px w-8 bg-neutral-800"></span>
                <span class="font-mono">~/stack</span>
            </div>
            <h2 class="text-5xl font-bold md:text-6xl">
                Toolbelt<span class="text-primary">.</span>
            </h2>
        </div>
        <p class="max-w-xs text-sm text-neutral-500" {@attach blurIn()}>
            What I reach for when building. Always rotating, always learning.
        </p>
    </div>

    <ul
        bind:this={cardEl}
        class="skills-card relative grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-900 md:grid-cols-2 lg:grid-cols-4"
    >
        {#each groups as group, i (group.title)}
            <li class="bg-neutral-950/20 p-6 backdrop-blur-sm md:p-8" {@attach blurIn(i * 0.1)}>
                <div class="flex items-center justify-between gap-3">
                    <span class="font-mono text-xs text-primary">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                        class="rounded-full border border-neutral-800 px-2 py-0.5 text-[10px] tracking-widest text-neutral-500 uppercase"
                    >
                        ~/{group.tag}
                    </span>
                </div>
                <h3 class="mt-6 text-2xl font-semibold">{group.title}</h3>
                <ul class="mt-6 space-y-3 border-t border-neutral-900 pt-4">
                    {#each group.items as skill (skill.label)}
                        <li class="flex items-center justify-between gap-3 text-sm">
                            <span class="text-neutral-300">{skill.label}</span>
                            {#if skill.level}
                                <span
                                    class="font-mono text-[10px] tracking-widest text-primary uppercase"
                                >
                                    {skill.level}
                                </span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</section>

<style>
    .skills-card::before {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: inherit;
        background: radial-gradient(
            500px circle at var(--x, -200px) var(--y, -200px),
            var(--color-primary) 0%,
            transparent 70%
        );
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 1;
    }
</style>
