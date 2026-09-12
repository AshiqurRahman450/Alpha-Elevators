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
    
    const elements = containerRef.current.querySelectorAll('.feature-card')
    gsap.fromTo(elements, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen relative z-10 w-full py-32 bg-secondary" id="features">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-light text-white uppercase tracking-wider mb-6">
            Engineered for <span className="text-accent">Perfection</span>
          </h2>
          <p className="text-metal max-w-2xl mx-auto font-light">
            Alpha Elevators combine Italian precision with Indian innovation to deliver safety, efficiency, and comfort in every ride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="feature-card relative p-8 border border-white/5 bg-primary/50 backdrop-blur-sm group hover:border-accent/30 transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-5xl font-display text-accent mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">{feat.value}</div>
                <div className="text-sm font-mono tracking-widest text-white mb-2">{feat.label}</div>
                <div className="text-metal text-sm font-light">{feat.desc}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-32 border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-display text-white mb-4">No Greasing, No Oil</h3>
            <p className="text-metal font-light leading-relaxed">
              Our home elevators are completely oil-free and grease-free, ensuring a clean, eco-friendly, and maintenance-free experience. Say goodbye to messy lubrication and costly service routines.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-display text-white mb-4">No Pit, No Headroom Required</h3>
            <p className="text-metal font-light leading-relaxed">
              Designed with compact installation in mind, our elevators require no deep pit or overhead room, making them ideal for existing homes and limited spaces.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
