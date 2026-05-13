<script lang="ts">
    let visible = $state(true);
    let scrolled = $state(false);
    let lastScrollY = $state(0);

    function handleScroll() {
        const currentScrollY = window.scrollY;

        scrolled = currentScrollY > 0;

        if (currentScrollY <= 120) {
            visible = true;
        } else if (currentScrollY > lastScrollY) {
            visible = false;
        } else if (currentScrollY < lastScrollY) {
            visible = true;
        }

        lastScrollY = currentScrollY;
    }

    let menuOpen = $state(false);

    function handleMenuClick() {
        menuOpen = !menuOpen;
    }
</script>

<svelte:window onscroll={handleScroll} />

<header
    class={[
        'fixed inset-x-0 w-full transition-all duration-300 ease-in-out',
        visible ? 'top-4' : '-top-12'
    ]}
>
    <div class="container flex items-center justify-between gap-4 p-4">
        <a href="/" class="pointer-events-auto text-sm font-bold uppercase"> urboifox </a>
        <button
            onclick={handleMenuClick}
            aria-label="Menu"
            class="pointer-events-auto cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6"
            >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        </button>
    </div>
</header>
