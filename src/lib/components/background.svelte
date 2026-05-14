<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    interface Props {
        noiseUrl?: string;
        class?: string;
    }

    let { noiseUrl = '/noise.jpeg', class: className = '' }: Props = $props();

    let canvas: HTMLCanvasElement;

    const bgVert = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const bgFrag = `
        #define GLSLIFY 1
        #define PI 3.14159265359
        #define PI2 6.28318530718
        uniform float time;
        uniform float pt;
        uniform float st;
        uniform sampler2D tex;
        uniform vec2 ps;
        uniform float r;
        uniform float fc;
        uniform vec2 vc1;
        uniform vec2 vc2;
        uniform vec2 vc3;
        uniform vec4 c1;
        uniform vec4 c2;
        varying vec2 vUv;

        float rand(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        float ns(vec2 p) {
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u * u * (3.0 - 2.0 * u);
            float res = mix(
                mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
                mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
                u.y
            );
            return res * res;
        }
        float ub(vec2 p, vec2 b, float r) {
            return length(max(abs(p) - b + r, 0.0)) - r;
        }
        vec4 la(vec4 frg, vec4 bc) {
            return frg * frg.a + bc * (1.0 - frg.a);
        }
        float aastep(float threshold, float value) {
            float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
            return smoothstep(threshold - afwidth, threshold + afwidth, value);
        }
        float sw(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness, float side) {
            vec2 d = pt - center;
            float theta = time * 0.25 * side;
            vec2 p = vec2(cos(theta), -sin(theta)) * radius;
            float h = clamp(dot(d, p) / dot(p, p), 0.0, 1.0);
            float l = length(d - p * h);
            float gradient = 0.0;
            const float gradient_angle = PI * 0.25;
            if (length(d) < radius) {
                float angle = mod(theta + atan(d.y, d.x), PI2);
                gradient = clamp(gradient_angle - angle, 0.0, gradient_angle) / gradient_angle * 0.5;
            }
            return gradient + 1.0 - smoothstep(line_width, line_width + edge_thickness, l);
        }
        void main() {
            vec2 m = vUv;
            vec2 m2 = vUv;
            vec4 n = texture2D(tex, vUv);
            float z = n.r * 2.0 * PI;
            vec2 dr = vec2(sin(z));
            vec2 uv = vUv + dr * n.r * 0.1;
            float d1 = distance(uv, vc1);
            float d2 = distance(uv, vc2);
            float d3 = distance(uv, vc3);
            float gr = mix(-0.2, 0.2, rand(uv + sin(time)));
            vec2 mv = vec2(time * 0.05, time * -0.05);
            float f = ns((uv * d1 * 2.0) + mv);
            f += ns((uv * d2 * 2.5) + vec2(time * -0.075, time * 0.05));
            f += gr;
            f = smoothstep(0.0, 2.0, f);
            float mx = smoothstep(0.0, 0.1, f) - smoothstep(0.5, 1.0, f);
            vec4 color = mix(c1, c2, f);
            float nPt = min(2.0 * pt, 2.0 * (1.0 - pt));
            float u = 0.3 * sin(m.x * PI + 0.25) * nPt;
            float d = -0.3 * sin(m.x * PI + 0.25) * nPt;
            m.y -= mix(u, d, st);
            float ft = step(m.y, pt);
            vec2 rs = ps * (0.5 - vec2(fc * 0.35, fc));
            vec2 rs2 = ps * (0.5 - vec2(fc * 0.35, fc));
            float ra = r;
            vec2 yl = vUv;
            yl.y += 0.002;
            yl.x += 0.00125;
            float cr = ub(((vUv - vec2(fc * 0.35, fc * 0.75)) * ps) - rs, rs, ra);
            float cr2 = ub(((yl - vec2(fc * 0.35, fc * 0.75)) * vec2(ps.x * 0.99725, ps.y * 0.995)) - rs2, rs2, ra);
            cr = clamp(cr, 0.0, 1.0);
            cr2 = clamp(cr2, 0.0, 1.0);
            vec4 s1 = mix(color, vec4(0.0, 0.0, 0.0, 1.0), ft);
            vec3 brcl = vec3(77.0 / 255.0);
            brcl += sw(yl, vec2(0.5), 1.5, 0.00003, 0.00001, 1.0) * vec3(85.0 / 255.0);
            vec4 final = mix(s1, la(mix(vec4(brcl, 1.0), vec4(0.0), cr2), vec4(0.0, 0.0, 0.0, 1.0)), cr);
            float alpha = 1.0;
            float cut = 0.001;
            alpha *= aastep(cut, m2.x);
            alpha *= 1.0 - aastep(1.0 - cut, m2.x);
            alpha *= aastep(cut, m2.y);
            alpha *= 1.0 - aastep(1.0 - cut, m2.y);
            gl_FragColor = vec4(final.rgb, alpha);
        }
    `;

    onMount(() => {
        let W = window.innerWidth;
        let H = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H, false);
        renderer.autoClear = false;

        const dispScene = new THREE.Scene();
        const bgScene = new THREE.Scene();
        const cam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -100, 100);

        const fbo = new THREE.WebGLRenderTarget(W, H, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat
        });

        const noiseTex = new THREE.TextureLoader().load(noiseUrl);
        noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;

        const TOTAL = 100;
        const smokeGeo = new THREE.PlaneGeometry(55, 57);
        const dispM: THREE.Mesh[] = [];
        let curSmoke = 0;

        for (let i = 0; i < TOTAL; i++) {
            const m = new THREE.Mesh(
                smokeGeo,
                new THREE.MeshBasicMaterial({
                    map: noiseTex,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    depthWrite: false
                })
            );
            m.visible = false;
            dispM.push(m);
            dispScene.add(m);
        }

        function spawnSmoke(x: number, y: number, idx: number) {
            const n = dispM[idx];
            n.visible = true;
            n.scale.x = 0.15;
            n.scale.y = 0.15;
            n.rotation.x = 0;
            n.rotation.y = 0;
            n.rotation.z = Math.random() * Math.PI * 2;
            n.position.x = x - 0.9;
            n.position.y = y;
            (n.material as THREE.MeshBasicMaterial).opacity = 0.5;
        }

        const bgMat = new THREE.ShaderMaterial({
            extensions: { derivatives: true } as never,
            uniforms: {
                time: { value: 0 },
                tex: { value: null },
                pt: { value: 0 },
                st: { value: 0 },
                ps: { value: new THREE.Vector2(W, H) },
                r: { value: 0 },
                fc: { value: 0 },
                vc1: { value: new THREE.Vector2(0.5, 0.5) },
                vc2: { value: new THREE.Vector2(0, 1) },
                vc3: { value: new THREE.Vector2(1, 0) },
                c1: { value: new THREE.Vector4(0, 0, 0, 1) },
                c2: { value: new THREE.Vector4(0.3, 0.3, 0.3, 0.95) }
            },
            transparent: true,
            vertexShader: bgVert,
            fragmentShader: bgFrag
        });

        const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 30, 30), bgMat);
        bgMesh.scale.set(W, H, 1);
        bgScene.add(bgMesh);

        const mouse = new THREE.Vector2();
        const prevMouse = new THREE.Vector2();

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX - W / 2;
            mouse.y = H / 2 - e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let time = 0;
        let rafId = 0;
        let running = true;

        const tick = () => {
            if (!running) return;
            rafId = requestAnimationFrame(tick);
            time += 0.016;

            if (Math.abs(mouse.x - prevMouse.x) >= 1 || Math.abs(mouse.y - prevMouse.y) >= 1) {
                curSmoke = (curSmoke + 1) % TOTAL;
                spawnSmoke(mouse.x, mouse.y, curSmoke);
            }
            prevMouse.copy(mouse);

            for (const m of dispM) {
                if (!m.visible) continue;
                m.rotation.z += 0.02;
                const mat = m.material as THREE.MeshBasicMaterial;
                mat.opacity *= 0.96;
                if (mat.opacity < 0.002) {
                    m.visible = false;
                    continue;
                }
                m.scale.x = 0.98 * m.scale.x + 0.109;
                m.scale.y = m.scale.x;
            }

            renderer.setRenderTarget(fbo);
            renderer.clear();
            renderer.render(dispScene, cam);

            bgMat.uniforms.tex.value = fbo.texture;
            bgMat.uniforms.time.value = time;

            renderer.setRenderTarget(null);
            renderer.clear();
            renderer.render(bgScene, cam);
        };
        tick();

        const onResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            renderer.setSize(W, H, false);
            fbo.setSize(W, H);
            cam.left = -W / 2;
            cam.right = W / 2;
            cam.top = H / 2;
            cam.bottom = -H / 2;
            cam.updateProjectionMatrix();
            bgMesh.scale.set(W, H, 1);
            bgMat.uniforms.ps.value.set(W, H);
        };
        window.addEventListener('resize', onResize);

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);

            for (const m of dispM) {
                (m.material as THREE.MeshBasicMaterial).dispose();
            }
            smokeGeo.dispose();
            bgMesh.geometry.dispose();
            bgMat.dispose();
            noiseTex.dispose();
            fbo.dispose();
            renderer.dispose();
        };
    });
</script>

<canvas
    bind:this={canvas}
    class={['pointer-events-none fixed inset-0 z-0 h-full w-full', className]}
></canvas>
