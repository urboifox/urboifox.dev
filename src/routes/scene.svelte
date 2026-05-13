<script>
    import { T } from '@threlte/core';
    import { GLTF, interactivity, useGltfAnimations } from '@threlte/extras';
    import Sparkles from './sparkles.svelte';

    interactivity();

    let innerWidth = $state(0);
    let gltf = $state();

    const { actions } = useGltfAnimations(() => gltf);

    $effect(() => {
        $actions.walk?.reset().play();
    });

    const isMobile = $derived(innerWidth > 0 && innerWidth < 768);
    const meshX = $derived(isMobile ? 0 : 1);
    const meshY = $derived(isMobile ? 2 : 1.5);
    const scale = $derived(isMobile ? 0.3 : 0.7);
</script>

<svelte:window bind:innerWidth />

<T.PerspectiveCamera
    makeDefault
    position={[0, 2, 8]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0);
    }}
/>

<T.DirectionalLight intensity={0.5} position={[8, 10, 5]} castShadow color="#ff3e00" />
<T.DirectionalLight intensity={0.5} position={[8, 10, 5]} castShadow />
<T.AmbientLight intensity={0.3} />

<Sparkles />

<T.Group position.y={meshY} position.z={1} {scale} rotation.y={-Math.PI / 4} position.x={meshX}>
    <GLTF url="/models/fox.glb" castShadow receiveShadow bind:gltf />
</T.Group>
