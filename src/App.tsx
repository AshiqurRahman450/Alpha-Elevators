import { useEffect, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
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

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
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
  }, [])

  return (
    <>

      <CustomCursor />
      <Navbar />
      
      {/* Global 3D Canvas */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-primary pointer-events-none">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
          <ElevatorScene />
        </Canvas>
      </div>

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <WhyAlpha />
        <Features />
        <ExplodedView />
        <Safety />
        <Products />
        <Locations />
        <Gallery />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
