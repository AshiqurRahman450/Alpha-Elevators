import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ProductsPageProps {
  onBack?: () => void
}

/* ─── Product Data scraped from alphaelevators.in ─── */
const products = [
  {
    id: 'AE01',
    num: '01',
    name: 'Hydraulic Elevators',
    tagline: 'Imported Hydraulic Technology',
    heroImage: 'https://alphaelevators.in/gallery/hydraulic-lifts-in-chennai-ae01-elevators.webp',
    detailImage: 'https://alphaelevators.in/gallery/hydraulic-lift-company-in-chennai-ae01.webp',
    description: 'Alpha Elevators offers gearless Elevators for high-rise buildings, providing smooth operation, energy efficiency, and modern design. Hydraulic home Elevators are cost-effective, reliable, and suited for low to mid-rise structures, offering a smooth ride and safety features like emergency lowering.',
    sections: [
      {
        title: 'Introduction',
        text: 'Indulge in opulence with our Alpha Imported Hydraulic Technology, a versatile lift designed for an array of applications. Powered by established and dependable hydraulic technology, this system ensures a seamless and reliable experience.'
      },
      {
        title: 'No Oil Replacement',
        text: 'Our Elevators boast German engineering that minimizes oil replacement to once every 10 years, unlike conventional Elevators requiring annual changes. Every mechanism, from piston to pump, is precisely designed to prevent oil leaks, ensuring a seamless ride without a drop of spillage.'
      },
      {
        title: 'Jerk-Free & Low Noise',
        text: "Alpha's hydraulic Elevators guarantee a seamless ride devoid of abrupt jolts during acceleration and deceleration. Its integrated motor carefully regulates oil flow, diminishing jerks by an impressive 80%. Enjoy a smooth, uninterrupted journey with minimal noise."
      },
      {
        title: 'Multi-Layered Safety',
        text: 'Our multi-layered safety approach includes primary and UPS battery connections, a mechanical button for descent, a manual emergency key on each floor, and a trap door for top-of-cabin accessibility or a blower for ventilation.'
      }
    ],
    features: ['First-ever multi-mode function', 'Customisable landing display', '2x faster performance', 'Compatible with G+5 stops', 'Touch Screen Display', 'No pit, machine room or headroom', '360-degree panoramic glass views']
  },
  {
    id: 'AE02',
    num: '02',
    name: 'Rope Traction Lifts',
    tagline: 'Gearless Traction Technology',
    heroImage: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp',
    detailImage: 'https://alphaelevators.in/gallery/rope-lift-installation-chennai.webp',
    description: 'Alpha Gearless unique traction Elevators solution that complies with Lifts Directive 2014/33/EU. Installation can be customized to any architectural need and design, even special and challenging projects. It is an elegant and truly convenient solution.',
    sections: [
      {
        title: 'Introduction',
        text: 'Alpha Gearless unique traction Elevators solution that complies with Lifts Directive 2014/33/EU. Installation can be customized to any architectural need and design, even special and challenging projects, allowing for perfect fitting within any existing or new building.'
      },
      {
        title: 'Advanced Authentication',
        text: 'Our Advanced Authentication System integrates biometric precision, a secure number pad, and RFID technology. Experience a seamless blend of cutting-edge features, ensuring a fortified shield around your assets with sophisticated access control.'
      },
      {
        title: 'Staged Safety Gears',
        text: "Alpha employs Advanced Safety Gears designed for high speeds, usually above 1.0 m/s. These gears have built-in stops to control force increases, ensuring a gradual and controlled stop. In case of overspeed, the governor rope activates the brakes."
      },
      {
        title: 'Advanced Integrated Controller',
        text: "Alpha brings the most advanced energy-saving VVVF Elevators system with highly Sophisticated Microprocessor based Pulse Width Modulation (PWM) technology. Alpha's complete integrated VVVF control system ensures best return of cost."
      }
    ],
    features: ['First-ever multi-mode function', 'Customisable landing display', '2x faster performance', 'Compatible with G+5 stops', 'Touch Screen Display', 'No pit, machine room or headroom', '360-degree panoramic glass views']
  },
  {
    id: 'AE03',
    num: '03',
    name: 'Belt Drive Lifts',
    tagline: 'Next-Gen Belt Technology',
    heroImage: 'https://alphaelevators.in/nimg/ae02.jpeg',
    detailImage: 'https://alphaelevators.in/gallery/gallery.jpg',
    description: 'Alpha Elevators introduces a next-generation belt-driven system designed to replace conventional rope mechanisms. Our innovative belts are made from high-strength polyurethane with embedded steel cords, offering exceptional durability, flexibility, and zero lubrication.',
    sections: [
      {
        title: 'Introduction',
        text: "Elevate your expectations with our cutting-edge MRL Elevators Belt technology and rivet-less shaft. While competitors struggle to meet current home Elevators standards like MD 2006 42 EC and EN 81-41, our Elevators not only meet but exceed them."
      },
      {
        title: 'Sophistication In Every Ascent',
        text: 'Elevate to Luxury with our lifts featuring exclusive smooth start and stop. Enjoy a premium ride, where every level feels like an orchestrated ballet, delivering an unmatched experience that is as refined as it is smooth.'
      },
      {
        title: 'False Detection & Reporting',
        text: "A patented False Detection and Reporting system, inspired by German Supercar technology, alerts users before potential issues occur. It triggers a distinct beep sound and visual alert inside the cabin if the battery needs replacement within 10 days."
      },
      {
        title: 'Lubricant-Free Rails',
        text: "Alpha's Lubricant Free Rails technology leads to low maintenance requirements, with cleaning needed only once every six months. Cost savings up to 50% compared to normal Elevators due to reduced maintenance needs."
      }
    ],
    features: ['First-ever multi-mode function', 'Customisable landing display', '2x faster performance', 'Compatible with G+5 stops', 'Touch Screen Display', 'No pit, machine room or headroom', '360-degree panoramic glass views']
  }
]

