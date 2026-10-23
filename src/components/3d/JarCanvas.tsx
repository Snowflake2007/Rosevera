import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createJarLabelTexture,
  createLidEmblemTexture,
  createCreamSwirlGeometry,
  createPetalGeometry,
  createRoseFlowerGroup,
  createAloeLeafGeometry,
  createStonePedestalGeometry,
  createNaturalTwistVine,
  createMossRimGeometry,
} from './proceduralModels';

interface JarCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  manualExplodeOverride: number | null; // 0.0 to 1.0 or null
  activeFinish: 'sage' | 'rose' | 'ivory';
  reducedMotion: boolean;
  autoRotate: boolean;
  cameraPreset?: 'hero' | 'ingredients' | 'exploded' | 'formulation' | 'reassembly';
  activeIngredient?: string | null;
  onInteractionStart?: () => void;
}

export const JarCanvas: React.FC<JarCanvasProps> = ({
  scrollProgress,
  manualExplodeOverride,
  activeFinish,
  reducedMotion,
  autoRotate,
  cameraPreset = 'hero',
  activeIngredient = null,
  onInteractionStart
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({
    scrollProgress,
    manualExplodeOverride,
    activeFinish,
    reducedMotion,
    autoRotate,
    cameraPreset,
    activeIngredient,
    onInteractionStart
  });

  useEffect(() => {
    propsRef.current = {
      scrollProgress,
      manualExplodeOverride,
      activeFinish,
      reducedMotion,
      autoRotate,
      cameraPreset,
      activeIngredient,
      onInteractionStart
    };
  }, [scrollProgress, manualExplodeOverride, activeFinish, reducedMotion, autoRotate, cameraPreset, activeIngredient, onInteractionStart]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL for performance optimization
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
      depth: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Three.js Scene
    const scene = new THREE.Scene();

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Camera: Positioned to provide elegant luxury framing
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 10.5);

    // Balanced Cinematic Lighting Rig with Dark Neon Emerald & Rose Atmosphere
    const ambientLight = new THREE.HemisphereLight(0x28382c, 0x080e0a, 1.5);
    scene.add(ambientLight);

    // Primary warm sunlight beam (key light)
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.0);
    keyLight.position.set(5.2, 7.5, 5.2);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Neon Emerald Rim Light (riy3.com inspiration)
    const rimLight = new THREE.DirectionalLight(0x00e599, 2.6);
    rimLight.position.set(-5.5, 4.2, -4.5);
    scene.add(rimLight);

    // Luminescent Damask Rose Accent Fill
    const roseFill = new THREE.DirectionalLight(0xff758f, 1.6);
    roseFill.position.set(2.4, -1.8, 4.2);
    scene.add(roseFill);

    // Subtle Gold Warmth Accent (bottom bounce)
    const goldBounce = new THREE.PointLight(0xffd166, 1.2, 10);
    goldBounce.position.set(0, -1.5, 2.5);
    scene.add(goldBounce);

    // Product Assembly Root Group
    const productRoot = new THREE.Group();
    productRoot.scale.setScalar(0.78);
    const isMobile = width < 768;
    const baseOffsetX = isMobile ? 0 : 2.05;
    productRoot.position.set(baseOffsetX, -0.2, 0);
    scene.add(productRoot);

    // ==========================================
    // 1. NATURAL PEDESTAL: Sculpted Slate & Moss
    // ==========================================
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.35, 0);
    productRoot.add(pedestalGroup);

    const stoneGeo = createStonePedestalGeometry();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x1f2b22, // Rich dark forest slate
      roughness: 0.88,
      metalness: 0.12,
    });
    const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
    stoneMesh.receiveShadow = !isSoftwareGl;
    pedestalGroup.add(stoneMesh);

    // Velvet moss perimeter crest
    const mossGeo = createMossRimGeometry();
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x2e4a29, // Deep botanical moss
      roughness: 0.95,
      metalness: 0.04,
    });
    const mossMesh = new THREE.Mesh(mossGeo, mossMat);
    mossMesh.rotation.x = Math.PI / 2;
    mossMesh.position.y = 0.22;
    pedestalGroup.add(mossMesh);

    // Contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(7.0, 7.0);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
      grad.addColorStop(0.45, 'rgba(0, 229, 153, 0.10)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.28, 0);
    pedestalGroup.add(shadowMesh);

    // ==========================================
    // 2. NATURAL TWIST BACKGROUND: Twisting Vine & Foliage
    // ==========================================
    const naturalTwistGroup = new THREE.Group();
    naturalTwistGroup.position.set(0, 0, -0.2);
    productRoot.add(naturalTwistGroup);

    // The signature natural twisting vine branch arching behind the jar
    const twistVine = createNaturalTwistVine();
    twistVine.scale.setScalar(1.05);
    naturalTwistGroup.add(twistVine);

    // Lush Damask Rose Bloom resting beside jar on pedestal
    const roseFlower = createRoseFlowerGroup();
    roseFlower.scale.setScalar(1.22);
    roseFlower.position.set(-1.85, -1.0, 0.9);
    roseFlower.rotation.set(0.2, 0.5, -0.15);
    naturalTwistGroup.add(roseFlower);

    // Curving Aloe Vera Leaves
    const aloeGeo = createAloeLeafGeometry();
    const aloeMat = new THREE.MeshStandardMaterial({
      color: 0x557a50,
      roughness: 0.5,
      metalness: 0.05,
    });
    const aloe1 = new THREE.Mesh(aloeGeo, aloeMat);
    aloe1.scale.set(0.72, 0.72, 0.72);
    aloe1.position.set(-2.25, -1.25, 0.2);
    aloe1.rotation.set(0.3, 0.8, -0.4);
    naturalTwistGroup.add(aloe1);

    const aloe2 = new THREE.Mesh(aloeGeo, aloeMat);
    aloe2.scale.set(0.58, 0.58, 0.58);
    aloe2.position.set(1.95, -1.2, 0.6);
    aloe2.rotation.set(-0.2, -0.9, 0.5);
    naturalTwistGroup.add(aloe2);

    // Twisting Helical Swirl of Floating Rose Petals
    const petalGeo = createPetalGeometry();
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xdca49c,
      roughness: 0.6,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const petals: THREE.Mesh[] = [];
    const petalInitialPositions = [
      new THREE.Vector3(-2.0, 0.7, 1.2),
      new THREE.Vector3(2.2, 1.4, 0.9),
      new THREE.Vector3(-1.6, 2.3, -0.7),
      new THREE.Vector3(1.8, 0.1, 1.5),
      new THREE.Vector3(-0.7, 2.9, 1.1),
      new THREE.Vector3(2.3, -0.5, 0.5),
      new THREE.Vector3(-2.4, 1.8, 0.2),
      new THREE.Vector3(0.9, 3.2, -0.5),
    ];

    petalInitialPositions.forEach((pos, idx) => {
      const petal = new THREE.Mesh(petalGeo, petalMat.clone());
      petal.position.copy(pos);
      petal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      petal.scale.setScalar(0.7 + (idx % 3) * 0.2);
      naturalTwistGroup.add(petal);
      petals.push(petal);
    });

    // Crystalline Pure Dew Droplets
    const dropletGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.94,
      transparent: true,
      opacity: isSoftwareGl ? 0.65 : 0.95,
      roughness: 0.04,
      ior: 1.33,
      thickness: 0.5,
    });
    const droplets: THREE.Mesh[] = [];
    const dropletOffsets = [
      new THREE.Vector3(-1.4, 1.2, 1.4),
      new THREE.Vector3(1.35, 1.95, 1.2),
      new THREE.Vector3(0.5, 2.7, 0.8),
      new THREE.Vector3(-1.0, 2.5, -0.5),
      new THREE.Vector3(1.9, 0.8, -0.8),
      new THREE.Vector3(-1.8, -0.1, 1.1),
    ];
    dropletOffsets.forEach((pos) => {
      const drop = new THREE.Mesh(dropletGeo, dropletMat);
      drop.position.copy(pos);
      naturalTwistGroup.add(drop);
      droplets.push(drop);
    });

    // Floating Luminescent Pollen / Spore Particles
    const pollenCount = 36;
    const pollenGeo = new THREE.BufferGeometry();
    const pollenPositions = new Float32Array(pollenCount * 3);
    const pollenOffsets = new Float32Array(pollenCount * 3);
    for (let i = 0; i < pollenCount; i++) {
      const r = 1.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.2 + Math.random() * 4.5;
      pollenPositions[i * 3] = Math.cos(theta) * r;
      pollenPositions[i * 3 + 1] = y;
      pollenPositions[i * 3 + 2] = Math.sin(theta) * r;

      pollenOffsets[i * 3] = Math.random() * Math.PI * 2;
      pollenOffsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      pollenOffsets[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPositions, 3));
    const pollenMat = new THREE.PointsMaterial({
      color: 0x00e599,
      size: 0.065,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const pollenPoints = new THREE.Points(pollenGeo, pollenMat);
    naturalTwistGroup.add(pollenPoints);

    // ==========================================
    // 3. EXPLODED SUB-GROUPS: Luxury Cosmetic Jar
    // ==========================================
    const jarBodyGroup = new THREE.Group();
    const creamGroup = new THREE.Group();
    const sealGroup = new THREE.Group();
    const lidGroup = new THREE.Group();

    productRoot.add(jarBodyGroup);
    productRoot.add(creamGroup);
    productRoot.add(sealGroup);
    productRoot.add(lidGroup);

    // --- JAR BODY ASSEMBLY (Heavy Double-Walled Cosmetic Glass) ---
    // Outer Frosted Glass Container with subtle filleted chamfer
    const jarOuterGeo = new THREE.CylinderGeometry(1.78, 1.72, 1.88, 54, 1, false);
    const jarGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfdfbf7,
      roughness: 0.12,
      metalness: 0.04,
      transmission: isSoftwareGl ? 0 : 0.90,
      transparent: true,
      opacity: isSoftwareGl ? 0.72 : 0.92,
      ior: 1.52, // High-grade cosmetic borosilicate glass
      reflectivity: 0.55,
      thickness: 1.65, // Authentic heavy cosmetic glass wall
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      attenuationColor: new THREE.Color(0xfbf7ee),
      attenuationDistance: 2.2,
      depthWrite: false,
    });
    const jarOuterMesh = new THREE.Mesh(jarOuterGeo, jarGlassMat);
    jarOuterMesh.castShadow = !isSoftwareGl;
    jarOuterMesh.receiveShadow = !isSoftwareGl;
    jarBodyGroup.add(jarOuterMesh);

    // Heavy solid crystal base disc (defining luxury weight in cosmetic jars)
    const heavyBaseGeo = new THREE.CylinderGeometry(1.70, 1.66, 0.40, 48);
    const heavyBaseMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f5,
      roughness: 0.08,
      metalness: 0.02,
      transmission: isSoftwareGl ? 0 : 0.94,
      transparent: true,
      opacity: isSoftwareGl ? 0.8 : 0.96,
      ior: 1.54,
      thickness: 2.0,
      depthWrite: false,
    });
    const heavyBaseMesh = new THREE.Mesh(heavyBaseGeo, heavyBaseMat);
    heavyBaseMesh.position.y = -0.72;
    jarBodyGroup.add(heavyBaseMesh);

    // Inner Cream Bulk Reservoir (suspended cleanly within the glass)
    const innerBulkGeo = new THREE.CylinderGeometry(1.56, 1.50, 1.52, 40);
    const innerBulkMat = new THREE.MeshStandardMaterial({
      color: 0xfbf6ec, // Rich, velvety botanical butter
      roughness: 0.35,
      metalness: 0.02,
    });
    const innerBulkMesh = new THREE.Mesh(innerBulkGeo, innerBulkMat);
    innerBulkMesh.position.y = -0.04;
    jarBodyGroup.add(innerBulkMesh);

    // Brushed Champagne/Gold Neck Collar
    const collarGeo = new THREE.CylinderGeometry(1.68, 1.74, 0.22, 48);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xd9c6a0, // Champagne gold
      metalness: 0.92,
      roughness: 0.18,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 1.0;
    jarBodyGroup.add(collarMesh);

    // High-Resolution Procedural Brand Label
    const labelTex = createJarLabelTexture();
    labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const labelGeo = new THREE.CylinderGeometry(
      1.79,
      1.73,
      1.28,
      48,
      1,
      true,
      -Math.PI * 0.38,
      Math.PI * 0.76
    );
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = 0.06;
    labelMesh.rotation.y = Math.PI * 0.45; // Front-facing
    jarBodyGroup.add(labelMesh);

    // --- CREAM SWIRL ASSEMBLY ---
    const swirlGeo = createCreamSwirlGeometry();
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf6,
      roughness: 0.22,
      metalness: 0.03,
    });
    const swirlMesh = new THREE.Mesh(swirlGeo, creamMat);
    swirlMesh.position.y = 0.65;
    creamGroup.add(swirlMesh);

    // --- INNER SEAL HYGIENE MEMBRANE WITH PULL-TAB ---
    const sealDiscGeo = new THREE.CylinderGeometry(1.68, 1.68, 0.04, 48);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05,
      transparent: true,
      opacity: 0.94,
    });
    const sealDiscMesh = new THREE.Mesh(sealDiscGeo, sealMat);
    sealGroup.add(sealDiscMesh);

    const tabShape = new THREE.Shape();
    tabShape.moveTo(0, 0);
    tabShape.bezierCurveTo(0.12, 0.28, 0.38, 0.28, 0.48, 0);
    const tabGeo = new THREE.ShapeGeometry(tabShape);
    const tabMesh = new THREE.Mesh(tabGeo, sealMat);
    tabMesh.rotation.x = -Math.PI / 2;
    tabMesh.position.set(1.45, 0.02, 0);
    sealGroup.add(tabMesh);
    sealGroup.position.y = 0.98;

    // --- MULTI-TIERED LUXURY LID ASSEMBLY ---
    const finishColors = {
      sage: 0x7e9175,
      rose: 0xd9a7a0,
      ivory: 0xf4efe6,
    };

    const lidTopGeo = new THREE.CylinderGeometry(1.82, 1.82, 0.62, 48);
    const lidMat = new THREE.MeshStandardMaterial({
      color: finishColors[propsRef.current.activeFinish],
      metalness: 0.65,
      roughness: 0.28,
    });
    const lidMesh = new THREE.Mesh(lidTopGeo, lidMat);
    lidMesh.castShadow = !isSoftwareGl;
    lidGroup.add(lidMesh);

    // Polished Champagne-Gold Rim Band at base of lid
    const lidTrimGeo = new THREE.CylinderGeometry(1.835, 1.835, 0.09, 48);
    const lidTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd9c6a0,
      metalness: 0.94,
      roughness: 0.15,
    });
    const lidTrimMesh = new THREE.Mesh(lidTrimGeo, lidTrimMat);
    lidTrimMesh.position.y = -0.28;
    lidGroup.add(lidTrimMesh);

    // Gold Beveled Top Lip Rim
    const topLipGeo = new THREE.TorusGeometry(1.78, 0.04, 16, 48);
    const topLipMesh = new THREE.Mesh(topLipGeo, lidTrimMat);
    topLipMesh.rotation.x = Math.PI / 2;
    topLipMesh.position.y = 0.31;
    lidGroup.add(topLipMesh);

    // Embossed Top Emblem Circular Seal
    const lidEmblemTex = createLidEmblemTexture();
    lidEmblemTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const emblemGeo = new THREE.CircleGeometry(1.68, 36);
    const emblemMat = new THREE.MeshBasicMaterial({
      map: lidEmblemTex,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.rotation.x = -Math.PI / 2;
    emblemMesh.position.y = 0.315;
    lidGroup.add(emblemMesh);

    lidGroup.position.y = 1.35;

    // --- INTERACTIVE DRAG & ORBIT HANDLERS ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let userRotationY = 0;
    let userRotationX = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      propsRef.current.onInteractionStart?.();
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        userRotationY += deltaX * 0.008;
        userRotationX = Math.max(-0.5, Math.min(0.6, userRotationX + deltaY * 0.008));
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else if (!('touches' in e)) {
        const normX = (clientX / window.innerWidth) * 2 - 1;
        const normY = -(clientY / window.innerHeight) * 2 + 1;
        mouseParallaxX = normX * 0.12;
        mouseParallaxY = normY * 0.08;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvasDom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // --- ANIMATION & RENDER LOOP ---
    let frameId = 0;
    const clock = new THREE.Clock();

    let currentExplodeFactor = 0;
    let currentJarY = 0;
    let currentLidY = 1.35;
    let currentSealY = 0.98;
    let currentSwirlY = 0.65;
    let currentRotY = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      const props = propsRef.current;

      // Update finish color
      const targetFinishColor = finishColors[props.activeFinish];
      if (lidMat.color.getHex() !== targetFinishColor) {
        lidMat.color.setHex(targetFinishColor);
      }

      // Calculate Target Explode Factor
      let targetExplode = 0;
      if (props.manualExplodeOverride !== null) {
        targetExplode = props.manualExplodeOverride;
      } else {
        const p = props.scrollProgress;
        if (p >= 0.35 && p <= 0.55) {
          targetExplode = (p - 0.35) / 0.20;
        } else if (p > 0.55 && p < 0.85) {
          targetExplode = 0.3 * (1 - (p - 0.55) / 0.30);
        } else if (p >= 0.85) {
          targetExplode = 0;
        }
      }

      const dampSpeed = props.reducedMotion ? 12 : 6;
      currentExplodeFactor = THREE.MathUtils.damp(
        currentExplodeFactor,
        targetExplode,
        dampSpeed,
        delta
      );

      // Positions under explosion
      // Lid rises by up to +3.6 units
      const targetLidY = 1.35 + currentExplodeFactor * 3.6;
      currentLidY = THREE.MathUtils.damp(currentLidY, targetLidY, 8, delta);
      lidGroup.position.y = currentLidY;
      lidGroup.rotation.x = currentExplodeFactor * 0.16;
      lidGroup.rotation.z = Math.sin(time * 0.8) * 0.04 * currentExplodeFactor;

      // Seal rises by up to +2.1 units
      const targetSealY = 0.98 + currentExplodeFactor * 2.1;
      currentSealY = THREE.MathUtils.damp(currentSealY, targetSealY, 8, delta);
      sealGroup.position.y = currentSealY;
      sealGroup.rotation.y = currentExplodeFactor * 0.35;

      // Cream swirl rises by up to +1.05 units
      const targetSwirlY = 0.65 + currentExplodeFactor * 1.05;
      currentSwirlY = THREE.MathUtils.damp(currentSwirlY, targetSwirlY, 8, delta);
      creamGroup.position.y = currentSwirlY;

      // Jar body moves down slightly (-0.55)
      const targetJarY = -currentExplodeFactor * 0.55;
      currentJarY = THREE.MathUtils.damp(currentJarY, targetJarY, 8, delta);
      jarBodyGroup.position.y = currentJarY;

      pedestalGroup.position.y = -1.35 + currentJarY;

      // Natural Twist Vine Gentle Swaying
      twistVine.rotation.z = Math.sin(time * 0.7) * 0.035;
      twistVine.rotation.x = Math.cos(time * 0.5) * 0.02;

      // Botanical dispersal during explosion
      const petalDisp = currentExplodeFactor * 1.6;
      petals.forEach((p, idx) => {
        const orig = petalInitialPositions[idx];
        const dir = orig.clone().normalize();
        p.position.set(
          orig.x + dir.x * petalDisp,
          orig.y + (idx % 2 === 0 ? petalDisp * 0.65 : -petalDisp * 0.28) + Math.sin(time * 1.2 + idx) * 0.08,
          orig.z + dir.z * petalDisp
        );
        p.rotation.y += (0.007 + idx * 0.002) * (props.reducedMotion ? 0 : 1);
        p.rotation.x = Math.sin(time + idx) * 0.18;
      });

      droplets.forEach((d, idx) => {
        const orig = dropletOffsets[idx];
        d.position.y = orig.y + Math.sin(time * 1.5 + idx) * 0.1 + currentExplodeFactor * 0.75;
      });

      // Pollen particle floating motion
      const pAttr = pollenGeo.attributes.position;
      const pPos = pAttr.array as Float32Array;
      for (let i = 0; i < pollenCount; i++) {
        const offY = Math.sin(time * 0.8 + pollenOffsets[i * 3 + 1]) * 0.004;
        const offX = Math.cos(time * 0.6 + pollenOffsets[i * 3]) * 0.003;
        pPos[i * 3] += offX;
        pPos[i * 3 + 1] += offY;
        // Wrap vertically
        if (pPos[i * 3 + 1] > 3.5) pPos[i * 3 + 1] = -1.2;
        if (pPos[i * 3 + 1] < -1.2) pPos[i * 3 + 1] = 3.5;
      }
      pAttr.needsUpdate = true;

      // Interactive botanical response to hovered/selected ingredient
      const isAloeActive = props.activeIngredient === 'aloe-vera';
      const isRoseActive = props.activeIngredient === 'rose-water';
      const isWaterActive = props.activeIngredient === 'distilled-water' || props.activeIngredient === 'glycerin';

      // Aloe leaf reaction
      const targetAloeScale = isAloeActive ? 0.86 : 0.72;
      aloe1.scale.setScalar(THREE.MathUtils.damp(aloe1.scale.x, targetAloeScale, 6, delta));
      aloe1.position.y = THREE.MathUtils.damp(aloe1.position.y, isAloeActive ? -1.1 : -1.25, 6, delta);

      // Rose bloom reaction
      const targetRoseScale = isRoseActive ? 1.48 : 1.22;
      roseFlower.scale.setScalar(THREE.MathUtils.damp(roseFlower.scale.x, targetRoseScale, 6, delta));
      roseFlower.rotation.z = -0.15 + Math.sin(time * (isRoseActive ? 1.8 : 0.6)) * (isRoseActive ? 0.08 : 0.03);

      // Water droplets reaction
      const targetDropletScale = isWaterActive ? 1.35 : 1.0;
      droplets.forEach((d) => {
        d.scale.setScalar(THREE.MathUtils.damp(d.scale.x, targetDropletScale, 6, delta));
      });

      // Product Rotation
      let targetRotY = userRotationY;
      if (props.autoRotate && !isDragging) {
        targetRotY += time * 0.12;
      }
      // Add subtle scroll-driven rotation
      targetRotY += props.scrollProgress * Math.PI * 1.5;

      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 6, delta);
      productRoot.rotation.y = currentRotY;
      productRoot.rotation.x = THREE.MathUtils.damp(
        productRoot.rotation.x,
        userRotationX + mouseParallaxY,
        6,
        delta
      );

      // Camera preset
      let targetCamX = mouseParallaxX;
      let targetCamY = 0.8 + mouseParallaxY;
      let targetCamZ = 10.5;

      if (props.cameraPreset === 'ingredients' || (props.scrollProgress > 0.15 && props.scrollProgress < 0.35)) {
        targetCamX = 0;
        targetCamY = 0.8;
        targetCamZ = 10.2;
      } else if (props.cameraPreset === 'exploded' || (props.scrollProgress >= 0.35 && props.scrollProgress <= 0.55)) {
        targetCamX = 0;
        targetCamY = 1.0;
        targetCamZ = 11.2;
      } else if (props.cameraPreset === 'formulation' || (props.scrollProgress > 0.55 && props.scrollProgress < 0.70)) {
        targetCamX = 0.2;
        targetCamY = 2.4;
        targetCamZ = 10.0;
      } else if (props.scrollProgress >= 0.85) {
        targetCamX = 0;
        targetCamY = 0.6;
        targetCamZ = 9.8;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5, delta);
      camera.lookAt(productRoot.position.x * 0.5, currentExplodeFactor * 0.4, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Mobile vs desktop positioning
      const mobile = w < 768;
      productRoot.position.x = mobile ? 0 : 1.75;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvasDom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      labelTex.dispose();
      lidEmblemTex.dispose();
      shadowTex.dispose();
      stoneGeo.dispose();
      mossGeo.dispose();
      jarOuterGeo.dispose();
      heavyBaseGeo.dispose();
      innerBulkGeo.dispose();
      collarGeo.dispose();
      labelGeo.dispose();
      swirlGeo.dispose();
      sealDiscGeo.dispose();
      tabGeo.dispose();
      lidTopGeo.dispose();
      lidTrimGeo.dispose();
      topLipGeo.dispose();
      emblemGeo.dispose();
      petalGeo.dispose();
      aloeGeo.dispose();
      dropletGeo.dispose();
      pollenGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none">
      <div
        ref={mountRef}
        data-testid="threejs-canvas-container"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
