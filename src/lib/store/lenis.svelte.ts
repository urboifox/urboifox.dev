import type Lenis from 'lenis';

export const lenisInstance: { lenis: Lenis | null } = $state({
    lenis: null
});
