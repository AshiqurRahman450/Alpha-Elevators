import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Compass,
  ShieldCheck,
  Cpu,
  Ruler,
  Activity,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  Award,
  FileText,
  Download,
  Phone,
  MapPin,
  HardHat,
  X
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface AboutPageProps {
  onBack?: () => void
  onConsultationClick?: (notes?: string) => void
}

/* ════════════════════════════════════════════════════════════════════
   HIGH-PERFORMANCE ARCHITECTURAL STAT COUNTER (IntersectionObserver)
   Zero DOM thrashing, zero ScrollTrigger overhead, native 60fps
════════════════════════════════════════════════════════════════════ */
const LightweightCounter = ({
  end,
  suffix = '',
  decimals = 0,
  duration = 1600
}: {
  end: number
  suffix?: string
  decimals?: number
  duration?: number
}) => {
  const [displayVal, setDisplayVal] = useState<string>(decimals > 0 ? (0).toFixed(decimals) : '0')
  const ref = useRef<HTMLSpanElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          const startTime = performance.now()

          const update = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = easeOut * end

            setDisplayVal(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString())

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setDisplayVal(decimals > 0 ? end.toFixed(decimals) : end.toString())
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, decimals, duration])

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  )
}

/* ════════════════════════════════════════════════════════════════════
   HARDWARE-ACCELERATED ARCHITECTURAL KINEMATICS ELEVATOR SIMULATOR
   Zero WebGL context, zero lag, silky smooth 60fps CSS3D / SVG
════════════════════════════════════════════════════════════════════ */
const ArchitecturalKinematicsVisualizer = () => {
  const [currentFloor, setCurrentFloor] = useState<1 | 2 | 3>(2)
  const [isDoorsOpen, setIsDoorsOpen] = useState(false)
  const [isTraveling, setIsTraveling] = useState(false)

  const floorPositions = {
    1: { topPercent: 70, heightM: '0.00 M (FFL)', name: 'LVL 01 // GROUND RESIDENCE' },
    2: { topPercent: 40, heightM: '+ 2.80 M', name: 'LVL 02 // MEZZANINE SUITE' },
    3: { topPercent: 10, heightM: '+ 5.60 M', name: 'LVL 03 // PENTHOUSE ROOFTOP' }
  }

  const navigateToFloor = (floor: 1 | 2 | 3) => {
    if (floor === currentFloor || isTraveling) return
    setIsTraveling(true)
    setIsDoorsOpen(false)

    const distance = Math.abs(floor - currentFloor)
    const durationMs = distance * 900 + 400

    setCurrentFloor(floor)

    setTimeout(() => {
      setIsTraveling(false)
      setIsDoorsOpen(true)
      setTimeout(() => setIsDoorsOpen(false), 2400)
    }, durationMs)
  }

  return (
    <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between select-none">
      {/* Background Architectural Datum Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00cccc06_1px,transparent_1px),linear-gradient(to_bottom,#00cccc06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top HUD Telemetry Line */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00cccc] animate-ping" />
          <span className="text-[#00cccc] uppercase tracking-wider font-semibold">
            KINEMATIC ELEVATION DYNAMICS // AE-ARCH-2026
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/50 text-[11px]">
          <span>POSITION: <strong className="text-white font-mono">{floorPositions[currentFloor].heightM}</strong></span>
          <span>//</span>
          <span>SPEED: <strong className="text-[#00cccc] font-mono">{isTraveling ? '0.35 M/S' : '0.00 M/S'}</strong></span>
          <span>//</span>
          <span className="text-white/80">{isTraveling ? 'TRANSIT ACTIVE' : isDoorsOpen ? 'DOORS OPEN' : 'HOLDING POSITION'}</span>
        </div>
      </div>

      {/* Center Kinematic Elevation Visual Section */}
      <div className="relative z-10 my-auto py-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        
        {/* Left: Architectural Floor Controls */}
        <div className="flex flex-row md:flex-col gap-3 font-mono text-xs">
          <span className="text-[10px] text-white/40 tracking-widest uppercase hidden md:block mb-1">
            CALL KINEMATIC SHAFT:
          </span>
          {[3, 2, 1].map((lvl) => {
            const isTarget = currentFloor === lvl
            return (
              <button
                key={lvl}
                onClick={() => navigateToFloor(lvl as 1 | 2 | 3)}
                disabled={isTraveling}
                className={`px-4 py-2.5 rounded-sm border transition-all text-left flex items-center justify-between gap-4 ${
                  isTarget
                    ? 'bg-[#00cccc] text-[#050505] border-[#00cccc] font-semibold shadow-[0_0_20px_rgba(0,204,204,0.3)]'
                    : 'bg-[#111111] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>FLOOR 0{lvl}</span>
                <span className="text-[10px] opacity-75">{lvl === 1 ? '0.00m' : lvl === 2 ? '+2.8m' : '+5.6m'}</span>
              </button>
            )
          })}
        </div>

        {/* Center: Glass Shaft Elevation Cutaway (CSS3D GPU-Accelerated) */}
        <div className="relative w-72 h-[380px] bg-[#0c0c0c] border border-[#00cccc]/30 rounded-sm p-3 shadow-[0_0_35px_rgba(0,204,204,0.1)]">
          {/* Shaft Column Framing */}
          <div className="absolute top-0 bottom-0 left-4 w-1 bg-gradient-to-b from-white/30 via-white/10 to-white/30" />
          <div className="absolute top-0 bottom-0 right-4 w-1 bg-gradient-to-b from-white/30 via-white/10 to-white/30" />

          {/* Guide Rail Center Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10 border-dashed border-l border-white/20" />

          {/* Floor Level Datum Lines */}
          <div className="absolute left-0 right-0 top-[18%] h-[1px] bg-white/15 flex items-center justify-between px-2">
            <span className="font-mono text-[9px] text-[#00cccc] bg-[#0c0c0c] px-1">LVL 03 (+5.60M)</span>
            <span className="font-mono text-[8px] text-white/30">PENTHOUSE</span>
          </div>
          <div className="absolute left-0 right-0 top-[48%] h-[1px] bg-white/15 flex items-center justify-between px-2">
            <span className="font-mono text-[9px] text-[#00cccc] bg-[#0c0c0c] px-1">LVL 02 (+2.80M)</span>
            <span className="font-mono text-[8px] text-white/30">MEZZANINE</span>
          </div>
          <div className="absolute left-0 right-0 top-[78%] h-[1px] bg-white/15 flex items-center justify-between px-2">
            <span className="font-mono text-[9px] text-[#00cccc] bg-[#0c0c0c] px-1">LVL 01 (0.00M)</span>
            <span className="font-mono text-[8px] text-white/30">GROUND FFL</span>
          </div>

          {/* Animated Elevator Carriage */}
          <div
            className="absolute left-6 right-6 h-20 rounded border border-[#00cccc] bg-[#141414]/90 backdrop-blur-sm transition-all ease-in-out shadow-[0_0_25px_rgba(0,204,204,0.25)] flex flex-col justify-between p-2 overflow-hidden"
            style={{
              top: `${floorPositions[currentFloor].topPercent}%`,
              transitionDuration: isTraveling ? '1200ms' : '400ms',
              transitionTimingFunction: 'cubic-bezier(0.35, 0, 0.25, 1)'
            }}
          >
            {/* Cabin Ceiling Downlight */}
            <div className="w-12 h-1 bg-white mx-auto rounded-full shadow-[0_0_8px_#ffffff]" />

            {/* Cabin Glass Facade & Doors */}
            <div className="flex-1 flex items-center justify-between px-1 my-1 relative">
              {/* Left Door Leaf */}
              <div
                className="h-full bg-[#00cccc]/20 border border-[#00cccc]/40 rounded-l transition-all duration-700"
                style={{ width: isDoorsOpen ? '15%' : '48%' }}
              />
              {/* Right Door Leaf */}
              <div
                className="h-full bg-[#00cccc]/20 border border-[#00cccc]/40 rounded-r transition-all duration-700"
                style={{ width: isDoorsOpen ? '15%' : '48%' }}
              />
              {/* Interior Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-mono text-[9px] text-[#00cccc] tracking-widest font-bold">
                  {isTraveling ? '▲ TRANSIT' : 'ALPHA LUX'}
                </span>
              </div>
            </div>

            {/* Cabin Floor Marble Trim */}
            <div className="w-full h-1.5 bg-[#1b1b1b] border-t border-[#00cccc]/50 flex items-center justify-between px-2">
              <span className="w-1 h-1 rounded-full bg-[#00cccc]" />
              <span className="w-1 h-1 rounded-full bg-[#00cccc]" />
            </div>
          </div>

          {/* Zero-Pit Dimension Footer */}
          <div className="absolute bottom-1 left-0 right-0 text-center font-mono text-[8px] text-white/40">
            BASE FOUNDATION // 0 MM TO 100 MM PIT
          </div>
        </div>

        {/* Right: Real-Time Architectural Metrics */}
        <div className="font-mono text-xs space-y-2.5 max-w-xs">
          <div className="p-3 bg-[#111111] border border-white/10 rounded">
            <span className="text-white/40 block text-[10px] uppercase">Active Level Elevation</span>
            <span className="text-[#00cccc] font-semibold text-sm mt-0.5 block">{floorPositions[currentFloor].name}</span>
          </div>

          <div className="p-3 bg-[#111111] border border-white/10 rounded">
            <span className="text-white/40 block text-[10px] uppercase">Laser Micro-Leveling</span>
            <span className="text-white font-medium text-xs mt-0.5 block">± 0.15 mm Closed-Loop Alignment</span>
          </div>

          <div className="p-3 bg-[#111111] border border-white/10 rounded">
            <span className="text-white/40 block text-[10px] uppercase">Acoustic Sound Pressure</span>
            <span className="text-white font-medium text-xs mt-0.5 block">51.4 dB(A) Whisper Kinematics</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/40 border-t border-white/10 pt-3">
        <span>ARCHITECTURAL STANDARD: EN 81-41 BARRIER-FREE</span>
        <span className="text-[#00cccc]">100% SELF-SUPPORTING ALUMINUM GLASS CASING</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MAIN REDESIGNED ARCHITECTURAL ABOUT PAGE (FLUID ANIMATIONS UP & DOWN)
════════════════════════════════════════════════════════════════════ */
export const AboutPage = ({ onBack, onConsultationClick }: AboutPageProps) => {
  const pageContainerRef = useRef<HTMLDivElement>(null)
  const [activeHeroTab, setActiveHeroTab] = useState<'kinematics' | 'cad' | 'specs'>('kinematics')
  const [activeZoneIndex, setActiveZoneIndex] = useState<number>(0)
  const [activeMaterialIndex, setActiveMaterialIndex] = useState<number>(0)
  const [isCadModalOpen, setIsCadModalOpen] = useState<boolean>(false)
  const [activeCadHotspot, setActiveCadHotspot] = useState<string>('dimensions')

  /* ─── Scroll-driven GSAP animations for EVERY container on UP and DOWN scroll ─── */
  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // 1. Animate every container for every up and down scroll
      const containers = pageContainerRef.current?.querySelectorAll('.scroll-container')
      containers?.forEach((container) => {
        gsap.fromTo(
          container,
          {
            opacity: 0,
            y: 35,
            scale: 0.985
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 88%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })

      // 2. Animate decorative lines on every up and down scroll
      const lines = pageContainerRef.current?.querySelectorAll('.scroll-line')
      lines?.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })

      // Refresh ScrollTrigger after initial render to lock in exact geometry
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    }, pageContainerRef)

    return () => ctx.revert()
  }, [])

  /* ─── Architectural Shaft Anatomies ─── */
  const architecturalZones = [
    {
      id: 'headroom',
      tag: 'ZONE 01 // OVERHEAD',
      name: 'MRL Machine-Room-Less Kinematic Drive',
      dimension: 'Headroom: 2400 mm min',
      summary: 'Engineered for seamless architectural integration into standard domestic ceiling lines without roof penetrations or exterior machine room boxes.',
      specs: [
        { label: 'Drive Topology', val: 'Permanent Magnet Synchronous Gearless / Dual-Cylinder Hydraulic' },
        { label: 'Acoustic Signature', val: '< 50 dB(A) at 1.0m (Whisper Quiet Isolation)' },
        { label: 'Ceiling Clearance', val: 'Standard 2400mm (No rooftop mechanical superstructure)' },
        { label: 'Energy Class', val: 'ISO 25745-2 Class A Standby Consumption' }
      ],
      compliance: 'Machinery Directive 2006/42/EC & EN 81-41 Harmonized',
      image: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp'
    },
    {
      id: 'enclosure',
      tag: 'ZONE 02 // SHAFT STRUCTURE',
      name: '360° Panoramic Frameless Glass Enclosure',
      dimension: 'Profile Width: 45 mm Slim Extrusions',
      summary: 'Self-supporting extruded structural aluminum framing combined with ultra-low iron laminated glass, flooding residential stairwells with natural daylight.',
      specs: [
        { label: 'Glass Specification', val: '10mm + 10mm Laminated Toughened Optiwhite (Zero Green Cast)' },
        { label: 'Light Transmittance', val: '99.2% Pristine Visual Clarity' },
        { label: 'Shaft Footprint', val: 'Customizable from 900 × 900mm to 1600 × 1600mm' },
        { label: 'Load Transfer', val: '100% Self-supporting column matrix (No load on existing walls)' }
      ],
      compliance: 'EN 12150-1 Architectural Glass & EN 12600 Pendulum Impact',
      image: 'https://alphaelevators.in/gallery/hydraulic-lifts-in-chennai-ae01-elevators.webp'
    },
    {
      id: 'cabin',
      tag: 'ZONE 03 // CARRIAGE',
      name: 'Laser-Calibrated Floating Cabin & Micro-Leveling',
      dimension: 'Leveling Precision: ± 1.0 mm',
      summary: 'Closed-loop optical sensors coupled with soft-start deceleration curves ensure dead-flush landing threshold alignment, guaranteeing trip-free barrierless mobility.',
      specs: [
        { label: 'Floor Leveling', val: '± 1.0 mm Laser Closed-Loop Optical Guidance' },
        { label: 'Door Threshold', val: 'Zero-step flush transitional bevel' },
        { label: 'Suspension', val: 'Elastomeric acoustic decoupling buffers' },
        { label: 'Interior Clearance', val: '2100mm clear internal cabin ceiling height' }
      ],
      compliance: 'EN 81-41 Barrier-Free Accessibility & Wheelchair Ready',
      image: 'https://alphaelevators.in/gallery/gallery.jpg'
    },
    {
      id: 'foundation',
      tag: 'ZONE 04 // SUB-FLOOR',
      name: 'Zero-Pit Sub-Floor Base Foundation',
      dimension: 'Pit Depth: 0 mm to 100 mm Max',
      summary: 'Eliminates destructive sub-slab excavation. Can be mounted directly on finished floor tiles with an integrated architectural ramp or seated in an ultra-shallow 100mm recess.',
      specs: [
        { label: 'Pit Requirement', val: '0mm (Direct floor mount) or 100mm ultra-shallow drop' },
        { label: 'Water Table Risk', val: '100% immune (No basement excavation or seepage points)' },
        { label: 'Structural Impact', val: 'Preserves existing foundation waterproofing & underfloor piping' },
        { label: 'Installation Velocity', val: 'Cuts civil structural prep timeline by over 60%' }
      ],
      compliance: 'Bureau of Indian Standards IS 14665 & NBC 2016 Compliant',
      image: 'https://alphaelevators.in/nimg/lift-company-in-chennai-residential.webp'
    },
    {
      id: 'safety',
      tag: 'ZONE 05 // FAIL-SAFE MATRIX',
      name: 'Autonomous Multi-Tier Safe Evacuation (ARD)',
      dimension: 'Descent Latency: < 4.0 Seconds',
      summary: 'German supercar-inspired predictive sensor array and high-capacity lithium backup bring the cabin safely to the nearest floor and unlock doors during grid blackouts.',
      specs: [
        { label: 'Emergency Power', val: 'Auxiliary 24V/48V Pure Sine Lithium Array' },
        { label: 'Mechanical Backup', val: 'Manual gravity descent release valve on ground terminal' },
        { label: 'Door Interlocks', val: 'Triple electrical-mechanical microswitch verification' },
        { label: 'Optic Protection', val: '128-beam infrared invisible 3D door curtain' }
      ],
      compliance: 'TUV Rheinland Certified & 2014/33/EU Safety Directive',
      image: 'https://alphaelevators.in/gallery/rope-lift-installation-chennai.webp'
    }
  ]

  /* ─── Architectural Materials Studio ─── */
  const architecturalMaterials = [
    {
      id: 'nero-marquina',
      name: 'Nero Marquina Honed Marble',
      origin: 'Bologna & Basque Extraction',
      lrv: '7.8% (Deep Absorptive)',
      texture: 'Silky Honed Satin Finish',
      idealFor: 'Minimalist Monolithic Villas & Dark Contemporary Atriums',
      desc: 'Selected blocks of deep black metamorphic limestone characterized by irregular white calcite veins. Honed to a low-glare tactile touch that prevents slipping while reflecting warm ambient cabin lighting.',
      colorHex: '#121214',
      badge: 'ITALIAN MARBLE'
    },
    {
      id: 'champagne-brass',
      name: 'Brushed Champagne PVD Brass',
      origin: 'Milanese Metallurgy Studio',
      lrv: '42.5% (Warm Architectural Specular)',
      texture: 'Directional 320-Grit Micro-Hairline',
      idealFor: 'Classic Warm Residential Palettes & High-End Bronze Joinery',
      desc: 'Titanium-nitride physical vapor deposition over architectural brass alloy. Resists fingerprints, environmental oxidation, and humidity while providing an opulent yet restrained architectural accent.',
      colorHex: '#c8a876',
      badge: 'PVD TITANIUM'
    },
    {
      id: 'optiwhite-glass',
      name: 'Aviation Optiwhite Low-Iron Glass',
      origin: 'Saint-Gobain Precision Lamination',
      lrv: '91.4% (Ultra-High Transmission)',
      texture: 'Crystal Clear Non-Diffusive Optical',
      idealFor: 'Open-Well Atriums, Spiral Staircases & Daylit Skywells',
      desc: 'De-ironed float glass eliminating the customary greenish edge tint of ordinary glass. Yields pure chromatic neutrality and permits 99.2% visible light transmission through 20mm laminated structural assemblies.',
      colorHex: '#e4f7f7',
      badge: 'OPTICAL CRYSTAL'
    },
    {
      id: 'smoked-mirror',
      name: 'Smoked Titanium Bronze Mirror',
      origin: 'Venetian Architectural Glassworks',
      lrv: '24.1% (Subdued Spatial Depth)',
      texture: 'Acoustically Damped Back-Coating',
      idealFor: 'Elevating Cabin Spatial Perception Without Harsh Glare',
      desc: 'Sputtered titanium metal oxide layer over tinted glass, creating dramatic spatial infinity while concealing structural behind-wall cable guides and acoustic dampening panels.',
      colorHex: '#453833',
      badge: 'ACOUSTIC MIRROR'
    },
    {
      id: 'acoustic-walnut',
      name: 'Acoustic Perforated American Walnut',
      origin: 'FSC-Certified Architectural Timber',
      lrv: '18.2% (Warm Organic)',
      texture: 'Micro-Grooved Fluted Timber Slats',
      idealFor: 'Biophilic Luxury Residences & Natural Material Palettes',
      desc: 'Precision CNC-machined architectural flutes backed by sound-dampening acoustic fleece. Absorbs mechanical high frequencies while infusing the elevator cabin with natural tactile warmth.',
      colorHex: '#5e4330',
      badge: 'ARCHITECTURAL WOOD'
    }
  ]

  /* ─── Architectural Pillars Data ─── */
  const architecturalPillars = [
    {
      num: '01',
      code: 'SPEC // KINEMATICS',
      title: 'Italian Fluid Kinematics & Precision',
      desc: 'Mechanisms engineered in Northern Italy utilizing low-noise proportional flow control and permanent magnet synchronous motors. Delivers imperceptible acceleration and deceleration curves that feel effortless.',
      metrics: '0.3 to 0.65 m/s Variable Acceleration',
      icon: Compass
    },
    {
      num: '02',
      code: 'SPEC // SPATIAL',
      title: 'Bespoke Structural Zero-Impact Integration',
      desc: 'Engineered specifically for architectural retrofits and newly designed luxury villas. Requiring zero machine rooms and either zero or a shallow 100mm pit, our lifts integrate gracefully into any spatial layout.',
      metrics: 'Zero Headroom Penalty // 0mm Pit Capable',
      icon: Ruler
    },
    {
      num: '03',
      code: 'SPEC // RESILIENCE',
      title: 'Tropical Climatization & Grid Hardening',
      desc: 'Engineered for continuous duty in 50°C ambient temperatures with triple-stage surge and brownout suppression, shielding sensitive solid-state drives against Indian grid fluctuations from 160V to 260V.',
      metrics: '50°C Ambient Duty // 160V-260V Auto-Regulated',
      icon: Cpu
    },
    {
      num: '04',
      code: 'SPEC // LIFE-CYCLE',
      title: 'Hermetic Durability & Lifecycle Support',
      desc: 'From 10-year sealed hydraulic fluid chambers to steel-cord polyurethane silent belts that require zero oil lubrication, Alpha lifts deliver decades of whisper-quiet luxury with factory-certified technicians.',
      metrics: '10-Year Fluid Seal // 24/7 Rapid Diagnostics',
      icon: ShieldCheck
    }
  ]

  /* ─── Engineering Chronology ─── */
  const chronology = [
    {
      year: '2016',
      phase: 'PHASE 01',
      title: 'The Engineering Genesis',
      detail: 'A consortium of elevator industry veterans with nearly a decade of technical field experience founded Alpha Elevators to solve the architectural compromises plaguing Indian residential lifts.'
    },
    {
      year: '2019',
      phase: 'PHASE 02',
      title: 'Bologna Engineering Alliance',
      detail: 'Formed strategic technical partnerships with Northern Italian hydraulic and gearless drive manufacturers to introduce international kinematic standards tailored to Indian tropical environments.'
    },
    {
      year: '2022',
      phase: 'PHASE 03',
      title: 'Self-Supporting Zero-Pit Architecture',
      detail: 'Pioneered proprietary extruded aluminum structural glass shaft framing that completely eliminates the need for civil concrete shafts, deep pits, or rooftop machine rooms.'
    },
    {
      year: '2024',
      phase: 'PHASE 04',
      title: 'Next-Gen Belt Drive & Supercar Telemetry',
      detail: 'Unveiled the AE-03 Polyurethane Steel-Cord series featuring predictive false-detection acoustic sensors inspired by German automotive diagnostics.'
    },
    {
      year: 'PRESENT',
      phase: 'PHASE 05',
      title: '500+ Landmark Residences Across South India',
      detail: 'The premier choice for leading architects, luxury villa owners, and interior design studios across Chennai, Coimbatore, Bangalore, and Kochi.'
    }
  ]

  const handleCadModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCadModalOpen(false)
    if (onConsultationClick) {
      onConsultationClick(
        `Architectural CAD Request: Selected Zone: ${architecturalZones[activeZoneIndex].name}, Selected Finish: ${architecturalMaterials[activeMaterialIndex].name}. Please send .DWG/.BIM shaft dimensions and schedule a site survey.`
      )
    }
  }

  return (
    <div
      ref={pageContainerRef}
      className="relative min-h-screen bg-[#050505] text-[#f5f5f5] w-full overflow-x-hidden font-sans selection:bg-[#00cccc]/30 selection:text-white"
    >
      {/* ═══════════════════════════════════════════════════════════
          ARCHITECTURAL HUD & FIXED NAVIGATION
      ═══════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Back button */}
          <div className="flex items-center gap-6">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Return to residence home"
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center group-hover:border-[#00cccc] group-hover:bg-[#00cccc]/10 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 text-white/80 group-hover:text-[#00cccc] transition-transform duration-300 group-hover:-translate-x-0.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#00cccc] uppercase">RETURN</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-white/90">Residence View</span>
                </div>
              </button>
            )}

            <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

            {/* Architectural Telemetry Badges */}
            <div className="hidden lg:flex items-center gap-4 text-white/40 font-mono text-[11px] tracking-wider">
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="w-2 h-2 rounded-full bg-[#00cccc] animate-pulse" />
                ALPHA ARCHITECTURAL STUDIO
              </span>
              <span>//</span>
              <span>DATUM: 13.0827°N, 80.2707°E</span>
              <span>//</span>
              <span className="text-[#00cccc]/80">HARMONIZED: EN 81-41</span>
            </div>
          </div>

          {/* Quick Actions & Brand */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => onConsultationClick?.('Request for Architectural CAD/DWG Drawing Package (.DWG, .BIM, .PDF), structural shaft load bearing calculations & electrical specifications.')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-sm border border-[#00cccc]/40 bg-[#00cccc]/10 hover:bg-[#00cccc] hover:text-[#050505] text-[#00cccc] text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,204,204,0.15)] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Request CAD/DWG</span>
            </button>

            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Alpha Elevators Logo" className="h-7 w-auto object-contain opacity-90" />
            </div>
          </div>
        </div>

        {/* Blueprint Datum Tick Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00cccc]/40 to-transparent" />
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO: ARCHITECTURAL MANIFESTO & SPATIAL KINEMATICS
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden flex flex-col justify-between border-b border-white/[0.08]">
        {/* Subtle Architectural Drafting Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,204,204,0.12),rgba(5,5,5,0.98))] pointer-events-none" />

        {/* Architectural Crosshair Corner Markers */}
        <div className="absolute top-36 left-8 text-white/20 font-mono text-xs select-none pointer-events-none">+ 00.000</div>
        <div className="absolute top-36 right-8 text-white/20 font-mono text-xs select-none pointer-events-none">+ 14.200M</div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          {/* Top Architectural Subtitle & Coordinate Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-10 scroll-container">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#00cccc]" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00cccc]">
                ARCHITECTURAL DISCOURSE // LUXURY RESIDENTIAL KINEMATICS
              </span>
            </div>
            <div className="font-mono text-xs text-white/40 tracking-widest hidden md:block">
              SERIES: AE-ARCH-2026 // BOLOGNA × CHENNAI
            </div>
          </div>

          {/* Master Architectural Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
            <div className="lg:col-span-8 scroll-container">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-light uppercase tracking-tight leading-[0.96] text-white">
                Vertical Space.{' '}
                <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#00cccc]">
                  Precision Kinematics.
                </span>
              </h1>

              <div className="w-28 h-[2px] bg-[#00cccc] my-8 scroll-line" />

              <p className="text-[#b8b8b8] text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
                We craft residential vertical mobility as an authentic architectural statement. Uniting Northern Italian mechanical kinematics with precision Indian engineering, Alpha Elevators elevates luxury villas into environments of silent, effortless vertical passage.
              </p>
            </div>

            {/* Right Quick Telemetry Card */}
            <div className="lg:col-span-4 scroll-container">
              <div className="bg-[#101010]/90 border border-white/10 rounded-sm p-6 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00cccc]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00cccc]">ARCHITECTURAL DOSSIER</span>
                  <span className="font-mono text-[10px] text-white/40">VERIFIED SPEC</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Core Philosophy</span>
                    <span className="text-white font-medium">Bespoke Architectural Integration</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Engineering Standards</span>
                    <span className="text-white font-medium">EN 81-41 / MD 2006/42/EC</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Structural Civil Impact</span>
                    <span className="text-[#00cccc] font-medium">Zero Pit / Zero Machine Room</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/50">Acoustic Rating</span>
                    <span className="text-white font-medium">&lt; 52 dB(A) Whisper Drive</span>
                  </div>
                </div>

                <button
                  onClick={() => onConsultationClick?.('Download CAD Technical Sheet: Request for comprehensive shaft elevation blueprints (.DWG / .PDF) and civil specification document.')}
                  className="mt-6 w-full py-3 bg-white/5 hover:bg-[#00cccc] hover:text-[#050505] text-[#00cccc] border border-[#00cccc]/30 transition-all duration-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CAD Technical Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── INTERACTIVE ARCHITECTURAL VIEWPORT (KINEMATICS / CAD / SPECS) ─── */}
          <div className="scroll-container mt-4 w-full bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            {/* Viewport Header Controls */}
            <div className="px-6 py-4 bg-[#111111] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#00cccc] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00cccc]" />
                  INTERACTIVE SHAFT ELEVATION
                </span>
                <span className="hidden sm:inline-block text-white/30 text-xs">|</span>
                <span className="hidden sm:inline-block font-mono text-xs text-white/50">
                  MODEL: AE-LUX-2026 // FAST KINEMATICS ENGINE
                </span>
              </div>

              {/* View Mode Switcher Tabs */}
              <div className="flex items-center bg-[#050505] p-1 rounded border border-white/10">
                <button
                  onClick={() => setActiveHeroTab('kinematics')}
                  className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all rounded-sm flex items-center gap-2 ${
                    activeHeroTab === 'kinematics'
                      ? 'bg-[#00cccc] text-[#050505] font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Kinematics Visualizer</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('cad')}
                  className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all rounded-sm flex items-center gap-2 ${
                    activeHeroTab === 'cad'
                      ? 'bg-[#00cccc] text-[#050505] font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Ruler className="w-3 h-3" />
                  <span>CAD Blueprint</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('specs')}
                  className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all rounded-sm flex items-center gap-2 ${
                    activeHeroTab === 'specs'
                      ? 'bg-[#00cccc] text-[#050505] font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Structural Specs</span>
                </button>
              </div>
            </div>

            {/* Viewport Content */}
            <div className="relative w-full min-h-[500px] md:h-[560px] bg-gradient-to-b from-[#0e0e0e] to-[#070707] flex items-center justify-center overflow-hidden">
              {/* TAB 1: KINEMATICS SIMULATOR (ZERO GPU LAG, INSTANT 60FPS) */}
              {activeHeroTab === 'kinematics' && (
                <div className="w-full h-full">
                  <ArchitecturalKinematicsVisualizer />
                </div>
              )}

              {/* TAB 2: CAD BLUEPRINT SCHEMATIC */}
              {activeHeroTab === 'cad' && (
                <div className="w-full h-full relative p-6 md:p-12 flex flex-col justify-between overflow-y-auto">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00cccc08_1px,transparent_1px),linear-gradient(to_bottom,#00cccc08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  {/* Top CAD Header */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#00cccc]/20 pb-4">
                    <div>
                      <span className="text-[#00cccc]">SHEET: A-102 ELEVATION</span> | SCALE: 1:25 | VILLA SHAFT SECTION
                    </div>
                    <div className="text-white/60">TOLERANCE: ±0.50MM // STRUCTURAL ALUMINUM</div>
                  </div>

                  {/* CAD Vector Drafting Visual */}
                  <div className="relative z-10 my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto w-full">
                    <div className="md:col-span-5 flex justify-center">
                      {/* SVG CAD Shaft Diagram */}
                      <svg viewBox="0 0 240 380" className="w-56 h-auto drop-shadow-[0_0_15px_rgba(0,204,204,0.2)]">
                        {/* Outer Shaft Blueprint Outline */}
                        <rect x="30" y="20" width="180" height="340" fill="none" stroke="#00cccc" strokeWidth="1.5" strokeDasharray="6 3" />
                        {/* Center Datum Line */}
                        <line x1="120" y1="10" x2="120" y2="370" stroke="#00cccc" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                        
                        {/* Floor Level Indicators */}
                        <line x1="15" y1="70" x2="225" y2="70" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                        <text x="185" y="65" fill="#ffffff" opacity="0.7" fontSize="8" fontFamily="monospace">LVL +3.00M</text>
                        
                        <line x1="15" y1="230" x2="225" y2="230" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                        <text x="185" y="225" fill="#ffffff" opacity="0.7" fontSize="8" fontFamily="monospace">LVL +0.00M (FFL)</text>

                        {/* Elevator Car Body */}
                        <rect x="45" y="110" width="150" height="115" fill="#00cccc" fillOpacity="0.08" stroke="#00cccc" strokeWidth="2" />
                        
                        {/* Laminated Glass Front */}
                        <line x1="55" y1="115" x2="185" y2="115" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
                        
                        {/* Dimension Line Width */}
                        <line x1="45" y1="245" x2="195" y2="245" stroke="#00cccc" strokeWidth="1" />
                        <line x1="45" y1="240" x2="45" y2="250" stroke="#00cccc" strokeWidth="1" />
                        <line x1="195" y1="240" x2="195" y2="250" stroke="#00cccc" strokeWidth="1" />
                        <text x="95" y="260" fill="#00cccc" fontSize="9" fontFamily="monospace">WIDTH: 1400 MM</text>

                        {/* Dimension Line Headroom */}
                        <line x1="15" y1="20" x2="15" y2="70" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                        <text x="18" y="48" fill="#ffffff" opacity="0.8" fontSize="8" fontFamily="monospace" transform="rotate(-90 18 48)">HEADROOM 2400</text>

                        {/* Hotspot 1: Headroom */}
                        <circle cx="120" cy="45" r="7" fill="#00cccc" fillOpacity="0.3" stroke="#00cccc" strokeWidth="1.5" />
                        <circle cx="120" cy="45" r="5" fill="#00cccc" />
                        <text x="117" y="48" fill="#000000" fontSize="7" fontWeight="bold">1</text>

                        {/* Hotspot 2: Cabin */}
                        <circle cx="120" cy="165" r="5" fill="#00cccc" />
                        <text x="117" y="168" fill="#000000" fontSize="7" fontWeight="bold">2</text>

                        {/* Hotspot 3: Zero Pit */}
                        <circle cx="120" cy="350" r="5" fill="#00cccc" />
                        <text x="117" y="353" fill="#000000" fontSize="7" fontWeight="bold">3</text>
                      </svg>
                    </div>

                    {/* Interactive Hotspot Inspector */}
                    <div className="md:col-span-7 space-y-3 font-mono text-xs">
                      <div className="text-[#00cccc] tracking-widest uppercase mb-2">HOTSPOT TECHNICAL READOUT</div>
                      
                      <div
                        onClick={() => setActiveCadHotspot('headroom')}
                        className={`p-3 rounded border transition-all cursor-pointer ${
                          activeCadHotspot === 'headroom' ? 'bg-[#00cccc]/10 border-[#00cccc]' : 'bg-[#121212] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-white font-semibold">
                          <span>[1] OVERHEAD CLEARANCE (2400mm)</span>
                          <span className="text-[#00cccc]">NO ROOF PENETRATION</span>
                        </div>
                        <p className="text-white/60 text-[11px] mt-1 font-sans">
                          Fits flush beneath standard domestic top-floor ceilings. Avoids unsightly rooftop room extensions that disrupt architectural villa elevations.
                        </p>
                      </div>

                      <div
                        onClick={() => setActiveCadHotspot('dimensions')}
                        className={`p-3 rounded border transition-all cursor-pointer ${
                          activeCadHotspot === 'dimensions' ? 'bg-[#00cccc]/10 border-[#00cccc]' : 'bg-[#121212] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-white font-semibold">
                          <span>[2] STRUCTURAL GLASS CABIN & SHAFT</span>
                          <span className="text-[#00cccc]">SELF-SUPPORTING</span>
                        </div>
                        <p className="text-white/60 text-[11px] mt-1 font-sans">
                          1400mm × 1550mm standard external footprint with 82% usable floor utilization. Self-supporting columns eliminate load on villa masonry.
                        </p>
                      </div>

                      <div
                        onClick={() => setActiveCadHotspot('pit')}
                        className={`p-3 rounded border transition-all cursor-pointer ${
                          activeCadHotspot === 'pit' ? 'bg-[#00cccc]/10 border-[#00cccc]' : 'bg-[#121212] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-white font-semibold">
                          <span>[3] FOUNDATION BASE (0mm - 100mm)</span>
                          <span className="text-[#00cccc]">ZERO EXCAVATION</span>
                        </div>
                        <p className="text-white/60 text-[11px] mt-1 font-sans">
                          Preserves basement waterproofing membranes. Zero civil floor trenching prevents groundwater ingress and sub-floor pipe damage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STRUCTURAL SPECS TABLE */}
              {activeHeroTab === 'specs' && (
                <div className="w-full h-full p-6 md:p-12 overflow-y-auto font-mono text-xs">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="border-b border-[#00cccc]/30 pb-4 flex justify-between items-center">
                      <div>
                        <span className="text-[#00cccc] font-semibold text-sm">ARCHITECTURAL SPECIFICATION MATRIX</span>
                        <p className="text-white/50 text-[11px] font-sans mt-0.5">Parameters validated according to European Lift Directive 2014/33/EU</p>
                      </div>
                      <span className="bg-[#00cccc]/10 text-[#00cccc] px-3 py-1 rounded text-[10px] tracking-widest uppercase">
                        CLASS A EFFICIENCY
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { param: 'Rated Load Capacity', value: '300 kg – 500 kg (4 to 6 Persons)' },
                        { param: 'Maximum Travel Height', value: 'Up to 18.0 Meters (G + 5 Stops)' },
                        { param: 'Speed Spectrum', value: '0.30 m/s to 0.65 m/s Smooth Ramp' },
                        { param: 'Pit Depth Requirement', value: '0 mm (with bevel ramp) or 100 mm drop' },
                        { param: 'Headroom Clearance', value: '2400 mm minimum at top floor' },
                        { param: 'Operating Power', value: 'Single Phase 230V / 3-Phase 415V (2.2 kW)' },
                        { param: 'Shaft Enclosure', value: 'Anodized Aluminum + 10+10mm Optiwhite Glass' },
                        { param: 'Acoustic Decibel Threshold', value: '< 52 dB(A) Measured at 1 Meter' },
                        { param: 'Emergency Descent (ARD)', value: 'Auxiliary Lithium Battery + Manual Gravity' },
                        { param: 'Door Operation', value: 'Automatic Telescopic / Semi-Automatic Glass' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-[#121212] border border-white/5 rounded flex justify-between items-center">
                          <span className="text-white/60">{item.param}</span>
                          <span className="text-[#00cccc] font-medium text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Blueprint Key Performance Metrics Strip (Lightweight Counters) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col scroll-container">
              <span className="font-mono text-3xl md:text-5xl font-light text-white flex items-baseline">
                <LightweightCounter end={0.15} decimals={2} suffix=" mm" duration={1400} />
              </span>
              <span className="text-[#00cccc] font-mono text-[11px] tracking-widest uppercase mt-2">Leveling Tolerance</span>
              <span className="text-white/40 text-xs font-light mt-1">Laser closed-loop floor alignment</span>
            </div>

            <div className="flex flex-col scroll-container">
              <span className="font-mono text-3xl md:text-5xl font-light text-white flex items-baseline">
                <LightweightCounter end={52} decimals={0} suffix=" dB(A)" duration={1400} />
              </span>
              <span className="text-[#00cccc] font-mono text-[11px] tracking-widest uppercase mt-2">Acoustic Footprint</span>
              <span className="text-white/40 text-xs font-light mt-1">Whisper-quiet structural dampening</span>
            </div>

            <div className="flex flex-col scroll-container">
              <span className="font-mono text-3xl md:text-5xl font-light text-white flex items-baseline">
                0 mm
              </span>
              <span className="text-[#00cccc] font-mono text-[11px] tracking-widest uppercase mt-2">Zero-Pit Capable</span>
              <span className="text-white/40 text-xs font-light mt-1">Zero sub-floor foundation trenching</span>
            </div>

            <div className="flex flex-col scroll-container">
              <span className="font-mono text-3xl md:text-5xl font-light text-white flex items-baseline">
                <LightweightCounter end={10} decimals={0} suffix="-Year" duration={1400} />
              </span>
              <span className="text-[#00cccc] font-mono text-[11px] tracking-widest uppercase mt-2">Sealed Fluid Life</span>
              <span className="text-white/40 text-xs font-light mt-1">Hermetic European hydraulic unit</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — THE ARCHITECTURAL DUALITY (BOLOGNA × CHENNAI)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#070707] border-b border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20 scroll-container">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#00cccc] scroll-line" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00cccc]">THE ENGINEERING PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
              Two World Centers.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00cccc]">
                One Uncompromising Vision.
              </span>
            </h2>
            <p className="text-[#b8b8b8] text-base md:text-lg font-light leading-relaxed mt-6">
              Alpha Elevators was founded on a singular architectural thesis: that the world’s finest residential elevators must synthesize European kinematic refinement with relentless tropical climate resilience.
            </p>
          </div>

          {/* Duality Architectural Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Milan Kinematics Studio */}
            <div className="bg-[#0e0e0e] border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden group hover:border-[#00cccc]/40 transition-all duration-300 scroll-container">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <span className="font-mono text-xs tracking-[0.25em] text-[#00cccc] uppercase">DESIGN & KINEMATICS HUB</span>
                <span className="font-mono text-xs text-white/40">BOLOGNA / MILANO, ITALY</span>
              </div>

              <div className="w-14 h-14 rounded-full border border-[#00cccc]/30 bg-[#00cccc]/5 flex items-center justify-center text-[#00cccc] mb-6">
                <Compass className="w-7 h-7" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light uppercase tracking-wide text-white mb-4">
                Italian Mechanical Kinematics & Aesthetics
              </h3>

              <p className="text-[#b8b8b8] font-light leading-relaxed mb-8">
                Every propulsion assembly, proportional valve, and VVVF control module reflects decades of Northern Italian precision machinery. We engineer fluid, jerk-free vertical acceleration curves that move residential passengers with the quiet grace of fine horology.
              </p>

              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Permanent Magnet Synchronous Kinematics</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Saint-Gobain Optiwhite Laminated Architectural Glass</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Capacitive Touchless Car Operating Panels</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>10-Year Sealed Anti-Spill Hydraulic Fluid Enclosures</span>
                </div>
              </div>
            </div>

            {/* Card 2: Chennai Fabrication Works */}
            <div className="bg-[#0e0e0e] border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden group hover:border-[#00cccc]/40 transition-all duration-300 scroll-container">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <span className="font-mono text-xs tracking-[0.25em] text-[#00cccc] uppercase">ENGINEERING & CLIMATIZATION</span>
                <span className="font-mono text-xs text-white/40">CHENNAI / TAMIL NADU, INDIA</span>
              </div>

              <div className="w-14 h-14 rounded-full border border-[#00cccc]/30 bg-[#00cccc]/5 flex items-center justify-center text-[#00cccc] mb-6">
                <Cpu className="w-7 h-7" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light uppercase tracking-wide text-white mb-4">
                Indian Environmental Hardening & Structural Craft
              </h3>

              <p className="text-[#b8b8b8] font-light leading-relaxed mb-8">
                European machinery transplanted into South India frequently struggles with humidity, thermal stress, and power volatility. Alpha Elevators specifically re-engineers every subsystem with heavy-duty thermal sinks, surge isolation, and anti-corrosive marine-grade alloys.
              </p>

              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Continuous 50°C Ambient Duty Thermal Rating</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Triple-Stage Power Voltage Regulation (160V – 260V)</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Tropical Monsoon Hermetic Sealing & Coastal Hardening</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#00cccc]" />
                  <span>Bespoke On-Site Millimeter-Precision Villa Fabrication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — INTERACTIVE ARCHITECTURAL SHAFT ANATOMY
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#050505] border-b border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 scroll-container">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#00cccc] scroll-line" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00cccc]">STRUCTURAL INTEGRATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
                Architectural Shaft Anatomy.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00cccc]">
                  Layer by Layer.
                </span>
              </h2>
            </div>
            <p className="text-[#b8b8b8] text-sm md:text-base font-light max-w-md">
              Select any architectural zone of the residential elevator shaft to examine its technical tolerances, materials, and compliance directives.
            </p>
          </div>

          {/* Interactive Zone Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Zone Selector Buttons (Left Column) */}
            <div className="lg:col-span-5 space-y-3 scroll-container">
              {architecturalZones.map((zone, idx) => {
                const isActive = activeZoneIndex === idx
                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneIndex(idx)}
                    className={`w-full text-left p-5 rounded-sm border transition-all duration-300 relative overflow-hidden group ${
                      isActive
                        ? 'bg-[#121212] border-[#00cccc] shadow-[0_0_25px_rgba(0,204,204,0.15)]'
                        : 'bg-[#0a0a0a] border-white/5 hover:border-white/20 hover:bg-[#0f0f0f]'
                    }`}
                  >
                    {isActive && <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00cccc]" />}
                    <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                      <span className={isActive ? 'text-[#00cccc]' : 'text-white/40'}>{zone.tag}</span>
                      <span className="text-white/40 text-[10px]">{zone.dimension}</span>
                    </div>
                    <h3 className={`text-base md:text-lg font-light uppercase tracking-wider transition-colors ${
                      isActive ? 'text-white font-normal' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {zone.name}
                    </h3>
                  </button>
                )
              })}
            </div>

            {/* Zone Technical Dossier (Right Column) */}
            <div className="lg:col-span-7 scroll-container">
              {(() => {
                const zone = architecturalZones[activeZoneIndex]
                return (
                  <div className="bg-[#0e0e0e] border border-white/10 rounded-sm p-8 md:p-10 relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8">
                      <div>
                        <span className="font-mono text-xs text-[#00cccc] uppercase tracking-widest">{zone.tag}</span>
                        <h3 className="text-2xl md:text-3xl font-light uppercase tracking-wide text-white mt-1">
                          {zone.name}
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-xs text-[#00cccc] rounded-sm">
                        {zone.dimension}
                      </span>
                    </div>

                    <p className="text-[#b8b8b8] text-base md:text-lg font-light leading-relaxed mb-8">
                      {zone.summary}
                    </p>

                    {/* Zone Image Showcase */}
                    <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-white/10 mb-8">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-mono text-[10px] text-white/70">
                        FIELD INSTALLATION PHOTOGRAPHY // TAMIL NADU
                      </div>
                    </div>

                    {/* Specification Parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-8">
                      {zone.specs.map((item, i) => (
                        <div key={i} className="p-3 bg-[#080808] border border-white/5 rounded-sm">
                          <span className="text-white/40 block text-[10px] uppercase">{item.label}</span>
                          <span className="text-white font-medium mt-1 block">{item.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Compliance Directive */}
                    <div className="flex items-center gap-3 p-4 bg-[#00cccc]/5 border border-[#00cccc]/20 rounded-sm font-mono text-xs text-[#00cccc]">
                      <ShieldCheck className="w-5 h-5 shrink-0" />
                      <span>COMPLIANCE SPECIFICATION: {zone.compliance}</span>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — ARCHITECTURAL MATERIAL & FINISHES STUDIO
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#080808] border-b border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-20 scroll-container">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#00cccc] scroll-line" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00cccc]">MATERIALITY & BESPOKE FINISHES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
              Curated Materials.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00cccc]">
                Architectural Harmony.
              </span>
            </h2>
            <p className="text-[#b8b8b8] text-base md:text-lg font-light leading-relaxed mt-6">
              A luxury residential elevator is architectural cabinetry in motion. We collaborate directly with interior designers and architects, offering a palette of hand-selected Italian stones, vacuum-deposited titanium metallics, and acoustic fluted hardwoods.
            </p>
          </div>

          {/* Interactive Material Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Swatch Navigation (Left 4 cols) */}
            <div className="lg:col-span-5 space-y-3 scroll-container">
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">
                SELECT ARCHITECTURAL FINISH PALETTE:
              </span>
              {architecturalMaterials.map((mat, idx) => {
                const isSelected = activeMaterialIndex === idx
                return (
                  <button
                    key={mat.id}
                    onClick={() => setActiveMaterialIndex(idx)}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#141414] border-[#00cccc] shadow-[0_0_20px_rgba(0,204,204,0.12)]'
                        : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Swatch Color Circle with metallic border */}
                      <div
                        className="w-8 h-8 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <div>
                        <span className="text-sm font-medium text-white block uppercase tracking-wider">{mat.name}</span>
                        <span className="font-mono text-[11px] text-white/40">{mat.badge}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#00cccc] translate-x-1' : 'text-white/20'}`} />
                  </button>
                )
              })}
            </div>

            {/* Material Inspection Dossier (Right 7 cols) */}
            <div className="lg:col-span-7 scroll-container">
              {(() => {
                const mat = architecturalMaterials[activeMaterialIndex]
                return (
                  <div className="bg-[#101010] border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <span className="font-mono text-xs text-[#00cccc] uppercase tracking-widest">{mat.badge}</span>
                      <span className="font-mono text-xs text-white/40">ORIGIN: {mat.origin}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light uppercase tracking-wide text-white mb-4">
                      {mat.name}
                    </h3>

                    <p className="text-[#b8b8b8] text-base md:text-lg font-light leading-relaxed mb-8">
                      {mat.desc}
                    </p>

                    {/* Technical Material Metric HUD */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-8">
                      <div className="p-4 bg-[#080808] border border-white/5 rounded-sm">
                        <span className="text-white/40 block text-[10px] uppercase">Light Reflectance Value (LRV)</span>
                        <span className="text-[#00cccc] font-semibold text-sm mt-1 block">{mat.lrv}</span>
                      </div>
                      <div className="p-4 bg-[#080808] border border-white/5 rounded-sm">
                        <span className="text-white/40 block text-[10px] uppercase">Surface Tactile Metric</span>
                        <span className="text-white font-medium text-xs mt-1 block">{mat.texture}</span>
                      </div>
                    </div>

                    {/* Architectural Pairing Tip */}
                    <div className="p-4 bg-white/[0.03] border-l-2 border-[#00cccc] font-sans text-xs text-white/70">
                      <span className="font-mono text-[#00cccc] uppercase tracking-widest block mb-1">ARCHITECTURAL PAIRING:</span>
                      {mat.idealFor}
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (onConsultationClick) {
                            onConsultationClick(`Material Sample Request: ${mat.name} (${mat.badge}). Please dispatch physical architectural sample kit.`)
                          } else {
                            setIsCadModalOpen(true)
                          }
                        }}
                        className="px-6 py-2.5 bg-white/5 hover:bg-[#00cccc] hover:text-[#050505] text-[#00cccc] border border-[#00cccc]/30 transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Request Physical Swatch Kit</span>
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — THE FOUR ARCHITECTURAL PILLARS (MATRIX)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#050505] border-b border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-container">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#00cccc] block mb-3">
              FOUNDATIONAL ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
              The Four Engineering Pillars
            </h2>
            <div className="w-20 h-[2px] bg-[#00cccc] mx-auto my-6 scroll-line" />
            <p className="text-[#b8b8b8] text-base font-light">
              Architectural integrity is never accidental. It is the cumulative result of strict mechanical tolerances, deliberate material selection, and rigorous quality governance.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architecturalPillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="bg-[#0b0b0b] border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden group hover:border-[#00cccc]/40 transition-all duration-300 scroll-container"
                >
                  <span className="absolute -top-4 -right-4 font-mono text-[7rem] font-bold text-white/[0.02] group-hover:text-[#00cccc]/[0.05] transition-colors pointer-events-none select-none">
                    {pillar.num}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs tracking-[0.25em] text-[#00cccc]">{pillar.code}</span>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#00cccc] bg-white/[0.02]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-light uppercase tracking-wide text-white mb-4 group-hover:text-[#00cccc] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-[#b8b8b8] font-light text-base leading-relaxed mb-6">
                      {pillar.desc}
                    </p>

                    <div className="p-3 bg-[#121212] border border-white/5 rounded font-mono text-xs text-[#00cccc]">
                      {pillar.metrics}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — REGULATORY STANDARDS & CERTIFICATIONS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#070707] border-b border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 scroll-container">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#00cccc] scroll-line" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00cccc]">GLOBAL STATUTORY COMPLIANCE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
                Architectural Safety & Directives
              </h2>
            </div>
            <p className="text-[#b8b8b8] text-sm md:text-base font-light max-w-md">
              Every Alpha Elevator conforms to stringent European and Indian safety directives, providing architects complete confidence during building approval and commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                code: 'EN 81-41',
                title: 'European Standard for Home Lifts',
                detail: 'Governs vertical lifting platforms for persons with or without impaired mobility, mandating perimeter clearances and fail-safe speeds.'
              },
              {
                code: 'MD 2006/42/EC',
                title: 'European Machinery Directive',
                detail: 'Comprehensive European legislative framework ensuring mechanical component integrity, structural factor of safety, and electrical containment.'
              },
              {
                code: 'IS 14665 & NBC',
                title: 'National Building Code of India',
                detail: 'Strict compliance with the Bureau of Indian Standards codes governing electric traction, hydraulic power units, and passenger containment.'
              },
              {
                code: 'CE CONFORMITY',
                title: 'European Harmonized Declaration',
                detail: 'Every safety brake, hydraulic governor valve, and lock mechanism carries official CE verification markings and traceable batch documentation.'
              },
              {
                code: 'ISO 9001:2015',
                title: 'Quality Management Certification',
                detail: 'Audited manufacturing processes ensuring zero component deviation, traceable laser calibrations, and systematic commissioning logs.'
              },
              {
                code: 'GREEN RATING A',
                title: 'ISO 25745-2 Energy Benchmark',
                detail: 'Standby regenerative power management and LED smart-off illumination granting Class A building sustainability credentials.'
              }
            ].map((cert, idx) => (
              <div key={idx} className="p-6 bg-[#0e0e0e] border border-white/10 rounded-sm scroll-container">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#00cccc] font-semibold">{cert.code}</span>
                  <Award className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="text-base font-medium text-white mb-2 uppercase tracking-wider">{cert.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed font-light">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — CHRONOLOGY OF PRECISION (TRAJECTORY)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#050505] border-b border-white/[0.08] relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-container">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#00cccc] block mb-3">
              THE DECADE TRAJECTORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
              A Decade of Precision Engineering
            </h2>
            <div className="w-20 h-[2px] bg-[#00cccc] mx-auto my-6 scroll-line" />
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-16 space-y-16">
            {chronology.map((item, idx) => (
              <div key={idx} className="relative group scroll-container">
                {/* Timeline node */}
                <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00cccc] group-hover:scale-125 transition-transform" />

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                  <span className="font-mono text-2xl font-light text-[#00cccc]">{item.year}</span>
                  <span className="font-mono text-xs text-white/40 tracking-widest uppercase">{item.phase}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-light uppercase tracking-wide text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-[#b8b8b8] text-base font-light leading-relaxed max-w-2xl">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — ARCHITECT & BUILDER SPECIFICATION PORTAL (CTA)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-44 px-6 md:px-12 lg:px-20 bg-[#070707] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,204,204,0.1),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center scroll-container">
          <div className="w-16 h-16 rounded-full border border-[#00cccc]/40 bg-[#00cccc]/10 flex items-center justify-center text-[#00cccc] mb-8">
            <Building2 className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs tracking-[0.35em] text-[#00cccc] uppercase mb-4">
            ARCHITECTURAL COLLABORATION
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-white leading-tight">
            Design With Uncompromising{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00cccc]">
              Vertical Freedom.
            </span>
          </h2>

          <div className="w-24 h-[2px] bg-[#00cccc] my-8 scroll-line" />

          <p className="text-[#b8b8b8] text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
            Whether drafting a beachfront residence in ECR Chennai, a contemporary villa in Coimbatore, or retrofitting a legacy heritage home, our engineering architects assist with custom shaft CAD drawings, DWG layouts, and structural load calculations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button
              onClick={() => onConsultationClick?.('Download Architectural CAD Package: Request for customized shaft CAD drawings (.DWG/.BIM) and structural load calculations.')}
              className="px-8 py-4 bg-[#00cccc] text-[#050505] font-mono font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,204,204,0.25)] flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Architectural CAD Package</span>
            </button>

            <button
              onClick={() => {
                if (onConsultationClick) {
                  onConsultationClick('Architectural Consultation: Request for on-site structural shaft audit & customized DWG layouts.')
                } else if (onBack) {
                  onBack()
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }
              }}
              className="px-8 py-4 bg-white/5 border border-white/20 hover:border-[#00cccc] hover:bg-[#00cccc]/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
            >
              <HardHat className="w-4 h-4 text-[#00cccc]" />
              <span>Book Site Feasibility Audit</span>
            </button>
          </div>

          {/* Quick Direct Contacts */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-white/50">
            <a href="tel:+919176367030" className="flex items-center gap-2 hover:text-[#00cccc] transition-colors">
              <Phone className="w-4 h-4 text-[#00cccc]" />
              <span>Direct Architectural Line: +91 91763 67030</span>
            </a>
            <span>//</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00cccc]" />
              <span>Chennai Experience Centre & Fabrication Hub</span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — FOOTER & GEOGRAPHIC TELEMETRY
      ═══════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 md:px-12 bg-[#050505] border-t border-white/[0.08] font-mono text-xs text-white/40">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 scroll-container">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Alpha Elevators Logo" className="h-6 w-auto opacity-70" />
            <span>&copy; {new Date().getFullYear()} ALPHA ELEVATORS PRIVATE LIMITED</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>COORDINATES: 13.0827° N, 80.2707° E</span>
            <span>//</span>
            <span>SPEC: ARCHITECTURAL ELEVATION 2026</span>
            <span>//</span>
            <span className="text-[#00cccc]/80">ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════
          ARCHITECTURAL CAD / DWG SPECIFICATION MODAL
      ═══════════════════════════════════════════════════════════ */}
      {isCadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#00cccc]/40 rounded-sm p-6 md:p-8 shadow-[0_0_50px_rgba(0,204,204,0.2)]">
            <button
              onClick={() => setIsCadModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#00cccc] uppercase tracking-widest">
              <FileText className="w-4 h-4" />
              <span>ARCHITECTURAL SPECIFICATION DISPATCH</span>
            </div>

            <h3 className="text-xl md:text-2xl font-light uppercase tracking-wider text-white mb-2">
              Request CAD/DWG Shaft Drawing Package
            </h3>

            <p className="text-white/60 text-xs font-light leading-relaxed mb-6 font-sans">
              Enter your project details below to receive comprehensive architectural drawing files (.DWG, .BIM, .PDF), structural shaft load bearing calculations, and electrical requirement specs for your villa project.
            </p>

            <form onSubmit={handleCadModalSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 block mb-1 uppercase text-[10px]">Architect / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Rajesh Kumar"
                    className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:border-[#00cccc] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/50 block mb-1 uppercase text-[10px]">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:border-[#00cccc] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 block mb-1 uppercase text-[10px]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="architect@studio.com"
                  className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:border-[#00cccc] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 block mb-1 uppercase text-[10px]">Property / Project Type</label>
                  <select className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:border-[#00cccc] focus:outline-none">
                    <option>Under Construction Villa (New Shaft)</option>
                    <option>Existing Villa Retrofit (No Pit)</option>
                    <option>Duplex Penthouse</option>
                    <option>Commercial / Executive Suite</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 block mb-1 uppercase text-[10px]">Preferred Drive Mechanism</label>
                  <select className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:border-[#00cccc] focus:outline-none">
                    <option>Imported Hydraulic (Zero Pit / Sealed 10-Yr)</option>
                    <option>Gearless Traction MRL (High Speed)</option>
                    <option>Polyurethane Belt Drive (Silent Next-Gen)</option>
                    <option>Engineering Recommendation Needed</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00cccc] text-[#050505] font-semibold tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Transmit Drawing Request to Engineering Desk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutPage;
