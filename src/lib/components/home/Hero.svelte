<script lang="ts">
    import WordsIn from '../animated/WordsIn.svelte';
    const headingText = 'Mohamed Ashraf';
</script>

<div class="container flex min-h-screen flex-col items-center justify-center gap-4">
    <WordsIn scrollTrigger={false} text={headingText} class="text-8xl font-bold" delay={.5} />
    <WordsIn
        scrollTrigger={false}
        text={'They also call me Fox'}
        class="text-2xl text-neutral-500"
        delay={0.5}
    />
    <a href="/about">Go to about</a>
</div>
