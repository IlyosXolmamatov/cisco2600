import { useState } from 'react'

// Scale: 1 unit = 10 cm
// Panel height 0.43 units centred at y=0
// This group is positioned at the RIGHT side of the panel (high X)

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
}

function SelectableMesh({
  id, selectedId, onSelect, children, ...rest
}: {
  id: string
  selectedId: string | null
  onSelect: (id: string) => void
  children?: React.ReactNode
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const [hovered, setHovered] = useState(false)
  const sel = selectedId === id
  return (
    <group
      {...rest}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      {children}
      {/* invisible hit-expand plane so small parts are easy to click */}
      {(hovered || sel) && (
        <mesh>
          <boxGeometry args={[0.001, 0.001, 0.001]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  )
}

function IECInlet({ selected, hovered }: { selected: boolean; hovered: boolean }) {
  const glow = selected ? 0.55 : hovered ? 0.35 : 0
  return (
    <group>
      {/* Outer housing */}
      <mesh castShadow>
        <boxGeometry args={[0.30, 0.26, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.85}
          emissive="#aaaaaa" emissiveIntensity={glow} />
      </mesh>
      {/* Inner cavity (dark recess) */}
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[0.22, 0.18, 0.02]} />
        <meshStandardMaterial color="#090909" metalness={0} roughness={1} />
      </mesh>
      {/* 3 IEC pins: L, N, GND */}
      {[[-0.06, 0.04], [0.06, 0.04], [0, -0.05]].map(([px, py], i) => (
        <mesh key={i} position={[px, py, 0.045]}>
          <boxGeometry args={[0.025, 0.035, 0.01]} />
          <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Ground pin (round post) */}
      <mesh position={[0, -0.05, 0.045]}>
        <cylinderGeometry args={[0.014, 0.014, 0.03, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

function RockerSwitch({ selected, hovered }: { selected: boolean; hovered: boolean }) {
  const glow = selected ? 0.55 : hovered ? 0.35 : 0
  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.26, 0.15, 0.055]} />
        <meshStandardMaterial color="#111111" metalness={0.05} roughness={0.9}
          emissive="#aaaaaa" emissiveIntensity={glow} />
      </mesh>
      {/* Upper rocker face (I = ON) */}
      <mesh position={[0, 0.033, 0.032]}>
        <boxGeometry args={[0.18, 0.055, 0.01]} />
        <meshStandardMaterial color="#222222" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Lower rocker face (O = OFF) */}
      <mesh position={[0, -0.033, 0.028]}>
        <boxGeometry args={[0.18, 0.055, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Neon indicator dot */}
      <mesh position={[0.07, 0.045, 0.035]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={2.5} />
      </mesh>
    </group>
  )
}

export default function PowerGroup({ selectedId, onSelect }: Props) {
  const [inletHov, setInletHov] = useState(false)
  const [switchHov, setSwitchHov] = useState(false)

  return (
    // Group positioned to RIGHT side of panel; caller places this at x~1.7
    <group>
      {/* Sub-panel background */}
      <mesh position={[0, 0, -0.005]} receiveShadow>
        <boxGeometry args={[0.72, 0.43, 0.008]} />
        <meshStandardMaterial color="#252830" metalness={0.75} roughness={0.55} />
      </mesh>

      {/* AC Inlet */}
      <group
        position={[0.12, 0.07, 0.02]}
        onPointerOver={(e) => { e.stopPropagation(); setInletHov(true) }}
        onPointerOut={() => setInletHov(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('ac-inlet') }}
      >
        <IECInlet selected={selectedId === 'ac-inlet'} hovered={inletHov} />
      </group>

      {/* Rocker Switch */}
      <group
        position={[-0.17, -0.08, 0.02]}
        onPointerOver={(e) => { e.stopPropagation(); setSwitchHov(true) }}
        onPointerOut={() => setSwitchHov(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('rocker-switch') }}
      >
        <RockerSwitch selected={selectedId === 'rocker-switch'} hovered={switchHov} />
      </group>

      {/* "PWR" label strip */}
      <mesh position={[0.12, -0.12, 0.035]}>
        <boxGeometry args={[0.18, 0.025, 0.002]} />
        <meshStandardMaterial color="#888899" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* Ventilation slot row */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.25 + i * 0.06, 0.14, 0.035]}>
          <boxGeometry args={[0.03, 0.22, 0.003]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.5} roughness={0.8} />
        </mesh>
      ))}

      {/* Ground terminal screw */}
      <mesh position={[-0.28, -0.14, 0.03]}>
        <cylinderGeometry args={[0.025, 0.025, 0.012, 8]} />
        <meshStandardMaterial color="#aaaa88" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
}
