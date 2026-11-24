import { useRef, useEffect, useState, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Users, Gauge, Settings, ArrowDownToLine, 
  Box, Expand, Zap, VolumeX, 
  RefreshCcw, Leaf, Maximize, TrendingUp, 
  Clock, Plug, ShieldCheck, BatteryCharging,
  ArrowRight, Sparkles, Image as ImageIcon
} from 'lucide-react'

// Code-split 3D cabin model viewer
const LiftInteriorViewer = lazy(() =>
  import('./LiftInteriorViewer').then((mod) => ({ default: mod.LiftInteriorViewer }))
)

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: "01",
    model: "AE01",
    name: "The Pioneer",
    desc: "State-of-the-art residential elevator solution featuring ultra-smooth gearless traction, advanced safety protocols, and a customizable luxury interior crafted for modern homes.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    modelUrl: "/lifts/main white.glb",
    specs: [
      { label: "CAPACITY", value: "Up to 400 kg (5 Persons)", Icon: Users },
      { label: "SPEED", value: "0.15 m/s - 0.3 m/s", Icon: Gauge },
      { label: "DRIVE TYPE", value: "Gearless Traction", Icon: Settings },
      { label: "PIT DEPTH", value: "Zero Pit (150mm max)", Icon: ArrowDownToLine }
    ]
  },
  {
    id: "02",
    model: "AE02",
    name: "The Vision",
    desc: "A cutting-edge panoramic lift system featuring 360-degree structural glass. Designed for architectural brilliance and fully compliant with European Lift Directive 2014/33/EU.",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1000&auto=format&fit=crop",
    modelUrl: "/lifts/main white.glb",
    specs: [
      { label: "ENCLOSURE", value: "Toughened Laminated Glass", Icon: Box },
      { label: "FOOTPRINT", value: "Compact (1m x 1m min)", Icon: Expand },
      { label: "MACHINE ROOM", value: "Not Required (MRL)", Icon: Zap },
      { label: "OPERATION", value: "Whisper-quiet (<45dB)", Icon: VolumeX }
    ]
  },
  {
    id: "03",
    model: "AE03",
    name: "The Silent Drive",
    desc: "Revolutionary belt-model elevator utilizing patented flat polyurethane-coated steel belts. Offers unprecedented ride smoothness, longevity, and absolutely silent operation.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
    modelUrl: "/lifts/main white.glb",
    specs: [
      { label: "DRIVE BELTS", value: "PU-Coated Steel (No Oil)", Icon: RefreshCcw },
      { label: "EFFICIENCY", value: "A-Class Energy Rating", Icon: Leaf },
      { label: "DOOR SYSTEM", value: "Auto / Center Opening", Icon: Maximize },
      { label: "MAX TRAVEL", value: "Up to 5 Stops (15m)", Icon: TrendingUp }
    ]
  },
  {
    id: "04",
    model: "AE04",
    name: "The Retrofit",
    desc: "Specifically engineered for existing structures and heritage homes. Uses an ultra-slim hydraulic drive that integrates seamlessly without requiring major architectural modifications.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop",
    modelUrl: "/lifts/main white.glb",
    specs: [
      { label: "INSTALLATION", value: "As fast as 48 hours", Icon: Clock },
      { label: "POWER", value: "Single Phase (230V)", Icon: Plug },
      { label: "STRUCTURE", value: "Self-Supporting Shaft", Icon: ShieldCheck },
      { label: "BACKUP", value: "Built-in ARD System", Icon: BatteryCharging }
    ]
  }
]

