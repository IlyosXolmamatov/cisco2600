import { useState } from 'react'

interface ChassisProps {
  isCoverOpen: boolean
  onSelect: (id: string) => void
  selectedComponent: string | null
}

function HoverBox({
  id,
  args,
  position,
  baseColor,
  metalness = 0.8,
  roughness = 0.35,
  onSelect,
  selectedComponent,
}: {
  id: string
  args: [number, number, number]
  position: [number, number, number]
  baseColor: string
  metalness?: number
  roughness?: number
  onSelect: (id: string) => void
  selectedComponent: string | null
}) {
  const [hovered, setHovered] = useState(false)
  const isSelected = selectedComponent === id

  return (
    <mesh
      position={position}
      castShadow
      receiveShadow
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={baseColor}
        metalness={metalness}
        roughness={roughness}
        emissive={hovered || isSelected ? '#1a4466' : '#000000'}
        emissiveIntensity={hovered ? 0.4 : isSelected ? 0.7 : 0}
      />
    </mesh>
  )
}

export default function Chassis({ isCoverOpen, onSelect, selectedComponent }: ChassisProps) {
  const W = 4.45
  const H = 0.43
  const D = 3.01
  const T = 0.03

  const BODY  = '#525c68'
  const DARK  = '#3d4550'
  const BEZEL = '#4a5360'

  const coverRotX   = isCoverOpen ? Math.PI / 2 : 0
  const coverPivotZ = -D / 2

  return (
    <group>
      {/* ── Base plate ── */}
      <HoverBox
        id="base-frame"
        args={[W, T, D]}
        position={[0, -H / 2 + T / 2, 0]}
        baseColor="#4a5a6a"
        metalness={0.82}
        roughness={0.18}
        onSelect={onSelect}
        selectedComponent={selectedComponent}
      />

      {/* ── Left side wall ── */}
      <mesh position={[-W / 2 + T / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H - T * 2, D]} />
        <meshStandardMaterial color={DARK} metalness={0.82} roughness={0.18} />
      </mesh>
      {/* ── Right side wall ── */}
      <mesh position={[W / 2 - T / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H - T * 2, D]} />
        <meshStandardMaterial color={DARK} metalness={0.82} roughness={0.18} />
      </mesh>

      {/* ── Rear wall ── */}
      <mesh position={[0, 0, -D / 2 + T / 2]} castShadow receiveShadow>
        <boxGeometry args={[W - T * 2, H - T * 2, T]} />
        <meshStandardMaterial color={DARK} metalness={0.82} roughness={0.18} />
      </mesh>
      {/* IEC power socket cutout */}
      <mesh position={[1.8, 0, -D / 2]}>
        <boxGeometry args={[0.24, 0.18, 0.006]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ════════ Front Bezel ════════ */}
      {/* Main bezel plate */}
      <mesh position={[0, 0, D / 2 - T / 2]} castShadow receiveShadow>
        <boxGeometry args={[W - T * 2, H - T * 2, T]} />
        <meshStandardMaterial color={BEZEL} metalness={0.72} roughness={0.28} />
      </mesh>
      {/* Recessed center panel */}
      <mesh position={[0, 0, D / 2 - T / 2 + 0.002]}>
        <boxGeometry args={[W - T * 2 - 0.38, H - T * 2 - 0.04, 0.004]} />
        <meshStandardMaterial color={BODY} metalness={0.75} roughness={0.32} />
      </mesh>

      {/* Console port recess */}
      <mesh position={[1.85, 0.02, D / 2]}>
        <boxGeometry args={[0.14, 0.09, 0.007]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* AUX port recess */}
      <mesh position={[1.60, 0.02, D / 2]}>
        <boxGeometry args={[0.14, 0.09, 0.007]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Port labels strip */}
      <mesh position={[1.725, -0.055, D / 2 + 0.002]}>
        <boxGeometry args={[0.42, 0.022, 0.003]} />
        <meshStandardMaterial color="#888899" metalness={0} roughness={0.9} />
      </mesh>

      {/* Cisco logo area — left bezel */}
      <mesh position={[-1.62, 0.05, D / 2 + 0.003]}>
        <boxGeometry args={[0.52, 0.068, 0.004]} />
        <meshStandardMaterial color="#e0e0d0" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Cisco wave-stripe detail */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`logo-${i}`} position={[-1.82 + i * 0.10, 0.050, D / 2 + 0.005]}>
          <boxGeometry args={[0.044, 0.058, 0.003]} />
          <meshStandardMaterial color="#1a78c8" metalness={0.25} roughness={0.5} />
        </mesh>
      ))}
      {/* "CISCO" text stub */}
      <mesh position={[-1.38, 0.050, D / 2 + 0.005]}>
        <boxGeometry args={[0.20, 0.032, 0.003]} />
        <meshStandardMaterial color="#cccccc" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* "2600 Series" model text */}
      <mesh position={[0.30, -0.062, D / 2 + 0.003]}>
        <boxGeometry args={[0.90, 0.026, 0.003]} />
        <meshStandardMaterial color="#7a8898" metalness={0} roughness={0.9} />
      </mesh>

      {/* ── LED housing bezel ── */}
      <mesh position={[2.10, 0.04, D / 2 + 0.008]}>
        <boxGeometry args={[0.058, 0.165, 0.012]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* POWER LED — Green (always on) */}
      <mesh position={[2.10, 0.09, D / 2 + 0.013]}>
        <sphereGeometry args={[0.020, 16, 16]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2.8} metalness={0.2} roughness={0.3} />
      </mesh>
      <pointLight position={[2.10, 0.09, D / 2 + 0.02]} intensity={0.9} color="#00ff44" distance={1.3} decay={2} />
      {/* SYS LED — Amber */}
      <mesh position={[2.10, 0.04, D / 2 + 0.013]}>
        <sphereGeometry args={[0.020, 16, 16]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={1.8} metalness={0.2} roughness={0.3} />
      </mesh>
      <pointLight position={[2.10, 0.04, D / 2 + 0.02]} intensity={0.5} color="#ffcc00" distance={1.0} decay={2} />
      {/* ACTIVITY LED — Red */}
      <mesh position={[2.10, -0.01, D / 2 + 0.013]}>
        <sphereGeometry args={[0.020, 16, 16]} />
        <meshStandardMaterial color="#ff3322" emissive="#ff3322" emissiveIntensity={1.6} metalness={0.2} roughness={0.3} />
      </mesh>
      <pointLight position={[2.10, -0.01, D / 2 + 0.02]} intensity={0.45} color="#ff4433" distance={0.9} decay={2} />

      {/* ════════ Top Cover ════════ */}
      <group position={[0, H / 2 - T / 2, coverPivotZ]} rotation={[coverRotX, 0, 0]}>
        <HoverBox
          id="top-cover"
          args={[W, T, D]}
          position={[0, 0, D / 2]}
          baseColor={BODY}
          metalness={0.78}
          roughness={0.22}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
        {/* Ventilation louvers — 9 strips */}
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} position={[-1.72 + i * 0.43, -T / 2 - 0.001, D / 2]} castShadow={false}>
            <boxGeometry args={[0.24, 0.005, 1.92]} />
            <meshStandardMaterial color={DARK} metalness={0.90} roughness={0.12} />
          </mesh>
        ))}
        {/* Model label */}
        <mesh position={[-1.62, T / 2 + 0.001, D / 2 + 0.62]}>
          <boxGeometry args={[0.85, 0.002, 0.13]} />
          <meshStandardMaterial color="#d0d0c0" metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Serial number sticker */}
        <mesh position={[1.50, T / 2 + 0.001, D / 2 - 0.80]}>
          <boxGeometry args={[0.58, 0.002, 0.24]} />
          <meshStandardMaterial color="#eeeedd" metalness={0.05} roughness={0.92} />
        </mesh>
      </group>

      {/* ── Rack mount ears ── */}
      <mesh position={[-W / 2 - 0.13, 0, 0]} castShadow>
        <boxGeometry args={[0.22, H * 0.88, 0.44]} />
        <meshStandardMaterial color={DARK} metalness={0.82} roughness={0.2} />
      </mesh>
      <mesh position={[W / 2 + 0.13, 0, 0]} castShadow>
        <boxGeometry args={[0.22, H * 0.88, 0.44]} />
        <meshStandardMaterial color={DARK} metalness={0.82} roughness={0.2} />
      </mesh>
      {[-0.10, 0.10].map((z, i) => (
        <mesh key={`ls-${i}`} position={[-W / 2 - 0.24, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.024, 0.024, 0.25, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      {[-0.10, 0.10].map((z, i) => (
        <mesh key={`rs-${i}`} position={[W / 2 + 0.24, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.024, 0.024, 0.25, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}
