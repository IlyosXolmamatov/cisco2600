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
  const T = 0.03  // wall thickness

  // Cover pivot at back-left corner, opens 90 degrees like a real lid
  const coverRotX = isCoverOpen ? Math.PI / 2 : 0
  const coverPivotZ = -D / 2

  return (
    <group>
      {/* ── Base plate ── */}
      <HoverBox
        id="base-frame"
        args={[W, T, D]}
        position={[0, -H / 2 + T / 2, 0]}
        baseColor="#5a7a8a"
        metalness={0.8}
        roughness={0.2}
        onSelect={onSelect}
        selectedComponent={selectedComponent}
      />

      {/* ── Side walls ── */}
      <mesh position={[-W / 2 + T / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H - T * 2, D]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[W / 2 - T / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[T, H - T * 2, D]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Front wall (with port cutouts visual) ── */}
      <mesh position={[0, 0, D / 2 - T / 2]} castShadow receiveShadow>
        <boxGeometry args={[W - T * 2, H - T * 2, T]} />
        <meshStandardMaterial color="#1a4a5a" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* ── Front Bezel Frame (beveled edges effect) ── */}
      {/* Top bezel */}
      <mesh position={[0, H / 2 - 0.025, D / 2]} castShadow={false}>
        <boxGeometry args={[W - T * 2 - 0.1, 0.02, 0.004]} />
        <meshStandardMaterial color="#2a5a6a" metalness={0.9} roughness={0.08} />
      </mesh>
      {/* Bottom bezel */}
      <mesh position={[0, -H / 2 + 0.025, D / 2]} castShadow={false}>
        <boxGeometry args={[W - T * 2 - 0.1, 0.02, 0.004]} />
        <meshStandardMaterial color="#0a2a3a" metalness={0.9} roughness={0.08} />
      </mesh>
      {/* Left bezel */}
      <mesh position={[-W / 2 + 0.1, 0, D / 2]} castShadow={false}>
        <boxGeometry args={[0.02, H - T * 2 - 0.1, 0.004]} />
        <meshStandardMaterial color="#0a2a3a" metalness={0.9} roughness={0.08} />
      </mesh>
      {/* Right bezel */}
      <mesh position={[W / 2 - 0.1, 0, D / 2]} castShadow={false}>
        <boxGeometry args={[0.02, H - T * 2 - 0.1, 0.004]} />
        <meshStandardMaterial color="#2a5a6a" metalness={0.9} roughness={0.08} />
      </mesh>

      {/* ── Cisco Systems Logo Area (Left Side) ── */}
      {/* Logo background panel */}
      <mesh position={[-1.5, 0.06, D / 2 + 0.002]}>
        <boxGeometry args={[0.45, 0.12, 0.003]} />
        <meshStandardMaterial color="#1a4a5a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Logo text "CISCO" */}
      <mesh position={[-1.52, 0.08, D / 2 + 0.003]}>
        <boxGeometry args={[0.25, 0.035, 0.001]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Logo text "Systems" (smaller) */}
      <mesh position={[-1.52, 0.03, D / 2 + 0.003]}>
        <boxGeometry args={[0.2, 0.02, 0.001]} />
        <meshStandardMaterial color="#cccccc" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* ── LED Indicators Section ── */}
      {/* LED background panel */}
      <mesh position={[-1.5, -0.08, D / 2 + 0.002]}>
        <boxGeometry args={[0.5, 0.12, 0.003]} />
        <meshStandardMaterial color="#1a4a5a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* POWER LED - Green */}
      <mesh position={[-1.75, -0.05, D / 2 + 0.02]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial 
          color="#00ff44" 
          emissive="#00ff44" 
          emissiveIntensity={1.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[-1.75, -0.05, D / 2 + 0.02]} intensity={1.0} color="#00ff44" distance={1.5} decay={2} />
      {/* POWER label */}
      <mesh position={[-1.75, -0.125, D / 2 + 0.003]}>
        <boxGeometry args={[0.08, 0.018, 0.001]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* RPS LED - Yellow */}
      <mesh position={[-1.5, -0.05, D / 2 + 0.02]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={1.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[-1.5, -0.05, D / 2 + 0.02]} intensity={1.0} color="#ffff00" distance={1.5} decay={2} />
      {/* RPS label */}
      <mesh position={[-1.5, -0.125, D / 2 + 0.003]}>
        <boxGeometry args={[0.07, 0.018, 0.001]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* ACTIVITY LED - Red */}
      <mesh position={[-1.25, -0.05, D / 2 + 0.02]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff4444" 
          emissiveIntensity={1.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[-1.25, -0.05, D / 2 + 0.02]} intensity={1.0} color="#ff4444" distance={1.5} decay={2} />
      {/* ACTIVITY label */}
      <mesh position={[-1.25, -0.125, D / 2 + 0.003]}>
        <boxGeometry args={[0.12, 0.018, 0.001]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* ── "Cisco 2600" Text on Right Side ── */}
      {/* Model number background */}
      <mesh position={[1.5, 0, D / 2 + 0.002]}>
        <boxGeometry args={[0.6, 0.08, 0.003]} />
        <meshStandardMaterial color="#1a4a5a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Model number text "Cisco 2600" */}
      <mesh position={[1.5, 0.01, D / 2 + 0.003]}>
        <boxGeometry args={[0.5, 0.05, 0.001]} />
        <meshStandardMaterial color="#ffffff" metalness={0.15} roughness={0.85} />
      </mesh>

      {/* ── Console and AUX Ports (Lower Left) ── */}
      {/* Console port */}
      <mesh position={[0.8, -0.15, D / 2]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* AUX port */}
      <mesh position={[0.55, -0.15, D / 2]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ── Rear wall ── */}
      <mesh position={[0, 0, -D / 2 + T / 2]} castShadow receiveShadow>
        <boxGeometry args={[W - T * 2, H - T * 2, T]} />
        <meshStandardMaterial color="#3a5a6a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* IEC socket cutout */}
      <mesh position={[1.8, 0, -D / 2]}>
        <boxGeometry args={[0.22, 0.16, 0.005]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ── Top Cover (pivots open 90° from rear hinge) ── */}
      <group position={[0, H / 2 - T / 2, coverPivotZ]} rotation={[coverRotX, 0, 0]}>
        <HoverBox
          id="top-cover"
          args={[W, T, D]}
          position={[0, 0, D / 2]}
          baseColor="#5a7a8a"
          metalness={0.8}
          roughness={0.2}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
        {/* Ventilation louvers on cover */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-1.5 + i * 0.44, -T / 2 - 0.001, D / 2]} castShadow={false}>
            <boxGeometry args={[0.2, 0.004, 1.8]} />
            <meshStandardMaterial color="#3a5a6a" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Cisco label */}
        <mesh position={[-1.5, T / 2 + 0.001, D / 2 + 0.6]}>
          <boxGeometry args={[0.6, 0.002, 0.1]} />
          <meshStandardMaterial color="#cccccc" metalness={0.3} roughness={0.8} />
        </mesh>
      </group>

      {/* ── Rack mount ears ── */}
      <mesh position={[-W / 2 - 0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.2, H * 0.85, 0.4]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[W / 2 + 0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.2, H * 0.85, 0.4]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rack screw holes */}
      {[-0.08, 0.08].map((z, i) => (
        <mesh key={i} position={[-W / 2 - 0.22, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      {[-0.08, 0.08].map((z, i) => (
        <mesh key={i} position={[W / 2 + 0.22, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}
