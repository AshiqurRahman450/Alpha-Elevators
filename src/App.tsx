import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'
import { ExplorePage } from './components/ExplorePage'
import { AboutPage } from './components/AboutPage'
import { ProductsPage } from './components/ProductsPage'
import { LocationsPage } from './components/LocationsPage'
import type { LocationCity } from './components/LocationsPage'
import { GalleryPage } from './components/GalleryPage'
import { ContactPage } from './components/ContactPage'
import { QuickContactFloating } from './components/QuickContactFloating'

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExploreMode, setIsExploreMode] = useState(false)
  const [isAboutPage, setIsAboutPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase()
      return p === '/about' || p === '/about/' || window.location.hash === '#about-page'
    }
    return false
  })
  const [isProductsPage, setIsProductsPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase()
      return p === '/products' || p === '/products/'
    }
    return false
  })
  const [isLocationsPage, setIsLocationsPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase()
      return p === '/locations' || p === '/locations/'
    }
    return false
  })
  const [isGalleryPage, setIsGalleryPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase()
      return p === '/gallery' || p === '/gallery/'
    }
    return false
  })
  const [isContactPage, setIsContactPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase()
      return p === '/contact' || p === '/contact/'
    }
    return false
  })
  const [contactInitialData, setContactInitialData] = useState<{
    scrollToForm?: boolean
    initialNotes?: string
    propertyType?: string
    city?: string
  } | null>(null)
  const [selectedLocationCity, setSelectedLocationCity] = useState<LocationCity>('chennai')

  // Smooth cinematic loader sequence for initial entrance
  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 20
      if (current >= 100) {
        setLoadingProgress(100)
        clearInterval(interval)
      } else {
        setLoadingProgress(current)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [])

  // Lock body scroll on the home screen; re-enable scroll when viewing subpages
  useEffect(() => {
    const isSubpage = isExploreMode || isAboutPage || isProductsPage || isLocationsPage || isGalleryPage || isContactPage
    if (!isSubpage) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExploreMode, isAboutPage, isProductsPage, isLocationsPage, isGalleryPage, isContactPage])

  // Subpage: Interactive 3D Explore
  if (isExploreMode) {
    return (
      <>
        <CustomCursor />
        <ExplorePage 
          onBack={() => setIsExploreMode(false)} 
          onRequestConsultation={(data) => {
            setIsExploreMode(false)
            setContactInitialData({
              scrollToForm: true,
              propertyType: data?.id === 'EV01' ? 'Glass Elevator Showcase' : data?.id === 'AE03' ? 'Luxury Villa' : 'Luxury Villa',
              initialNotes: data ? `Inquiry for ${data.modelName} (${data.id}) model - Estimated budget: ${data.budget}. Please provide customized shaft dimensions & pricing.` : ''
            })
            setIsContactPage(true)
          }}
        />
        <QuickContactFloating />
      </>
    )
  }

  // Subpage: About Alpha
  if (isAboutPage) {
    return (
      <>
        <CustomCursor />
        <AboutPage 
          onBack={() => setIsAboutPage(false)} 
          onConsultationClick={(notes?: string) => {
            setIsAboutPage(false)
            setContactInitialData({
              scrollToForm: true,
              propertyType: 'Architectural Luxury Villa',
              initialNotes: notes || 'Inquiry from About Page: Request for Architectural CAD Shaft Drawings, DWG specifications & Structural Calculations.'
            })
            setIsContactPage(true)
          }}
        />
        <QuickContactFloating />
      </>
    )
  }

  // Subpage: Products Catalog & 3D Cabin Experience
  if (isProductsPage) {
    return (
      <>
        <CustomCursor />
        <ProductsPage onBack={() => setIsProductsPage(false)} />
        <QuickContactFloating />
      </>
    )
  }

  // Subpage: Locations & Experience Centers
  if (isLocationsPage) {
    return (
      <>
        <CustomCursor />
        <LocationsPage 
          onBack={() => setIsLocationsPage(false)} 
          initialCity={selectedLocationCity} 
          onBookSurveyClick={(city?: string, notes?: string) => {
            setIsLocationsPage(false)
            const targetCity = city ? (city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()) : 'Chennai'
            setContactInitialData({
              scrollToForm: true,
              city: targetCity,
              propertyType: 'Luxury Villa',
              initialNotes: notes || `Request for Complimentary On-Site Survey & Shaft Feasibility Audit in ${targetCity}.`
            })
            setIsContactPage(true)
          }}
        />
        <QuickContactFloating />
      </>
    )
  }

  // Subpage: Architecture & Installation Gallery
  if (isGalleryPage) {
    return (
      <>
        <CustomCursor />
        <GalleryPage onBack={() => setIsGalleryPage(false)} />
        <QuickContactFloating />
      </>
    )
  }

  // Subpage: Consultation & Contact Form
  if (isContactPage) {
    return (
      <>
        <CustomCursor />
        <ContactPage 
          onBack={() => {
            setIsContactPage(false)
            setContactInitialData(null)
          }} 
          scrollToForm={contactInitialData?.scrollToForm}
          initialNotes={contactInitialData?.initialNotes}
          initialPropertyType={contactInitialData?.propertyType}
          initialCity={contactInitialData?.city}
        />
        <QuickContactFloating />
      </>
    )
  }

  // Home Page: Header + Full-Bleed Video Hero only (No scroll)
  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-primary select-none flex flex-col">
      {/* Elevator Door Intro Loader */}
      {!isLoaded && (
        <LoadingScreen 
          progress={loadingProgress} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}

      {/* Premium Cursor */}
      <CustomCursor />

      {/* Header / Navigation Bar */}
      <Navbar 
        onAboutClick={() => setIsAboutPage(true)} 
        onProductsClick={() => setIsProductsPage(true)} 
        onLocationsClick={(city = 'all') => {
          setSelectedLocationCity(city)
          setIsLocationsPage(true)
        }}
        onGalleryClick={() => setIsGalleryPage(true)}
        onContactClick={() => setIsContactPage(true)}
      />

      {/* Hero with Cinematic 0001.mp4 Background */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <Hero 
          onExplore={() => setIsExploreMode(true)} 
          onConsultation={() => {
            setContactInitialData({ scrollToForm: true })
            setIsContactPage(true)
          }}
        />
      </main>

      {/* Floating Instant Contact (WhatsApp & Call) */}
      <QuickContactFloating />
    </div>
  )
}

export default App
