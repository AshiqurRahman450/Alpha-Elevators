import { useState, useRef, useEffect } from 'react'
import { LiftDetailsPage, type LiftData } from './LiftDetailsPage'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'

export const ExplorePage = ({ 
  onBack, 
  onRequestConsultation 
}: { 
  onBack: () => void
  onRequestConsultation?: (data?: { modelName: string, id: string, budget: string }) => void 
}) => {
  const [showBudget, setShowBudget] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  // Ensure reliable autoplay across mobile & desktop browsers
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
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: 'power4.out', delay: 0.5 }
      )
    }
  }, [])

  useEffect(() => {
    if (showBudget && cardsContainerRef.current) {
      gsap.fromTo(cardsContainerRef.current.children,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' }
      )
    }

    const video = videoRef.current
    if (!video) return
    if (showBudget) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [showBudget])

  const [selectedLift, setSelectedLift] = useState<LiftData | null>(null)

  const liftOptions: (LiftData & { image?: string, video?: string, isEV?: boolean })[] = [
    { 
      name: "Standard", id: "AE01", budget: "₹8L onwards", color: "#cccccc", image: "/lifts/standard-duplex-vision.jpg",
      description: "Alpha Elevators delivers state-of-the-art elevator solutions with advanced safety technology and precision engineering. Built with international quality standards, our systems ensure smooth, secure, and silent operation—elevating comfort with every ride.",
      features: ["Advanced safety technology", "Precision engineering", "International quality standards", "Smooth, secure, and silent operation"]
    },
    { 
      name: "Premium", id: "AE02", budget: "₹12L onwards", color: "#ccaa00", image: "/lifts/lift1.jpg",
      description: "Alpha Elevators is a cutting-edge traction lift system designed to comply with the European Lift Directive 2014/33/EU, ensuring top-tier safety and performance. This solution is highly adaptable to meet any architectural requirement, making it perfect for both standard and complex projects.",
      features: ["Cutting-edge traction lift system", "Complies with European Lift Directive 2014/33/EU", "Highly adaptable for standard and complex projects", "Sleek, modern design"]
    },
    { 
      name: "Luxury", id: "AE03", budget: "₹18L onwards", color: "#111111", image: "/lifts/ae03-grand-duplex.jpg",
      description: "Experience state-of-the-art technology at an affordable price with Alpha Elevators. The Alpha Elevators Belt-Model utilizes patented belt-drive technology, integrated with counterweights, ensuring superior performance. This innovative system eliminates friction, allowing for smoother operation and higher speeds, while completely eliminating the need for greasing and oiling.",
      features: ["Patented belt-drive technology", "Integrated counterweights for superior performance", "Frictionless, smoother operation and higher speeds", "No greasing and oiling required"]
    },
    { 
      name: "EV Model", id: "EV01", budget: "₹22L onwards", color: "#00cccc", image: "/lifts/ev01-model-vision.jpg", isEV: true,
      description: "Alpha Elevators redefines vertical mobility with its energy-efficient and eco-conscious design. Built to run on single-phase power, it consumes less than 15 units of electricity per month, making it an ideal choice for modern homes.",
      features: ["Low power consumption (0.75kW, 240V single-phase)", "Intelligent power-saving descent system", "Environmentally responsible and cost-effective", "Emergency battery backup during power outages"]
    }
  ]

  if (selectedLift) {
    return (
      <LiftDetailsPage 
        lift={selectedLift} 
        onBack={() => setSelectedLift(null)} 
        onRequestConsultation={onRequestConsultation}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a1a1a] via-[#050505] to-black overflow-y-auto text-white">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Top Left Navigation Back Button */}
      <button 
        onClick={() => {
          if (showBudget) {
            setShowBudget(false)
          } else {
            onBack()
          }
        }}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-accent uppercase tracking-widest text-sm transition-all duration-300 hover:gap-4 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {/* Hero EV USP Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        
        {/* EV Background Video: only show when NOT in vision tier mode */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-700 ${
            showBudget ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <video
            ref={videoRef}
            src="/lifts/0011.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/lifts/lift1.jpg"
            preload="auto"
            className="w-full h-full object-cover object-center scale-[1.01] brightness-[1.15] contrast-[1.08] saturate-[1.10]"
          />

          {/* Minimal edge-only gradients to keep the video bright and crystal clear */}
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
        </div>

        <div 
          ref={textRef} 
          className={`relative z-10 text-center px-4 transition-all duration-700 ${
            showBudget ? 'opacity-0 h-0 overflow-hidden pointer-events-none mb-0 scale-95' : 'opacity-100 mb-16'
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white mb-6 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            The EV Model
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 max-w-4xl mx-auto px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            {['ITALIAN ENGINEERING', 'INDIAN INNOVATION', 'LOW ENERGY', 'SINGLE PHASE POWER SUPPLY', 'PREMIUM SAFETY'].map((text, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs md:text-sm tracking-[0.2em] font-light text-white/90 uppercase drop-shadow">
                  {text}
                </span>
                {i < arr.length - 1 && <span className="text-accent text-xs">◆</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Button Section */}
        <div className={`relative z-10 transition-all duration-700 ${showBudget ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 mt-12'}`}>
          <button 
            onClick={() => {
              setShowBudget(true);
              setTimeout(() => {
                document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="relative group px-12 py-5 bg-transparent overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <div className="absolute inset-0 border border-accent/50 group-hover:border-accent transition-colors duration-500"></div>
            <span className="relative text-accent group-hover:text-white font-semibold tracking-[0.2em] uppercase text-sm transition-colors duration-500">
              Select Your Tier
            </span>
            
            {/* Glowing decorative dots */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
          </button>
        </div>

        {/* Cards Section */}
        <div 
          id="vision-section" 
          className={`relative z-10 w-full max-w-7xl mx-auto px-6 transition-all duration-700 ${
            showBudget ? 'opacity-100 mt-4 mb-24' : 'opacity-0 h-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest text-center text-white">Choose Your Vision</h2>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>
          
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {liftOptions.map((lift, i) => (
                <div key={i} onClick={() => setSelectedLift(lift)} className="relative bg-gradient-to-b from-white/10 to-white/0 border border-white/10 p-6 flex flex-col items-center hover:border-accent/80 transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,204,204,0.15)]">
                  
                  {/* Accent Top Border */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-full h-72 mb-8 relative overflow-hidden rounded-sm shadow-inner shadow-black/50 bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {lift.video ? (
                      <video src={lift.video} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    ) : (
                      <img src={lift.image} alt={lift.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-light uppercase tracking-widest mb-3 text-white group-hover:text-accent transition-colors duration-300">{lift.name}</h3>
                  <div className="text-white/50 font-mono tracking-[0.2em] text-xs mb-8 group-hover:text-white/80 transition-colors duration-300">{lift.budget}</div>
                  
                  <button className="w-full py-4 bg-white/5 border border-white/10 uppercase tracking-widest text-xs group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300 font-semibold mt-auto relative overflow-hidden">
                    <span className="relative z-10">Configure</span>
                  </button>
                </div>
              ))}
            </div>
        </div>

      </div>
    </div>
  )
}
