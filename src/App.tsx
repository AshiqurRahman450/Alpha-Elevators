import { useEffect, useState, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import { Canvas } from '@react-three/fiber'
import { useProgress, Environment } from '@react-three/drei'
import { Navbar } from './components/Navbar'

import { Hero } from './components/Hero'
import { About } from './components/About'
import { WhyAlpha } from './components/WhyAlpha'
import { Features } from './components/Features'
import { ExplodedView } from './components/ExplodedView'
import { Safety } from './components/Safety'
import { Products } from './components/Products'
import { Locations } from './components/Locations'
import { Gallery } from './components/Gallery'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { ElevatorScene } from './components/ElevatorScene'
import { LoadingScreen } from './components/LoadingScreen'
import { ExplorePage } from './components/ExplorePage'
import { AboutPage } from './components/AboutPage'
import { ProductsPage } from './components/ProductsPage'
import { LocationsPage } from './components/LocationsPage'
import type { LocationCity } from './components/LocationsPage'
import { GalleryPage } from './components/GalleryPage'
import { ContactPage } from './components/ContactPage'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Inner component that reads the drei loading progress
const LoadingTracker = ({ onProgress }: { onProgress: (p: number) => void }) => {
  const { progress } = useProgress()
  useEffect(() => {
    onProgress(progress)
  }, [progress, onProgress])
  return null
}

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExploreMode, setIsExploreMode] = useState(false)
  const [isAboutPage, setIsAboutPage] = useState(false)
  const [isProductsPage, setIsProductsPage] = useState(false)
  const [isLocationsPage, setIsLocationsPage] = useState(false)
  const [isGalleryPage, setIsGalleryPage] = useState(false)
  const [isContactPage, setIsContactPage] = useState(false)
  const [contactInitialData, setContactInitialData] = useState<{
    scrollToForm?: boolean
    initialNotes?: string
    propertyType?: string
  } | null>(null)
  const [selectedLocationCity, setSelectedLocationCity] = useState<LocationCity>('chennai')

  useEffect(() => {
    if (isExploreMode || isAboutPage || isProductsPage || isLocationsPage || isGalleryPage || isContactPage) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [isExploreMode, isAboutPage, isProductsPage, isLocationsPage, isGalleryPage, isContactPage])

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
      </>
    )
  }

  if (isAboutPage) {
    return (
      <>
        <CustomCursor />
        <AboutPage onBack={() => setIsAboutPage(false)} />
      </>
    )
  }

  if (isProductsPage) {
    return (
      <>
        <CustomCursor />
        <ProductsPage onBack={() => setIsProductsPage(false)} />
      </>
    )
  }

  if (isLocationsPage) {
    return (
      <>
        <CustomCursor />
        <LocationsPage 
          onBack={() => setIsLocationsPage(false)} 
          initialCity={selectedLocationCity} 
        />
      </>
    )
  }

  if (isGalleryPage) {
    return (
      <>
        <CustomCursor />
        <GalleryPage onBack={() => setIsGalleryPage(false)} />
      </>
    )
  }

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
        />
      </>
    )
  }

  return (
    <>
      {/* Loading Screen - shows real 3D loading progress */}
      {!isLoaded && (
        <LoadingScreen 
          progress={loadingProgress} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}

      <CustomCursor />
      {/* Navbar will open the respective sub-pages when clicked */}
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
      
      {/* Global 3D Canvas */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-primary pointer-events-none">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Environment files="/potsdamer_platz_1k.hdr" />
          </Suspense>
          <ElevatorScene />
          {/* Track real loading progress */}
          <LoadingTracker onProgress={setLoadingProgress} />
        </Canvas>
      </div>

      <main className="relative z-10 w-full overflow-hidden">
        <Hero 
          onExplore={() => setIsExploreMode(true)} 
          onConsultation={() => {
            setContactInitialData({ scrollToForm: true })
            setIsContactPage(true)
          }}
        />
        {/* The in-page About section remains untouched */}
        <About />
        <WhyAlpha />
        <Features />
        <ExplodedView />
        <Safety />
        <Products />
        <Locations onExploreLocation={(city) => {
          setSelectedLocationCity(city)
          setIsLocationsPage(true)
        }} />
        <Gallery onViewAll={() => setIsGalleryPage(true)} />
        <FAQ />
        <Contact />
      </main>

      <Footer 
        onLocationsClick={(city = 'all') => {
          setSelectedLocationCity(city)
          setIsLocationsPage(true)
        }}
        onContactClick={() => setIsContactPage(true)}
      />
    </>
  )
}

export default App

