import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    })
    tl.fromTo('.about-text', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 })
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex items-center justify-center py-32" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="about-text-container">
            <h2 className="about-text text-4xl md:text-5xl font-display font-light text-white mb-6 uppercase tracking-wider">
              Engineering Excellence.<br/>
              <span className="text-accent">Built Around You.</span>
            </h2>
            <div className="w-20 h-[1px] bg-accent/50 mb-8 about-text"></div>
            
            <p className="about-text text-metal text-lg font-light leading-relaxed mb-6">
              Alpha Elevators began with a team of experienced elevator specialists, each bringing nearly a decade of industry expertise. We embarked on a thorough market study focused on Home Elevators, carefully exploring ways to combine Italian engineering precision with Indian innovation.
            </p>
            
            <p className="about-text text-metal text-lg font-light leading-relaxed mb-10">
              Our approach creates elevators that stand out for their performance, design, and reliability. By blending Italian precision with Indian craftsmanship, we source components strategically to ensure durability, efficiency, and style.
            </p>

            <div className="about-text flex items-center gap-12">
              <div>
                <div className="text-3xl font-display text-white">10+</div>
                <div className="text-sm text-metal uppercase tracking-widest mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-display text-white">24/7</div>
                <div className="text-sm text-metal uppercase tracking-widest mt-1">On-Call Support</div>
              </div>
            </div>
          </div>

          {/* The right column is intentionally left empty so the global 3D canvas can show the model perfectly */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  )
}
