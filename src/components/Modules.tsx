import { useState } from 'react'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════
   Fan — 60mm square blower assembly (Cisco 2600)
   ═══════════════════════════════════════════════════════ */
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
      {/* Square outer frame */}
      <mesh castShadow>
        <boxGeometry args={[0.65, 0.65, 0.10]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#1e1e1e' : '#111111'}
          metalness={0.4}
          roughness={0.7}
          emissive={hovered || isSelected ? '#111111' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
        />
      </mesh>
      {/* Inner cylindrical cut (decorative ring) */}
      <mesh position={[0, 0, 0.05]}>
        <torusGeometry args={[0.27, 0.02, 8, 32]} />
        <meshStandardMaterial color="#333344" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Fan blades — 7 blades */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 7
        return (
          <mesh key={`blade-${i}`} position={[Math.sin(angle) * 0.14, Math.cos(angle) * 0.14, 0.04]} rotation={[0, 0, angle + 0.4]}>
            <boxGeometry args={[0.06, 0.22, 0.008]} />
            <meshStandardMaterial
              color={hovered || isSelected ? '#1a1a2a' : '#0d0d1a'}
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
        )
      })}
      {/* Center hub */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.055, 0.055, 0.04, 16]} />
        <meshStandardMaterial color="#444455" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Corner mounting bosses */}
      {[[-0.27, -0.27], [0.27, -0.27], [-0.27, 0.27], [0.27, 0.27]].map(([x, y], i) => (
        <mesh key={`boss-${i}`} position={[x, y, 0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   WICCard — WAN Interface Card
   ═══════════════════════════════════════════════════════ */
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
      {/* Card PCB body */}
      <mesh castShadow>
        <boxGeometry args={[0.92, 0.05, 0.72]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a5a3a' : '#1a3a2a'}
          metalness={0.3} roughness={0.6}
          emissive={hovered || isSelected ? '#0a2a0a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      {/* PCB traces */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[0, 0.028, -0.28 + i * 0.11]}>
          <boxGeometry args={[0.85, 0.003, 0.006]} />
          <meshStandardMaterial color="#c8a830" metalness={0.95} roughness={0.08} />
        </mesh>
      ))}
      {/* Front bracket — brushed aluminum */}
      <mesh position={[0, 0.042, 0.38]}>
        <boxGeometry args={[0.92, 0.125, 0.022]} />
        <meshStandardMaterial color="#6a6a7a" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* RJ-45 port */}
      <mesh position={[0.12, 0.07, 0.392]}>
        <boxGeometry args={[0.19, 0.105, 0.022]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* RJ-45 port inner */}
      <mesh position={[0.12, 0.07, 0.394]}>
        <boxGeometry args={[0.17, 0.085, 0.004]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Serial port (DB-9 style) */}
      <mesh position={[-0.22, 0.07, 0.392]}>
        <boxGeometry args={[0.16, 0.085, 0.022]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* LEDs */}
      <mesh position={[0.38, 0.075, 0.392]}>
        <boxGeometry args={[0.038, 0.038, 0.010]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.30, 0.075, 0.392]}>
        <boxGeometry args={[0.038, 0.038, 0.010]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={1.4} />
      </mesh>
      {/* IC chips on card */}
      {([[0.18, 0.04, -0.08], [-0.18, 0.04, 0.05], [0.32, 0.04, 0.10]] as [number,number,number][]).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.16, 0.032, 0.13]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Edge connector (bottom) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`pin-${i}`} position={[0, -0.025, -0.32 + i * 0.033]}>
          <boxGeometry args={[0.085, 0.012, 0.020]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.03} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   NMModule — Network Module (NM-1FE-TX style)
   ═══════════════════════════════════════════════════════ */
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
      {/* Main PCB */}
      <mesh castShadow>
        <boxGeometry args={[1.42, 0.06, 1.12]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#3a4a6a' : '#1a2a4a'}
          metalness={0.3} roughness={0.6}
          emissive={hovered || isSelected ? '#0a0a3a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
        />
      </mesh>
      {/* PCB traces */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[0, 0.031, -0.45 + i * 0.13]}>
          <boxGeometry args={[1.35, 0.003, 0.006]} />
          <meshStandardMaterial color="#c8a830" metalness={0.95} roughness={0.08} />
        </mesh>
      ))}
      {/* Front bracket — brushed metal */}
      <mesh position={[0, 0.055, 0.576]}>
        <boxGeometry args={[1.42, 0.14, 0.024]} />
        <meshStandardMaterial color="#5a5a6a" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Ports row — 4 RJ-45 */}
      {[-0.42, -0.14, 0.14, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0.062, 0.590]}>
          <boxGeometry args={[0.19, 0.105, 0.024]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
      {/* LEDs above ports */}
      {[-0.55, -0.27, 0.01, 0.29, 0.57].map((x, i) => (
        <mesh key={i} position={[x, 0.108, 0.590]}>
          <boxGeometry args={[0.038, 0.038, 0.012]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00ff44' : '#ffaa00'}
            emissive={i % 2 === 0 ? '#00ff44' : '#ffaa00'}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
      {/* Main ASIC chip */}
      <mesh position={[0, 0.065, 0]}>
        <boxGeometry args={[0.52, 0.055, 0.52]} />
        <meshStandardMaterial color="#111122" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* ════ HEATSINK WITH FIN EXTRUSIONS ════ */}
      {/* Heatsink base — matte black aluminum */}
      <mesh position={[0, 0.105, 0]} castShadow>
        <boxGeometry args={[0.50, 0.035, 0.50]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.18} />
      </mesh>
      
      {/* Vertical fins — aluminum extrusion pattern */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`fin-${i}`} position={[-0.22 + i * 0.04, 0.125, 0]} castShadow>
          <boxGeometry args={[0.008, 0.045, 0.48]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.82} 
            roughness={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Cross-fins for enhanced cooling efficiency */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`cross-fin-${i}`} position={[0, 0.122, -0.20 + i * 0.055]} castShadow>
          <boxGeometry args={[0.48, 0.008, 0.008]} />
          <meshStandardMaterial 
            color="#252525" 
            metalness={0.80} 
            roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Heatsink thermal interface indicator */}
      <mesh position={[0, 0.0895, 0]}>
        <boxGeometry args={[0.48, 0.002, 0.48]} />
        <meshStandardMaterial color="#3a3a4a" metalness={0.3} roughness={0.9} />
      </mesh>
      {/* Secondary ICs */}
      {([[-0.45, 0.065, 0.3], [0.45, 0.065, 0.3], [-0.45, 0.065, -0.3], [0.45, 0.065, -0.3]] as [number,number,number][]).map(([x,y,z],i) => (
        <mesh key={`ic-${i}`} position={[x, y, z]}>
          <boxGeometry args={[0.18, 0.032, 0.14]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Edge connector pins */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={`pin-${i}`} position={[0, -0.030, -0.52 + i * 0.037]}>
          <boxGeometry args={[1.35, 0.012, 0.020]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.03} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   PSU — Internal Power Supply Unit
   ═══════════════════════════════════════════════════════ */
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
      {/* Main PSU housing — steel case */}
      <mesh castShadow>
        <boxGeometry args={[0.92, 0.32, 0.78]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#6a6a7a' : '#484858'}
          metalness={0.88}
          roughness={0.14}
          emissive={hovered || isSelected ? '#222233' : '#000000'}
          emissiveIntensity={hovered ? 0.35 : isSelected ? 0.65 : 0}
        />
      </mesh>
      {/* Top vents — stamped louvers */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`vent-top-${i}`} position={[-0.30 + i * 0.065, 0.162, 0.1]}>
          <boxGeometry args={[0.042, 0.006, 0.55]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
      {/* Front panel — label area */}
      <mesh position={[0, 0.08, 0.392]}>
        <boxGeometry args={[0.82, 0.20, 0.012]} />
        <meshStandardMaterial color="#d8d8cc" metalness={0.05} roughness={0.88} />
      </mesh>
      {/* Cisco PSU label text */}
      <mesh position={[0, 0.10, 0.395]}>
        <boxGeometry args={[0.32, 0.040, 0.003]} />
        <meshStandardMaterial color="#333344" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[0, 0.065, 0.395]}>
        <boxGeometry args={[0.50, 0.025, 0.003]} />
        <meshStandardMaterial color="#555566" metalness={0} roughness={1} />
      </mesh>
      {/* Vent slots — front bottom */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`vent-f-${i}`} position={[0, -0.075 + i * 0.030, 0.393]}>
          <boxGeometry args={[0.78, 0.014, 0.006]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      {/* IEC C14 inlet rear */}
      <mesh position={[0, 0, -0.392]}>
        <boxGeometry args={[0.26, 0.20, 0.012]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.394]}>
        <boxGeometry args={[0.27, 0.21, 0.006]} />
        <meshStandardMaterial color="#7a3300" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Power LED indicator */}
      <mesh position={[0.38, 0.13, 0.394]}>
        <cylinderGeometry args={[0.028, 0.028, 0.014, 12]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2.2} />
      </mesh>
      <pointLight position={[0.38, 0.13, 0.42]} intensity={0.5} color="#00ff44" distance={0.8} decay={2} />
      {/* Internal transformer visible through vents (silhouette) */}
      <mesh position={[-0.20, -0.04, -0.10]}>
        <boxGeometry args={[0.30, 0.22, 0.35]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Capacitors */}
      {([[-0.10, 0.02, 0.15], [0.15, 0.02, 0.15], [0.35, 0.02, 0.05]] as [number,number,number][]).map(([x,y,z],i) => (
        <mesh key={`cap-${i}`} position={[x, y, z]}>
          <cylinderGeometry args={[0.038, 0.038, 0.065, 10]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#0055bb' : '#bb5500'} metalness={0.2} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   HDDBay — Optional 3.5" IDE Hard Drive Bay
   ═══════════════════════════════════════════════════════ */
interface HDDBayProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function HDDBay({ position, onSelect, selectedComponent }: HDDBayProps) {
  const [hovered, setHovered] = useState(false)
  const id = 'hdd-bay'
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* Bay housing frame */}
      <mesh castShadow>
        <boxGeometry args={[0.88, 0.27, 0.68]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#5a5a6a' : '#404050'}
          metalness={0.82}
          roughness={0.22}
          emissive={hovered || isSelected ? '#1a1a2a' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
        />
      </mesh>
      {/* HDD disk body inside bay */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.78, 0.19, 0.60]} />
        <meshStandardMaterial color="#1a1a28" metalness={0.92} roughness={0.08} />
      </mesh>
      {/* HDD platter window (label) */}
      <mesh position={[0, 0.100, 0]}>
        <boxGeometry args={[0.55, 0.003, 0.42]} />
        <meshStandardMaterial color="#ddddcc" metalness={0.05} roughness={0.9} />
      </mesh>
      {/* IDE connector at rear */}
      <mesh position={[0, 0, -0.344]}>
        <boxGeometry args={[0.42, 0.08, 0.015]} />
        <meshStandardMaterial color="#333344" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Power connector at rear */}
      <mesh position={[0.32, 0, -0.344]}>
        <boxGeometry args={[0.14, 0.075, 0.015]} />
        <meshStandardMaterial color="#ddddcc" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Mounting rails — left */}
      <mesh position={[-0.45, 0, 0]} castShadow>
        <boxGeometry args={[0.018, 0.21, 0.58]} />
        <meshStandardMaterial color="#666677" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Mounting rails — right */}
      <mesh position={[0.45, 0, 0]} castShadow>
        <boxGeometry args={[0.018, 0.21, 0.58]} />
        <meshStandardMaterial color="#666677" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Spindle motor indicator (circle) */}
      <mesh position={[0.25, 0.100, 0.12]}>
        <cylinderGeometry args={[0.055, 0.055, 0.005, 16]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   IORiser — I/O Riser / Daughterboard
   ═══════════════════════════════════════════════════════ */
interface IORiserProps {
  position: [number, number, number]
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export function IORiser({ position, onSelect, selectedComponent }: IORiserProps) {
  const [hovered, setHovered] = useState(false)
  const id = 'io-riser'
  const isSelected = selectedComponent === id

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* Riser PCB */}
      <mesh castShadow>
        <boxGeometry args={[0.82, 0.04, 0.52]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#2a3a5a' : '#1a2a4a'}
          metalness={0.2} roughness={0.75}
          emissive={hovered || isSelected ? '#0a0a2a' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : isSelected ? 0.6 : 0}
        />
      </mesh>
      {/* PCB traces */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[0, 0.022, -0.20 + i * 0.10]}>
          <boxGeometry args={[0.75, 0.003, 0.006]} />
          <meshStandardMaterial color="#c8a830" metalness={0.95} roughness={0.08} />
        </mesh>
      ))}
      {/* Main connector strip (bottom — plugs into motherboard) */}
      <mesh position={[0, -0.028, 0]}>
        <boxGeometry args={[0.72, 0.06, 0.042]} />
        <meshStandardMaterial color="#222233" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Connector pins */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={`pin-${i}`} position={[-0.33 + i * 0.028, -0.038, 0]}>
          <boxGeometry args={[0.018, 0.020, 0.036]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.03} />
        </mesh>
      ))}
      {/* Top connector (connects to front panel I/O) */}
      <mesh position={[0, 0.038, -0.24]}>
        <boxGeometry args={[0.68, 0.055, 0.038]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* ICs on riser */}
      {([[-0.22, 0.04, 0.10], [0.22, 0.04, 0.10], [0, 0.04, -0.05]] as [number,number,number][]).map(([x,y,z],i) => (
        <mesh key={`ic-${i}`} position={[x, y, z]}>
          <boxGeometry args={[0.14, 0.030, 0.10]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}
