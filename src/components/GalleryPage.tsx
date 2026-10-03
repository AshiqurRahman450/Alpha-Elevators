import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface GalleryPageProps {
  onBack?: () => void
}

const galleryImages = [
  { src: 'https://alphaelevators.in/gallery/g (1).jpeg', alt: 'Premium Home Elevator Installation', category: 'residential', title: 'Residential Elegance', location: 'Chennai' },
  { src: 'https://alphaelevators.in/gallery/g (2).jpeg', alt: 'Modern Glass Elevator Design', category: 'modern', title: 'Modern Glass Lift', location: 'Anna Nagar' },
  { src: 'https://alphaelevators.in/gallery/g (3).jpeg', alt: 'Luxury Residential Lift Project', category: 'luxury', title: 'Luxury Villa Lift', location: 'ECR, Chennai' },
  { src: 'https://alphaelevators.in/gallery/g (4).jpeg', alt: 'Custom Elevator Installation', category: 'residential', title: 'Custom Home Elevator', location: 'T. Nagar' },
  { src: 'https://alphaelevators.in/gallery/gg-01.jpeg', alt: 'Premium Elevator Cabin Interior', category: 'luxury', title: 'Premium Cabin Design', location: 'Adyar, Chennai' },
  { src: 'https://alphaelevators.in/gallery/g (6).jpeg', alt: 'Compact Home Lift Solution', category: 'modern', title: 'Compact Lift Solution', location: 'Coimbatore' },
  { src: 'https://alphaelevators.in/gallery/g (7).jpeg', alt: 'Stainless Steel Elevator Finish', category: 'residential', title: 'Steel Finish Elevator', location: 'Velachery' },
  { src: 'https://alphaelevators.in/gallery/g (8).jpeg', alt: 'Contemporary Lift Design', category: 'modern', title: 'Contemporary Design', location: 'Nungambakkam' },
  { src: 'https://alphaelevators.in/gallery/g (11).jpeg', alt: 'Panoramic Home Elevator', category: 'luxury', title: 'Panoramic Home Lift', location: 'OMR, Chennai' },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'modern', label: 'Modern' },
  { id: 'luxury', label: 'Luxury' },
]

/* ─── Fast Animated Counter on Page Load ─── */
const AnimatedCounter = ({ end, suffix = '', duration = 1.2 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: end,
      duration,
      delay: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (el) el.textContent = `${Math.round(obj.val)}${suffix}`
      }
    })
    return () => {
      tween.kill()
    }
  }, [end, suffix, duration])

  return <span ref={ref}>0{suffix}</span>
}

