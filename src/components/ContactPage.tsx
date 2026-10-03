import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, CheckCircle, Navigation, ShieldCheck, Headphones, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ContactPageProps {
  onBack?: () => void
  scrollToForm?: boolean
  initialPropertyType?: string
  initialNotes?: string
}

const offices = [
  {
    id: 'chennai',
    title: 'Head Office',
    city: 'Chennai',
    tagline: 'Corporate Headquarters & Experience Studio',
    address: '99, A-Block, Annanagar, Anna Nagar East, Chennai 600 102',
    phone: '+91 80151 29224',
    email: 'info@alphaelevators.in',
    timing: 'Mon – Sat: 9:00 AM – 7:30 PM',
    mapQuery: 'ALPHA+ELEVATORS+PVT+LTD+Anna+Nagar+Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2732346018834!2d80.21835589999999!3d13.081862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265b093953321%3A0x66bf1ccd1aacbfdd!2sALPHA%20ELEVATORS%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1756096848595!5m2!1sen!2sin',
    isHQ: true
  },
  {
    id: 'coimbatore',
    title: 'Branch Office',
    city: 'Coimbatore',
    tagline: 'Western Tamil Nadu Regional Operations',
    address: 'Grand Brenton G4, Periyar Nagar, Masakali Palayam, Coimbatore, Tamil Nadu 641015',
    phone: '+91 80151 29224',
    email: 'info@alphaelevators.in',
    timing: 'Mon – Sat: 9:00 AM – 7:30 PM',
    mapQuery: 'Grand+Brenton+G4+Periyar+Nagar+Masakali+Palayam+Coimbatore+641015',
    mapUrl: 'https://maps.google.com/maps?q=Grand+Brenton+G4+Periyar+Nagar+Masakali+Palayam+Coimbatore+641015&t=&z=15&ie=UTF8&iwloc=&output=embed',
    isHQ: false
  },
  {
    id: 'bangalore',
    title: 'Manufacturing & Tech Hub',
    city: 'Bangalore',
    tagline: 'Precision Fabrication & R&D Facility',
    address: '38/ 415/ 33-34, Peenya Industrial Area, 2nd Phase, KIADB main road, Bangalore 560058',
    phone: '+91 80151 29224',
    email: 'info@alphaelevators.in',
    timing: 'Mon – Sat: 8:30 AM – 6:30 PM',
    mapQuery: 'Peenya+Industrial+Area+2nd+Phase+Bangalore+560058',
    mapUrl: 'https://maps.google.com/maps?q=Peenya+Industrial+Area+2nd+Phase+KIADB+main+road+Bangalore+560058&t=&z=14&ie=UTF8&iwloc=&output=embed',
    isHQ: false
  }
]

