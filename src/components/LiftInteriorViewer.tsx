import { useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF, useProgress, useAnimations, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Sun,
  Moon,
  Compass,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Building2
} from 'lucide-react'

// GLB model & HDRI paths
const DEFAULT_GLB_URL = '/lifts/main white.glb'
const DEFAULT_HDRI_URL = '/small_empty_room_3_1k.hdr'
const LOBBY_HDRI_URL = '/interior_lobby.hdr'

interface LiftInteriorViewerProps {
  compact?: boolean
  className?: string
  productName?: string
  productTagline?: string
  modelUrl?: string
  hdriUrl?: string
  initialBgMode?: 'room' | 'lobby' | 'studio'
}

type LightingPreset = 'luxury' | 'daylight' | 'cyan'
type CameraPreset = 'front' | 'inside' | 'iso' | 'ceiling'

// Hotspot definition in local model space (after Center and Rotation)
const HOTSPOTS = [
  {
    id: 'marble',
    label: 'Black & Gold Marble Floor',
    desc: 'High-polish Italian vein-matched marble with anti-slip micro-texture.',
    position: [0, -1.8, 0] as [number, number, number]
  },
  {
    id: 'gold',
    label: 'PVD Titanium Gold Accents',
    desc: 'Vacuum-coated electroplated titanium gold trim for lasting brilliance.',
    position: [1.2, 0.5, 0] as [number, number, number]
  },
  {
    id: 'ceiling',
    label: 'Illuminated Coffer Ceiling',
    desc: 'Integrated diffuse LED lighting designed for zero glare and ambient warmth.',
    position: [0, 2.4, 0] as [number, number, number]
  },
  {
    id: 'fabric',
    label: 'Acoustic Fabric & Glass Walls',
    desc: 'Multi-layer sound damping panels paired with panoramic safety glass.',
    position: [-1.2, 0.5, -0.5] as [number, number, number]
  }
]

// ─── 3D Model Component ──────────────────────────────────────────
const CabinModel = ({
  modelUrl = DEFAULT_GLB_URL,
  isPlaying = true
}: {
  modelUrl?: string
  isPlaying?: boolean
}) => {
  const safeUrl = modelUrl.includes('%20') ? modelUrl : encodeURI(modelUrl)
  const { scene, animations } = useGLTF(safeUrl)
  const groupRef = useRef<THREE.Group>(null)
  const { actions, names } = useAnimations(animations, groupRef)

  const findCabinObject = (root: THREE.Object3D) => {
    let found: THREE.Object3D | null = null
    root.traverse((obj) => {
      if (found) return
      const n = obj.name.toLowerCase()
      if (n.includes('elevator') && (n.includes('controller') || n.includes('cabin'))) {
        found = obj
      }
    })
    return (
      found ||
      root.getObjectByName('Elevator controller.002') ||
      root.getObjectByName('Elevator_controller002') ||
      root.getObjectByName('Elevator_controller')
    )
  }

  useEffect(() => {
    if (!scene) return
    // When the model includes the elevator cabin controller, center directly on the cabin
    const cabin = findCabinObject(scene)
    if (cabin) {
      scene.rotation.set(0, Math.PI / 2, 0)
      scene.updateMatrixWorld(true)
      const cabinBox = new THREE.Box3().setFromObject(cabin)
      const cabinCenter = new THREE.Vector3()
      cabinBox.getCenter(cabinCenter)
      scene.position.set(-cabinCenter.x, -cabinCenter.y, -cabinCenter.z)
    }
  }, [scene])

  // Play only the active elevator motion tracks to keep CPU at 60fps
  useEffect(() => {
    if (!actions || names.length === 0) return
    const relevantNames = names.filter((name) => {
      const n = name.toLowerCase()
      return n.includes('controller') || n.includes('elevator') || n.includes('door') || n.includes('cabin') || n.includes('lift')
    })
    const clipsToPlay = relevantNames.length > 0 ? relevantNames : [names[0]]
    clipsToPlay.forEach((name) => {
      const action = actions[name]
      if (action) {
        action.setLoop(THREE.LoopRepeat, Infinity)
        if (isPlaying) {
          action.play()
          action.paused = false
        } else {
          action.paused = true
        }
      }
    })
  }, [actions, names, isPlaying])

  const cabin = scene ? findCabinObject(scene) : null

  if (cabin) {
    return (
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    )
  }

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
      </Center>
    </group>
  )
}

