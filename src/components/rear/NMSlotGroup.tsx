import { useRef, useEffect, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Empty NM slot — blank ventilated cover plate
// Scale: 1 unit = 10 cm

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
  coverOpen: boolean
}

// Perforated cover using InstancedMesh
const HOLE_COLS = 9
const HOLE_ROWS = 4
const TOTAL_HOLES = HOLE_COLS * HOLE_ROWS
const HOLE_SPACING_X = 0.1
const HOLE_SPACING_Y = 0.075

function PerforationGrid({ offsetZ = 0.04 }: { offsetZ?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = new THREE.Object3D()

  useEffect(() => {
    if (!meshRef.current) return
    let idx = 0
    for (let row = 0; row < HOLE_ROWS; row++) {
      for (let col = 0; col < HOLE_COLS; col++) {
        dummy.position.set(
          -((HOLE_COLS - 1) * HOLE_SPACING_X) / 2 + col * HOLE_SPACING_X,
          -((HOLE_ROWS - 1) * HOLE_SPACING_Y) / 2 + row * HOLE_SPACING_Y,
          offsetZ,
        )
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(idx, dummy.matrix)
        idx++
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [offsetZ])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL_HOLES]} castShadow={false}>
      <cylinderGeometry args={[0.022, 0.022, 0.065, 6]} />
      <meshStandardMaterial color="#111318" metalness={0.6} roughness={0.7} />
    </instancedMesh>
  )
}

// The NM cover group — ref-forwarded so parent can GSAP-animate it
const NMCoverPlate = forwardRef<THREE.Group, {
  selected: boolean
  hovered: boolean
  onClick: () => void
  onHover: (v: boolean) => void
}>(({ selected, hovered, onClick, onHover }, ref) => {
  const glow = selected ? 0.5 : hovered ? 0.28 : 0

  return (
    <group ref={ref}>
      {/* Main cover plate */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onClick() }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true) }}
        onPointerOut={() => onHover(false)}
      >
        <boxGeometry args={[1.35, 0.43, 0.055]} />
        <meshStandardMaterial
          color="#252830"
          metalness={0.78}
          roughness={0.45}
          emissive="#777788"
          emissiveIntensity={glow}
        />
      </mesh>

      {/* Perforation grid */}
      <PerforationGrid />

      {/* Subtle bevel top edge */}
      <mesh position={[0, 0.205, 0.015]}>
        <boxGeometry args={[1.30, 0.012, 0.042]} />
        <meshStandardMaterial color="#1e2128" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Subtle bevel bottom edge */}
      <mesh position={[0, -0.205, 0.015]}>
        <boxGeometry args={[1.30, 0.012, 0.042]} />
        <meshStandardMaterial color="#1e2128" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Thumbscrews ×4 */}
      {[[-0.56, 0.185], [0.56, 0.185], [-0.56, -0.185], [0.56, -0.185]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.032]}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* "NM" label bar (placeholder typography) */}
      <mesh position={[0.5, 0.0, 0.04]}>
        <boxGeometry args={[0.12, 0.025, 0.003]} />
        <meshStandardMaterial color="#555566" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  )
})
NMCoverPlate.displayName = 'NMCoverPlate'

export { NMCoverPlate }

export default function NMSlotGroup({ selectedId, onSelect, coverOpen }: Props) {
  const coverRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // No GSAP here — parent RearPanelScene drives this via the exported ref
  // We expose the ref through the NMCoverPlate forwardRef

  return (
    <group>
      {/* Slot interior (visible when cover removed) */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[1.30, 0.40, 0.04]} />
        <meshStandardMaterial color="#0d0e12" metalness={0.3} roughness={0.9} />
      </mesh>
      {/* NM edge connector (gold strips at back) */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={i} position={[-0.52 + i * 0.044, 0, -0.055]}>
          <boxGeometry args={[0.018, 0.32, 0.008]} />
          <meshStandardMaterial color="#ccaa30" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}
      {/* Guide rails */}
      <mesh position={[0, 0.19, -0.03]}>
        <boxGeometry args={[1.25, 0.012, 0.055]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.19, -0.03]}>
        <boxGeometry args={[1.25, 0.012, 0.055]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Cover plate */}
      <NMCoverPlate
        ref={coverRef}
        selected={selectedId === 'nm-blank'}
        hovered={hovered}
        onClick={() => onSelect('nm-blank')}
        onHover={setHovered}
      />
    </group>
  )
}

// Named re-export so RearPanelScene can import the ref-able cover plate directly
export { NMCoverPlate as NMCoverRef }

// Small React useState import needed in this file
import { useState } from 'react'
