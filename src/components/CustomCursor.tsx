import { useEffect, useRef } from 'react'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return

    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const handleHover = () => cursor.classList.add('hover')
    const handleLeave = () => cursor.classList.remove('hover')

    window.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, input, [data-interactive]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  // Return empty on mobile to avoid rendering
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] transition-[width,height,background-color] duration-300 mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <span className="opacity-0 transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold tracking-widest text-primary">
        EXPLORE
      </span>
    </div>
  )
}
