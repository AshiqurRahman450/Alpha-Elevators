import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus, MessageSquare } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: "Do I need a pit or machine room for the elevator?",
    a: "No. Alpha Elevators require zero pit and no machine room. Our innovative design rests directly on your existing floor, saving you construction time, cost, and architectural disruption."
  },
  {
    q: "What is the power consumption?",
    a: "Our elevators are designed to be extremely energy efficient. They operate on standard single-phase power and consume less energy than a typical household air conditioning unit."
  },
  {
    q: "How safe are Alpha Elevators in case of a power failure?",
    a: "Safety is our absolute priority. In the event of a power outage, the elevator uses a built-in battery backup system to safely lower the cabin to the ground floor and open the doors automatically."
  },
  {
    q: "How long does installation take?",
    a: "Because there is no need for a pit or hoist-way construction, our expert technicians can typically install an Alpha Elevator in your home within 48 to 72 hours."
  },
  {
    q: "Is maintenance difficult or expensive?",
    a: "Our elevators are engineered for minimal maintenance. We provide comprehensive annual maintenance contracts (AMC) that keep your elevator running perfectly year-round at a very reasonable cost."
  }
]

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.faq-item')
    const heading = sectionRef.current.querySelector('.faq-heading')
    
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
    
    // Animate FAQ items staggering in
    gsap.fromTo(elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: "play reverse play reverse"
        }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 w-full py-32 bg-primary overflow-hidden" id="faq">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Section Header */}
        <div className="faq-heading flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-display font-light text-white uppercase tracking-wider mb-6 md:mb-0">
            Client <br/>
            <span className="text-metal italic lowercase font-sans">Inquiries</span>
          </h2>
          <div className="flex flex-col md:items-end gap-6">
            <MessageSquare className="text-white/20 mb-2" size={40} strokeWidth={1} />
            <p className="text-metal text-lg font-light max-w-sm md:text-right">
              Everything you need to know about our premium home elevator installations, engineering, and maintenance.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div 
                key={idx} 
                className={`faq-item relative overflow-hidden border transition-all duration-500 bg-white/5 backdrop-blur-md group ${isOpen ? 'border-accent/30 bg-white/10' : 'border-white/10 hover:border-white/20'}`}
              >
                {/* Accent Line when open */}
                <div className={`absolute top-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-in-out ${isOpen ? 'w-full' : 'w-0 group-hover:w-16'}`}></div>
                
                <button 
                  className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono text-[10px] tracking-widest text-accent font-bold opacity-50 w-5">0{idx + 1}</span>
                    <span className={`font-display text-lg md:text-xl font-light transition-colors duration-300 ${isOpen ? 'text-white' : 'text-metal group-hover:text-white'}`}>
                      {faq.q}
                    </span>
                  </div>
                  
                  <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500 ml-4 ${isOpen ? 'border-accent text-accent rotate-180 bg-accent/10' : 'border-white/10 text-metal group-hover:border-white/30 group-hover:text-white'}`}>
                    {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pt-1 text-metal font-light text-base leading-relaxed max-w-3xl ml-0 md:ml-10">
                    {faq.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
