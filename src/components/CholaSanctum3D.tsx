import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, EyeOff, RotateCw, Sparkles, Layers, Shield } from 'lucide-react';

interface CholaSanctum3DProps {
  onExploreMenu?: () => void;
}

type ArtifactType = 'vimana' | 'coin' | 'deepam';
type MaterialType = 'granite' | 'bronze' | 'gold';

export default function CholaSanctum3D({ onExploreMenu }: CholaSanctum3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactType>('vimana');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('gold');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // References for render loop and interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const artifactGroupRef = useRef<THREE.Group | null>(null);
  const vimanaGroupRef = useRef<THREE.Group | null>(null);
  const coinGroupRef = useRef<THREE.Group | null>(null);
  const deepamGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<Record<MaterialType, THREE.Material>>({} as any);

  const autoRotateRef = useRef<boolean>(autoRotate);
  autoRotateRef.current = autoRotate;

  const selectedArtifactRef = useRef<ArtifactType>(selectedArtifact);
  selectedArtifactRef.current = selectedArtifact;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Scene, Camera, Renderer
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0c0b09, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.8);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambient = new THREE.AmbientLight(0xfff3db, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const floorGlow = new THREE.PointLight(0xffaa33, 1.2, 10);
    floorGlow.position.set(0, 0.3, 0);
    scene.add(floorGlow);

    // 5. Materials definitions
    // Granite: dark carved Thanjavur temple stone
    const graniteMaterial = new THREE.MeshStandardMaterial({
      color: 0x22201d,
      roughness: 0.85,
      metalness: 0.1,
    });

    // Antique Royal Bronze: lost-wax casting patina
    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a5823,
      roughness: 0.38,
      metalness: 0.82,
    });

    // Imperial Gold Leaf: 24k temple finial gilding
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6b83b,
      roughness: 0.22,
      metalness: 0.92,
    });

    materialsRef.current = {
      granite: graniteMaterial,
      bronze: bronzeMaterial,
      gold: goldMaterial,
    };

    // 6. Base pedestal & Contact shadow
    const pedestalGroup = new THREE.Group();
    const basePlate = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.7, 0.25, 32),
      graniteMaterial
    );
    basePlate.position.y = -0.125;
    basePlate.receiveShadow = !isSoftwareGl;
    pedestalGroup.add(basePlate);

    // Decorative stepped ring
    const midRing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.3, 0.15, 32),
      bronzeMaterial
    );
    midRing.position.y = 0.05;
    pedestalGroup.add(midRing);

    // Subtle contact shadow disk
    const shadowGeo = new THREE.CircleGeometry(2.8, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.24;
    pedestalGroup.add(shadowPlane);
    scene.add(pedestalGroup);

    // 7. Master Artifact Container
    const artifactRoot = new THREE.Group();
    artifactGroupRef.current = artifactRoot;
    scene.add(artifactRoot);

    // Artifact A: Brihadeeswarar Vimana & Sacred Kalasam
    const vimanaGroup = new THREE.Group();
    vimanaGroupRef.current = vimanaGroup;

    // Stepped tiers of the Vimana tower
    const tiersCount = 7;
    for (let i = 0; i < tiersCount; i++) {
      const scale = 1 - i * 0.1;
      const tierHeight = 0.22;
      const tierWidth = 1.6 * scale;
      const tier = new THREE.Mesh(
        new THREE.BoxGeometry(tierWidth, tierHeight, tierWidth),
        materialsRef.current[selectedMaterial]
      );
      tier.position.y = 0.15 + i * 0.24;
      tier.castShadow = !isSoftwareGl;
      tier.receiveShadow = !isSoftwareGl;
      vimanaGroup.add(tier);

      // Lotus petal molding on each tier
      const trim = new THREE.Mesh(
        new THREE.CylinderGeometry(tierWidth * 0.65, tierWidth * 0.72, 0.06, 16),
        materialsRef.current.bronze
      );
      trim.position.y = 0.15 + i * 0.24 + 0.1;
      vimanaGroup.add(trim);
    }

    // Octagonal Shikhara dome
    const griva = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.65, 0.35, 8),
      materialsRef.current[selectedMaterial]
    );
    griva.position.y = 1.95;
    vimanaGroup.add(griva);

    // Grand Bulbous Kumbam Dome
    const kumbam = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 24, 16),
      materialsRef.current[selectedMaterial]
    );
    kumbam.position.y = 2.45;
    kumbam.scale.set(1.1, 0.85, 1.1);
    kumbam.castShadow = !isSoftwareGl;
    vimanaGroup.add(kumbam);

    // Summit Golden Kalasam (Finial Stupika)
    const stupikaBase = new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 0.55, 16),
      materialsRef.current.gold
    );
    stupikaBase.position.y = 3.0;
    vimanaGroup.add(stupikaBase);

    const stupikaSpire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.12, 0.6, 12),
      materialsRef.current.gold
    );
    stupikaSpire.position.y = 3.4;
    vimanaGroup.add(stupikaSpire);

    artifactRoot.add(vimanaGroup);

    // Artifact B: Imperial Chola Royal Coin (Kasu)
    const coinGroup = new THREE.Group();
    coinGroupRef.current = coinGroup;
    coinGroup.visible = false;

    const coinCore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.14, 48),
      materialsRef.current.bronze
    );
    coinCore.rotation.x = Math.PI / 2;
    coinCore.position.y = 1.4;
    coinCore.castShadow = !isSoftwareGl;
    coinGroup.add(coinCore);

    // Raised outer beaded rim
    const rimTorus = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.08, 16, 48),
      materialsRef.current.gold
    );
    rimTorus.position.y = 1.4;
    coinGroup.add(rimTorus);

    // Emblem in relief (Tiger & Bow & Twin Fish Chola-Pandya seal)
    const tigerCrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.7, 0.18),
      materialsRef.current.gold
    );
    tigerCrest.position.set(0, 1.4, 0.04);
    coinGroup.add(tigerCrest);

    artifactRoot.add(coinGroup);

    // Artifact C: Sacred Temple Deepam (Kuthu Vilakku)
    const deepamGroup = new THREE.Group();
    deepamGroupRef.current = deepamGroup;
    deepamGroup.visible = false;

    const deepamPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.22, 2.2, 20),
      materialsRef.current.gold
    );
    deepamPillar.position.y = 1.1;
    deepamPillar.castShadow = !isSoftwareGl;
    deepamGroup.add(deepamPillar);

    const oilReservoir = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 0.3, 0.35, 24),
      materialsRef.current.gold
    );
    oilReservoir.position.y = 2.15;
    deepamGroup.add(oilReservoir);

    // Flame holder & flame glow
    const flameGeo = new THREE.ConeGeometry(0.12, 0.38, 12);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 2.5;
    deepamGroup.add(flame);

    const flameGlow = new THREE.PointLight(0xff7700, 2.5, 6);
    flameGlow.position.y = 2.6;
    deepamGroup.add(flameGlow);

    artifactRoot.add(deepamGroup);

    // 8. Sacred Floating Amber Particle Dust
    const particleCount = isSoftwareGl ? 30 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      positions[p] = (Math.random() - 0.5) * 6;
      positions[p + 1] = Math.random() * 4.5;
      positions[p + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe6b83b,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 9. Interactive Pointer Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !artifactRoot) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      artifactRoot.rotation.y += deltaX * 0.008;
      artifactRoot.rotation.x = Math.max(-0.25, Math.min(0.4, artifactRoot.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 10. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Tick (Adhering to Three.js skill softwareGl afterDraw)
    let frameId = 0;
    let lastTime = performance.now();
    let totalElapsed = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function animate() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalElapsed += delta;

      // Auto rotation when enabled and not dragging
      if (autoRotateRef.current && !isDragging && artifactRoot) {
        artifactRoot.rotation.y += delta * 0.45;
      }

      // Gentle flame flicker on deepam
      if (flame) {
        flame.scale.y = 1.0 + Math.sin(totalElapsed * 9) * 0.15;
      }

      // Floating particles ascent
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < posArr.length; i += 3) {
        posArr[i] += delta * 0.25;
        if (posArr[i] > 4.5) posArr[i] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update visibility when selected artifact changes
  useEffect(() => {
    if (vimanaGroupRef.current) vimanaGroupRef.current.visible = selectedArtifact === 'vimana';
    if (coinGroupRef.current) coinGroupRef.current.visible = selectedArtifact === 'coin';
    if (deepamGroupRef.current) deepamGroupRef.current.visible = selectedArtifact === 'deepam';
  }, [selectedArtifact]);

  // Update materials when selected material changes
  useEffect(() => {
    const mat = materialsRef.current[selectedMaterial];
    if (!mat) return;

    if (vimanaGroupRef.current) {
      vimanaGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
          child.material = mat;
        }
      });
    }
    if (coinGroupRef.current) {
      coinGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
          child.material = mat;
        }
      });
    }
    if (deepamGroupRef.current) {
      deepamGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
          child.material = mat;
        }
      });
    }
  }, [selectedMaterial]);

  const resetCamera = () => {
    if (artifactGroupRef.current) {
      artifactGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <section id="sanctum-3d" className="relative w-full py-20 bg-[#0d0c0a] border-y border-[#d4af37]/20 overflow-hidden">
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Interactive Royal Artifact Sanctum
        </span>
        <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] mt-2 font-medium tracking-wide">
          Treasures of Thanjavur in 3D
        </h2>
        <p className="text-sm md:text-base text-[#a39e93] font-body max-w-2xl mx-auto mt-3">
          Explore the architectural majesty of the Brihadeeswarar Vimana, royal imperial coinage, and temple lamps that illuminated the Chola banquets. Drag to rotate 360°.
        </p>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative max-w-5xl mx-auto h-[520px] md:h-[600px] rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#14120e] via-[#0d0c0a] to-[#070605] shadow-2xl overflow-hidden">
        {/* Isolated WebGL Mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Ambient Top Specification Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-[#0d0c0a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#d4af37]/30">
          <Shield className="w-4 h-4 text-[#d4af37]" />
          <div className="text-xs font-cinzel text-[#e8e4dc]">
            <span className="text-[#d4af37] font-semibold">
              {selectedArtifact === 'vimana' && 'Granite Vimana & Kumbam Finial (1010 CE)'}
              {selectedArtifact === 'coin' && 'Rajaraja Chola Imperial Kasu (985 CE)'}
              {selectedArtifact === 'deepam' && 'Thanjavur Brass Deepam Vilakku'}
            </span>
          </div>
        </div>

        {/* Collapsible Bottom Control Dock (Strictly following Three.js guidelines) */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl transition-all duration-300 ease-out ${
            isCollapsed ? 'translate-y-[calc(100%-2rem)]' : 'translate-y-0'
          }`}
        >
          {/* Collapse/Expand Tab */}
          <div className="flex justify-center mb-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1.5 px-4 py-1 text-xs font-cinzel text-[#d4af37] bg-[#14120e] hover:bg-[#1f1c16] rounded-t-lg border-t border-x border-[#d4af37]/30 transition-colors cursor-pointer"
              aria-label={isCollapsed ? 'Expand 3D Controls' : 'Collapse 3D Controls'}
            >
              {isCollapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isCollapsed ? 'Show 3D Controls' : 'Collapse Controls'}</span>
            </button>
          </div>

          {/* Unified Bottom Control Dock */}
          <div className="bg-[#14120e]/95 backdrop-blur-md p-4 rounded-2xl border border-[#d4af37]/40 shadow-2xl space-y-3">
            {/* Artifact Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2b271f] pb-3">
              <span className="text-xs uppercase tracking-wider text-[#8f887b] font-cinzel">Artifact</span>
              <div className="flex items-center gap-1.5 p-1 bg-[#090807] rounded-lg border border-[#2b271f]">
                <button
                  onClick={() => setSelectedArtifact('vimana')}
                  className={`px-3 py-1.5 text-xs font-cinzel rounded-md transition-colors ${
                    selectedArtifact === 'vimana'
                      ? 'bg-[#d4af37] text-[#0d0c0a] font-bold'
                      : 'text-[#c2bcaf] hover:text-white'
                  }`}
                >
                  Temple Vimana
                </button>
                <button
                  onClick={() => setSelectedArtifact('coin')}
                  className={`px-3 py-1.5 text-xs font-cinzel rounded-md transition-colors ${
                    selectedArtifact === 'coin'
                      ? 'bg-[#d4af37] text-[#0d0c0a] font-bold'
                      : 'text-[#c2bcaf] hover:text-white'
                  }`}
                >
                  Royal Coin
                </button>
                <button
                  onClick={() => setSelectedArtifact('deepam')}
                  className={`px-3 py-1.5 text-xs font-cinzel rounded-md transition-colors ${
                    selectedArtifact === 'deepam'
                      ? 'bg-[#d4af37] text-[#0d0c0a] font-bold'
                      : 'text-[#c2bcaf] hover:text-white'
                  }`}
                >
                  Sacred Deepam
                </button>
              </div>
            </div>

            {/* Material Finish & Rotation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-xs text-[#8f887b] font-cinzel">Finish:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedMaterial('gold')}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedMaterial === 'gold'
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f5f0e6]'
                        : 'border-[#2b271f] text-[#8f887b] hover:text-white'
                    }`}
                  >
                    24K Gold
                  </button>
                  <button
                    onClick={() => setSelectedMaterial('bronze')}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedMaterial === 'bronze'
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f5f0e6]'
                        : 'border-[#2b271f] text-[#8f887b] hover:text-white'
                    }`}
                  >
                    Cast Bronze
                  </button>
                  <button
                    onClick={() => setSelectedMaterial('granite')}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      selectedMaterial === 'granite'
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f5f0e6]'
                        : 'border-[#2b271f] text-[#8f887b] hover:text-white'
                    }`}
                  >
                    Granite
                  </button>
                </div>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-cinzel rounded border transition-colors ${
                    autoRotate
                      ? 'border-[#d4af37]/60 bg-[#d4af37]/15 text-[#e8e4dc]'
                      : 'border-[#2b271f] text-[#7a7467] hover:text-white'
                  }`}
                  aria-label="Toggle 3D auto rotation"
                >
                  <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin-slow' : ''}`} />
                  <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
                </button>
                <button
                  onClick={resetCamera}
                  className="px-2.5 py-1 text-xs text-[#a39e93] hover:text-white border border-[#2b271f] rounded transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