export const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Mount 3D WebGL Canvas strictly on demand when requested
  const [active3DId, setActive3DId] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    const rows = sectionRef.current.querySelectorAll('.product-row')
    
    rows.forEach((row) => {
      const textBlock = row.querySelector('.product-text')
      const imgBlock = row.querySelector('.product-img-wrapper')
      const img = row.querySelector('.product-img')
      
      // Image Parallax if image exists
      if (img && imgBlock) {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: imgBlock,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }

      if (textBlock) {
        // Line draw animation
        const line = textBlock.querySelector('.accent-line')
        if (line) {
          gsap.fromTo(line,
            { width: 0 },
            {
              width: 48,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 75%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        }

        // Background number subtle counter-parallax
        const bgNum = textBlock.querySelector('.bg-number')
        if (bgNum) {
          gsap.to(bgNum, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          })
        }

        // Fade up text elements sequentially
        const elements = textBlock.querySelectorAll('.reveal-elem')
        gsap.fromTo(elements, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }
      
      // Smooth hardware-accelerated image fade reveal (avoids expensive clipPath re-rasterization)
      if (img) {
        gsap.fromTo(img,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 w-full py-32 bg-primary overflow-hidden" id="products">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-display font-light text-white uppercase tracking-wider mb-6 md:mb-0">
            Elevate <br/>
            <span className="text-metal italic lowercase font-sans">with</span> <span className="text-accent">Excellence</span>
          </h2>
          <p className="text-metal text-lg font-light max-w-sm md:text-right">
            Discover our range of meticulously engineered elevators, designed to seamlessly integrate into any architectural vision.
          </p>
        </div>
        
        {/* Products List */}
        <div className="space-y-40">
          {products.map((product, idx) => {
            const isReverse = idx % 2 !== 0
            const is3DActive = active3DId === product.id
            
            return (
              <div key={product.id} className={`product-row flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isReverse ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Content */}
                <div className="product-text flex-1 relative w-full pt-10 md:pt-0">
                  {/* Large background number */}
                  <div className="bg-number absolute -top-10 -left-6 md:-left-12 text-[10rem] md:text-[14rem] font-display font-bold text-white/[0.03] select-none pointer-events-none z-0 leading-none">
                    {product.id}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-[1px] bg-accent accent-line overflow-hidden"></div>
                      <span className="text-accent tracking-[0.3em] text-sm uppercase reveal-elem">{product.model}</span>
                    </div>
                    
                    <h3 className="reveal-elem text-4xl md:text-5xl font-display text-white mb-6 font-light">
                      {product.name}
                    </h3>
                    
                    <p className="reveal-elem text-metal text-lg font-light mb-12 leading-relaxed max-w-lg">
                      {product.desc}
                    </p>
                    
                    {/* Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12 max-w-lg">
                      {product.specs.map((spec, sIdx) => {
                        const Icon = spec.Icon
                        return (
                          <div key={sIdx} className="reveal-elem group border-t border-white/10 pt-4 flex gap-4">
                            <div className="mt-1 text-metal/40 group-hover:text-accent transition-colors duration-500">
                              <Icon size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                              <span className="text-metal font-mono text-[10px] tracking-widest block mb-2 group-hover:text-white transition-colors duration-500">{spec.label}</span>
                              <span className="text-white text-base font-light">{spec.value}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Action buttons: 3D Toggle + Explore Link */}
                    <div className="reveal-elem flex flex-wrap items-center gap-4">
                      <button 
                        type="button"
                        onClick={() => setActive3DId(is3DActive ? null : product.id)}
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-display tracking-widest uppercase rounded-sm border transition-all duration-300 ${
                          is3DActive
                            ? 'bg-accent text-primary font-semibold border-accent shadow-[0_0_15px_rgba(0,204,204,0.35)]'
                            : 'bg-white/5 border-white/15 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10'
                        }`}
                      >
                        {is3DActive ? <ImageIcon className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-accent" />}
                        <span>{is3DActive ? 'Switch to Photo' : 'Launch 3D Cabin'}</span>
                      </button>

                      <button className="group inline-flex items-center gap-4 text-white hover:text-accent transition-colors duration-300">
                        <span className="text-sm tracking-[0.2em] uppercase font-light">Explore Details</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-accent flex items-center justify-center transition-colors duration-300">
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 3D Interactive Model / Image Container */}
                <div className="product-img-wrapper w-full h-[450px] md:h-[650px] md:flex-1 relative overflow-hidden bg-[#06090e] rounded-sm border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                  {is3DActive ? (
                    <div className="relative w-full h-full">
                      <Suspense
                        fallback={
                          <div className="w-full h-full bg-[#06090e] flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mb-3" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">Loading 3D Cabin...</span>
                          </div>
                        }
                      >
                        <LiftInteriorViewer
                          compact
                          className="w-full h-full border-0 shadow-none"
                          modelUrl={product.modelUrl || '/lifts/main white.glb'}
                          productName={`${product.name} (${product.model}) — 3D Cabin`}
                          productTagline="Main White Architectural Series"
                          hdriUrl="/small_empty_room_3_1k.hdr"
                        />
                      </Suspense>
                      <button
                        type="button"
                        onClick={() => setActive3DId(null)}
                        className="absolute top-4 right-4 z-20 px-3 py-1 text-[10px] uppercase font-mono tracking-wider bg-black/70 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 rounded-sm transition-all backdrop-blur-md"
                        title="Switch to Photo View"
                      >
                        Photo View
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="relative w-full h-full group/card cursor-pointer" 
                      onClick={() => setActive3DId(product.id)}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/10 z-10 transition-colors duration-500"></div>
                      <img 
                        src={product.image} 
                        alt={`${product.model} - ${product.name}`} 
                        className="product-img absolute top-[-20%] left-0 w-full h-[140%] object-cover transition-transform duration-700 group-hover/card:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10 pointer-events-none" />
                      
                      {/* Launch 3D Simulation Overlay Pill */}
                      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                        <span className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white flex items-center gap-2 rounded-sm group-hover/card:border-accent transition-all">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                          <span>Interactive 3D Cabin</span>
                        </span>
                        <span className="px-3.5 py-1.5 text-xs uppercase font-display tracking-wider bg-accent text-primary font-semibold rounded-sm shadow-[0_0_15px_rgba(0,204,204,0.3)] group-hover/card:bg-white transition-all">
                          Launch 3D ↗
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
