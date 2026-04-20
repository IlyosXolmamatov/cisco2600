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
        <meshStandardMaterial color="#3a5a6a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Console port */}
      <mesh position={[1.8, 0.02, D / 2]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* AUX port */}
      <mesh position={[1.55, 0.02, D / 2]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ── LED Indicators (POWER, SYS, ACTIVITY) ── */}
      {/* POWER LED - Green */}
      <mesh position={[2.1, 0.08, D / 2 + 0.01]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial 
          color="#00ff44" 
          emissive="#00ff44" 
          emissiveIntensity={1.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <pointLight position={[2.1, 0.08, D / 2 + 0.01]} intensity={0.8} color="#00ff44" distance={1.2} decay={2} />

      {/* SYS LED - Yellow */}
      <mesh position={[1.8, 0.08, D / 2 + 0.01]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={1.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <pointLight position={[1.8, 0.08, D / 2 + 0.01]} intensity={0.8} color="#ffff00" distance={1.2} decay={2} />

      {/* ACTIVITY LED - Red */}
      <mesh position={[1.5, 0.08, D / 2 + 0.01]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff4444" 
          emissiveIntensity={1.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <pointLight position={[1.5, 0.08, D / 2 + 0.01]} intensity={0.8} color="#ff4444" distance={1.2} decay={2} />

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
