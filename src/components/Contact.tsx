import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current) return
    const card = sectionRef.current.querySelector('.contact-card')
    const formCard = sectionRef.current.querySelector('.form-card')
    const elements = sectionRef.current.querySelectorAll('.reveal-elem')
    
    if (card) {
      // Animate contact card sliding in from right
      gsap.fromTo(card,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: "play reverse play reverse"
          }
        }
      )
      
      // Animate the accent line drawing
      const line = card.querySelector('.accent-line')
      if (line) {
        gsap.fromTo(line,
          { width: 48 },
          {
            width: 48, // Already defined in css/tailwind? No, let's keep it robust.
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }
    }

    if (formCard) {
      // Animate form card sliding in from left
      gsap.fromTo(formCard,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }
    
    // Stagger animate all inner elements (from both cards)
    if (elements.length > 0) {
      gsap.fromTo(elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen relative z-10 w-full flex items-center py-32 overflow-hidden" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Enquiry Form (Left Side) */}
          <div className="form-card bg-graphite/80 backdrop-blur-xl p-10 md:p-14 border border-white/10 rounded-sm relative overflow-hidden shadow-2xl">
            <h3 className="reveal-elem text-3xl font-display font-light text-white mb-2">
              Send an <span className="italic font-sans text-metal">Enquiry</span>
            </h3>
            <p className="reveal-elem text-metal mb-10 font-light text-sm">
              Fill out the form below and our engineering team will reach out shortly.
            </p>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="reveal-elem grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group/input">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-focus-within:text-accent transition-colors">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-accent transition-colors placeholder:text-white/20" placeholder="John" />
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-focus-within:text-accent transition-colors">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-accent transition-colors placeholder:text-white/20" placeholder="Doe" />
                </div>
              </div>
              
              <div className="reveal-elem space-y-2 group/input">
                <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-focus-within:text-accent transition-colors">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-accent transition-colors placeholder:text-white/20" placeholder="john@example.com" />
              </div>
              
              <div className="reveal-elem space-y-2 group/input">
                <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-focus-within:text-accent transition-colors">Phone Number</label>
                <input type="tel" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-accent transition-colors placeholder:text-white/20" placeholder="+91 98765 43210" />
              </div>
              
              <div className="reveal-elem space-y-2 group/input">
                <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-focus-within:text-accent transition-colors">Message</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-white/20" placeholder="Tell us about your architectural requirements..."></textarea>
              </div>
              
              <div className="reveal-elem pt-4">
                <button type="submit" className="w-full py-4 px-8 bg-accent text-primary font-semibold tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 group/submit">
                  <span>Submit Enquiry</span>
                  <ArrowRight size={16} strokeWidth={2} className="transform group-hover/submit:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact Details (Right Side) */}
          <div className="contact-card bg-white/5 backdrop-blur-xl p-10 md:p-14 border border-white/10 rounded-sm relative overflow-hidden group shadow-2xl">
            
            {/* Animated Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-accent accent-line w-0"></div>
              <span className="text-accent tracking-[0.3em] text-sm uppercase">Contact Us</span>
            </div>
            
            <h2 className="reveal-elem text-4xl md:text-5xl font-display font-light text-white mb-4">
              Get in <span className="italic font-sans text-metal">Touch</span>
            </h2>
            <p className="reveal-elem text-metal mb-12 font-light text-lg">
              Experience the future of vertical mobility. Connect with our experts today.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              <div className="reveal-elem flex items-start gap-6 group/item">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent transition-colors duration-500">
                  <Phone size={20} strokeWidth={1.5} className="text-metal group-hover/item:text-accent transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono text-metal tracking-widest mb-1 uppercase">Call Us</div>
                  <a href="tel:+918015129224" className="text-lg text-white hover:text-accent transition-colors block font-light">+91 80151 29224</a>
                </div>
              </div>
              
              <div className="reveal-elem flex items-start gap-6 group/item">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent transition-colors duration-500">
                  <Mail size={20} strokeWidth={1.5} className="text-metal group-hover/item:text-accent transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono text-metal tracking-widest mb-1 uppercase">Email</div>
                  <a href="mailto:info@alphaelevators.in" className="text-lg text-white hover:text-accent transition-colors block font-light">info@alphaelevators.in</a>
                </div>
              </div>

              <div className="reveal-elem flex items-start gap-6 group/item">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent transition-colors duration-500">
                  <MapPin size={20} strokeWidth={1.5} className="text-metal group-hover/item:text-accent transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono text-metal tracking-widest mb-1 uppercase">Head Office</div>
                  <address className="text-white/90 font-light not-italic leading-relaxed">
                    99, A-Block, Annanagar,<br/>
                    Anna Nagar East,<br/>
                    Chennai 600 102
                  </address>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            {/* <div className="reveal-elem hidden lg:block opacity-0 pointer-events-none">
               
               <button className="w-full py-4 px-8 border border-white/20 bg-transparent"></button>
            </div> */}

          </div>
        </div>
        
      </div>
    </section>
  )
}
