import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  progress: number
  onComplete?: () => void
}

export const LoadingScreen = ({ progress, onComplete }: LoadingScreenProps) => {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const elevatorRef = useRef<HTMLDivElement>(null)
  const hasTriggeredExit = useRef(false)

  // Smoothly animate the displayed progress number
  useEffect(() => {
    if (progress > displayProgress) {
      const step = Math.max(1, Math.floor((progress - displayProgress) / 5))
      const timeout = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + step, progress))
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [progress, displayProgress])

  // When progress hits 100, trigger the exit animation
  useEffect(() => {
    if (progress >= 100 && displayProgress >= 100 && !hasTriggeredExit.current) {
      hasTriggeredExit.current = true
      setIsExiting(true)

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
        }
      })
      // Doors open
      tl.to('.loading-door-left', { xPercent: -100, duration: 1, ease: 'power3.inOut' }, 0.3)
      tl.to('.loading-door-right', { xPercent: 100, duration: 1, ease: 'power3.inOut' }, 0.3)
      // Fade out entire container
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, pointerEvents: 'none' }, 1.3)
    }
  }, [progress, displayProgress, onComplete])

  if (isExiting && !containerRef.current) return null

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
            {displayProgress.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
      
    </div>
  )
}
