import { useRef, useEffect } from 'react'
import { ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import Chassis from './Chassis'
import Motherboard from './Motherboard'
import RAM from './RAM'
import { WICCard, NMModule, PSU, Fan } from './Modules'

interface RouterSceneProps {
  isCoverOpen: boolean
  isExploded: boolean
  selectedComponent: string | null
  onSelect: (id: string) => void
}

// Resting world-positions for every sub-group
const REST = {
  mb:   { x: 0,    y: -0.10, z: 0 },
  ram0: { x: 0.9,  y: -0.012, z: 0.55 },
  ram1: { x: 1.25, y: -0.012, z: -0.55 },
  wic0: { x: -1.2, y:  0.00, z: 0.78 },
  wic1: { x: -1.2, y:  0.00, z: -0.05 },
  nm:   { x: 0.3,  y:  0.01, z: -0.80 },
  psu:  { x: 1.6,  y:  0.02, z: -0.90 },
  fan:  { x: -1.5, y: -0.05, z:  0.15 },
}

// Exploded offsets from rest - Enhanced for professional sequence
const EXPLODED = {
  mb:   { x: 0,    y: -0.85, z: 0 },     // Down (motherboard drops)
  ram0: { x: 0.9,  y:  1.65, z: 1.65 }, // Up & Out (spec: Y+8) - adjusted for new base
  ram1: { x: 1.25, y:  1.65, z: -1.65 }, // Up & Out (spec: Y+8) - adjusted for new base
  wic0: { x: -1.2, y:  0.45, z: 3.10 }, // Out (spec: Z+10)
  wic1: { x: -1.2, y:  0.45, z: 2.30 }, // Out (spec: Z+10)
  nm:   { x: 0.3,  y:  0.45, z: -3.10 }, // Out backward
  psu:  { x: 1.6,  y:  1.55, z: -0.90 }, // Up significantly (spec: Y+10)
  fan:  { x: -2.1, y:  0.50, z:  0.15 }, // Out Left (spec: X-5)
}

export default function RouterScene({ isCoverOpen, isExploded, selectedComponent, onSelect }: RouterSceneProps) {
  const mbRef   = useRef<THREE.Group>(null)
  const ram0Ref = useRef<THREE.Group>(null)
  const ram1Ref = useRef<THREE.Group>(null)
  const wic0Ref = useRef<THREE.Group>(null)
  const wic1Ref = useRef<THREE.Group>(null)
  const nmRef   = useRef<THREE.Group>(null)
  const psuRef  = useRef<THREE.Group>(null)
  const fanRef  = useRef<THREE.Group>(null)

  useEffect(() => {
    const targets = [
      { ref: mbRef,   key: 'mb' },
      { ref: fanRef,  key: 'fan' },    // Fan first (leftmost)
      { ref: ram0Ref, key: 'ram0' },
      { ref: ram1Ref, key: 'ram1' },
      { ref: wic0Ref, key: 'wic0' },
      { ref: wic1Ref, key: 'wic1' },
      { ref: nmRef,   key: 'nm' },
      { ref: psuRef,  key: 'psu' },
    ] as const

    const tl = gsap.timeline()
    targets.forEach(({ ref, key }, i) => {
      if (!ref.current) return
      const dest = isExploded ? EXPLODED[key] : REST[key]
      tl.to(ref.current.position, {
        x: dest.x,
        y: dest.y,
        z: dest.z,
        duration: 0.7,
        ease: 'power2.inOut',
      }, i * 0.065)  // Enhanced stagger timing
    })

    return () => { tl.kill() }
  }, [isExploded])

  return (
    <group>
      <Chassis isCoverOpen={isCoverOpen} onSelect={onSelect} selectedComponent={selectedComponent} />

      <group ref={mbRef} position={[REST.mb.x, REST.mb.y, REST.mb.z]}>
        <Motherboard position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={ram0Ref} position={[REST.ram0.x, REST.ram0.y, REST.ram0.z]}>
        <RAM position={[0, 0, 0]} slotIndex={0} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={ram1Ref} position={[REST.ram1.x, REST.ram1.y, REST.ram1.z]}>
        <RAM position={[0, 0, 0]} slotIndex={1} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={wic0Ref} position={[REST.wic0.x, REST.wic0.y, REST.wic0.z]}>
        <WICCard position={[0, 0, 0]} slotIndex={0} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={wic1Ref} position={[REST.wic1.x, REST.wic1.y, REST.wic1.z]}>
        <WICCard position={[0, 0, 0]} slotIndex={1} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={nmRef} position={[REST.nm.x, REST.nm.y, REST.nm.z]}>
        <NMModule position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={psuRef} position={[REST.psu.x, REST.psu.y, REST.psu.z]}>
        <PSU position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={fanRef} position={[REST.fan.x, REST.fan.y, REST.fan.z]}>
        <Fan position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <ContactShadows position={[0, -0.22, 0]} opacity={0.55} scale={9} blur={2.5} far={1.2} />
    </group>
  )
}
