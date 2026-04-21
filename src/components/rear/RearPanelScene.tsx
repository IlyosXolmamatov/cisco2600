import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import PowerGroup from './PowerGroup'
import RJ45Group from './RJ45Group'
import WICModuleGroup from './WICModuleGroup'
import NMSlotGroup from './NMSlotGroup'

// Layout (right → left, X-axis):
//  Power:   x = +1.72  (width 0.72)
//  RJ-45:   x = +0.65  (width 0.78)
//  WIC:     x = -0.28  (width 1.05)
//  NM slot: x = -1.50  (width 1.35)
// Panel total width ≈ 4.45 (sum + small gaps)

const PANEL_W = 4.45
const PANEL_H = 0.43
const PANEL_D = 0.06

interface RearPanelSceneProps {
  selectedId: string | null
  onSelect: (id: string) => void
  coverOpen: boolean
}

export interface RearPanelSceneHandle {
  resetCamera: () => void
}

const RearPanelScene = forwardRef<RearPanelSceneHandle, RearPanelSceneProps>(
  ({ selectedId, onSelect, coverOpen }, handle) => {
    const { camera } = useThree()

    const topCoverRef = useRef<THREE.Group>(null)
    const nmCoverRef = useRef<THREE.Group>(null)
    const prevCoverOpen = useRef(false)

    // Expose resetCamera
    useImperativeHandle(handle, () => ({
      resetCamera: () => {
        gsap.to(camera.position, {
          x: 0, y: 0.2, z: 5.2,
          duration: 1.0,
          ease: 'power2.inOut',
        })
      },
    }))

    // Open/close animation
    useEffect(() => {
      if (prevCoverOpen.current === coverOpen) return
      prevCoverOpen.current = coverOpen

      const tl = gsap.timeline()
      if (coverOpen) {
        // Top cover lifts up and slides back
        if (topCoverRef.current) {
          tl.to(topCoverRef.current.position, { y: 0.8, duration: 0.7, ease: 'power2.out' }, 0)
          tl.to(topCoverRef.current.rotation, { x: -0.35, duration: 0.7, ease: 'power2.out' }, 0)
        }
        // NM cover tilts up and away
        if (nmCoverRef.current) {
          tl.to(nmCoverRef.current.position, { y: 0.7, z: 0.3, duration: 0.65, ease: 'power2.out' }, 0.1)
          tl.to(nmCoverRef.current.rotation, { x: -0.6, duration: 0.65, ease: 'power2.out' }, 0.1)
        }
      } else {
        if (topCoverRef.current) {
          tl.to(topCoverRef.current.position, { y: PANEL_H / 2 + 0.025, duration: 0.6, ease: 'power2.inOut' }, 0)
          tl.to(topCoverRef.current.rotation, { x: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
        }
        if (nmCoverRef.current) {
          tl.to(nmCoverRef.current.position, { y: 0, z: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
          tl.to(nmCoverRef.current.rotation, { x: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
        }
      }
      return () => { tl.kill() }
    }, [coverOpen])

    return (
      <group>
        {/* ── Main chassis rear plate (brushed metal finish) ── */}
        <mesh position={[0, 0, -0.031]} receiveShadow>
          <boxGeometry args={[PANEL_W, PANEL_H, PANEL_D]} />
          <meshStandardMaterial
            color="#1f2229"
            metalness={0.75}
            roughness={0.55}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* ── Perforations removed ── */}

        {/* ── Rack ears ── */}
        <mesh position={[-PANEL_W / 2 - 0.14, 0, -0.03]} castShadow>
          <boxGeometry args={[0.24, PANEL_H * 0.9, 0.045]} />
          <meshStandardMaterial color="#222530" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[PANEL_W / 2 + 0.14, 0, -0.03]} castShadow>
          <boxGeometry args={[0.24, PANEL_H * 0.9, 0.045]} />
          <meshStandardMaterial color="#222530" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* ── Power Group ── */}
        <group position={[1.72, 0, 0]}>
          <PowerGroup selectedId={selectedId} onSelect={onSelect} />
        </group>

        {/* ── RJ-45 Group ── */}
        <group position={[0.65, 0, 0]}>
          <RJ45Group selectedId={selectedId} onSelect={onSelect} />
        </group>

        {/* ── WIC Module Group ── */}
        <group position={[-0.28, 0, 0]}>
          <WICModuleGroup selectedId={selectedId} onSelect={onSelect} />
        </group>

        {/* ── NM Slot Group (cover plate is GSAP target) ── */}
        <group position={[-1.50, 0, 0]}>
          <NMSlotGroup
            selectedId={selectedId}
            onSelect={onSelect}
            nmCoverRef={nmCoverRef}
          />
        </group>

        {/* ── Top cover strip (ventilation area) ── */}
        <group
          ref={topCoverRef}
          position={[0, PANEL_H / 2 + 0.025, -0.02]}
        >
          <mesh castShadow>
            <boxGeometry args={[PANEL_W - 0.1, 0.05, 0.05]} />
            <meshStandardMaterial color="#252830" metalness={0.78} roughness={0.48} />
          </mesh>
          {/* Horizontal vent louvres on top strip */}
          {Array.from({ length: 14 }).map((_, i) => (
            <mesh key={i} position={[-1.4 + i * 0.22, 0.002, 0.028]}>  
              <boxGeometry args={[0.09, 0.008, 0.020]} />
              <meshStandardMaterial color="#0d0f14" metalness={0.4} roughness={0.9} />
            </mesh>
          ))}
        </group>

        {/* ── Bottom strip with air intake ── */}
        <mesh position={[0, -PANEL_H / 2 - 0.02, -0.02]}>
          <boxGeometry args={[PANEL_W - 0.1, 0.04, 0.045]} />
          <meshStandardMaterial color="#1f2229" metalness={0.75} roughness={0.58} />
        </mesh>
        {/* Bottom intake vents (contained within bounds) */}
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh key={`vent-${i}`} position={[-1.8 + i * 0.22, -PANEL_H / 2 - 0.015, -0.01]} castShadow={false}>
            <boxGeometry args={[0.08, 0.012, 0.005]} />
            <meshStandardMaterial color="#0d0f14" metalness={0.3} roughness={0.85} />
          </mesh>
        ))}

        {/* ── Separation seams between groups (offset to prevent z-fighting) ── */}
        {[1.315, 0.265, -0.795].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.0281]} castShadow={false}>
            <boxGeometry args={[0.006, PANEL_H * 0.9, 0.004]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.6} roughness={0.7} />
          </mesh>
        ))}

        <ContactShadows
          position={[0, -PANEL_H / 2 - 0.04, 0]}
          opacity={0.45}
          scale={7}
          blur={2}
          far={0.8}
        />
      </group>
    )
  }
)

RearPanelScene.displayName = 'RearPanelScene'
export default RearPanelScene