// ─── Camera Controller & Animated Transitions ────────────────────
const CameraRig = ({
  targetPreset,
  autoRotate,
  controlsRef
}: {
  targetPreset: CameraPreset
  autoRotate: boolean
  controlsRef: React.RefObject<any>
}) => {
  const { camera } = useThree()
  const isTransitioning = useRef(false)

  // Camera presets tuned for centered elevator model to full-cover the viewport
  const presets: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
    front: { pos: [0, 0, 5.0], target: [0, 0, 0] },
    inside: { pos: [0, -0.1, 0.4], target: [0, -0.1, -2.0] },
    iso: { pos: [4.2, 2.2, 4.4], target: [0, 0, 0] },
    ceiling: { pos: [0, 0.9, 1.8], target: [0, 2.0, -0.2] }
  }

  useEffect(() => {
    const p = presets[targetPreset]
    if (!p) return

    isTransitioning.current = true

    gsap.to(camera.position, {
      x: p.pos[0],
      y: p.pos[1],
      z: p.pos[2],
      duration: 1.2,
      ease: 'power3.inOut'
    })

    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: p.target[0],
        y: p.target[1],
        z: p.target[2],
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          controlsRef.current?.update()
        },
        onComplete: () => {
          isTransitioning.current = false
        }
      })
    }
  }, [targetPreset, camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      zoomSpeed={0.9}
      enablePan={true}
      panSpeed={0.8}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate && !isTransitioning.current}
      autoRotateSpeed={0.7}
      minDistance={0.15}
      maxDistance={35}
      maxPolarAngle={Math.PI / 2 + 0.2}
    />
  )
}

// ─── Dynamic Lighting Rig ────────────────────────────────────────
const LightingSetup = ({ preset }: { preset: LightingPreset }) => {
  if (preset === 'luxury') {
    return (
      <>
        <hemisphereLight intensity={0.5} color="#ffe8cc" groundColor="#1a140a" />
        <ambientLight intensity={0.75} color="#ffe8cc" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff6ea" />
        <pointLight position={[0, 2.2, 0]} intensity={1.8} color="#ffd280" distance={6} decay={2} />
      </>
    )
  }

  if (preset === 'cyan') {
    return (
      <>
        <hemisphereLight intensity={0.5} color="#d0f4f7" groundColor="#06121a" />
        <ambientLight intensity={0.7} color="#d0f4f7" />
        <directionalLight position={[5, 10, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[0, 2.2, 0]} intensity={2.2} color="#38bdf8" distance={6} decay={2} />
      </>
    )
  }

  // daylight preset
  return (
    <>
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#141414" />
      <ambientLight intensity={0.85} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[0, 2.2, 0]} intensity={1.5} color="#ffffff" distance={6} decay={2} />
    </>
  )
}

