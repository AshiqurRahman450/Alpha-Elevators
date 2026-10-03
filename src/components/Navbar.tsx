import { useState, useEffect } from 'react'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onAboutClick?: () => void;
  onProductsClick?: () => void;
  onLocationsClick?: (city?: 'chennai' | 'coimbatore' | 'all') => void;
  onGalleryClick?: () => void;
  onContactClick?: () => void;
}

export const Navbar = ({ onAboutClick, onProductsClick, onLocationsClick, onGalleryClick, onContactClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (item: string) => {
    setMobileMenuOpen(false)
    if (item === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (item === 'About' && onAboutClick) {
      onAboutClick()
    }
    if (item === 'Products' && onProductsClick) {
      onProductsClick()
    }
    if (item === 'Locations' && onLocationsClick) {
      onLocationsClick('all')
    }
    if (item === 'Gallery' && onGalleryClick) {
      onGalleryClick()
    }
    if (item === 'Contact' && onContactClick) {
      onContactClick()
    }
  }

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Locations', href: '#locations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-primary/95 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault()
            setMobileMenuOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2 group z-50"
        >
          <img src="/logo.png" alt="Alpha Elevators Logo" className="h-10 transition-transform duration-300 group-hover:scale-105" />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.name)
              }}
              className="text-sm tracking-wide text-white/80 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={onContactClick}
            className="px-6 py-2 bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 text-sm tracking-widest text-accent uppercase"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-all duration-300 z-50"
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Drawer / Overlay */}
      <div 
        className={`fixed inset-0 top-[72px] h-[calc(100vh-72px)] bg-[#050505]/98 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-between px-8 py-8 transition-all duration-500 border-t border-white/10 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-[1px] bg-accent"></span>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-accent">Menu Navigation</span>
          </div>

          {menuItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className="flex items-center justify-between text-2xl font-display font-light text-white/90 hover:text-accent tracking-wide text-left py-3 border-b border-white/5 transition-colors group"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <span>{item.name}</span>
              <ArrowRight size={18} className="text-white/20 group-hover:text-accent transform group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-6">
          <button 
            onClick={() => {
              setMobileMenuOpen(false)
              if (onContactClick) onContactClick()
            }}
            className="w-full py-4 bg-accent text-primary font-semibold tracking-[0.2em] uppercase text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span>Get a Free Quote</span>
            <ArrowRight size={16} />
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 pt-2 font-mono">
            <a href="tel:+918015129224" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={13} className="text-accent" />
              <span>+91 80151 29224</span>
            </a>
            <span className="text-white/30">Chennai • Coimbatore</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
