import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    // Animate text on load
    const tl = gsap.timeline({ delay: 1 })
    tl.fromTo('.hero-text-line', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' }
    )
    tl.fromTo('.hero-sub',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    tl.fromTo('.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.8'
    )
  }, [])

  return (
    <section ref={containerRef} className="h-[200vh] relative z-10 w-full" id="home">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 pointer-events-none">
        
        <div className="max-w-4xl pt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light uppercase tracking-tighter leading-[0.9] text-white mix-blend-difference">
            <div className="overflow-hidden">
              <span className="hero-text-line inline-block">Elevating Life.</span>
            </div>
            <div className="overflow-hidden text-accent">
              <span className="hero-text-line inline-block">Redefining Luxury.</span>
            </div>
          </h1>
          
          <p className="hero-sub mt-8 text-metal max-w-xl text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Premium home elevator solutions combining Italian engineering precision with Indian innovation.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 pointer-events-auto">
            <button className="hero-cta px-8 py-4 bg-accent text-primary font-semibold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300">
              Explore Our Elevators
            </button>
            <button className="hero-cta px-8 py-4 border border-white/20 text-white font-semibold tracking-widest uppercase text-sm hover:border-accent hover:text-accent transition-colors duration-300 backdrop-blur-sm bg-primary/10">
              Book a Consultation
            </button>
          </div>
        </div>

        {/* Floating Data Labels */}
        <div className="absolute top-1/3 right-10 md:right-24 text-right hidden lg:block opacity-60">
          <div className="text-xs tracking-[0.3em] font-mono mb-8 border-b border-white/10 pb-2">ITALIAN ENGINEERING</div>
          <div className="text-xs tracking-[0.3em] font-mono mb-8 border-b border-white/10 pb-2">INDIAN INNOVATION</div>
          <div className="text-xs tracking-[0.3em] font-mono mb-8 border-b border-white/10 pb-2">LOW ENERGY</div>
          <div className="text-xs tracking-[0.3em] font-mono border-b border-white/10 pb-2">PREMIUM SAFETY</div>
        </div>

      </div>
    </section>
  )
}
