import { useState, useEffect } from 'react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Alpha Elevators Logo" className="h-10 transition-transform duration-300 group-hover:scale-105" />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {['Home', 'About', 'Products', 'Locations', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm tracking-wide text-white/80 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <button className="px-6 py-2 bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 text-sm tracking-widest text-accent uppercase">
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </nav>
  )
}
