import { useState } from 'react'

/* ── WIC Card ── */
interface WICProps {
  position: [number, number, number]
  slotIndex: number
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function WICCard({ position, slotIndex, onSelect, selectedComponent }: WICProps) {
  const [hovered, setHovered] = useState(false)
  const id = `wic-${slotIndex}`
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* Card body */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.05, 0.7]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a5a3a' : '#1a3a2a'}
          metalness={0.3} roughness={0.6}
          emissive={hovered || isSelected ? '#0a2a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      {/* Front bracket */}
      <mesh position={[0, 0.04, 0.38]}>
        <boxGeometry args={[0.9, 0.12, 0.02]} />
        <meshStandardMaterial color="#555566" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* RJ-45 port cutout */}
      <mesh position={[0.1, 0.07, 0.39]}>
        <boxGeometry args={[0.18, 0.1, 0.02]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Serial port */}
      <mesh position={[-0.2, 0.07, 0.39]}>
        <boxGeometry args={[0.15, 0.08, 0.02]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* LEDs */}
      <mesh position={[0.35, 0.07, 0.39]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.28, 0.07, 0.39]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={1.2} />
      </mesh>
      {/* IC chips on card */}
      {[[0.15, 0.04, -0.1], [-0.2, 0.04, 0.05], [0.3, 0.04, 0.1]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.15, 0.03, 0.12]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

/* ── NM Slot Module ── */
interface NMProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function NMModule({ position, onSelect, selectedComponent }: NMProps) {
  const [hovered, setHovered] = useState(false)
  const id = 'nm-module'
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.06, 1.1]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#3a4a6a' : '#1a2a4a'}
          metalness={0.3} roughness={0.6}
          emissive={hovered || isSelected ? '#0a0a3a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      {/* Front bracket */}
      <mesh position={[0, 0.05, 0.57]}>
        <boxGeometry args={[1.4, 0.14, 0.02]} />
        <meshStandardMaterial color="#444455" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Ports row */}
      {[-0.4, -0.1, 0.2, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.06, 0.58]}>
          <boxGeometry args={[0.2, 0.1, 0.02]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
      {/* LEDs */}
      {[-0.55, -0.25, 0.05, 0.35, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.58]}>
          <boxGeometry args={[0.04, 0.04, 0.01]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00ff44' : '#ffaa00'}
            emissive={i % 2 === 0 ? '#00ff44' : '#ffaa00'}
            emissiveIntensity={1.3}
          />
        </mesh>
      ))}
      {/* Main IC */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#111122" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* ── PSU ── */
interface PSUProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function PSU({ position, onSelect, selectedComponent }: PSUProps) {
  const [hovered, setHovered] = useState(false)
  const id = 'psu'
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* PSU body */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.3, 0.75]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#555566' : '#333344'}
          metalness={0.75} roughness={0.25}
          emissive={hovered || isSelected ? '#111122' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      {/* Vent slots */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, -0.05 + i * 0.05, 0.38]}>
          <boxGeometry args={[0.7, 0.02, 0.005]} />
          <meshStandardMaterial color="#222233" />
        </mesh>
      ))}
      {/* IEC connector */}
      <mesh position={[0, 0, -0.38]}>
        <boxGeometry args={[0.25, 0.18, 0.01]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.35, 0.1, 0.38]}>
        <cylinderGeometry args={[0.025, 0.025, 0.01, 8]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}
