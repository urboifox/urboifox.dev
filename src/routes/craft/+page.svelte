<script>
    import MetaData from '$lib/components/common/meta-data.svelte';

    let { data } = $props();
    const { crafts } = data;
</script>

<svelte:head>
    <MetaData title="Craft | Fox" />
</svelte:head>

<div class="container min-h-screen space-y-8 py-32">
    <h1 class="font-yeseva text-4xl text-accent">Craft</h1>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {#each crafts as craft (craft.id)}
            <a href="/craft/{craft.slug}" class="flex">
                {craft.slug}
            </a>
        {/each}
    </div>
</div>
