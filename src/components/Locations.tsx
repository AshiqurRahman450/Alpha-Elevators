import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Building2, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface LocationsProps {
  onExploreLocation?: (city: 'chennai' | 'coimbatore' | 'all') => void
}

const locations = [
  {
    city: "Chennai",
    slug: "chennai" as const,
    type: "HEAD OFFICE",
    address: ["99, A-Block, Annanagar,", "Anna Nagar East,", "Chennai 600 102"],
    phone: "+91 80151 29224",
    email: "info@alphaelevators.in"
  },
  {
    city: "Coimbatore",
    slug: "coimbatore" as const,
    type: "REGIONAL OFFICE",
    address: ["Grand Brenton G4, Periyar Nagar,", "Masakali Palayam,", "Coimbatore, Tamil Nadu 641015"],
    phone: "+91 80151 29224",
    email: "info@alphaelevators.in"
  },
  {
    city: "Bangalore",
    slug: "all" as const,
    type: "REGIONAL EXPANSION",
    address: ["Indiranagar,", "Bangalore,", "Karnataka"],
    phone: "+91 80151 29224",
    email: "info@alphaelevators.in"
  }
]

export const Locations = ({ onExploreLocation }: LocationsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.location-card')
    const heading = sectionRef.current.querySelector('.location-heading')
    
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
    
    // Animate cards staggering in
    gsap.fromTo(elements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: "play reverse play reverse"
        }
      }
    )
    
    // Top border accent line drawing animation for each card
    elements.forEach(card => {
      const line = card.querySelector('.accent-line')
      if (line) {
        gsap.fromTo(line,
          { width: 0 },
          {
            width: "100%",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 w-full py-32 bg-primary overflow-hidden" id="locations">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="location-heading flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-display font-light text-white uppercase tracking-wider mb-6 md:mb-0">
            Our <br/>
            <span className="text-metal italic lowercase font-sans">Network</span> <span className="text-accent">&amp; Locations</span>
          </h2>
          <p className="text-metal text-lg font-light max-w-sm md:text-right">
            Serving clients across India with a dedicated network of installation and maintenance professionals.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc, idx) => (
            <div key={idx} className="location-card relative border border-white/10 bg-white/5 backdrop-blur-md p-10 group hover:border-accent/30 hover:bg-white/10 transition-all duration-500 flex flex-col">
              
              {/* Animated Top Accent Line */}
              <div className="absolute top-0 left-0 h-[2px] bg-accent accent-line w-0"></div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-display text-white group-hover:text-accent transition-colors duration-500">{loc.city}</h3>
                <Building2 className="text-white/20 group-hover:text-accent transition-colors duration-500" strokeWidth={1} size={40} />
              </div>
              
              {/* Type */}
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-accent"></span>
                <span className="text-accent font-mono text-xs tracking-widest uppercase">{loc.type}</span>
              </div>
              
              {/* Address */}
              <address className="flex items-start gap-4 text-metal font-light not-italic leading-relaxed mb-8 flex-1 group-hover:text-white/80 transition-colors duration-500">
                <MapPin className="text-accent mt-1 shrink-0" size={18} strokeWidth={1.5} />
                <span>
                  {loc.address.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </span>
              </address>
              
              {/* Contact Links */}
              <div className="space-y-4 pt-6 border-t border-white/10 mt-auto">
                {loc.phone && (
                  <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-white text-sm tracking-widest hover:text-accent transition-colors">
                    <Phone className="text-metal group-hover:text-accent transition-colors" size={16} strokeWidth={1.5} />
                    <span>{loc.phone}</span>
                  </a>
                )}
                {loc.email && (
                  <a href={`mailto:${loc.email}`} className="flex items-center gap-4 text-white text-sm tracking-widest hover:text-accent transition-colors">
                    <Mail className="text-metal group-hover:text-accent transition-colors" size={16} strokeWidth={1.5} />
                    <span>{loc.email}</span>
                  </a>
                )}

                {/* Explore Dedicated Page Button */}
                {onExploreLocation && (
                  <button
                    onClick={() => onExploreLocation(loc.slug)}
                    className="w-full mt-4 py-2.5 px-4 rounded bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 text-white group-hover:text-accent transition-all duration-300 text-xs font-mono uppercase tracking-widest flex items-center justify-between"
                  >
                    <span>Explore {loc.city} Hub</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
