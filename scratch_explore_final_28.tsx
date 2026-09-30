import { useState, Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'
import { ElevatorScene } from './ElevatorScene'



const BigEVLift = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef} position={[0, -2, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Cabin */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.2, 3, 2.2]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Doors */}
      <mesh position={[0, 1.5, 1.1]}>
        <boxGeometry args={[2.1, 2.9, 0.1]} />
        <meshStandardMaterial color="#181818" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Glowing Battery Base - EV USP */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3, 0.4, 3]} />
        <meshStandardMaterial color="#00cccc" emissive="#00cccc" emissiveIntensity={1.5} />
      </mesh>
      {/* Floating Low Energy Particles / Ring */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <torusGeometry args={[2.5, 0.05, 16, 100]} />
         <meshStandardMaterial color="#00cccc" emissive="#00cccc" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export const ExplorePage = ({ onBack }: { onBack: () => void }) => {
  const [showBudget, setShowBudget] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const textRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: 'power4.out', delay: 0.5 }
      )
    }
  }, [])

  useEffect(() => {
    if (showBudget && cardsContainerRef.current) {
      gsap.fromTo(cardsContainerRef.current.children,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' }
      )
    }
  }, [showBudget])

  const liftOptions = [
    { name: "Standard", budget: "₹8L onwards", color: "#cccccc", image: "/lifts/lift3.jpg" },
    { name: "Premium", budget: "₹12L onwards", color: "#ccaa00", image: "/lifts/lift1.jpg" },
    { name: "Luxury", budget: "₹18L onwards", color: "#111111", image: "/lifts/lift4.jpg" },
    { name: "EV Model", budget: "₹22L onwards", color: "#00cccc", video: "/lifts/tripo-showcase-ddea2d59-ccba-4b7e-a533-08f6b851c8c8.mp4" }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a1a1a] via-[#050505] to-black overflow-y-auto text-white">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-accent uppercase tracking-widest text-sm transition-all duration-300 hover:gap-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {/* Hero EV USP Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        
        {/* EV USP 3D Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <BigEVLift />
            </Suspense>
          </Canvas>
        </div>

        <div ref={textRef} className="relative z-10 text-center mb-16 px-4">
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white mb-6 filter drop-shadow-lg">
            The EV Model
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 max-w-4xl mx-auto">
            {['ITALIAN ENGINEERING', 'INDIAN INNOVATION', 'LOW ENERGY', 'SINGLE PHASE POWER SUPPLY', 'PREMIUM SAFETY'].map((text, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs md:text-sm tracking-[0.2em] font-light text-white/80 uppercase">
                  {text}
                </span>
                {i < arr.length - 1 && <span className="text-accent text-xs">◆</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Button Section */}
        <div className={`relative z-10 transition-all duration-700 ${showBudget ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 mt-12 animate-fade-in-up'}`}>
          {showButton && (
            <button 
              onClick={() => {
                setShowBudget(true);
                setTimeout(() => {
                  document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="relative group px-12 py-5 bg-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <div className="absolute inset-0 border border-accent/50 group-hover:border-accent transition-colors duration-500"></div>
              <span className="relative text-accent group-hover:text-white font-semibold tracking-[0.2em] uppercase text-sm transition-colors duration-500">
                Select Your Tier
              </span>
              
              {/* Glowing decorative dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
            </button>
          )}
        </div>

        {/* Cards Section */}
        <div id="vision-section" className={`relative z-10 w-full max-w-7xl mx-auto px-6 transition-all duration-700 ${showBudget ? 'opacity-100 mt-20 mb-32' : 'opacity-0 h-0 overflow-hidden pointer-events-none'}`}>
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest text-center text-white">Choose Your Vision</h2>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>
          
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {liftOptions.map((lift, i) => (
                <div key={i} className="relative bg-gradient-to-b from-white/10 to-white/0 border border-white/10 p-6 flex flex-col items-center hover:border-accent/80 transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,204,204,0.15)]">
                  
                  {/* Accent Top Border */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-full h-72 mb-8 relative overflow-hidden rounded-sm shadow-inner shadow-black/50 bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {lift.video ? (
                      <video src={lift.video} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    ) : (
                      <img src={lift.image} alt={lift.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-light uppercase tracking-widest mb-3 text-white group-hover:text-accent transition-colors duration-300">{lift.name}</h3>
                  <div className="text-white/50 font-mono tracking-[0.2em] text-xs mb-8 group-hover:text-white/80 transition-colors duration-300">{lift.budget}</div>
                  
                  <button className="w-full py-4 bg-white/5 border border-white/10 uppercase tracking-widest text-xs group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300 font-semibold mt-auto relative overflow-hidden">
                    <span className="relative z-10">Configure</span>
                  </button>
                </div>
              ))}
            </div>
        </div>

      </div>
    </div>
  )
}
