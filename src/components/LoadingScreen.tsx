import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const elevatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1
      if (currentProgress > 100) currentProgress = 100
      setProgress(currentProgress)
      
      if (currentProgress === 100) {
        clearInterval(interval)
        
        const tl = gsap.timeline()
        // Doors open
        tl.to('.loading-door-left', { xPercent: -100, duration: 1, ease: 'power3.inOut' }, 0.5)
        tl.to('.loading-door-right', { xPercent: 100, duration: 1, ease: 'power3.inOut' }, 0.5)
        // Fade out entire container
        tl.to(containerRef.current, { opacity: 0, duration: 0.5, pointerEvents: 'none', display: 'none' }, 1.5)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary overflow-hidden">
      
      {/* Doors */}
      <div className="loading-door-left absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] border-r border-white/5 z-10" />
      <div className="loading-door-right absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] border-l border-white/5 z-10" />
      
      {/* Content behind doors but in front of background */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        {/* Elevator outline */}
        <div ref={elevatorRef} className="relative w-48 h-64 border border-white/20 flex flex-col items-center justify-between p-4 mb-8">
          {/* Logo */}
          <img src="/logo.png" alt="Alpha Elevators" className="w-24 opacity-80" ref={logoRef} />
          
          {/* Percentage */}
          <div className="text-4xl font-display text-accent font-light">
            {progress.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
    </div>
  )
}
