import { } from "react"

interface FrontBezelProps {
  onSelect: (id: string) => void
  selectedComponent: string | null
}

export default function FrontBezel({ onSelect, selectedComponent }: FrontBezelProps) {
  const BEZEL_W = 4.45
  const BEZEL_H = 0.43
  const BEZEL_D = 0.02
  const Z_OFFSET = 0.1505  // Front of chassis

  return (
    <group position={[0, 0, Z_OFFSET]}>
      {/* ── Main Bezel Panel (Dark Slate Grey) ── */}
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation() }}
        onPointerOut={() => { }}
        onClick={(e) => { e.stopPropagation(); onSelect('bezel-main') }}
      >
        <boxGeometry args={[BEZEL_W, BEZEL_H, BEZEL_D]} />
        <meshStandardMaterial
          color="#2a3a4a"
          metalness={0.8}
          roughness={0.25}
          emissive={selectedComponent === 'bezel-main' ? '#1a3a4a' : '#000000'}
          emissiveIntensity={selectedComponent === 'bezel-main' ? 0.5 : 0}
        />
      </mesh>

      {/* ── CISCO Systems Logo (Top Right) ── */}
      <group position={[1.8, 0.15, BEZEL_D / 2 + 0.005]}>
        {/* Logo background */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.08, 0.002]} />
          <meshStandardMaterial color="#1a2a3a" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* "CISCO" text */}
        <mesh position={[0, 0.01, 0.001]}>
          <boxGeometry args={[0.35, 0.04, 0.001]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* "Systems" subtext */}
        <mesh position={[0, -0.03, 0.001]}>
          <boxGeometry args={[0.28, 0.025, 0.001]} />
          <meshStandardMaterial color="#b8b8b8" metalness={0.2} roughness={0.8} />
        </mesh>
      </group>

      {/* ── LED Indicator Group (Right Side, Vertical) ── */}
      <group position={[1.95, 0, BEZEL_D / 2 + 0.008]}>
        {/* LED background panel */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.35, 0.14, 0.002]} />
          <meshStandardMaterial color="#1a2a3a" metalness={0.75} roughness={0.3} />
        </mesh>

        {/* POWER LED - Green */}
        <mesh position={[0, 0.04, 0.005]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial
            color="#00ff44"
            emissive="#00ff44"
            emissiveIntensity={2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <pointLight position={[0, 0.04, 0.05]} intensity={1.2} color="#00ff44" distance={2} decay={2} />
        {/* POWER label */}
        <mesh position={[0, -0.005, 0.001]}>
          <boxGeometry args={[0.08, 0.016, 0.001]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
        </mesh>

        {/* SYS LED - Yellow */}
        <mesh position={[0, -0.02, 0.005]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <pointLight position={[0, -0.02, 0.05]} intensity={1.2} color="#ffff00" distance={2} decay={2} />
        {/* SYS label */}
        <mesh position={[0, -0.055, 0.001]}>
          <boxGeometry args={[0.055, 0.016, 0.001]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
        </mesh>

        {/* ACTIVITY LED - Red */}
        <mesh position={[0, -0.08, 0.005]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial
            color="#ff4444"
            emissive="#ff4444"
            emissiveIntensity={2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <pointLight position={[0, -0.08, 0.05]} intensity={1.2} color="#ff4444" distance={2} decay={2} />
        {/* ACTIVITY label */}
        <mesh position={[0, -0.125, 0.001]}>
          <boxGeometry args={[0.12, 0.016, 0.001]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>

      {/* ── NM Slot Bracket (Light Green Metallic) ── */}
      <group position={[-1.5, -0.05, BEZEL_D / 2 + 0.005]}>
        {/* Bracket background panel */}
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.18, 0.003]} />
          <meshStandardMaterial
            color="#3a7a5a"
            metalness={0.8}
            roughness={0.2}
            emissive={selectedComponent === 'nm-slot' ? '#2a5a4a' : '#000000'}
            emissiveIntensity={selectedComponent === 'nm-slot' ? 0.5 : 0}
          />
        </mesh>

        {/* NM Slot label/text */}
        <mesh position={[0, 0.02, 0.002]}>
          <boxGeometry args={[0.9, 0.04, 0.001]} />
          <meshStandardMaterial color="#ffffff" metalness={0.15} roughness={0.85} />
        </mesh>

        {/* Mounting screw (top left) */}
        <mesh position={[-0.6, 0.08, 0.01]}>
          <cylinderGeometry args={[0.012, 0.014, 0.015, 8]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Screw detail */}
        <mesh position={[-0.6, 0.088, 0.012]}>
          <boxGeometry args={[0.006, 0.002, 0.001]} />
          <meshStandardMaterial color="#666666" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Mounting screw (top right) */}
        <mesh position={[0.6, 0.08, 0.01]}>
          <cylinderGeometry args={[0.012, 0.014, 0.015, 8]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Screw detail */}
        <mesh position={[0.6, 0.088, 0.012]}>
          <boxGeometry args={[0.006, 0.002, 0.001]} />
          <meshStandardMaterial color="#666666" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Ethernet port openings (3 ports) */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0.002]}>
            <boxGeometry args={[0.15, 0.05, 0.001]} />
            <meshStandardMaterial color="#0a1a1a" metalness={0.4} roughness={0.6} />
          </mesh>
        ))}

        {/* Green indicator light */}
        <mesh position={[0, -0.08, 0.008]}>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} />
          <meshStandardMaterial
            color="#00ff44"
            emissive="#00ff44"
            emissiveIntensity={1.5}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        <pointLight position={[0, -0.08, 0.02]} intensity={0.8} color="#00ff44" distance={1.5} decay={2} />
      </group>

      {/* ── "Cisco 2600 Systems" Model Text (Bottom Right) ── */}
      <group position={[1.8, -0.15, BEZEL_D / 2 + 0.005]}>
        {/* Text background panel */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.06, 0.002]} />
          <meshStandardMaterial color="#1a2a3a" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* Model number text */}
        <mesh position={[0, 0, 0.001]}>
          <boxGeometry args={[0.55, 0.04, 0.001]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.25} roughness={0.75} />
        </mesh>
      </group>

      {/* ── Serial Port Area (Lower Left) ── */}
      <group position={[-1.5, -0.15, BEZEL_D / 2 + 0.005]}>
        {/* Port cutouts background */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.06, 0.002]} />
          <meshStandardMaterial color="#1a2a3a" metalness={0.75} roughness={0.3} />
        </mesh>

        {/* Console RJ-45 port */}
        <mesh position={[-0.12, 0, 0.001]}>
          <boxGeometry args={[0.12, 0.04, 0.001]} />
          <meshStandardMaterial color="#0a1a1a" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* AUX RJ-45 port */}
        <mesh position={[0.12, 0, 0.001]}>
          <boxGeometry args={[0.12, 0.04, 0.001]} />
          <meshStandardMaterial color="#0a1a1a" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Port labels */}
        <mesh position={[-0.12, -0.035, 0.002]}>
          <boxGeometry args={[0.1, 0.012, 0.0005]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.1} roughness={0.95} />
        </mesh>
        <mesh position={[0.12, -0.035, 0.002]}>
          <boxGeometry args={[0.08, 0.012, 0.0005]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.1} roughness={0.95} />
        </mesh>
      </group>

      {/* ── Bezel Edge Trim (Metallic Accent Lines) ── */}
      {/* Top edge */}
      <mesh position={[0, BEZEL_H / 2 - 0.01, BEZEL_D / 2 + 0.001]} castShadow={false}>
        <boxGeometry args={[BEZEL_W - 0.1, 0.012, 0.002]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bottom edge */}
      <mesh position={[0, -BEZEL_H / 2 + 0.01, BEZEL_D / 2 + 0.001]} castShadow={false}>
        <boxGeometry args={[BEZEL_W - 0.1, 0.012, 0.002]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Left edge */}
      <mesh position={[-BEZEL_W / 2 + 0.1, 0, BEZEL_D / 2 + 0.001]} castShadow={false}>
        <boxGeometry args={[0.012, BEZEL_H - 0.1, 0.002]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right edge */}
      <mesh position={[BEZEL_W / 2 - 0.1, 0, BEZEL_D / 2 + 0.001]} castShadow={false}>
        <boxGeometry args={[0.012, BEZEL_H - 0.1, 0.002]} />
        <meshStandardMaterial color="#4a6a7a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
