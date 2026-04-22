import { useRef, useEffect } from "react";
import { ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import Chassis from "./Chassis";
import Motherboard from "./Motherboard";
import { WICCard, NMModule, PSU, Fan, HDDBay, IORiser } from "./Modules";

interface RouterSceneProps {
  isCoverOpen: boolean;
  isExploded: boolean;
  selectedComponent: string | null;
  onSelect: (id: string) => void;
}

/*
  Cisco 2600XM Internal Topology — HIGH-FIDELITY DIGITAL TWIN
  Reference: Cisco 2600XM Internal Component Map (Provided Image)
  
  Spatial Coordinate System (1 unit = 10 cm):
  - X-Axis: LEFT (-) → RIGHT (+)
  - Y-Axis: DOWN (-) → UP (+) [mounting plane reference]
  - Z-Axis: REAR (-) → FRONT (+)
  
  Chassis Dimensions: 0.445m (W) × 0.043m (H) × 0.301m (D)
  In Units: 4.45 × 0.43 × 3.01
  
  COMPONENT TOPOLOGY (from reference image):
  ┌─────────────────────────────────────────────────────────────┐
  │  REAR SECTION:                                              │
  │  [1-PSU]     [2-Fan]     [4-NM Slots]     [Central-CPU Area]│
  │  Left-Rear   Left-Front  Central-Rear     [5-6-7 RAM/ROM]   │
  │                          [8-HDD Bay]                         │
  │  FRONT SECTION:          [9-I/O Riser]    [3-Motherboard]   │
  │                                                              │
  └─────────────────────────────────────────────────────────────┘
  
  Legend Mapping:
  1 = PSU (Power Supply) — Left-Rear corner
  2 = Cooling Fan — Left-Front, aligned with vent louver
  3 = Motherboard (System) — Central, ~80% of floor
  4 = NM Slots (Network Modules) — Central-Rear, recessed
  5 = DRAM DIMM Sockets — Central-Front, vertical orientation
  6 = Boot ROM — Central chip area
  7 = Flash SIMM — Central chip area
  8 = Hard Drive Bay — Far Right, skeletal frame (optional)
  9 = Internal I/O Riser — Front-Right, white connector strip
*/

const REST = {
  /* Motherboard PCB — Central floor, 80% coverage */
  mb: { x: 0.0, y: -0.12, z: 0.0, name: "3-System/Motherboard" },

  /* WIC Cards — Left section (currently not in reference, kept for compatibility) */
  wic0: { x: -1.2, y: 0.02, z: 0.75, name: "WIC Slot 0" },
  wic1: { x: -1.2, y: 0.02, z: 0.05, name: "WIC Slot 1" },

  /* Network Modules — Central-Rear, TWO MODULES SIDE-BY-SIDE */
  nm0: {
    x: -0.32,
    y: 0.03,
    z: -0.75,
    name: "4a-Network Module Slot 0 (NM-1E/NM-4T)",
  },
  nm1: {
    x: 0.82,
    y: 0.03,
    z: -0.75,
    name: "4b-Network Module Slot 1 (NM-1E/NM-4T)",
  },

  /* Power Supply Unit — Far Left-Rear corner */
  psu: { x: -1.58, y: 0.0, z: -0.82, name: "1-Power Supply Unit (PSU)" },

  /* Cooling Fan — Left-Front, aligned with chassis vent */
  fan: { x: -1.5, y: -0.02, z: 0.25, name: "2-Cooling Fan" },

  /* Hard Drive Bay — Far Right, skeletal frame (optional) */
  hdd: { x: 1.62, y: -0.05, z: 0.65, name: "8-Hard Drive Bay (Optional)" },

  /* Internal I/O Riser — Front-Right, daughterboard */
  ior: { x: 0.35, y: 0.08, z: 0.92, name: "9-Internal I/O Connector/Riser" },
};

const EXPLODED = {
  /* Exploded offsets for disassembly view (Y-axis primary, staggered) */
  mb: { x: 0.0, y: -0.9, z: 0.0 },
  wic0: { x: -1.2, y: 0.45, z: 3.1 },
  wic1: { x: -1.2, y: 0.45, z: 2.35 },
  nm0: { x: -0.32, y: 0.5, z: -3.25 },
  nm1: { x: 0.82, y: 0.5, z: -3.25 },
  psu: { x: -2.4, y: 1.75, z: -0.82 }, // Left-rear, upward + outward
  fan: { x: -2.5, y: 0.5, z: 0.75 }, // Left-front, forward + outward
  hdd: { x: 2.5, y: 0.55, z: 2.35 }, // Right, outward + forward
  ior: { x: 0.35, y: 1.5, z: 1.6 }, // Front-right, upward + forward
};

type ComponentKey = keyof typeof REST;

export default function RouterScene({
  isCoverOpen,
  isExploded,
  selectedComponent,
  onSelect,
}: RouterSceneProps) {
  const mbRef = useRef<THREE.Group>(null);
  const wic0Ref = useRef<THREE.Group>(null);
  const wic1Ref = useRef<THREE.Group>(null);
  const nm0Ref = useRef<THREE.Group>(null);
  const nm1Ref = useRef<THREE.Group>(null);
  const psuRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Group>(null);
  const hddRef = useRef<THREE.Group>(null);
  const iorRef = useRef<THREE.Group>(null);
  const wiringRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const targets: {
      ref: React.RefObject<THREE.Group | null>;
      key: ComponentKey;
    }[] = [
      { ref: mbRef, key: "mb" },
      { ref: psuRef, key: "psu" },
      { ref: fanRef, key: "fan" },
      { ref: nm0Ref, key: "nm0" },
      { ref: nm1Ref, key: "nm1" },
      { ref: wic0Ref, key: "wic0" },
      { ref: wic1Ref, key: "wic1" },
      { ref: hddRef, key: "hdd" },
      { ref: iorRef, key: "ior" },
    ];

    const tl = gsap.timeline();
    targets.forEach(({ ref, key }, i) => {
      if (!ref.current) return;
      const dest = isExploded ? EXPLODED[key] : REST[key];
      tl.to(
        ref.current.position,
        {
          x: dest.x,
          y: dest.y,
          z: dest.z,
          duration: 0.7,
          ease: "power2.inOut",
        },
        i * 0.065,
      );
    });

    return () => {
      tl.kill();
    };
  }, [isExploded]);

  return (
    <group name="router-internal-assembly">
      <Chassis
        isCoverOpen={isCoverOpen}
        onSelect={onSelect}
        selectedComponent={selectedComponent}
      />

      {/* ═══════════ MOTHERBOARD — Component #3 ═══════════ */}
      <group
        ref={mbRef}
        position={[REST.mb.x, REST.mb.y, REST.mb.z]}
        name={REST.mb.name}
      >
        <Motherboard
          position={[0, 0, 0]}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ WIC CARDS (Legacy, kept for backward compatibility) ═══════════ */}
      <group
        ref={wic0Ref}
        position={[REST.wic0.x, REST.wic0.y, REST.wic0.z]}
        name={REST.wic0.name}
      >
        <WICCard
          position={[0, 0, 0]}
          slotIndex={0}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>
      <group
        ref={wic1Ref}
        position={[REST.wic1.x, REST.wic1.y, REST.wic1.z]}
        name={REST.wic1.name}
      >
        <WICCard
          position={[0, 0, 0]}
          slotIndex={1}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ NETWORK MODULES — Component #4 (TWO SIDE-BY-SIDE) ═══════════ */}
      <group
        ref={nm0Ref}
        position={[REST.nm0.x, REST.nm0.y, REST.nm0.z]}
        name={REST.nm0.name}
      >
        <NMModule
          position={[0, 0, 0]}
          slotIndex={0}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>
      <group
        ref={nm1Ref}
        position={[REST.nm1.x, REST.nm1.y, REST.nm1.z]}
        name={REST.nm1.name}
      >
        <NMModule
          position={[0, 0, 0]}
          slotIndex={1}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ POWER SUPPLY UNIT — Component #1 ═══════════ */}
      <group
        ref={psuRef}
        position={[REST.psu.x, REST.psu.y, REST.psu.z]}
        name={REST.psu.name}
      >
        <PSU
          position={[0, 0, 0]}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ COOLING FAN — Component #2 ═══════════ */}
      <group
        ref={fanRef}
        position={[REST.fan.x, REST.fan.y, REST.fan.z]}
        name={REST.fan.name}
      >
        <Fan
          position={[0, 0, 0]}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ HARD DRIVE BAY — Component #8 ═══════════ */}
      <group
        ref={hddRef}
        position={[REST.hdd.x, REST.hdd.y, REST.hdd.z]}
        name={REST.hdd.name}
      >
        <HDDBay
          position={[0, 0, 0]}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ I/O RISER — Component #9 ═══════════ */}
      <group
        ref={iorRef}
        position={[REST.ior.x, REST.ior.y, REST.ior.z]}
        name={REST.ior.name}
      >
        <IORiser
          position={[0, 0, 0]}
          onSelect={onSelect}
          selectedComponent={selectedComponent}
        />
      </group>

      {/* ═══════════ PROCEDURAL WIRING — PSU to Motherboard ═══════════ */}
      <group ref={wiringRef} name="internal-wiring">
        {/* Red wire (+12V) — PSU to Motherboard */}
        <mesh position={[-0.875, 0.15, -0.36]}>
          <boxGeometry args={[2.2, 0.009, 0.009]} />
          <meshStandardMaterial
            color="#ff3333"
            metalness={0.5}
            roughness={0.7}
          />
        </mesh>

        {/* Yellow wire (+5V) — PSU to Motherboard */}
        <mesh position={[-0.825, 0.11, -0.35]}>
          <boxGeometry args={[2.1, 0.009, 0.009]} />
          <meshStandardMaterial
            color="#ffdd22"
            metalness={0.5}
            roughness={0.7}
          />
        </mesh>

        {/* Black wire (Ground) — PSU to Motherboard */}
        <mesh position={[-0.775, 0.065, -0.3375]}>
          <boxGeometry args={[2.0, 0.009, 0.009]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.35}
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* ═══════════ CONTACT SHADOWS ═══════════ */}
      <ContactShadows
        position={[0, -0.25, 0]}
        opacity={0.5}
        scale={10}
        blur={2.8}
        far={1.2}
      />
    </group>
  );
}
