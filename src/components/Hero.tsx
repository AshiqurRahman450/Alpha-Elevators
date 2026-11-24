import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Sparkles } from 'lucide-react'

export const Hero = ({ 
  onExplore, 
  onConsultation 
}: { 
  onExplore?: () => void
  onConsultation?: () => void 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure robust autoplay on mobile devices (iOS Safari, Android Chrome)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const startPlay = () => {
      const promise = video.play()
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser policy blocked immediate autoplay, unlock on the first user interaction
          const unlock = () => {
            video.play().catch(() => {})
            window.removeEventListener('touchstart', unlock)
            window.removeEventListener('click', unlock)
          }
          window.addEventListener('touchstart', unlock, { passive: true, once: true })
          window.addEventListener('click', unlock, { once: true })
        })
      }
    }

    startPlay()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    
    // Animate text on load
    const tl = gsap.timeline({ delay: 0.6 })
    tl.fromTo('.hero-badge',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    tl.fromTo('.hero-text-line', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power4.out' },
      '-=0.4'
    )
    tl.fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo('.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.6'
    )
    tl.fromTo('.hero-labels',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-end pb-24 sm:pb-20 md:justify-center md:pb-0 px-5 sm:px-8 md:px-16 lg:px-28 select-none" 
      id="home"
    >
      {/* ─── Background Video: 0001.mp4 ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-primary">
        <video
          ref={videoRef}
          src="/lifts/0001.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/lifts/lift1.jpg"
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.01] brightness-[1.18] contrast-[1.08] saturate-[1.12]"
        />

        {/* ─── Overlays: Desktop vs Mobile ─── */}
        {/* Desktop: Horizontal gradient to leave right-side video bright while preserving text legibility on the left */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 via-55% to-transparent pointer-events-none" />
        <div className="hidden md:block absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary/30 pointer-events-none" />

        {/* Mobile: Bottom-weighted gradient keeping text balanced while the elevator video stays bright & vivid */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent pointer-events-none" />

        {/* Subtle Top Vignette for Navbar legibility on all viewports */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-primary/70 to-transparent pointer-events-none" />
        
        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      </div>

      {/* ─── Hero Content ─── */}
      <div className="relative z-20 max-w-4xl pt-16 md:pt-12 transition-all duration-500">
        
        {/* Premium Tagline Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md mb-3 sm:mb-4 md:mb-6">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-accent font-semibold">
            Architectural Vertical Mobility
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-display font-light uppercase tracking-tight leading-[0.98] text-white">
          <div className="overflow-hidden">
            <span className="hero-text-line inline-block">Elevating Life.</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-text-line inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-accent">
              Redefining Luxury.
            </span>
          </div>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-sub mt-3 sm:mt-4 md:mt-6 text-metal/90 max-w-xl text-xs sm:text-base md:text-lg font-light tracking-wide leading-relaxed line-clamp-3 sm:line-clamp-none">
          Premium home elevator solutions combining Italian engineering precision with Indian innovation. Crafted for seamless luxury living.
        </p>

        {/* Action Buttons */}
        <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-5">
          <button 
            onClick={onExplore} 
            className="hero-cta group flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,204,204,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            <span>Explore Our Elevators</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button 
            onClick={onConsultation} 
            className="hero-cta px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-semibold tracking-widest uppercase text-xs sm:text-sm hover:border-accent hover:text-accent transition-all duration-300 backdrop-blur-md bg-black/40 hover:bg-black/60 cursor-pointer"
          >
            Book a Consultation
          </button>
        </div>
      </div>

      {/* ─── Floating Data Labels (Desktop Right) ─── */}
      <div className="hero-labels absolute top-1/2 -translate-y-1/2 right-8 md:right-16 text-right hidden lg:flex flex-col gap-8 pointer-events-none z-20">
        {[
          { label: 'Italian Engineering', sub: 'European Precision' },
          { label: 'Indian Innovation', sub: 'Custom Built' },
          { label: 'Low Energy VVVF', sub: 'Eco Conscious' },
          { label: 'Premium Safety', sub: 'Multi-Layered ARD' }
        ].map((item, idx) => (
          <div key={idx} className="group border-r-2 border-accent/40 pr-5 transition-all">
            <div className="text-xs tracking-[0.25em] font-mono text-white/90 uppercase font-semibold">
              {item.label}
            </div>
            <div className="text-[10px] tracking-[0.2em] font-mono text-accent/70 uppercase mt-0.5">
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Bottom Status Indicator (Desktop Left) ─── */}
      <div className="absolute bottom-6 left-6 md:left-16 z-20 hidden md:flex items-center gap-3 text-white/40 text-[11px] font-mono tracking-widest uppercase pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span>Live Cinematic Showcase</span>
      </div>
    </section>
  )
}
