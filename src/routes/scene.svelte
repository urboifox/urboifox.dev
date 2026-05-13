<script>
    import { T, useTask } from '@threlte/core';
    import { interactivity } from '@threlte/extras';
    import { Spring } from 'svelte/motion';

    interactivity();

    const scale = new Spring(1);
    let rotation = $state(0);

    useTask((delta) => {
        rotation += delta;
    });
</script>

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
    position.y={1.5}
    position.z={2}
    position.x={2}
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
