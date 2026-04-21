import { useRef, useEffect } from 'react'
import { ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import Chassis from './Chassis'
import Motherboard from './Motherboard'
import RAM from './RAM'
import { WICCard, NMModule, PSU, Fan, HDDBay, IORiser } from './Modules'

interface RouterSceneProps {
  isCoverOpen: boolean
  isExploded: boolean
  selectedComponent: string | null
  onSelect: (id: string) => void
}

/*
  Cisco 2600XM Internal Topology (1 unit = 10 cm)
  Top-down view — X: left(-) → right(+), Z: back(-) → front(+)

  ┌─────────────────────────────────────────────────────────┐
  │  [PSU]    [Fan]     [WIC0][WIC1]  [IORiser]    [HDD Bay]│
  │  Rear-L                    [RAM0][RAM1]    [NM Module]   │
  │                [Motherboard / CPU / Flash]              │
  └─────────────────────────────────────────────────────────┘
  
  Actual Mapping (from reference image):
  - LEFT SECTION: PSU (rear-left), Fan (front-left)
  - CENTER: Motherboard, CPU, RAM DIMMs, Boot ROM, Flash SIMM
  - CENTER-REAR: NM Module slots
  - RIGHT SECTION: Hard Drive Bay, I/O Riser
*/

const REST = {
  mb:   { x:  0.00, y: -0.10, z:  0.00 },
  ram0: { x:  0.60, y:  0.04, z:  0.52 },
  ram1: { x:  0.60, y:  0.04, z: -0.28 },
  wic0: { x: -1.25, y:  0.00, z:  0.80 },
  wic1: { x: -1.25, y:  0.00, z:  0.10 },
  nm:   { x:  0.30, y:  0.01, z: -0.78 },
  psu:  { x: -1.55, y:  0.02, z: -0.88 }, // Rear-LEFT (was right)
  fan:  { x: -1.50, y: -0.05, z:  0.20 }, // Front-LEFT (was right)
  hdd:  { x:  1.60, y:  0.00, z:  0.60 },
  ior:  { x:  0.30, y:  0.04, z:  0.95 },
}

const EXPLODED = {
  mb:   { x:  0.00, y: -0.85, z:  0.00 },
  ram0: { x:  0.60, y:  1.80, z:  2.00 },
  ram1: { x:  0.60, y:  1.80, z: -2.00 },
  wic0: { x: -1.25, y:  0.50, z:  3.20 },
  wic1: { x: -1.25, y:  0.50, z:  2.40 },
  nm:   { x:  0.30, y:  0.50, z: -3.30 },
  psu:  { x: -1.55, y:  1.80, z: -0.88 }, // Explode upward
  fan:  { x: -2.40, y:  0.55, z:  0.20 }, // Explode left-forward
  hdd:  { x:  1.60, y:  0.60, z:  2.30 },
  ior:  { x:  0.30, y:  1.40, z:  1.60 }, // Right side, explode forward-up
}

type ComponentKey = keyof typeof REST

export default function RouterScene({ isCoverOpen, isExploded, selectedComponent, onSelect }: RouterSceneProps) {
  const mbRef   = useRef<THREE.Group>(null)
  const ram0Ref = useRef<THREE.Group>(null)
  const ram1Ref = useRef<THREE.Group>(null)
  const wic0Ref = useRef<THREE.Group>(null)
  const wic1Ref = useRef<THREE.Group>(null)
  const nmRef   = useRef<THREE.Group>(null)
  const psuRef  = useRef<THREE.Group>(null)
  const fanRef  = useRef<THREE.Group>(null)
  const hddRef  = useRef<THREE.Group>(null)
  const iorRef  = useRef<THREE.Group>(null)

  useEffect(() => {
    const targets: { ref: React.RefObject<THREE.Group | null>; key: ComponentKey }[] = [
      { ref: mbRef,   key: 'mb'   },
      { ref: psuRef,  key: 'psu'  },
      { ref: fanRef,  key: 'fan'  },
      { ref: nmRef,   key: 'nm'   },
      { ref: wic0Ref, key: 'wic0' },
      { ref: wic1Ref, key: 'wic1' },
      { ref: ram0Ref, key: 'ram0' },
      { ref: ram1Ref, key: 'ram1' },
      { ref: hddRef,  key: 'hdd'  },
      { ref: iorRef,  key: 'ior'  },
    ]

    const tl = gsap.timeline()
    targets.forEach(({ ref, key }, i) => {
      if (!ref.current) return
      const dest = isExploded ? EXPLODED[key] : REST[key]
      tl.to(ref.current.position, {
        x: dest.x,
        y: dest.y,
        z: dest.z,
        duration: 0.75,
        ease: 'power2.inOut',
      }, i * 0.07)
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

      <group ref={hddRef} position={[REST.hdd.x, REST.hdd.y, REST.hdd.z]}>
        <HDDBay position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <group ref={iorRef} position={[REST.ior.x, REST.ior.y, REST.ior.z]}>
        <IORiser position={[0, 0, 0]} onSelect={onSelect} selectedComponent={selectedComponent} />
      </group>

      <ContactShadows position={[0, -0.22, 0]} opacity={0.55} scale={9} blur={2.5} far={1.2} />
    </group>
  )
}
