<script lang="ts">
    import MetaData from '$lib/components/common/meta-data.svelte';
    import Hero from '$lib/components/home/hero.svelte';
    import SelectedCrafts from '$lib/components/home/selected-crafts.svelte';
</script>

<svelte:head>
    <MetaData title="Home | Fox" />
</svelte:head>


<Hero />
<SelectedCrafts />
<div class="h-screen"></div>
