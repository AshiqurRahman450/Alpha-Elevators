import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Locations = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.location-card')
    
    gsap.fromTo(elements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex items-center justify-center py-32 bg-primary" id="locations">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 location-card">
          <h2 className="text-4xl md:text-5xl font-display font-light text-white uppercase tracking-wider mb-6">
            Our <span className="text-accent">Locations</span>
          </h2>
          <p className="text-metal max-w-2xl mx-auto font-light">
            Serving clients across India with a dedicated network of installation and maintenance professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Head Office */}
          <div className="location-card border border-white/10 bg-white/5 backdrop-blur-md p-8 group hover:border-accent/50 transition-colors duration-500">
            <h3 className="text-2xl font-display text-white mb-2">Chennai</h3>
            <div className="text-accent font-mono text-xs tracking-widest mb-6">HEAD OFFICE</div>
            <address className="text-metal font-light not-italic leading-relaxed mb-8">
              99, A-Block, Annanagar,<br/>
              Anna Nagar East,<br/>
              Chennai 600 102
            </address>
            <a href="tel:+918015129224" className="text-white text-sm tracking-widest hover:text-accent transition-colors block mb-2">+91 80151 29224</a>
            <a href="mailto:info@alphaelevators.in" className="text-white text-sm tracking-widest hover:text-accent transition-colors block">info@alphaelevators.in</a>
          </div>

          {/* Regional Office */}
          <div className="location-card border border-white/10 bg-white/5 backdrop-blur-md p-8 group hover:border-accent/50 transition-colors duration-500">
            <h3 className="text-2xl font-display text-white mb-2">Coimbatore</h3>
            <div className="text-accent font-mono text-xs tracking-widest mb-6">REGIONAL OFFICE</div>
            <address className="text-metal font-light not-italic leading-relaxed mb-8">
              RS Puram,<br/>
              Coimbatore,<br/>
              Tamil Nadu
            </address>
            <a href="tel:+918015129224" className="text-white text-sm tracking-widest hover:text-accent transition-colors block mb-2">Contact Sales</a>
          </div>

          {/* Regional Office */}
          <div className="location-card border border-white/10 bg-white/5 backdrop-blur-md p-8 group hover:border-accent/50 transition-colors duration-500">
            <h3 className="text-2xl font-display text-white mb-2">Bangalore</h3>
            <div className="text-accent font-mono text-xs tracking-widest mb-6">REGIONAL OFFICE</div>
            <address className="text-metal font-light not-italic leading-relaxed mb-8">
              Indiranagar,<br/>
              Bangalore,<br/>
              Karnataka
            </address>
            <a href="tel:+918015129224" className="text-white text-sm tracking-widest hover:text-accent transition-colors block mb-2">Contact Sales</a>
          </div>
        </div>
      </div>
    </section>
  )
}
