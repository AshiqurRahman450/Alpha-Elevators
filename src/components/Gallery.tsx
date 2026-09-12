import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.gallery-item')
    
    gsap.fromTo(elements,
      { y: 50, scale: 0.95, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    )
  }, [])

  const images = [
    { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop', alt: 'Luxury Home Interior', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', alt: 'Modern Glass Elevator', span: 'col-span-1 md:col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop', alt: 'Minimalist Stairs', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop', alt: 'Premium Finishes', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', alt: 'Architectural Details', span: 'col-span-1 md:col-span-2 row-span-1' },
  ]

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full py-32 bg-secondary" id="gallery">
      <div className="container mx-auto px-6">
        
        <div className="gallery-item flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white uppercase tracking-wider mb-4">
              Installations
            </h2>
            <p className="text-metal max-w-xl font-light">
              Explore our portfolio of premium home elevator installations across exclusive residences.
            </p>
          </div>
          <button className="px-8 py-3 border border-white/20 text-white font-semibold tracking-widest uppercase text-xs hover:border-accent hover:text-accent transition-colors duration-300">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {images.map((img, idx) => (
            <div key={idx} className={`gallery-item relative group overflow-hidden ${img.span} bg-primary/50`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="text-white font-display text-xl">{img.alt}</div>
                <div className="text-accent font-mono text-xs tracking-widest mt-1">RESIDENTIAL</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
