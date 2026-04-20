import { useRef } from 'react'
import { ContactShadows } from '@react-three/drei'
import RouterScene from './RouterScene'
import RearPanelScene, { type RearPanelSceneHandle } from './rear/RearPanelScene'

/**
 * FullRouterScene - Birlashtirilgan Router Ko'rinishi
 * 
 * Front (x=0) va Rear Panel (z offset) bir sahnega birgalikda
 * 360° rotatsiya imkoniyati bilan
 */

interface FullRouterSceneProps {
  isCoverOpen: boolean
  rearCoverOpen: boolean
  isExploded: boolean
  selectedComponent: string | null
  selectedRear: string | null
  onSelectRouter: (id: string) => void
  onSelectRear: (id: string) => void
}

export default function FullRouterScene({
  isCoverOpen,
  rearCoverOpen,
  isExploded,
  selectedComponent,
  selectedRear,
  onSelectRouter,
  onSelectRear,
}: FullRouterSceneProps) {
  const rearSceneRef = useRef<RearPanelSceneHandle>(null)

  return (
    <group>
      {/* ════════ UNIFIED ROUTER ASSEMBLY ════════ */}
      
      {/* ──────────── FRONT ROUTER CHASSIS ──────────── */}
      {/* Positioned at origin (0, 0, 0) */}
      {/* Chassis depth: 3.01 units (30.1cm) */}
      {/* Rear face: z = -1.505 */}
      <RouterScene
        isCoverOpen={isCoverOpen}
        isExploded={isExploded}
        selectedComponent={selectedComponent}
        onSelect={onSelectRouter}
      />

      {/* ──────────── REAR PANEL (Perfectly Aligned) ──────────── */}
      {/* 
        Alignment Fix:
        - Position: exactly at rear face of chassis (z = -1.505)
        - Rotation: 180° around Y-axis to face backward
        - Result: Seamless integration with chassis
      */}
      <group 
        position={[0, 0, -1.505]} 
        rotation={[0, Math.PI, 0]}
      >
        <RearPanelScene
          ref={rearSceneRef}
          selectedId={selectedRear}
          onSelect={onSelectRear}
          coverOpen={rearCoverOpen}
        />
      </group>

      {/* ──────────── CONTACT SHADOWS ──────────── */}
      {/* Unified shadow for entire router */}
      <ContactShadows 
        position={[0, -0.25, -0.75]} 
        opacity={0.65} 
        scale={12} 
        blur={3} 
        far={1.5} 
      />
    </group>
  )
}
