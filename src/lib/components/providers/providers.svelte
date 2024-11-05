<script lang="ts">
    import type { Snippet } from 'svelte';
    import GrainOverlay from '../layout/GrainOverlay.svelte';
    import Navbar from '../layout/Navbar.svelte';
    import GsapLenisProvider from './gsap-lenis-provider.svelte';
    import ThemeProvider from './theme-provider.svelte';
    import { Toaster } from 'svelte-sonner';
    import Scrollbar from '../common/scrollbar.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
</script>

<GrainOverlay />
<Navbar />
<Toaster />
<ThemeProvider>
    <GsapLenisProvider>
        <Scrollbar />
        {@render children()}
    </GsapLenisProvider>
</ThemeProvider>
