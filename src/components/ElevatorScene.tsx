import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useThree, useFrame } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

export const ElevatorScene = () => {
  useEffect(() => {
    // Empty setup
  }, [])

  const doorsRef = useRef<THREE.Group>(null)
  const leftDoorRef = useRef<THREE.Mesh>(null)
  const rightDoorRef = useRef<THREE.Mesh>(null)
  const cabinRef = useRef<THREE.Group>(null)
  const backWallRef = useRef<THREE.Mesh>(null)
  const leftWallRef = useRef<THREE.Mesh>(null)
  const rightWallRef = useRef<THREE.Mesh>(null)
  const ceilingRef = useRef<THREE.Mesh>(null)
  const floorRef = useRef<THREE.Mesh>(null)
  const controlPanelRef = useRef<THREE.Group>(null)
  const buttonsGroupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const handrailRef = useRef<THREE.Mesh>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)
  const ceilingLightRef = useRef<THREE.MeshStandardMaterial>(null)
  const footprintRingRef = useRef<THREE.Mesh>(null)
  const footprintMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  
  const verticalLightsRef = useRef<THREE.Group>(null)
  const safetyGridRef = useRef<THREE.Group>(null)
  const safetyGridMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  
  const { camera } = useThree()
  
  useFrame((state) => {
    if (verticalLightsRef.current && verticalLightsRef.current.visible) {
      verticalLightsRef.current.children.forEach((light) => {
        light.position.y -= 0.2
        if (light.position.y < -5) light.position.y = 5
      })
    }
  })

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isMobile } = context.conditions as { isMobile: boolean };

      camera.position.set(0, 0, isMobile ? 14 : 8)
      camera.rotation.set(0, 0, 0)
      
      // 1. HERO -> ABOUT
      const tlHero = gsap.timeline({ scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlHero.to(camera.position, { z: isMobile ? 6 : 2.5, ease: 'power2.inOut' }, 0)
      if (leftDoorRef.current && rightDoorRef.current) {
        tlHero.to(leftDoorRef.current.position, { x: -2.1, ease: 'power2.inOut' }, 0)
              .to(rightDoorRef.current.position, { x: 2.1, ease: 'power2.inOut' }, 0)
      }
      if (ceilingLightRef.current) tlHero.to(ceilingLightRef.current, { emissiveIntensity: 0.8, ease: 'power2.inOut' }, 0)
      if (screenMaterialRef.current) tlHero.to(screenMaterialRef.current.color, { r: 1, g: 1, b: 1, ease: 'power2.inOut' }, 0)

      // 2. ABOUT -> WHY ALPHA
      const tlAbout = gsap.timeline({ scrollTrigger: { trigger: '#whyalpha', start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
      tlAbout.to(camera.position, { x: isMobile ? 0 : -5, z: isMobile ? 8 : 5, y: isMobile ? 3 : 1, ease: 'power1.inOut' }, 0)
             .to(camera.rotation, { y: isMobile ? 0 : -0.8, x: isMobile ? -0.2 : 0, ease: 'power1.inOut' }, 0)
             .to(cabinRef.current!.rotation, { y: 0.2, ease: 'power1.inOut' }, 0)

      // 3. WHY ALPHA (Footprint)
      const tlFootprint = gsap.timeline({ scrollTrigger: { trigger: '#whyalpha', start: 'center bottom', end: 'center center', scrub: 1.5 } })
      tlFootprint.to(camera.rotation, { x: -0.2, ease: 'power1.inOut' }, 0)
                 .to(footprintRingRef.current!.scale, { x: 1, y: 1, z: 1, ease: 'power2.out' }, 0)
                 .to(footprintMaterialRef.current!, { opacity: 0.8, ease: 'power2.out' }, 0)
                 .to(cabinRef.current!.scale, { x: 0.95, y: 0.95, z: 0.95, ease: 'power2.inOut' }, 0)

      // 4. FEATURES -> EXPLODED VIEW
      const tlFeatures = gsap.timeline({
        scrollTrigger: {
          trigger: '#features', start: 'top bottom', end: 'bottom top', scrub: 1.5,
          onEnter: () => { if(verticalLightsRef.current) verticalLightsRef.current.visible = true },
          onLeaveBack: () => { if(verticalLightsRef.current) verticalLightsRef.current.visible = false }
        }
      })
      tlFeatures.to(camera.rotation, { x: 0, y: 0, ease: 'power2.inOut' }, 0)
                .to(cabinRef.current!.rotation, { y: 0, ease: 'power2.inOut' }, 0)
                .to(footprintMaterialRef.current!, { opacity: 0, ease: 'power2.out' }, 0)
                .to(cabinRef.current!.scale, { x: 1, y: 1, z: 1, ease: 'power2.inOut' }, 0)
                .to(camera.position, { x: 0, z: isMobile ? 12 : 6, y: 15, ease: 'power1.inOut' }, 0)
                .to(cabinRef.current!.position, { y: 15, ease: 'power1.inOut' }, 0)
                .to(ambientLightRef.current!, { intensity: 0.2, ease: 'power1.inOut' }, 0)

      // 5. EXPLODED VIEW -> SAFETY
      if (backWallRef.current && leftWallRef.current && rightWallRef.current && ceilingRef.current) {
        const tlExplode = gsap.timeline({ scrollTrigger: { trigger: '#explodedview', start: 'top bottom', end: 'top center', scrub: 1.5 } })
        tlExplode.to(ambientLightRef.current!, { intensity: 0.6, ease: 'power1.inOut' }, 0)
                 .to(leftWallRef.current.position, { x: isMobile ? -2.5 : -3.5, ease: 'power2.inOut' }, 0)
                 .to(rightWallRef.current.position, { x: isMobile ? 2.5 : 3.5, ease: 'power2.inOut' }, 0)
                 .to(ceilingRef.current.position, { y: 3.5, ease: 'power2.inOut' }, 0)
                 .to(floorRef.current!.position, { y: -3.5, ease: 'power2.inOut' }, 0)
                 .to(backWallRef.current.position, { z: -3.5, ease: 'power2.inOut' }, 0)
                 .to(controlPanelRef.current!.position, { x: -2.5, ease: 'power2.inOut' }, 0)
                 .to(camera.position, { z: isMobile ? 18 : 12, y: 15, ease: 'power2.inOut' }, 0)

        const tlImplode = gsap.timeline({ scrollTrigger: { trigger: '#explodedview', start: 'bottom center', end: 'bottom top', scrub: 1.5 } })
        tlImplode.to(leftWallRef.current.position, { x: -2, ease: 'power2.inOut' }, 0)
                 .to(rightWallRef.current.position, { x: 2, ease: 'power2.inOut' }, 0)
                 .to(ceilingRef.current.position, { y: 2.5, ease: 'power2.inOut' }, 0)
                 .to(floorRef.current!.position, { y: -2.5, ease: 'power2.inOut' }, 0)
                 .to(backWallRef.current.position, { z: -2, ease: 'power2.inOut' }, 0)
                 .to(controlPanelRef.current!.position, { x: -1.9, ease: 'power2.inOut' }, 0)
                 .to(camera.position, { z: isMobile ? 6 : 4, y: 15, ease: 'power2.inOut' }, 0)
      }

      // 6. SAFETY -> PRODUCTS
      const tlSafety = gsap.timeline({ scrollTrigger: { trigger: '#safety', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlSafety.to(camera.position, { y: 13, z: isMobile ? 7 : 2, x: 0, ease: 'power2.inOut' }, 0)
              .to(camera.rotation, { x: -Math.PI / 6, ease: 'power2.inOut' }, 0)
              .to(safetyGridRef.current!.scale, { y: 1, ease: 'power2.inOut' }, 0)
              .to(safetyGridMaterialRef.current!, { opacity: 0.6, ease: 'power2.inOut' }, 0)
              .to(screenMaterialRef.current!.color, { r: 1, g: 0, b: 0, ease: 'power2.inOut' }, 0)
              .to(ceilingLightRef.current!, { emissiveIntensity: 0.1, ease: 'power2.inOut' }, 0)

      const tlSafetyOut = gsap.timeline({ scrollTrigger: { trigger: '#safety', start: 'bottom center', end: 'bottom top', scrub: 1.5 } })
      tlSafetyOut.to(safetyGridMaterialRef.current!, { opacity: 0, ease: 'power2.inOut' }, 0)
                 .to(screenMaterialRef.current!.color, { r: 1, g: 1, b: 1, ease: 'power2.inOut' }, 0)
                 .to(ceilingLightRef.current!, { emissiveIntensity: 0.8, ease: 'power2.inOut' }, 0)

      // 7. PRODUCTS -> LOCATIONS
      const tlProducts = gsap.timeline({ scrollTrigger: { trigger: '#products', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlProducts.to(camera.position, { x: isMobile ? 0 : -1, y: 15, z: isMobile ? 6 : 1, ease: 'power2.inOut' }, 0)
                .to(camera.rotation, { x: 0, y: isMobile ? 0 : -Math.PI / 4, ease: 'power2.inOut' }, 0)
                .to((leftWallRef.current!.material as THREE.MeshStandardMaterial).color, { r: 0.4, g: 0.3, b: 0.1, ease: 'power2.inOut' }, 0)
                .to((rightWallRef.current!.material as THREE.MeshStandardMaterial).color, { r: 0.4, g: 0.3, b: 0.1, ease: 'power2.inOut' }, 0)
                .to(ambientLightRef.current!, { intensity: 0.3, ease: 'power2.inOut' }, 0)
                
      if (buttonsGroupRef.current) {
        buttonsGroupRef.current.children.forEach((btn, idx) => {
          tlProducts.to(btn.position, { z: 0.04, ease: 'power2.inOut' }, idx * 0.1)
        })
      }

      // 8. LOCATIONS -> GALLERY
      const tlLocations = gsap.timeline({ scrollTrigger: { trigger: '#locations', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlLocations.to(camera.position, { x: isMobile ? 0 : -6, y: 17, z: isMobile ? 18 : 6, ease: 'power2.inOut' }, 0)
                 .to(camera.rotation, { x: -0.2, y: isMobile ? 0 : -0.8, ease: 'power2.inOut' }, 0)
                 .to(cabinRef.current!.rotation, { y: Math.PI / 4, ease: 'power2.inOut' }, 0)
                 .to(ambientLightRef.current!, { intensity: 0.8, ease: 'power2.inOut' }, 0)

      // 9. GALLERY -> FAQ
      const tlGallery = gsap.timeline({ scrollTrigger: { trigger: '#gallery', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlGallery.to(camera.position, { x: isMobile ? 0 : 4, y: 16, z: isMobile ? 12 : 7, ease: 'power2.inOut' }, 0)
               .to(camera.rotation, { x: -0.1, y: isMobile ? 0 : 0.5, ease: 'power2.inOut' }, 0)
               .to(cabinRef.current!.rotation, { y: -Math.PI / 6, ease: 'power2.inOut' }, 0)
               .to((leftWallRef.current!.material as THREE.MeshStandardMaterial), { transparent: true, opacity: 0.2, metalness: 1, roughness: 0, ease: 'power2.inOut' }, 0)
               .to((rightWallRef.current!.material as THREE.MeshStandardMaterial), { transparent: true, opacity: 0.2, metalness: 1, roughness: 0, ease: 'power2.inOut' }, 0)

      // 10. FAQ -> CONTACT
      const tlFAQ = gsap.timeline({ scrollTrigger: { trigger: '#faq', start: 'top bottom', end: 'top center', scrub: 1.5 } })
      tlFAQ.to(camera.position, { x: isMobile ? 0 : 1, y: 13.2, z: isMobile ? 3 : -0.5, ease: 'power2.inOut' }, 0)
           .to(camera.rotation, { x: 0, y: isMobile ? 0 : 0.5, z: 0, ease: 'power2.inOut' }, 0)
           .to(cabinRef.current!.rotation, { y: 0, ease: 'power2.inOut' }, 0)
           .to((leftWallRef.current!.material as THREE.MeshStandardMaterial), { opacity: 1, metalness: 0.8, roughness: 0.3, ease: 'power2.inOut' }, 0)
           .to((rightWallRef.current!.material as THREE.MeshStandardMaterial), { opacity: 1, metalness: 0.8, roughness: 0.3, ease: 'power2.inOut' }, 0)
           .to(ambientLightRef.current!, { intensity: 0.2, ease: 'power2.inOut' }, 0)

      // 11. CONTACT (End)
      if (leftDoorRef.current && rightDoorRef.current) {
        const tlContact = gsap.timeline({ scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'top center', scrub: 1.5 } })
        tlContact.to(camera.position, { x: 0, y: 15, z: isMobile ? 12 : 8, ease: 'power2.inOut' }, 0)
                 .to(camera.rotation, { y: 0, x: 0, ease: 'power2.inOut' }, 0)
                 .to(leftDoorRef.current.position, { x: -1, ease: 'power3.inOut' }, 0)
                 .to(rightDoorRef.current.position, { x: 1, ease: 'power3.inOut' }, 0)
                 .to(ambientLightRef.current!, { intensity: 0.6, ease: 'power2.inOut' }, 0)
                 .to((leftWallRef.current!.material as THREE.MeshStandardMaterial).color, { r: 0.16, g: 0.16, b: 0.16, ease: 'power2.inOut' }, 0)
                 .to((rightWallRef.current!.material as THREE.MeshStandardMaterial).color, { r: 0.16, g: 0.16, b: 0.16, ease: 'power2.inOut' }, 0)
      }
    })

    return () => mm.revert()
  }, [camera])

  return (
    <group>
      <ambientLight ref={ambientLightRef} intensity={0.6} />

      <group ref={verticalLightsRef} visible={false}>
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[-2.5, (i * 1.5) - 5, -2 + Math.random() * 4]}>
            <boxGeometry args={[0.02, 2, 0.02]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
        {[...Array(10)].map((_, i) => (
          <mesh key={`r${i}`} position={[2.5, (i * 1.5) - 5, -2 + Math.random() * 4]}>
            <boxGeometry args={[0.02, 2, 0.02]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>

      <group ref={cabinRef}>
        <mesh ref={footprintRingRef} position={[0, -2.48, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0, 0, 0]}>
          <ringGeometry args={[2.5, 2.6, 32]} />
          <meshBasicMaterial ref={footprintMaterialRef} color="#00cccc" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>

        <group ref={safetyGridRef} position={[0, 0, 0]} scale={[1, 0, 1]}>
          <mesh position={[0, 0, -1.9]}>
            <planeGeometry args={[3.8, 4.8]} />
            <meshBasicMaterial ref={safetyGridMaterialRef} color="#ff0000" wireframe transparent opacity={0} />
          </mesh>
        </group>

        <mesh ref={backWallRef} position={[0, 0, -2]}>
          <planeGeometry args={[4, 5]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.05} />
        </mesh>

        <mesh ref={leftWallRef} position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4, 5]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh ref={rightWallRef} position={[2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[4, 5]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh ref={floorRef} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
        </mesh>
        
        <mesh ref={ceilingRef} position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial ref={ceilingLightRef} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} metalness={0.1} roughness={0.9} />
        </mesh>

        <group ref={controlPanelRef} position={[-1.9, 0, -1]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 2.5, 0.1]} />
            <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.1} />
          </mesh>
          <group ref={buttonsGroupRef}>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[0, 0.6 - i * 0.25, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.02, 32]} />
                <meshStandardMaterial color="#00cccc" metalness={1} roughness={0.15} />
              </mesh>
            ))}
          </group>
          <mesh ref={screenRef} position={[0, 0.95, 0.06]}>
            <planeGeometry args={[0.5, 0.2]} />
            <meshBasicMaterial ref={screenMaterialRef} color="#000000" />
          </mesh>
        </group>

        <mesh ref={handrailRef} position={[0, -0.5, -1.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 3.8, 32]} />
          <meshStandardMaterial color="#e0e0e0" metalness={1} roughness={0.1} />
        </mesh>

        <Suspense fallback={null}>
          <AntiqueCameraModel />
        </Suspense>

        <group ref={doorsRef} position={[0, 0, 2]}>
          <mesh ref={leftDoorRef} position={[-1, 0, 0]}>
            <boxGeometry args={[2, 5, 0.05]} />
            <meshStandardMaterial color="#181818" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh ref={rightDoorRef} position={[1, 0, 0]}>
            <boxGeometry args={[2, 5, 0.05]} />
            <meshStandardMaterial color="#181818" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

const AntiqueCameraModel = () => {
  const { scene: downloadedModel } = useGLTF('/AntiqueCamera.glb')
  useFrame((state) => {
    if (downloadedModel) {
      downloadedModel.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  return (
    <group position={[1.5, -2, -1.5]} scale={0.3}>
      <mesh position={[0, -0.2, 0]}>
         <cylinderGeometry args={[1, 1.2, 0.4, 32]} />
         <meshStandardMaterial color="#00cccc" metalness={0.8} roughness={0.2} />
      </mesh>
      <primitive object={downloadedModel} position={[0, 0, 0]} />
    </group>
  )
}

// Preload the GLB model at module level so it starts downloading immediately
// when the JS bundle is parsed, not when the component first mounts
useGLTF.preload('/AntiqueCamera.glb')

