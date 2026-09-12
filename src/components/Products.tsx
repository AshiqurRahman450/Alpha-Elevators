import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const rows = sectionRef.current.querySelectorAll('.product-row')
    
    rows.forEach((row, idx) => {
      const textBlock = row.children[0]
      const imgBlock = row.children[1]
      
      // AE02 (idx 1) uses flex-row-reverse, so text is visually on the right
      const isReverse = idx % 2 !== 0 
      
      gsap.fromTo(textBlock,
        { x: isReverse ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo(imgBlock,
        { x: isReverse ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
          }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex items-center justify-center py-32 bg-primary" id="products">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-light text-center text-white mb-24 uppercase tracking-wider">
          Our <span className="text-accent">Products</span>
        </h2>
        
        <div className="space-y-32">
          {/* AE01 */}
          <div className="product-row flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-display text-accent mb-4">AE01 - The Pioneer</h3>
              <p className="text-metal text-lg font-light mb-8">State-of-the-art residential elevator solution featuring ultra-smooth gearless traction, advanced safety protocols, and a customizable luxury interior crafted for modern homes.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">CAPACITY</span>
                  <span className="text-white text-sm">Up to 400 kg (5 Persons)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">SPEED</span>
                  <span className="text-white text-sm">0.15 m/s - 0.3 m/s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">DRIVE TYPE</span>
                  <span className="text-white text-sm">Gearless Traction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">PIT DEPTH</span>
                  <span className="text-white text-sm">Zero Pit (150mm max)</span>
                </div>
              </div>

              <button className="px-6 py-2 border border-white/20 hover:border-accent text-white hover:text-accent transition-colors text-sm tracking-widest uppercase">Explore AE01</button>
            </div>
            <div className="w-full h-[300px] md:h-[500px] md:flex-1 border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
               <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" alt="AE01 Elevator" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>
          
          {/* AE02 */}
          <div className="product-row flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-display text-accent mb-4">AE02 - The Vision</h3>
              <p className="text-metal text-lg font-light mb-8">A cutting-edge panoramic lift system featuring 360-degree structural glass. Designed for architectural brilliance and fully compliant with European Lift Directive 2014/33/EU.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">ENCLOSURE</span>
                  <span className="text-white text-sm">Toughened Laminated Glass</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">FOOTPRINT</span>
                  <span className="text-white text-sm">Compact (1m x 1m min)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">MACHINE ROOM</span>
                  <span className="text-white text-sm">Not Required (MRL)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">OPERATION</span>
                  <span className="text-white text-sm">Whisper-quiet (&lt;45dB)</span>
                </div>
              </div>

              <button className="px-6 py-2 border border-white/20 hover:border-accent text-white hover:text-accent transition-colors text-sm tracking-widest uppercase">Explore AE02</button>
            </div>
            <div className="w-full h-[300px] md:h-[500px] md:flex-1 border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
               <img src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1000&auto=format&fit=crop" alt="AE02 Elevator" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>

          {/* AE03 */}
          <div className="product-row flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-display text-accent mb-4">AE03 - The Silent Drive</h3>
              <p className="text-metal text-lg font-light mb-8">Revolutionary belt-model elevator utilizing patented flat polyurethane-coated steel belts. Offers unprecedented ride smoothness, longevity, and absolutely silent operation.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">DRIVE BELTS</span>
                  <span className="text-white text-sm">PU-Coated Steel (No Oil)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">EFFICIENCY</span>
                  <span className="text-white text-sm">A-Class Energy Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">DOOR SYSTEM</span>
                  <span className="text-white text-sm">Automatic / Center Opening</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">MAX TRAVEL</span>
                  <span className="text-white text-sm">Up to 5 Stops (15m)</span>
                </div>
              </div>

              <button className="px-6 py-2 border border-white/20 hover:border-accent text-white hover:text-accent transition-colors text-sm tracking-widest uppercase">Explore AE03</button>
            </div>
            <div className="w-full h-[300px] md:h-[500px] md:flex-1 border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
               <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop" alt="AE03 Elevator" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>

          {/* AE04 */}
          <div className="product-row flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-display text-accent mb-4">AE04 - The Retrofit</h3>
              <p className="text-metal text-lg font-light mb-8">Specifically engineered for existing structures and heritage homes. Uses an ultra-slim hydraulic drive that integrates seamlessly without requiring major architectural modifications.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">INSTALLATION</span>
                  <span className="text-white text-sm">As fast as 48 hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">POWER</span>
                  <span className="text-white text-sm">Single Phase (230V)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">STRUCTURE</span>
                  <span className="text-white text-sm">Self-Supporting Shaft</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs tracking-widest mb-1">BACKUP</span>
                  <span className="text-white text-sm">Built-in ARD System</span>
                </div>
              </div>

              <button className="px-6 py-2 border border-white/20 hover:border-accent text-white hover:text-accent transition-colors text-sm tracking-widest uppercase">Explore AE04</button>
            </div>
            <div className="w-full h-[300px] md:h-[500px] md:flex-1 border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
               <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop" alt="AE04 Elevator" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