export const GalleryPage = ({ onBack }: GalleryPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredImages = activeFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeFilter)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % filteredImages.length)
  }, [filteredImages.length])

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length)
  }, [filteredImages.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.gp-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.gp-hero-title span', { y: '110%' }, { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .fromTo('.gp-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .fromTo('.gp-hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.6')
        .fromTo('.gp-hero-stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, '-=0.4')

      gsap.fromTo('.gp-filter-btn', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.gp-filters', start: 'top 85%' }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.gp-grid-item')
    gsap.fromTo(items, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
  }, [activeFilter])

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-white w-full overflow-hidden font-sans">
      <style>{`
        .gp-grid-item { position:relative; overflow:hidden; cursor:pointer; background:#0a0a0a; }
        .gp-grid-item img { width:100%; height:100%; object-fit:cover; transition:transform 1.2s cubic-bezier(.25,0,.15,1),filter .8s ease; filter:brightness(.85) saturate(.9); }
        .gp-grid-item:hover img { transform:scale(1.08); filter:brightness(1) saturate(1.1); }
        .gp-shimmer { position:absolute; inset:0; background:linear-gradient(110deg,#0a0a0a 30%,#151515 50%,#0a0a0a 70%); background-size:200% 100%; animation:gpShimmer 1.5s linear infinite; z-index:2; transition:opacity .5s ease; }
        .gp-shimmer.loaded { opacity:0; pointer-events:none; }
        @keyframes gpShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .gp-grid-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.85) 100%); opacity:0; transition:opacity .6s cubic-bezier(.4,0,.2,1); display:flex; flex-direction:column; justify-content:flex-end; padding:28px; z-index:3; }
        .gp-grid-item:hover .gp-grid-overlay { opacity:1; }
        .gp-grid-overlay-title { font-size:18px; font-weight:300; color:#f5f5f5; margin-bottom:6px; transform:translateY(20px); transition:transform .5s cubic-bezier(.4,0,.2,1) .1s; }
        .gp-grid-item:hover .gp-grid-overlay-title { transform:translateY(0); }
        .gp-grid-overlay-meta { display:flex; align-items:center; gap:10px; transform:translateY(20px); transition:transform .5s cubic-bezier(.4,0,.2,1) .15s; }
        .gp-grid-item:hover .gp-grid-overlay-meta { transform:translateY(0); }
        .gp-grid-overlay-category { font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:#666; padding:4px 12px; border:1px solid rgba(255,255,255,.08); margin-top:10px; display:inline-block; width:fit-content; transform:translateY(20px); transition:transform .5s cubic-bezier(.4,0,.2,1) .2s; }
        .gp-grid-item:hover .gp-grid-overlay-category { transform:translateY(0); }
        .gp-grid-zoom { position:absolute; top:16px; right:16px; width:40px; height:40px; background:rgba(0,0,0,.4); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; z-index:4; opacity:0; transform:scale(.8); transition:all .4s cubic-bezier(.4,0,.2,1); border-radius:50%; }
        .gp-grid-item:hover .gp-grid-zoom { opacity:1; transform:scale(1); }
        .gp-grid-index { position:absolute; top:16px; left:16px; font-size:11px; font-weight:300; color:rgba(255,255,255,.3); letter-spacing:.1em; z-index:4; }
        .gp-lightbox { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.96); backdrop-filter:blur(20px); animation:gpFadeIn .4s ease; }
        @keyframes gpFadeIn { from{opacity:0} to{opacity:1} }
        .gp-lightbox-close { position:absolute; top:32px; right:32px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); color:#f5f5f5; cursor:pointer; transition:all .3s; z-index:10; }
        .gp-lightbox-close:hover { background:rgba(0,204,204,.1); border-color:#00cccc; color:#00cccc; }
        .gp-lightbox-nav { position:absolute; top:50%; transform:translateY(-50%); width:56px; height:56px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:#f5f5f5; cursor:pointer; transition:all .3s; z-index:10; }
        .gp-lightbox-nav:hover { background:rgba(0,204,204,.08); border-color:rgba(0,204,204,.3); color:#00cccc; }
        .gp-lightbox-prev { left:32px; }
        .gp-lightbox-next { right:32px; }
        .gp-lightbox-img-wrapper { max-width:80vw; max-height:80vh; display:flex; align-items:center; justify-content:center; animation:gpSlideIn .4s ease; }
        @keyframes gpSlideIn { from{opacity:0;transform:scale(.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .gp-lightbox-img-wrapper img { max-width:100%; max-height:80vh; object-fit:contain; box-shadow:0 30px 80px rgba(0,0,0,.5); }
        .gp-lightbox-info { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); text-align:center; z-index:10; }
        .gp-lightbox-info-title { font-size:18px; font-weight:300; color:#f5f5f5; margin-bottom:8px; }
        .gp-lightbox-info-meta { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#00cccc; }
        .gp-lightbox-counter { position:absolute; top:40px; left:40px; font-size:13px; font-weight:300; color:rgba(255,255,255,.4); letter-spacing:.1em; z-index:10; }
        @media(max-width:768px) {
          .gp-lightbox-prev { left:12px; }
          .gp-lightbox-next { right:12px; }
          .gp-lightbox-nav { width:44px; height:44px; }
        }
      `}</style>

      {/* ─── Fixed Corporate Nav (same as ProductsPage) ─── */}
      {onBack && (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-primary/70 backdrop-blur-xl border-b border-white/5">
          <button onClick={onBack} className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300">
            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="font-display tracking-[0.15em] text-xs uppercase hidden sm:block">Back to Home</span>
          </button>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase hidden md:block">Our Gallery</span>
            <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
            <img src="/logo.png" alt="Alpha Elevators" className="h-7 opacity-80" />
          </div>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO — Gallery Showcase Header
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/8 via-primary to-primary pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
          <div className="gp-hero-tag flex items-center gap-4">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.35em] text-xs font-semibold">Project Gallery</span>
          </div>

          <h1 className="gp-hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light uppercase tracking-tight leading-[0.95]">
            <div className="overflow-hidden"><span className="inline-block">Signature</span></div>
            <div className="overflow-hidden"><span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">Installations.</span></div>
          </h1>

          <div className="gp-hero-line h-[1px] bg-gradient-to-r from-accent via-white/20 to-transparent origin-left"></div>

          <p className="gp-hero-desc text-metal text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Explore our portfolio of premium home elevator installations across exclusive residences
            in Chennai and Tamil Nadu. Each project reflects our commitment to luxury, precision, and
            architectural harmony.
          </p>

          {/* Stats Row */}
          <div className="gp-hero-desc flex flex-wrap gap-12 md:gap-16 mt-4">
            <div className="gp-hero-stat flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-light text-accent tracking-tight">
                <AnimatedCounter end={500} suffix="+" duration={1.2} />
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-normal">Projects Completed</span>
            </div>
            <div className="gp-hero-stat flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-light text-accent tracking-tight">
                <AnimatedCounter end={15} suffix="+" duration={1.0} />
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-normal">Years Experience</span>
            </div>
            <div className="gp-hero-stat flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-light text-accent tracking-tight">
                <AnimatedCounter end={100} suffix="%" duration={1.1} />
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-normal">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FILTERS + GALLERY GRID
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className="gp-filters flex flex-wrap gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`gp-filter-btn px-7 py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-500 font-sans ${
                  activeFilter === cat.id
                    ? 'border-accent/50 bg-accent/5 text-accent'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white bg-transparent'
                }`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, index) => (
              <div
                key={`${activeFilter}-${index}`}
                className="gp-grid-item rounded-sm border border-white/5 aspect-square"
                onClick={() => openLightbox(index)}
              >
                <div className={`gp-shimmer ${imagesLoaded[index] ? 'loaded' : ''}`} />
                <img src={img.src} alt={img.alt} loading="lazy" onLoad={() => setImagesLoaded(prev => ({ ...prev, [index]: true }))} />
                <div className="gp-grid-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="gp-grid-zoom"><ZoomIn size={16} strokeWidth={1.5} color="#f5f5f5" /></div>
                <div className="gp-grid-overlay">
                  <div className="gp-grid-overlay-title">{img.title}</div>
                  <div className="gp-grid-overlay-meta">
                    <span className="w-5 h-[1px] bg-accent inline-block"></span>
                    <span className="text-accent text-[11px] tracking-[0.2em] uppercase">{img.location}</span>
                  </div>
                  <div className="gp-grid-overlay-category">{img.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/6 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light mb-6 leading-tight">
            Ready for Your <span className="text-accent italic">Dream Elevator?</span>
          </h2>
          <p className="text-metal text-base md:text-lg font-light leading-relaxed mb-10">
            Let us design and install a premium home elevator that perfectly complements your living space and lifestyle.
          </p>
          <button
            className="group inline-flex items-center gap-4 px-10 py-4 border border-accent/50 hover:bg-accent/10 transition-all duration-500 text-accent text-xs tracking-[0.25em] uppercase font-semibold"
            onClick={() => { if (onBack) onBack(); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }}
          >
            <span>Get a Free Consultation</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      {lightboxOpen && (
        <div className="gp-lightbox" onClick={closeLightbox}>
          <div className="gp-lightbox-counter">{String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}</div>
          <button className="gp-lightbox-close" onClick={closeLightbox}><X size={20} strokeWidth={1.5} /></button>
          <button className="gp-lightbox-nav gp-lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage() }}><ChevronLeft size={24} strokeWidth={1.5} /></button>
          <div className="gp-lightbox-img-wrapper" onClick={(e) => e.stopPropagation()}>
            <img key={lightboxIndex} src={filteredImages[lightboxIndex]?.src} alt={filteredImages[lightboxIndex]?.alt} />
          </div>
          <button className="gp-lightbox-nav gp-lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage() }}><ChevronRight size={24} strokeWidth={1.5} /></button>
          <div className="gp-lightbox-info">
            <div className="gp-lightbox-info-title">{filteredImages[lightboxIndex]?.title}</div>
            <div className="gp-lightbox-info-meta">{filteredImages[lightboxIndex]?.location}</div>
          </div>
        </div>
      )}
    </div>
  )
}
