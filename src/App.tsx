import { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import RouterScene from './components/RouterScene'
import RearPanelScene, { type RearPanelSceneHandle } from './components/rear/RearPanelScene'
import FullRouterScene from './components/FullRouterScene'
import specs from './data/componentSpecs'
import rearSpecs from './data/rearPanelSpecs'
import type { SpecGroup } from './data/componentSpecs'
import './index.css'

type ViewMode = 'router' | 'rear-panel' | 'combined'

const CATEGORY_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  JISMONIY:    { label: 'JISMONIY',    color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  TEXNIK:      { label: 'TEXNIK',      color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  FOYDALANISH: { label: 'FOYDALANISH', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
}

function SpecGroupBlock({ group }: { group: SpecGroup }) {
  const style = CATEGORY_STYLE[group.category] ?? { label: group.category, color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' }
  return (
    <div className="mb-3">
      <div
        className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded mb-1.5 inline-block"
        style={{ color: style.color, background: style.bg }}
      >
        [{style.label}]
      </div>
      <div className="space-y-1">
        {group.fields.map((f) => (
          <div key={f.key} className="flex justify-between items-start gap-3">
            <span className="text-gray-500 text-[11px] whitespace-nowrap shrink-0">{f.key}</span>
            <span
              className="text-[11px] text-right leading-tight"
              style={{ color: f.bold ? '#e2e8f0' : '#94a3b8', fontWeight: f.bold ? 600 : 400 }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isExploded, setIsExploded]   = useState(false)
  const [routerSel, setRouterSel]     = useState<string | null>(null)

  const [rearCoverOpen, setRearCoverOpen] = useState(false)
  const [rearSel, setRearSel]             = useState<string | null>(null)
  const [showSpecs, setShowSpecs]         = useState(true)
  const rearSceneRef = useRef<RearPanelSceneHandle>(null)

  const [viewMode, setViewMode] = useState<ViewMode>('combined')

  const handleRouterSelect = useCallback((id: string) => {
    setRouterSel(prev => prev === id ? null : id)
  }, [])

  const handleRearSelect = useCallback((id: string) => {
    setRearSel(prev => prev === id ? null : id)
    setShowSpecs(true)
  }, [])

  const handleRouterReset = () => {
    setIsCoverOpen(false)
    setIsExploded(false)
    setRouterSel(null)
  }

  const handleRearReset = () => {
    setRearCoverOpen(false)
    setRearSel(null)
    rearSceneRef.current?.resetCamera()
  }

  const switchView = (mode: ViewMode) => {
    setViewMode(mode)
    setRouterSel(null)
    setRearSel(null)
  }

  const routerSelected = routerSel ? specs[routerSel] : null
  const rearSelected   = rearSel   ? rearSpecs[rearSel] : null
  const isRear         = viewMode === 'rear-panel'
  const isCombined     = viewMode === 'combined'

  const glassPanel = "bg-gray-950/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl"

  return (
    <div className="w-screen h-screen bg-gray-950 relative overflow-hidden">

      {/* ══════ 3D Sahna ══════ */}
      <Canvas shadows className="w-full h-full" key={viewMode}>
        {isCombined ? (
          <>
            <PerspectiveCamera makeDefault position={[7, 2, 3]} fov={42} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 8, 4]} intensity={1.3} castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1} shadow-camera-far={50}
              shadow-camera-left={-10} shadow-camera-right={10}
              shadow-camera-top={10}  shadow-camera-bottom={-10}
            />
            <pointLight position={[-5, 2, 2]} intensity={0.6} color="#4488ff" />
            <pointLight position={[5, -1, -3]} intensity={0.5} color="#ffaa44" />
            <Environment preset="studio" />
            <FullRouterScene
              isCoverOpen={isCoverOpen}
              rearCoverOpen={rearCoverOpen}
              isExploded={isExploded}
              selectedComponent={routerSel}
              selectedRear={rearSel}
              onSelectRouter={handleRouterSelect}
              onSelectRear={handleRearSelect}
            />
          </>
        ) : isRear ? (
          <>
            <PerspectiveCamera makeDefault position={[0, 0.2, 5.2]} fov={38} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 4, 6]} intensity={1.4} castShadow
              shadow-mapSize={[2048, 2048]} />
            <pointLight position={[-3, 1, 3]} intensity={0.6} color="#6699ff" />
            <pointLight position={[3, -1, 4]} intensity={0.4} color="#ffcc88" />
            <Environment preset="studio" />
            <RearPanelScene
              ref={rearSceneRef}
              selectedId={rearSel}
              onSelect={handleRearSelect}
              coverOpen={rearCoverOpen}
            />
          </>
        ) : (
          <>
            <PerspectiveCamera makeDefault position={[5, 3.5, 6]} fov={42} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1} shadow-camera-far={30}
              shadow-camera-left={-6} shadow-camera-right={6}
              shadow-camera-top={6}  shadow-camera-bottom={-6}
            />
            <pointLight position={[-4, 2, -3]} intensity={0.5} color="#4488ff" />
            <pointLight position={[3, -1, 4]}  intensity={0.3} color="#ffaa44" />
            <Environment preset="studio" />
            <RouterScene
              isCoverOpen={isCoverOpen}
              isExploded={isExploded}
              selectedComponent={routerSel}
              onSelect={handleRouterSelect}
            />
          </>
        )}
        <OrbitControls
          enableDamping dampingFactor={0.05}
          minDistance={isCombined ? 3 : isRear ? 1.5 : 2}
          maxDistance={isCombined ? 25 : isRear ? 12 : 14}
          maxPolarAngle={Math.PI * 0.85}
        />
      </Canvas>

      {/* ══════ Ko'rinish rejimi paneli ══════ */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 pointer-events-none">

        {/* Chap: brend + tablar */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className={`${glassPanel} px-4 py-2.5`}>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-white font-mono text-sm font-bold tracking-widest uppercase">
                Cisco 2600 Seriyasi
              </span>
            </div>
            <div className="text-gray-500 font-mono text-[10px]">
              44.5sm × 4.3sm × 30.1sm · 1U Stend
            </div>
          </div>

          {/* Ko'rinish tablari */}
          <div className={`${glassPanel} flex gap-0.5 p-1`}>
            {(['combined', 'router', 'rear-panel'] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchView(m)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                  viewMode === m
                    ? 'bg-white/15 text-white shadow-inner'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {m === 'combined' ? '⟳ Birlashgan' : m === 'router' ? "To'liq Router" : 'Orqa Panel'}
              </button>
            ))}
          </div>
        </div>

        {/* O'ng: boshqaruv tugmalari */}
        <div className="pointer-events-auto flex gap-2">
          {isCombined ? (
            <>
              <NavBtn active={isCoverOpen} activeColor="blue" onClick={() => setIsCoverOpen(v => !v)}>
                {isCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </NavBtn>
              <NavBtn active={rearCoverOpen} activeColor="indigo" onClick={() => setRearCoverOpen(v => !v)}>
                {rearCoverOpen ? 'Orqani Yop' : 'Orqani Och'}
              </NavBtn>
              <NavBtn active={isExploded} activeColor="purple" onClick={() => setIsExploded(v => !v)}>
                {isExploded ? "Yig'ish" : 'Parchalash'}
              </NavBtn>
              <NavBtn active={false} activeColor="red" onClick={() => { handleRouterReset(); handleRearReset() }}>
                Qayta Tiklash
              </NavBtn>
            </>
          ) : isRear ? (
            <>
              <NavBtn active={rearCoverOpen} activeColor="blue" onClick={() => setRearCoverOpen(v => !v)}>
                {rearCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </NavBtn>
              <NavBtn active={showSpecs && !!rearSel} activeColor="emerald" onClick={() => setShowSpecs(v => !v)}>
                Xususiyatlar
              </NavBtn>
              <NavBtn active={false} activeColor="red" onClick={handleRearReset}>
                Kamerani Tiklash
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn active={isCoverOpen} activeColor="blue" onClick={() => setIsCoverOpen(v => !v)}>
                {isCoverOpen ? 'Qopqoqni Yop' : 'Qopqoqni Och'}
              </NavBtn>
              <NavBtn active={isExploded} activeColor="purple" onClick={() => setIsExploded(v => !v)}>
                {isExploded ? "Yig'ish" : 'Parchalash'}
              </NavBtn>
              <NavBtn active={false} activeColor="red" onClick={handleRouterReset}>
                Qayta Tiklash
              </NavBtn>
            </>
          )}
        </div>
      </div>

      {/* ══════ Holat ko'rsatkichlari ══════ */}
      <div className="absolute bottom-4 left-6 flex gap-2 pointer-events-none">
        {isCoverOpen && (
          <StatusPill color="#60a5fa">Qopqoq Ochiq</StatusPill>
        )}
        {isExploded && (
          <StatusPill color="#a78bfa">Parchalangan Ko'rinish</StatusPill>
        )}
        {rearCoverOpen && (
          <StatusPill color="#6366f1">Orqa Ochiq</StatusPill>
        )}
      </div>

      {/* ══════ Xususiyatlar paneli — Orqa panel ══════ */}
      {(isRear || isCombined) && (
        <div className={`absolute top-20 right-6 w-80 transition-all duration-300 ${
          rearSelected && showSpecs ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}>
          {rearSelected && (
            <div className={`${glassPanel} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-lg"
                  style={{ backgroundColor: rearSelected.indicatorColor, boxShadow: `0 0 8px ${rearSelected.indicatorColor}88` }}
                />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                  style={{ color: rearSelected.indicatorColor }}>
                  {rearSelected.category}
                </span>
                <button
                  onClick={() => setRearSel(null)}
                  className="ml-auto text-gray-600 hover:text-white text-base transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-white/10"
                >×</button>
              </div>

              <h2 className="text-white font-semibold text-sm leading-tight mb-1.5">
                {rearSelected.label}
              </h2>
              <p className="text-gray-500 text-[11px] leading-relaxed mb-3 border-b border-white/8 pb-3">
                {rearSelected.description}
              </p>
              <div>
                {rearSelected.specGroups.map((g) => (
                  <SpecGroupBlock key={g.category} group={g} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════ Xususiyatlar paneli — Router ══════ */}
      {!isRear && routerSelected && (
        <div className={`absolute top-20 right-6 w-80 transition-all duration-300 ${
          routerSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}>
          <div className={`${glassPanel} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-cyan-400 shadow-lg shadow-cyan-400/40" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
                KOMPONENT
              </span>
              <button
                onClick={() => setRouterSel(null)}
                className="ml-auto text-gray-600 hover:text-white text-base transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-white/10"
              >×</button>
            </div>

            <h2 className="text-white font-semibold text-sm leading-tight mb-1.5">
              {routerSelected.label}
            </h2>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-3 border-b border-white/8 pb-3">
              {routerSelected.description}
            </p>
            <div>
              {routerSelected.specGroups.map((g) => (
                <SpecGroupBlock key={g.category} group={g} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Reusable nav button ── */
const ACTIVE_COLORS: Record<string, string> = {
  blue:    'bg-blue-600/80 border-blue-400/60 text-white shadow-lg shadow-blue-500/20',
  indigo:  'bg-indigo-600/80 border-indigo-400/60 text-white shadow-lg shadow-indigo-500/20',
  purple:  'bg-purple-600/80 border-purple-400/60 text-white shadow-lg shadow-purple-500/20',
  emerald: 'bg-emerald-700/80 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/20',
  red:     'bg-red-700/80 border-red-500/60 text-white shadow-lg shadow-red-500/20',
}

function NavBtn({
  children,
  active,
  activeColor,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  activeColor: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
        active
          ? (ACTIVE_COLORS[activeColor] ?? ACTIVE_COLORS.blue)
          : 'bg-gray-950/60 backdrop-blur-xl border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  )
}

function StatusPill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
      style={{
        color,
        borderColor: `${color}44`,
        background: `${color}18`,
        boxShadow: `0 0 12px ${color}22`,
      }}
    >
      ● {children}
    </div>
  )
}
