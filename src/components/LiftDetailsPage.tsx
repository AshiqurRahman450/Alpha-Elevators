import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Sparkles, Float, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ArrowLeft, CheckCircle2, Shield, Zap, Star, Crown } from 'lucide-react'

// Enhanced Luxury Lift Animation with customization
const LiftModel = ({ 
  interiorColor, 
  exteriorColor, 
  liftSize, 
  variant 
}: { 
  interiorColor: string, 
  exteriorColor: string, 
  liftSize: number, 
  variant: string 
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const cabinRef = useRef<THREE.Group>(null)
  const doorsRef = useRef<THREE.Group>(null)

  const isEV = variant === 'EV01'
  const isLuxury = variant === 'AE03'
  
  // Guard for pure black so it's not entirely invisible
  const safeExterior = exteriorColor === '#111111' ? '#333333' : exteriorColor
  const safeInterior = interiorColor === '#111111' ? '#ffffff' : interiorColor

  useEffect(() => {
    if (!cabinRef.current || !doorsRef.current || !groupRef.current) return
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
    
    const doorLeft = doorsRef.current.children[0]
    const doorRight = doorsRef.current.children[1]

    tl.set(cabinRef.current.position, { y: 0 })
    tl.set(doorLeft.position, { x: -0.65 })
    tl.set(doorRight.position, { x: 0.65 })

    // 1: Close doors
    tl.to(doorLeft.position, { x: -0.02, duration: 1.5, ease: "power3.inOut" }, 1)
    tl.to(doorRight.position, { x: 0.02, duration: 1.5, ease: "power3.inOut" }, "<")
    
    // 2: Move up
    tl.to(cabinRef.current.position, { y: 7, duration: 4, ease: "power2.inOut" }, "+=0.5")
    
    // 3: Open doors at top
    tl.to(doorLeft.position, { x: -0.65, duration: 1.5, ease: "power3.inOut" }, "+=0.5")
    tl.to(doorRight.position, { x: 0.65, duration: 1.5, ease: "power3.inOut" }, "<")
    
    // Pause
    tl.to({}, { duration: 2.5 })
    
    // 4: Close doors
    tl.to(doorLeft.position, { x: -0.02, duration: 1.5, ease: "power3.inOut" })
    tl.to(doorRight.position, { x: 0.02, duration: 1.5, ease: "power3.inOut" }, "<")
    
    // 5: Move down
    tl.to(cabinRef.current.position, { y: 0, duration: 4, ease: "power2.inOut" }, "+=0.5")
    
    // 6: Open doors at bottom
    tl.to(doorLeft.position, { x: -0.65, duration: 1.5, ease: "power3.inOut" }, "+=0.5")
    tl.to(doorRight.position, { x: 0.65, duration: 1.5, ease: "power3.inOut" }, "<")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <group ref={groupRef} position={[0, -4, 0]} scale={[liftSize, liftSize, liftSize]}>
      {/* Outer Shaft (Glass Cylinder for Luxury/EV, Box for Standard) */}
      <mesh position={[0, 4, 0]}>
        {(isLuxury || isEV) ? (
           <cylinderGeometry args={[2.5, 2.5, 14, 32]} />
        ) : (
           <boxGeometry args={[3, 14, 3]} />
        )}
        <meshPhysicalMaterial 
          transparent opacity={0.15} 
          color="#ffffff" 
          metalness={0.9} roughness={0.1} 
          transmission={0.9} thickness={0.5} 
        />
      </mesh>

      {/* Decorative Shaft Rings */}
      {(isLuxury || isEV) && [-2, 1, 4, 7, 10].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[2.55, 0.05, 32, 64]} />
          <meshStandardMaterial color={safeExterior} metalness={1} roughness={0.2} emissive={safeExterior} emissiveIntensity={isEV ? 1.5 : 0.5} />
        </mesh>
      ))}

      {/* Cabin Container */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <group ref={cabinRef}>
          
          {/* Floor */}
          <mesh position={[0, -1.45, 0]}>
            {(isLuxury || isEV) ? <cylinderGeometry args={[2, 2, 0.1, 32]} /> : <boxGeometry args={[2.4, 0.1, 2.4]} />}
            <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Ceiling */}
          <mesh position={[0, 1.45, 0]}>
            {(isLuxury || isEV) ? <cylinderGeometry args={[2, 2, 0.1, 32]} /> : <boxGeometry args={[2.4, 0.1, 2.4]} />}
            <meshStandardMaterial color="#ffffff" emissive={safeInterior} emissiveIntensity={0.8} />
          </mesh>

          {/* Glass Walls */}
          {(isLuxury || isEV) ? (
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.98, 1.98, 2.8, 32, 1, true, -Math.PI * 0.25, Math.PI * 1.5]} />
              <meshPhysicalMaterial 
                transparent opacity={1}
                color="#ffffff"
                transmission={0.95} thickness={0.1} roughness={0.05}
              />
            </mesh>
          ) : (
            <group>
              {/* Back wall */}
              <mesh position={[0, 0, -1.2]}>
                <boxGeometry args={[2.4, 2.8, 0.05]} />
                <meshPhysicalMaterial transparent opacity={1} color="#ffffff" transmission={0.95} thickness={0.1} roughness={0.05} />
              </mesh>
              {/* Left wall */}
              <mesh position={[-1.2, 0, 0]}>
                <boxGeometry args={[0.05, 2.8, 2.4]} />
                <meshPhysicalMaterial transparent opacity={1} color="#ffffff" transmission={0.95} thickness={0.1} roughness={0.05} />
              </mesh>
              {/* Right wall */}
              <mesh position={[1.2, 0, 0]}>
                <boxGeometry args={[0.05, 2.8, 2.4]} />
                <meshPhysicalMaterial transparent opacity={1} color="#ffffff" transmission={0.95} thickness={0.1} roughness={0.05} />
              </mesh>
            </group>
          )}
          
          {/* Doors */}
          <group ref={doorsRef} position={[0, 0, 1.15]}>
            <mesh position={[-0.65, 0, 0]}>
              <boxGeometry args={[1.1, 2.8, 0.05]} />
              <meshPhysicalMaterial transparent opacity={1} color="#ffffff" transmission={0.95} thickness={0.05} roughness={0.05} />
              {/* Right Trim (where doors meet) */}
              <mesh position={[0.5, 0, 0.03]}>
                <boxGeometry args={[0.02, 2.8, 0.02]} />
                <meshStandardMaterial color={safeExterior} metalness={1} roughness={0.1} emissive={safeExterior} emissiveIntensity={0.5} />
              </mesh>
              {/* Left Edge Trim */}
              <mesh position={[-0.54, 0, 0.03]}>
                <boxGeometry args={[0.02, 2.8, 0.02]} />
                <meshStandardMaterial color={safeExterior} metalness={1} roughness={0.1} emissive={safeExterior} emissiveIntensity={0.5} />
              </mesh>
            </mesh>
            <mesh position={[0.65, 0, 0]}>
              <boxGeometry args={[1.1, 2.8, 0.05]} />
              <meshPhysicalMaterial transparent opacity={1} color="#ffffff" transmission={0.95} thickness={0.05} roughness={0.05} />
              {/* Left Trim (where doors meet) */}
              <mesh position={[-0.5, 0, 0.03]}>
                <boxGeometry args={[0.02, 2.8, 0.02]} />
                <meshStandardMaterial color={safeExterior} metalness={1} roughness={0.1} emissive={safeExterior} emissiveIntensity={0.5} />
              </mesh>
              {/* Right Edge Trim */}
              <mesh position={[0.54, 0, 0.03]}>
                <boxGeometry args={[0.02, 2.8, 0.02]} />
                <meshStandardMaterial color={safeExterior} metalness={1} roughness={0.1} emissive={safeExterior} emissiveIntensity={0.5} />
              </mesh>
            </mesh>
          </group>

          {/* Inner Light */}
          <pointLight position={[0, 1, 0]} intensity={3} color={safeInterior} distance={6} />
        </group>
      </Float>

      {/* Ground Contact Shadow */}
      <ContactShadows position={[0, -0.05, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000000" />

      {/* EV Specific Magic / Sparkles */}
      {isEV && (
        <Sparkles count={150} scale={5} size={3} speed={0.6} opacity={0.6} color={safeExterior} position={[0, 4, 0]} />
      )}
    </group>
  )
}

