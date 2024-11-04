<script lang="ts">
    let { data } = $props();
    const { craft } = data;
</script>

<div class="container flex max-w-3xl flex-col gap-4 py-32">
    <div class="flex flex-col gap-4">
        <article
            class="flex flex-col gap-2 rounded-md border border-comment/40 bg-accent/5 p-4 backdrop-blur-sm"
        >
            <h2 class="text-2xl font-bold">{craft.title}</h2>
            <p class="line-clamp-2 text-sm text-paragraph">{craft.description}</p>
            <div class="flex gap-2">
                <a
                    href="/admin/craft/{craft.slug}/edit"
                    class="text-paragraph transition-colors duration-200 hover:text-accent">Edit</a
                >
            </div>
        </article>
    </div>
</div>
