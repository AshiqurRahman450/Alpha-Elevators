import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BatteryMedium, Weight, Gauge, Lock, PhoneCall, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const safetyFeatures = [
  {
    icon: BatteryMedium,
    title: "BACKUP BATTERY",
    desc: "Secure operation during power outages or disruptions."
  },
  {
    icon: Weight,
    title: "OVERLOAD SENSOR",
    desc: "Advanced sensors ensure operation within maximum safety limits."
  },
  {
    icon: Gauge,
    title: "SPEED GOVERNOR",
    desc: "Prevents over-speed and sudden drops via automatic brakes."
  },
  {
    icon: Lock,
    title: "DOOR LOCKING",
    desc: "Electric interlock prevents opening while in motion."
  },
  {
    icon: PhoneCall,
    title: "EMERGENCY COMMS",
    desc: "24/7 dedicated communication system inside the cabin."
  },
  {
    icon: ShieldCheck,
    title: "AUTO RESCUE DEVICE",
    desc: "Automatically safely lands the cabin to nearest floor."
  }
]

export const Safety = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    const cards = sectionRef.current.querySelectorAll('.safety-card')
    const header = sectionRef.current.querySelector('.safety-header')
    
    gsap.fromTo(header,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    )

    gsap.fromTo(cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex flex-col items-center justify-center py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-[#050505] to-black" id="safety">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="safety-header text-center mb-24">
          <div className="inline-flex items-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-red-500/50"></div>
             <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-500">Uncompromising Protection</span>
             <div className="w-12 h-[1px] bg-red-500/50"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-white mb-6 uppercase tracking-wider">
            Safety Isn't a Feature.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">It's the Foundation.</span>
          </h2>
        </div>
        
        {/* Grid layout for 3 columns on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {safetyFeatures.map((feature, idx) => (
            <div key={idx} className="safety-card group relative p-10 bg-white/[0.015] border border-white/5 backdrop-blur-md hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:border-red-500/30 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.15)] flex flex-col items-center text-center rounded-sm">
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Square Icon Container */}
              <div className="relative z-10 w-20 h-20 mb-8 rounded-sm bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 flex items-center justify-center group-hover:border-red-500/40 group-hover:shadow-[inset_0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500">
                <feature.icon className="w-8 h-8 text-white/50 group-hover:text-red-500 transition-colors duration-500" strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10">
                <h4 className="text-white/80 font-mono tracking-widest text-sm mb-4 group-hover:text-white transition-colors duration-300 uppercase">{feature.title}</h4>
                <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors duration-300">{feature.desc}</p>
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