export type LiftData = {
  name: string
  id: string
  budget: string
  color: string
  description: string
  features: string[]
}

export const LiftDetailsPage = ({ lift, onBack }: { lift: LiftData, onBack: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // Configuration State
  const [interiorColor, setInteriorColor] = useState('#ffffff')
  const [exteriorColor, setExteriorColor] = useState('#ffffff')
  const [liftSize, setLiftSize] = useState(1.2)

  const isEV = lift.id === 'EV01'
  const isLuxury = lift.id === 'AE03'
  const isPremium = lift.id === 'AE02'

  const getIcon = () => {
    if (isEV) return <Zap className="w-8 h-8" style={{ color: exteriorColor }} />
    if (isLuxury) return <Crown className="w-8 h-8 text-[#d4af37]" />
    if (isPremium) return <Star className="w-8 h-8 text-[#ccaa00]" />
    return <Shield className="w-8 h-8 text-white/50" />
  }

  useEffect(() => {
    if (containerRef.current && bgRef.current) {
      const tl = gsap.timeline()
      
      tl.fromTo(bgRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )
      
      tl.fromTo(containerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out' },
        "-=0.5"
      )
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-white flex flex-col font-sans">
      {/* Deep Luxury Background */}
      <div ref={bgRef} className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#050505] to-black opacity-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        {/* Glow effect based on lift exterior color */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: exteriorColor === '#111111' ? '#ffffff' : exteriorColor }}
        ></div>
      </div>

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 z-50 flex items-center gap-3 text-white/60 hover:text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 hover:gap-5 group"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4" /> 
        </div>
        Back to Gallery
      </button>

      <div className="w-full max-w-[90rem] mx-auto flex flex-col lg:flex-row p-6 lg:p-12 pt-28 pb-24 gap-8 lg:gap-12 relative" ref={containerRef}>
        
        {/* 3D Animation Section */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-[calc(100vh-8rem)] lg:sticky lg:top-16 relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
          {/* Glass Overlay Top */}
          <div className="absolute top-0 left-0 w-full p-6 z-10 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start pointer-events-none">
            <div>
              <div className="text-xs tracking-[0.3em] text-white/50 uppercase mb-1 font-mono">Live Simulation</div>
              <div className="text-sm font-semibold tracking-widest text-white/90 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: exteriorColor === '#111111' ? '#ffffff' : exteriorColor }}></span>
                System Active
              </div>
            </div>
            {getIcon()}
          </div>
          
          <Canvas camera={{ position: [6, 2, 10], fov: 45 }}>
            <color attach="background" args={['#020202']} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
            <spotLight position={[-10, 20, -10]} intensity={2} angle={0.5} penumbra={1} color={exteriorColor === '#111111' ? '#ffffff' : exteriorColor} />
            <Environment preset="night" />
            <PresentationControls 
              global 
              rotation={[0, -Math.PI / 4, 0]} 
              polar={[-0.2, 0.2]} 
              azimuth={[-Math.PI / 4, Math.PI / 4]} 
            >
              <LiftModel 
                interiorColor={interiorColor} 
                exteriorColor={exteriorColor} 
                liftSize={liftSize} 
                variant={lift.id} 
              />
            </PresentationControls>
          </Canvas>

          {/* Interaction Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[10px] tracking-[0.2em] text-white/50 uppercase pointer-events-none flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Drag to rotate camera
          </div>
        </div>

        {/* Premium Details Section */}
        <div className="w-full lg:w-[45%] flex flex-col justify-start relative z-10">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 w-fit backdrop-blur-md transition-colors duration-1000"
            style={{ 
              borderColor: `${exteriorColor === '#111111' ? '#ffffff' : exteriorColor}40`,
              backgroundColor: `${exteriorColor === '#111111' ? '#ffffff' : exteriorColor}10`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full transition-colors duration-1000" style={{ backgroundColor: exteriorColor === '#111111' ? '#ffffff' : exteriorColor }}></span>
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/90">
              {lift.id} Series
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display uppercase tracking-tight mb-4 transition-colors duration-1000" style={{ 
            color: exteriorColor === '#111111' ? '#ffffff' : exteriorColor,
            textShadow: `0 0 40px ${exteriorColor === '#111111' ? '#ffffff' : exteriorColor}40`
          }}>
            {lift.name}
          </h1>
          
          <div className="flex items-end gap-4 mb-10 pb-10 border-b border-white/10">
            <span className="text-3xl font-light tracking-wider text-white">{lift.budget}</span>
            <span className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Base Installation</span>
          </div>
          
          <div className="space-y-10">
            {/* Configurator Panel */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
              <h3 className="text-xs tracking-[0.3em] uppercase mb-6 text-white/50 font-semibold">Customize Your Vision</h3>
              
              <div className="space-y-6">
                {/* Exterior Color */}
                <div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase mb-3">Exterior Accent Color</div>
                  <div className="flex gap-3">
                    {['#ffffff', '#111111', '#d4af37', '#00cccc', '#ff3366'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setExteriorColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${exteriorColor === c ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Interior Color */}
                <div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase mb-3">Interior Glow</div>
                  <div className="flex gap-3">
                    {['#ffffff', '#ffeedd', '#d4af37', '#00cccc', '#aa00ff'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setInteriorColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${interiorColor === c ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Lift Size */}
                <div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase mb-3">Cabin Size</div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: 'Compact', value: 1.0 },
                      { label: 'Standard', value: 1.2 },
                      { label: 'Spacious', value: 1.4 }
                    ].map(s => (
                      <button 
                        key={s.label}
                        onClick={() => setLiftSize(s.value)}
                        className={`px-4 py-2 rounded-lg text-xs tracking-widest uppercase transition-all border ${liftSize === s.value ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase mb-4 text-white/50 font-semibold">The Alpha Vision</h3>
              <p className="text-white/80 leading-relaxed font-light text-lg lg:text-xl">
                {lift.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase mb-6 text-white/50 font-semibold">Engineering Excellence</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lift.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <CheckCircle2 
                      className="w-5 h-5 shrink-0 transition-colors duration-1000" 
                      style={{ color: exteriorColor === '#111111' ? '#ffffff' : exteriorColor }} 
                    />
                    <span className="text-white/90 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button 
            className="mt-12 w-full py-6 rounded-xl relative overflow-hidden group border border-white/20 hover:border-transparent transition-all duration-500"
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(45deg, ${exteriorColor === '#111111' ? '#333333' : exteriorColor}80, transparent)` }}
            ></div>
            <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500"></div>
            <span className="relative z-10 text-sm tracking-[0.3em] uppercase font-semibold text-white flex items-center justify-center gap-3">
              Request Consultation <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>


    </div>
  )
}
