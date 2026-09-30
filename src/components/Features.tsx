import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const featuresList = [
  { value: "0.75 kW", label: "POWER CONSUMPTION", desc: "Less than many home appliances" },
  { value: "240 V", label: "SINGLE PHASE", desc: "No special wiring required" },
  { value: "1.0 m/s", label: "MAX SPEED", desc: "Fast & efficient travel" },
  { value: "1.2 m²", label: "FOOTPRINT", desc: "Compact & space-saving" },
  { value: "10 Days", label: "INSTALLATION", desc: "Quick and hassle-free" },
  { value: "24/7", label: "SUPPORT", desc: "Always there for you" }
]

export const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    const titles = containerRef.current.querySelectorAll('.feature-title')
    const cards = containerRef.current.querySelectorAll('.feature-card')
    const bottomFeatures = containerRef.current.querySelectorAll('.bottom-feature')
    
    gsap.fromTo(titles,
      { y: 60, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    )

    gsap.fromTo(cards, 
      { y: 80, opacity: 0, scale: 0.95 },
      { 
        y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      }
    )

    gsap.fromTo(bottomFeatures,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bottom-feature-container',
          start: 'top 85%'
        }
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen relative z-10 w-full py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-[#0a0a0a] to-black" id="features">
      {/* Background glowing accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="feature-title inline-flex items-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-accent/50"></div>
             <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent">Specifications</span>
             <div className="w-12 h-[1px] bg-accent/50"></div>
          </div>
          <h2 className="feature-title text-4xl md:text-5xl lg:text-6xl font-display font-light text-white uppercase tracking-wider mb-6">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Perfection</span>
          </h2>
          <p className="feature-title text-white/50 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Alpha Elevators combine Italian precision with Indian innovation to deliver unparalleled safety, efficiency, and comfort in every ride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="feature-card relative p-10 bg-white/[0.02] border border-white/10 backdrop-blur-md group hover:border-accent/40 transition-all duration-700 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,204,204,0.15)] flex flex-col justify-between min-h-[220px]">
              {/* Accent top border on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-5xl font-display text-white/90 group-hover:text-accent transition-colors duration-500 mb-6 drop-shadow-lg">
                  {feat.value}
                </div>
                <div className="mt-auto">
                  <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 group-hover:text-white/80 transition-colors duration-500 mb-3 uppercase">
                    {feat.label}
                  </div>
                  <div className="text-white/60 text-sm font-light leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                    {feat.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bottom-feature-container mt-32 border-t border-white/10 pt-20 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div className="bottom-feature group">
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-6 group-hover:text-accent transition-colors duration-300">No Greasing, No Oil</h3>
            <p className="text-white/50 font-light leading-relaxed text-lg group-hover:text-white/70 transition-colors duration-300">
              Our home elevators are completely oil-free and grease-free, ensuring a clean, eco-friendly, and maintenance-free experience. Say goodbye to messy lubrication and costly service routines.
            </p>
          </div>
          <div className="bottom-feature group">
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-6 group-hover:text-accent transition-colors duration-300">No Pit, No Headroom</h3>
            <p className="text-white/50 font-light leading-relaxed text-lg group-hover:text-white/70 transition-colors duration-300">
              Designed with compact installation in mind, our elevators require no deep pit or overhead room, making them ideal for existing homes and limited spaces without major civil work.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
