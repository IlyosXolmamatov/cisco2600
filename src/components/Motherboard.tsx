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
        emissiveIntensity={hovered ? 0.5 : isSelected ? 0.85 : 0}
      />
    </mesh>
  )
}

export default function Motherboard({ position, onSelect, selectedComponent }: MotherboardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>

      {/* ── PCB Base — dark green FR4 ── */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('pcb') }}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[4.0, 0.04, 2.6]} />
        <meshStandardMaterial
          color={hovered || selectedComponent === 'pcb' ? '#1e5a2e' : '#0d3d1a'}
          metalness={0.15}
          roughness={0.8}
          emissive={hovered || selectedComponent === 'pcb' ? '#1a4a2a' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : selectedComponent === 'pcb' ? 0.5 : 0}
        />
      </mesh>

      {/* ── Copper trace grid — horizontal ── */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={`htr-${i}`} position={[-1.9 + i * 0.22, 0.022, 0]}>
          <boxGeometry args={[0.012, 0.003, 2.52]} />
          <meshStandardMaterial color="#c8a030" metalness={0.96} roughness={0.07} />
        </mesh>
      ))}
      {/* ── Copper trace grid — vertical ── */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`vtr-${i}`} position={[0, 0.022, -1.28 + i * 0.20]}>
          <boxGeometry args={[3.95, 0.003, 0.012]} />
          <meshStandardMaterial color="#c8a030" metalness={0.96} roughness={0.07} />
        </mesh>
      ))}

      {/* ── Solder via pads ── */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = -1.85 + (i % 6) * 0.74
        const z = -1.10 + Math.floor(i / 6) * 0.55
        return (
          <mesh key={`via-${i}`} position={[x, 0.023, z]}>
            <cylinderGeometry args={[0.030, 0.030, 0.002, 6]} />
            <meshStandardMaterial color="#c8a830" metalness={0.98} roughness={0.04} />
          </mesh>
        )
      })}

      {/* ════════ CPU — Motorola MPC860 (center-left) ════════ */}
      <PCBChip
        position={[-0.5, 0.062, 0.25]}
        size={[0.48, 0.052, 0.48]}
        color="#111122"
        id="cpu"
        onSelect={onSelect}
        isSelected={selectedComponent === 'cpu'}
      />
      {/* CPU heat spreader */}
      <mesh position={[-0.5, 0.088, 0.25]}>
        <boxGeometry args={[0.44, 0.020, 0.44]} />
        <meshStandardMaterial color="#b8b8b8" metalness={0.95} roughness={0.08} />
      </mesh>
      {/* CPU capacitor cluster */}
      {[[-0.80, 0.25], [-0.80, 0.40], [-0.80, 0.10], [-0.20, 0.25]].map(([x, z], i) => (
        <mesh key={`cpucap-${i}`} position={[x, 0.068, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.07, 8]} />
          <meshStandardMaterial color="#3355aa" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {/* ════════ Boot ROM — PLCC-32 chip ════════ */}
      <PCBChip
        position={[0.55, 0.058, -0.75]}
        size={[0.28, 0.038, 0.14]}
        color="#2a1a0a"
        id="boot-rom"
        onSelect={onSelect}
        isSelected={selectedComponent === 'boot-rom'}
      />
      {/* PLCC socket detail */}
      <mesh position={[0.55, 0.048, -0.75]}>
        <boxGeometry args={[0.30, 0.010, 0.16]} />
        <meshStandardMaterial color="#333344" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* ════════ Flash SIMM socket ════════ */}
      {/* Socket housing */}
      <mesh position={[-0.15, 0.060, -0.78]}>
        <boxGeometry args={[0.55, 0.055, 0.12]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Flash module inserted in socket */}
      <mesh position={[-0.15, 0.080, -0.78]}>
        <boxGeometry args={[0.50, 0.055, 0.10]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Flash chip on module */}
      <mesh position={[-0.15, 0.110, -0.78]}>
        <boxGeometry args={[0.30, 0.030, 0.075]} />
        <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ════════ DRAM slot housings (2 slots) ════════ */}
      {/* Slot 0 housing */}
      <mesh position={[0.65, 0.052, 0.48]}>
        <boxGeometry args={[0.16, 0.040, 1.15]} />
        <meshStandardMaterial color="#222233" metalness={0.65} roughness={0.45} />
      </mesh>
      {/* Slot 1 housing */}
      <mesh position={[0.65, 0.052, -0.22]}>
        <boxGeometry args={[0.16, 0.040, 1.15]} />
        <meshStandardMaterial color="#222233" metalness={0.65} roughness={0.45} />
      </mesh>

      {/* ════════ NM slot connector (rear-center) ════════ */}
      <mesh position={[0.28, 0.052, -0.92]}>
        <boxGeometry args={[1.55, 0.038, 0.08]} />
        <meshStandardMaterial color="#333344" metalness={0.72} roughness={0.32} />
      </mesh>
      {/* NM slot pin row */}
      {Array.from({ length: 32 }).map((_, i) => (
        <mesh key={`nmpin-${i}`} position={[-0.47 + i * 0.030, 0.068, -0.92]}>
          <boxGeometry args={[0.018, 0.020, 0.040]} />
          <meshStandardMaterial color="#d4aa20" metalness={0.98} roughness={0.04} />
        </mesh>
      ))}

      {/* ════════ WIC slot connectors (front-left) ════════ */}
      {/* WIC 0 */}
      <mesh position={[-1.30, 0.052, 0.80]}>
        <boxGeometry args={[0.96, 0.035, 0.07]} />
        <meshStandardMaterial color="#333344" metalness={0.72} roughness={0.32} />
      </mesh>
      {/* WIC 1 */}
      <mesh position={[-1.30, 0.052, 0.10]}>
        <boxGeometry args={[0.96, 0.035, 0.07]} />
        <meshStandardMaterial color="#333344" metalness={0.72} roughness={0.32} />
      </mesh>

      {/* ════════ I/O Riser connector (front-right center) ════════ */}
      <mesh position={[-0.28, 0.055, 0.92]}>
        <boxGeometry args={[0.85, 0.045, 0.040]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ════════ Power supply connector ════════ */}
      <mesh position={[1.62, 0.060, -0.78]}>
        <boxGeometry args={[0.16, 0.060, 0.45]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ════════ Small capacitors ════════ */}
      {([
        [-1.30, 0.65], [-1.10, 0.65], [-0.90, 0.65],
        [0.20, 0.85],  [0.40, 0.85],
        [1.25, -0.20], [1.45, -0.20],
        [-0.60, -0.40], [-0.80, -0.40],
      ] as [number,number][]).map(([x, z], i) => (
        <mesh key={`cap-${i}`} position={[x, 0.070, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.080, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#3355aa' : '#aa4422'} metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {/* ════════ Small ICs ════════ */}
      {([
        [0.85, 0.45], [1.05, 0.45], [1.55, 0.60],
        [-1.50, -0.55], [-1.10, -0.80], [0.80, -0.55],
      ] as [number,number][]).map(([x, z], i) => (
        <mesh key={`ic-${i}`} position={[x, 0.056, z]}>
          <boxGeometry args={[0.15, 0.030, 0.09]} />
          <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* ════════ Rear backplane connectors ════════ */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`conn-${i}`} position={[-1.22 + i * 0.50, 0.072, -1.26]}>
          <boxGeometry args={[0.32, 0.065, 0.072]} />
          <meshStandardMaterial color="#333355" metalness={0.72} roughness={0.3} />
        </mesh>
      ))}

      {/* ════════ Clock oscillator can ════════ */}
      <mesh position={[0.30, 0.065, 0.80]}>
        <boxGeometry args={[0.12, 0.045, 0.075]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* ════════ PCB mounting standoff holes ════════ */}
      {([
        [-1.80, -1.22], [1.80, -1.22], [-1.80, 1.22], [1.80, 1.22], [0, 0]
      ] as [number,number][]).map(([x, z], i) => (
        <mesh key={`standoff-${i}`} position={[x, 0.025, z]}>
          <cylinderGeometry args={[0.040, 0.040, 0.005, 8]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
