import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutPageProps {
  onBack?: () => void
}

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        if (counted.current) return
        counted.current = true
        gsap.fromTo(ref.current, { innerText: 0 }, {
          innerText: end,
          duration,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            if (ref.current) ref.current.textContent = Math.ceil(Number(ref.current.textContent || '0')) + suffix
          }
        })
      }
    })
  }, [end, suffix, duration])

  return <span ref={ref}>0{suffix}</span>
}

export const AboutPage = ({ onBack }: AboutPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLImageElement>(null)

  /* ─── Scroll-driven animations ─── */
  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTL = gsap.timeline({ delay: 0.3 })
      heroTL
        .fromTo('.about-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.about-hero-title span', { y: '110%' }, { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .fromTo('.about-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .fromTo('.about-hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.6')

      // Hero image 3D reveal with clip-path
      heroTL.fromTo(heroImageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.95 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power4.inOut' },
        '-=1.2'
      )

      // Hero parallax on scroll
      gsap.to('.about-hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })

      if (!containerRef.current) return
      
      // Section-based scroll animations (Products.tsx style)
      const sections = containerRef.current.querySelectorAll('.scroll-section')
      
      sections.forEach((sec) => {
        // 1. Text elements stagger reveal
        const textElems = sec.querySelectorAll('.reveal-elem')
        if (textElems.length > 0) {
          gsap.fromTo(textElems, 
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play reverse play reverse' }
            }
          )
        }

        // 2. Image wrapper clip-path reveal
        const imgWrappers = sec.querySelectorAll('.img-reveal-wrap')
        imgWrappers.forEach((wrap) => {
          gsap.fromTo(wrap,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.5,
              ease: 'power4.inOut',
              scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play reverse play reverse' }
            }
          )
        })

        // 3. Line draws
        const lines = sec.querySelectorAll('.line-reveal')
        lines.forEach((line) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center',
              scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play reverse play reverse' }
            }
          )
        })
      })

      // Image Parallax (yPercent shifting within container)
      const parallaxImages = containerRef.current.querySelectorAll('.img-parallax')
      parallaxImages.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.img-parallax-container'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* ─── 3D Hover on Hero Image ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current || !imageInnerRef.current) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    gsap.to(heroImageRef.current, {
      rotationY: x * 12,
      rotationX: -y * 12,
      ease: 'power2.out',
      duration: 1,
      transformPerspective: 1800
    })
    gsap.to(imageInnerRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.05,
      ease: 'power2.out',
      duration: 1
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!heroImageRef.current || !imageInnerRef.current) return
    gsap.to(heroImageRef.current, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 1.5 })
    gsap.to(imageInnerRef.current, { x: 0, y: 0, scale: 1, ease: 'power3.out', duration: 1.5 })
  }, [])

  /* ─── Pillars data ─── */
  const pillars = [
    { num: '01', title: 'Italian Engineering', desc: 'Advanced mechanisms reflecting the pinnacle of European elevator technology and design precision.' },
    { num: '02', title: 'Indian Innovation', desc: 'Carefully selected components tailored for durability and performance in local residential environments.' },
    { num: '03', title: 'Uncompromising Safety', desc: 'Rigorous quality checks at every stage — from design and assembly to installation and commissioning.' },
    { num: '04', title: 'Lasting Reliability', desc: 'Professional installation practices, trained technicians, and dependable 24/7 after-sales support.' },
  ]

  /* ─── Timeline data ─── */
  const timeline = [
    { year: 'Foundation', text: 'A team of seasoned elevator specialists came together, each bringing nearly a decade of hands-on industry experience.' },
    { year: 'Research', text: 'Extensive market analysis and technical research to understand the practical and safety needs of modern homes.' },
    { year: 'Innovation', text: 'Developed a distinctive blend of Italian engineering excellence with Indian innovation for home elevator solutions.' },
    { year: 'Growth', text: 'Established Alpha Elevators as a trusted name for premium home lifts across Indian residential environments.' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-white w-full overflow-hidden font-sans">

      {/* ─── Fixed Corporate Nav ─── */}
      {onBack && (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-primary/70 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="font-display tracking-[0.15em] text-xs uppercase hidden sm:block">Back to Home</span>
          </button>

          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase hidden md:block">About Us</span>
            <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
            <img src="/logo.png" alt="Alpha Elevators" className="h-7 opacity-80" />
          </div>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-end pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Ambient background */}
        <div className="about-hero-bg absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/8 via-primary to-primary pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16">
          {/* Tag */}
          <div className="about-hero-tag flex items-center gap-4">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.35em] text-xs font-semibold">Corporate Overview</span>
          </div>

          {/* Title — each word in overflow-hidden for clip reveal */}
          <h1 className="about-hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light uppercase tracking-tight leading-[0.95]">
            <div className="overflow-hidden"><span className="inline-block">Trusted Home</span></div>
            <div className="overflow-hidden"><span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">Lift Experts.</span></div>
          </h1>

          <div className="about-hero-line h-[1px] bg-gradient-to-r from-accent via-white/20 to-transparent origin-left"></div>

          {/* Corporate data strip */}
          <div className="about-hero-desc grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-10 mb-4">
            <div className="flex flex-col gap-2">
              <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Established</span>
              <span className="text-white text-lg font-light">Nearly a Decade of Expertise</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Specialization</span>
              <span className="text-white text-lg font-light">Premium Home Elevators</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Engineering</span>
              <span className="text-white text-lg font-light">Italian & Indian Innovation</span>
            </div>
          </div>

          {/* Description + 3D Image side by side on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mt-8">
            <div className="flex flex-col gap-6">
              <h2 className="about-hero-desc text-2xl md:text-3xl font-display font-light uppercase tracking-wider text-white">
                Who We <span className="text-accent">Are</span>
              </h2>
              <p className="about-hero-desc text-metal text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Alpha Elevators was built on a foundation of expertise, precision, and reliability — combining Italian engineering excellence with Indian innovation to create premium home elevator solutions.
              </p>
            </div>

            {/* 3D Interactive Image */}
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
                  src="https://alphaelevators.in/gallery/gallery.jpg"
                  alt="Alpha Elevators Luxury Showroom"
                  className="w-[115%] h-[115%] object-cover -ml-[7.5%] -mt-[7.5%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent pointer-events-none" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 pointer-events-none" style={{ transform: 'translateZ(50px)' }}>
                  <div className="backdrop-blur-lg bg-black/50 border border-white/10 px-5 py-3 rounded-sm">
                    <p className="text-white font-display text-base tracking-wider uppercase">Italian Engineering</p>
                    <p className="text-accent text-xs tracking-[0.2em] uppercase font-semibold mt-0.5">Indian Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — THE ORIGIN STORY (Asymmetric Editorial)
      ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left column — sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <span className="reveal-elem text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> Our Story
            </span>
            <h2 className="reveal-elem text-3xl md:text-4xl lg:text-5xl font-display font-light leading-tight">
              A Decade of <br /><span className="text-accent">Precision</span> & <span className="text-accent">Trust</span>
            </h2>
          </div>

          {/* Right column — body text + image */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            <p className="reveal-elem text-metal text-lg md:text-xl font-light leading-[1.9] first-letter:text-5xl first-letter:font-display first-letter:text-accent first-letter:mr-2 first-letter:float-left first-letter:leading-[0.8]">
              Our journey began with a team of seasoned elevator specialists, each bringing nearly a decade of hands-on industry experience. With a clear focus on home elevators, we undertook extensive market analysis and technical research to understand the practical and safety needs of modern homes. This groundwork led to the establishment of Alpha Elevators.
            </p>

            <div className="line-reveal h-[1px] bg-white/10 w-full"></div>

            <p className="reveal-elem text-metal text-lg md:text-xl font-light leading-[1.9]">
              What truly sets Alpha Elevators apart is our distinctive blend of Italian engineering excellence and Indian innovation. Our elevator mechanisms reflect advanced Italian technology, while carefully selected components are sourced from both India and Italy, ensuring durability, efficiency, and smooth performance.
            </p>

            {/* Large parallax image with clip reveal */}
            <div className="img-reveal-wrap img-parallax-container w-full aspect-[16/10] overflow-hidden rounded-sm border border-white/5 relative mt-8">
              <img
                src="https://alphaelevators.in/nimg/lift-company-in-chennai-residential.webp"
                alt="Residential Lift Installation"
                className="img-parallax w-full h-[130%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 right-6">
                <span className="bg-primary/70 backdrop-blur-md border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-metal">Premium Residential Solutions</span>
              </div>
            </div>

            <p className="reveal-elem text-metal text-lg font-light leading-[1.9]">
              This balanced approach allows us to deliver international-quality home lift solutions that are well-suited to Indian residential environments — combining global standards with local understanding.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — FOUR PILLARS (Numbered Cards)
      ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-elem text-center mb-20">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> What Defines Us <span className="w-8 h-[1px] bg-accent line-reveal"></span>
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wide">
              Our Core <span className="text-accent">Pillars</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="reveal-elem group relative bg-primary/50 border border-white/5 p-8 md:p-10 rounded-sm hover:border-accent/30 transition-all duration-500 overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute -top-4 -right-2 text-[8rem] font-display font-light text-white/[0.03] leading-none pointer-events-none select-none group-hover:text-accent/[0.06] transition-colors duration-500">
                  {p.num}
                </span>
                <div className="relative z-10">
                  <span className="text-accent/60 text-sm font-display tracking-[0.3em] mb-4 block">{p.num}</span>
                  <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-wider text-white mb-4 group-hover:text-accent transition-colors duration-300">{p.title}</h3>
                  <div className="line-reveal w-10 h-[1px] bg-accent/30 mb-5 group-hover:w-16 transition-all duration-500"></div>
                  <p className="text-metal text-sm md:text-base font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — ANIMATED STATS
      ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { end: 8, suffix: '+', label: 'Years', sub: 'Working Experience in the Elevator Industry' },
              { end: 100, suffix: '%', label: 'Quality', sub: 'Assurance & Safety Compliance at Every Stage' },
              { end: 24, suffix: '/7', label: 'Support', sub: 'Dependable After-Sales Service & Maintenance' },
            ].map((stat, i) => (
              <div key={i} className="reveal-elem flex flex-col items-center text-center py-14 md:py-0 px-6">
                <span className="text-6xl lg:text-7xl font-display font-light text-white mb-3">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </span>
                <h3 className="text-white text-sm tracking-[0.25em] uppercase mb-3 font-semibold">{stat.label}</h3>
                <p className="text-metal text-sm leading-relaxed max-w-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — JOURNEY TIMELINE
      ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-section py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-secondary border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="reveal-elem text-center mb-20">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-semibold flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent line-reveal"></span> Our Journey <span className="w-8 h-[1px] bg-accent line-reveal"></span>
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wide">
              Building <span className="text-accent">Trust</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>

            {timeline.map((item, i) => (
              <div
                key={i}
                className={`reveal-elem relative flex flex-col md:flex-row items-start gap-8 md:gap-16 mb-16 last:mb-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot on the line */}
                <div className="absolute left-6 md:left-1/2 top-1 w-3 h-3 rounded-full bg-accent border-2 border-primary -translate-x-1/2 z-10"></div>

                {/* Content */}
                <div className={`md:w-1/2 pl-14 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                  <span className="text-accent font-display uppercase tracking-[0.3em] text-sm mb-3 block">{item.year}</span>
                  <p className="text-metal text-base md:text-lg font-light leading-relaxed">{item.text}</p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — CLOSING STATEMENT
      ═══════════════════════════════════════════════════════════ */}
      <section className="scroll-section py-32 md:py-44 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-primary to-primary pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <div className="reveal-elem w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center bg-accent/5">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="reveal-elem text-3xl md:text-5xl lg:text-6xl font-display font-light leading-tight tracking-wide">
            We Build Confidence,<br />
            <span className="text-accent">Comfort & Lasting Value.</span>
          </h2>
          <div className="line-reveal w-32 h-[1px] bg-accent/50 mx-auto"></div>
          <p className="reveal-elem text-metal text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Backed by professional installation practices, trained technicians, and dependable after-sales support, Alpha Elevators is committed to long-term reliability and customer satisfaction.
          </p>
          <button onClick={() => { if (onBack) onBack(); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }} className="reveal-elem mt-4 px-10 py-4 bg-accent text-primary font-semibold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300">
            Get a Consultation
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 px-6 bg-secondary border-t border-white/5 text-center">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Alpha Elevators. All Rights Reserved.</p>
      </footer>

    </div>
  )
}
