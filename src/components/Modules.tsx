import { useState } from 'react'

/* ── Fan Component ── */
interface FanProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function Fan({ position, onSelect, selectedComponent }: FanProps) {
  const [hovered, setHovered] = useState(false)
  const id = 'fan'
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* Fan shroud body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#1a1a1a' : '#0a0a0a'}
          metalness={0.4}
          roughness={0.7}
          emissive={hovered || isSelected ? '#111111' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
        />
      </mesh>
      {/* Fan blades */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`blade-${i}`} position={[0, 0.04, 0]} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.28]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#1a1a2a' : '#0a0a1a'}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      ))}
      {/* Fan center hub */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Fan label */}
      <mesh position={[0, 0.041, 0.35]}>
        <boxGeometry args={[0.5, 0.04, 0.01]} />
        <meshStandardMaterial color="#ddddcc" metalness={0} roughness={0.9} />
      </mesh>
    </group>
  )
}

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
      {/* PSU body - Enhanced metallic */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.3, 0.75]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#666677' : '#444455'}
          metalness={0.85}
          roughness={0.15}
          emissive={hovered || isSelected ? '#222233' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      
      {/* PSU label panel */}
      <mesh position={[0, 0.155, 0.38]}>
        <boxGeometry args={[0.8, 0.18, 0.01]} />
        <meshStandardMaterial color="#ddddcc" metalness={0} roughness={0.8} />
      </mesh>
      
      {/* PSU branding text simulation */}
      <mesh position={[0, 0.16, 0.382]}>
        <boxGeometry args={[0.3, 0.04, 0.002]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Vent slots - more realistic */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`vent-${i}`} position={[0, -0.08 + i * 0.035, 0.38]}>
          <boxGeometry args={[0.75, 0.015, 0.005]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      
      {/* IEC connector - Enhanced */}
      <mesh position={[0, 0, -0.38]}>
        <boxGeometry args={[0.25, 0.18, 0.01]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.381]}>
        <boxGeometry args={[0.26, 0.19, 0.005]} />
        <meshStandardMaterial color="#884400" metalness={0.4} roughness={0.6} />
      </mesh>
      
      {/* Power LED */}
      <mesh position={[0.35, 0.11, 0.38]}>
        <cylinderGeometry args={[0.03, 0.03, 0.015, 8]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2} />
      </mesh>
      
      {/* Internal fan visualization */}
      <mesh position={[0, -0.05, 0.1]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Capacitors on PSU circuit board */}
      {[[-0.2, -0.05, -0.1], [0.2, -0.05, -0.1], [0, -0.05, 0.2]].map(([x, y, z], i) => (
        <mesh key={`psu-cap-${i}`} position={[x, y, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#0066cc' : '#cc6600'} metalness={0.2} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}
