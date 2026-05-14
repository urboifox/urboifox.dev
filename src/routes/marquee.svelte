<script lang="ts">
    const words = [
        'Web Development',
        'Mobile Development',
        'Vim Enthusiast',
        'Terminals',
        'Gaming',
        'Motorcycles',
        'Why are you still here?',
        'Scroll down',
        'Oh come on',
        "Let's start over"
    ];
</script>

<section
    aria-hidden="true"
    class="relative mt-24 overflow-hidden border-y border-border py-6 backdrop-blur-sm select-none md:py-10"
>
    <div class="marquee-track flex w-max items-center gap-12 pr-12">
        {#each words as word, i (`a-${i}`)}
            <div class="flex items-center gap-12">
                <span
                    class="bg-foreground/10 bg-clip-text text-5xl font-bold tracking-tight text-transparent uppercase backdrop-blur-sm md:text-6xl"
                >
                    {word}
                </span>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-primary"
                >
                    <path
                        d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                        stroke="currentColor"
                        stroke-width="0.9600000000000002"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </div>
        {/each}
        {#each words as word, i (`b-${i}`)}
            <div aria-hidden="true" class="flex items-center gap-12">
                <span
                    class="bg-foreground/10 bg-clip-text text-5xl font-bold tracking-tight text-transparent uppercase backdrop-blur-sm md:text-6xl"
                >
                    {word}
                </span>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-primary"
                >
                    <path
                        d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                        stroke="currentColor"
                        stroke-width="0.9600000000000002"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </div>
        {/each}
    </div>
</section>

<style>
    @keyframes marquee-scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }

    .marquee-track {
        animation: marquee-scroll 120s linear infinite;
        will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
        .marquee-track {
            animation: none;
        }
    }
</style>
