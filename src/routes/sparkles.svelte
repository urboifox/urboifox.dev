<script lang="ts">
    import { T, useTask } from '@threlte/core';
    import * as THREE from 'three';

    const COUNT = 150;

    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

        speeds[i] = 0.5 + Math.random() * 2;
        phases[i] = Math.random() * Math.PI * 2;
        sizes[i] = 0.02 + Math.random() * 0.06;
    }

    const opacities = new Float32Array(COUNT);
    let geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
    let material: THREE.ShaderMaterial;
    let elapsed = 0;

    useTask((delta: number) => {
        if (!geometry || !material) return;
        elapsed += delta;

        for (let i = 0; i < COUNT; i++) {
            opacities[i] = Math.abs(Math.sin(elapsed * speeds[i] + phases[i]));
        }

        material.uniforms.uOpacities.value = opacities;
        material.uniforms.uTime.value = elapsed;
    });

    const vertexShader = `
        uniform float uTime;
        uniform float uOpacities[${COUNT}];
        attribute float aSize;
        varying float vOpacity;

        void main() {
            vOpacity = uOpacities[gl_VertexID];
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * 300.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        varying float vOpacity;

        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float dist = length(uv);
            if (dist > 0.5) discard;

            float alpha = (1.0 - dist * 2.0) * vOpacity;
            gl_FragColor = vec4(1.0, 0.45, 0.1, alpha);
        }
    `;

    const uniforms = {
        uTime: { value: 0 },
        uOpacities: { value: opacities }
    };
</script>

<T.Points>
    <T.BufferGeometry
        oncreate={(ref) => {
            geometry = ref as THREE.BufferGeometry<THREE.NormalBufferAttributes>;
        }}
    >
        <T.BufferAttribute args={[positions, 3]} attach="attributes.position" />
        <T.BufferAttribute args={[sizes, 1]} attach="attributes.aSize" />
    </T.BufferGeometry>
    <T.ShaderMaterial
        oncreate={(ref: THREE.ShaderMaterial) => {
            material = ref;
        }}
        {vertexShader}
        {fragmentShader}
        {uniforms}
        transparent={true}
        depthWrite={false}
        blending={2}
    />
</T.Points>
