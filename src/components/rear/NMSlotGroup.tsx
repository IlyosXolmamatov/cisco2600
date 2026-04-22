import { useState } from "react";
import * as THREE from "three";

/**
 * NM Slot Group Component
 *
 * Represents the Cisco 2600's Network Module expansion slot
 * on the rear panel with perforated blank cover.
 *
 * Scale: 1 unit = 10 cm
 * Position: Far left of rear panel (x ≈ -1.50)
 */

interface NMSlotGroupProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  nmCoverRef: React.RefObject<THREE.Group>;
}

export default function NMSlotGroup({
  selectedId,
  onSelect,
  nmCoverRef,
}: NMSlotGroupProps) {
  const [coverHov, setCoverHov] = useState(false);
  const sel = selectedId === "nm-blank";
  const glow = sel ? 0.5 : coverHov ? 0.3 : 0;

  return (
    <group>
      {/* ── Slot recessed interior (dark cavity) ── */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <boxGeometry args={[1.3, 0.4, 0.02]} />
        <meshStandardMaterial
          color="#050609"
          metalness={0.2}
          roughness={0.95}
        />
      </mesh>

      {/* ── Gold-plated edge connector (Module insertion contacts) ── */}
      {Array.from({ length: 22 }).map((_, i) => (
        <mesh key={`edge-${i}`} position={[-0.5 + i * 0.046, 0, -0.025]}>
          <boxGeometry args={[0.018, 0.3, 0.008]} />
          <meshStandardMaterial
            color="#ccaa30"
            metalness={0.95}
            roughness={0.05}
            emissive="#554400"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* ── Upper guide rail (prevents module tilting) ── */}
      <mesh position={[0, 0.185, -0.015]} receiveShadow>
        <boxGeometry args={[1.22, 0.01, 0.04]} />
        <meshStandardMaterial
          color="#111318"
          metalness={0.65}
          roughness={0.6}
        />
      </mesh>

      {/* ── Lower guide rail ── */}
      <mesh position={[0, -0.185, -0.015]} receiveShadow>
        <boxGeometry args={[1.22, 0.01, 0.04]} />
        <meshStandardMaterial
          color="#111318"
          metalness={0.65}
          roughness={0.6}
        />
      </mesh>

      {/* ── Blank cover plate face (main interactive surface) ── */}
      <group ref={nmCoverRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={e => {
            e.stopPropagation();
            setCoverHov(true);
          }}
          onPointerOut={() => setCoverHov(false)}
          onClick={e => {
            e.stopPropagation();
            onSelect("nm-blank");
          }}
        >
          <boxGeometry args={[1.35, 0.43, 0.052]} />
          <meshStandardMaterial
            color="#252830"
            metalness={0.78}
            roughness={0.48}
            emissive="#667777"
            emissiveIntensity={glow}
          />
        </mesh>

        {/* ── Perforations removed ── */}

        {/* ── Thumbscrews ── */}
        {[
          [-0.56, 0.185, 0.032], // Upper-left
          [0.56, 0.185, 0.032], // Upper-right
          [-0.56, -0.185, 0.032], // Lower-left
          [0.56, -0.185, 0.032], // Lower-right
        ].map((pos, i) => (
          <mesh
            key={`thumbscrew-${i}`}
            position={pos as [number, number, number]}
            castShadow
          >
            <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
            <meshStandardMaterial
              color="#aaaaaa"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* ── Slot designation label area ── */}
        <mesh position={[0, -0.23, 0.04]}>
          <boxGeometry args={[0.5, 0.026, 0.002]} />
          <meshStandardMaterial
            color="#556677"
            metalness={0.2}
            roughness={0.9}
            emissive="#334455"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* ── Indicator LED (no module present) ── */}
        <mesh position={[-0.62, -0.065, 0.04]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshStandardMaterial
            color="#ffaa44"
            emissive="#ffaa44"
            emissiveIntensity={sel || coverHov ? 2.0 : 0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
