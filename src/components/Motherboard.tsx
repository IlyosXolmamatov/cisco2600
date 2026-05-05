import { useState } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * CISCO 2621 SYSTEM MOTHERBOARD — Main Processing Unit
 * ═══════════════════════════════════════════════════════════════════════
 *
 * SPECIFICATIONS:
 *   Type: System PCB - Cisco 2621 router mainboard
 *   Dimensions: 440 × 2 × 300 mm (4.40 × 0.02 × 3.00 units)
 *   Position: (0, -0.20, 0) — Central floor coverage
 *   PCB Layers: 6-layer FR4 with dual power planes
 *
 * KEY COMPONENTS:
 *   CPU: Motorola MPC860 @ 50MHz
 *   DRAM: 2× DIMM slots (up to 64MB)
 *   Boot ROM: 8-16MB Flash SIMM
 *   Expansion: 2× WIC slots, 1-2× NM slots
 *   Buses: Cisco IQ Bus (32-bit), PCI, ISA
 */

interface MotherboardProps {
  position: [number, number, number];
  onSelect: (id: string) => void;
  selectedComponent: string | null;
}

function PCBChip({
  position,
  size,
  color,
  id,
  onSelect,
  isSelected,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  id: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      position={position}
      onPointerOver={e => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={e => {
        e.stopPropagation();
        onSelect(id);
      }}
      castShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={hovered || isSelected ? "#334455" : "#000000"}
        emissiveIntensity={hovered ? 0.5 : isSelected ? 0.85 : 0}
      />
    </mesh>
  );
}

export default function Motherboard({
  position,
  onSelect,
  selectedComponent,
}: MotherboardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} name="motherboard-pcb">
      {/* ── PCB Base — FR4 dark green, satin finish ── */}
      {/* Professional dimensions: 440 × 2 × 300 mm (4.40 × 0.02 × 3.00 units) */}
      <mesh
        onPointerOver={e => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={e => {
          e.stopPropagation();
          onSelect("pcb");
        }}
        receiveShadow
        castShadow
        name="pcb-base"
      >
        <boxGeometry args={[4.4, 0.02, 3.0]} />
        <meshStandardMaterial
          color={hovered || selectedComponent === "pcb" ? "#1c5228" : "#0b3d18"}
          metalness={0.08}
          roughness={0.72}
          emissive={
            hovered || selectedComponent === "pcb" ? "#183a20" : "#000000"
          }
          emissiveIntensity={
            hovered ? 0.28 : selectedComponent === "pcb" ? 0.48 : 0
          }
        />
      </mesh>

      {/* ── Solder mask layer (subtle green sheen coat) ── */}
      <mesh position={[0, 0.021, 0]}>
        <boxGeometry args={[3.98, 0.002, 2.58]} />
        <meshStandardMaterial
          color="#0f4820"
          metalness={0.0}
          roughness={0.55}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ── Copper trace grid — horizontal (dense) ── */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={`htr-${i}`} position={[-1.9 + i * 0.165, 0.022, 0]}>
          <boxGeometry args={[0.01, 0.003, 2.52]} />
          <meshStandardMaterial
            color="#c8a030"
            metalness={0.97}
            roughness={0.06}
          />
        </mesh>
      ))}
      {/* ── Copper trace grid — vertical (dense) ── */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={`vtr-${i}`} position={[0, 0.022, -1.28 + i * 0.148]}>
          <boxGeometry args={[3.96, 0.003, 0.01]} />
          <meshStandardMaterial
            color="#c8a030"
            metalness={0.97}
            roughness={0.06}
          />
        </mesh>
      ))}
      {/* ── Power plane traces — wider copper fills ── */}
      {[
        [-1.5, 0.8],
        [0.5, -0.5],
        [1.5, 0.2],
      ].map(([x, z], i) => (
        <mesh key={`pwr-${i}`} position={[x, 0.0215, z]}>
          <boxGeometry args={[0.6, 0.002, 0.4]} />
          <meshStandardMaterial
            color="#b89020"
            metalness={0.92}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* ── Solder via pads (gold ring pads) ── */}
      {Array.from({ length: 42 }).map((_, i) => {
        const x = -1.85 + (i % 7) * 0.62;
        const z = -1.1 + Math.floor(i / 7) * 0.37;
        return (
          <mesh key={`via-${i}`} position={[x, 0.0225, z]}>
            <cylinderGeometry args={[0.028, 0.028, 0.002, 6]} />
            <meshStandardMaterial
              color="#d4aa20"
              metalness={0.98}
              roughness={0.03}
            />
          </mesh>
        );
      })}

      {/* ── Silkscreen layer — white component outlines ── */}
      {/* CPU outline */}
      <mesh position={[-0.5, 0.0225, 0.25]}>
        <boxGeometry args={[0.52, 0.001, 0.52]} />
        <meshStandardMaterial
          color="#dddddd"
          metalness={0}
          roughness={1}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* U-designators (white dots for IC positions) */}
      {(
        [
          [-0.5, 0.25],
          [0.55, -0.75],
          [-0.15, -0.78],
          [0.3, 0.8],
          [0.85, 0.45],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={`silk-${i}`} position={[x, 0.0225, z]}>
          <boxGeometry args={[0.08, 0.001, 0.04]} />
          <meshStandardMaterial
            color="#f0f0f0"
            metalness={0}
            roughness={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* ════════ CPU — Motorola MPC860 (center-left) ════════ */}
      <PCBChip
        position={[-0.5, 0.062, 0.25]}
        size={[0.48, 0.052, 0.48]}
        color="#111122"
        id="cpu"
        onSelect={onSelect}
        isSelected={selectedComponent === "cpu"}
      />
      {/* CPU heat spreader */}
      <mesh position={[-0.5, 0.088, 0.25]}>
        <boxGeometry args={[0.44, 0.02, 0.44]} />
        <meshStandardMaterial
          color="#b8b8b8"
          metalness={0.95}
          roughness={0.08}
        />
      </mesh>
      {/* CPU capacitor cluster */}
      {[
        [-0.8, 0.25],
        [-0.8, 0.4],
        [-0.8, 0.1],
        [-0.2, 0.25],
      ].map(([x, z], i) => (
        <mesh key={`cpucap-${i}`} position={[x, 0.068, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.07, 8]} />
          <meshStandardMaterial
            color="#3355aa"
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* ════════ Boot ROM — PLCC-32 chip ════════ */}
      <PCBChip
        position={[0.55, 0.058, -0.75]}
        size={[0.28, 0.038, 0.14]}
        color="#2a1a0a"
        id="boot-rom"
        onSelect={onSelect}
        isSelected={selectedComponent === "boot-rom"}
      />
      {/* PLCC socket detail */}
      <mesh position={[0.55, 0.048, -0.75]}>
        <boxGeometry args={[0.3, 0.01, 0.16]} />
        <meshStandardMaterial color="#333344" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* ════════ Flash SIMM socket ════════ */}
      {/* Socket housing */}
      <mesh position={[-0.15, 0.06, -0.78]}>
        <boxGeometry args={[0.55, 0.055, 0.12]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Flash module inserted in socket */}
      <mesh position={[-0.15, 0.08, -0.78]}>
        <boxGeometry args={[0.5, 0.055, 0.1]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Flash chip on module */}
      <mesh position={[-0.15, 0.11, -0.78]}>
        <boxGeometry args={[0.3, 0.03, 0.075]} />
        <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ════════ DRAM slot housings (2 slots) ════════ */}
      {/* Slot 0 housing */}
      <mesh position={[0.65, 0.052, 0.48]}>
        <boxGeometry args={[0.16, 0.04, 1.15]} />
        <meshStandardMaterial
          color="#222233"
          metalness={0.65}
          roughness={0.45}
        />
      </mesh>
      {/* Slot 1 housing */}
      <mesh position={[0.65, 0.052, -0.22]}>
        <boxGeometry args={[0.16, 0.04, 1.15]} />
        <meshStandardMaterial
          color="#222233"
          metalness={0.65}
          roughness={0.45}
        />
      </mesh>

      {/* ════════ NM slot connector (rear-center) ════════ */}
      <mesh position={[0.28, 0.052, -0.92]}>
        <boxGeometry args={[1.55, 0.038, 0.08]} />
        <meshStandardMaterial
          color="#333344"
          metalness={0.72}
          roughness={0.32}
        />
      </mesh>
      {/* NM slot pin row */}
      {Array.from({ length: 32 }).map((_, i) => (
        <mesh key={`nmpin-${i}`} position={[-0.47 + i * 0.03, 0.068, -0.92]}>
          <boxGeometry args={[0.018, 0.02, 0.04]} />
          <meshStandardMaterial
            color="#d4aa20"
            metalness={0.98}
            roughness={0.04}
          />
        </mesh>
      ))}

      {/* ════════ WIC slot connectors (front-left) ════════ */}
      {/* WIC 0 */}
      <mesh position={[-1.3, 0.052, 0.8]}>
        <boxGeometry args={[0.96, 0.035, 0.07]} />
        <meshStandardMaterial
          color="#333344"
          metalness={0.72}
          roughness={0.32}
        />
      </mesh>
      {/* WIC 1 */}
      <mesh position={[-1.3, 0.052, 0.1]}>
        <boxGeometry args={[0.96, 0.035, 0.07]} />
        <meshStandardMaterial
          color="#333344"
          metalness={0.72}
          roughness={0.32}
        />
      </mesh>

      {/* ════════ I/O Riser connector (front-right center) ════════ */}
      <mesh position={[-0.28, 0.055, 0.92]}>
        <boxGeometry args={[0.85, 0.045, 0.04]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ════════ Power supply connector ════════ */}
      <mesh position={[1.62, 0.06, -0.78]}>
        <boxGeometry args={[0.16, 0.06, 0.45]} />
        <meshStandardMaterial color="#333344" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ════════ Small capacitors ════════ */}
      {(
        [
          [-1.3, 0.65],
          [-1.1, 0.65],
          [-0.9, 0.65],
          [0.2, 0.85],
          [0.4, 0.85],
          [1.25, -0.2],
          [1.45, -0.2],
          [-0.6, -0.4],
          [-0.8, -0.4],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={`cap-${i}`} position={[x, 0.07, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.08, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3355aa" : "#aa4422"}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* ════════ Small ICs ════════ */}
      {(
        [
          [0.85, 0.45],
          [1.05, 0.45],
          [1.55, 0.6],
          [-1.5, -0.55],
          [-1.1, -0.8],
          [0.8, -0.55],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={`ic-${i}`} position={[x, 0.056, z]}>
          <boxGeometry args={[0.15, 0.03, 0.09]} />
          <meshStandardMaterial
            color="#111122"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* ════════ Rear backplane connectors ════════ */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`conn-${i}`} position={[-1.22 + i * 0.5, 0.072, -1.26]}>
          <boxGeometry args={[0.32, 0.065, 0.072]} />
          <meshStandardMaterial
            color="#333355"
            metalness={0.72}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* ════════ Clock oscillator can ════════ */}
      <mesh position={[0.3, 0.065, 0.8]}>
        <boxGeometry args={[0.12, 0.045, 0.075]} />
        <meshStandardMaterial
          color="#aaaaaa"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* ════════ PCB mounting standoff holes ════════ */}
      {(
        [
          [-1.8, -1.22],
          [1.8, -1.22],
          [-1.8, 1.22],
          [1.8, 1.22],
          [0, 0],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={`standoff-${i}`} position={[x, 0.025, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.005, 8]} />
          <meshStandardMaterial
            color="#888888"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
