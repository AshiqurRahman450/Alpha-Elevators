import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const elements = sectionRef.current.querySelectorAll('.faq-item')
    
    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    )
  }, [])

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

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex items-center justify-center py-32 bg-primary" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 faq-item">
          <h2 className="text-4xl md:text-5xl font-display font-light text-white uppercase tracking-wider mb-6">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item border transition-colors duration-300 ${openIdx === idx ? 'border-accent bg-accent/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
            >
              <button 
                className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className={`font-display text-lg ${openIdx === idx ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <span className={`text-2xl font-light transition-transform duration-300 ${openIdx === idx ? 'rotate-45 text-accent' : 'text-metal'}`}>
                  +
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-6 text-metal font-light leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
