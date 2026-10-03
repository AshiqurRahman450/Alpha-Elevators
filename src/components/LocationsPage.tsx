import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  MessageCircle, 
  Calendar, 
  Layers, 
  X,
  Award,
  Home
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export type LocationCity = 'chennai' | 'coimbatore' | 'all'

interface LocationsPageProps {
  onBack?: () => void
  initialCity?: LocationCity
}

/* ─── Animated Counter that triggers on every scroll ─── */
const AnimatedCounter = ({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: end,
          duration,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            if (el) el.textContent = Math.ceil(Number(el.textContent || '0')) + suffix
          }
        })
      },
      onLeaveBack: () => {
        if (el) el.textContent = '0' + suffix
      },
      onEnterBack: () => {
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: end,
          duration: 1.2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            if (el) el.textContent = Math.ceil(Number(el.textContent || '0')) + suffix
          }
        })
      }
    })
    return () => trigger.kill()
  }, [end, suffix, duration])

  return <span ref={ref}>0{suffix}</span>
}

export const LocationsPage = ({ onBack, initialCity = 'chennai' }: LocationsPageProps) => {
  const [activeTab, setActiveTab] = useState<LocationCity>(initialCity)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [modalCity, setModalCity] = useState<'Chennai' | 'Coimbatore'>('Chennai')
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageCardRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLImageElement>(null)

  // Sync initialCity when prop changes
  useEffect(() => {
    if (initialCity) {
      setActiveTab(initialCity)
      setModalCity(initialCity === 'coimbatore' ? 'Coimbatore' : 'Chennai')
    }
  }, [initialCity])

  // Scroll to top upon switching tabs and recalculate ScrollTriggers
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
    return () => clearTimeout(timer)
  }, [activeTab])

  /* ─── Scroll-driven GSAP animations on EVERY section on EVERY scroll ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      const heroTL = gsap.timeline({ delay: 0.15 })
      heroTL
        .fromTo('.loc-badge', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.loc-title span', { y: '110%' }, { y: '0%', duration: 1.1, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
        .fromTo('.loc-divider', { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power3.inOut' }, '-=0.6')
        .fromTo('.loc-desc', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
        .fromTo('.loc-hero-img-wrap', 
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 0.95 }, 
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 1.3, ease: 'power4.inOut' }, 
          '-=0.9'
        )

      // Section animations: Animate EVERY individual .scroll-block on every scroll (down & up)
      const blocks = containerRef.current?.querySelectorAll('.scroll-block')
      blocks?.forEach((block) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          }
        })

        // 1. Draw horizontal decorative lines
        const lines = block.querySelectorAll('.line-reveal')
        if (lines.length > 0) {
          tl.fromTo(lines, 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 0.9, ease: 'power3.inOut', transformOrigin: 'left center' }, 
            0
          )
        }

        // 2. Animate headings, subtitles, and paragraphs
        const revealElems = block.querySelectorAll('.reveal-elem')
        if (revealElems.length > 0) {
          tl.fromTo(revealElems, 
            { y: 35, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, 
            lines.length > 0 ? 0.08 : 0
          )
        }

        // 3. Clip-path wipe reveal for photos
        const imgWrappers = block.querySelectorAll('.img-reveal-wrap')
        if (imgWrappers.length > 0) {
          tl.fromTo(imgWrappers,
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.96 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.1, ease: 'power4.inOut' },
            0.1
          )
        }

        // 4. Stagger cards (Elevator types, Services, Localities, Comparison cards)
        const cards = block.querySelectorAll('.stagger-card')
        if (cards.length > 0) {
          tl.fromTo(cards, 
            { y: 40, opacity: 0, scale: 0.96 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 
            revealElems.length > 0 ? 0.15 : 0
          )

          // 5. Draw top accent lines on each card
          const cardLines = block.querySelectorAll('.card-accent-line')
          if (cardLines.length > 0) {
            tl.fromTo(cardLines,
              { width: '0%' },
              { width: '100%', duration: 0.85, stagger: 0.07, ease: 'power3.inOut' },
              0.25
            )
          }
        }

        // 6. Stagger FAQ items
        const faqItems = block.querySelectorAll('.faq-item-reveal')
        if (faqItems.length > 0) {
          tl.fromTo(faqItems,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: 'power3.out' },
            0.15
          )
        }
      })

      // Image Parallax scrub across all image containers
      const parallaxImages = containerRef.current?.querySelectorAll('.img-parallax')
      parallaxImages?.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.scroll-block') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [activeTab])

  /* ─── 3D Hover tilt on Hero Image ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageCardRef.current || !imageInnerRef.current) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    gsap.to(heroImageCardRef.current, {
      rotationY: x * 10,
      rotationX: -y * 10,
      ease: 'power2.out',
      duration: 0.8,
      transformPerspective: 1600
    })
    gsap.to(imageInnerRef.current, {
      scale: 1.04,
      x: -x * 12,
      y: -y * 12,
      ease: 'power2.out',
      duration: 0.8
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!heroImageCardRef.current || !imageInnerRef.current) return
    gsap.to(heroImageCardRef.current, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 1.2 })
    gsap.to(imageInnerRef.current, { x: 0, y: 0, scale: 1, ease: 'power3.out', duration: 1.2 })
  }, [])

  // Chennai Localities
  const chennaiAreas = [
    { name: 'ECR (East Coast Road)', desc: 'Luxury Beachfront Villas & Estates', badge: 'High Demand' },
    { name: 'OMR (IT Expressway)', desc: 'High-Tech Duplexes & Penthouses', badge: 'Active' },
    { name: 'Anna Nagar East & West', desc: 'Central Flagship Vicinity & Bungalows', badge: 'Flagship HQ' },
    { name: 'Adyar & Besant Nagar', desc: 'Heritage Multi-Level Residences', badge: 'Active' },
    { name: 'T. Nagar & Teynampet', desc: 'Central Prime Residential Hubs', badge: 'Active' },
    { name: 'Velachery', desc: 'Modern Luxury Independent Villas', badge: 'Active' },
    { name: 'Tambaram & Chromepet', desc: 'South Chennai Residential Corridors', badge: 'Active' },
    { name: 'Porur & Ramapuram', desc: 'West Chennai Expanding Estates', badge: 'Active' },
    { name: 'Ambattur & Mogappair', desc: 'Premium Residential & Commercial', badge: 'Active' },
    { name: 'Guindy & Alwarpet', desc: 'Elite City Residences & Suites', badge: 'Active' },
  ]

  // Coimbatore Localities
  const coimbatoreAreas = [
    { name: 'RS Puram', desc: 'Prestigious Independent Villas & Duplexes', badge: 'Prime' },
    { name: 'Peelamedu', desc: 'Modern Multi-Floor Residences & IT Zone', badge: 'Active' },
    { name: 'Race Course', desc: 'Ultra-Luxury Penthouses & Exclusive Homes', badge: 'Luxury' },
    { name: 'Avinashi Road', desc: 'Key Commercial & High-Rise Corridor', badge: 'Active' },
    { name: 'Gandhipuram', desc: 'Central Commercial & Residential Hub', badge: 'Active' },
    { name: 'Singanallur', desc: 'Gated Communities & Multi-Storey Homes', badge: 'Active' },
    { name: 'Saravanampatti', desc: 'Tech City Gated Villas & Modern Estates', badge: 'High Growth' },
    { name: 'Saibaba Colony', desc: 'Established Heritage & Luxury Homes', badge: 'Active' },
  ]

  // Chennai Elevator Types
  const chennaiElevatorTypes = [
    {
      title: 'Residential Lifts',
      tag: 'Villas & Duplexes',
      desc: 'Engineered specifically for private villas, duplex homes, and low-rise residences. Whisper-quiet operation and seamless architectural integration.',
      points: ['Whisper-quiet travel', 'Custom cabin interior aesthetics', 'Tailored for 2 to 6 passengers']
    },
    {
      title: 'Pitless Home Elevators',
      tag: 'Zero Civil Excavation',
      desc: 'Designed for existing homes where excavating a deep civil pit is structurally impossible or undesirable. Installs directly on the finished floor level.',
      points: ['Zero pit depth required', 'Preserves floor integrity', 'Ideal for interior retrofit projects']
    },
    {
      title: 'Shaftless Elevators',
      tag: 'Ultra-Compact Footprint',
      desc: 'Self-supporting minimalist glass lift structure requiring minimal civil disruption and zero separate shaft walls. Fits seamlessly through floor openings.',
      points: ['Minimalist footprint', 'Panoramic ambient light', 'Fast 4-day installation timeline']
    },
    {
      title: 'Hydraulic Home Lifts',
      tag: 'German Power Unit',
      desc: 'Smooth ride quality with German hydraulic components. Features 80% jerk reduction and environmentally sealed oil systems requiring service only once in 10 years.',
      points: ['Jerk-free start & stop', 'Ultra-safe battery descent', 'Heavy payload capability']
    },
    {
      title: 'MRL Home Elevators',
      tag: 'Machine-Room-Less',
      desc: 'State-of-the-art permanent magnet synchronous gearless traction technology that eliminates the need for an overhead machine room, saving immense headroom space.',
      points: ['Single-phase power friendly', 'Up to 50% energy savings', 'Smooth high-speed performance']
    },
    {
      title: 'Luxury Panoramic Elevators',
      tag: '360° Glass Finishes',
      desc: 'The jewel of luxury homes: high-tensile curved or flat laminated safety glass cabins with custom brushed gold, champagne brass, and illuminated ceilings.',
      points: ['Full transparent visibility', 'Designer touch panels', 'Architectural centerpiece']
    }
  ]

  // Coimbatore FAQs
  const coimbatoreFaqs = [
    {
      q: 'How much does it cost to install a home elevator in Coimbatore?',
      a: 'The investment for a home elevator in Coimbatore varies depending on the drive mechanism (hydraulic, traction MRL, or belt-driven), cabin size, number of stops (G+1 to G+5), and custom architectural finishes like panoramic glass or champagne trims. Contact our local Coimbatore engineering team at +91 80151 29224 for a complimentary site assessment and transparent, fixed-price quotation.'
    },
    {
      q: 'Can a home elevator be installed in an existing house or small space?',
      a: 'Absolutely. Alpha Elevators specializes in compact, retrofit-friendly pitless and shaftless models. Our systems require zero deep pit excavation and no separate concrete machine room, making them ideal for existing bungalows, duplexes, and staircase voids with minimal civil alterations.'
    },
    {
      q: 'Do you offer Annual Maintenance Contracts (AMC) in Coimbatore?',
      a: 'Yes. We provide comprehensive Annual Maintenance Contracts (AMC) with preventative safety audits, lubricant checks, sensor calibrations, and 24/7 priority emergency dispatch. Our certified technicians maintain lifts across Coimbatore to European safety standards.'
    },
    {
      q: 'How quickly can your Coimbatore service team respond to repairs?',
      a: 'Our localized Coimbatore dispatch hub in Masakali Palayam operates a 24/7 emergency response hotline. Urgent service calls are addressed within hours, and standard scheduled maintenance or minor repairs are completed within 24 hours using genuine spare parts.'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-white w-full overflow-hidden font-sans selection:bg-accent selection:text-primary">
      
      {/* ═══════════════════════════════════════════════════════════
          STICKY LUXURY NAVIGATION HEADER
      ═══════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-12 py-4 flex justify-between items-center bg-primary/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        
        {/* Left: Back to Home */}
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300"
          aria-label="Back to home"
        >
          <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-x-0.5" />
          </div>
          <span className="font-display tracking-[0.15em] text-xs uppercase hidden sm:inline-block">Return to Main</span>
        </button>

        {/* Center: City Selector Tabs */}
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          <button
            onClick={() => setActiveTab('chennai')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'chennai' 
                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'chennai' ? 'bg-primary' : 'bg-accent'}`} />
            Chennai HQ
          </button>

          <button
            onClick={() => setActiveTab('coimbatore')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'coimbatore' 
                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'coimbatore' ? 'bg-primary' : 'bg-accent'}`} />
            Coimbatore Hub
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`hidden md:flex px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 items-center gap-2 ${
              activeTab === 'all' 
                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            All Hubs
          </button>
        </div>

        {/* Right: CTA & Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => {
              setModalCity(activeTab === 'coimbatore' ? 'Coimbatore' : 'Chennai')
              setShowQuoteModal(true)
            }}
            className="px-4 sm:px-6 py-2.5 bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-primary transition-all duration-300 rounded text-xs font-medium tracking-widest uppercase flex items-center gap-2"
          >
            <Calendar size={13} />
            <span className="hidden md:inline">Book Site Survey</span>
            <span className="md:hidden">Quote</span>
          </button>

          <div className="w-[1px] h-6 bg-white/10 hidden lg:block" />
          <img src="/logo.png" alt="Alpha Elevators" className="h-7 opacity-85 hidden lg:block" />
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — DYNAMIC LUXURY HERO
      ═══════════════════════════════════════════════════════════ */}
      <section 
        ref={heroRef}
        className="relative w-full min-h-[92vh] flex flex-col justify-end pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Badge & Eyebrow */}
          <div className="loc-badge flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent text-xs tracking-[0.25em] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {activeTab === 'coimbatore' 
                ? 'Western Tamil Nadu Hub' 
                : activeTab === 'chennai' 
                  ? 'State Headquarters & Experience Center' 
                  : 'Tamil Nadu Operations'}
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase hidden sm:inline">
              ISO 9001 Certified &bull; European Safety Standard
            </span>
          </div>

          {/* Dynamic Headline */}
          <div className="loc-title flex flex-col gap-2">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-light uppercase tracking-tight leading-[0.95] text-white">
                <span className="inline-block">
                  {activeTab === 'coimbatore' ? 'Elevators in' : 'Home Elevators in'}
                </span>{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent font-normal">
                  {activeTab === 'coimbatore' ? 'Coimbatore' : activeTab === 'chennai' ? 'Chennai' : 'Tamil Nadu'}
                </span>
              </h1>
            </div>
            <p className="loc-desc text-metal text-lg sm:text-2xl font-light tracking-wide max-w-3xl mt-4 leading-relaxed">
              {activeTab === 'coimbatore' 
                ? 'Bespoke residential lifts engineered for modern villas, duplexes, and bungalows in Coimbatore. Zero pit, whisper-quiet travel, and 24/7 service.'
                : 'Complete luxury elevator solutions from installation to regular maintenance & emergency repairs. Safe, stylish, space-saving designs for discerning homeowners.'}
            </p>
          </div>

          {/* Animated Gold Divider Line */}
          <div className="loc-divider h-[1px] bg-gradient-to-r from-accent via-white/20 to-transparent origin-left w-full" />

          {/* Quick Metrics Strip */}
          <div className="loc-desc grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-white/5">
            <div className="flex flex-col">
              <span className="text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase mb-1">Safety Benchmark</span>
              <span className="text-white text-xl sm:text-2xl font-display flex items-center gap-2">
                <ShieldCheck className="text-accent" size={20} />
                100% Compliant
              </span>
              <span className="text-white/40 text-xs mt-0.5">MD 2006/42/EC &bull; EN 81-41</span>
            </div>

            <div className="flex flex-col">
              <span className="text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase mb-1">Local Network</span>
              <span className="text-white text-xl sm:text-2xl font-display flex items-center gap-2">
                <Award className="text-accent" size={20} />
                <AnimatedCounter end={activeTab === 'coimbatore' ? 500 : 1200} suffix="+" />
              </span>
              <span className="text-white/40 text-xs mt-0.5">Satisfied Installations</span>
            </div>

            <div className="flex flex-col">
              <span className="text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase mb-1">Civil Construction</span>
              <span className="text-white text-xl sm:text-2xl font-display flex items-center gap-2">
                <Home className="text-accent" size={20} />
                Zero Pit
              </span>
              <span className="text-white/40 text-xs mt-0.5">No Machine Room Needed</span>
            </div>

            <div className="flex flex-col">
              <span className="text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase mb-1">Local Response</span>
              <span className="text-white text-xl sm:text-2xl font-display flex items-center gap-2">
                <Clock className="text-accent" size={20} />
                &lt; 24h
              </span>
              <span className="text-white/40 text-xs mt-0.5">24/7 Emergency Dispatch</span>
            </div>
          </div>

          {/* Hero Actions & Interactive Hero Image Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Left CTAs & Highlights */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setModalCity(activeTab === 'coimbatore' ? 'Coimbatore' : 'Chennai')
                    setShowQuoteModal(true)
                  }}
                  className="px-8 py-4 bg-accent text-primary font-bold text-xs tracking-[0.2em] uppercase rounded hover:bg-white hover:text-primary transition-all duration-300 shadow-xl shadow-accent/15 flex items-center gap-3"
                >
                  <span>Request Free Site Survey</span>
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>

                <a
                  href="tel:+918015129224"
                  className="px-6 py-4 bg-white/5 border border-white/15 text-white hover:border-accent hover:text-accent transition-all duration-300 rounded text-xs tracking-[0.2em] uppercase flex items-center gap-3"
                >
                  <Phone size={15} className="text-accent" />
                  <span>+91 80151 29224</span>
                </a>

                <a
                  href="https://wa.me/918015129224?text=Hi%20Alpha%20Elevators%2C%20I%20would%20like%20to%20know%20more%20about%20home%20elevators"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 rounded text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Local office callout snippet */}
              <div className="p-5 rounded-lg bg-white/[0.03] border border-white/10 flex items-start gap-4 backdrop-blur-md">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white text-sm font-semibold tracking-wide">
                    {activeTab === 'coimbatore' ? 'Coimbatore Regional Hub' : 'Chennai Headquarters'}
                  </h4>
                  <p className="text-metal text-xs font-light mt-1 leading-relaxed">
                    {activeTab === 'coimbatore'
                      ? 'Grand Brenton G4, Periyar Nagar, Masakali Palayam, Coimbatore, Tamil Nadu 641015'
                      : '99, A-Block, Annanagar, Anna Nagar East, Chennai 600 102'}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono text-accent">
                    Open Mon - Sat &bull; 9:00 AM - 8:00 PM &bull; Walk-in Consultations Welcome
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 3D Perspective Tilt Card with Scraped Photo */}
            <div 
              className="lg:col-span-6 relative perspective-1000 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                ref={heroImageCardRef}
                className="loc-hero-img-wrap relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-transparent p-2 shadow-2xl transition-transform duration-200"
              >
                <div className="relative h-[340px] sm:h-[420px] rounded-xl overflow-hidden bg-black">
                  <img
                    ref={imageInnerRef}
                    src={activeTab === 'coimbatore' 
                      ? '/locations/coimbatore-home-elevator.webp' 
                      : '/locations/chennai-luxury-elevator.webp'}
                    alt={activeTab === 'coimbatore' ? 'Home Elevator in Coimbatore' : 'Luxury Home Elevator in Chennai'}
                    className="w-full h-full object-cover transition-transform duration-700 brightness-95"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Luxury Tag on Image */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-primary/80 backdrop-blur-md border border-white/15 rounded-full flex items-center gap-2">
                    <Sparkles className="text-accent" size={14} />
                    <span className="text-[11px] uppercase tracking-widest text-white font-medium">
                      {activeTab === 'coimbatore' ? 'Real Coimbatore Installation' : 'Chennai Duplex Installation'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-primary/70 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-semibold uppercase tracking-wider">
                        {activeTab === 'coimbatore' ? 'Zero-Pit Compact Lift System' : 'Architectural Glass & Stainless Finish'}
                      </p>
                      <p className="text-metal text-[11px] font-light">Custom engineered for Indian architectural layouts</p>
                    </div>
                    <img src="/locations/safety-standard.svg" alt="Safety Standard" className="h-9 w-auto opacity-90 hidden sm:block" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — DETAILED CITY CONTENT (CHENNAI OR COIMBATORE)
      ═══════════════════════════════════════════════════════════ */}
      
      {/* ─── CHENNAI DEEP SECTION ─── */}
      {(activeTab === 'chennai' || activeTab === 'all') && (
        <div className="w-full py-24 px-6 md:px-12 lg:px-20 border-t border-white/10 relative bg-[#070707]">
          <div className="max-w-7xl mx-auto flex flex-col gap-28">

            {/* Block 1: Section Header */}
            <div className="scroll-block flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase block mb-2">01 / Flagship Operations</span>
                <h2 className="text-3xl sm:text-5xl font-display font-light uppercase text-white">
                  Chennai <span className="text-accent font-normal">Elevator Solutions</span>
                </h2>
              </div>
              <p className="reveal-elem text-metal text-sm sm:text-base font-light max-w-lg leading-relaxed">
                Welcome to Chennai Lifts – Reliable, Safe &amp; Stylish Elevator Solutions. Complete end-to-end lifecycle from design to handover.
              </p>
            </div>

            {/* Block 2: Narrative Story Card with Image Reveal */}
            <div className="scroll-block grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/10 p-8 sm:p-12 rounded-2xl relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="reveal-elem inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent uppercase">
                  <ShieldCheck size={16} />
                  <span>Trusted Home Lift Company in Chennai</span>
                </div>
                <h3 className="reveal-elem text-2xl sm:text-3xl font-display text-white font-light leading-snug">
                  Home Elevators in Chennai for <span className="text-accent">Modern Homes &amp; Buildings</span>
                </h3>
                <p className="reveal-elem text-metal text-sm sm:text-base font-light leading-relaxed">
                  Installing home elevators in Chennai has become a smart choice for homeowners looking for comfort, safety, and long-term convenience. With rapid urban development and multi-level homes becoming common, a reliable home lift enhances accessibility and daily living.
                </p>
                <p className="reveal-elem text-metal text-sm sm:text-base font-light leading-relaxed">
                  Alpha Elevators specializes in providing customized home elevator solutions in Chennai that suit villas, duplex houses, premium apartments, and independent homes. Our elevators are engineered to blend seamlessly with modern interiors while ensuring smooth and silent operation.
                </p>

                <div className="reveal-elem grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Villas &amp; Duplexes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Single-Phase Compatible</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Zero Headroom Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Italian Drive Tech</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Emergency Battery Lowering</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>Pan-Chennai Van Fleet</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black img-reveal-wrap">
                <img 
                  src="/locations/chennai-modern-lift.webp" 
                  alt="Alpha Elevators Chennai Modern Lift" 
                  className="img-parallax w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-primary/80 backdrop-blur-md rounded border border-white/10 text-[11px] text-white/90">
                  Precision Engineering &bull; Modern Glass Shaft Assembly
                </div>
              </div>
            </div>

            {/* Block 3: 6 Types of Home Elevators We Offer in Chennai */}
            <div className="scroll-block flex flex-col gap-10">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase block mb-1">Engineering Portfolio</span>
                <h3 className="text-2xl sm:text-4xl font-display font-light uppercase text-white">
                  Types of Home Elevators We Offer in <span className="text-accent">Chennai</span>
                </h3>
                <p className="text-metal text-sm font-light mt-2 max-w-2xl">
                  Manufactured using high-quality components and tested rigorously for safety and longevity across residential and commercial buildings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chennaiElevatorTypes.map((type, idx) => (
                  <div 
                    key={idx}
                    className="stagger-card relative group p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-accent uppercase tracking-widest">{type.tag}</span>
                        <span className="text-white/20 font-mono text-sm group-hover:text-accent transition-colors">0{idx + 1}</span>
                      </div>
                      <h4 className="text-xl font-display text-white mb-3 group-hover:text-accent transition-colors">{type.title}</h4>
                      <p className="text-metal text-xs sm:text-sm font-light leading-relaxed mb-6">{type.desc}</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {type.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-white/70">
                          <CheckCircle2 size={13} className="text-accent shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4: Complete Lift Services in Chennai */}
            <div className="scroll-block flex flex-col gap-10">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase block mb-1">Lifecycle Support</span>
                <h3 className="text-2xl sm:text-4xl font-display font-light uppercase text-white">
                  Our Comprehensive Lift Services in <span className="text-accent">Chennai</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: 'Home Lift Installation', desc: 'Custom designs for villas, duplexes, and multi-floor residences.' },
                  { title: 'Residential Lifts', desc: 'Safe accessibility for multi-generational homes and elderly care.' },
                  { title: 'Commercial Lifts', desc: 'Rugged, high-capacity elevators for retail, offices, and clinics.' },
                  { title: 'Lift Maintenance (AMC)', desc: 'Preventive maintenance checkups to guarantee 99.9% uptime.' },
                  { title: 'Emergency Repair', desc: '24/7 breakdown assistance with genuine certified spare parts.' }
                ].map((srv, idx) => (
                  <div key={idx} className="stagger-card relative p-6 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden">
                    <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                        <Wrench size={18} />
                      </div>
                      <h4 className="text-base font-display text-white mb-2">{srv.title}</h4>
                      <p className="text-metal text-xs leading-relaxed font-light">{srv.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setModalCity('Chennai')
                        setShowQuoteModal(true)
                      }}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline uppercase tracking-wider"
                    >
                      <span>Inquire Now</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 5: Serving All of Greater Chennai: Localities Grid */}
            <div className="scroll-block p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-8 relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div className="reveal-elem flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-1">Local Reach</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-light uppercase text-white">
                    Serving All Areas Across <span className="text-accent">Greater Chennai</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                  <span>Service Fleet Active in All Zones</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {chennaiAreas.map((loc, idx) => (
                  <div 
                    key={idx}
                    className="stagger-card p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">{loc.badge}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{loc.name}</h4>
                      <p className="text-metal text-[11px] font-light leading-snug">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 6: Chennai Office Contact Block */}
            <div className="scroll-block p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-accent/10 via-white/[0.02] to-transparent border border-accent/20 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div className="reveal-elem flex flex-col gap-3 max-w-2xl">
                <span className="text-accent font-mono text-xs tracking-widest uppercase">Chennai Headquarters</span>
                <h3 className="text-2xl sm:text-3xl font-display text-white font-light">
                  Visit Our Experience Center in <span className="text-accent">Anna Nagar</span>
                </h3>
                <p className="text-metal text-sm font-light leading-relaxed">
                  99, A-Block, Annanagar, Anna Nagar East, Chennai 600 102 &bull; Experience our working hydraulic and gearless traction test cabins firsthand with our senior elevator architects.
                </p>
              </div>

              <div className="reveal-elem flex flex-wrap items-center gap-4">
                <a
                  href="tel:+918015129224"
                  className="px-6 py-3.5 bg-accent text-primary font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                  <Phone size={14} />
                  <span>Call +91 80151 29224</span>
                </a>
                <button
                  onClick={() => {
                    setModalCity('Chennai')
                    setShowQuoteModal(true)
                  }}
                  className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-medium text-xs uppercase tracking-widest rounded hover:border-accent hover:text-accent transition-all"
                >
                  Book Free Site Visit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── COIMBATORE DEEP SECTION ─── */}
      {(activeTab === 'coimbatore' || activeTab === 'all') && (
        <div className="w-full py-24 px-6 md:px-12 lg:px-20 border-t border-white/10 relative bg-[#090909]">
          <div className="max-w-7xl mx-auto flex flex-col gap-28">

            {/* Block 1: Section Header */}
            <div className="scroll-block flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase block mb-2">02 / Western Tamil Nadu Hub</span>
                <h2 className="text-3xl sm:text-5xl font-display font-light uppercase text-white">
                  Coimbatore <span className="text-accent font-normal">Home Elevators</span>
                </h2>
              </div>
              <p className="reveal-elem text-metal text-sm sm:text-base font-light max-w-lg leading-relaxed">
                About Coimbatore Lifts – Safe, Reliable, and Modern Elevator Solutions for Homes, Apartments, and Commercial Spaces.
              </p>
            </div>

            {/* Block 2: About Coimbatore Lifts & Hero Story Card */}
            <div className="scroll-block grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/10 p-8 sm:p-12 rounded-2xl relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="reveal-elem inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent uppercase">
                  <Building2 size={16} />
                  <span>Leading Lift Manufacturer &amp; Service Provider</span>
                </div>
                <h3 className="reveal-elem text-2xl sm:text-3xl font-display text-white font-light leading-snug">
                  Premium Home Elevator Solutions in <span className="text-accent">Coimbatore</span>
                </h3>
                <p className="reveal-elem text-metal text-sm sm:text-base font-light leading-relaxed">
                  At Coimbatore Lifts, we specialize in providing safe, reliable, and modern elevator solutions for homes, apartments, and commercial spaces. With years of expertise, certified technicians, and a customer-first approach, we are one of the most trusted lift companies in Coimbatore.
                </p>
                <p className="reveal-elem text-metal text-sm sm:text-base font-light leading-relaxed">
                  Whether you need a new home lift installation for your villa in RS Puram or Race Course, a commercial elevator for your enterprise on Avinashi Road, or regular maintenance, we have the ideal engineering solution tailored for your architecture.
                </p>

                {/* 5 Reasons to Choose Coimbatore Lifts */}
                <div className="reveal-elem space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-white text-xs font-mono uppercase tracking-widest text-accent">Why Choose Coimbatore Lifts?</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      <span>10+ years of lift installation &amp; servicing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      <span>Certified &amp; skilled local technicians</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      <span>Affordable pricing with flexible packages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      <span>24/7 emergency repair support</span>
                    </li>
                    <li className="flex items-center gap-2 col-span-1 sm:col-span-2">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      <span>Trusted by 500+ homeowners &amp; businesses in Coimbatore</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black img-reveal-wrap">
                <img 
                  src="/locations/coimbatore-glass-elevator.webp" 
                  alt="Glass home elevator in Coimbatore with premium interiors" 
                  className="img-parallax w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-primary/80 backdrop-blur-md rounded border border-white/10 text-[11px] text-white/90">
                  Glass Home Elevator in Coimbatore &bull; Elderly &amp; Child Safe Mobility
                </div>
              </div>
            </div>

            {/* Block 3: Coimbatore Services Strip */}
            <div className="scroll-block flex flex-col gap-10">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase block mb-1">Our Services</span>
                <h3 className="text-2xl sm:text-4xl font-display font-light uppercase text-white">
                  Elevator Engineering Services in <span className="text-accent">Coimbatore</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: 'Home Lift Installation', desc: 'Upgrade your villa, duplex, or apartment with our stylish and safe home lifts. Compact, energy-efficient designs.' },
                  { title: 'Residential Lifts', desc: 'Perfect for families with elderly members and children. Compact shaftless and hydraulic glass lifts.' },
                  { title: 'Commercial Lifts', desc: 'From offices and hospitals to malls and warehouses, built for heavy-duty use with advanced safety.' },
                  { title: 'Lift Maintenance (AMC)', desc: 'Keep your lifts in top condition with AMC packages. Preventive servicing and 24/7 support.' },
                  { title: 'Lift Repair & Diagnostics', desc: 'Facing a breakdown? Our expert technicians provide quick and reliable repair with genuine parts.' }
                ].map((srv, idx) => (
                  <div key={idx} className="stagger-card relative p-6 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden">
                    <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                        <Layers size={18} />
                      </div>
                      <h4 className="text-base font-display text-white mb-2">{srv.title}</h4>
                      <p className="text-metal text-xs leading-relaxed font-light">{srv.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setModalCity('Coimbatore')
                        setShowQuoteModal(true)
                      }}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline uppercase tracking-wider"
                    >
                      <span>Inquire Now</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4: Serving All Areas in Coimbatore */}
            <div className="scroll-block p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-8 relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div className="reveal-elem flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-1">City Coverage</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-light uppercase text-white">
                    Serving All Key Areas in <span className="text-accent">Coimbatore</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                  <span>On-Site Rapid Team Ready</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {coimbatoreAreas.map((loc, idx) => (
                  <div 
                    key={idx}
                    className="stagger-card p-5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">{loc.badge}</span>
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">{loc.name}</h4>
                      <p className="text-metal text-xs font-light leading-snug">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 5: Coimbatore Real FAQs (From coimbatore.php) */}
            <div className="scroll-block flex flex-col gap-8">
              <div className="reveal-elem">
                <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase block mb-1">Knowledge &amp; Clarity</span>
                <h3 className="text-2xl sm:text-4xl font-display font-light uppercase text-white">
                  Frequently Asked <span className="text-accent">Questions</span> (Coimbatore)
                </h3>
              </div>

              <div className="space-y-4">
                {coimbatoreFaqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="faq-item-reveal rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                      aria-expanded={activeFaq === idx}
                    >
                      <h4 className="text-base sm:text-lg font-display text-white font-normal flex items-center gap-3">
                        <span className="font-mono text-xs text-accent">0{idx + 1}.</span>
                        {faq.q}
                      </h4>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-accent">
                        {activeFaq === idx ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </button>
                    {activeFaq === idx && (
                      <div className="px-6 pb-6 pt-2 text-metal text-sm sm:text-base font-light leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Block 6: Coimbatore Regional Office Details Card */}
            <div className="scroll-block p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-accent/10 via-white/[0.02] to-transparent border border-accent/20 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div className="reveal-elem flex flex-col gap-3 max-w-2xl">
                <span className="text-accent font-mono text-xs tracking-widest uppercase">Coimbatore Regional Office</span>
                <h3 className="text-2xl sm:text-3xl font-display text-white font-light">
                  Grand Brenton G4, <span className="text-accent">Periyar Nagar</span>
                </h3>
                <p className="text-metal text-sm font-light leading-relaxed">
                  Grand Brenton G4, Periyar Nagar, Masakali Palayam, Coimbatore, Tamil Nadu 641015 &bull; Dedicated engineering hub providing rapid installation, free site consultation, and 24/7 customer support.
                </p>
              </div>

              <div className="reveal-elem flex flex-wrap items-center gap-4">
                <a
                  href="tel:+918015129224"
                  className="px-6 py-3.5 bg-accent text-primary font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                  <Phone size={14} />
                  <span>Call +91 80151 29224</span>
                </a>
                <button
                  onClick={() => {
                    setModalCity('Coimbatore')
                    setShowQuoteModal(true)
                  }}
                  className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-medium text-xs uppercase tracking-widest rounded hover:border-accent hover:text-accent transition-all"
                >
                  Schedule Site Survey
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — STATEWIDE COMPARISON & NETWORK SUMMARY
      ═══════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-primary">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Block 1: Header */}
          <div className="scroll-block text-center max-w-3xl mx-auto">
            <span className="reveal-elem text-accent font-mono text-xs tracking-[0.3em] uppercase block mb-3">Statewide Infrastructure</span>
            <h2 className="reveal-elem text-3xl sm:text-5xl font-display font-light uppercase text-white mb-4">
              Dual-Hub <span className="text-accent font-normal">Excellence</span> Across Tamil Nadu
            </h2>
            <p className="reveal-elem text-metal text-sm sm:text-base font-light leading-relaxed">
              Whether at our Chennai corporate headquarters or our Coimbatore western manufacturing and service center, Alpha Elevators guarantees the highest caliber of European engineering.
            </p>
          </div>

          {/* Block 2: Dual Summary Cards */}
          <div className="scroll-block grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Chennai Summary Card */}
            <div className="stagger-card relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display text-white">Chennai</h3>
                      <span className="text-xs font-mono text-accent uppercase tracking-widest">Headquarters &amp; Experience Studio</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 text-white/70">Flagship</span>
                </div>

                <p className="text-metal text-sm font-light leading-relaxed mb-6">
                  Serving Greater Chennai including ECR, OMR, Anna Nagar, Adyar, and surrounding regions with residential, commercial, and luxury panoramic elevator installations.
                </p>

                <div className="space-y-3 py-4 border-t border-white/5 text-xs text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={15} className="text-accent shrink-0 mt-0.5" />
                    <span>99, A-Block, Annanagar, Anna Nagar East, Chennai 600 102</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-accent shrink-0" />
                    <span>+91 80151 29224</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-accent shrink-0" />
                    <span>info@alphaelevators.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setActiveTab('chennai')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-xs font-medium uppercase tracking-widest hover:border-accent hover:text-accent transition-all rounded text-center"
                >
                  View Chennai Deep Details
                </button>
                <button
                  onClick={() => {
                    setModalCity('Chennai')
                    setShowQuoteModal(true)
                  }}
                  className="px-6 py-3 bg-accent text-primary text-xs font-bold uppercase tracking-widest hover:bg-white transition-all rounded"
                >
                  Book Survey
                </button>
              </div>
            </div>

            {/* Coimbatore Summary Card */}
            <div className="stagger-card relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden">
              <div className="card-accent-line absolute top-0 left-0 h-[2px] bg-accent w-0" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display text-white">Coimbatore</h3>
                      <span className="text-xs font-mono text-accent uppercase tracking-widest">Regional Engineering &amp; Service Hub</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 text-white/70">Western Hub</span>
                </div>

                <p className="text-metal text-sm font-light leading-relaxed mb-6">
                  Serving RS Puram, Peelamedu, Race Course, Avinashi Road, and surrounding industrial and bungalow estates with customized pitless and hydraulic lifts.
                </p>

                <div className="space-y-3 py-4 border-t border-white/5 text-xs text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={15} className="text-accent shrink-0 mt-0.5" />
                    <span>Grand Brenton G4, Periyar Nagar, Masakali Palayam, Coimbatore 641015</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-accent shrink-0" />
                    <span>+91 80151 29224</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-accent shrink-0" />
                    <span>info@alphaelevators.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setActiveTab('coimbatore')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-xs font-medium uppercase tracking-widest hover:border-accent hover:text-accent transition-all rounded text-center"
                >
                  View Coimbatore Deep Details
                </button>
                <button
                  onClick={() => {
                    setModalCity('Coimbatore')
                    setShowQuoteModal(true)
                  }}
                  className="px-6 py-3 bg-accent text-primary text-xs font-bold uppercase tracking-widest hover:bg-white transition-all rounded"
                >
                  Book Survey
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODAL: LUXURY CONSULTATION & SITE SURVEY BOOKING
      ═══════════════════════════════════════════════════════════ */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0f0f0f] border border-white/15 p-8 shadow-2xl overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowQuoteModal(false)
                setQuoteSubmitted(false)
              }}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {!quoteSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setQuoteSubmitted(true)
                }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-accent font-mono text-[11px] tracking-widest uppercase block mb-1">Direct Engineering Dispatch</span>
                  <h3 className="text-2xl font-display text-white font-light">
                    Schedule Complimentary <span className="text-accent">Site Survey</span>
                  </h3>
                  <p className="text-metal text-xs mt-1">Our certified engineer will evaluate your structural layout, shaft dimensions, and electrical readiness.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-xs block mb-1 font-mono uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Anand Sundaram" 
                      className="w-full px-4 py-2.5 rounded bg-white/5 border border-white/10 text-white text-sm focus:border-accent outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs block mb-1 font-mono uppercase">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210" 
                        className="w-full px-4 py-2.5 rounded bg-white/5 border border-white/10 text-white text-sm focus:border-accent outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs block mb-1 font-mono uppercase">Target City</label>
                      <select 
                        value={modalCity} 
                        onChange={(e) => setModalCity(e.target.value as 'Chennai' | 'Coimbatore')}
                        className="w-full px-4 py-2.5 rounded bg-[#181818] border border-white/10 text-white text-sm focus:border-accent outline-none transition-colors"
                      >
                        <option value="Chennai">Chennai (Flagship)</option>
                        <option value="Coimbatore">Coimbatore (Regional)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs block mb-1 font-mono uppercase">Property Type</label>
                      <select className="w-full px-4 py-2.5 rounded bg-[#181818] border border-white/10 text-white text-sm focus:border-accent outline-none transition-colors">
                        <option>New Villa / Duplex</option>
                        <option>Existing Home Retrofit</option>
                        <option>Penthouse / Apartment</option>
                        <option>Commercial / Clinic</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-xs block mb-1 font-mono uppercase">Number of Floors</label>
                      <select className="w-full px-4 py-2.5 rounded bg-[#181818] border border-white/10 text-white text-sm focus:border-accent outline-none transition-colors">
                        <option>G + 1 (2 Stops)</option>
                        <option>G + 2 (3 Stops)</option>
                        <option>G + 3 (4 Stops)</option>
                        <option>G + 4 / G + 5 (5+ Stops)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-accent text-primary font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-all shadow-lg shadow-accent/20 mt-2"
                >
                  Confirm Free Inspection Request
                </button>

                <p className="text-metal/60 text-[10px] text-center">
                  Direct inquiry sent to Alpha Elevators {modalCity} regional engineering team.
                </p>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent flex items-center justify-center text-accent">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-display text-white">Inspection Scheduled!</h3>
                <p className="text-metal text-xs max-w-xs leading-relaxed">
                  Thank you! Our {modalCity} senior elevator technical consultant will contact you at your provided number within 2 business hours.
                </p>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase rounded transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          FLOATING QUICK CONTACT ACTION BAR (MOBILE / DESKTOP)
      ═══════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <a
          href="https://wa.me/918015129224?text=Hi%20Alpha%20Elevators%2C%20I%20am%20interested%20in%20a%20home%20lift"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <MessageCircle size={22} />
        </a>

        <a
          href="tel:+918015129224"
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-primary font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone size={14} />
          <span>+91 80151 29224</span>
        </a>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER STRIP
      ═══════════════════════════════════════════════════════════ */}
      <footer className="scroll-block w-full py-8 px-6 md:px-12 border-t border-white/5 bg-[#050505] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-metal/60 font-light">
        <div className="reveal-elem">
          &copy; {new Date().getFullYear()} Alpha Elevators Pvt Ltd &bull; Chennai &amp; Coimbatore Flagship Hubs
        </div>
        <div className="reveal-elem flex items-center gap-6">
          <button onClick={onBack} className="hover:text-accent transition-colors">Home</button>
          <button onClick={() => { setActiveTab('chennai'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-accent transition-colors">Chennai</button>
          <button onClick={() => { setActiveTab('coimbatore'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-accent transition-colors">Coimbatore</button>
          <a href="tel:+918015129224" className="hover:text-accent transition-colors">+91 80151 29224</a>
        </div>
      </footer>

    </div>
  )
}
