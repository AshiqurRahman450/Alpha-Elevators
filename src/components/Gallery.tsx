import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Maximize2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface GalleryProps {
  onViewAll?: () => void
}

const images = [
  { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop', alt: 'Luxury Home Interior', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', alt: 'Modern Glass Elevator', span: 'col-span-1 md:col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop', alt: 'Minimalist Stairs', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop', alt: 'Premium Finishes', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', alt: 'Architectural Details', span: 'col-span-1 md:col-span-2 row-span-1' },
]

export const Gallery = ({ onViewAll }: GalleryProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.gallery-item')
    const heading = sectionRef.current.querySelector('.gallery-heading')
    
    // Animate heading elements
    if (heading) {
      gsap.fromTo(heading.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }
    
    // Animate image wrappers and inner images
    elements.forEach(el => {
      const img = el.querySelector('img')
      
      // Elegant reveal via clip-path
      gsap.fromTo(el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: "play reverse play reverse"
          }
        }
      )
      
      // Image Parallax effect
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 w-full py-32 bg-secondary overflow-hidden" id="gallery">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="gallery-heading flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-display font-light text-white uppercase tracking-wider mb-8 md:mb-0">
            Signature <br/>
            <span className="text-metal italic lowercase font-sans">Installations</span>
          </h2>
          <div className="flex flex-col md:items-end gap-8">
            <p className="text-metal text-lg font-light max-w-sm md:text-right">
              Explore our portfolio of premium home elevator installations across exclusive residences.
            </p>
            <button onClick={onViewAll} className="group inline-flex items-center gap-4 text-white hover:text-accent transition-colors duration-300">
              <span className="text-sm tracking-[0.2em] uppercase font-light">View Projects</span>
              <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-accent flex items-center justify-center transition-colors duration-300">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] md:auto-rows-[400px] gap-6">
          {images.map((img, idx) => (
            <div key={idx} className={`gallery-item relative group overflow-hidden ${img.span} bg-graphite rounded-sm`}>
              
              {/* Overlay Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10 pointer-events-none"></div>
              
              {/* Parallax Image */}
              <img 
                src={img.src} 
                alt={img.alt} 
                className="absolute top-[-10%] left-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              
              {/* Top Right Icon */}
              <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                  <Maximize2 className="text-white w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Bottom Left Details */}
              <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="text-white font-display text-2xl mb-2 font-light">{img.alt}</div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-accent"></span>
                  <div className="text-accent font-mono text-[10px] tracking-widest uppercase">Residential</div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
