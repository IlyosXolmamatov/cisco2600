import { useState } from 'react'

interface MotherboardProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}


function PCBChip({
  position,
  size,
  color,
  id,
  onSelect,
  isSelected,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  id: string
  onSelect: (id: string) => void
  isSelected: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <mesh
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
      castShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={hovered || isSelected ? '#334455' : '#000000'}
        emissiveIntensity={hovered ? 0.5 : isSelected ? 0.8 : 0}
      />
    </mesh>
  )
}

export default function Motherboard({ position, onSelect, selectedComponent }: MotherboardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      {/* PCB Board */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('pcb') }}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[4.0, 0.04, 2.6]} />
        <meshStandardMaterial
          color={hovered || selectedComponent === 'pcb' ? '#2a6a3a' : '#1a4a2a'}
          metalness={0.2}
          roughness={0.7}
          emissive={hovered || selectedComponent === 'pcb' ? '#0a2a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : selectedComponent === 'pcb' ? 0.5 : 0}
        />
      </mesh>

      {/* PCB trace lines (decorative) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`htrace-${i}`} position={[-1.8 + i * 0.32, 0.025, 0]}>
          <boxGeometry args={[0.01, 0.002, 2.4]} />
          <meshStandardMaterial color="#c8a830" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`vtrace-${i}`} position={[0, 0.025, -1.1 + i * 0.32]}>
          <boxGeometry args={[3.8, 0.002, 0.01]} />
          <meshStandardMaterial color="#c8a830" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* CPU chip */}
      <PCBChip
        position={[-0.6, 0.065, 0.3]}
        size={[0.45, 0.05, 0.45]}
        color="#1a1a2a"
        id="cpu"
        onSelect={onSelect}
        isSelected={selectedComponent === 'cpu'}
      />
      {/* CPU heat spreader */}
      <mesh position={[-0.6, 0.09, 0.3]}>
        <boxGeometry args={[0.42, 0.02, 0.42]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Boot ROM */}
      <PCBChip
        position={[0.5, 0.06, -0.8]}
        size={[0.3, 0.04, 0.15]}
        color="#2a1a0a"
        id="boot-rom"
        onSelect={onSelect}
        isSelected={selectedComponent === 'boot-rom'}
      />

      {/* Small capacitors (decorative) */}
      {[
        [-1.2, 0, 0.5], [-1.0, 0, 0.5], [-0.8, 0, 0.5],
        [0.2, 0, 0.8], [0.4, 0, 0.8], [0.6, 0, 0.8],
        [1.2, 0, -0.3], [1.4, 0, -0.3],
      ].map(([x, , z], i) => (
        <mesh key={`cap-${i}`} position={[x, 0.07, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#4466aa' : '#cc4444'} metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {/* Small ICs */}
      {[
        [0.8, 0, 0.4], [1.0, 0, 0.4], [1.5, 0, 0.6],
        [-1.4, 0, -0.6], [-1.0, 0, -0.9],
      ].map(([x, , z], i) => (
        <mesh key={`ic-${i}`} position={[x, 0.055, z]}>
          <boxGeometry args={[0.14, 0.03, 0.09]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Connectors row at back */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`conn-${i}`} position={[-1.2 + i * 0.48, 0.07, -1.22]}>
          <boxGeometry args={[0.3, 0.06, 0.07]} />
          <meshStandardMaterial color="#333355" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