// ─── Main Viewer Component ────────────────────────────────────────
export const LiftInteriorViewer = ({
  compact = false,
  className = '',
  productName = 'Alpha Luxury Cabin — Main White Edition',
  productTagline = 'Italian Marble, Titanium Gold & Panoramic Glass',
  modelUrl = DEFAULT_GLB_URL,
  hdriUrl = DEFAULT_HDRI_URL,
  initialBgMode = 'room'
}: LiftInteriorViewerProps) => {
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front')
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('luxury')
  const [bgMode, setBgMode] = useState<'room' | 'lobby' | 'studio'>(initialBgMode)
  const [autoRotate, setAutoRotate] = useState<boolean>(!compact)
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(true)
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(compact)
  const [zoomLevel, setZoomLevel] = useState<number>(100)

  const activeHdriUrl = bgMode === 'lobby' ? LOBBY_HDRI_URL : (hdriUrl || DEFAULT_HDRI_URL)

  const { active: isLoading, progress } = useProgress()

  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)

  // Track viewport visibility with 250px rootMargin so it begins loading just before scrolling into view
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasBeenInView(true)
        }
      },
      { rootMargin: '250px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleResetCamera = () => {
    setCameraPreset('front')
    setZoomLevel(100)
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  // Multi-step high precision zoom in/out with generous 30+ zoom counts
  const handleZoom = (direction: 'in' | 'out') => {
    if (!controlsRef.current) return
    const cam = controlsRef.current.object as THREE.PerspectiveCamera
    const target = controlsRef.current.target as THREE.Vector3
    const currentDist = cam.position.distanceTo(target)

    // Smooth geometric progression giving 30+ distinct zoom counts
    const factor = direction === 'in' ? 0.82 : 1.22
    const newDist = Math.max(0.15, Math.min(35, currentDist * factor))

    const dir = new THREE.Vector3().subVectors(cam.position, target).normalize()
    cam.position.copy(target).addScaledVector(dir, newDist)
    controlsRef.current.update()

    // Baseline distance 5.0 = 100%
    const pct = Math.round((5.0 / newDist) * 100)
    setZoomLevel(pct)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#06090e] shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
        compact ? 'w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]' : 'h-[580px] lg:h-[720px]'
      } ${className}`}
    >
      {/* ─── Top Header Info & Controls ─── */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-10 flex items-start justify-between pointer-events-none bg-gradient-to-b from-primary/90 via-primary/40 to-transparent">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-accent font-semibold">
              Interactive 3D Cabin &bull; Live Motion
            </span>
          </div>
          <h4 className="text-white font-display text-base md:text-lg uppercase tracking-wider font-light drop-shadow">
            {productName}
          </h4>
          {!compact && (
            <p className="text-metal text-xs tracking-wider mt-0.5 font-light hidden sm:block">
              {productTagline}
            </p>
          )}
        </div>

        {/* Action icons: Reset / Zoom In / Zoom Out / Zoom Level / Fullscreen */}
        {hasBeenInView && (
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/15 rounded-sm p-0.5 gap-0.5">
              <button
                onClick={() => handleZoom('in')}
                title="Zoom In (+)"
                className="w-7 h-7 rounded-sm hover:bg-accent/20 hover:border-accent text-white/80 hover:text-white flex items-center justify-center transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom('out')}
                title="Zoom Out (-)"
                className="w-7 h-7 rounded-sm hover:bg-accent/20 hover:border-accent text-white/80 hover:text-white flex items-center justify-center transition-all"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetCamera}
                title="Click to reset zoom to 100%"
                className="px-2 h-7 flex items-center justify-center text-[10px] font-mono tracking-wider text-accent hover:bg-accent/15 rounded-xs transition-all"
              >
                {zoomLevel}%
              </button>
            </div>
            <button
              onClick={handleResetCamera}
              title="Reset Camera View"
              className="w-8 h-8 rounded-sm bg-black/60 hover:bg-accent/20 border border-white/15 hover:border-accent text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {!compact && (
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="w-8 h-8 rounded-sm bg-black/60 hover:bg-accent/20 border border-white/15 hover:border-accent text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ─── Loading Overlay (Progress Tracker) ─── */}
      {hasBeenInView && isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/95 backdrop-blur-md z-30 transition-opacity duration-500">
          <div className="relative w-14 h-14 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border border-white/10 flex items-center justify-center">
              <span className="text-[10px] font-mono text-accent">{Math.round(progress)}%</span>
            </div>
          </div>
          <p className="text-white font-display text-xs uppercase tracking-[0.25em]">Loading 3D Cabin Model</p>
          <p className="text-metal text-[11px] tracking-wider mt-1">{productTagline || 'Soft Black Series'}</p>
        </div>
      )}

      {/* ─── 3D WebGL Canvas or Pre-Scroll Placeholder ─── */}
      {hasBeenInView ? (
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 5.0], fov: 48 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance'
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          {bgMode === 'studio' ? (
            <>
              <color attach="background" args={['#05080c']} />
              <Suspense fallback={null}>
                <Environment files={activeHdriUrl} />
              </Suspense>
            </>
          ) : (
            <Suspense fallback={null}>
              <Environment files={activeHdriUrl} background blur={0.06} />
            </Suspense>
          )}
          <LightingSetup preset={lightingPreset} />

          <Suspense fallback={null}>
            <CabinModel modelUrl={modelUrl} isPlaying={isPlayingAnimation && isInView} />
          </Suspense>

          <CameraRig
            targetPreset={cameraPreset}
            autoRotate={autoRotate && isInView}
            controlsRef={controlsRef}
          />
        </Canvas>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#090e17] to-[#04060a] p-8 text-center z-10">
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center animate-pulse">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <div
              className="absolute -inset-1 rounded-full border border-dashed border-accent/20 animate-spin"
              style={{ animationDuration: '14s' }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-semibold mb-2">
            Architectural 3D Cabin Experience
          </span>
          <h3 className="text-xl md:text-2xl font-display text-white uppercase tracking-wider max-w-md mb-2">
            {productName}
          </h3>
          <p className="text-metal text-xs max-w-md mb-6 font-light leading-relaxed">
            Scroll into view or click below to launch the real-time interactive 3D virtual showroom.
          </p>
          <button
            type="button"
            onClick={() => {
              setHasBeenInView(true)
              setIsInView(true)
            }}
            className="px-6 py-2.5 text-xs uppercase font-display tracking-[0.2em] bg-accent text-primary font-semibold rounded-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,204,204,0.3)] flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch 3D Cabin
          </button>
        </div>
      )}

      {/* ─── Compact Mode Helper Badge ─── */}
      {compact ? (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">
              Live Simulation • Drag • Wheel Zoom ({zoomLevel}%)
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/15 rounded-sm p-0.5 gap-0.5">
              <button
                onClick={() => handleZoom('in')}
                title="Zoom In (+)"
                className="w-6 h-6 rounded-xs hover:bg-accent/20 text-white/80 hover:text-white flex items-center justify-center transition-all"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleZoom('out')}
                title="Zoom Out (-)"
                className="w-6 h-6 rounded-xs hover:bg-accent/20 text-white/80 hover:text-white flex items-center justify-center transition-all"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border transition-all ${
                isPlayingAnimation
                  ? 'bg-accent/20 border-accent text-white'
                  : 'bg-black/60 border-white/15 text-white/60 hover:text-white'
              } backdrop-blur-md`}
              title={isPlayingAnimation ? 'Pause Elevator Motion' : 'Play Elevator Motion'}
            >
              Anim: {isPlayingAnimation ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setBgMode((prev) => (prev === 'studio' ? 'room' : 'studio'))}
              className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border transition-all flex items-center gap-1 ${
                bgMode !== 'studio'
                  ? 'bg-accent/20 border-accent text-white'
                  : 'bg-black/60 border-white/15 text-white/60 hover:text-white'
              } backdrop-blur-md`}
              title={bgMode !== 'studio' ? 'Room HDRI Background Active — Click for Studio' : 'Click for Room HDRI Background'}
            >
              <Building2 className="w-2.5 h-2.5 text-accent" />
              <span>HDRI: {bgMode !== 'studio' ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border transition-all ${
                autoRotate
                  ? 'bg-accent/20 border-accent text-white'
                  : 'bg-black/60 border-white/15 text-white/60 hover:text-white'
              } backdrop-blur-md`}
            >
              Rotate: {autoRotate ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setCameraPreset(cameraPreset === 'inside' ? 'front' : 'inside')}
              className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border border-accent/40 bg-accent text-primary font-semibold hover:bg-white transition-all backdrop-blur-md"
            >
              {cameraPreset === 'inside' ? 'Front' : 'Step Inside'}
            </button>
          </div>
        </div>
      ) : hasBeenInView ? (
        /* ─── Full Mode Bottom Control Console ─── */
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent flex flex-col md:flex-row gap-4 items-start md:items-end justify-between pointer-events-none">
          {/* View Preset Selector */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 px-2 flex items-center gap-1.5">
              <CameraPresetIcon /> Camera
            </span>
            {(
              [
                { id: 'front', label: 'Front Entrance' },
                { id: 'inside', label: 'Walk Inside' },
                { id: 'iso', label: 'Isometric 3D' },
                { id: 'ceiling', label: 'Coffer Ceiling' }
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => setCameraPreset(v.id)}
                className={`px-3 py-1.5 text-xs font-display uppercase tracking-wider rounded-sm transition-all duration-300 ${
                  cameraPreset === v.id
                    ? 'bg-accent text-primary font-semibold shadow-[0_0_15px_rgba(0,204,204,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Right controls: Lighting mode + Animation + Auto-Rotate */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            {/* Elevator Animation Toggle */}
            <button
              onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
              className={`px-3 py-2 text-xs font-display uppercase tracking-wider rounded-sm border transition-all duration-300 flex items-center gap-2 backdrop-blur-xl ${
                isPlayingAnimation
                  ? 'border-accent/60 bg-accent/15 text-white'
                  : 'border-white/10 bg-black/60 text-white/60 hover:text-white hover:border-white/20'
              }`}
              title={isPlayingAnimation ? 'Pause Elevator Animation' : 'Play Elevator Animation'}
            >
              {isPlayingAnimation ? (
                <Pause className="w-3.5 h-3.5 text-accent animate-pulse" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white/60" />
              )}
              <span className="font-mono text-[11px]">
                {isPlayingAnimation ? 'Live Motion: ON' : 'Live Motion: Paused'}
              </span>
            </button>

            {/* HDRI Background modes */}
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 px-2 hidden sm:inline flex items-center gap-1">
                <Building2 className="w-3 h-3 text-accent" /> HDRI BG
              </span>
              {(
                [
                  { id: 'room', label: 'Room HDRI' },
                  { id: 'lobby', label: 'Lobby' },
                  { id: 'studio', label: 'Studio' }
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setBgMode(mode.id)}
                  title={`Set environment to ${mode.label}`}
                  className={`px-2.5 py-1.5 text-xs tracking-wider rounded-sm transition-all duration-300 font-mono text-[11px] ${
                    bgMode === mode.id
                      ? 'bg-accent text-primary font-semibold shadow-[0_0_12px_rgba(0,204,204,0.35)]'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Lighting modes */}
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 px-2 hidden sm:inline">
                Lighting
              </span>
              {(
                [
                  { id: 'luxury', label: 'Warm Luxury', icon: Sparkles },
                  { id: 'daylight', label: 'Daylight', icon: Sun },
                  { id: 'cyan', label: 'Cyan Tech', icon: Moon }
                ] as const
              ).map((mode) => {
                const IconComponent = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setLightingPreset(mode.id)}
                    title={mode.label}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs tracking-wider rounded-sm transition-all duration-300 ${
                      lightingPreset === mode.id
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-3 h-3 text-accent" />
                    <span className="hidden sm:inline font-mono text-[11px]">{mode.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Auto rotate toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-2 text-xs font-display uppercase tracking-wider rounded-sm border transition-all duration-300 flex items-center gap-2 backdrop-blur-xl ${
                autoRotate
                  ? 'border-accent/60 bg-accent/15 text-white'
                  : 'border-white/10 bg-black/60 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin text-accent' : ''}`} />
              <span className="font-mono text-[11px]">Auto Rotate</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* Interactive Hotspot Feature Cards (Full Mode) */}
      {!compact && hasBeenInView && (
        <div className="absolute top-24 left-6 max-w-xs space-y-2 pointer-events-none hidden md:block">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
            Material Highlights
          </div>
          {HOTSPOTS.map((h) => {
            const isSelected = selectedHotspot === h.id
            return (
              <div
                key={h.id}
                onMouseEnter={() => setSelectedHotspot(h.id)}
                onMouseLeave={() => setSelectedHotspot(null)}
                className={`p-3 rounded-sm border backdrop-blur-xl transition-all duration-300 pointer-events-auto cursor-pointer ${
                  isSelected
                    ? 'border-accent bg-black/85 translate-x-1 shadow-[0_10px_25px_rgba(0,204,204,0.15)]'
                    : 'border-white/10 bg-black/50 hover:border-white/25 hover:bg-black/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-accent' : 'bg-white/40'
                    }`}
                  />
                  <span className="text-xs font-display uppercase tracking-wider text-white">
                    {h.label}
                  </span>
                </div>
                {isSelected && (
                  <p className="text-[11px] text-metal font-light leading-relaxed mt-1.5 pl-3.5">
                    {h.desc}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CameraPresetIcon() {
  return (
    <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}
