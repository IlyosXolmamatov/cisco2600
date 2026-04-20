import { useState } from 'react'

interface RAMProps {
  position: [number, number, number]
  slotIndex: number
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export default function RAM({ position, slotIndex, onSelect, selectedComponent }: RAMProps) {
  const [hovered, setHovered] = useState(false)
  const id = `ram-${slotIndex}`
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* DIMM PCB */}
      <mesh castShadow>
        <boxGeometry args={[0.05, 0.55, 1.35]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a6a3a' : '#1a4a2a'}
          metalness={0.2}
          roughness={0.7}
          emissive={hovered || isSelected ? '#0a3a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>

      {/* RAM chips on DIMM */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-a-${i}`} position={[0.04, 0.05, -0.55 + i * 0.16]} castShadow>
          <boxGeometry args={[0.02, 0.2, 0.12]} />
          <meshStandardMaterial color="#111122" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-b-${i}`} position={[-0.04, 0.05, -0.55 + i * 0.16]} castShadow>
          <boxGeometry args={[0.02, 0.2, 0.12]} />
          <meshStandardMaterial color="#111122" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Gold contacts at bottom */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={`contact-${i}`} position={[0, -0.27, -0.63 + i * 0.044]}>
          <boxGeometry args={[0.06, 0.04, 0.025]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}

      {/* Retention clips */}
      <mesh position={[0, -0.3, -0.65]}>
        <boxGeometry args={[0.08, 0.06, 0.04]} />
        <meshStandardMaterial color="#555566" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.3, 0.65]}>
        <boxGeometry args={[0.08, 0.06, 0.04]} />
        <meshStandardMaterial color="#555566" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Label sticker */}
      <mesh position={[0.031, 0.1, 0]}>
        <boxGeometry args={[0.002, 0.28, 1.0]} />
        <meshStandardMaterial color="#ddddcc" metalness={0} roughness={0.9} />
      </mesh>
    </group>
  )
}
