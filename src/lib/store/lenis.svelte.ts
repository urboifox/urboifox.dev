import type Lenis from 'lenis';

export let lenisInstance: { lenis: Lenis | null } = $state({
    lenis: null
});