export const ContactPage = ({ 
  onBack, 
  scrollToForm = false, 
  initialPropertyType, 
  initialNotes 
}: ContactPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedOffice, setSelectedOffice] = useState(offices[0])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Chennai',
    propertyType: initialPropertyType || 'Luxury Villa',
    stops: '2 Stops',
    message: initialNotes || ''
  })

  useEffect(() => {
    if (scrollToForm) {
      const timer = setTimeout(() => {
        const formEl = document.getElementById('contact-form')
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [scrollToForm])

  useEffect(() => {
    if (initialNotes) {
      setFormData(prev => ({ ...prev, message: initialNotes }))
    }
    if (initialPropertyType) {
      setFormData(prev => ({ ...prev, propertyType: initialPropertyType }))
    }
  }, [initialNotes, initialPropertyType])

  useEffect(() => {
    if (!scrollToForm) {
      window.scrollTo(0, 0)
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('.cp-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.cp-hero-title span', { y: '110%' }, { y: '0%', duration: 1.2, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .fromTo('.cp-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.7')
        .fromTo('.cp-hero-desc', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .fromTo('.cp-quick-badge', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')

      gsap.fromTo('.cp-reveal-card', { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-offices-grid', start: 'top 85%' }
      })

      gsap.fromTo('.cp-form-container', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-form-section', start: 'top 80%' }
      })

      gsap.fromTo('.cp-map-section', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-map-section', start: 'top 85%' }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-white w-full overflow-hidden font-sans">
      <style>{`
        .cp-glass-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cp-glass-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 204, 204, 0.35);
          box-shadow: 0 20px 40px -15px rgba(0, 204, 204, 0.12);
        }
        .cp-input-group input, .cp-input-group textarea, .cp-input-group select {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f5f5f5;
          padding: 14px 18px;
          font-size: 14px;
          border-radius: 4px;
          transition: all 0.3s ease;
          outline: none;
        }
        .cp-input-group input:focus, .cp-input-group textarea:focus, .cp-input-group select:focus {
          border-color: #00cccc;
          background: rgba(0, 204, 204, 0.04);
          box-shadow: 0 0 20px rgba(0, 204, 204, 0.15);
        }
        .cp-input-group select option {
          background: #0d0d0d;
          color: #ffffff;
        }
        .cp-tab-btn {
          padding: 12px 24px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          border-radius: 2px;
        }
        .cp-tab-btn.active {
          border-color: #00cccc;
          background: rgba(0, 204, 204, 0.1);
          color: #00cccc;
        }
      `}</style>

      {/* ─── Fixed Corporate Navigation Bar ─── */}
      {onBack && (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-primary/70 backdrop-blur-xl border-b border-white/5">
          <button onClick={onBack} className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300">
            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="font-display tracking-[0.15em] text-xs uppercase hidden sm:block">Back to Home</span>
          </button>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase hidden md:block">Contact Alpha</span>
            <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
            <img src="/logo.png" alt="Alpha Elevators" className="h-7 opacity-80" />
          </div>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO — Contact & Direct Communications
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[65vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
          <div className="cp-hero-tag flex items-center gap-4">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.35em] text-xs font-semibold">Direct Communication</span>
          </div>

          <h1 className="cp-hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light uppercase tracking-tight leading-[0.95]">
            <div className="overflow-hidden"><span className="inline-block">Connect With</span></div>
            <div className="overflow-hidden"><span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">Precision.</span></div>
          </h1>

          <div className="cp-hero-line h-[1px] bg-gradient-to-r from-accent via-white/20 to-transparent origin-left"></div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <p className="cp-hero-desc text-metal text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Connect directly with our senior lift engineers and architectural consultants.
              Whether planning a luxury residence in Chennai, a modern villa in Coimbatore,
              or a custom high-speed glass elevator across South India, we are at your service.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a 
                href="tel:+918015129224"
                className="cp-quick-badge flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-primary font-semibold text-xs tracking-[0.18em] uppercase hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,204,204,0.3)]"
              >
                <Phone size={15} strokeWidth={2.5} />
                <span>+91 80151 29224</span>
              </a>
              <a 
                href="https://wa.me/918015129224?text=Hi%20Alpha%20Elevators%2C%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20home%20elevator."
                target="_blank"
                rel="noopener noreferrer"
                className="cp-quick-badge flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs tracking-[0.18em] uppercase hover:bg-emerald-500/20 transition-all duration-300"
              >
                <MessageSquare size={15} strokeWidth={2} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-xs text-white/70 tracking-wider">Free Site Feasibility</span>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-xs text-white/70 tracking-wider">24/7 Breakdown Help</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-xs text-white/70 tracking-wider">&lt;2 Hours Response</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-xs text-white/70 tracking-wider">Zero-Pit Technology</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          OFFICES & FACILITIES (3 Real Locations)
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-accent text-xs font-mono tracking-[0.3em] uppercase block mb-3">Our Presence</span>
              <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight">
                Offices &amp; <span className="italic text-metal font-sans font-normal">Facilities</span>
              </h2>
            </div>
            <p className="text-metal text-sm font-light max-w-md mt-4 md:mt-0">
              Visit our headquarters in Chennai, regional branch in Coimbatore, or state-of-the-art manufacturing facility in Bangalore.
            </p>
          </div>

          <div className="cp-offices-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offices.map((office) => {
              const isCurrent = selectedOffice.id === office.id
              return (
                <div 
                  key={office.id} 
                  className={`cp-reveal-card cp-glass-card p-8 md:p-10 rounded-sm relative flex flex-col justify-between cursor-pointer ${
                    isCurrent ? 'border-accent/40 bg-accent/[0.04]' : ''
                  }`}
                  onClick={() => setSelectedOffice(office)}
                >
                  {office.isHQ && (
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-mono font-medium rounded-full bg-accent/15 border border-accent/30 text-accent">
                        Headquarters
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono text-accent tracking-[0.25em] uppercase block mb-2">{office.city}</span>
                    <h3 className="text-2xl font-display font-light text-white mb-2">{office.title}</h3>
                    <p className="text-xs text-metal/70 mb-6 font-light">{office.tagline}</p>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-white/80 font-light leading-relaxed">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-sm text-white hover:text-accent font-light transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
                        <a href={`mailto:${office.email}`} className="text-sm text-white hover:text-accent font-light transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
                        <span className="text-xs text-white/60 font-light">{office.timing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOffice(office)
                        document.getElementById('cp-map-anchor')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-xs tracking-[0.2em] uppercase text-accent hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <Navigation size={14} />
                      <span>View on Map</span>
                    </button>

                    <a 
                      href={`https://maps.google.com/?q=${office.mapQuery}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all duration-300"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INTERACTIVE CONSULTATION FORM + DIRECT ASSISTANCE
      ═══════════════════════════════════════════════════ */}
      <section className="cp-form-section py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-secondary relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Column (7 cols) */}
            <div id="contact-form" className="cp-form-container lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 md:p-14 rounded-sm relative shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-accent"></div>
                <span className="text-accent tracking-[0.25em] text-xs uppercase font-mono">Custom Proposal</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-display font-light text-white mb-3">
                Request an <span className="italic font-sans text-metal">Architectural Consultation</span>
              </h3>
              <p className="text-metal text-sm font-light leading-relaxed mb-10">
                Share your property specifications for a customized shaft feasibility assessment, 3D render preview, and itemized quotation.
              </p>

              {formSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent mb-2">
                    <CheckCircle size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-display font-light text-white">Consultation Request Received</h4>
                  <p className="text-metal text-sm font-light max-w-md">
                    Thank you, <span className="text-white font-medium">{formData.name || 'Valued Client'}</span>. A Senior Lift Engineer from our {formData.city} office will contact you within 2 business hours.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-8 py-3 border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anandha Krishnan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="anand@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Location / City</label>
                      <select 
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Trichy">Trichy / Rest of Tamil Nadu</option>
                        <option value="Other">Other Region</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Property Type</label>
                      <select 
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      >
                        <option value="Luxury Villa">Luxury Villa / Bungalow</option>
                        <option value="Penthouse / Duplex">Penthouse / Duplex Apartment</option>
                        <option value="Existing House Retrofit">Existing House (Retrofit)</option>
                        <option value="Commercial / Office">Commercial / Boutique Office</option>
                        <option value="Glass Elevator Showcase">Glass Panoramic Lift</option>
                      </select>
                    </div>
                    <div className="cp-input-group space-y-2">
                      <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Number of Floors</label>
                      <select 
                        value={formData.stops}
                        onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
                      >
                        <option value="2 Stops">G + 1 (2 Stops)</option>
                        <option value="3 Stops">G + 2 (3 Stops)</option>
                        <option value="4 Stops">G + 3 (4 Stops)</option>
                        <option value="5+ Stops">G + 4 or Higher (5+ Stops)</option>
                      </select>
                    </div>
                  </div>

                  <div className="cp-input-group space-y-2">
                    <label className="text-[11px] font-mono tracking-widest text-white/60 uppercase">Project Notes / Architectural Requirements</label>
                    <textarea 
                      rows={3} 
                      placeholder="Mention any shaft constraints, glass design preferences, or site dimensions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-4 px-8 bg-accent text-primary font-semibold tracking-[0.25em] uppercase text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 group"
                    >
                      <span>Submit Consultation Request</span>
                      <ArrowRight size={16} strokeWidth={2} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Assistance & Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Senior Engineer Consultation Card */}
              <div className="cp-glass-card p-8 md:p-10 rounded-sm">
                <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase block mb-3">Instant Hotline</span>
                <h4 className="text-2xl font-display font-light text-white mb-4">Direct Voice Support</h4>
                <p className="text-metal text-sm font-light leading-relaxed mb-6">
                  Speak directly with an engineering director to discuss your shaft dimensions, electric power requirements, or custom glass finishes.
                </p>

                <div className="p-5 bg-white/5 border border-white/10 rounded-sm mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Toll-Free Direct Line</span>
                    <a href="tel:+918015129224" className="text-xl md:text-2xl font-light text-white hover:text-accent transition-colors">
                      +91 80151 29224
                    </a>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <a 
                  href="https://wa.me/918015129224?text=Hi%20Alpha%20Elevators%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit."
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-sm border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-3 hover:bg-emerald-500/20 transition-all duration-300"
                >
                  <MessageSquare size={16} />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              {/* Working Hours & Support Info */}
              <div className="cp-glass-card p-8 md:p-10 rounded-sm">
                <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase block mb-3">Service Hours</span>
                <h4 className="text-xl font-display font-light text-white mb-6">Operating Schedule</h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-sm text-metal font-light">Monday – Saturday</span>
                    <span className="text-sm text-white font-medium">9:00 AM – 7:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-sm text-metal font-light">Sunday</span>
                    <span className="text-xs text-accent font-mono uppercase">By Appointment</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-metal font-light">Emergency Breakdown Help</span>
                    <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono">24/7 / 365 Days</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="cp-glass-card p-6 md:p-8 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Follow Our Installations</span>
                  <span className="text-sm text-white font-light">Official Social Channels</span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61574980840453" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/alphaelevatorsservices/?next=%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/alpha-elevator/?viewAsMember=true" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INTERACTIVE GOOGLE MAPS SECTION (Scraped from contact.php)
      ═══════════════════════════════════════════════════ */}
      <section id="cp-map-anchor" className="cp-map-section py-20 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-accent text-xs font-mono tracking-[0.3em] uppercase block mb-3">Live Geo-Coordinates</span>
              <h3 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight">
                Satellite <span className="italic text-metal font-sans font-normal">Navigation</span>
              </h3>
            </div>

            {/* Office Switcher Tabs for Map */}
            <div className="flex flex-wrap gap-2">
              {offices.map(office => (
                <button
                  key={office.id}
                  onClick={() => setSelectedOffice(office)}
                  className={`cp-tab-btn ${selectedOffice.id === office.id ? 'active' : 'text-white/60 hover:text-white'}`}
                >
                  {office.city}
                </button>
              ))}
            </div>
          </div>

          {/* Map Frame Container */}
          <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] bg-[#0d0d0d]">
            
            {/* Top Bar for Map */}
            <div className="px-6 py-4 bg-[#121212] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                  {selectedOffice.title} — {selectedOffice.city}
                </span>
              </div>
              <div className="text-xs text-metal font-light flex items-center gap-2">
                <MapPin size={13} className="text-accent" />
                <span>{selectedOffice.address}</span>
              </div>
            </div>

            {/* Embedded Responsive Map */}
            <div className="w-full h-[450px] md:h-[550px] relative bg-[#0a0a0a]">
              <iframe
                title={`Map for ${selectedOffice.title}`}
                src={selectedOffice.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Info Ribbon */}
            <div className="p-6 bg-[#121212]/95 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-metal font-light text-center md:text-left">
                Need on-site navigation assistance? Call our front desk at <span className="text-accent">{selectedOffice.phone}</span>.
              </p>
              <a 
                href={`https://maps.google.com/?q=${selectedOffice.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-accent/40 bg-accent/10 text-accent text-xs tracking-[0.2em] uppercase font-semibold hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden border-t border-white/5 bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light mb-6 leading-tight">
            Elevate Your <span className="text-accent italic">Living Space.</span>
          </h2>
          <p className="text-metal text-base md:text-lg font-light leading-relaxed mb-10">
            Book an obligation-free 30-minute consultation with an Alpha Elevators engineering specialist today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918015129224"
              className="px-10 py-4 bg-accent text-primary font-semibold text-xs tracking-[0.25em] uppercase hover:bg-white transition-all duration-300"
            >
              Call +91 80151 29224
            </a>
            {onBack && (
              <button
                onClick={onBack}
                className="px-10 py-4 border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-300 text-xs tracking-[0.25em] uppercase"
              >
                Explore Homepage
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
