import * as THREE from 'three';

/**
 * Creates the high-resolution procedural luxury label texture for ROSEVERA MOISTURIZER
 * Features gold foil borders, Damask rose emblem, luxury serif typography, and botanical specs.
 */
export function createJarLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Luxury satin frosted translucent backing with softened vignette
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.20)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.55)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.20)');
    ctx.fillStyle = grad;
    ctx.fillRect(80, 30, 864, 452);

    // Fine gold foil perimeter border with corner filigree brackets
    ctx.strokeStyle = '#D4AF37'; // Antique gold
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 50, 824, 412);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(106, 56, 812, 400);

    // Corner decorative brackets
    const bracketSize = 16;
    const corners = [
      [100, 50],
      [924, 50],
      [100, 462],
      [924, 462],
    ];
    ctx.fillStyle = '#D4AF37';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Botanical Crest: Damask Rose Heraldry
    ctx.save();
    ctx.translate(512, 125);

    // Gold circular crest ring
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();

    // Stylized botanical rose petals in sage & rose gold
    ctx.fillStyle = '#6E8A68'; // Sage green
    ctx.beginPath();
    ctx.ellipse(0, -14, 8, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-16, -7, 7, 15, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(16, -7, 7, 15, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Center jewel bud in rose gold
    ctx.fillStyle = '#E29587';
    ctx.beginPath();
    ctx.arc(0, 4, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Brand Name: ROSEVERA
    ctx.textAlign = 'center';
    ctx.fillStyle = '#142318'; // Deepest forest emerald
    ctx.font = '600 52px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '14px';
    ctx.fillText('ROSEVERA', 512, 222);

    // Sub-brand: MOISTURIZER
    ctx.fillStyle = '#3E5443';
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('MOISTURIZER', 512, 264);

    // Gold divider ribbon with center diamond
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(380, 288);
    ctx.lineTo(495, 288);
    ctx.moveTo(529, 288);
    ctx.lineTo(644, 288);
    ctx.stroke();

    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(512, 282);
    ctx.lineTo(518, 288);
    ctx.lineTo(512, 294);
    ctx.lineTo(506, 288);
    ctx.closePath();
    ctx.fill();

    // Formulation details
    ctx.fillStyle = '#4C6150';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3.5px';
    ctx.fillText('BOTANICAL HYDRATION COMPLEX', 512, 320);

    ctx.fillStyle = '#657B69';
    ctx.font = '400 11px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('DAMASK ROSE • ALOE VERA • BIOMIMETIC LIPIDS', 512, 348);

    // Volume & Batch Info
    ctx.fillStyle = '#849B89';
    ctx.font = '500 10px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2.5px';
    ctx.fillText('50 ML / 1.7 FL. OZ. • BATCH RV-024 • COLD-PRESSED', 512, 385);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates procedural luxury top lid emblem texture
 */
export function createLidEmblemTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);

    // Outer concentric metallic rings
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(256, 256, 205, 0, Math.PI * 2);
    ctx.stroke();

    // Circular brand text around rim
    ctx.save();
    ctx.translate(256, 256);
    ctx.fillStyle = '#D4AF37';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';

    const text = 'ROSEVERA • BOTANICAL BOTANY • EST. 2024 • ';
    const chars = text.split('');
    const angleStep = (Math.PI * 2) / chars.length;

    chars.forEach((ch, i) => {
      ctx.save();
      ctx.rotate(i * angleStep - Math.PI / 2);
      ctx.fillText(ch, 0, -175);
      ctx.restore();
    });
    ctx.restore();

    // Center Damask Rose Heraldic Rosette
    ctx.save();
    ctx.translate(256, 256);
    ctx.fillStyle = '#D4AF37';
    for (let r = 0; r < 8; r++) {
      ctx.save();
      ctx.rotate((r * Math.PI) / 4);
      ctx.beginPath();
      ctx.ellipse(0, -50, 14, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // Inner center gem
    ctx.fillStyle = '#E5C158';
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural whipped cream swirl geometry with organic crests and peaks
 */
export function createCreamSwirlGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const layers = 32;
  const radialSegments = 36;

  for (let i = 0; i <= layers; i++) {
    const t = i / layers;
    // Bell curve profile that tapers to an organic crest peak
    const radius = Math.cos(t * Math.PI * 0.5) * 1.55 * (1 - t * 0.38);
    const height = Math.sin(t * Math.PI * 0.5) * 0.95;

    for (let j = 0; j <= radialSegments; j++) {
      const u = (j / radialSegments) * Math.PI * 2;
      // Natural 6-point star swirl wave
      const swirlDisplacement = Math.sin(u * 6 + t * 4.8) * 0.11 * (1 - t * 0.15);
      const microRipple = Math.cos(u * 12 + t * 3.0) * 0.025;
      const r = radius + swirlDisplacement + microRipple;
      const x = Math.cos(u) * r;
      const z = Math.sin(u) * r;
      const y = height + Math.cos(u * 6 + t * 4.8) * 0.06;
      points.push(new THREE.Vector3(x, y, z));
    }
  }

  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];

  for (let i = 0; i <= layers; i++) {
    for (let j = 0; j <= radialSegments; j++) {
      const idx = i * (radialSegments + 1) + j;
      const p = points[idx] || new THREE.Vector3();
      vertices.push(p.x, p.y, p.z);
      uvs.push(j / radialSegments, i / layers);

      if (i < layers && j < radialSegments) {
        const a = i * (radialSegments + 1) + j;
        const b = (i + 1) * (radialSegments + 1) + j;
        const c = (i + 1) * (radialSegments + 1) + (j + 1);
        const d = i * (radialSegments + 1) + (j + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates an organic curved rose petal geometry with natural edge ripple
 */
export function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-0.38, 0.45, -0.48, 0.95, -0.16, 1.25);
  shape.bezierCurveTo(0, 1.4, 0.16, 1.4, 0.16, 1.25);
  shape.bezierCurveTo(0.48, 0.95, 0.38, 0.45, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 18);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Double-cup natural curl
    const z = -Math.sin(y * 2.2) * 0.22 + Math.cos(x * 4.2) * 0.08;
    pos.setZ(i, z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates a procedural rose bloom assembly for the pedestal
 */
export function createRoseFlowerGroup(): THREE.Group {
  const group = new THREE.Group();
  const petalGeo = createPetalGeometry();
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xdf9f97,
    roughness: 0.55,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  // Layered concentric petals forming a lush blooming rose
  const ringCounts = [5, 7, 9, 11];
  const ringRadii = [0.12, 0.28, 0.48, 0.72];
  const ringScales = [0.4, 0.6, 0.82, 1.05];
  const ringPitches = [0.32, 0.55, 0.8, 1.02];

  ringCounts.forEach((count, ringIdx) => {
    const radius = ringRadii[ringIdx];
    const scale = ringScales[ringIdx];
    const pitch = ringPitches[ringIdx];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ringIdx * 0.35;
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.scale.setScalar(scale);
      petal.position.set(Math.cos(angle) * radius, 0.09 * ringIdx, Math.sin(angle) * radius);
      petal.rotation.y = -angle + Math.PI / 2;
      petal.rotation.x = pitch;
      group.add(petal);
    }
  });

  // Rose center bud
  const centerGeo = new THREE.SphereGeometry(0.18, 14, 14);
  const centerMat = new THREE.MeshStandardMaterial({
    color: 0xc4746b,
    roughness: 0.65,
  });
  const center = new THREE.Mesh(centerGeo, centerMat);
  center.position.y = 0.16;
  group.add(center);

  return group;
}

/**
 * Creates a curved aloe vera leaf geometry with ribbed back
 */
export function createAloeLeafGeometry(): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.35, 0.55, 0.12),
    new THREE.Vector3(0.85, 1.3, 0.4),
    new THREE.Vector3(1.15, 1.95, 0.75),
    new THREE.Vector3(1.25, 2.45, 1.15),
  ]);

  const shape = new THREE.Shape();
  shape.moveTo(-0.28, -0.12);
  shape.lineTo(0.28, -0.12);
  shape.lineTo(0, 0.16);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    steps: 28,
    bevelEnabled: false,
    extrudePath: curve,
  });
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates natural sculpted stone pedestal with layered bevel
 */
export function createStonePedestalGeometry(): THREE.CylinderGeometry {
  return new THREE.CylinderGeometry(2.55, 2.75, 0.52, 48);
}

/**
 * Creates the organic "Natural Twist" botanical vine branch arching behind the jar
 */
export function createNaturalTwistVine(): THREE.Group {
  const vineGroup = new THREE.Group();

  // Primary helical twisting vine curve arching gracefully behind the pedestal
  const mainVineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.6, -1.3, -0.8),
    new THREE.Vector3(-2.2, -0.4, -1.2),
    new THREE.Vector3(-1.4, 0.7, -1.4),
    new THREE.Vector3(-0.2, 1.6, -1.2),
    new THREE.Vector3(1.2, 2.3, -0.7),
    new THREE.Vector3(2.1, 2.6, 0.1),
    new THREE.Vector3(2.6, 2.1, 0.8),
  ]);

  const mainStemGeo = new THREE.TubeGeometry(mainVineCurve, 64, 0.09, 12, false);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x3d4f3b, // Organic woody forest vine
    roughness: 0.78,
    metalness: 0.08,
  });
  const mainStem = new THREE.Mesh(mainStemGeo, stemMat);
  vineGroup.add(mainStem);

  // Secondary twisting tendril curling around the main branch
  const tendrilCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.8, 0.1, -1.3),
    new THREE.Vector3(-1.2, 0.8, -1.1),
    new THREE.Vector3(-0.8, 1.4, -1.5),
    new THREE.Vector3(-0.1, 1.9, -1.0),
    new THREE.Vector3(0.6, 2.1, -1.4),
    new THREE.Vector3(1.4, 2.5, -0.9),
  ]);
  const tendrilGeo = new THREE.TubeGeometry(tendrilCurve, 48, 0.045, 8, false);
  const tendrilMat = new THREE.MeshStandardMaterial({
    color: 0x4f6b4a,
    roughness: 0.7,
    metalness: 0.05,
  });
  const tendril = new THREE.Mesh(tendrilGeo, tendrilMat);
  vineGroup.add(tendril);

  // Sprouting botanical leaves attached along the twisting vine
  const leafPoints = [
    { pos: new THREE.Vector3(-2.0, 0.2, -1.1), rot: new THREE.Euler(0.4, 0.8, -0.3), scale: 0.65 },
    { pos: new THREE.Vector3(-1.3, 0.9, -1.3), rot: new THREE.Euler(-0.3, -0.5, 0.6), scale: 0.75 },
    { pos: new THREE.Vector3(-0.4, 1.7, -1.1), rot: new THREE.Euler(0.5, 0.3, -0.4), scale: 0.85 },
    { pos: new THREE.Vector3(0.8, 2.2, -0.8), rot: new THREE.Euler(-0.2, 0.7, 0.5), scale: 0.7 },
    { pos: new THREE.Vector3(1.8, 2.5, -0.2), rot: new THREE.Euler(0.3, -0.6, -0.2), scale: 0.6 },
    { pos: new THREE.Vector3(2.4, 2.0, 0.7), rot: new THREE.Euler(0.6, 0.4, 0.7), scale: 0.55 },
  ];

  // Leaf shape with realistic pointed tip & midrib
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.22, 0.3, -0.26, 0.7, 0, 1.1);
  leafShape.bezierCurveTo(0.26, 0.7, 0.22, 0.3, 0, 0);

  const leafGeo = new THREE.ShapeGeometry(leafShape, 12);
  // Add subtle arch curvature to leaf
  const lPos = leafGeo.attributes.position;
  for (let i = 0; i < lPos.count; i++) {
    const y = lPos.getY(i);
    lPos.setZ(i, -Math.sin(y * 2.8) * 0.08);
  }
  leafGeo.computeVertexNormals();

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x486e44, // Vibrant fresh botanical green
    roughness: 0.48,
    metalness: 0.06,
    side: THREE.DoubleSide,
  });

  leafPoints.forEach((lp) => {
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.copy(lp.pos);
    leaf.rotation.copy(lp.rot);
    leaf.scale.setScalar(lp.scale);
    vineGroup.add(leaf);
  });

  // Miniature Rosebud on the vine tip
  const budGeo = new THREE.ConeGeometry(0.14, 0.32, 12);
  const budMat = new THREE.MeshStandardMaterial({
    color: 0xd98b82, // Rosebud pink
    roughness: 0.5,
    metalness: 0.04,
  });
  const bud = new THREE.Mesh(budGeo, budMat);
  bud.position.set(2.6, 2.15, 0.8);
  bud.rotation.set(0.4, 0.2, -0.8);
  vineGroup.add(bud);

  return vineGroup;
}

/**
 * Creates velvety moss rim on the stone pedestal
 */
export function createMossRimGeometry(): THREE.TorusGeometry {
  return new THREE.TorusGeometry(2.42, 0.16, 16, 48);
}
