import { useState } from 'react'

// WIC-1T Module — Metallic Blue panel with HD-60 (DB-60) serial port
// Scale: 1 unit = 10 cm

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
}

// DB-60 connector: 3 rows × 20 pins, trapezoidal D-sub housing
function DB60Port({ selected, hovered }: { selected: boolean; hovered: boolean }) {
  const glow = selected ? 0.55 : hovered ? 0.35 : 0

  // Rows: top=20, mid=20, bot=20 pins
  const ROWS = [
    { y:  0.055, count: 20 },
    { y:  0.000, count: 20 },
    { y: -0.055, count: 20 },
  ]
  const PIN_SPREAD = 0.6  // total X spread of pins
  const PIN_STEP = PIN_SPREAD / 19  // 19 gaps for 20 pins

  return (
    <group>
      {/* Outer D-sub metal shell */}
      <mesh castShadow>
        <boxGeometry args={[0.68, 0.26, 0.09]} />
        <meshStandardMaterial
          color="#2a2a3a" metalness={0.82} roughness={0.25}
          emissive="#888888" emissiveIntensity={glow}
        />
      </mesh>

      {/* Inner cavity (deep recess) */}
      <mesh position={[0, 0, 0.046]}>
        <boxGeometry args={[0.61, 0.20, 0.005]} />
        <meshStandardMaterial color="#080808" metalness={0} roughness={1} />
      </mesh>

      {/* 3 rows of pins */}
      {ROWS.map(({ y, count }, ri) =>
        Array.from({ length: count }).map((_, i) => (
          <mesh
            key={`r${ri}-p${i}`}
            position={[
              -PIN_SPREAD / 2 + i * PIN_STEP,
              y,
              0.047,
            ]}
          >
            <cylinderGeometry args={[0.007, 0.007, 0.016, 5]} />
            <meshStandardMaterial color="#ccaa44" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      )}

      {/* Left locking screw post */}
      <mesh position={[-0.36, 0, 0.04]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 10]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.36, 0, 0.09]}>
        <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Right locking screw post */}
      <mesh position={[0.36, 0, 0.04]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 10]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.36, 0, 0.09]}>
        <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function WICModuleGroup({ selectedId, onSelect }: Props) {
  const [portHov, setPortHov] = useState(false)
  const [panelHov, setPanelHov] = useState(false)
  const sel = selectedId === 'wic-db60'

  return (
    <group>
      {/* Module face-plate (metallic blue) */}
      <mesh
        position={[0, 0, -0.005]}
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); setPanelHov(true) }}
        onPointerOut={() => setPanelHov(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('wic-db60') }}
      >
        <boxGeometry args={[1.05, 0.43, 0.055]} />
        <meshStandardMaterial
          color="#1a3a6a"
          metalness={0.82}
          roughness={0.28}
          emissive="#112244"
          emissiveIntensity={sel || panelHov ? 0.45 : 0.08}
        />
      </mesh>

      {/* Slightly raised module bezel */}
      <mesh position={[0, 0, 0.028]} receiveShadow>
        <boxGeometry args={[1.01, 0.40, 0.010]} />
        <meshStandardMaterial color="#163265" metalness={0.75} roughness={0.32} />
      </mesh>

      {/* DB-60 Port (clickable) */}
      <group
        position={[0.06, 0.04, 0.06]}
        onPointerOver={(e) => { e.stopPropagation(); setPortHov(true) }}
        onPointerOut={() => setPortHov(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('wic-db60') }}
      >
        <DB60Port selected={sel} hovered={portHov} />
      </group>

      {/* TX LED */}
      <mesh position={[-0.38, 0.13, 0.04]}>
        <cylinderGeometry args={[0.018, 0.018, 0.012, 8]} />
        <meshStandardMaterial
          color="#00ff44" emissive="#00ff44"
          emissiveIntensity={sel || portHov ? 3.0 : 1.5}
        />
      </mesh>
      {/* RX LED */}
      <mesh position={[-0.38, 0.08, 0.04]}>
        <cylinderGeometry args={[0.018, 0.018, 0.012, 8]} />
        <meshStandardMaterial
          color="#ffaa00" emissive="#ffaa00"
          emissiveIntensity={sel || portHov ? 2.5 : 0.8}
        />
      </mesh>

      {/* TX / RX labels */}
      <mesh position={[-0.36, 0.135, 0.042]}>
        <boxGeometry args={[0.05, 0.012, 0.001]} />
        <meshStandardMaterial color="#8899aa" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[-0.36, 0.085, 0.042]}>
        <boxGeometry args={[0.04, 0.012, 0.001]} />
        <meshStandardMaterial color="#8899aa" metalness={0} roughness={1} />
      </mesh>

      {/* "WIC-1T" label bar */}
      <mesh position={[-0.34, -0.13, 0.04]}>
        <boxGeometry args={[0.22, 0.025, 0.003]} />
        <meshStandardMaterial color="#7799bb" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Top thumbscrew */}
      <mesh position={[-0.44, 0.185, 0.02]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.44, 0.185, 0.02]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bottom thumbscrew */}
      <mesh position={[-0.44, -0.185, 0.02]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.44, -0.185, 0.02]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