export const ProductsPage = ({ onBack }: ProductsPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLImageElement>(null)
  const [activeProduct, setActiveProduct] = useState(0)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const currentProduct = products[activeProduct]

  /* ─── Animations ─── */
  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTL = gsap.timeline({ delay: 0.3 })
      heroTL
        .fromTo('.products-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.products-hero-title span', { y: '110%' }, { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .fromTo('.products-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .fromTo('.products-hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.6')

      // Hero image clip reveal
      heroTL.fromTo(heroImageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.95 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power4.inOut' },
        '-=1.2'
      )

      // Hero parallax
      gsap.to('.products-hero-bg', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })

      if (!containerRef.current) return

      // Scroll sections — stagger reveal all .reveal-elem children
      const sections = containerRef.current.querySelectorAll('.scroll-section')
      sections.forEach((sec) => {
        const textElems = sec.querySelectorAll('.reveal-elem')
        if (textElems.length > 0) {
          gsap.fromTo(textElems,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sec, start: 'top 78%', toggleActions: 'play reverse play reverse' }
            }
          )
        }

        // Image clip-path reveals
        const imgWrappers = sec.querySelectorAll('.img-reveal-wrap')
        imgWrappers.forEach((wrap) => {
          gsap.fromTo(wrap,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut',
              scrollTrigger: { trigger: wrap, start: 'top 80%', toggleActions: 'play reverse play reverse' }
            }
          )
        })

        // Card image reveals
        const cardImgs = sec.querySelectorAll('.card-img-reveal')
        cardImgs.forEach((card) => {
          gsap.fromTo(card,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.inOut',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play reverse play reverse' }
            }
          )
        })

        // Line draws
        const lines = sec.querySelectorAll('.line-reveal')
        lines.forEach((line) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center',
              scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: 'play reverse play reverse' }
            }
          )
        })
      })

      // Image parallax (yPercent shifting within container)
      const parallaxImages = containerRef.current.querySelectorAll('.img-parallax')
      parallaxImages.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -15 },
          { yPercent: 15, ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.img-parallax-container'),
              start: 'top bottom', end: 'bottom top', scrub: true
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* ─── Product switch animation ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-content-swap',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [activeProduct])

  /* ─── 3D Hover on Hero Image ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current || !imageInnerRef.current) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    gsap.to(heroImageRef.current, { rotationY: x * 12, rotationX: -y * 12, ease: 'power2.out', duration: 1, transformPerspective: 1800 })
    gsap.to(imageInnerRef.current, { x: -x * 20, y: -y * 20, scale: 1.05, ease: 'power2.out', duration: 1 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!heroImageRef.current || !imageInnerRef.current) return
    gsap.to(heroImageRef.current, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 1.5 })
    gsap.to(imageInnerRef.current, { x: 0, y: 0, scale: 1, ease: 'power3.out', duration: 1.5 })
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-white w-full overflow-hidden font-sans">

      {/* ─── Fixed Corporate Nav ─── */}
      {onBack && (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-primary/70 backdrop-blur-xl border-b border-white/5">
          <button onClick={onBack} className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300">
            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="font-display tracking-[0.15em] text-xs uppercase hidden sm:block">Back to Home</span>
          </button>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase hidden md:block">Our Products</span>
            <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
            <img src="/logo.png" alt="Alpha Elevators" className="h-7 opacity-80" />
          </div>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO — Cinematic Product Showcase
      ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="scroll-section relative w-full min-h-screen flex flex-col justify-end pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="products-hero-bg absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/8 via-primary to-primary pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16">
          <div className="products-hero-tag flex items-center gap-4">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.35em] text-xs font-semibold">Product Range</span>
          </div>

          <h1 className="products-hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light uppercase tracking-tight leading-[0.95]">
            <div className="overflow-hidden"><span className="inline-block">Engineered for</span></div>
            <div className="overflow-hidden"><span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">Modern Living.</span></div>
          </h1>

          <div className="products-hero-line h-[1px] bg-gradient-to-r from-accent via-white/20 to-transparent origin-left"></div>

          {/* Product selector tabs */}
          <div className="products-hero-desc grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setActiveProduct(i); setExpandedSection(null) }}
                className={`group text-left px-6 py-5 border rounded-sm transition-all duration-500 ${
                  i === activeProduct
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-white/10 hover:border-white/25 bg-transparent'
                }`}
              >
                <span className={`text-xs tracking-[0.25em] uppercase block mb-1 transition-colors duration-300 ${i === activeProduct ? 'text-accent' : 'text-white/40'}`}>{p.id}</span>
                <span className={`text-lg font-light block transition-colors duration-300 ${i === activeProduct ? 'text-white' : 'text-white/70'}`}>{p.name}</span>
                <span className="text-white/30 text-xs tracking-wider mt-1 block">{p.tagline}</span>
              </button>
            ))}
          </div>

          {/* Description + 3D Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mt-4 reveal-elem">
            <div className="flex flex-col gap-6 product-content-swap">
              <h2 className="products-hero-desc text-2xl md:text-3xl font-display font-light uppercase tracking-wider text-white">
                {currentProduct.name} <span className="text-accent">— {currentProduct.id}</span>
              </h2>
              <p className="products-hero-desc text-metal text-lg md:text-xl font-light leading-relaxed max-w-xl">
                {currentProduct.description}
              </p>
            </div>

            <div
              className="w-full relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1800px' }}
            >
              <div
                ref={heroImageRef}
                className="w-full aspect-[16/10] rounded-sm shadow-[0_40px_80px_rgba(0,204,204,0.12)] border border-white/10 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  ref={imageInnerRef}
                  src={currentProduct.heroImage}
                  alt={currentProduct.name}
                  className="w-[115%] h-[115%] object-cover -ml-[7.5%] -mt-[7.5%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 pointer-events-none" style={{ transform: 'translateZ(50px)' }}>
                  <div className="backdrop-blur-lg bg-black/50 border border-white/10 px-5 py-3 rounded-sm">
                    <p className="text-white font-display text-base tracking-wider uppercase">{currentProduct.id}</p>
                    <p className="text-accent text-xs tracking-[0.2em] uppercase font-semibold mt-0.5">{currentProduct.tagline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — Deep Dive: Technical Details
      ═══════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — Sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <span className="reveal-elem text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> {currentProduct.id}
            </span>
            <h2 className="reveal-elem text-3xl md:text-4xl lg:text-5xl font-display font-light leading-tight product-content-swap">
              Technical <br /><span className="text-accent">Excellence</span>
            </h2>
            <p className="reveal-elem text-metal text-base font-light leading-relaxed mt-6 product-content-swap">
              {currentProduct.tagline} — precision-engineered for the modern Indian home.
            </p>
          </div>

          {/* Right — Accordion sections + image */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {currentProduct.sections.map((sec, i) => (
              <div
                key={`${currentProduct.id}-${i}`}
                className="reveal-elem group border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-accent/20 product-content-swap"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-accent/50 font-display text-sm tracking-[0.3em]">0{i + 1}</span>
                    <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-wider text-white group-hover:text-accent transition-colors duration-300">
                      {sec.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${expandedSection === i ? 'rotate-45 border-accent bg-accent/10' : ''}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${expandedSection === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-6">
                    <p className="text-metal text-base md:text-lg font-light leading-[1.9]">{sec.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Detail image */}
            <div className="img-reveal-wrap img-parallax-container w-full aspect-[16/10] overflow-hidden rounded-sm border border-white/5 relative mt-8 product-content-swap">
              <img
                src={currentProduct.detailImage}
                alt={`${currentProduct.name} Detail`}
                className="img-parallax w-full h-[130%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 right-6">
                <span className="bg-primary/70 backdrop-blur-md border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-metal">
                  {currentProduct.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — Key Features Grid
      ═══════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-elem text-center mb-20">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> Specifications <span className="w-8 h-[1px] bg-accent line-reveal"></span>
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wide">
              Key <span className="text-accent">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 product-content-swap reveal-elem">
            {currentProduct.features.map((feat, i) => (
              <div
                key={i}
                className="reveal-elem group flex items-start gap-4 p-6 border border-white/5 rounded-sm bg-primary/40 hover:border-accent/30 transition-all duration-500"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-all duration-300">
                  <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                </div>
                <span className="text-white/80 text-base font-light group-hover:text-white transition-colors duration-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — All Products Overview Cards
      ═══════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-elem text-center mb-20">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> Compare <span className="w-8 h-[1px] bg-accent line-reveal"></span>
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wide">
              Our <span className="text-accent">Range</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setActiveProduct(i); setExpandedSection(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className={`reveal-elem group relative text-left overflow-hidden rounded-sm border transition-all duration-500 ${
                  i === activeProduct ? 'border-accent/50' : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Giant background number */}
                <span className="absolute -top-4 -right-2 text-[10rem] font-display font-light text-white/[0.03] leading-none pointer-events-none select-none group-hover:text-accent/[0.06] transition-colors duration-500">
                  {p.num}
                </span>

                {/* Image */}
                <div className="card-img-reveal w-full h-56 md:h-64 overflow-hidden bg-graphite relative">
                  <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent pointer-events-none"></div>
                  {i === activeProduct && (
                    <div className="absolute top-4 right-4 bg-accent text-primary text-xs px-3 py-1 uppercase tracking-widest font-semibold rounded-sm">Active</div>
                  )}
                </div>

                {/* Text */}
                <div className="p-6 md:p-8 relative z-10">
                  <span className="text-accent/60 text-xs font-display tracking-[0.3em] mb-2 block">{p.id}</span>
                  <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-wider text-white mb-3 group-hover:text-accent transition-colors duration-300">{p.name}</h3>
                  <p className="text-metal text-sm font-light leading-relaxed mb-6 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-3 text-accent text-sm tracking-[0.15em] uppercase font-light">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — CTA
      ═══════════════════════════════════════════════════ */}
      <section className="scroll-section py-32 md:py-44 px-6 md:px-12 lg:px-20 bg-secondary border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-secondary to-secondary pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <div className="reveal-elem w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center bg-accent/5">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="reveal-elem text-3xl md:text-5xl lg:text-6xl font-display font-light leading-tight tracking-wide">
            Ready to <span className="text-accent">Elevate</span><br />Your Home?
          </h2>
          <div className="line-reveal w-32 h-[1px] bg-accent/50 mx-auto"></div>
          <p className="reveal-elem text-metal text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            With options tailored to building height, space, budget, and design preferences, Alpha Elevators ensures diverse needs are met with uncompromising quality and safety.
          </p>
          <button onClick={() => { if (onBack) onBack(); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }} className="reveal-elem mt-4 px-10 py-4 bg-accent text-primary font-semibold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300">
            Book a Consultation
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 px-6 bg-primary border-t border-white/5 text-center">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Alpha Elevators. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
