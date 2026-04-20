import { useRef, useState } from 'react'
import * as THREE from 'three'

// Single RJ-45 port with full internal pinning
function RJ45Port({
  id,
  label,
  labelColor,
  selectedId,
  onSelect,
}: {
  id: string
  label: string
  labelColor: string
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const sel = selectedId === id
  const emissive = sel ? '#aaaaaa' : hovered ? '#666666' : '#000000'
  const emissiveInt = sel ? 0.55 : hovered ? 0.35 : 0

  // Port outer: 0.185 wide × 0.175 tall × 0.105 deep
  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {/* Plastic housing */}
      <mesh castShadow>
        <boxGeometry args={[0.185, 0.175, 0.105]} />
        <meshStandardMaterial
          color="#2a2a2a" metalness={0.05} roughness={0.88}
          emissive={emissive} emissiveIntensity={emissiveInt}
        />
      </mesh>

      {/* Socket cavity (dark recess on front face) */}
      <mesh position={[0, -0.01, 0.053]}>
        <boxGeometry args={[0.152, 0.125, 0.015]} />
        <meshStandardMaterial color="#090909" metalness={0} roughness={1} />
      </mesh>

      {/* 8 copper contact pins at cavity top */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.049 + i * 0.014, 0.044, 0.055]}>
          <boxGeometry args={[0.008, 0.055, 0.008]} />
          <meshStandardMaterial color="#d4aa30" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}

      {/* Bottom latch / tab */}
      <mesh position={[0, -0.095, 0.04]}>
        <boxGeometry args={[0.10, 0.014, 0.07]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Top LED strip (2 small indicator LEDs) */}
      <mesh position={[-0.03, 0.092, 0.04]}>
        <boxGeometry args={[0.022, 0.012, 0.012]} />
        <meshStandardMaterial
          color="#00ff44" emissive="#00ff44" emissiveIntensity={sel || hovered ? 2.5 : 1.2}
        />
      </mesh>
      <mesh position={[0.03, 0.092, 0.04]}>
        <boxGeometry args={[0.022, 0.012, 0.012]} />
        <meshStandardMaterial
          color="#ffaa00" emissive="#ffaa00" emissiveIntensity={sel || hovered ? 2.0 : 0.7}
        />
      </mesh>

      {/* Label colour band below port */}
      <mesh position={[0, -0.097, 0.054]}>
        <boxGeometry args={[0.185, 0.008, 0.001]} />
        <meshStandardMaterial color={labelColor} metalness={0} roughness={1} emissive={labelColor} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
}

// 3 ports, right-to-left: Console (rightmost), AUX, Ethernet 0/0 (leftmost)
const PORTS = [
  { id: 'console',    label: 'CONSOLE', labelColor: '#00ccbb', x:  0.235 },
  { id: 'aux',        label: 'AUX',     labelColor: '#ff8800', x:  0.0   },
  { id: 'ethernet-0', label: 'ETH0/0',  labelColor: '#ddcc00', x: -0.235 },
]

export default function RJ45Group({ selectedId, onSelect }: Props) {
  return (
    <group>
      {/* Group sub-panel backing */}
      <mesh position={[0, 0, -0.005]} receiveShadow>
        <boxGeometry args={[0.78, 0.43, 0.008]} />
        <meshStandardMaterial color="#252830" metalness={0.75} roughness={0.55} />
      </mesh>

      {/* Three ports */}
      {PORTS.map(({ id, label, labelColor, x }) => (
        <group key={id} position={[x, 0.02, 0.02]}>
          <RJ45Port
            id={id}
            label={label}
            labelColor={labelColor}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </group>
      ))}

      {/* Divider lines between ports */}
      {[-0.118, 0.118].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.03]}>
          <boxGeometry args={[0.004, 0.38, 0.002]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.5} roughness={0.8} />
        </mesh>
      ))}

      {/* "MGMT" label strip at bottom */}
      <mesh position={[0, -0.18, 0.038]}>
        <boxGeometry args={[0.60, 0.022, 0.002]} />
        <meshStandardMaterial color="#555566" metalness={0.2} roughness={0.9} />
      </mesh>
    </group>
  )
}
