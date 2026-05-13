<script>
    import { T, useTask } from '@threlte/core';
    import { interactivity } from '@threlte/extras';
    import { Spring } from 'svelte/motion';

    interactivity();

    const scale = new Spring(1);
    let rotation = $state(0);
    let innerWidth = $state(0);

    const isMobile = $derived(innerWidth > 0 && innerWidth < 768);
    const meshX = $derived(isMobile ? 0 : 2);
    const meshY = $derived(isMobile ? 2 : 1.5);

    useTask((delta) => {
        rotation += delta;
    });
</script>

<svelte:window bind:innerWidth />

<T.PerspectiveCamera
    makeDefault
    position={[0, 2, 8]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0);
    }}
/>

<T.DirectionalLight position={[8, 10, 5]} castShadow />
<T.AmbientLight intensity={0.5} />

<T.Mesh
    rotation.y={rotation}
    position.y={meshY}
    position.z={2}
    position.x={meshX}
    scale={scale.current}
    onpointerenter={() => {
        scale.target = 1.2;
    }}
    onpointerleave={() => {
        scale.target = 1;
    }}
    castShadow
>
    <T.BoxGeometry args={[1, 2, 1]} />
    <T.MeshStandardMaterial color="#ff3e00" />
</T.Mesh>
