import { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { LiftDetailsPage, type LiftData } from './LiftDetailsPage'
import * as THREE from 'three'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'

export const BigEVLift = () => {
  const groupRef = useRef<THREE.Group>(null)
  const cabinGroupRef = useRef<THREE.Group>(null)
  const doorsRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (!cabinGroupRef.current || !groupRef.current) return
    
    // Vertical lift animation (up and down with doors)
    const tl = gsap.timeline({ repeat: -1 })
    
    // Ensure starting state (bottom, doors closed)
    tl.set(cabinGroupRef.current.position, { y: 0 })
    if (doorsRef.current && doorsRef.current.children.length >= 2) {
      tl.set(doorsRef.current.children[0].rotation, { y: 0 })
      tl.set(doorsRef.current.children[1].rotation, { y: 0 })
    }
    
    // Move up (simulate going to next floor)
    tl.to(cabinGroupRef.current.position, { y: 4.5, duration: 2.5, ease: 'power2.inOut', delay: 1 })
    
    // Once at top, open doors, pause, then close
    if (doorsRef.current && doorsRef.current.children.length >= 2) {
      // Open doors
      tl.to(doorsRef.current.children[0].rotation, { y: -Math.PI / 4, duration: 1.5, ease: 'power2.inOut' }, '+=0.2')
      tl.to(doorsRef.current.children[1].rotation, { y: Math.PI / 4, duration: 1.5, ease: 'power2.inOut' }, '<')
      
      // Pause with doors open
      tl.to({}, { duration: 1.5 })
      
      // Close doors
      tl.to(doorsRef.current.children[0].rotation, { y: 0, duration: 1.5, ease: 'power2.inOut' })
      tl.to(doorsRef.current.children[1].rotation, { y: 0, duration: 1.5, ease: 'power2.inOut' }, '<')
    } else {
      // Fallback pause if doors aren't ready yet
      tl.to({}, { duration: 4.5 })
    }

    // Move down
    tl.to(cabinGroupRef.current.position, { y: 0, duration: 2.5, ease: 'power2.inOut', delay: 0.5 })
    
    // Pause at bottom
    tl.to({}, { duration: 1 })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <group ref={groupRef} position={[0, -5, 0]} scale={[1, 1, 1]}>
      {/* Animated Cabin & Doors Group */}
      <group ref={cabinGroupRef}>
        {/* Main Cabin Glass */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 5, 32, 1, true, Math.PI / 4, Math.PI * 1.5]} />
          <meshPhysicalMaterial transparent opacity={0.2} transmission={1} roughness={0.05} color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Solid Back Wall */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.15, 2.15, 5, 32, 1, true, Math.PI * 0.75, Math.PI * 0.5]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>

        {/* Floor and Ceiling */}
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>

        <group ref={doorsRef}>
          {/* Left Door Group */}
          <group>
            <mesh>
              <cylinderGeometry args={[2.25, 2.25, 5, 32, 1, true, -Math.PI / 4, Math.PI / 4]} />
              <meshPhysicalMaterial transparent opacity={0.2} transmission={1} roughness={0.05} color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
            {/* Left Door Metal Trim (Closing edge at theta=0) */}
            <mesh position={[-0.03, 0, 2.25]}>
              <boxGeometry args={[0.04, 5, 0.04]} />
              <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
          {/* Right Door Group */}
          <group>
            <mesh>
              <cylinderGeometry args={[2.25, 2.25, 5, 32, 1, true, 0, Math.PI / 4]} />
              <meshPhysicalMaterial transparent opacity={0.2} transmission={1} roughness={0.05} color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
            {/* Right Door Metal Trim (Closing edge at theta=0) */}
            <mesh position={[0.03, 0, 2.25]}>
              <boxGeometry args={[0.04, 5, 0.04]} />
              <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Glass Shaft (Stays stationary on floor) */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 16, 32]} />
        <meshPhysicalMaterial transparent opacity={0.15} transmission={0.9} roughness={0.1} color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Glowing Battery Base - EV USP (Stays stationary on floor) */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 0.4, 32]} />
        <meshStandardMaterial color="#00cccc" emissive="#00cccc" emissiveIntensity={1.5} />
      </mesh>
      {/* Floating Low Energy Particles / Ring (Moved to top of the screen) */}
      <mesh position={[0, 7.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <torusGeometry args={[3.2, 0.05, 32, 100]} />
         <meshStandardMaterial color="#00cccc" emissive="#00cccc" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export const ExplorePage = ({ 
  onBack, 
  onRequestConsultation 
}: { 
  onBack: () => void
  onRequestConsultation?: (data?: { modelName: string, id: string, budget: string }) => void 
}) => {
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

  const [selectedLift, setSelectedLift] = useState<LiftData | null>(null)

  const liftOptions: (LiftData & { image?: string, video?: string, isEV?: boolean })[] = [
    { 
      name: "Standard", id: "AE01", budget: "₹8L onwards", color: "#cccccc", image: "/lifts/lift3.jpg",
      description: "Alpha Elevators delivers state-of-the-art elevator solutions with advanced safety technology and precision engineering. Built with international quality standards, our systems ensure smooth, secure, and silent operation—elevating comfort with every ride.",
      features: ["Advanced safety technology", "Precision engineering", "International quality standards", "Smooth, secure, and silent operation"]
    },
    { 
      name: "Premium", id: "AE02", budget: "₹12L onwards", color: "#ccaa00", image: "/lifts/lift1.jpg",
      description: "Alpha Elevators is a cutting-edge traction lift system designed to comply with the European Lift Directive 2014/33/EU, ensuring top-tier safety and performance. This solution is highly adaptable to meet any architectural requirement, making it perfect for both standard and complex projects.",
      features: ["Cutting-edge traction lift system", "Complies with European Lift Directive 2014/33/EU", "Highly adaptable for standard and complex projects", "Sleek, modern design"]
    },
    { 
      name: "Luxury", id: "AE03", budget: "₹18L onwards", color: "#111111", image: "/lifts/lift4.jpg",
      description: "Experience state-of-the-art technology at an affordable price with Alpha Elevators. The Alpha Elevators Belt-Model utilizes patented belt-drive technology, integrated with counterweights, ensuring superior performance. This innovative system eliminates friction, allowing for smoother operation and higher speeds, while completely eliminating the need for greasing and oiling.",
      features: ["Patented belt-drive technology", "Integrated counterweights for superior performance", "Frictionless, smoother operation and higher speeds", "No greasing and oiling required"]
    },
    { 
      name: "EV Model", id: "EV01", budget: "₹22L onwards", color: "#00cccc", video: "/lifts/tripo-showcase-ddea2d59-ccba-4b7e-a533-08f6b851c8c8.mp4", isEV: true,
      description: "Alpha Elevators redefines vertical mobility with its energy-efficient and eco-conscious design. Built to run on single-phase power, it consumes less than 15 units of electricity per month, making it an ideal choice for modern homes.",
      features: ["Low power consumption (0.75kW, 240V single-phase)", "Intelligent power-saving descent system", "Environmentally responsible and cost-effective", "Emergency battery backup during power outages"]
    }
  ]

  if (selectedLift) {
    return (
      <LiftDetailsPage 
        lift={selectedLift} 
        onBack={() => setSelectedLift(null)} 
        onRequestConsultation={onRequestConsultation}
      />
    )
  }

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
                <div key={i} onClick={() => setSelectedLift(lift)} className="relative bg-gradient-to-b from-white/10 to-white/0 border border-white/10 p-6 flex flex-col items-center hover:border-accent/80 transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,204,204,0.15)]">
                  
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
