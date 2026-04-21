import { useState } from 'react'

interface RAMProps {
  position: [number, number, number]
  slotIndex: number
  onSelect: (id: string) => void
  selectedComponent: string | null
}

/* Cisco 2600 proprietary DRAM DIMM
   Fits within chassis H=0.43 units (4.3cm)
   PCB height: 0.22 units (2.2cm) — verified to clear chassis roof
*/
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
      {/* DIMM Slot housing — left wall */}
      <mesh position={[-0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.022, 0.26, 1.1]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* DIMM Slot housing — right wall */}
      <mesh position={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.022, 0.26, 1.1]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* DIMM PCB — dark green board */}
      <mesh castShadow>
        <boxGeometry args={[0.055, 0.22, 1.1]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a6a3a' : '#1a4a2a'}
          metalness={0.2}
          roughness={0.7}
          emissive={hovered || isSelected ? '#0a3a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.45 : isSelected ? 0.75 : 0}
        />
      </mesh>

      {/* Copper traces on PCB face (visible stripes) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[0.029, -0.02 + i * 0.04, 0]}>
          <boxGeometry args={[0.002, 0.008, 0.95]} />
          <meshStandardMaterial color="#c8a830" metalness={0.95} roughness={0.08} />
        </mesh>
      ))}

      {/* RAM chips — Side A (8 chips) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-a-${i}`} position={[0.040, 0.04, -0.44 + i * 0.126]} castShadow>
          <boxGeometry args={[0.018, 0.09, 0.096]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.65} roughness={0.25} />
        </mesh>
      ))}

      {/* RAM chips — Side B (8 chips) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-b-${i}`} position={[-0.040, 0.04, -0.44 + i * 0.126]} castShadow>
          <boxGeometry args={[0.018, 0.09, 0.096]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.65} roughness={0.25} />
        </mesh>
      ))}

      {/* SPD EEPROM chip (small, one side) */}
      <mesh position={[0.040, 0.04, -0.50]}>
        <boxGeometry args={[0.018, 0.06, 0.05]} />
        <meshStandardMaterial color="#222233" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Gold finger contacts (bottom edge — 34 contacts) */}
      {Array.from({ length: 34 }).map((_, i) => (
        <mesh key={`contact-${i}`} position={[0, -0.105, -0.50 + i * 0.030]}>
          <boxGeometry args={[0.060, 0.016, 0.020]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.03} />
        </mesh>
      ))}

      {/* Label sticker */}
      <mesh position={[0.030, 0.06, 0]}>
        <boxGeometry args={[0.003, 0.10, 0.85]} />
        <meshStandardMaterial color="#e8e8d8" metalness={0.05} roughness={0.95} />
      </mesh>
      {/* Label text stripe */}
      <mesh position={[0.031, 0.06, 0]}>
        <boxGeometry args={[0.001, 0.03, 0.55]} />
        <meshStandardMaterial color="#333344" metalness={0} roughness={1} />
      </mesh>

      {/* Retention clip — front */}
      <mesh position={[0, -0.125, -0.56]} castShadow>
        <boxGeometry args={[0.16, 0.065, 0.04]} />
        <meshStandardMaterial color="#555566" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Retention clip — back */}
      <mesh position={[0, -0.125, 0.56]} castShadow>
        <boxGeometry args={[0.16, 0.065, 0.04]} />
        <meshStandardMaterial color="#555566" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}
