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
      {/* DIMM Slot Walls (Left) */}
      <mesh position={[-0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.6, 1.35]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* DIMM Slot Walls (Right) */}
      <mesh position={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.6, 1.35]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* DIMM PCB - Vertical Orientation */}
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.58, 1.35]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a6a3a' : '#1a4a2a'}
          metalness={0.2}
          roughness={0.7}
          emissive={hovered || isSelected ? '#0a3a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>

      {/* RAM chips on DIMM - Side A */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-a-${i}`} position={[0.045, 0.08, -0.55 + i * 0.16]} castShadow>
          <boxGeometry args={[0.022, 0.24, 0.12]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.65} roughness={0.25} />
        </mesh>
      ))}

      {/* RAM chips on DIMM - Side B */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-b-${i}`} position={[-0.045, 0.08, -0.55 + i * 0.16]} castShadow>
          <boxGeometry args={[0.022, 0.24, 0.12]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.65} roughness={0.25} />
        </mesh>
      ))}

      {/* Gold contacts at bottom - Enhanced */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={`contact-${i}`} position={[0, -0.29, -0.63 + i * 0.044]}>
          <boxGeometry args={[0.065, 0.05, 0.028]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.03} />
        </mesh>
      ))}

      {/* Retention clips - Left */}
      <mesh position={[-0.12, -0.32, -0.68]} castShadow>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#666677" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Retention clips - Right */}
      <mesh position={[0.12, -0.32, -0.68]} castShadow>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#666677" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Retention clips - Left Far */}
      <mesh position={[-0.12, -0.32, 0.68]} castShadow>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#666677" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Retention clips - Right Far */}
      <mesh position={[0.12, -0.32, 0.68]} castShadow>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#666677" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Label sticker - Front */}
      <mesh position={[0.035, 0.15, 0]}>
        <boxGeometry args={[0.003, 0.35, 1.0]} />
        <meshStandardMaterial color="#e0e0d0" metalness={0.05} roughness={0.95} />
      </mesh>
    </group>
  )
}
